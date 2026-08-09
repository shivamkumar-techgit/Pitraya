"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { captureException } from "@/lib/monitoring/sentry";

export default function AppErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, { action: "CLIENT_PAGE_CRASH", url: typeof window !== "undefined" ? window.location.href : undefined });
  }, [error]);

  const [requestId] = useState<string>(() => error.digest || `req_${Math.random().toString(36).substring(2, 7)}`);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center bg-zinc-950 text-zinc-100">
      <div className="max-w-lg w-full bg-zinc-900/90 border border-amber-500/20 rounded-2xl p-8 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 text-3xl">
          ⚠️
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-amber-100 font-sans">
            Something Went Wrong
          </h1>
          <p className="text-sm text-zinc-400">
            An unexpected error occurred while processing your request. Please try again or return to safety.
          </p>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-500 font-mono flex items-center justify-between">
          <span>Reference ID:</span>
          <span className="text-amber-400 font-semibold">{requestId}</span>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-medium px-5">
            Try Again
          </Button>
          <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="secondary" className="bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
            <Link href="/admin">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
