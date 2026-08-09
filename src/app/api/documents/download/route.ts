import { NextRequest, NextResponse } from "next/server";
import { getSignedDownloadUrl } from "@/lib/storage/signedUrl";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) {
      return NextResponse.json(
        { success: false, code: "BAD_REQUEST", message: "Missing required parameter 'documentId'." },
        { status: 400 }
      );
    }

    // Generate 10-minute time-bound signed download URL
    const signedUrl = await getSignedDownloadUrl(documentId, 600);

    return NextResponse.json({
      success: true,
      documentId,
      signedUrl,
      expiresInSeconds: 600,
    });
  } catch (err: unknown) {
    console.error("❌ Document Download API Error:", err);
    const message = err instanceof Error ? err.message : "Failed to generate download URL.";
    return NextResponse.json(
      { success: false, code: "DOWNLOAD_FAILED", message },
      { status: 404 }
    );
  }
}
