import { DocumentEntity, AutoDocType, BookingEntity } from "@/lib/db/schema";

export function generateAutoDocuments(booking: Pick<BookingEntity, "id" | "reservationId">): DocumentEntity[] {
  const now = new Date().toISOString();
  const resId = booking.reservationId;

  return [
    {
      id: `doc-res-${booking.id}`,
      bookingId: booking.id,
      docType: "reservation_letter",
      title: `Official Reservation Letter (${resId})`,
      downloadUrl: `/api/documents/download?type=reservation_letter&id=${booking.id}`,
      generatedAt: now,
    },
    {
      id: `doc-inv-${booking.id}`,
      bookingId: booking.id,
      docType: "invoice",
      title: `Tax Invoice & Investment Breakdown (INV-${resId})`,
      downloadUrl: `/api/documents/download?type=invoice&id=${booking.id}`,
      generatedAt: now,
    },
    {
      id: `doc-rec-${booking.id}`,
      bookingId: booking.id,
      docType: "payment_receipt",
      title: `Official Payment Receipt & Sanctum Seal (REC-${resId})`,
      downloadUrl: `/api/documents/download?type=payment_receipt&id=${booking.id}`,
      generatedAt: now,
    },
    {
      id: `doc-[#iti]-${booking.id}`,
      bookingId: booking.id,
      docType: "journey_itinerary",
      title: `Detailed 3-Day Journey Itinerary & Transfer Plan`,
      downloadUrl: `/api/documents/download?type=journey_itinerary&id=${booking.id}`,
      generatedAt: now,
    },
    {
      id: `doc-tmp-${booking.id}`,
      bookingId: booking.id,
      docType: "temple_schedule",
      title: `Vishnupad Temple & Akshay Vat Muhurat Schedule`,
      downloadUrl: `/api/documents/download?type=temple_schedule&id=${booking.id}`,
      generatedAt: now,
    },
  ];
}
