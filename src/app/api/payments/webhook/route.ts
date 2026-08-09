import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { transitionBookingStatus } from "@/lib/booking/lifecycle";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, payload, transactionRef, status, bookingId } = body;

    const targetRef = transactionRef || payload?.payment?.entity?.id || body?.id;
    const targetBookingId = bookingId || payload?.payment?.entity?.notes?.bookingId;

    if (!targetRef) {
      return NextResponse.json(
        { success: false, code: "BAD_REQUEST", message: "Missing payment transactionRef or entity payload." },
        { status: 400 }
      );
    }

    const payment = await prisma.payment.findFirst({
      where: {
        OR: [{ transactionRef: targetRef }, { bookingId: targetBookingId }],
      },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, code: "NOT_FOUND", message: `No pending payment record found for ref '${targetRef}'.` },
        { status: 404 }
      );
    }

    const isPaid = status === "completed" || status === "paid" || event === "payment.captured" || body?.status === "captured";

    if (isPaid) {
      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: "paid",
            paidAt: new Date(),
          },
        });

        await transitionBookingStatus(
          payment.bookingId,
          "confirmed",
          "Payment Webhook System",
          `Payment of ₹${payment.amount} captured via Webhook (Ref: ${payment.transactionRef})`,
          tx
        );
      });

      console.log(`✅ [Webhook Engine] Payment '${payment.transactionRef}' captured. Booking '${payment.bookingId}' confirmed.`);
      return NextResponse.json({
        success: true,
        message: "Payment captured successfully and booking transitioned to CONFIRMED.",
        paymentId: payment.id,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Webhook received with event '${event || status}'. No status change required.`,
    });
  } catch (err: unknown) {
    console.error("❌ Payment Webhook Error:", err);
    const message = err instanceof Error ? err.message : "Webhook processing failed.";
    return NextResponse.json(
      { success: false, code: "INTERNAL_SERVER_ERROR", message },
      { status: 500 }
    );
  }
}
