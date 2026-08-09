import prisma from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";

export function getStatusTasks(status: BookingStatus): { taskKey: string; title: string }[] {
  switch (status) {
    case "lead":
      return [
        { taskKey: "call_cust", title: "Call Customer Within 15 Mins" },
        { taskKey: "verify_lineage", title: "Verify Ancestral Lineage Details" },
        { taskKey: "send_options", title: "Send Package Options" },
      ];
    case "coordinator_assigned":
      return [
        { taskKey: "coord_contact", title: "Coordinator Contact Devotee on WhatsApp" },
        { taskKey: "coord_itinerary", title: "Finalize Itinerary Preferences" },
      ];
    case "payment_pending":
      return [
        { taskKey: "gen_pay_link", title: "Generate Payment Link" },
        { taskKey: "send_pay_wa", title: "Send Payment Link via WhatsApp" },
        { taskKey: "track_invoice", title: "Track Deposit Invoice" },
      ];
    case "confirmed":
      return [
        { taskKey: "res_hotel", title: "Reserve Sattvik Hotel Room" },
        { taskKey: "assign_driver", title: "Assign Pickup Chauffeur & Driver" },
        { taskKey: "assign_pandit", title: "Assign Gayawal Purohit" },
        { taskKey: "prep_welcome", title: "Prepare Sacred Welcome Kit & Samagri" },
        { taskKey: "gen_vouchers", title: "Generate Official PDF Vouchers" },
        { taskKey: "send_itinerary", title: "Send Complete Journey Itinerary" },
      ];
    case "in_journey":
      return [
        { taskKey: "chauffeur_pickup", title: "Chauffeur Pickup at Airport/Station" },
        { taskKey: "hotel_checkin", title: "Hotel Check-in Escort" },
        { taskKey: "rites_exec", title: "Sanctum Pinda Daan Rites Execution" },
        { taskKey: "handover_kit", title: "Hand over Pinda Daan Kit & Samagri" },
      ];
    case "completed":
      return [
        { taskKey: "issue_cert", title: "Issue Sacred Completion Certificate" },
        { taskKey: "trigger_review", title: "Trigger Google Review Request" },
        { taskKey: "send_photo_vault", title: "Send Photo Upload Album Link" },
        { taskKey: "issue_referral", title: "Issue Referral Code (PITRAYA-REF-XXXX)" },
      ];
    default:
      return [
        { taskKey: "call_cust", title: "Call Customer" },
        { taskKey: "confirm_arrival", title: "Confirm Arrival" },
      ];
  }
}

export async function autoCreateTasksForStatus(bookingId: string, status: BookingStatus) {
  const newTasks = getStatusTasks(status);
  
  await prisma.bookingTask.createMany({
    data: newTasks.map((t) => ({
      bookingId,
      taskKey: t.taskKey,
      title: t.title,
      completed: false,
    })),
  });
}

export async function logTimelineEvent(bookingId: string, title: string, description: string) {
  try {
    await prisma.bookingTimeline.create({
      data: {
        bookingId,
        title,
        description,
        timestamp: new Date(),
      },
    });
  } catch (err) {
    console.warn("Timeline log error:", err);
  }
}
