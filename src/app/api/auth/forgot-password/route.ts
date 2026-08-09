import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/auth/validation";
import { generateResetToken } from "@/lib/auth/tokens";
import { checkRateLimit, getClientIp } from "@/lib/auth/rateLimit";
import { createAuditLog } from "@/lib/auth/audit";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/forgot-password
 * Issues a SHA-256 hashed password reset token with anti-enumeration protection and rate limiting.
 */
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`forgot_pass_${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: `Too many password reset requests. Please wait ${rateLimit.resetSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = forgotPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues[0]?.message || "Invalid input data";
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { email } = parseResult.data;

    // Standard anti-enumeration response for all requests
    const standardResponse = {
      success: true,
      message: "If an account with that email exists, password reset instructions have been issued.",
    };

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      await createAuditLog({
        action: "PASSWORD_RESET",
        userEmail: email,
        req,
      });
      return NextResponse.json(standardResponse);
    }

    // Generate raw token and store ONLY SHA-256 token hash in database (Stripe/GitHub security standard)
    const { rawToken, tokenHash } = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetTokenHash: tokenHash,
        resetTokenExpiry,
      },
    });

    await createAuditLog({
      action: "PASSWORD_RESET",
      userId: user.id,
      userEmail: user.email,
      req,
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const resetUrl = `${origin}/reset-password?token=${rawToken}`;

    console.log(`[Forgot Password] Reset token issued for ${email}`);
    console.log(`[Forgot Password] Reset link: ${resetUrl}`);

    return NextResponse.json({
      ...standardResponse,
      resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ success: false, error: "Failed to process forgot password request." }, { status: 500 });
  }
}
