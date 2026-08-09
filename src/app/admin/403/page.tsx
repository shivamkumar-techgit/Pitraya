"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  const generatedId = React.useId();
  const requestId = `req_${generatedId.replace(/[:]/g, "").substring(0, 5)}`;

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center bg-zinc-950 text-zinc-100">
      <div className="max-w-md w-full bg-zinc-900/90 border border-amber-500/20 rounded-2xl p-8 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-400 text-3xl font-bold">
          🔒
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-red-200 font-sans">
            Access Restricted
          </h1>
          <p className="text-sm text-zinc-400">
            You do not have permission to view or manage this administrative module.
          </p>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-500 font-mono flex items-center justify-between">
          <span>Reference ID:</span>
          <span className="text-amber-400 font-semibold">{requestId}</span>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-medium">
            <Link href="/admin">Return to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
