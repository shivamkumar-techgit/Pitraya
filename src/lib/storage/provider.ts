export interface StorageUploadOptions {
  folder: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  uploadedBy?: string;
}

export interface StorageUploadResult {
  cloudinaryId: string; // public_id
  secureUrl: string;
  folder: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
}

export interface StorageProvider {
  uploadBuffer(buffer: Buffer, options: StorageUploadOptions): Promise<StorageUploadResult>;
  deleteAsset(publicId: string): Promise<boolean>;
  generateSignedUrl(publicId: string, expiresInSeconds?: number): string;
}
