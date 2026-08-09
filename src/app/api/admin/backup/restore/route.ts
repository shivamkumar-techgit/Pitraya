import { NextResponse } from "next/server";
import { restoreFromBackup } from "@/lib/backup/restore";
import { readBackupFile } from "@/lib/backup/storage";
import { Permission } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiSuccess, standardApiError } from "@/lib/auth/apiSecurity";

export const dynamic = "force-dynamic";

const MAX_BACKUP_UPLOAD_BYTES = 50 * 1024 * 1024; // 50MB Upload Limit

/**
 * POST /api/admin/backup/restore
 * Restores database from uploaded ZIP archive or existing backup filename.
 */
export async function POST(req: Request) {
  const auth = await verifyApiPermission(Permission.USER_MANAGE, req); // SuperAdmin privilege
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    let zipBuffer: Buffer | null = null;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return standardApiError("BAD_REQUEST", "No backup file uploaded", 400, req);
      }

      // Check 50MB upload limit
      if (file.size > MAX_BACKUP_UPLOAD_BYTES) {
        return standardApiError("PAYLOAD_TOO_LARGE", "Backup file exceeds maximum allowed limit of 50MB.", 413, req);
      }

      const arrayBuffer = await file.arrayBuffer();
      zipBuffer = Buffer.from(arrayBuffer);
    } else {
      const body = await req.json();
      if (body.filename) {
        // Sanitize filename against directory traversal
        const safeFilename = body.filename.replace(/[^a-zA-Z0-9_\-\.]/g, "");
        zipBuffer = await readBackupFile(safeFilename);
      }
    }

    if (!zipBuffer) {
      return standardApiError("BAD_REQUEST", "Please provide a backup file upload or valid filename parameter", 400, req);
    }

    const restoreResult = await restoreFromBackup(zipBuffer);

    return standardApiSuccess({ result: restoreResult }, req);
  } catch (err: unknown) {
    console.error("Restore backup error:", err);
    const message = err instanceof Error ? err.message : "Failed to restore database from backup";
    const isZipSlip = message.includes("Zip-Slip");
    return standardApiError(
      isZipSlip ? "ZIP_SLIP_DETECTED" : "INTERNAL_ERROR",
      message,
      isZipSlip ? 400 : 500,
      req
    );
  }
}
