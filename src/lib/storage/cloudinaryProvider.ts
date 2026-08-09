import cloudinary from "@/lib/cloudinary";
import { StorageProvider, StorageUploadOptions, StorageUploadResult } from "./provider";

export class CloudinaryStorageProvider implements StorageProvider {
  async uploadBuffer(buffer: Buffer, options: StorageUploadOptions): Promise<StorageUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder,
          public_id: options.fileName.replace(/\.[^/.]+$/, ""),
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload failed with empty result."));
          }
          resolve({
            cloudinaryId: result.public_id,
            secureUrl: result.secure_url,
            folder: options.folder,
            fileName: options.fileName,
            originalName: options.originalName,
            mimeType: options.mimeType,
            fileSize: result.bytes || buffer.length,
          });
        }
      );

      uploadStream.end(buffer);
    });
  }

  async deleteAsset(publicId: string): Promise<boolean> {
    try {
      const res = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
      if (res.result === "ok") return true;
      // Try image resource type if raw fallback returns not found
      const imgRes = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      return imgRes.result === "ok";
    } catch (err: unknown) {
      console.warn(`[CloudinaryProvider] Delete failed for '${publicId}':`, err instanceof Error ? err.message : String(err));
      return false;
    }
  }

  generateSignedUrl(publicId: string, expiresInSeconds: number = 600): string {
    const timestamp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    return cloudinary.url(publicId, {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "muskr8qq",
      sign_url: true,
      type: "authenticated",
      to_type: "upload",
      expires_at: timestamp,
      secure: true,
    });
  }
}

export const defaultStorageProvider: StorageProvider = new CloudinaryStorageProvider();
