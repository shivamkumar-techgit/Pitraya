import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim();

    if (!query) {
      return NextResponse.json(
        { success: false, code: "BAD_REQUEST", message: "Please provide a valid Reservation ID or Phone Number." },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { reservationId: { equals: query, mode: "insensitive" } },
          { customer: { phone: query } },
        ],
      },
      include: {
        customer: true,
        travel: true,
        hotel: true,
        pandit: true,
        payments: { orderBy: { issuedAt: "desc" } },
        timelines: { orderBy: { timestamp: "asc" } },
        tasks: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, code: "NOT_FOUND", message: "No booking found matching your reservation ID or phone number." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        reservationId: booking.reservationId,
        packageTitle: booking.packageTitle,
        duration: booking.duration,
        status: booking.status,
        grandTotal: booking.grandTotal,
        customerName: booking.customer.name,
        customerPhone: booking.customer.phone,
        travel: booking.travel,
        hotel: booking.hotel,
        pandit: booking.pandit,
        payments: booking.payments,
        timeline: booking.timelines,
        tasks: booking.tasks,
      },
    });
  } catch (err: unknown) {
    console.error("❌ Portal Lookup Error:", err);
    const message = err instanceof Error ? err.message : "An internal error occurred.";
    return NextResponse.json(
      { success: false, code: "INTERNAL_SERVER_ERROR", message },
      { status: 500 }
    );
  }
}
