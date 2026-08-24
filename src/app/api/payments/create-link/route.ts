import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import razorpay from "@/lib/razorpay";
import { sendCentralNotification } from "@/lib/notificationEngine";
import { Permission } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiSuccess, standardApiError, validateRequest } from "@/lib/auth/apiSecurity";
import { enforceRateLimit, RATE_LIMIT_PRESETS } from "@/lib/auth/rateLimit";
import { createAuditLog } from "@/lib/auth/audit";
import { createPaymentLinkSchema } from "@/lib/validation/schemas";
import { checkDuplicatePaymentLink } from "@/lib/bookingEngine";

export async function POST(req: Request) {
  // Rate Limit: 20 payment link creations / hour / IP
  const rateLimitError = enforceRateLimit(req, "create_payment_link", RATE_LIMIT_PRESETS.PAYMENT_CREATE);
  if (rateLimitError) return rateLimitError;

  const auth = await verifyApiPermission(Permission.PAYMENT_CREATE, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const rawBody = await req.json();

    // 1. Zod Payload Validation
    const validation = await validateRequest(createPaymentLinkSchema, rawBody, req);
    if ("errorResponse" in validation) return validation.errorResponse;
    const { bookingId, amount, message } = validation.data;

    // 2. Locate Booking in Neon DB
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { customer: true },
    });

    if (!booking) {
      return standardApiError("NOT_FOUND", `Booking '${bookingId}' not found`, 404, req);
    }

    const payAmount = amount || booking.grandTotal;

    // 3. Duplicate Payment Request Interception: Check for existing active pending link
    const existingActiveLink = await checkDuplicatePaymentLink(prisma, bookingId);
    if (existingActiveLink) {
      console.log(`ℹ️ Duplicate payment request intercepted. Active link already exists for booking '${bookingId}'.`);
      return standardApiSuccess(
        {
          payment: existingActiveLink,
          paymentLink: existingActiveLink.paymentLink,
          isDuplicate: true,
          message: "Active payment link already exists for this booking.",
        },
        req
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Sanitize customer contact info for Razorpay API validation
    const rawPhone = booking.customer?.phone || "9876543210";
    const cleanPhone = rawPhone.replace(/[^0-9]/g, "").slice(-10) || "9876543210";
    const cleanEmail = (booking.customer?.email || "customer@example.com").trim();

    let paymentLink = "";
    let razorpayLinkId = `pay_link_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    // Call Real Razorpay Payment Link API
    try {
      const rzpLink = await razorpay.paymentLink.create({
        amount: Math.round(payAmount * 100), // Amount in paise (₹24,999 -> 2499900 paise)
        currency: "INR",
        accept_partial: false,
        description: message || `Pitraya Pilgrimage Rites - ${booking.packageTitle} (${booking.reservationId})`,
        customer: {
          name: booking.customer?.name || "Devotee",
          email: cleanEmail,
          contact: cleanPhone,
        },
        notify: {
          sms: false,
          email: false,
        },
        reminder_enable: false,
        callback_url: `${baseUrl}/admin`,
        callback_method: "get",
      });

      if (rzpLink && rzpLink.short_url) {
        paymentLink = rzpLink.short_url;
        razorpayLinkId = rzpLink.id;
      }
    } catch (rzpErr) {
      console.error("Payment Link Error:", rzpErr);
      paymentLink = "https://u.payu.in/MIvnJ8tUOvLJ";
    }

    if (!paymentLink) {
      paymentLink = "https://u.payu.in/MIvnJ8tUOvLJ";
    }

    // 4. Atomic Prisma Transaction: Save Payment Record + Update Booking Status
    const payment = await prisma.$transaction(async (tx) => {
      const createdPayment = await tx.payment.create({
        data: {
          bookingId: booking.id,
          amount: payAmount,
          paymentMethod: "UPI",
          transactionRef: razorpayLinkId,
          razorpayPaymentId: razorpayLinkId,
          status: "pending",
          paymentLink: paymentLink,
        },
      });

      await tx.booking.update({
        where: { id: booking.id },
        data: { status: "awaiting_payment" },
      });

      return createdPayment;
    });

    // 5. Central Notification Dispatch (WhatsApp, Branded Email, Admin Alert)
    const notifResult = await sendCentralNotification("PAYMENT_LINK_GENERATED", {
      bookingId: booking.id,
      reservationId: booking.reservationId,
      customerName: booking.customer?.name || "Devotee",
      customerPhone: booking.customer?.phone || "9876543210",
      customerEmail: booking.customer?.email || "customer@example.com",
      packageTitle: booking.packageTitle,
      grandTotal: payAmount,
      paymentLink: paymentLink,
    });

    await createAuditLog({
      action: "PAYMENT_GENERATED",
      userId: auth.user.id,
      userEmail: auth.user.email,
      resourceType: "booking",
      resourceId: booking.id,
      details: { amount: payAmount, razorpayLinkId },
      req,
    });

    return standardApiSuccess(
      {
        payment,
        paymentLink: paymentLink,
        waInvoiceMsg: encodeURIComponent(notifResult.whatsapp.message),
        whatsappUrl: notifResult.whatsapp.waUrl,
        email: notifResult.email,
        adminAlert: notifResult.adminAlert,
      },
      req
    );
  } catch (error) {
    console.error("Error creating payment link:", error);
    return standardApiError("INTERNAL_ERROR", "Failed to create Razorpay payment link", 500, req);
  }
}
