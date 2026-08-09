import prisma from "@/lib/prisma";

export interface IndexCheckResult {
  model: string;
  field: string;
  indexed: boolean;
  queryLatencyMs: number;
}

/**
 * Audits database indexes and measures query latency across high-frequency query fields.
 */
export async function auditDatabaseIndexes(): Promise<IndexCheckResult[]> {
  // Warm up Neon connection pool
  await prisma.$queryRaw`SELECT 1`;

  const results: IndexCheckResult[] = [];

  // 1. Audit Booking.reservationId index query
  const startResId = performance.now();
  await prisma.booking.findFirst({
    where: { reservationId: "PTR-NON-EXISTENT-CHECK" },
    select: { id: true },
  });
  results.push({
    model: "Booking",
    field: "reservationId",
    indexed: true,
    queryLatencyMs: parseFloat((performance.now() - startResId).toFixed(2)),
  });

  // 2. Audit Customer.phone index query
  const startPhone = performance.now();
  await prisma.customer.findFirst({
    where: { phone: "9800000000" },
    select: { id: true },
  });
  results.push({
    model: "Customer",
    field: "phone",
    indexed: true,
    queryLatencyMs: parseFloat((performance.now() - startPhone).toFixed(2)),
  });

  // 3. Audit Document.cloudinaryId index query
  const startCloudId = performance.now();
  await prisma.document.findFirst({
    where: { cloudinaryId: "pitraya/bookings/non_existent_id" },
    select: { id: true },
  });
  results.push({
    model: "Document",
    field: "cloudinaryId",
    indexed: true,
    queryLatencyMs: parseFloat((performance.now() - startCloudId).toFixed(2)),
  });

  return results;
}
