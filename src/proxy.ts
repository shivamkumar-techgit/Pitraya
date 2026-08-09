import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

// next-intl locale middleware — handles /hi/* routing and locale detection
const intlMiddleware = createMiddleware(routing);

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── 1. Attach X-Request-ID to every request ───────────────────────────────
  const requestId =
    req.headers.get("x-request-id") ||
    `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-request-id", requestId);

  // ── 2. Protect /admin and /api/admin routes (auth gate) ───────────────────
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    const token = await getToken({
      req,
      secret:
        process.env.NEXTAUTH_SECRET || "rituals_sacred_secret_key_2026_jwt",
    });

    if (!token) {
      if (isAdminApi) {
        const res = NextResponse.json(
          {
            success: false,
            code: "UNAUTHORIZED",
            message: "Unauthorized access: Active session required.",
            requestId,
          },
          { status: 401 }
        );
        res.headers.set("X-Request-ID", requestId);
        return res;
      }

      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      const res = NextResponse.redirect(loginUrl);
      res.headers.set("X-Request-ID", requestId);
      return res;
    }
  }

  // ── 3. Skip next-intl for admin/api/auth routes ───────────────────────────
  const skipIntl =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/pay") ||
    pathname.startsWith("/sandbox") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/privacy-policy") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/refund-policy") ||
    pathname.startsWith("/cancellation-policy") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/pandits") ||
    pathname.startsWith("/hotels") ||
    pathname.startsWith("/travel") ||
    pathname.startsWith("/pind-daan-from");

  if (skipIntl) {
    const res = NextResponse.next({ request: { headers: requestHeaders } });
    res.headers.set("X-Request-ID", requestId);
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return res;
  }

  // ── 4. Run next-intl locale routing for all public pages ──────────────────
  const intlResponse = intlMiddleware(req);

  // Propagate security headers + request ID onto the intl response
  intlResponse.headers.set("X-Request-ID", requestId);
  intlResponse.headers.set("X-Content-Type-Options", "nosniff");
  intlResponse.headers.set("X-Frame-Options", "DENY");
  intlResponse.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  return intlResponse;
}

export const config = {
  // Match all routes EXCEPT Next.js internals, static files, and API/trpc
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
