import JSZip from "jszip";
import prisma from "@/lib/prisma";
import { verifySha256 } from "./checksum";

export interface RestoreCounts {
  customers: number;
  packages: number;
  bookings: number;
  travels: number;
  hotels: number;
  vehicles: number;
  addons: number;
  pandits: number;
  coordinators: number;
  users: number;
  payments: number;
  activities: number;
  timelines: number;
  tasks: number;
  notes: number;
  documents: number;
  notifications: number;
  reviews: number;
}

export interface RestoreResult {
  success: boolean;
  message: string;
  restoredAt: string;
  counts: RestoreCounts;
}

const DEFAULT_RESTORED_PASSWORD_HASH = "$2a$10$UnusableDummyPasswordHashForRestoredUserNoPlaintextInBackup";

/**
 * Restores database from a backup ZIP archive Buffer in a transactional manner.
 */
export async function restoreFromBackup(zipBuffer: Buffer): Promise<RestoreResult> {
  console.log("🔄 Starting Database Restore from Backup ZIP...");

  const zip = await JSZip.loadAsync(zipBuffer);

  // Zip-Slip Security Protection: Prevent path traversal attacks inside uploaded archives
  for (const filename of Object.keys(zip.files)) {
    if (filename.includes("..") || filename.startsWith("/") || filename.startsWith("\\")) {
      throw new Error(`Zip-Slip Security Violation: Malicious path traversal detected in entry '${filename}'.`);
    }
  }

  const dataFile = zip.file("data.json");
  const checksumFile = zip.file("checksum.sha256");

  if (!dataFile) {
    throw new Error("Invalid backup archive: missing 'data.json'.");
  }

  const jsonString = await dataFile.async("string");

  // Verify SHA256 Checksum if checksum file is present
  if (checksumFile) {
    const expectedChecksum = (await checksumFile.async("string")).trim();
    const isValid = verifySha256(jsonString, expectedChecksum);
    if (!isValid) {
      throw new Error("Backup integrity check failed: SHA256 checksum mismatch.");
    }
  }

  const backupObj = JSON.parse(jsonString);
  const data = backupObj.data;

  if (!data || !data.bookings || !data.customers) {
    throw new Error("Invalid backup data format: missing required data entities.");
  }

  console.log("📥 Restoring 18 entity models in transactional dependency order...");

  const counts: RestoreCounts = {
    customers: 0,
    packages: 0,
    bookings: 0,
    travels: 0,
    hotels: 0,
    vehicles: 0,
    addons: 0,
    pandits: 0,
    coordinators: 0,
    users: 0,
    payments: 0,
    activities: 0,
    timelines: 0,
    tasks: 0,
    notes: 0,
    documents: 0,
    notifications: 0,
    reviews: 0,
  };

  // Perform transactional upserts for complete integrity
  await prisma.$transaction(
    async (tx) => {
      // 1. Packages
      for (const pkg of data.packages || []) {
        const { createdAt, ...pkgData } = pkg;
        await tx.package.upsert({
          where: { id: pkg.id },
          update: { ...pkgData, createdAt: createdAt ? new Date(createdAt) : undefined },
          create: { ...pkgData, createdAt: createdAt ? new Date(createdAt) : undefined },
        });
        counts.packages++;
      }

      // 2. Hotels
      for (const h of data.hotels || []) {
        await tx.hotel.upsert({
          where: { id: h.id },
          update: h,
          create: h,
        });
        counts.hotels++;
      }

      // 3. Vehicles
      for (const v of data.vehicles || []) {
        await tx.vehicle.upsert({
          where: { id: v.id },
          update: v,
          create: v,
        });
        counts.vehicles++;
      }

      // 4. Pandits
      for (const p of data.pandits || []) {
        await tx.pandit.upsert({
          where: { id: p.id },
          update: p,
          create: p,
        });
        counts.pandits++;
      }

      // 5. Coordinators
      for (const c of data.coordinators || []) {
        await tx.coordinator.upsert({
          where: { id: c.id },
          update: c,
          create: c,
        });
        counts.coordinators++;
      }

      // 6. Users
      for (const u of data.users || []) {
        const { createdAt, updatedAt, password, ...uData } = u;
        const existingUser = await tx.user.findUnique({ where: { id: u.id } });
        const userPassword = existingUser?.password || DEFAULT_RESTORED_PASSWORD_HASH;

        await tx.user.upsert({
          where: { id: u.id },
          update: {
            ...uData,
            updatedAt: updatedAt ? new Date(updatedAt) : undefined,
          },
          create: {
            ...uData,
            password: userPassword,
            createdAt: createdAt ? new Date(createdAt) : undefined,
            updatedAt: updatedAt ? new Date(updatedAt) : undefined,
          },
        });
        counts.users++;
      }

      // 7. Customers
      for (const cust of data.customers || []) {
        const { createdAt, ...cData } = cust;
        await tx.customer.upsert({
          where: { id: cust.id },
          update: cData,
          create: { ...cData, createdAt: createdAt ? new Date(createdAt) : undefined },
        });
        counts.customers++;
      }

      // 8. Bookings
      for (const b of data.bookings || []) {
        const { createdAt, updatedAt, ...bData } = b;
        await tx.booking.upsert({
          where: { id: b.id },
          update: bData,
          create: {
            ...bData,
            createdAt: createdAt ? new Date(createdAt) : undefined,
            updatedAt: updatedAt ? new Date(updatedAt) : undefined,
          },
        });
        counts.bookings++;
      }

      // 9. Travels
      for (const t of data.travels || []) {
        await tx.travel.upsert({
          where: { bookingId: t.bookingId },
          update: t,
          create: t,
        });
        counts.travels++;
      }

      // 10. Addons
      for (const a of data.addons || []) {
        await tx.addon.upsert({
          where: { id: a.id },
          update: a,
          create: a,
        });
        counts.addons++;
      }

      // 11. Payments
      for (const pay of data.payments || []) {
        const { issuedAt, paidAt, ...payData } = pay;
        await tx.payment.upsert({
          where: { id: pay.id },
          update: {
            ...payData,
            issuedAt: issuedAt ? new Date(issuedAt) : undefined,
            paidAt: paidAt ? new Date(paidAt) : null,
          },
          create: {
            ...payData,
            issuedAt: issuedAt ? new Date(issuedAt) : undefined,
            paidAt: paidAt ? new Date(paidAt) : null,
          },
        });
        counts.payments++;
      }

      // 12. Activities
      for (const act of data.activities || []) {
        await tx.activity.upsert({
          where: { id: act.id },
          update: act,
          create: act,
        });
        counts.activities++;
      }

      // 13. Timelines (BookingTimeline)
      for (const bt of data.timelines || []) {
        const { timestamp, ...btData } = bt;
        await tx.bookingTimeline.upsert({
          where: { id: bt.id },
          update: {
            ...btData,
            timestamp: timestamp ? new Date(timestamp) : undefined,
          },
          create: {
            ...btData,
            timestamp: timestamp ? new Date(timestamp) : undefined,
          },
        });
        counts.timelines++;
      }

      // 14. Tasks (BookingTask)
      for (const task of data.tasks || []) {
        const { completedAt, ...taskData } = task;
        await tx.bookingTask.upsert({
          where: { id: task.id },
          update: {
            ...taskData,
            completedAt: completedAt ? new Date(completedAt) : null,
          },
          create: {
            ...taskData,
            completedAt: completedAt ? new Date(completedAt) : null,
          },
        });
        counts.tasks++;
      }

      // 15. Notes (BookingNote)
      for (const note of data.notes || []) {
        const { createdAt, ...noteData } = note;
        await tx.bookingNote.upsert({
          where: { id: note.id },
          update: {
            ...noteData,
            createdAt: createdAt ? new Date(createdAt) : undefined,
          },
          create: {
            ...noteData,
            createdAt: createdAt ? new Date(createdAt) : undefined,
          },
        });
        counts.notes++;
      }

      // 16. Documents
      for (const d of data.documents || []) {
        const { generatedAt, ...dData } = d;
        await tx.document.upsert({
          where: { id: d.id },
          update: {
            ...dData,
            generatedAt: generatedAt ? new Date(generatedAt) : undefined,
          },
          create: {
            ...dData,
            generatedAt: generatedAt ? new Date(generatedAt) : undefined,
          },
        });
        counts.documents++;
      }

      // 17. Notifications
      for (const notif of data.notifications || []) {
        const { sentAt, ...notifData } = notif;
        await tx.notification.upsert({
          where: { id: notif.id },
          update: {
            ...notifData,
            sentAt: sentAt ? new Date(sentAt) : undefined,
          },
          create: {
            ...notifData,
            sentAt: sentAt ? new Date(sentAt) : undefined,
          },
        });
        counts.notifications++;
      }

      // 18. Reviews
      for (const r of data.reviews || []) {
        const { createdAt, ...rData } = r;
        await tx.review.upsert({
          where: { id: r.id },
          update: {
            ...rData,
            createdAt: createdAt ? new Date(createdAt) : undefined,
          },
          create: {
            ...rData,
            createdAt: createdAt ? new Date(createdAt) : undefined,
          },
        });
        counts.reviews++;
      }
    },
    { timeout: 60000 }
  );

  console.log("✨ Database Restore Completed Successfully with Transaction!");

  return {
    success: true,
    message: "Database successfully restored from backup ZIP archive.",
    restoredAt: new Date().toISOString(),
    counts,
  };
}
