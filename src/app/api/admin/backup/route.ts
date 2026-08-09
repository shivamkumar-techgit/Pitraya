import { NextResponse } from "next/server";
import { createFullBackup } from "@/lib/backup/backup";
import { listBackupFiles } from "@/lib/backup/storage";
import { Permission } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiSuccess, standardApiError } from "@/lib/auth/apiSecurity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/admin/backup
 * Lists all existing backup files in storage/backups/.
 */
export async function GET(req: Request) {
  const auth = await verifyApiPermission(Permission.USER_MANAGE, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const files = await listBackupFiles();
    return standardApiSuccess(
      {
        totalBackups: files.length,
        backups: files,
      },
      req
    );
  } catch (err) {
    console.error("Error listing backups:", err);
    return standardApiError("INTERNAL_ERROR", "Failed to list backup files", 500, req);
  }
}

/**
 * POST /api/admin/backup
 * Triggers instant full database backup export to ZIP with SHA256 checksum.
 */
export async function POST(req: Request) {
  const auth = await verifyApiPermission(Permission.USER_MANAGE, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const result = await createFullBackup();
    return standardApiSuccess(
      {
        message: "Backup created successfully",
        backup: result,
      },
      req
    );
  } catch (err) {
    console.error("Error creating backup:", err);
    return standardApiError("INTERNAL_ERROR", "Failed to create backup", 500, req);
  }
}
