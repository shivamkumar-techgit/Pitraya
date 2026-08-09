import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { hasPermission, PermissionType, AuthContext, AdminRole } from "./permissions";
import { redirect } from "next/navigation";
import { z } from "zod";

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "BAD_REQUEST"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "INTERNAL_ERROR"
  | "ZIP_SLIP_DETECTED"
  | "PAYLOAD_TOO_LARGE";

/**
 * Extracts or generates a unique X-Request-ID header for logging and tracing.
 */
export function getRequestId(req?: Request | null): string {
  if (!req) return `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const existingId = req.headers.get("x-request-id");
  if (existingId) return existingId;
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

/**
 * Standardized API Error Response builder.
 */
export function standardApiError(
  code: ApiErrorCode,
  message: string,
  status: number = 400,
  req?: Request | null
): NextResponse {
  const requestId = getRequestId(req);
  return NextResponse.json(
    {
      success: false,
      code,
      message,
      requestId,
    },
    {
      status,
      headers: {
        "X-Request-ID": requestId,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

/**
 * Standardized API Success Response builder with Request-ID and Security Headers.
 */
export function standardApiSuccess<T extends object>(data: T, req?: Request | null, status: number = 200): NextResponse {
  const requestId = getRequestId(req);
  return NextResponse.json(
    {
      success: true,
      requestId,
      ...data,
    },
    {
      status,
      headers: {
        "X-Request-ID": requestId,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

/**
 * Verifies active session token. Returns AuthContext or 401 Unauthorized response.
 */
export async function verifySession(req?: Request | null): Promise<{ user: AuthContext } | { errorResponse: NextResponse }> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.role) {
    return {
      errorResponse: standardApiError("UNAUTHORIZED", "Unauthorized: Active session token required.", 401, req),
    };
  }

  return {
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role as AdminRole,
      coordinatorId: session.user.coordinatorId,
    },
  };
}

/**
 * Server Component / Page Guard. Redirects to /login if unauthenticated or unauthorized.
 */
export async function requirePermission(requiredPermission: PermissionType): Promise<AuthContext> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.role) {
    redirect("/login");
  }

  const userRole = session.user.role as AdminRole;
  const isAllowed = hasPermission(userRole, requiredPermission);

  if (!isAllowed) {
    redirect("/admin?error=403_Forbidden");
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: userRole,
    coordinatorId: session.user.coordinatorId,
  };
}

/**
 * Verifies session AND checks role permissions against central matrix. Returns 401/403 on failure.
 */
export async function verifyApiPermission(
  requiredPermission: PermissionType,
  req?: Request | null
): Promise<{ user: AuthContext } | { errorResponse: NextResponse }> {
  const auth = await verifySession(req);
  if ("errorResponse" in auth) return auth;

  const isAllowed = hasPermission(auth.user.role, requiredPermission);
  if (!isAllowed) {
    return {
      errorResponse: standardApiError(
        "FORBIDDEN",
        `Forbidden: Role '${auth.user.role}' lacks required permission '${requiredPermission}'.`,
        403,
        req
      ),
    };
  }

  return { user: auth.user };
}

// Aliases for compatibility
export const verifyApiAccess = verifyApiPermission;
export const verifyApiAuth = verifyApiPermission;

/**
 * Zod request body validation wrapper returning parsed data or standardized 400 Bad Request error.
 */
export async function validateRequest<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
  req?: Request | null
): Promise<{ data: z.infer<T> } | { errorResponse: NextResponse }> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorMsg = result.error.issues[0]?.message || "Invalid request payload format.";
    return {
      errorResponse: standardApiError("BAD_REQUEST", errorMsg, 400, req),
    };
  }
  return { data: result.data };
}
