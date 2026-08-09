import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma, BookingStatus, PaymentStatus, JourneyStatus } from "@prisma/client";
import { autoCreateTasksForStatus, logTimelineEvent } from "@/lib/lifecycleEngine";
import { createPostJourneyReviewFlow } from "@/lib/postJourneyEngine";
import { sendCentralNotification } from "@/lib/notificationEngine";
import type { NotificationResult } from "@/lib/notificationEngine";
import { Permission, hasResourceAccess } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiSuccess, standardApiError, validateRequest } from "@/lib/auth/apiSecurity";
import { createAuditLog } from "@/lib/auth/audit";
import { updateBookingSchema } from "@/lib/validation/schemas";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyApiPermission(Permission.BOOKING_UPDATE, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const { id } = await params;
    const rawBody = await req.json();

    if (!id) {
      return standardApiError("BAD_REQUEST", "Missing booking ID parameter", 400, req);
    }

    // 1. Zod Payload Validation
    const validation = await validateRequest(updateBookingSchema, { ...rawBody, id }, req);
    if ("errorResponse" in validation) return validation.errorResponse;
    const { status, journeyStatus, paymentStatus, coordinatorId, panditId, vehicleId, hotelId } = validation.data;

    const existingBooking = await prisma.booking.findUnique({
      where: { id },
      include: { customer: true, hotel: true, vehicle: true, coordinator: true },
    });

    if (!existingBooking) {
      return standardApiError("NOT_FOUND", `Booking '${id}' not found`, 404, req);
    }

    // 2. Ownership & Resource Access verification for Coordinators
    const hasAccess = hasResourceAccess(auth.user, "booking", {
      coordinatorId: existingBooking.coordinatorId,
      coordinatorName: existingBooking.coordinator?.name,
    });

    if (!hasAccess) {
      return standardApiError("FORBIDDEN", "Forbidden: You can only update bookings assigned to your coordinator profile.", 403, req);
    }

    // 3. Business Rule Validation: Cannot modify completed bookings
    if (existingBooking.status === "completed" && status && status !== "completed") {
      return standardApiError("BAD_REQUEST", "Business Rule Error: Completed bookings cannot be modified.", 400, req);
    }

    const updateData: Prisma.BookingUncheckedUpdateInput = {};
    const newBookingStatus = status;
    if (newBookingStatus) updateData.status = newBookingStatus as BookingStatus;
    if (journeyStatus) updateData.journeyStatus = journeyStatus as JourneyStatus;
    if (coordinatorId !== undefined) updateData.coordinatorId = coordinatorId || null;
    if (panditId !== undefined) updateData.panditId = panditId || null;
    if (vehicleId !== undefined) updateData.vehicleId = vehicleId || null;
    if (hotelId !== undefined) updateData.hotelId = hotelId || null;

    // 4. Atomic Prisma Transaction: Update booking + payments + review flow
    const updatedBooking = await prisma.$transaction(async (tx) => {
      const b = await tx.booking.update({
        where: { id },
        data: updateData,
        include: {
          customer: true,
          package: true,
          travel: true,
          hotel: true,
          vehicle: true,
          pandit: true,
          coordinator: true,
          payments: true,
          tasks: true,
          timelines: true,
          reviews: true,
        },
      });

      // Update Payment Status if requested
      if (paymentStatus) {
        await tx.payment.updateMany({
          where: { bookingId: id },
          data: { status: paymentStatus as PaymentStatus },
        });
      }

      // Auto Trigger Review Flow when Status is Completed
      if (newBookingStatus === "completed" || journeyStatus === "completed") {
        const reviewFlow = createPostJourneyReviewFlow({
          id: b.id,
          reservationId: b.reservationId,
          userId: b.customerId,
        });

        await tx.review.upsert({
          where: { id: reviewFlow.id },
          update: {
            referralCode: reviewFlow.referralCode,
            status: reviewFlow.status,
          },
          create: {
            id: reviewFlow.id,
            bookingId: b.id,
            customerId: b.customerId,
            googleReviewUrl: reviewFlow.googleReviewUrl,
            photoUrls: [],
            feedbackRating: 5,
            feedbackText: "Sacred, seamless experience at Vishnupad Sanctum.",
            referralCode: reviewFlow.referralCode,
            status: "pending_request",
          },
        });
      }

      return b;
    });

    // 5. Timeline Audit & Lifecycle Tasks
    if (newBookingStatus && newBookingStatus !== existingBooking.status) {
      const nowStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      await logTimelineEvent(
        updatedBooking.id,
        `Booking Status Changed to ${newBookingStatus.toUpperCase()}`,
        `Booking status updated from ${existingBooking.status} to ${newBookingStatus} at ${nowStr}.`
      );
      await autoCreateTasksForStatus(updatedBooking.id, newBookingStatus as BookingStatus);
    }

    if (journeyStatus && journeyStatus !== existingBooking.journeyStatus) {
      await logTimelineEvent(
        updatedBooking.id,
        `Journey Status Changed to ${journeyStatus.toUpperCase()}`,
        `Journey status updated to ${journeyStatus}.`
      );
    }

    let notifResult: NotificationResult | null = null;

    // Automated Notification Triggers
    if (coordinatorId && coordinatorId !== existingBooking.coordinatorId && updatedBooking.coordinator) {
      notifResult = await sendCentralNotification("COORDINATOR_ASSIGNED", {
        bookingId: updatedBooking.id,
        reservationId: updatedBooking.reservationId,
        customerName: updatedBooking.customer.name,
        customerPhone: updatedBooking.customer.phone,
        customerEmail: updatedBooking.customer.email,
        packageTitle: updatedBooking.packageTitle,
        grandTotal: updatedBooking.grandTotal,
        coordinatorName: updatedBooking.coordinator.name,
        coordinatorPhone: updatedBooking.coordinator.phone,
      });
    }

    await createAuditLog({
      action: "BOOKING_UPDATED",
      userId: auth.user.id,
      userEmail: auth.user.email,
      resourceType: "booking",
      resourceId: id,
      details: { newBookingStatus, paymentStatus, journeyStatus },
      req,
    });

    return standardApiSuccess(
      {
        booking: updatedBooking,
        notification: notifResult,
      },
      req
    );
  } catch (error) {
    console.error("PATCH /api/bookings/:id database error:", error);
    return standardApiError("INTERNAL_ERROR", "Failed to update booking in database", 500, req);
  }
}
