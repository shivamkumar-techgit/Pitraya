import { standardApiError } from "./apiSecurity";
import { NextResponse } from "next/server";

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < 60 * 60 * 1000);
    if (record.timestamps.length === 0) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

// Endpoint-specific Rate Limit Presets
export class RATE_LIMIT_PRESETS {
  static readonly LOGIN: RateLimitOptions = { windowMs: 60 * 1000, maxRequests: 5 }; // 5 / min
  static readonly FORGOT_PASS: RateLimitOptions = { windowMs: 60 * 60 * 1000, maxRequests: 3 }; // 3 / hr
  static readonly BOOKING_SUBMIT: RateLimitOptions = { windowMs: 60 * 1000, maxRequests: 10 }; // 10 / min
  static readonly PAYMENT_CREATE: RateLimitOptions = { windowMs: 60 * 60 * 1000, maxRequests: 20 }; // 20 / hr
  static readonly DEFAULT: RateLimitOptions = { windowMs: 60 * 1000, maxRequests: 60 }; // 60 / min
}

/**
 * In-memory sliding window rate limiter helper.
 */
export function checkRateLimit(identifier: string, options: RateLimitOptions = RATE_LIMIT_PRESETS.DEFAULT): RateLimitResult {
  const windowMs = options.windowMs || 60 * 1000;
  const maxRequests = options.maxRequests || 60;
  const now = Date.now();

  const record = rateLimitMap.get(identifier) || { timestamps: [] };
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const resetSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetSeconds,
    };
  }

  record.timestamps.push(now);
  rateLimitMap.set(identifier, record);

  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}

/**
 * Helper to extract client IP address from Request headers.
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "127.0.0.1"
  );
}

/**
 * Helper to enforce rate limit and return 429 Too Many Requests response automatically.
 */
export function enforceRateLimit(
  req: Request,
  prefix: string,
  options: RateLimitOptions = RATE_LIMIT_PRESETS.DEFAULT
): NextResponse | null {
  const ip = getClientIp(req);
  const result = checkRateLimit(`${prefix}_${ip}`, options);
  if (!result.allowed) {
    return standardApiError(
      "RATE_LIMITED",
      `Too many requests. Please try again after ${result.resetSeconds} seconds.`,
      429,
      req
    );
  }
  return null;
}
