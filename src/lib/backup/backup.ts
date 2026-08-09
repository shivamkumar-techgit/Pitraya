import JSZip from "jszip";
import prisma from "@/lib/prisma";
import { generateSha256 } from "./checksum";
import { saveBackupFile } from "./storage";

export interface BackupMetrics {
  customersCount: number;
  packagesCount: number;
  bookingsCount: number;
  travelsCount: number;
  hotelsCount: number;
  vehiclesCount: number;
  addonsCount: number;
  panditsCount: number;
  paymentsCount: number;
  coordinatorsCount: number;
  activitiesCount: number;
  timelinesCount: number;
  tasksCount: number;
  notesCount: number;
  documentsCount: number;
  reviewsCount: number;
  notificationsCount: number;
  usersCount: number;
}

export interface BackupResult {
  filename: string;
  filePath: string;
  checksum: string;
  sizeBytes: number;
  createdAt: string;
  metrics: BackupMetrics;
}

/**
 * Generates a full database backup ZIP bundle containing JSON data and SHA256 checksum.
 */
export async function createFullBackup(): Promise<BackupResult> {
  console.log("📦 Starting Database Backup export...");

  // 1. Fetch all DB entities in parallel
  const [
    customers,
    packages,
    bookings,
    travels,
    hotels,
    vehicles,
    addons,
    pandits,
    payments,
    coordinators,
    activities,
    timelines,
    tasks,
    notes,
    documents,
    reviews,
    notifications,
    usersRaw,
  ] = await Promise.all([
    prisma.customer.findMany(),
    prisma.package.findMany(),
    prisma.booking.findMany(),
    prisma.travel.findMany(),
    prisma.hotel.findMany(),
    prisma.vehicle.findMany(),
    prisma.addon.findMany(),
    prisma.pandit.findMany(),
    prisma.payment.findMany(),
    prisma.coordinator.findMany(),
    prisma.activity.findMany(),
    prisma.bookingTimeline.findMany(),
    prisma.bookingTask.findMany(),
    prisma.bookingNote.findMany(),
    prisma.document.findMany(),
    prisma.review.findMany(),
    prisma.notification.findMany(),
    prisma.user.findMany(),
  ]);

  // Secret Filtering: Exclude sensitive credentials (password hashes) from User export
  const users = usersRaw.map(({ password, ...u }) => u);

  const metrics: BackupMetrics = {
    customersCount: customers.length,
    packagesCount: packages.length,
    bookingsCount: bookings.length,
    travelsCount: travels.length,
    hotelsCount: hotels.length,
    vehiclesCount: vehicles.length,
    addonsCount: addons.length,
    panditsCount: pandits.length,
    paymentsCount: payments.length,
    coordinatorsCount: coordinators.length,
    activitiesCount: activities.length,
    timelinesCount: timelines.length,
    tasksCount: tasks.length,
    notesCount: notes.length,
    documentsCount: documents.length,
    reviewsCount: reviews.length,
    notificationsCount: notifications.length,
    usersCount: users.length,
  };

  const backupData = {
    version: "1.0",
    generatedAt: new Date().toISOString(),
    metrics,
    data: {
      customers,
      packages,
      bookings,
      travels,
      hotels,
      vehicles,
      addons,
      pandits,
      payments,
      coordinators,
      activities,
      timelines,
      tasks,
      notes,
      documents,
      reviews,
      notifications,
      users,
    },
  };

  const jsonString = JSON.stringify(backupData, null, 2);
  const dataChecksum = generateSha256(jsonString);

  // 2. Compress into ZIP using JSZip
  const zip = new JSZip();
  zip.file("data.json", jsonString);
  zip.file("checksum.sha256", dataChecksum);
  zip.file(
    "metadata.json",
    JSON.stringify(
      {
        generatedAt: backupData.generatedAt,
        metrics,
        checksum: dataChecksum,
      },
      null,
      2
    )
  );

  const zipBuffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  const zipChecksum = generateSha256(zipBuffer);

  // Format date filename: pitraya-backup-YYYY-MM-DD-HHmmss.zip
  const now = new Date();
  const dateStr = now.toISOString().replace(/T/, "-").replace(/:/g, "").split(".")[0];
  const filename = `pitraya-backup-${dateStr}.zip`;

  // 3. Save to storage
  const filePath = await saveBackupFile(filename, zipBuffer);

  console.log(`✅ Backup created successfully: ${filename} (${zipBuffer.length} bytes)`);

  return {
    filename,
    filePath,
    checksum: zipChecksum,
    sizeBytes: zipBuffer.length,
    createdAt: backupData.generatedAt,
    metrics,
  };
}
