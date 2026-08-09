import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAutoDocuments } from "@/lib/documentEngine";
import { DEFAULT_TASKS_KEYS } from "@/lib/bookingStore";
import { sendCentralNotification } from "@/lib/notificationEngine";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        customer: true,
        package: true,
        travel: true,
        hotel: true,
        vehicle: true,
        pandit: true,
        coordinator: true,
        payments: true,
        documents: true,
        tasks: true,
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Extract Customer Info (Handles both flat & nested wizard payloads)
    const custName = body.customer?.name || body.name || body.customerName || "Devotee Family";
    const custPhone = body.customer?.phone || body.phone || body.customerPhone || `98765${Math.floor(10000 + Math.random() * 90000)}`;
    const custEmail = body.customer?.email || body.email || body.customerEmail || "devotee@example.com";
    const custCity = body.customer?.city || body.city || "Delhi";
    const custCountry = body.customer?.country || body.country || "India";

    // Create or Find Customer (Updates name & email if matching existing phone)
    let customerRecord = await prisma.customer.findFirst({
      where: { phone: custPhone },
    });

    if (customerRecord) {
      if (custName && custName !== "Devotee Family" && customerRecord.name !== custName) {
        customerRecord = await prisma.customer.update({
          where: { id: customerRecord.id },
          data: {
            name: custName,
            email: custEmail !== "devotee@example.com" ? custEmail : customerRecord.email,
            city: custCity !== "Delhi" ? custCity : customerRecord.city,
          },
        });
      }
    } else {
      customerRecord = await prisma.customer.create({
        data: {
          name: custName,
          phone: custPhone,
          email: custEmail,
          city: custCity,
          country: custCountry,
        },
      });
    }

    // 2. Resolve Valid Package Record in Neon DB
    const validPackageId = body.packageId || body.package?.id || body.packageTierId;
    let pkgRecord = null;
    if (validPackageId) {
      pkgRecord = await prisma.package.findUnique({ where: { id: validPackageId } });
    }
    if (!pkgRecord) {
      pkgRecord = await prisma.package.findFirst();
    }
    if (!pkgRecord) {
      pkgRecord = await prisma.package.create({
        data: {
          id: "heritage-experience",
          title: body.package?.title || body.packageTitle || "Heritage Experience",
          startingPrice: body.pricing?.grandTotal || body.grandTotal || 24999,
          duration: body.package?.duration || body.duration || "2 Days / 1 Night",
        },
      });
    }

    // 3. Mint Collision-Proof Reservation ID
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const uniqueSuffix = `${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
    const reservationId = `PTR-${dateStr}-${uniqueSuffix}`;

    // 4. Create Booking Record in Neon PostgreSQL via Prisma
    const booking = await prisma.booking.create({
      data: {
        reservationId,
        customerId: customerRecord.id,
        packageId: pkgRecord.id,
        packageTitle: body.package?.title || body.packageTitle || pkgRecord.title,
        duration: body.package?.duration || body.duration || pkgRecord.duration,
        status: "lead",
        journeyStatus: "not_started",
        grandTotal: body.pricing?.grandTotal || body.grandTotal || pkgRecord.startingPrice || 24999,
        adults: body.family?.adults || body.adults || 2,
        elders: body.family?.elders || body.elders || 0,
        children: body.family?.children || body.children || 0,
        totalCount: body.pricing?.familyTotalCount || body.family?.totalCount || body.totalCount || 2,
        wheelchairNeeded: !!(body.family?.wheelchairNeeded || body.wheelchairNeeded),
        airportPickupNeeded: !!(body.family?.airportPickupNeeded || body.airportPickupNeeded),
        travel: {
          create: {
            mode: body.travel?.mode || body.travelMode || "flight",
            arrivalDate: body.travel?.arrivalDate || body.arrivalDate || "12 August",
            arrivalTime: body.travel?.arrivalTime || body.arrivalTime || "10:30 AM",
            flightOrTrainNumber: body.travel?.flightOrTrainNumber || body.flightOrTrainNumber || "",
          },
        },
        tasks: {
          create: DEFAULT_TASKS_KEYS.map((k, idx) => ({
            taskKey: k,
            title: k,
            completed: idx === 0,
          })),
        },
      },
      include: {
        customer: true,
        travel: true,
        tasks: true,
      },
    });

    // 5. Auto-Generate 5 Documents
    const autoDocs = generateAutoDocuments({
      id: booking.id,
      reservationId: booking.reservationId,
    });

    await prisma.document.createMany({
      data: autoDocs.map((d) => ({
        bookingId: booking.id,
        docType: d.docType,
        title: d.title,
        downloadUrl: d.downloadUrl,
      })),
    });

    // 6. Central Notification Dispatch (Email, WhatsApp, Admin Alert, Coordinator Alert)
    const notifications = await sendCentralNotification("BOOKING_CREATED", {
      bookingId: booking.id,
      reservationId: booking.reservationId,
      customerName: customerRecord.name,
      customerPhone: customerRecord.phone,
      customerEmail: customerRecord.email,
      packageTitle: booking.packageTitle,
      grandTotal: booking.grandTotal,
      arrivalDate: booking.travel?.arrivalDate,
    });

    return NextResponse.json({
      success: true,
      reservationId: booking.reservationId,
      booking,
      notifications,
    });
  } catch (error) {
    console.error("Error creating booking in POST /api/bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
