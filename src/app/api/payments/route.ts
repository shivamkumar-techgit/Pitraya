import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Permission } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiSuccess, standardApiError } from "@/lib/auth/apiSecurity";
import { createAuditLog } from "@/lib/auth/audit";

export async function GET(req: Request) {
  const auth = await verifyApiPermission(Permission.PAYMENT_READ, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const payments = await prisma.payment.findMany({
      include: {
        booking: {
          include: {
            customer: true,
          },
        },
      },
      orderBy: { issuedAt: "desc" },
    });

    return standardApiSuccess({ payments }, req);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return standardApiError("INTERNAL_ERROR", "Failed to fetch payments", 500, req);
  }
}

export async function POST(req: Request) {
  const auth = await verifyApiPermission(Permission.PAYMENT_CREATE, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { bookingId, amount, paymentMethod, transactionRef, status } = body;

    if (!bookingId) {
      return standardApiError("BAD_REQUEST", "Missing booking ID parameter", 400, req);
    }

    if (amount !== undefined && amount <= 0) {
      return standardApiError("BAD_REQUEST", "Business Rule Error: Payment amount must be greater than zero", 400, req);
    }

    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount: amount || 0,
        paymentMethod: paymentMethod || "UPI",
        transactionRef: transactionRef || `TXN-${Date.now()}`,
        status: status || "paid",
        paymentLink: `https://pitraya.com/pay/${bookingId}`,
        paidAt: status === "paid" ? new Date() : undefined,
      },
    });

    if (status === "paid") {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "confirmed" },
      });
    }

    await createAuditLog({
      action: "PAYMENT_GENERATED",
      userId: auth.user.id,
      userEmail: auth.user.email,
      resourceType: "booking",
      resourceId: bookingId,
      details: { amount, status, paymentMethod },
      req,
    });

    return standardApiSuccess({ payment }, req);
  } catch (error) {
    console.error("Error processing payment:", error);
    return standardApiError("INTERNAL_ERROR", "Failed to process payment", 500, req);
  }
}
