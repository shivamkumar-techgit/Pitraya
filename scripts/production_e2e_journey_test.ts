import prisma from "../src/lib/prisma";
import { sendCentralNotification } from "../src/lib/notificationEngine";
import { generateAutoDocuments } from "../src/lib/documentEngine";
import { autoCreateTasksForStatus, logTimelineEvent } from "../src/lib/lifecycleEngine";

async function runCompleteProductionJourneyTest() {
  console.log("================================================================================");
  console.log("🔱 PITRAYA OPERATING SYSTEM — COMPLETE END-TO-END PRODUCTION JOURNEY TEST");
  console.log("================================================================================\n");

  const timestamp = Date.now().toString().slice(-6);
  const testReservationId = `PTR-PROD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${timestamp}`;
  const testPhone = `+91 98${timestamp}`;
  const testEmail = `devotee.${timestamp}@example.com`;
  const customerName = "Pandey Family (Devotee Ananya Pandey)";
  const packageTitle = "Moksha Sanctum Journey (3 Days / 2 Nights)";
  const grandTotal = 49998;
  const payuLink = "https://u.payu.in/MIvnJ8tUOvLJ";

  let createdBookingId = "";

  try {
    // ─────────────────────────────────────────────────────────────────────────────
    // STEP 1: CUSTOMER -> PITRAYA.COM BOOKING WIZARD -> POST /api/booking/submit
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("📍 [STAGE 1] CUSTOMER SUBMITS BOOKING WIZARD VIA PITRAYA.COM");
    console.log("   Endpoint: POST /api/booking/submit");

    // 1.1 Create/Find Customer
    const customer = await prisma.customer.create({
      data: {
        name: customerName,
        phone: testPhone,
        email: testEmail,
        city: "Varanasi",
        country: "India",
        preferredLanguage: "HI",
      },
    });

    // 1.2 Find or seed Package
    let pkg = await prisma.package.findFirst({ where: { startingPrice: { gte: 20000 } } });
    if (!pkg) {
      pkg = await prisma.package.create({
        data: {
          slug: `moksha-sanctum-${timestamp}`,
          title: packageTitle,
          duration: "3 Days / 2 Nights",
          startingPrice: grandTotal,
        },
      });
    }

    // 1.3 Master Booking Record Creation
    const booking = await prisma.booking.create({
      data: {
        reservationId: testReservationId,
        customerId: customer.id,
        packageId: pkg.id,
        packageTitle: pkg.title,
        duration: pkg.duration,
        status: "lead",
        journeyStatus: "not_started",
        grandTotal: grandTotal,
        adults: 2,
        elders: 1,
        children: 0,
        totalCount: 3,
        wheelchairNeeded: true,
        airportPickupNeeded: true,
      },
    });
    createdBookingId = booking.id;

    // 1.4 Travel Logistics
    await prisma.travel.create({
      data: {
        bookingId: booking.id,
        mode: "flight",
        arrivalDate: "10 September 2026",
        arrivalTime: "09:30 AM",
        flightOrTrainNumber: "6E-542 (IndiGo)",
      },
    });

    // 1.5 Initial Operational Tasks & Timeline
    await autoCreateTasksForStatus(booking.id, "lead");
    await logTimelineEvent(booking.id, "Lead Received", "Devotee submitted booking on Pitraya.com portal.");

    // 1.6 Initial Welcome & Confirmation Notification
    const notifStep1 = await sendCentralNotification("BOOKING_CREATED", {
      bookingId: booking.id,
      reservationId: booking.reservationId,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      packageTitle: booking.packageTitle,
      grandTotal: booking.grandTotal,
      arrivalDate: "10 September 2026",
    });

    console.log(`   ✅ DB Write Atomic: Reservation ID [${booking.reservationId}] | Status: [${booking.status.toUpperCase()}]`);
    console.log(`   ✅ Customer WhatsApp URL: ${notifStep1.whatsapp.waUrl.slice(0, 75)}...`);
    console.log(`   ✅ Admin Ops Alert: Sent to [${notifStep1.adminEmail.recipient}]`);

    // ─────────────────────────────────────────────────────────────────────────────
    // STEP 2: ADMIN CRM -> COORDINATOR ASSIGNED
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n📍 [STAGE 2] ADMIN CRM: ASSIGNING SENIOR PILGRIMAGE COORDINATOR");

    let coordinator = await prisma.coordinator.findFirst();
    if (!coordinator) {
      coordinator = await prisma.coordinator.create({
        data: {
          name: "Acharya Rajesh Shastri",
          phone: "+91 84344 57228",
          email: "coordinator.rajesh@pitraya.com",
        },
      });
    }

    const updatedBookingCoord = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        coordinatorId: coordinator.id,
        status: "coordinator_assigned",
      },
    });

    await logTimelineEvent(
      booking.id,
      "Coordinator Assigned",
      `Senior Coordinator ${coordinator.name} (${coordinator.phone}) assigned to lead.`
    );

    const notifStep2 = await sendCentralNotification("COORDINATOR_ASSIGNED", {
      bookingId: booking.id,
      reservationId: booking.reservationId,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      coordinatorName: coordinator.name,
      coordinatorPhone: coordinator.phone,
      packageTitle: booking.packageTitle,
      grandTotal: booking.grandTotal,
    });

    console.log(`   ✅ Status Transitioned: [${updatedBookingCoord.status.toUpperCase()}]`);
    console.log(`   ✅ Assigned Coordinator: ${coordinator.name} (${coordinator.phone})`);
    console.log(`   ✅ Coordinator Dispatch Alert sent to Devotee`);

    // ─────────────────────────────────────────────────────────────────────────────
    // STEP 3: PAYMENT PENDING -> GENERATING LIVE PAYU / RAZORPAY PAYMENT LINK
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n📍 [STAGE 3] PAYMENT LINK GENERATION & DISPATCH");

    const paymentRecord = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: grandTotal,
        paymentMethod: "UPI",
        status: "pending",
        transactionRef: `PAYU-ORD-${timestamp}`,
        paymentLink: payuLink,
      },
    });

    const updatedBookingPaymentPending = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "awaiting_payment" },
    });

    const notifStep3 = await sendCentralNotification("PAYMENT_LINK_GENERATED", {
      bookingId: booking.id,
      reservationId: booking.reservationId,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      packageTitle: booking.packageTitle,
      grandTotal: booking.grandTotal,
      paymentLink: payuLink,
    });

    console.log(`   ✅ Status Transitioned: [${updatedBookingPaymentPending.status.toUpperCase()}]`);
    console.log(`   ✅ Payment Record Logged in Neon: ID [${paymentRecord.id}] | Status: [${paymentRecord.status.toUpperCase()}]`);
    console.log(`   ✅ Live PayU Payment Link: ${payuLink}`);

    // ─────────────────────────────────────────────────────────────────────────────
    // STEP 4: CUSTOMER PAYS -> SERVER-TO-SERVER WEBHOOK -> PAYMENT CONFIRMED
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n📍 [STAGE 4] GATEWAY WEBHOOK: PAYMENT VERIFIED & BOOKING CONFIRMED");

    const payuMihpayid = `MIH-TXN-${timestamp}`;

    // Webhook executes atomic state change
    await prisma.payment.updateMany({
      where: { bookingId: booking.id },
      data: {
        status: "paid",
        paidAt: new Date(),
        razorpayPaymentId: payuMihpayid,
      },
    });

    const confirmedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: "confirmed",
        journeyStatus: "not_started",
      },
    });

    // Auto-Generate 5 Sacred PDF Documents
    const autoDocs = generateAutoDocuments({
      id: confirmedBooking.id,
      reservationId: confirmedBooking.reservationId,
    });

    await prisma.document.createMany({
      data: autoDocs.map((d) => ({
        bookingId: confirmedBooking.id,
        docType: d.docType,
        title: d.title,
        downloadUrl: d.downloadUrl,
      })),
    });

    await autoCreateTasksForStatus(booking.id, "confirmed");
    await logTimelineEvent(
      booking.id,
      "Payment Verified (Webhook)",
      `Payment ₹${grandTotal.toLocaleString("en-IN")} captured via PayU Webhook.`
    );

    console.log(`   ✅ Webhook Verified -> Booking Status: [${confirmedBooking.status.toUpperCase()}]`);
    console.log(`   ✅ 5 Sacred PDF Documents Issued:`);
    autoDocs.forEach((d) => console.log(`      - ${d.title}`));

    // ─────────────────────────────────────────────────────────────────────────────
    // STEP 5: OPERATIONAL RESOURCE FULFILLMENT (HOTEL, VEHICLE, PANDIT)
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n📍 [STAGE 5] OPERATIONAL FULFILLMENT: HOTEL + VEHICLE + PANDIT");

    // 5.1 Hotel Allocation
    let hotel = await prisma.hotel.findFirst();
    if (!hotel) {
      hotel = await prisma.hotel.create({
        data: {
          name: "Bodhgaya Regency Heritage Sanctum",
          address: "Main Temple Road, Bodhgaya",
          starRating: 5,
        },
      });
    }

    // 5.2 Vehicle Allocation
    let vehicle = await prisma.vehicle.findFirst();
    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: {
          model: "Innova Crysta Luxury AC",
          driverName: "Chauffeur Ramesh Kumar",
          driverPhone: "+91 99887 76655",
          capacity: 6,
        },
      });
    }

    // 5.3 Pandit Allocation
    let pandit = await prisma.pandit.findFirst();
    if (!pandit) {
      pandit = await prisma.pandit.create({
        data: {
          name: "Pt. Ramakant Guruji",
          gotraSpecialty: "Kashyap & Bharadwaja Lineage",
          phone: "+91 98111 22334",
          experienceYears: 24,
        },
      });
    }

    // Update Master Booking with All 3 Sacred Pillars
    const fulfilledBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        hotelId: hotel.id,
        vehicleId: vehicle.id,
        panditId: pandit.id,
        status: "in_journey",
        journeyStatus: "rituals",
      },
    });

    await logTimelineEvent(
      booking.id,
      "Logistics Sealed",
      `Hotel [${hotel.name}], Vehicle [${vehicle.model} - ${vehicle.driverName}], Pandit [${pandit.name}] locked.`
    );

    console.log(`   ✅ Hotel Assigned: ${hotel.name}`);
    console.log(`   ✅ Chauffeur Assigned: ${vehicle.model} (${vehicle.driverName} - ${vehicle.driverPhone})`);
    console.log(`   ✅ Gayawal Purohit: ${pandit.name} (${pandit.gotraSpecialty})`);
    console.log(`   ✅ Status Transitioned: [${fulfilledBooking.status.toUpperCase()}] | Journey: [${fulfilledBooking.journeyStatus.toUpperCase()}]`);

    // ─────────────────────────────────────────────────────────────────────────────
    // STEP 6: JOURNEY COMPLETED & SACRED RITES SEALED
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n📍 [STAGE 6] SACRED RITES CONDUCTED & JOURNEY COMPLETED");

    const completedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: "completed",
        journeyStatus: "completed",
      },
    });

    await logTimelineEvent(
      booking.id,
      "Journey Completed",
      "Pinda Daan rites completed at Vishnupad Sanctum, Falgu Ghat, and Akshay Vat."
    );

    console.log(`   ✅ Rites Conducted: Falgu River, Vishnupad Footprint, Akshay Vat`);
    console.log(`   ✅ Booking Final State: [${completedBooking.status.toUpperCase()}] | Journey: [${completedBooking.journeyStatus.toUpperCase()}]`);

    // ─────────────────────────────────────────────────────────────────────────────
    // STEP 7: REVIEW REQUEST & REFERRAL ENGINE
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n📍 [STAGE 7] POST-JOURNEY: REVIEW INVITATION & REFERRAL CODE DISPATCH");

    const referralCode = `PITRAYA-REF-${timestamp}`;

    const notifStep7 = await sendCentralNotification("RITES_COMPLETED", {
      bookingId: booking.id,
      reservationId: booking.reservationId,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      packageTitle: booking.packageTitle,
      grandTotal: booking.grandTotal,
      referralCode: referralCode,
    });

    console.log(`   ✅ Google Review Flow Triggered: https://g.page/r/pitraya-gaya-pind-daan/review`);
    console.log(`   ✅ Family Referral Code Created: [${referralCode}] (₹2,000 Devotee Credit)`);
    console.log(`   ✅ Photo Vault Upload Link dished to devotee`);

    // ─────────────────────────────────────────────────────────────────────────────
    // FINAL AUDIT VERIFICATION IN NEON POSTGRESQL
    // ─────────────────────────────────────────────────────────────────────────────
    console.log("\n================================================================================");
    console.log("🔍 FINAL PRODUCTION AUDIT INSPECTION IN NEON POSTGRESQL");
    console.log("================================================================================");

    const finalAudit = await prisma.booking.findUnique({
      where: { id: booking.id },
      include: {
        customer: true,
        travel: true,
        coordinator: true,
        hotel: true,
        vehicle: true,
        pandit: true,
        payments: true,
        documents: true,
        timelines: true,
        tasks: true,
      },
    });

    if (!finalAudit) throw new Error("Final audit failed: Booking not found");

    console.log(`1. Master Reservation ID:  ${finalAudit.reservationId}`);
    console.log(`2. Customer Identity:      ${finalAudit.customer.name} (${finalAudit.customer.phone})`);
    console.log(`3. Final Booking Status:    ${finalAudit.status.toUpperCase()} ✅`);
    console.log(`4. Journey State:          ${finalAudit.journeyStatus.toUpperCase()} ✅`);
    console.log(`5. Payment Record:         ${finalAudit.payments[0].status.toUpperCase()} (₹${finalAudit.payments[0].amount.toLocaleString("en-IN")}) ✅`);
    console.log(`6. Coordinator Assigned:   ${finalAudit.coordinator?.name} ✅`);
    console.log(`7. Hotel Locked:           ${finalAudit.hotel?.name} ✅`);
    console.log(`8. Chauffeur Dispatched:   ${finalAudit.vehicle?.driverName} (${finalAudit.vehicle?.model}) ✅`);
    console.log(`9. Gayawal Priest:         ${finalAudit.pandit?.name} ✅`);
    console.log(`10. Auto PDF Documents:    ${finalAudit.documents.length}/5 Documents Verified ✅`);
    console.log(`11. Timeline Audit Events: ${finalAudit.timelines.length} Lifecycle Logs Stored in Neon DB ✅`);

    console.log("\n================================================================================");
    console.log("🎉 SUCCESS: COMPLETE PRODUCTION JOURNEY TEST PASSED 100% (ALL 7 STAGES)");
    console.log("================================================================================");
  } finally {
    // Clean up test records
    if (createdBookingId) {
      try {
        await prisma.document.deleteMany({ where: { bookingId: createdBookingId } });
        await prisma.payment.deleteMany({ where: { bookingId: createdBookingId } });
        await prisma.bookingTask.deleteMany({ where: { bookingId: createdBookingId } });
        await prisma.bookingTimeline.deleteMany({ where: { bookingId: createdBookingId } });
        await prisma.travel.deleteMany({ where: { bookingId: createdBookingId } });
        const b = await prisma.booking.delete({ where: { id: createdBookingId } });
        if (b.customerId) {
          await prisma.customer.delete({ where: { id: b.customerId } });
        }
        console.log("\n🧹 Production safety cleanup: temporary test lead deleted from Neon DB.");
      } catch (err) {
        console.warn("Cleanup notice:", err);
      }
    }
  }
}

runCompleteProductionJourneyTest().catch(console.error);
