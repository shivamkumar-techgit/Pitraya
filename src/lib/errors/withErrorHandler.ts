import { NextResponse } from "next/server";
import { AppError } from "./AppError";
import { logError } from "./logger";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { captureApiFailure } from "@/lib/monitoring/sentry";

export type ApiHandler = (req: Request, context?: unknown) => Promise<NextResponse | Response>;

/**
 * Higher-order wrapper for API route handlers providing zero-crash uncaught error catching,
 * automatic AppError classification, ErrorLog database persistence, and standardized JSON error formatting.
 */
export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req: Request, context?: unknown) => {
    const requestId =
      req.headers.get("x-request-id") ||
      `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const url = new URL(req.url);
    const route = url.pathname;
    const method = req.method;

    try {
      return await handler(req, context);
    } catch (error: unknown) {
      let sessionUser: { id?: string; role?: string } = {};
      try {
        const session = await getServerSession(authOptions);
        if (session && session.user) {
          sessionUser = { id: session.user.id, role: session.user.role };
        }
      } catch {
        // Ignore session extraction failure inside error handler
      }

      const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
      const userAgent = req.headers.get("user-agent") || "unknown";

      // Log server error to console & ErrorLog PostgreSQL table
      await logError(error, {
        requestId,
        route,
        method,
        userId: sessionUser.id,
        userRole: sessionUser.role,
        ip,
        userAgent,
      });

      // Capture API failure in monitoring engine
      captureApiFailure(route, error instanceof AppError ? error.statusCode : 500, error);

      let statusCode = 500;
      let errorCode = "INTERNAL_ERROR";
      let userMessage = "An unexpected server error occurred. Please try again or contact support.";

      if (error instanceof AppError) {
        statusCode = error.statusCode;
        errorCode = error.code;
        userMessage = error.message;
      } else if (error instanceof Error) {
        // Hide raw stack trace details from end users in production
        userMessage = process.env.NODE_ENV === "development" ? error.message : "An internal server error occurred.";
      }

      return NextResponse.json(
        {
          success: false,
          code: errorCode,
          message: userMessage,
          requestId,
        },
        {
          status: statusCode,
          headers: {
            "X-Request-ID": requestId,
            "X-Content-Type-Options": "nosniff",
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }
  };
}
