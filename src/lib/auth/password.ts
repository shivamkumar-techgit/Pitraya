import bcrypt from "bcryptjs";

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Hashes password using bcrypt with 12 work factor rounds.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Verifies password against bcrypt hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export interface PasswordPolicyResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Enforces strict enterprise password policy:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character (@$!%*?&#^()_-+=)
 */
export function validatePasswordPolicy(password: string): PasswordPolicyResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter (A-Z).");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter (a-z).");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number (0-9).");
  }
  if (!/[@$!%*?&#^()_\-+=\[\]{}|;:,.<>]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export type PasswordStrengthLevel = "Weak" | "Medium" | "Strong";

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  level: PasswordStrengthLevel;
  color: string;
  feedback: string;
}

/**
 * Calculates password strength rating for visual UI meters.
 */
export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return { score: 0, level: "Weak", color: "bg-neutral-700", feedback: "Enter password" };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return { score, level: "Weak", color: "bg-red-500", feedback: "Too weak - add length, numbers & symbols" };
  }
  if (score === 2 || score === 3) {
    return { score, level: "Medium", color: "bg-amber-500", feedback: "Medium strength - add more complexity" };
  }
  return { score, level: "Strong", color: "bg-emerald-500", feedback: "Strong & secure password" };
}
