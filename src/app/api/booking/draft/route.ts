import { NextResponse } from "next/server";
import { BookingSessionState } from "@/types/booking";
import { standardApiSuccess, standardApiError } from "@/lib/auth/apiSecurity";
import { enforceRateLimit, RATE_LIMIT_PRESETS } from "@/lib/auth/rateLimit";

// Server-side draft storage cache for active sessions
const draftStore = new Map<string, BookingSessionState>();

export async function POST(req: Request) {
  const rateLimitError = enforceRateLimit(req, "booking_draft", RATE_LIMIT_PRESETS.BOOKING_SUBMIT);
  if (rateLimitError) return rateLimitError;

  try {
    const body: BookingSessionState = await req.json();

    if (!body || !body.sessionId) {
      return standardApiError("BAD_REQUEST", "Invalid draft payload. 'sessionId' is required.", 400, req);
    }

    const updatedSession: BookingSessionState = {
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    draftStore.set(body.sessionId, updatedSession);

    return standardApiSuccess(
      {
        sessionId: body.sessionId,
        status: updatedSession.status,
        savedAt: updatedSession.lastUpdated,
      },
      req
    );
  } catch (error) {
    console.error("Draft save error:", error);
    return standardApiError("INTERNAL_ERROR", "Failed to save booking draft session.", 500, req);
  }
}

export async function GET(req: Request) {
  const rateLimitError = enforceRateLimit(req, "booking_draft_get", RATE_LIMIT_PRESETS.DEFAULT);
  if (rateLimitError) return rateLimitError;

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId") || searchParams.get("id");

  if (!sessionId) {
    return standardApiError("BAD_REQUEST", "Query parameter 'sessionId' is required.", 400, req);
  }

  const existingDraft = draftStore.get(sessionId);

  if (!existingDraft) {
    return standardApiError("NOT_FOUND", "Booking draft session not found.", 404, req);
  }

  return standardApiSuccess({ draft: existingDraft }, req);
}
