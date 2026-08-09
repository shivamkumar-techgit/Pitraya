import { NextRequest, NextResponse } from "next/server";
import { uploadDocumentWithRollback } from "@/lib/storage/upload";
import { DocType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "Uploaded Document";
    const folder = (formData.get("folder") as string) || "pitraya/bookings";
    const docType = (formData.get("docType") as DocType) || "invoice";
    const bookingId = formData.get("bookingId") as string | undefined;

    if (!file) {
      return NextResponse.json(
        { success: false, code: "BAD_REQUEST", message: "No file provided in form upload." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const doc = await uploadDocumentWithRollback({
      buffer,
      title,
      fileName: file.name,
      originalName: file.name,
      mimeType: file.type || "application/pdf",
      folder,
      docType,
      bookingId,
      uploadedBy: "API_User",
    });

    return NextResponse.json({
      success: true,
      message: "Document uploaded successfully to Cloudinary.",
      document: doc,
    });
  } catch (err: unknown) {
    console.error("❌ Document Upload API Error:", err);
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json(
      { success: false, code: "UPLOAD_FAILED", message },
      { status: 400 }
    );
  }
}
