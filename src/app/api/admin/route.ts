import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { createPostJourneyReviewFlow } from "@/lib/postJourneyEngine";
import { Permission } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiSuccess, standardApiError } from "@/lib/auth/apiSecurity";

export async function GET(req: Request) {
  const auth = await verifyApiPermission(Permission.DASHBOARD_READ, req);
  if ("errorResponse" in auth) return auth.errorResponse;
  const user = auth.user;

  try {
    const whereClause: Prisma.BookingWhereInput = {};
    if (user.role === "COORDINATOR") {
      const coordinatorOr: Prisma.BookingWhereInput[] = [];
      if (user.coordinatorId) coordinatorOr.push({ coordinatorId: user.coordinatorId });
      if (user.name) coordinatorOr.push({ coordinator: { name: { contains: user.name, mode: "insensitive" } } });
      if (coordinatorOr.length > 0) whereClause.OR = coordinatorOr;
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        customer: true,
        package: true,
        travel: true,
        hotel: true,
        vehicle: true,
        pandit: true,
        coordinator: true,
        payments: true,
        documents: true,
        tasks: true,
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const todaysLeads = bookings.filter((b) => b.status === "lead");
    const pendingCalls = bookings.filter((b) => b.status === "lead" || b.status === "coordinator_assigned");
    const todaysArrivals = bookings.filter((b) => b.travel?.arrivalDate === new Date().toISOString().split("T")[0]);
    const todaysRituals = bookings.filter((b) => b.status === "in_journey" || b.status === "confirmed");
    const paymentsPending = bookings.filter((b) => b.status === "payment_pending");
    const completedJourneys = bookings.filter((b) => b.status === "completed");

    return standardApiSuccess(
      {
        metrics: {
          totalBookings: bookings.length,
          todaysLeadsCount: todaysLeads.length,
          pendingCallsCount: pendingCalls.length,
          todaysArrivalsCount: todaysArrivals.length,
          todaysRitualsCount: todaysRituals.length,
          paymentsPendingCount: paymentsPending.length,
          completedJourneysCount: completedJourneys.length,
        },
        bookings,
      },
      req
    );
  } catch (error) {
    console.error("Error in admin route:", error);
    return standardApiError("INTERNAL_ERROR", "Failed to fetch admin operations data", 500, req);
  }
}

export async function PATCH(req: Request) {
  const auth = await verifyApiPermission(Permission.BOOKING_UPDATE, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { id, status, coordinatorId, panditId, vehicleId, hotelId } = body;

    if (!id) {
      return standardApiError("BAD_REQUEST", "Missing booking ID parameter", 400, req);
    }

    const existingBooking = await prisma.booking.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!existingBooking) {
      return standardApiError("NOT_FOUND", "Booking not found", 404, req);
    }

    const updateData: Prisma.BookingUncheckedUpdateInput = {};
    if (status) updateData.status = status;
    if (coordinatorId !== undefined) updateData.coordinatorId = coordinatorId || null;
    if (panditId !== undefined) updateData.panditId = panditId || null;
    if (vehicleId !== undefined) updateData.vehicleId = vehicleId || null;
    if (hotelId !== undefined) updateData.hotelId = hotelId || null;

    const updatedBooking = await prisma.booking.update({
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
        reviews: true,
      },
    });

    // Auto Trigger Post-Journey Review Flow when Status is Completed
    if (status === "completed") {
      const reviewFlow = createPostJourneyReviewFlow({
        id: updatedBooking.id,
        reservationId: updatedBooking.reservationId,
        userId: updatedBooking.customerId,
      });

      await prisma.review.upsert({
        where: { id: reviewFlow.id },
        update: {
          referralCode: reviewFlow.referralCode,
          status: reviewFlow.status,
        },
        create: {
          id: reviewFlow.id,
          bookingId: updatedBooking.id,
          customerId: updatedBooking.customerId,
          googleReviewUrl: reviewFlow.googleReviewUrl,
          photoUrls: [],
          feedbackRating: 5,
          feedbackText: "Sacred, seamless experience at Vishnupad Sanctum.",
          referralCode: reviewFlow.referralCode,
          status: "pending_request",
        },
      });
    }

    return standardApiSuccess({ booking: updatedBooking }, req);
  } catch (error) {
    console.error("Error updating booking in admin PATCH:", error);
    return standardApiError("INTERNAL_ERROR", "Failed to update booking", 500, req);
  }
}
