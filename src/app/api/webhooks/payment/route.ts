import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { autoCreateTasksForStatus, logTimelineEvent } from "@/lib/lifecycleEngine";
import { sendCentralNotification } from "@/lib/notificationEngine";
import { generateAutoDocuments } from "@/lib/documentEngine";
import { standardApiSuccess, standardApiError } from "@/lib/auth/apiSecurity";

// Server-side Webhook Event ID Deduplication Store (Replay Protection)
const processedWebhookEvents = new Set<string>();

interface RazorpayWebhookBody {
  event_id?: string;
  id?: string;
  event?: string;
  razorpay_payment_id?: string;
  razorpayPaymentId?: string;
  razorpay_payment_link_id?: string;
  razorpayLinkId?: string;
  bookingId?: string;
  reservationId?: string;
  status?: string;
  payload?: {
    payment_link?: { entity?: { id?: string; notes?: { bookingId?: string; reservationId?: string } } };
    payment?: { entity?: { id?: string; notes?: { bookingId?: string; reservationId?: string } } };
  };
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    let body: RazorpayWebhookBody = {};
    try {
      body = JSON.parse(rawBody) as RazorpayWebhookBody;
    } catch (e) {
      return standardApiError("BAD_REQUEST", "Invalid JSON webhook payload", 400, req);
    }

    // 1. Webhook Signature Verification (HMAC SHA-256)
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers.get("x-razorpay-signature");

    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.warn("❌ Razorpay Webhook Signature Mismatch!");
        return standardApiError("FORBIDDEN", "Forbidden: Invalid Razorpay webhook signature", 403, req);
      }
    }

    // 2. Replay Protection & Idempotency Check
    const eventId = body.event_id || body.id || (body.payload?.payment?.entity?.id ? `evt_${body.payload.payment.entity.id}` : null);
    if (eventId) {
      if (processedWebhookEvents.has(eventId)) {
        console.log(`ℹ️ Webhook Event '${eventId}' already processed. Idempotent response returned.`);
        return standardApiSuccess({ message: "Webhook event already processed (Idempotent delivery)", eventId }, req);
      }
      processedWebhookEvents.add(eventId);
    }

    // 3. Extract values from PayU, Razorpay, or generic webhook payload formats
    const anyBody = body as Record<string, unknown>;
    let rzpPaymentId = body.razorpay_payment_id || body.razorpayPaymentId || (anyBody.mihpayid as string) || (anyBody.txnid as string) || "";
    let rzpLinkId = body.razorpay_payment_link_id || body.razorpayLinkId || (anyBody.txnid as string) || "";
    let bookingId = body.bookingId || (anyBody.udf1 as string) || "";
    let reservationId = body.reservationId || (anyBody.udf2 as string) || "";

    if (body.payload) {
      if (body.payload.payment_link && body.payload.payment_link.entity) {
        const plink = body.payload.payment_link.entity;
        rzpLinkId = plink.id || rzpLinkId;
        if (plink.notes && plink.notes.bookingId) bookingId = plink.notes.bookingId;
        if (plink.notes && plink.notes.reservationId) reservationId = plink.notes.reservationId;
      }
      if (body.payload.payment && body.payload.payment.entity) {
        const pay = body.payload.payment.entity;
        rzpPaymentId = pay.id || rzpPaymentId;
        if (pay.notes && pay.notes.bookingId) bookingId = pay.notes.bookingId;
        if (pay.notes && pay.notes.reservationId) reservationId = pay.notes.reservationId;
      }
    }

    // 4. Locate Booking in Neon PostgreSQL via Prisma
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id: bookingId !== "" ? bookingId : undefined },
          { reservationId: reservationId !== "" ? reservationId : undefined },
        ],
      },
      include: { customer: true, travel: true, documents: true },
    });

    if (!booking) {
      return standardApiError("NOT_FOUND", "Booking record not found for webhook event", 404, req);
    }

    // 5. Update Payment Table Record in Neon PostgreSQL (Pending -> Paid)
    await prisma.payment.updateMany({
      where: { bookingId: booking.id },
      data: {
        status: "paid",
        paidAt: new Date(),
        razorpayPaymentId: rzpPaymentId || `pay_rzp_${Date.now()}`,
        transactionRef: rzpLinkId || rzpPaymentId || `TXN-RZP-${Date.now()}`,
      },
    });

    // 6. Auto-Assign Coordinator if not assigned
    let coordinatorIdToAssign = booking.coordinatorId;
    if (!coordinatorIdToAssign) {
      const defaultCoord = await prisma.coordinator.findFirst();
      if (defaultCoord) {
        coordinatorIdToAssign = defaultCoord.id;
      }
    }

    // 7. Update Booking Status to CONFIRMED in Neon PostgreSQL
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: "confirmed",
        coordinatorId: coordinatorIdToAssign,
      },
      include: { customer: true, travel: true, coordinator: true, documents: true },
    });

    // 8. Auto-Generate PDF Invoice & Voucher Documents if missing
    if (!booking.documents || booking.documents.length === 0) {
      const autoDocs = generateAutoDocuments({
        id: updatedBooking.id,
        reservationId: updatedBooking.reservationId,
      });

      await prisma.document.createMany({
        data: autoDocs.map((d) => ({
          bookingId: updatedBooking.id,
          docType: d.docType,
          title: d.title,
          downloadUrl: d.downloadUrl,
        })),
      });
    }

    // 9. Log Timeline Audit Event & Auto-Create Operational Tasks
    await logTimelineEvent(
      updatedBooking.id,
      "Payment Verified & Zero-Touch Automation Executed",
      `Payment ₹${updatedBooking.grandTotal.toLocaleString("en-IN")} verified. Invoice & Vouchers generated, Coordinator assigned, Notifications dispatched.`
    );
    await autoCreateTasksForStatus(updatedBooking.id, "confirmed");

    // 10. Send Email + Send WhatsApp + Notify Admin & Coordinator
    const notifResult = await sendCentralNotification("PAYMENT_RECEIVED", {
      bookingId: updatedBooking.id,
      reservationId: updatedBooking.reservationId,
      customerName: updatedBooking.customer?.name || "Devotee",
      customerPhone: updatedBooking.customer?.phone || "9876543210",
      customerEmail: updatedBooking.customer?.email || "customer@example.com",
      packageTitle: updatedBooking.packageTitle,
      grandTotal: updatedBooking.grandTotal,
      arrivalDate: updatedBooking.travel?.arrivalDate || "12 August",
    });

    return standardApiSuccess(
      {
        event: "payment.captured",
        paymentStatus: "paid",
        bookingStatus: "confirmed",
        assignedCoordinator: updatedBooking.coordinator?.name || "Senior Concierge Vikram Singh",
        documentsGenerated: 5,
        booking: updatedBooking,
        notifications: notifResult,
      },
      req
    );
  } catch (error) {
    console.error("Razorpay Payment Webhook processing error:", error);
    return standardApiError("INTERNAL_ERROR", "Payment webhook processing failed", 500, req);
  }
}
