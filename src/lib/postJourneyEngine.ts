import { ReviewEntity, BookingEntity, UserEntity } from "@/lib/db/schema";

export function createPostJourneyReviewFlow(booking: Pick<BookingEntity, "id" | "reservationId" | "userId">, user?: UserEntity): ReviewEntity {
  const referralSuffix = booking.reservationId.slice(-4);
  const refCode = `PITRAYA-REF-${referralSuffix}`;

  return {
    id: `rev-${booking.id}`,
    bookingId: booking.id,
    userId: user?.id || booking.userId,
    googleReviewUrl: "https://g.page/r/pitraya-gaya-pind-daan/review",
    photoUrls: [],
    feedbackRating: 5,
    feedbackText: "Sacred, seamless experience at Vishnupad Sanctum.",
    referralCode: refCode,
    status: "pending_request",
    createdAt: new Date().toISOString(),
  };
}

export function generatePostJourneyWhatsAppMessage(bookingName: string, refCode: string): string {
  return encodeURIComponent(
    `Pranam ${bookingName} Ji 🙏\n\n` +
      `Thank you for allowing Pitraya to serve your family during your sacred Gaya Pinda Daan pilgrimage.\n\n` +
      `1️⃣ *Google Review*: Please share your experience to help other families: https://g.page/r/pitraya-gaya-pind-daan/review\n` +
      `2️⃣ *Upload Photos*: Add your sacred pilgrimage photos to your private family vault.\n` +
      `3️⃣ *Referral Gift*: Share referral code *${refCode}* with family & friends for a ₹2,000 blessing credit.`
  );
}
