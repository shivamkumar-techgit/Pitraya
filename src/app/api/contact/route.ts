import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required").max(20),
  subject: z.string().max(200).optional().default(""),
  inquiryType: z.string().min(1),
  message: z.string().min(10, "Message too short").max(2000),
  preferredContact: z.enum(["whatsapp", "call", "email"]).default("whatsapp"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    // Log to console in dev; in production wire to email/CRM
    if (process.env.NODE_ENV !== "production") {
      console.log("[Contact Form Submission]", {
        name: data.name,
        email: data.email,
        inquiryType: data.inquiryType,
        preferredContact: data.preferredContact,
        message: data.message.slice(0, 80) + "...",
      });
    }

    // TODO: In production, wire to:
    // 1. Email via Nodemailer / Resend / SendGrid
    // 2. CRM (HubSpot, Notion DB, Airtable)
    // 3. WhatsApp Business API notification

    return NextResponse.json(
      {
        success: true,
        message: "Contact form received. We will respond within 4 hours.",
        reference: `PIR-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      const issues = err.issues.map((issue) => ({
        field: issue.path.join(".") || "form",
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, message: "Please review the highlighted fields and try again.", errors: issues },
        { status: 400 }
      );
    }
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
