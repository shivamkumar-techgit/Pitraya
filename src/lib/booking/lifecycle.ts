import prisma from "@/lib/prisma";
import { Prisma, BookingStatus } from "@prisma/client";
import { ValidationError } from "@/lib/errors/AppError";
import { dispatchNotification } from "@/lib/notifications/engine";

const VALID_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  draft: ["lead", "confirmed", "cancelled"],
  lead: ["confirmed", "cancelled"],
  coordinator_assigned: ["confirmed", "cancelled"],
  payment_pending: ["confirmed", "cancelled"],
  awaiting_payment: ["confirmed", "cancelled"],
  paid: ["confirmed", "cancelled"],
  confirmed: ["in_journey", "cancelled"],
  hotel_reserved: ["in_journey", "cancelled"],
  vehicle_assigned: ["in_journey", "cancelled"],
  pandit_assigned: ["in_journey", "cancelled"],
  in_journey: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

/**
 * Transitions a booking status safely inside a database transaction,
 * enforcing state machine rules and writing a timeline audit log.
 */
export async function transitionBookingStatus(
  bookingId: string,
  targetStatus: BookingStatus,
  actorName: string = "System Engine",
  note?: string,
  customTx?: Prisma.TransactionClient
): Promise<NonNullable<Awaited<ReturnType<typeof prisma.booking.findUnique>>>> {
  const executeInTransaction = async (tx: Prisma.TransactionClient) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
      include: { customer: true, payments: true },
    });

    if (!booking) {
      throw new ValidationError(`Booking with ID '${bookingId}' not found.`);
    }

    const currentStatus = booking.status as BookingStatus;

    if (currentStatus === targetStatus) {
      return booking; // No-op if status is already target
    }

    const allowedNextStatuses = VALID_TRANSITIONS[currentStatus] || [];
    if (!allowedNextStatuses.includes(targetStatus)) {
      throw new ValidationError(
        `Invalid status transition from '${currentStatus}' to '${targetStatus}'. Allowed: [${allowedNextStatuses.join(", ")}]`
      );
    }

    // Additional business validation for 'confirmed'
    if (targetStatus === "confirmed") {
      const hasCompletedPayment = booking.payments.some((p) => p.status === "paid" || p.status === "partially_paid");
      if (!hasCompletedPayment && actorName === "System Engine") {
        console.warn(`[Lifecycle] Confirming booking '${booking.reservationId}' without paid payment record.`);
      }
    }

    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: { status: targetStatus },
    });

    // Write timeline audit record
    await tx.bookingTimeline.create({
      data: {
        bookingId,
        title: `Status Changed: ${currentStatus.toUpperCase()} → ${targetStatus.toUpperCase()}`,
        description: `[By ${actorName}] ${note || `Booking status updated to ${targetStatus}`}`,
      },
    });

    // Dispatch notification
    await dispatchNotification(
      bookingId,
      "confirmation",
      `Your booking status for ${booking.reservationId} is now ${targetStatus.toUpperCase()}.`,
      booking.customer?.phone || "9800000000"
    );

    return updatedBooking;
  };

  if (customTx) {
    return executeInTransaction(customTx);
  } else {
    return prisma.$transaction(executeInTransaction, { timeout: 15000 });
  }
}
