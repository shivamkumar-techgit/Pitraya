import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth/authOptions";
import { changePasswordSchema } from "@/lib/auth/validation";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { checkRateLimit, getClientIp } from "@/lib/auth/rateLimit";
import { createAuditLog } from "@/lib/auth/audit";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/change-password
 * Allows authenticated admin users to change their password securely.
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`change_pass_${session.user.email}_${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: `Too many attempts. Please wait ${rateLimit.resetSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = changePasswordSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues[0]?.message || "Invalid input data";
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { currentPassword, newPassword } = parseResult.data;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email.toLowerCase().trim() },
    });

    if (!user || !user.password) {
      return NextResponse.json({ success: false, error: "User account not found." }, { status: 404 });
    }

    // Verify current password
    const isCurrentValid = await verifyPassword(currentPassword, user.password);
    if (!isCurrentValid) {
      return NextResponse.json({ success: false, error: "Incorrect current password." }, { status: 400 });
    }

    // Hash new password using 12 bcrypt rounds
    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    await createAuditLog({
      action: "PASSWORD_CHANGED",
      userId: user.id,
      userEmail: user.email,
      req,
    });

    console.log(`[Change Password] Password changed successfully for ${user.email}`);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json({ success: false, error: "Failed to change password." }, { status: 500 });
  }
}
