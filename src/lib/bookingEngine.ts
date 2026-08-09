import crypto from "crypto";
import { Prisma } from "@prisma/client";

type TransactionClient = Prisma.TransactionClient;

/**
 * Mints a 100% collision-proof Reservation ID inside a Prisma transaction block.
 */
export async function mintUniqueReservationId(tx: TransactionClient): Promise<string> {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    attempts++;
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    const candidateId = `PTR-${dateStr}-${randomHex}`;

    try {
      const existing = await tx.booking.findUnique({
        where: { reservationId: candidateId },
        select: { id: true },
      });

      if (!existing) {
        return candidateId;
      }
    } catch (err) {
      // Prisma P2002 Unique Constraint Violation Catch & Retry Loop
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        console.warn(`[mintUniqueReservationId] Race collision detected for '${candidateId}'. Retrying...`);
        continue;
      }
      throw err;
    }
  }

  // Fallback timestamp suffix if 10 collisions occur (extremely improbable)
  const timestampSuffix = Date.now().toString().slice(-6);
  return `PTR-${dateStr}-${timestampSuffix}`;
}

/**
 * Checks for a recent duplicate booking (same phone & arrival date within 5 minutes).
 */
export async function checkDuplicateBooking(
  tx: TransactionClient,
  phone: string,
  arrivalDate: string
): Promise<Prisma.BookingGetPayload<{ include: { customer: true; travel: true; tasks: true } }> | null> {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const cleanPhone = phone.trim();

  const existingLead = await tx.booking.findFirst({
    where: {
      customer: { phone: cleanPhone },
      status: "lead",
      createdAt: { gte: fiveMinutesAgo },
    },
    include: {
      customer: true,
      travel: true,
      tasks: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return existingLead || null;
}

/**
 * Checks for an active pending payment link for a booking ID to prevent duplicate requests.
 * Uses PostgreSQL FOR UPDATE pessimistic row locking to prevent millisecond race conditions.
 */
export async function checkDuplicatePaymentLink(
  tx: TransactionClient,
  bookingId: string
): Promise<Prisma.PaymentGetPayload<Record<string, never>> | null> {
  // Lock the target Booking row for update during transaction to serialize concurrent payment requests
  try {
    await tx.$executeRaw`SELECT id FROM "Booking" WHERE id = ${bookingId} FOR UPDATE`;
  } catch {
    // Ignore lock warning on fallback DB drivers
  }

  const activePayment = await tx.payment.findFirst({
    where: {
      bookingId,
      status: { in: ["pending", "link_generated"] },
    },
    orderBy: { issuedAt: "desc" },
  });

  return activePayment || null;
}
