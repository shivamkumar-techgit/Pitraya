import { captureException } from "./sentry";

export type AlertSeverity = "INFO" | "WARNING" | "CRITICAL";

export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  source: string;
  timestamp: string;
}

export async function sendProductionAlert(
  title: string,
  message: string,
  source: string = "System Core",
  severity: AlertSeverity = "CRITICAL"
): Promise<SystemAlert> {
  const alert: SystemAlert = {
    id: `alt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title,
    message,
    severity,
    source,
    timestamp: new Date().toISOString(),
  };

  console.error(`🚨 [PRODUCTION ALERT DISPATCH] Severity: ${alert.severity} | Source: ${alert.source}`);
  console.error(`   Title: "${alert.title}"`);
  console.error(`   Message: "${alert.message}"`);

  // Log exception event to monitoring
  captureException(new Error(`[ALERT: ${severity}] ${title} - ${message}`), {
    action: "PRODUCTION_ALERT",
    tags: { severity, source },
  });

  return alert;
}
