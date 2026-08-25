import { sendCentralNotification } from "../src/lib/notificationEngine";
import { generateAutoDocuments } from "../src/lib/documentEngine";

async function runSteps17And18Tests() {
  console.log("==================================================");
  console.log("🔱 STEP 17 & 18 — WHATSAPP & PDF SUITE VERIFICATION");
  console.log("==================================================\n");

  const mockBooking = {
    id: "booking-prod-safe-test-" + Date.now(),
    reservationId: "PTR-20260826-889911",
    customerName: "Devotee Rajesh Sharma",
    customerPhone: "+91 84344 57228",
    customerEmail: "pitrayaenquiry@gmail.com",
    packageTitle: "Heritage Experience",
    grandTotal: 24999,
    arrivalDate: "31 August 2026",
    paymentLink: "https://u.payu.in/MIvnJ8tUOvLJ",
  };

  // ─────────────────────────────────────────────
  // STEP 17 — TEST WHATSAPP
  // ─────────────────────────────────────────────
  console.log("--------------------------------------------------");
  console.log("💬 STEP 17 — WHATSAPP MESSAGE VERIFICATION");
  console.log("--------------------------------------------------");

  const notifResult = await sendCentralNotification("BOOKING_CREATED", {
    bookingId: mockBooking.id,
    reservationId: mockBooking.reservationId,
    customerName: mockBooking.customerName,
    customerPhone: mockBooking.customerPhone,
    customerEmail: mockBooking.customerEmail,
    packageTitle: mockBooking.packageTitle,
    grandTotal: mockBooking.grandTotal,
    arrivalDate: mockBooking.arrivalDate,
    paymentLink: mockBooking.paymentLink,
  });

  const wa = notifResult.whatsapp;
  console.log("Recipient Phone:", wa.recipientPhone);
  console.log("Generated wa.me URL:", wa.waUrl);
  console.log("\nRaw Message Content:\n" + wa.message);

  const checks17 = [
    { label: "Contains Customer Name", pass: wa.message.includes(mockBooking.customerName) },
    { label: "Contains 'Your PITRAYA reservation has been received.'", pass: wa.message.includes("Your PITRAYA reservation has been received.") },
    { label: "Contains Reservation ID", pass: wa.message.includes(mockBooking.reservationId) },
    { label: "Contains Experience Title", pass: wa.message.includes(mockBooking.packageTitle) },
    { label: "Contains Amount (₹24,999)", pass: wa.message.includes("₹24,999") },
    { label: "Contains 'Our pilgrimage coordinator will contact you shortly.'", pass: wa.message.includes("Our pilgrimage coordinator will contact you shortly.") },
    { label: "Contains 'PITRAYA / Ancestral Rituals · Gaya' Signature", pass: wa.message.includes("PITRAYA\nAncestral Rituals · Gaya") },
    { label: "Valid wa.me Link Encoded", pass: wa.waUrl.startsWith("https://wa.me/918434457228?text=") },
  ];

  console.log("\nWhatsApp Checklist:");
  checks17.forEach((c) => {
    console.log(` - ${c.label}: ${c.pass ? "✅ PASSED" : "❌ FAILED"}`);
  });

  // ─────────────────────────────────────────────
  // STEP 18 — TEST PDFS
  // ─────────────────────────────────────────────
  console.log("\n--------------------------------------------------");
  console.log("📄 STEP 18 — PDF SACRED DOCUMENTS VERIFICATION");
  console.log("--------------------------------------------------");

  const documents = generateAutoDocuments({
    id: mockBooking.id,
    reservationId: mockBooking.reservationId,
  });

  console.log(`Generated ${documents.length} Automatic Sacred PDF Document Entities:\n`);

  documents.forEach((doc, idx) => {
    console.log(`${idx + 1}. [${doc.docType.toUpperCase()}] ${doc.title}`);
    console.log(`   - ID: ${doc.id}`);
    console.log(`   - Endpoint: ${doc.downloadUrl}`);
    console.log(`   - Generated At: ${doc.generatedAt}\n`);
  });

  const expectedTypes = [
    "reservation_letter",
    "invoice",
    "payment_receipt",
    "journey_itinerary",
    "temple_schedule",
  ];

  const allTypesExist = expectedTypes.every((t) =>
    documents.some((d) => d.docType === t)
  );

  console.log("PDF Suite Checklist:");
  console.log(" 1. Reservation Certificate / Official Letter:", documents.some(d => d.docType === "reservation_letter") ? "✅ PASSED" : "❌ FAILED");
  console.log(" 2. Tax Invoice & Investment Breakdown:", documents.some(d => d.docType === "invoice") ? "✅ PASSED" : "❌ FAILED");
  console.log(" 3. Official Payment Receipt & Sanctum Seal:", documents.some(d => d.docType === "payment_receipt") ? "✅ PASSED" : "❌ FAILED");
  console.log(" 4. Detailed 3-Day Journey Itinerary Plan:", documents.some(d => d.docType === "journey_itinerary") ? "✅ PASSED" : "❌ FAILED");
  console.log(" 5. Vishnupad Temple & Akshay Vat Muhurat Schedule:", documents.some(d => d.docType === "temple_schedule") ? "✅ PASSED" : "❌ FAILED");

  console.log("\n==================================================");
  if (checks17.every(c => c.pass) && allTypesExist) {
    console.log("🎉 ALL TESTS PASSED: STEP 17 & STEP 18 100% READY");
  } else {
    console.log("⚠️ SOME TESTS FAILED");
  }
  console.log("==================================================");
}

runSteps17And18Tests().catch(console.error);
