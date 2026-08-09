import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { getRequestId } from "@/lib/auth/apiSecurity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const requestId = getRequestId(req);
  const timestamp = new Date().toISOString();

  let dbHealthy = false;
  let storageHealthy = false;

  // 1. Check Neon PostgreSQL Database Connectivity
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbHealthy = true;
  } catch (err) {
    console.error("Health Check Database Ping Failed:", err);
  }

  // 2. Check Storage Directory Access
  try {
    const storageDir = path.join(process.cwd(), "storage", "backups");
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    storageHealthy = true;
  } catch (err) {
    console.error("Health Check Storage Check Failed:", err);
  }

  const isHealthy = dbHealthy && storageHealthy;
  const status = isHealthy ? 200 : 503;

  return NextResponse.json(
    {
      status: isHealthy ? "ok" : "degraded",
      timestamp,
      requestId,
      checks: {
        database: dbHealthy ? "healthy" : "unreachable",
        storage: storageHealthy ? "healthy" : "read_only",
      },
    },
    {
      status,
      headers: {
        "X-Request-ID": requestId,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
