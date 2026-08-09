import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const coordinators = await prisma.coordinator.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      coordinators,
    });
  } catch (err) {
    console.error("GET /api/coordinators database error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch coordinators from database" },
      { status: 500 }
    );
  }
}
