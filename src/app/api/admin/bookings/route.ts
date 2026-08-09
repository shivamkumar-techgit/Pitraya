import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { BookingStatus } from "@/lib/db/schema";
import { createPostJourneyReviewFlow } from "@/lib/postJourneyEngine";
import { Permission } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiSuccess, standardApiError, validateRequest } from "@/lib/auth/apiSecurity";
import { createAuditLog } from "@/lib/auth/audit";
import { updateBookingSchema } from "@/lib/validation/schemas";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const auth = await verifyApiPermission(Permission.BOOKING_READ, req);
  if ("errorResponse" in auth) return auth.errorResponse;
  const user = auth.user;

  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search")?.trim() || "";

    const whereClause: Prisma.BookingWhereInput = {};
    const andConditions: Prisma.BookingWhereInput[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { reservationId: { contains: search, mode: "insensitive" } },
          { customer: { phone: { contains: search, mode: "insensitive" } } },
          { customer: { email: { contains: search, mode: "insensitive" } } },
          { customer: { city: { contains: search, mode: "insensitive" } } },
          { customer: { name: { contains: search, mode: "insensitive" } } },
          { coordinator: { name: { contains: search, mode: "insensitive" } } },
          { pandit: { name: { contains: search, mode: "insensitive" } } },
          { hotel: { name: { contains: search, mode: "insensitive" } } },
        ],
      });
    }

    // Database-Level Scoping for COORDINATOR: query ONLY assigned bookings at PostgreSQL level
    if (user.role === "COORDINATOR") {
      const coordinatorOr: Prisma.BookingWhereInput[] = [];
      if (user.coordinatorId) {
        coordinatorOr.push({ coordinatorId: user.coordinatorId });
      }
      if (user.name) {
        coordinatorOr.push({ coordinator: { name: { contains: user.name, mode: "insensitive" } } });
      }
      if (coordinatorOr.length > 0) {
        andConditions.push({ OR: coordinatorOr });
      }
    }

    if (andConditions.length > 0) {
      whereClause.AND = andConditions;
    }

    const dbBookings = await prisma.booking.findMany({
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
        timelines: { orderBy: { timestamp: "asc" } },
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Map Prisma models to FullBookingRecord format
    const bookings = dbBookings.map((b) => ({
      id: b.id,
      reservationId: b.reservationId,
      userId: b.customerId,
      customerName: b.customer?.name || "Devotee Family",
      phone: b.customer?.phone || "",
      email: b.customer?.email || "",
      city: b.customer?.city || "Gaya",
      country: b.customer?.country || "India",
      packageTierId: b.packageId,
      packageTitle: b.packageTitle,
      duration: b.duration,
      status: b.status as BookingStatus,
      journeyStatus: b.journeyStatus || "not_started",
      paymentStatus: b.payments[0]?.status || "not_requested",
      grandTotal: b.grandTotal,
      adults: b.adults,
      elders: b.elders,
      children: b.children,
      totalCount: b.totalCount,
      wheelchairNeeded: b.wheelchairNeeded,
      airportPickupNeeded: b.airportPickupNeeded,
      arrivalDate: b.travel?.arrivalDate || "12 August",
      arrivalTime: b.travel?.arrivalTime || "10:30 AM",
      travelMode: b.travel?.mode || "flight",
      flightOrTrainNumber: b.travel?.flightOrTrainNumber || "",
      family: {
        adults: b.adults,
        elders: b.elders,
        children: b.children,
        totalCount: b.totalCount,
        wheelchairNeeded: b.wheelchairNeeded,
        airportPickupNeeded: b.airportPickupNeeded,
      },
      travel: {
        mode: b.travel?.mode || "flight",
        arrivalDate: b.travel?.arrivalDate || "12 August",
        arrivalTime: b.travel?.arrivalTime || "10:30 AM",
        flightOrTrainNumber: b.travel?.flightOrTrainNumber || "",
      },
      hotel: {
        title: b.hotel?.name || "⭐⭐⭐ Heritage Stay",
        roomsNeeded: 2,
      },
      assignedCoordinator: b.coordinator ? { id: b.coordinator.id, name: b.coordinator.name, phone: b.coordinator.phone, role: b.coordinator.role } : undefined,
      assignedPandit: b.pandit ? { id: b.pandit.id, name: b.pandit.name, phone: b.pandit.phone, title: b.pandit.title, sanctumSpecialty: b.pandit.sanctumSpecialty } : undefined,
      assignedVehicle: b.vehicle ? { id: b.vehicle.id, name: b.vehicle.name, driverName: b.vehicle.driverName, driverPhone: b.vehicle.driverPhone, vehicleNumber: b.vehicle.vehicleNumber } : undefined,
      assignedHotel: b.hotel ? { id: b.hotel.id, name: b.hotel.name, starRating: b.hotel.starRating, address: b.hotel.address, googleMapsUrl: b.hotel.googleMapsUrl, checkInTime: b.hotel.checkInTime } : undefined,
      notes: [],
      tasks: (b.tasks || []).map((t) => ({ id: t.id, title: t.title, completed: t.completed })),
      documents: (b.documents || []).map((d) => ({
        id: d.id,
        bookingId: d.bookingId,
        docType: d.docType,
        title: d.title,
        downloadUrl: d.downloadUrl,
        generatedAt: d.generatedAt.toISOString(),
      })),
      reviewFlow: b.reviews[0] ? {
        id: b.reviews[0].id,
        bookingId: b.reviews[0].bookingId,
        userId: b.reviews[0].customerId,
        googleReviewUrl: b.reviews[0].googleReviewUrl,
        photoUrls: b.reviews[0].photoUrls,
        feedbackRating: b.reviews[0].feedbackRating || 5,
        feedbackText: b.reviews[0].feedbackText || "",
        referralCode: b.reviews[0].referralCode,
        status: b.reviews[0].status,
        createdAt: b.reviews[0].createdAt.toISOString(),
      } : undefined,
      history: (b.timelines && b.timelines.length > 0)
        ? b.timelines.map((t) => ({
            id: t.id,
            action: `${t.title} — ${t.description}`,
            performedBy: "Status Engine",
            timestamp: t.timestamp.toISOString(),
          }))
        : [
            { id: `h-${b.id}`, action: "Booking Created & Saved to Neon DB", performedBy: "Web Wizard", timestamp: b.createdAt.toISOString() },
          ],
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    }));

    const todayStr = new Date().toISOString().split("T")[0];

    const todaysLeads = bookings.filter((b) => b.status === "lead");
    const pendingCalls = bookings.filter((b) => b.status === "lead" || b.status === "coordinator_assigned");
    const todaysArrivals = bookings.filter((b) => b.travel.arrivalDate === todayStr && b.status !== "cancelled");
    const todaysRituals = bookings.filter((b) => (b.status === "in_journey" || b.status === "confirmed") && b.travel.arrivalDate === todayStr);
    const paymentsPending = bookings.filter((b) => b.status === "payment_pending");
    const completedJourneys = bookings.filter((b) => b.status === "completed");

    return standardApiSuccess(
      {
        bookings,
        total: bookings.length,
        metrics: {
          todaysLeadsCount: todaysLeads.length,
          pendingCallsCount: pendingCalls.length,
          todaysArrivalsCount: todaysArrivals.length,
          todaysRitualsCount: todaysRituals.length,
          paymentsPendingCount: paymentsPending.length,
          completedJourneysCount: completedJourneys.length,
        },
        actionPanels: {
          todaysLeads,
          pendingCalls,
          todaysArrivals,
          todaysRituals,
          paymentsPending,
          completedJourneys,
        },
      },
      req
    );
  } catch (err) {
    console.error("GET /api/admin/bookings database error:", err);
    return standardApiError("INTERNAL_ERROR", "Failed to fetch bookings from database", 500, req);
  }
}

export async function PATCH(req: Request) {
  const auth = await verifyApiPermission(Permission.BOOKING_UPDATE, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const rawBody = await req.json();

    // 1. Zod Payload Validation
    const validation = await validateRequest(updateBookingSchema, rawBody, req);
    if ("errorResponse" in validation) return validation.errorResponse;
    const { id, status, coordinatorId, panditId, vehicleId, hotelId } = validation.data;

    // 2. Business Rule Validation: Verify booking existence & status rules
    const existingBooking = await prisma.booking.findUnique({ where: { id } });
    if (!existingBooking) {
      return standardApiError("NOT_FOUND", `Booking with ID '${id}' not found`, 404, req);
    }

    if (existingBooking.status === "completed" && status && status !== "completed") {
      return standardApiError("BAD_REQUEST", "Business Rule Error: Cannot modify a completed booking", 400, req);
    }

    const updateData: Prisma.BookingUncheckedUpdateInput = {};
    if (status) updateData.status = status;
    if (coordinatorId !== undefined) updateData.coordinatorId = coordinatorId;
    if (panditId !== undefined) updateData.panditId = panditId;
    if (vehicleId !== undefined) updateData.vehicleId = vehicleId;
    if (hotelId !== undefined) updateData.hotelId = hotelId;

    // 3. Atomic Prisma Transaction: Booking update + Review flow upsert
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
        },
      });

      if (status === "completed") {
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
            feedbackText: "Sacred experience at Vishnupad Sanctum.",
            referralCode: reviewFlow.referralCode,
            status: "pending_request",
          },
        });
      }

      return b;
    });

    await createAuditLog({
      action: "BOOKING_UPDATED",
      userId: auth.user.id,
      userEmail: auth.user.email,
      resourceType: "booking",
      resourceId: id,
      details: { status, coordinatorId, panditId, vehicleId, hotelId },
      req,
    });

    return standardApiSuccess({ booking: updatedBooking }, req);
  } catch (err) {
    console.error("PATCH /api/admin/bookings error:", err);
    return standardApiError("INTERNAL_ERROR", "Failed to update booking in database", 500, req);
  }
}
