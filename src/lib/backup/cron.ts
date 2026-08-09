import { createFullBackup, BackupResult } from "./backup";

/**
 * Daily automated backup runner.
 * Can be scheduled via Vercel Cron, external crontabs, or internal timers.
 */
export async function runDailyBackup(): Promise<BackupResult> {
  console.log(`[Daily Backup Cron] Execution started at ${new Date().toISOString()}`);
  try {
    const result = await createFullBackup();
    console.log(`[Daily Backup Cron] Success: ${result.filename} (${result.sizeBytes} bytes)`);
    return result;
  } catch (err) {
    console.error("[Daily Backup Cron] Failed:", err);
    throw err;
  }
}
