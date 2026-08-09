"use client";

import { useEffect } from "react";
import { captureException } from "@/lib/monitoring/sentry";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, { action: "GLOBAL_ROOT_CRASH" });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 flex min-h-screen items-center justify-center p-6 text-center">
        <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-red-500/20 p-8 shadow-2xl space-y-6">
          <div className="text-4xl">🚨</div>
          <h1 className="text-2xl font-bold text-red-400">Critical Application Failure</h1>
          <p className="text-sm text-slate-400">A catastrophic error occurred. Our engineering monitoring team has been notified.</p>
          <button
            onClick={() => reset()}
            className="w-full rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 transition-colors"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
