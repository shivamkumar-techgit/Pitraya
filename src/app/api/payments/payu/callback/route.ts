import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPayUResponseHash } from "@/lib/payments/payu";
import { sendCentralNotification } from "@/lib/notificationEngine";
import { getSiteUrl } from "@/lib/config/site";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const responseBody: Record<string, string> = {};

    formData.forEach((value, key) => {
      responseBody[key] = value.toString();
    });

    console.log("📥 PayU Callback Response Received:", {
      status: responseBody.status,
      txnid: responseBody.txnid,
      amount: responseBody.amount,
      mihpayid: responseBody.mihpayid,
      unmappedstatus: responseBody.unmappedstatus,
    });

    const isHashValid = verifyPayUResponseHash(responseBody);
    const baseUrl = getSiteUrl();

    const bookingId = responseBody.udf1;
    const reservationId = responseBody.udf2;
    const status = responseBody.status;
    const txnid = responseBody.txnid;
    const mihpayid = responseBody.mihpayid || txnid;

    if (!isHashValid) {
      console.error("❌ PayU Hash Verification Failed! Possible tampering.");
      return NextResponse.redirect(
        `${baseUrl}/portal?reservationId=${reservationId || ""}&payment=hash_error`,
        303
      );
    }

    if (status === "success") {
      console.log(
        `✅ PayU Payment SUCCESS for TxnID: ${txnid}, Reservation: ${reservationId}`
      );

      if (bookingId || reservationId) {
        // Find booking
        const booking = await prisma.booking.findFirst({
          where: { OR: [{ id: bookingId }, { reservationId }] },
          include: { customer: true },
        });

        if (booking) {
          // 1. Update Booking status to confirmed
          await prisma.booking.update({
            where: { id: booking.id },
            data: {
              status: "confirmed",
              journeyStatus: "not_started",
            },
          });

          // 2. Update or Upsert Payment Record
          await prisma.payment.upsert({
            where: { transactionRef: txnid },
            update: {
              status: "paid",
              paidAt: new Date(),
              paymentMethod: "Card",
            },
            create: {
              bookingId: booking.id,
              amount: parseFloat(responseBody.amount || "0"),
              paymentMethod: "Card",
              transactionRef: txnid,
              status: "paid",
              paidAt: new Date(),
              paymentLink: `https://secure.payu.in`,
            },
          });

          // 3. Dispatch Confirmation Email & WhatsApp
          await sendCentralNotification("PAYMENT_RECEIVED", {
            bookingId: booking.id,
            reservationId: booking.reservationId,
            customerName: booking.customer.name,
            customerPhone: booking.customer.phone,
            customerEmail: booking.customer.email,
            packageTitle: booking.packageTitle,
            grandTotal: booking.grandTotal,
          });

          return NextResponse.redirect(
            `${baseUrl}/portal?reservationId=${booking.reservationId}&payment=success&txnid=${txnid}`,
            303
          );
        }
      }

      return NextResponse.redirect(
        `${baseUrl}/portal?payment=success&txnid=${txnid}`,
        303
      );
    } else {
      console.warn(`⚠️ PayU Payment FAILED/CANCELLED for TxnID: ${txnid}`);

      if (bookingId || reservationId) {
        await prisma.payment.updateMany({
          where: { transactionRef: txnid },
          data: { status: "failed" },
        });
      }

      return NextResponse.redirect(
        `${baseUrl}/portal?reservationId=${reservationId || ""}&payment=failed&reason=${responseBody.error_Message || "Payment cancelled"}`,
        303
      );
    }
  } catch (error) {
    console.error("PayU Callback Error:", error);
    const baseUrl = getSiteUrl();
    return NextResponse.redirect(`${baseUrl}/portal?payment=error`, 303);
  }
}
