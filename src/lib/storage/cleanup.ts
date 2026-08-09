import prisma from "@/lib/prisma";
import { defaultStorageProvider } from "./cloudinaryProvider";

/**
 * Nightly / Periodic Orphan Cleaner.
 * Purges soft-deleted documents (`deletedAt !== null`) and unreferenced assets.
 */
export async function runOrphanCleaner(): Promise<{ purgedCount: number; errors: number }> {
  console.log("🧹 [Orphan Cleaner] Starting scheduled Cloudinary asset cleanup...");

  const softDeletedDocs = await prisma.document.findMany({
    where: { deletedAt: { not: null } },
  });

  let purgedCount = 0;
  let errors = 0;

  for (const doc of softDeletedDocs) {
    try {
      if (doc.cloudinaryId) {
        await defaultStorageProvider.deleteAsset(doc.cloudinaryId);
      }
      await prisma.document.delete({ where: { id: doc.id } });
      purgedCount++;
    } catch (err: unknown) {
      console.error(`❌ Failed to purge document '${doc.id}':`, err instanceof Error ? err.message : String(err));
      errors++;
    }
  }

  console.log(`✅ [Orphan Cleaner] Completed! Purged: ${purgedCount}, Errors: ${errors}`);
  return { purgedCount, errors };
}
