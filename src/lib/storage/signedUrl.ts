import prisma from "@/lib/prisma";
import { defaultStorageProvider } from "./cloudinaryProvider";
import { NotFoundError } from "@/lib/errors/AppError";

/**
 * Generates a dynamic, time-bound signed download URL for a document.
 * Never stores signed URLs in the database.
 */
export async function getSignedDownloadUrl(documentId: string, expiresInSeconds: number = 600): Promise<string> {
  const doc = await prisma.document.findFirst({
    where: { id: documentId, deletedAt: null },
  });

  if (!doc) {
    throw new NotFoundError(`Active document with ID '${documentId}' not found.`);
  }

  if (!doc.cloudinaryId) {
    return doc.secureUrl || doc.downloadUrl;
  }

  return defaultStorageProvider.generateSignedUrl(doc.cloudinaryId, expiresInSeconds);
}
