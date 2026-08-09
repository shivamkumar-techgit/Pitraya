import prisma from "@/lib/prisma";
import { defaultStorageProvider } from "./cloudinaryProvider";
import { StorageUploadOptions } from "./provider";
import { ValidationError } from "@/lib/errors/AppError";
import { DocType } from "@prisma/client";

const ALLOWED_MIME_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export interface UploadDocumentInput extends StorageUploadOptions {
  buffer: Buffer;
  bookingId?: string;
  docType?: DocType;
  title: string;
}

/**
 * Uploads a document to Cloudinary with MIME/Size validation,
 * then transactional database persistence.
 * If DB insertion fails, the uploaded asset is automatically deleted from Cloudinary.
 */
export async function uploadDocumentWithRollback(input: UploadDocumentInput) {
  // 1. Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(input.mimeType)) {
    throw new ValidationError(
      `Unsupported file MIME type '${input.mimeType}'. Allowed types: [${ALLOWED_MIME_TYPES.join(", ")}]`
    );
  }

  // 2. Validate File Size
  if (input.buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new ValidationError(
      `File size (${(input.buffer.length / (1024 * 1024)).toFixed(2)} MB) exceeds 10 MB maximum limit.`
    );
  }

  // 3. Upload to Cloudinary
  const uploadResult = await defaultStorageProvider.uploadBuffer(input.buffer, {
    folder: input.folder,
    fileName: input.fileName,
    originalName: input.originalName,
    mimeType: input.mimeType,
    uploadedBy: input.uploadedBy,
  });

  // 4. Save to Database with Rollback on Failure
  try {
    const documentRecord = await prisma.document.create({
      data: {
        bookingId: input.bookingId || null,
        docType: input.docType || "invoice",
        title: input.title,
        fileName: uploadResult.fileName,
        originalName: uploadResult.originalName,
        mimeType: uploadResult.mimeType,
        fileSize: uploadResult.fileSize,
        cloudinaryId: uploadResult.cloudinaryId,
        secureUrl: uploadResult.secureUrl,
        downloadUrl: uploadResult.secureUrl,
        folder: uploadResult.folder,
        uploadedBy: input.uploadedBy || "System",
      },
    });

    return documentRecord;
  } catch (dbError: unknown) {
    console.error("❌ Database insertion failed after Cloudinary upload. Rolling back Cloudinary asset...", dbError instanceof Error ? dbError.message : String(dbError));
    await defaultStorageProvider.deleteAsset(uploadResult.cloudinaryId);
    throw dbError;
  }
}
