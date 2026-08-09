import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAutoDocuments } from "@/lib/documentEngine";
import { DEFAULT_TASKS_KEYS } from "@/lib/bookingStore";
import { sendCentralNotification } from "@/lib/notificationEngine";
import { standardApiSuccess, standardApiError, validateRequest } from "@/lib/auth/apiSecurity";
import { enforceRateLimit, RATE_LIMIT_PRESETS } from "@/lib/auth/rateLimit";
import { bookingWizardSchema } from "@/lib/validation/schemas";
import { mintUniqueReservationId, checkDuplicateBooking } from "@/lib/bookingEngine";

export async function POST(req: Request) {
  // Rate Limit: Max 10 submissions per minute per IP
  const rateLimitError = enforceRateLimit(req, "booking_submit", RATE_LIMIT_PRESETS.BOOKING_SUBMIT);
  if (rateLimitError) return rateLimitError;

  try {
    const rawBody = await req.json();

    // 1. Zod Validation
    const validation = await validateRequest(bookingWizardSchema, rawBody, req);
    if ("errorResponse" in validation) return validation.errorResponse;
    const body = validation.data;

    const custName = body.name;
    const custPhone = body.phone;
    const custEmail = body.email;
    const custCity = body.city;
    const custCountry = body.country;

    // 2. Atomic Prisma Transaction for Multi-Step Booking & Duplicate Prevention
    const transactionResult = await prisma.$transaction(
      async (tx) => {
        // Prevent Duplicate Bookings (Check if lead created for same phone in last 5 mins)
        const duplicateLead = await checkDuplicateBooking(tx, custPhone, body.arrivalDate);
        if (duplicateLead) {
          console.log(`ℹ️ Duplicate booking prevented for phone ${custPhone}. Returning existing lead '${duplicateLead.reservationId}'.`);
          return {
            isDuplicate: true,
            booking: duplicateLead,
            reservationId: duplicateLead.reservationId,
          };
        }

        // Create or Update Customer (Upsert by unique phone)
        const customerRecord = await tx.customer.upsert({
          where: { phone: custPhone },
          update: {
            name: custName,
            email: custEmail,
            city: custCity,
            country: custCountry,
          },
          create: {
            name: custName,
            phone: custPhone,
            email: custEmail,
            city: custCity,
            country: custCountry,
          },
        });

        // Resolve Package Record in Neon DB
        const validPackageId = body.packageId;
        let pkgRecord = null;
        if (validPackageId) {
          pkgRecord = await tx.package.findUnique({ where: { id: validPackageId } });
        }
        if (!pkgRecord) {
          pkgRecord = await tx.package.findFirst();
        }
        if (!pkgRecord) {
          pkgRecord = await tx.package.create({
            data: {
              id: "heritage-experience",
              title: body.packageTitle || "Heritage Experience",
              startingPrice: body.grandTotal || 24999,
              duration: body.duration || "2 Days / 1 Night",
            },
          });
        }

        // Mint Collision-Proof Reservation ID
        const reservationId = await mintUniqueReservationId(tx);

        // Create Booking Record in Neon PostgreSQL
        const booking = await tx.booking.create({
          data: {
            reservationId,
            customerId: customerRecord.id,
            packageId: pkgRecord.id,
            packageTitle: body.packageTitle || pkgRecord.title,
            duration: body.duration || pkgRecord.duration,
            status: "lead",
            journeyStatus: "not_started",
            grandTotal: body.grandTotal || pkgRecord.startingPrice || 24999,
            adults: body.adults,
            elders: body.elders,
            children: body.children,
            totalCount: body.totalCount,
            wheelchairNeeded: body.wheelchairNeeded,
            airportPickupNeeded: body.airportPickupNeeded,
            travel: {
              create: {
                mode: body.travelMode,
                arrivalDate: body.arrivalDate,
                arrivalTime: body.arrivalTime,
                flightOrTrainNumber: body.flightOrTrainNumber || "",
              },
            },
            tasks: {
              create: DEFAULT_TASKS_KEYS.map((k, idx) => ({
                taskKey: k,
                title: k,
                completed: idx === 0,
              })),
            },
          },
          include: {
            customer: true,
            travel: true,
            tasks: true,
          },
        });

        // Auto-Generate 5 Documents
        const autoDocs = generateAutoDocuments({
          id: booking.id,
          reservationId: booking.reservationId,
        });

        await tx.document.createMany({
          data: autoDocs.map((d) => ({
            bookingId: booking.id,
            docType: d.docType,
            title: d.title,
            downloadUrl: d.downloadUrl,
          })),
        });

        return {
          isDuplicate: false,
          booking,
          reservationId: booking.reservationId,
        };
      },
      { timeout: 30000 }
    );

    // If duplicate was intercepted, return cleanly
    if (transactionResult.isDuplicate) {
      return standardApiSuccess(
        {
          reservationId: transactionResult.reservationId,
          status: "lead",
          booking: transactionResult.booking,
          isDuplicate: true,
          message: "Duplicate booking detected: active lead already created in the last 5 minutes.",
        },
        req
      );
    }

    const createdBooking = transactionResult.booking;

    // Central Notification Dispatch (Email, WhatsApp, Admin Alert)
    const notifications = await sendCentralNotification("BOOKING_CREATED", {
      bookingId: createdBooking.id,
      reservationId: createdBooking.reservationId,
      customerName: createdBooking.customer.name,
      customerPhone: createdBooking.customer.phone,
      customerEmail: createdBooking.customer.email,
      packageTitle: createdBooking.packageTitle,
      grandTotal: createdBooking.grandTotal,
      arrivalDate: createdBooking.travel?.arrivalDate,
    });

    return standardApiSuccess(
      {
        reservationId: createdBooking.reservationId,
        status: "lead",
        booking: createdBooking,
        notifications,
        message: "New Lead created atomically and saved to Neon DB",
      },
      req
    );
  } catch (err) {
    console.error("Submission error:", err);
    return standardApiError("INTERNAL_ERROR", "Failed to submit booking", 500, req);
  }
}
