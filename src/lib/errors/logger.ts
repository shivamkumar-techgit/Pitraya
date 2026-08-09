import prisma from "@/lib/prisma";
import { AppError } from "./AppError";

export interface ErrorLogContext {
  requestId?: string;
  route?: string;
  method?: string;
  userId?: string;
  userRole?: string;
  ip?: string;
  userAgent?: string;
}

/**
 * Server Error Logger. Writes full error stack traces and contextual metadata to the ErrorLog table.
 */
export async function logError(error: unknown, context: ErrorLogContext = {}): Promise<void> {
  const errObj = error instanceof Error ? error : new Error(String(error));
  const isAppError = error instanceof AppError;

  const errorClass = errObj.name || (isAppError ? (error as AppError).code : "Error");
  const statusCode = isAppError ? (error as AppError).statusCode : 500;
  const message = errObj.message || "An unexpected error occurred.";
  const stack = errObj.stack || null;

  // Print structured JSON to server console
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level: "ERROR",
      requestId: context.requestId || "req_unknown",
      errorClass,
      statusCode,
      message,
      route: context.route || "unknown",
      method: context.method || "unknown",
      userId: context.userId || null,
      userRole: context.userRole || null,
      stack,
    })
  );

  // Write to PostgreSQL ErrorLog table asynchronously
  try {
    await prisma.errorLog.create({
      data: {
        requestId: context.requestId || null,
        errorClass,
        message: message.substring(0, 1000),
        stack: stack ? stack.substring(0, 4000) : null,
        route: context.route || null,
        method: context.method || null,
        statusCode,
        userId: context.userId || null,
        userRole: context.userRole || null,
        ip: context.ip || null,
        userAgent: context.userAgent ? context.userAgent.substring(0, 500) : null,
      },
    });
  } catch (dbErr) {
    console.error("⚠️ Failed to persist ErrorLog entry to database:", dbErr);
  }
}
