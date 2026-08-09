import { NextResponse } from "next/server";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

class ApiCacheEngine {
  private memoryCache = new Map<string, CacheEntry<unknown>>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.memoryCache.get(key);
    if (!entry) return null;

    // Check TTL expiration
    if (Date.now() - entry.timestamp > entry.ttlMs) {
      this.memoryCache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  async set<T>(key: string, data: T, ttlSeconds: number = 60): Promise<void> {
    this.memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttlMs: ttlSeconds * 1000,
    });
  }

  async clear(): Promise<void> {
    this.memoryCache.clear();
  }

  applyCacheHeaders(response: NextResponse, maxAgeSeconds: number = 60, swrSeconds: number = 86400): NextResponse {
    response.headers.set("Cache-Control", `public, max-age=${maxAgeSeconds}, s-maxage=3600, stale-while-revalidate=${swrSeconds}`);
    return response;
  }
}

export const apiCache = new ApiCacheEngine();
