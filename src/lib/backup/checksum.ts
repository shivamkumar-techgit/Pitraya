import crypto from "crypto";

/**
 * Computes SHA-256 checksum hash for given data string or Buffer.
 */
export function generateSha256(data: string | Buffer): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Verifies that data matches the expected SHA-256 hash.
 */
export function verifySha256(data: string | Buffer, expectedHash: string): boolean {
  const actualHash = generateSha256(data);
  return actualHash.toLowerCase().trim() === expectedHash.toLowerCase().trim();
}
