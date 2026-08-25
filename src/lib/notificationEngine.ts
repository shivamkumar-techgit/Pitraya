import prisma from "@/lib/prisma";
import { NotificationType } from "@prisma/client";

export type NotificationEvent =
  | "BOOKING_CREATED"
  | "COORDINATOR_ASSIGNED"
  | "PAYMENT_LINK_GENERATED"
  | "PAYMENT_RECEIVED"
  | "VEHICLE_ASSIGNED"
  | "HOTEL_ASSIGNED"
  | "RITES_COMPLETED";

export interface NotificationPayload {
  bookingId: string;
  reservationId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  packageTitle: string;
  grandTotal: number;
  paymentLink?: string;
  arrivalDate?: string;
  coordinatorName?: string;
  coordinatorPhone?: string;
  vehicleName?: string;
  driverName?: string;
  driverPhone?: string;
  hotelName?: string;
  hotelAddress?: string;
  hotelMapsUrl?: string;
  referralCode?: string;
}

export interface NotificationResult {
  email: { recipient: string; subject: string; body: string; htmlBody: string };
  adminEmail: { recipient: string; subject: string; body: string; htmlBody: string };
  whatsapp: { recipientPhone: string; message: string; waUrl: string };
  adminAlert: { title: string; message: string };
  coordinatorAlert: { title: string; message: string };
}

export async function sendCentralNotification(
  event: NotificationEvent,
  payload: NotificationPayload
): Promise<NotificationResult> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const pitrayaAdminEmail = process.env.ADMIN_EMAIL || "pitrayaenquiry@gmail.com";

  const {
    bookingId,
    reservationId,
    customerName,
    customerPhone,
    customerEmail = "customer@example.com",
    packageTitle,
    grandTotal,
    paymentLink = payload.paymentLink ||
      process.env.PAYU_PAYMENT_LINK ||
      process.env.NEXT_PUBLIC_PAYU_PAYMENT_LINK ||
      "https://u.payu.in/MIvnJ8tUOvLJ",
    arrivalDate = "12 August",
    coordinatorName,
    coordinatorPhone,
    vehicleName,
    driverName,
    driverPhone,
    hotelName,
    hotelAddress = "Main Temple Road, Bodhgaya",
    hotelMapsUrl = "https://maps.google.com/?q=Bodhgaya",
    referralCode,
  } = payload;

  const cleanPhone = customerPhone.replace(/[^0-9]/g, "");

  let subject = "";
  let emailBody = "";
  let htmlBody = "";

  let adminSubject = "";
  let adminEmailBody = "";
  let adminHtmlBody = "";

  let waMsg = "";
  let adminTitle = "";
  let adminMsg = "";
  let coordTitle = "";
  let coordMsg = "";
  let notifType: NotificationType = "confirmation";

  switch (event) {
    case "COORDINATOR_ASSIGNED":
      notifType = "confirmation";
      subject = `📋 Senior Coordinator Assigned: ${coordinatorName || "Rajesh"} (${reservationId})`;
      emailBody = `Dear ${customerName} Ji,\n\nYour coordinator ${coordinatorName || "Rajesh"} (${coordinatorPhone || "+91 98111 22233"}) has been assigned to your sacred Gaya pilgrimage reservation ${reservationId}.`;
      htmlBody = `<p>Dear <strong>${customerName} Ji</strong>, Your coordinator <strong>${coordinatorName || "Rajesh"}</strong> (${coordinatorPhone || "+91 98111 22233"}) has been assigned for ${reservationId}.</p>`;

      adminSubject = `📋 COORDINATOR ASSIGNED • ${reservationId} (${coordinatorName || "Rajesh"})`;
      adminEmailBody = `Coordinator assigned for ${reservationId}: ${coordinatorName || "Rajesh"} (${coordinatorPhone || "+91 98111 22233"})`;
      adminHtmlBody = `<p>Coordinator ${coordinatorName || "Rajesh"} assigned to ${reservationId}.</p>`;

      const salutationName = customerName.toLowerCase().includes("ji") ? customerName : `${customerName} Ji`;
      waMsg =
        `Dear ${salutationName},\n\n` +
        `Your coordinator ${coordinatorName || "Rajesh"} has been assigned.\n\n` +
        `Phone\n\n` +
        `${coordinatorPhone || "+91 98111 22233"}\n\n` +
        `Reservation ID: ${reservationId}`;

      adminTitle = "📋 COORDINATOR ASSIGNED";
      adminMsg = `Coordinator ${coordinatorName || "Rajesh"} assigned to ${reservationId}.`;
      coordTitle = "📋 Lead Assigned";
      coordMsg = `You have been assigned to lead ${reservationId} (${customerName}).`;
      break;

    case "BOOKING_CREATED":
      notifType = "confirmation";
      
      // 1. User Email (Welcome Email)
      subject = `Pranam ${customerName} Ji • Sacred Pilgrimage Reservation Received (${reservationId})`;
      emailBody = `Pranam ${customerName} Ji,\n\nThank you for choosing Pitraya. Your reservation (${reservationId}) for ${packageTitle} has been received. Our concierge team will contact you within 15 minutes.`;
      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0d10; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background: #12161f; border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 16px; overflow: hidden; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
    .header { text-align: center; border-bottom: 1px solid #1f293d; padding-bottom: 20px; margin-bottom: 24px; }
    .logo { color: #d4af37; font-size: 26px; font-weight: bold; letter-spacing: 2px; font-family: Georgia, serif; }
    .subtitle { color: #9ca3af; font-size: 11px; margin-top: 4px; letter-spacing: 1.5px; text-transform: uppercase; }
    .card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin: 20px 0; }
    .badge { display: inline-block; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); color: #60a5fa; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; font-family: monospace; }
    .footer { text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #1f293d; padding-top: 20px; margin-top: 28px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🔱 PITRAYA</div>
      <div class="subtitle">Sacred Gaya Pinda Daan Concierge</div>
    </div>
    <p style="font-size: 16px; color: #f3f4f6;">Pranam <strong>${customerName} Ji</strong> 🙏,</p>
    <p style="color: #d1d5db; line-height: 1.6;">Thank you for reserving your ancestral Pinda Daan oblation rites with Pitraya. Your reservation has been logged into our sacred register.</p>
    <div class="card">
      <div class="badge">RESERVATION ID: ${reservationId}</div>
      <p style="margin-top: 16px; font-size: 16px; color: #ffffff; font-weight: bold;">${packageTitle}</p>
      <p style="color: #9ca3af; font-size: 13px;">Arrival Date: <strong style="color: #d4af37;">${arrivalDate}</strong></p>
      <p style="color: #9ca3af; font-size: 13px;">Estimated Package Investment: <strong style="color: #f59e0b; font-size: 16px;">₹${grandTotal.toLocaleString("en-IN")}</strong></p>
    </div>
    <p style="color: #10b981; font-weight: bold; line-height: 1.6;">📞 Next Step: Our Senior Pilgrimage Coordinator will reach you within 15 minutes to confirm your family lineage details.</p>
    <div class="footer">
      <p style="margin-bottom: 4px;">With sacred regards,<br/><strong style="color: #d4af37;">Pitraya Concierge Team</strong></p>
      <p>© Pitraya Rituals • Vishnupad Temple Sanctum, Gaya, Bihar</p>
    </div>
  </div>
</body>
</html>`;

      // 2. Pitraya Admin/Ops Email (New Lead Operations Alert)
      adminSubject = `🚨 NEW LEAD ALERT • ${customerName} Reserved ${packageTitle} (${reservationId})`;
      adminEmailBody = `New Lead Received:\nReservation ID: ${reservationId}\nCustomer: ${customerName} (${customerPhone})\nEmail: ${customerEmail}\nPackage: ${packageTitle}\nTotal: ₹${grandTotal.toLocaleString("en-IN")}\nArrival: ${arrivalDate}`;
      adminHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0d10; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background: #12161f; border: 1px solid #3b82f6; border-radius: 16px; padding: 32px; }
    .badge { display: inline-block; background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-family: monospace; }
    .btn { display: block; text-align: center; background: #3b82f6; color: #fff; font-weight: bold; padding: 14px; border-radius: 10px; text-decoration: none; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h2 style="color: #60a5fa; margin-top: 0;">🚨 NEW LEAD INGRESSED</h2>
    <div class="badge">RESERVATION #${reservationId}</div>
    <table style="width: 100%; margin-top: 16px; color: #d1d5db; font-size: 14px; border-collapse: collapse;">
      <tr><td style="padding: 6px 0; color: #9ca3af;">Customer Name:</td><td style="font-weight: bold; color: #fff;">${customerName}</td></tr>
      <tr><td style="padding: 6px 0; color: #9ca3af;">Phone / WhatsApp:</td><td style="font-weight: bold; color: #34d399;">${customerPhone}</td></tr>
      <tr><td style="padding: 6px 0; color: #9ca3af;">Email:</td><td>${customerEmail}</td></tr>
      <tr><td style="padding: 6px 0; color: #9ca3af;">Package:</td><td style="font-weight: bold; color: #f59e0b;">${packageTitle}</td></tr>
      <tr><td style="padding: 6px 0; color: #9ca3af;">Grand Total:</td><td style="font-weight: bold; color: #f59e0b;">₹${grandTotal.toLocaleString("en-IN")}</td></tr>
      <tr><td style="padding: 6px 0; color: #9ca3af;">Arrival Date:</td><td>${arrivalDate}</td></tr>
    </table>
    <a href="${baseUrl}/admin" class="btn">Open Pitraya CRM Admin Dashboard</a>
  </div>
</body>
</html>`;

      waMsg =
        `Namaste ${customerName},\n\n` +
        `Your PITRAYA reservation has been received.\n\n` +
        `Reservation:\n` +
        `${reservationId}\n\n` +
        `Experience:\n` +
        `${packageTitle}\n\n` +
        `Amount:\n` +
        `₹${grandTotal.toLocaleString("en-IN")}\n\n` +
        `Our pilgrimage coordinator will contact you shortly.\n\n` +
        `PITRAYA\n` +
        `Ancestral Rituals · Gaya`;

      adminTitle = "📥 NEW LEAD CREATED";
      adminMsg = `New Lead ${reservationId} created by ${customerName} (${customerPhone}).`;
      coordTitle = "📋 Lead Assigned";
      coordMsg = `Lead ${reservationId} assigned to Concierge Desk.`;
      break;

    case "PAYMENT_LINK_GENERATED":
      notifType = "payment_link";
      
      // 1. User Email
      subject = `Payment Link: Your ${packageTitle} Pilgrimage Reservation (${reservationId})`;
      emailBody = `Namaste ${customerName},\n\nYour ${packageTitle} booking has been reserved.\n\nReservation ID: ${reservationId}\nPayment Link: ${paymentLink}\n\nThank you,\nPitraya Concierge Team`;
      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0d10; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background: #12161f; border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 16px; overflow: hidden; padding: 32px; }
    .header { text-align: center; border-bottom: 1px solid #1f293d; padding-bottom: 20px; }
    .logo { color: #d4af37; font-size: 26px; font-weight: bold; font-family: Georgia, serif; }
    .badge { display: inline-block; background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); color: #f59e0b; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; font-family: monospace; }
    .pay-btn { display: block; text-align: center; background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); color: #000000; font-weight: bold; padding: 16px 0; border-radius: 12px; text-decoration: none; font-size: 16px; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🔱 PITRAYA</div>
    </div>
    <p style="font-size: 16px; color: #f3f4f6;">Namaste <strong>${customerName}</strong>,</p>
    <p style="color: #d1d5db;">Your <strong>${packageTitle}</strong> pilgrimage booking has been reserved.</p>
    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 20px; border-radius: 12px;">
      <div class="badge">RESERVATION ID: ${reservationId}</div>
      <p style="margin-top: 12px; font-size: 15px; color: #e5e7eb;">Total Amount: <strong style="color: #f59e0b; font-size: 18px;">₹${grandTotal.toLocaleString("en-IN")}</strong></p>
    </div>
    <p style="color: #d1d5db;">Please complete your payment using the secure payment link below:</p>
    <a href="${paymentLink}" class="pay-btn">💳 Pay Securely via PayU</a>
    <p style="font-size: 12px; color: #9ca3af; text-align: center;">Direct Link: <a href="${paymentLink}" style="color: #f59e0b;">${paymentLink}</a></p>
  </div>
</body>
</html>`;

      // 2. Pitraya Admin Email
      adminSubject = `💳 PAYMENT LINK DISPATCHED • ${reservationId} (₹${grandTotal.toLocaleString("en-IN")})`;
      adminEmailBody = `Payment Link Issued for ${reservationId}:\nCustomer: ${customerName} (${customerPhone})\nLink: ${paymentLink}`;
      adminHtmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><style>body { font-family: Arial; background: #0b0d10; color: #fff; padding: 24px; }</style></head>
<body>
  <h3 style="color: #a855f7;">💳 PAYMENT LINK DISPATCHED</h3>
  <p>Reservation: <strong>${reservationId}</strong><br/>Customer: ${customerName} (${customerPhone})</p>
  <p>Amount: <strong>₹${grandTotal.toLocaleString("en-IN")}</strong></p>
  <p>PayU Live Link: <a href="${paymentLink}" style="color: #a855f7;">${paymentLink}</a></p>
</body>
</html>`;

      waMsg =
        `Namaste ${customerName},\n\n` +
        `Your ${packageTitle} booking has been reserved.\n\n` +
        `Reservation ID:\n` +
        `${reservationId}\n\n` +
        `Please complete your payment using the secure payment link below:\n\n` +
        `${paymentLink}\n\n` +
        `Thank you,\n` +
        `Pitraya Concierge Team`;

      adminTitle = "💳 PAYMENT LINK GENERATED";
      adminMsg = `Payment Link generated for ${reservationId}: ${paymentLink}`;
      coordTitle = "💳 Payment Link Issued";
      coordMsg = `Payment link sent to ${customerName} (${customerPhone}).`;
      break;

    case "PAYMENT_RECEIVED":
      notifType = "payment_link";
      
      // 1. User Email (Booking Confirmation Email)
      subject = `🎉 Booking Confirmed & Payment Verified • Reservation (${reservationId})`;
      emailBody = `Pranam ${customerName} Ji,\n\nYour payment of ₹${grandTotal.toLocaleString("en-IN")} for reservation ${reservationId} has been verified and confirmed.`;
      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0d10; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background: #12161f; border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 16px; overflow: hidden; padding: 32px; }
    .header { text-align: center; border-bottom: 1px solid #1f293d; padding-bottom: 20px; }
    .logo { color: #d4af37; font-size: 26px; font-weight: bold; font-family: Georgia, serif; }
    .badge { display: inline-block; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.5); color: #34d399; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; font-family: monospace; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🔱 PITRAYA</div>
    </div>
    <p style="font-size: 16px; color: #f3f4f6;">Pranam <strong>${customerName} Ji</strong> 🙏,</p>
    <p style="color: #d1d5db; line-height: 1.6;">We are pleased to inform you that your payment of <strong style="color: #34d399;">₹${grandTotal.toLocaleString("en-IN")}</strong> has been successfully verified. Your Gaya pilgrimage is now <strong>OFFICIALLY CONFIRMED</strong>.</p>
    <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.3); padding: 20px; border-radius: 12px;">
      <div class="badge">CONFIRMED • ${reservationId}</div>
      <p style="margin-top: 16px; font-size: 16px; color: #ffffff; font-weight: bold;">${packageTitle}</p>
      <p style="color: #9ca3af; font-size: 13px;">Arrival Date: <strong style="color: #d4af37;">${arrivalDate}</strong></p>
      <p style="color: #9ca3af; font-size: 13px;">Official Invoice & Travel Vouchers: <strong>Auto-Generated & Attached</strong></p>
    </div>
    <p style="color: #d1d5db;">Our Senior Gayawal Purohit & Chauffeur team have been dispatched to prepare your sacred oblations at Vishnupad Sanctum.</p>
  </div>
</body>
</html>`;

      // 2. Pitraya Admin Email (Booking Confirmed Operations Dispatch)
      adminSubject = `✅ BOOKING CONFIRMED & PAID • Assign Hotel & Vehicle for ${reservationId}`;
      adminEmailBody = `Booking Paid & Confirmed:\nReservation ID: ${reservationId}\nCustomer: ${customerName} (${customerPhone})\nAmount Paid: ₹${grandTotal.toLocaleString("en-IN")}\nArrival Date: ${arrivalDate}`;
      adminHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0d10; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background: #12161f; border: 1px solid #10b981; border-radius: 16px; padding: 32px; }
    .badge { display: inline-block; background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-family: monospace; }
    .btn { display: block; text-align: center; background: #10b981; color: #000; font-weight: bold; padding: 14px; border-radius: 10px; text-decoration: none; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h2 style="color: #34d399; margin-top: 0;">✅ BOOKING CONFIRMED & PAID</h2>
    <div class="badge">CONFIRMED • ${reservationId}</div>
    <table style="width: 100%; margin-top: 16px; color: #d1d5db; font-size: 14px; border-collapse: collapse;">
      <tr><td style="padding: 6px 0; color: #9ca3af;">Customer:</td><td style="font-weight: bold; color: #fff;">${customerName} (${customerPhone})</td></tr>
      <tr><td style="padding: 6px 0; color: #9ca3af;">Amount Verified:</td><td style="font-weight: bold; color: #34d399;">₹${grandTotal.toLocaleString("en-IN")}</td></tr>
      <tr><td style="padding: 6px 0; color: #9ca3af;">Package:</td><td style="font-weight: bold; color: #f59e0b;">${packageTitle}</td></tr>
      <tr><td style="padding: 6px 0; color: #9ca3af;">Arrival Date:</td><td>${arrivalDate}</td></tr>
    </table>
    <p style="color: #f59e0b; font-weight: bold; margin-top: 16px;">Next Action: Assign Hotel, Vehicle, and Pandit in Admin Workspace.</p>
    <a href="${baseUrl}/admin" class="btn">Open Pitraya CRM Operations</a>
  </div>
</body>
</html>`;

      waMsg =
        `Namaste ${customerName} Ji 🙏\n\n` +
        `Payment received! Your Gaya pilgrimage has been confirmed.\n\n` +
        `📍 *Reservation ID*: ${reservationId}\n` +
        `✨ *Experience*: ${packageTitle}\n` +
        `📅 *Arrival Date*: ${arrivalDate}\n\n` +
        `Our Senior Gayawal Purohit is preparing your Pinda Daan rites.`;

      adminTitle = "💳 PAYMENT VERIFIED";
      adminMsg = `Payment ₹${grandTotal.toLocaleString("en-IN")} received for ${reservationId}.`;
      coordTitle = "✅ Customer Confirmed";
      coordMsg = `Booking ${reservationId} confirmed. Reserve hotel & vehicle now.`;
      break;

    case "VEHICLE_ASSIGNED":
      notifType = "vehicle";
      subject = `🚗 Chauffeur & Pickup Details Assigned (${reservationId})`;
      emailBody = `Pranam ${customerName} Ji,\n\nYour private pickup vehicle details: Vehicle ${vehicleName}, Driver ${driverName} (${driverPhone}).`;
      htmlBody = `<p>Pranam <strong>${customerName} Ji</strong>, Your private pickup vehicle: ${vehicleName}, Driver ${driverName} (${driverPhone}).</p>`;

      adminSubject = `🚗 VEHICLE DISPATCHED • ${reservationId} (${vehicleName})`;
      adminEmailBody = `Vehicle assigned for ${reservationId}: Driver ${driverName} (${driverPhone})`;
      adminHtmlBody = `<p>Vehicle ${vehicleName} assigned to ${reservationId}. Driver: ${driverName} (${driverPhone}).</p>`;

      waMsg =
        `Namaste ${customerName} Ji 🙏\n\n` +
        `Your private pickup vehicle & chauffeur details for your Gaya pilgrimage have been assigned:\n\n` +
        `🚗 *Vehicle*: ${vehicleName || "Innova Crysta AC"}\n` +
        `👨‍✈️ *Driver Name*: ${driverName || "Chauffeur Ramesh"}\n` +
        `📞 *Driver Phone*: ${driverPhone || "+91 99887 76655"}\n\n` +
        `Your chauffeur will receive you upon arrival.`;

      adminTitle = "🚗 VEHICLE ASSIGNED";
      adminMsg = `Vehicle ${vehicleName} assigned to ${reservationId}.`;
      coordTitle = "🚗 Driver Dispatched";
      coordMsg = `Driver ${driverName} notified for pickup.`;
      break;

    case "HOTEL_ASSIGNED":
      notifType = "hotel";
      subject = `🏨 Hotel Accommodation Reservation Confirmed (${reservationId})`;
      emailBody = `Pranam ${customerName} Ji,\n\nYour Sattvik hotel accommodation: ${hotelName}, Address: ${hotelAddress}.`;
      htmlBody = `<p>Pranam <strong>${customerName} Ji</strong>, Hotel accommodation assigned: ${hotelName}, Address: ${hotelAddress}.</p>`;

      adminSubject = `🏨 HOTEL ALLOTTED • ${reservationId} (${hotelName})`;
      adminEmailBody = `Hotel allotted for ${reservationId}: ${hotelName}`;
      adminHtmlBody = `<p>Hotel ${hotelName} allotted for ${reservationId}.</p>`;

      waMsg =
        `Namaste ${customerName} Ji 🙏\n\n` +
        `Your Sattvik hotel accommodation reservation details:\n\n` +
        `🏨 *Hotel Name*: ${hotelName || "Bodhgaya Regency Heritage Suite"}\n` +
        `📍 *Address*: ${hotelAddress}\n` +
        `🗺️ *Google Maps*: ${hotelMapsUrl}\n` +
        `⏰ *Check-in Time*: 12:00 PM\n` +
        `🛏️ *Rooms*: Reserved`;

      adminTitle = "🏨 HOTEL ASSIGNED";
      adminMsg = `Hotel ${hotelName} reserved for ${reservationId}.`;
      coordTitle = "🏨 Room Allotted";
      coordMsg = `Hotel voucher issued for ${reservationId}.`;
      break;

    case "RITES_COMPLETED":
      notifType = "review_request";
      subject = `✨ Sacred Rites Completed & Ancestral Blessing (${reservationId})`;
      emailBody = `Pranam ${customerName} Ji,\n\nMay your ancestors attain eternal peace. Please share your experience: https://g.page/r/pitraya-gaya-pind-daan/review`;
      htmlBody = `<p>Pranam <strong>${customerName} Ji</strong>, Your oblation rites are officially completed.</p>`;

      adminSubject = `✨ RITES SEALED • ${reservationId} (${customerName})`;
      adminEmailBody = `Journey completed for ${reservationId}. Review flow triggered.`;
      adminHtmlBody = `<p>Rites completed for ${reservationId}. Review flow triggered.</p>`;

      waMsg =
        `Pranam ${customerName} Ji 🙏\n\n` +
        `Thank you for allowing Pitraya to serve your family during your sacred Gaya Pinda Daan pilgrimage.\n\n` +
        `1️⃣ *Google Review*: https://g.page/r/pitraya-gaya-pind-daan/review\n` +
        `2️⃣ *Upload Photos*: Add your sacred pilgrimage photos to your family vault.\n` +
        `3️⃣ *Referral Gift*: Share code *${referralCode || `PITRAYA-REF-${reservationId.slice(-4)}`}* for ₹2,000 credit.`;

      adminTitle = "✨ JOURNEY COMPLETED";
      adminMsg = `Journey completed for ${reservationId}. Review flow triggered.`;
      coordTitle = "✨ Rites Sealed";
      coordMsg = `Completion certificate & review flow dispatched for ${reservationId}.`;
      break;
  }

  const encodedWa = encodeURIComponent(waMsg);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedWa}`;

  // Log Notification into Neon PostgreSQL via Prisma (if valid bookingId exists)
  if (bookingId && !bookingId.startsWith("test-")) {
    try {
      const exists = await prisma.booking.findUnique({ where: { id: bookingId } });
      if (exists) {
        await prisma.notification.create({
          data: {
            bookingId,
            type: notifType,
            recipientPhone: customerPhone,
            channel: "whatsapp",
            content: waMsg,
            sentAt: new Date(),
          },
        });
      }
    } catch (err) {
      console.warn("Notification DB logging warning:", err);
    }
  }

  return {
    email: { recipient: customerEmail, subject, body: emailBody, htmlBody },
    adminEmail: { recipient: pitrayaAdminEmail, subject: adminSubject, body: adminEmailBody, htmlBody: adminHtmlBody },
    whatsapp: { recipientPhone: customerPhone, message: waMsg, waUrl },
    adminAlert: { title: adminTitle, message: adminMsg },
    coordinatorAlert: { title: coordTitle, message: coordMsg },
  };
}
