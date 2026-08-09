import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      orderBy: { starRating: "desc" },
    });

    return NextResponse.json({
      success: true,
      hotels,
    });
  } catch (err) {
    console.error("GET /api/hotels database error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hotels from database" },
      { status: 500 }
    );
  }
}
