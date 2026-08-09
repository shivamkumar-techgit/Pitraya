import prisma from "@/lib/prisma";
import { defaultStorageProvider } from "./cloudinaryProvider";
import { NotFoundError } from "@/lib/errors/AppError";

/**
 * Soft deletes a document by setting deletedAt timestamp.
 * Gives immediate recovery capability prior to nightly orphan cleanup.
 */
export async function softDeleteDocument(documentId: string): Promise<Awaited<ReturnType<typeof prisma.document.update>>> {
  const doc = await prisma.document.findUnique({ where: { id: documentId } });
  if (!doc) throw new NotFoundError(`Document with ID '${documentId}' not found.`);

  return prisma.document.update({
    where: { id: documentId },
    data: { deletedAt: new Date() },
  });
}

/**
 * Permanently deletes a document from both PostgreSQL database and Cloudinary storage.
 */
export async function permanentlyDeleteDocument(documentId: string): Promise<boolean> {
  const doc = await prisma.document.findUnique({ where: { id: documentId } });
  if (!doc) throw new NotFoundError(`Document with ID '${documentId}' not found.`);

  if (doc.cloudinaryId) {
    await defaultStorageProvider.deleteAsset(doc.cloudinaryId);
  }

  await prisma.document.delete({ where: { id: documentId } });
  return true;
}
