import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createPayUPaymentPayload } from "@/lib/payments/payu";
import { getSiteUrl } from "@/lib/config/site";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      bookingId,
      reservationId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      packageTitle,
    } = body;

    if (!bookingId && !reservationId) {
      return NextResponse.json(
        { success: false, error: "Booking ID or Reservation ID is required" },
        { status: 400 }
      );
    }

    // Lookup Booking in Database
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id: bookingId }, { reservationId: reservationId }],
      },
      include: { customer: true },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking record not found" },
        { status: 404 }
      );
    }

    const payAmount = amount || booking.grandTotal || 11000;
    const firstname =
      (customerName || booking.customer.name || "Yajman").split(" ")[0] ||
      "Yajman";
    const email =
      customerEmail || booking.customer.email || "devotee@pitraya.com";
    const phone = customerPhone || booking.customer.phone || "9999999999";
    const productinfo = (
      packageTitle ||
      booking.packageTitle ||
      "Pitraya Gaya Pilgrimage"
    ).replace(/[^a-zA-Z0-9\s]/g, "");

    // Generate unique PayU transaction ID (e.g. TXN_PIT_RES123456_timestamp)
    const txnid = `TXN_${booking.reservationId}_${Date.now()}`;

    const baseUrl = getSiteUrl();
    const surl = `${baseUrl}/api/payments/payu/callback`;
    const furl = `${baseUrl}/api/payments/payu/callback`;

    // Create PayU payload with calculated SHA-512 Hash
    const payuPayload = createPayUPaymentPayload({
      txnid,
      amount: payAmount,
      productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      udf1: booking.id,
      udf2: booking.reservationId,
    });

    // Optionally create pending payment record in DB
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: payAmount,
        paymentMethod: "Card",
        transactionRef: txnid,
        status: "pending",
        paymentLink: `${payuPayload.actionUrl}?txnid=${txnid}`,
      },
    });

    return NextResponse.json({
      success: true,
      payuPayload,
    });
  } catch (error) {
    console.error("PayU Payment Creation Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error preparing PayU transaction",
      },
      { status: 500 }
    );
  }
}
