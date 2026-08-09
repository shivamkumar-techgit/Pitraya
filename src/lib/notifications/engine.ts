import prisma from "@/lib/prisma";

export type NotificationType = "confirmation" | "vehicle" | "hotel" | "payment_link" | "review_request";

/**
 * Dispatches an enterprise notification to a customer and logs it in the database.
 */
export async function dispatchNotification(
  bookingId: string,
  type: NotificationType,
  message: string,
  recipientPhone: string = "9800000000",
  channel: string = "whatsapp"
): Promise<Awaited<ReturnType<typeof prisma.notification.create>> | null> {
  try {
    const notif = await prisma.notification.create({
      data: {
        booking: { connect: { id: bookingId } },
        recipientPhone,
        content: message,
        type: type,
        channel: channel.toLowerCase(),
      },
    });

    console.log(`📱 [Notification Engine] Channel: ${channel} | Recipient: ${recipientPhone} | Type: ${type}`);
    console.log(`   Message: "${message}"`);

    return notif;
  } catch (err: unknown) {
    console.error("❌ Failed to dispatch notification:", err instanceof Error ? err.message : String(err));
    return null;
  }
}
