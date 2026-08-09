/**
 * Returns the configured base site URL from environment variables.
 * Prioritizes `NEXT_PUBLIC_SITE_URL` followed by `NEXTAUTH_URL` and fallback `https://pitraya.com`.
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://pitraya.com";
  return url.replace(/\/$/, "");
}
