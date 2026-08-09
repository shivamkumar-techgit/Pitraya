import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import razorpay from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, amount } = body;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    const orderAmount = Math.round((amount || booking.grandTotal) * 100);

    const order = await razorpay.orders.create({
      amount: orderAmount,
      currency: "INR",
      receipt: `receipt_${booking.reservationId}`,
      notes: {
        bookingId: booking.id,
        reservationId: booking.reservationId,
        packageTitle: booking.packageTitle,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_TK1hVe2mSUe9EV",
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Razorpay checkout order" },
      { status: 500 }
    );
  }
}
