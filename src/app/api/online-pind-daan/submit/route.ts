import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { mintUniqueReservationId } from "@/lib/bookingEngine";
import { sendCentralNotification } from "@/lib/notificationEngine";
import { standardApiSuccess, standardApiError } from "@/lib/auth/apiSecurity";
import { enforceRateLimit, RATE_LIMIT_PRESETS } from "@/lib/auth/rateLimit";
import { generateAutoDocuments } from "@/lib/documentEngine";

// ─── Validation Schema ────────────────────────────────────────────────────────
const onlinePindDaanSchema = z.object({
  // Devotee contact
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .min(10)
    .max(15)
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number"),
  email: z.string().email().toLowerCase(),

  // Package
  packageId: z.enum(["essential", "complete", "family"]),
  packageTitle: z.string(),
  grandTotal: z.number().min(0),

  // Ritual details
  ritualDate: z.string().optional().default("Next auspicious Muhurat"),

  // Ancestor info
  ancestorName: z.string().min(1),
  relationship: z.string().default("Father"),
  gotra: z.string().default("Kashyap"),

  // Participants
  sankalpPerformer: z.string().default("Son"),
  participantCount: z.string().default("1-3 Family Members"),

  // Optional
  specialReqs: z.array(z.string()).optional().default([]),
  customNotes: z.string().optional().default(""),
});

export async function POST(req: Request) {
  // Rate limit: 10 submissions per minute per IP
  const rateLimitError = enforceRateLimit(
    req,
    "online_pind_daan",
    RATE_LIMIT_PRESETS.BOOKING_SUBMIT
  );
  if (rateLimitError) return rateLimitError;

  try {
    const rawBody = await req.json();

    // Validate input
    const parsed = onlinePindDaanSchema.safeParse(rawBody);
    if (!parsed.success) {
      return standardApiError(
        "BAD_REQUEST",
        parsed.error.issues.map((issue) => issue.message).join("; "),
        400,
        req
      );
    }
    const body = parsed.data;

    // Build enriched ancestor details string for the timeline note
    const ancestorDetails = [
      `Ancestor: ${body.ancestorName} (${body.relationship})`,
      `Gotra: ${body.gotra}`,
      `Sankalpa Performer: ${body.sankalpPerformer}`,
      `Participants: ${body.participantCount}`,
      body.specialReqs.length > 0
        ? `Special Requirements: ${body.specialReqs.join(", ")}`
        : null,
      body.customNotes ? `Custom Notes: ${body.customNotes}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const result = await prisma.$transaction(
      async (tx) => {
        // Prevent duplicate submissions (same phone within 5 minutes)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const existingLead = await tx.booking.findFirst({
          where: {
            customer: { phone: body.phone },
            createdAt: { gte: fiveMinutesAgo },
          },
          include: { customer: true, travel: true, tasks: true },
        });
        if (existingLead) {
          return {
            isDuplicate: true,
            booking: existingLead,
            reservationId: existingLead.reservationId,
          };
        }

        // Upsert customer record (create or update by phone)
        const customer = await tx.customer.upsert({
          where: { phone: body.phone },
          update: {
            name: body.name,
            email: body.email,
          },
          create: {
            name: body.name,
            phone: body.phone,
            email: body.email,
            city: "Online",
            country: "India",
          },
        });

        // Resolve or create Online Pind Daan package
        // We look for an existing package with a matching title
        const pkgTitle = `Online Pind Daan — ${body.packageTitle}`;
        let pkgRecord = await tx.package.findFirst({
          where: { title: pkgTitle },
        });
        if (!pkgRecord) {
          pkgRecord = await tx.package.create({
            data: {
              title: pkgTitle,
              startingPrice: body.grandTotal,
              duration: "1 Day (Remote Ritual in Gaya)",
              description: `Online Pind Daan service — ${body.packageTitle} package. Performed by Gayawal Pandits at Vishnupad, Gaya.`,
            },
          });
        }

        // Mint a collision-proof reservation ID
        const reservationId = await mintUniqueReservationId(tx);

        // Create the booking record
        const booking = await tx.booking.create({
          data: {
            reservationId,
            customerId: customer.id,
            packageId: pkgRecord.id,
            packageTitle: pkgTitle,
            duration: "1 Day (Remote Ritual in Gaya)",
            status: "lead",
            journeyStatus: "not_started",
            grandTotal: body.grandTotal,
            adults: 1,
            elders: 0,
            children: 0,
            totalCount: 1,
            wheelchairNeeded: false,
            airportPickupNeeded: false,
            travel: {
              create: {
                mode: "road",
                arrivalDate: body.ritualDate || "Next auspicious Muhurat",
                arrivalTime: "Morning (Brahma Muhurat)",
                flightOrTrainNumber: "",
              },
            },
            tasks: {
              create: [
                {
                  taskKey: "Call Customer",
                  title: "Call Customer",
                  completed: false,
                },
                {
                  taskKey: "Verify Gotra Details",
                  title: "Verify Gotra & Ancestor Details",
                  completed: false,
                },
                {
                  taskKey: "Assign Pandit",
                  title: "Assign Gayawal Pandit",
                  completed: false,
                },
                {
                  taskKey: "Confirm Ritual Date",
                  title: "Confirm Ritual Date & Muhurat",
                  completed: false,
                },
                {
                  taskKey: "Perform Ritual",
                  title: "Perform Ritual in Gaya",
                  completed: false,
                },
                {
                  taskKey: "Send Documentation",
                  title: "Send Photos / Video Documentation",
                  completed: false,
                },
                {
                  taskKey: "Receive Payment",
                  title: "Receive Payment",
                  completed: false,
                },
                {
                  taskKey: "Request Review",
                  title: "Request Review",
                  completed: false,
                },
              ],
            },
          },
          include: { customer: true, travel: true, tasks: true },
        });

        // Store ancestor details in the booking timeline for coordinator reference
        await tx.bookingTimeline.create({
          data: {
            bookingId: booking.id,
            title: "Online Pind Daan Booking Received",
            description: ancestorDetails,
          },
        });

        // Also store in coordinator notes for easy access
        await tx.bookingNote.create({
          data: {
            bookingId: booking.id,
            author: "System (Online Pind Daan Form)",
            content: ancestorDetails,
          },
        });

        // Auto-generate 5 standard documents
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

        return { isDuplicate: false, booking, reservationId };
      },
      { timeout: 30000 }
    );

    // Duplicate early return
    if (result.isDuplicate) {
      return standardApiSuccess(
        {
          reservationId: result.reservationId,
          isDuplicate: true,
          message:
            "Duplicate booking detected — returning existing reservation.",
        },
        req
      );
    }

    const createdBooking = result.booking;

    // Send notifications (email, WhatsApp, admin alert) — non-blocking
    sendCentralNotification("BOOKING_CREATED", {
      bookingId: createdBooking.id,
      reservationId: createdBooking.reservationId,
      customerName: createdBooking.customer.name,
      customerPhone: createdBooking.customer.phone,
      customerEmail: createdBooking.customer.email,
      packageTitle: createdBooking.packageTitle,
      grandTotal: createdBooking.grandTotal,
      arrivalDate: createdBooking.travel?.arrivalDate,
    }).catch((e) =>
      console.warn("[online-pind-daan] Notification error (non-critical):", e)
    );

    return standardApiSuccess(
      {
        reservationId: createdBooking.reservationId,
        status: "lead",
        message: "Online Pind Daan booking created and saved to database.",
      },
      req
    );
  } catch (err) {
    console.error("[online-pind-daan/submit] Error:", err);
    return standardApiError(
      "INTERNAL_ERROR",
      "Failed to create booking. Please try again.",
      500,
      req
    );
  }
}
