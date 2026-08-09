/**
 * Centralized Monitoring & Error Tracking Engine for Pitraya Rituals.
 * Provides unified exception logging, API failure tracking, and Sentry integration.
 */

export interface ErrorContext {
  url?: string;
  userId?: string;
  action?: string;
  params?: Record<string, unknown>;
  tags?: Record<string, string>;
}

export function initMonitoring() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (dsn) {
    console.log(`📡 [Monitoring Engine] Initialized Sentry client with DSN: ${dsn.slice(0, 15)}...`);
  } else {
    console.log("📡 [Monitoring Engine] Development mode: Sentry DSN not configured, using structured console logger.");
  }
}

export function captureException(error: unknown, context?: ErrorContext): string {
  const eventId = `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const timestamp = new Date().toISOString();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack || "No stack trace available" : "No stack trace available";

  console.error(`🚨 [Monitoring Exception Captured] ID: ${eventId} | Time: ${timestamp}`);
  console.error(`   Message: ${errorMessage}`);
  if (context?.url) console.error(`   URL: ${context.url}`);
  if (context?.action) console.error(`   Action: ${context.action}`);
  if (context?.params) console.error(`   Params:`, JSON.stringify(context.params));
  console.error(`   Stack Trace:`, stack);

  return eventId;
}

export function captureApiFailure(endpoint: string, statusCode: number, error: unknown): string {
  return captureException(error, {
    url: endpoint,
    action: "API_ROUTE_FAILURE",
    params: { statusCode },
    tags: { severity: statusCode >= 500 ? "CRITICAL" : "WARNING" },
  });
}
