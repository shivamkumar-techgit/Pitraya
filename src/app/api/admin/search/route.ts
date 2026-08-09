import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  if (!query || query.length < 2) {
    return NextResponse.json({ bookings: [], customers: [] });
  }

  try {
    const [bookings, customers] = await Promise.all([
      prisma.booking.findMany({
        where: {
          reservationId: { contains: query, mode: "insensitive" },
        },
        take: 8,
        include: {
          customer: { select: { name: true, phone: true, email: true } },
          package: { select: { title: true } },
        },
      }),
      prisma.customer.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { phone: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 8,
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
      }),
    ]);

    return NextResponse.json({ bookings, customers });
  } catch (error) {
    console.error("❌ Global search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
