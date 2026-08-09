import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingIds, status, coordinatorId } = body;

    if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
      return NextResponse.json({ error: "bookingIds array is required" }, { status: 400 });
    }

    const updateData: Prisma.BookingUncheckedUpdateManyInput = {};
    if (status && Object.values(BookingStatus).includes(status)) {
      updateData.status = status;
    }
    if (coordinatorId !== undefined) {
      updateData.coordinatorId = coordinatorId;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid update fields provided" }, { status: 400 });
    }

    const result = await prisma.booking.updateMany({
      where: { id: { in: bookingIds } },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      count: result.count,
      message: `Successfully updated ${result.count} bookings`,
    });
  } catch (error) {
    console.error("❌ Bulk booking update error:", error);
    return NextResponse.json({ error: "Bulk update failed" }, { status: 500 });
  }
}
