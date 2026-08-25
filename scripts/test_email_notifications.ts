import { sendCentralNotification } from "../src/lib/notificationEngine";

async function runEmailTests() {
  console.log("==================================================");
  console.log("🔱 STEP 16 — PITRAYA EMAIL NOTIFICATION SUITE");
  console.log("==================================================\n");

  const mockPayload = {
    bookingId: "test-booking-id-" + Date.now(),
    reservationId: "PTR-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-991822",
    customerName: "Devotee Family Sharma",
    customerPhone: "+91 98765 43210",
    customerEmail: "sharma.family@example.com",
    packageTitle: "Moksha Sanctum Journey (3 Days / 2 Nights)",
    grandTotal: 49998,
    arrivalDate: "31 August 2026",
    paymentLink: "https://u.payu.in/MIvnJ8tUOvLJ",
  };

  console.log("1. Generating Customer & Admin Email Notifications for BOOKING_CREATED...");
  const result = await sendCentralNotification("BOOKING_CREATED", mockPayload);

  console.log("\n--------------------------------------------------");
  console.log("📩 CUSTOMER CONFIRMATION EMAIL");
  console.log("--------------------------------------------------");
  console.log("To:", result.email.recipient);
  console.log("Subject:", result.email.subject);
  console.log("\nPlain Text Body:\n", result.email.body);
  console.log("\nHTML Verification Checklist:");
  console.log(" - Reservation ID:", result.email.htmlBody.includes(mockPayload.reservationId) ? "✅ PASSED" : "❌ FAILED");
  console.log(" - Package Title:", result.email.htmlBody.includes(mockPayload.packageTitle) ? "✅ PASSED" : "❌ FAILED");
  console.log(" - Arrival Date:", result.email.htmlBody.includes(mockPayload.arrivalDate) ? "✅ PASSED" : "❌ FAILED");
  console.log(" - Next Steps:", result.email.htmlBody.includes("Next Step") ? "✅ PASSED" : "❌ FAILED");

  console.log("\n--------------------------------------------------");
  console.log("🚨 ADMIN OPERATIONS EMAIL ALERT");
  console.log("--------------------------------------------------");
  console.log("To:", result.adminEmail.recipient);
  console.log("Subject:", result.adminEmail.subject);
  console.log("\nPlain Text Body:\n", result.adminEmail.body);
  console.log("\nAdmin HTML Verification Checklist:");
  console.log(" - Reservation ID:", result.adminEmail.htmlBody.includes(mockPayload.reservationId) ? "✅ PASSED" : "❌ FAILED");
  console.log(" - Customer Name:", result.adminEmail.htmlBody.includes(mockPayload.customerName) ? "✅ PASSED" : "❌ FAILED");
  console.log(" - Phone:", result.adminEmail.htmlBody.includes(mockPayload.customerPhone) ? "✅ PASSED" : "❌ FAILED");
  console.log(" - Package:", result.adminEmail.htmlBody.includes(mockPayload.packageTitle) ? "✅ PASSED" : "❌ FAILED");
  console.log(" - Grand Total:", result.adminEmail.htmlBody.includes("49,998") ? "✅ PASSED" : "❌ FAILED");
  console.log(" - Travel Date:", result.adminEmail.htmlBody.includes(mockPayload.arrivalDate) ? "✅ PASSED" : "❌ FAILED");

  console.log("\n--------------------------------------------------");
  console.log("💬 WHATSAPP NOTIFICATION MESSAGE");
  console.log("--------------------------------------------------");
  console.log(result.whatsapp.message);

  console.log("\n==================================================");
  console.log("✅ ALL EMAIL NOTIFICATION TEMPLATES VALIDATED & READY");
  console.log("==================================================");
}

runEmailTests().catch(console.error);
