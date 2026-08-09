import crypto from "crypto";

export interface GeneratedToken {
  rawToken: string;
  tokenHash: string;
}

/**
 * Generates a 32-byte cryptographically secure raw token and its SHA-256 hash.
 * Raw token is sent in email reset link; tokenHash is stored in database.
 */
export function generateResetToken(): GeneratedToken {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  return { rawToken, tokenHash };
}

/**
 * Computes SHA-256 hash string for a raw token.
 */
export function hashToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}
