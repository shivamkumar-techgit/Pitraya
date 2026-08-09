import { NextResponse } from "next/server";
import path from "path";
import { readBackupFile } from "@/lib/backup/storage";
import { Permission } from "@/lib/auth/permissions";
import { verifyApiPermission, standardApiError } from "@/lib/auth/apiSecurity";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/backup/download?file=... or ?filename=...
 * Downloads selected backup ZIP archive.
 */
export async function GET(req: Request) {
  const auth = await verifyApiPermission(Permission.USER_MANAGE, req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const url = new URL(req.url);
    const rawFilename = url.searchParams.get("file") || url.searchParams.get("filename");

    if (!rawFilename) {
      return standardApiError("BAD_REQUEST", "Missing 'file' query parameter", 400, req);
    }

    // Sanitize filename against directory traversal attacks
    const safeFilename = path.basename(rawFilename).replace(/[^a-zA-Z0-9_\-\.]/g, "");
    if (!safeFilename || safeFilename.includes("..")) {
      return standardApiError("BAD_REQUEST", "Security Violation: Invalid filename path traversal detected", 400, req);
    }

    const fileBuffer = await readBackupFile(safeFilename);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Content-Length": fileBuffer.length.toString(),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("Download backup error:", err);
    return standardApiError("INTERNAL_ERROR", "Failed to download backup file", 500, req);
  }
}
