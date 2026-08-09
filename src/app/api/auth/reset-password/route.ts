import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/auth/validation";
import { hashToken } from "@/lib/auth/tokens";
import { hashPassword } from "@/lib/auth/password";
import { checkRateLimit, getClientIp } from "@/lib/auth/rateLimit";
import { createAuditLog } from "@/lib/auth/audit";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/reset-password
 * Validates reset token hash and updates user password with 12-round bcrypt.
 */
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`reset_pass_${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: `Too many attempts. Please wait ${rateLimit.resetSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = resetPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues[0]?.message || "Invalid password or token format";
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { token, newPassword } = parseResult.data;

    // Hash the incoming raw token using SHA-256 to compare against database resetTokenHash
    const computedTokenHash = hashToken(token);

    const user = await prisma.user.findFirst({
      where: {
        resetTokenHash: computedTokenHash,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired password reset link. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash new password using 12 bcrypt work factor rounds
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear reset token & lockout fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetTokenHash: null,
        resetTokenExpiry: null,
        failedLoginAttempts: 0,
        lockUntil: null,
      },
    });

    await createAuditLog({
      action: "PASSWORD_RESET",
      userId: user.id,
      userEmail: user.email,
      req,
    });

    console.log(`[Reset Password] Password reset completed for user: ${user.email}`);

    return NextResponse.json({
      success: true,
      message: "Your password has been successfully reset. You may now log in with your new password.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ success: false, error: "Failed to reset password." }, { status: 500 });
  }
}
