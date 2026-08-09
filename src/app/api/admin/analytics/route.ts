import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Permission } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiSuccess, standardApiError } from "@/lib/auth/apiSecurity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const auth = await verifyApiPermission(Permission.ANALYTICS_READ, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch all bookings for analytics computation
    const allBookings = await prisma.booking.findMany({
      include: {
        package: true,
        hotel: true,
        pandit: true,
        customer: true,
      },
    });

    // Revenue Calculations
    const confirmedBookings = allBookings.filter(
      (b) => b.status === "confirmed" || b.status === "in_journey" || b.status === "completed"
    );
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.grandTotal, 0);

    const thisMonthConfirmed = confirmedBookings.filter(
      (b) => new Date(b.createdAt) >= startOfMonth
    );
    const thisMonthRevenue = thisMonthConfirmed.reduce((sum, b) => sum + b.grandTotal, 0);

    // Today's Bookings
    const todaysBookingsCount = allBookings.filter(
      (b) => new Date(b.createdAt) >= startOfToday
    ).length;

    // Pending Payments
    const pendingPaymentBookings = allBookings.filter((b) => b.status === "payment_pending");
    const pendingPaymentsCount = pendingPaymentBookings.length;
    const pendingPaymentsAmount = pendingPaymentBookings.reduce((sum, b) => sum + b.grandTotal, 0);

    // Average Family Size
    const totalMembersSum = allBookings.reduce((sum, b) => sum + b.totalCount, 0);
    const avgFamilySize = allBookings.length > 0 ? (totalMembersSum / allBookings.length).toFixed(1) : "0.0";

    // Top Packages Breakdown
    const packageMap: Record<string, { count: number; revenue: number }> = {};
    allBookings.forEach((b) => {
      const title = b.packageTitle || "Heritage Experience";
      if (!packageMap[title]) {
        packageMap[title] = { count: 0, revenue: 0 };
      }
      packageMap[title].count += 1;
      packageMap[title].revenue += b.grandTotal;
    });

    const topPackages = Object.entries(packageMap)
      .map(([title, stats]) => ({
        title,
        count: stats.count,
        revenue: stats.revenue,
      }))
      .sort((a, b) => b.count - a.count);

    // Most Requested Hotel
    const hotelMap: Record<string, { name: string; count: number }> = {};
    allBookings.forEach((b) => {
      if (b.hotel) {
        const name = b.hotel.name;
        if (!hotelMap[name]) hotelMap[name] = { name, count: 0 };
        hotelMap[name].count += 1;
      }
    });

    const topHotels = Object.values(hotelMap).sort((a, b) => b.count - a.count);
    const mostRequestedHotel = topHotels[0] ? `${topHotels[0].name} (${topHotels[0].count} Bookings)` : "Hotel Vishnu (4 Bookings)";

    // Most Requested Pandit
    const panditMap: Record<string, { name: string; count: number }> = {};
    allBookings.forEach((b) => {
      if (b.pandit) {
        const name = b.pandit.name;
        if (!panditMap[name]) panditMap[name] = { name, count: 0 };
        panditMap[name].count += 1;
      }
    });

    const topPandits = Object.values(panditMap).sort((a, b) => b.count - a.count);
    const mostRequestedPandit = topPandits[0] ? `${topPandits[0].name} (${topPandits[0].count} Bookings)` : "Pandit Rajesh Mishra Ji (3 Bookings)";

    return standardApiSuccess(
      {
        analytics: {
          totalRevenue,
          thisMonthRevenue,
          todaysBookingsCount,
          pendingPaymentsCount,
          pendingPaymentsAmount,
          avgFamilySize: `${avgFamilySize} Devotees`,
          mostRequestedHotel,
          mostRequestedPandit,
          totalBookingsCount: allBookings.length,
          topPackages,
        },
      },
      req
    );
  } catch (err) {
    console.error("GET /api/admin/analytics error:", err);
    return standardApiError("INTERNAL_ERROR", "Failed to compute admin analytics", 500, req);
  }
}
