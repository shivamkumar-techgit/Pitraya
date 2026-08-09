import { NextRequest, NextResponse } from "next/server";
import { softDeleteDocument } from "@/lib/storage/delete";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) {
      return NextResponse.json(
        { success: false, code: "BAD_REQUEST", message: "Missing required parameter 'documentId'." },
        { status: 400 }
      );
    }

    const doc = await softDeleteDocument(documentId);

    return NextResponse.json({
      success: true,
      message: "Document soft deleted successfully. It will be purged in nightly cleanup.",
      document: doc,
    });
  } catch (err: unknown) {
    console.error("❌ Document Delete API Error:", err);
    const message = err instanceof Error ? err.message : "Failed to delete document.";
    return NextResponse.json(
      { success: false, code: "DELETE_FAILED", message },
      { status: 400 }
    );
  }
}
