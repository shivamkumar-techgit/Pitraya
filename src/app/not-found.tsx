"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center bg-zinc-950 text-zinc-100">
      <div className="max-w-md w-full bg-zinc-900/90 border border-amber-500/20 rounded-2xl p-8 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="text-6xl font-extrabold text-amber-500/30 tracking-widest font-mono">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-amber-100 font-sans">
            Sacred Sanctuary Page Not Found
          </h1>
          <p className="text-sm text-zinc-400">
            The page or booking record you are looking for does not exist or has been moved.
          </p>
        </div>

        {/* Quick Search Form */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Reservation ID or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-500 text-zinc-950">
            Search
          </Button>
        </form>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild variant="default" className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-medium">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Link href="/admin">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
