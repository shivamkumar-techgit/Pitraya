import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        bookings: true,
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, city, country } = body;

    let customer = await prisma.customer.findFirst({
      where: { phone },
    });

    if (customer) {
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: { name, email, city, country },
      });
    } else {
      customer = await prisma.customer.create({
        data: {
          name,
          phone,
          email,
          city,
          country: country || "India",
        },
      });
    }

    return NextResponse.json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error("Error saving customer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save customer" },
      { status: 500 }
    );
  }
}
