import React from "react";
import { BookingStatus } from "@prisma/client";
import prisma from "@/lib/prisma";
import GlobalCommandSearch from "@/components/admin/GlobalCommandSearch";
import AdminDataTable, { BookingRow } from "@/components/admin/AdminDataTable";
import { revalidatePath } from "next/cache";

async function handleBulkStatusUpdate(bookingIds: string[], status: string) {
  "use server";
  try {
    await prisma.booking.updateMany({
      where: { id: { in: bookingIds } },
      data: { status: status as BookingStatus },
    });
    revalidatePath("/admin/bookings");
  } catch (err) {
    console.error("Bulk status update failed:", err);
  }
}

export default async function AdminBookingsPage() {
  const rawBookings = await prisma.booking.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
    include: {
      customer: { select: { name: true, phone: true } },
      package: { select: { title: true } },
      payments: { select: { status: true } },
    },
  });

  const formattedBookings: BookingRow[] = rawBookings.map((b) => ({
    id: b.id,
    bookingNumber: b.reservationId,
    customerName: b.customer?.name || "Guest Devotee",
    customerPhone: b.customer?.phone || "N/A",
    packageName: b.package?.title || "Custom Ritual Package",
    amount: b.grandTotal,
    status: b.status,
    paymentStatus: b.payments?.[0]?.status || "pending",
    createdAt: b.createdAt.toISOString().split("T")[0],
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-amber-400">Booking Management</h1>
            <p className="text-slate-400 text-sm mt-1">Operational view of active pilgrimage reservations.</p>
          </div>
          <GlobalCommandSearch />
        </header>

        <AdminDataTable data={formattedBookings} onBulkStatusUpdate={handleBulkStatusUpdate} />
      </div>
    </main>
  );
}
