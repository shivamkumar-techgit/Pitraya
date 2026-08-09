import prisma from "@/lib/prisma";
import { getRequestId } from "./apiSecurity";

export interface AuditLogParams {
  action: string;
  userId?: string | null;
  userEmail?: string | null;
  resourceType?: string | null;
  resourceId?: string | null;
  details?: Record<string, unknown> | null;
  req?: Request | null;
}

const SENSITIVE_KEYS = [
  "password",
  "token",
  "jwt",
  "secret",
  "resettoken",
  "resettokenhash",
  "auth",
  "authorization",
  "creditcard",
  "cvv",
];

/**
 * Sanitizes log parameters by masking sensitive credential keys.
 */
export function sanitizeLogDetails<T>(obj: T): T {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeLogDetails(item)) as T;
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYS.some((sensitive) => lowerKey.includes(sensitive));

    if (isSensitive) {
      sanitized[key] = "[REDACTED_SECRET]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeLogDetails(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

/**
 * Writes an AuditLog record to PostgreSQL tracking privileged security & operational events.
 */
export async function createAuditLog(params: AuditLogParams): Promise<void> {
  try {
    let ip: string | null = null;
    let userAgent: string | null = null;

    if (params.req) {
      const headers = params.req.headers;
      ip =
        headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        headers.get("x-real-ip") ||
        headers.get("cf-connecting-ip") ||
        null;
      userAgent = headers.get("user-agent") || null;
    }

    const sanitizedDetails = params.details ? sanitizeLogDetails(params.details) : undefined;
    const actionText = params.resourceType && params.resourceId
      ? `${params.action} [${params.resourceType}:${params.resourceId}]`
      : params.action;

    await prisma.auditLog.create({
      data: {
        action: actionText,
        userId: params.userId || null,
        userEmail: params.userEmail || null,
        ip,
        userAgent,
      },
    });
  } catch (err) {
    console.error("Failed to write AuditLog entry:", err);
  }
}
