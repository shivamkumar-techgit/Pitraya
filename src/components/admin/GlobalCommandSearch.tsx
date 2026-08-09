"use client";

import React, { useState, useEffect } from "react";
import { Search, Command, X, Calendar, User } from "lucide-react";
import Link from "next/link";

export default function GlobalCommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<{ bookings: any[]; customers: any[] }>({ bookings: [], customers: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) {
      const resetTimer = setTimeout(() => setResults({ bookings: [], customers: [] }), 0);
      return () => clearTimeout(resetTimer);
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
      >
        <Search className="h-3.5 w-3.5 text-slate-400" />
        <span>Quick Search...</span>
        <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search className="h-4 w-4 text-slate-400 mr-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reservation ID, customer name, phone..."
            className="w-full bg-transparent py-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {loading && <p className="text-xs text-slate-500 text-center py-4">Searching database...</p>}

          {!loading && results.bookings.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Bookings</h4>
              <div className="space-y-1">
                {results.bookings.map((b) => (
                  <Link
                    key={b.id}
                    href={`/admin/bookings/${b.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-sm text-slate-200 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span className="font-mono text-amber-400">{b.reservationId}</span>
                      <span className="text-slate-400">({b.customer?.name || "Guest"})</span>
                    </div>
                    <span className="text-xs uppercase font-semibold text-slate-500">{b.status}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!loading && results.customers.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Customers</h4>
              <div className="space-y-1">
                {results.customers.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 text-sm text-slate-200"
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="font-semibold">{c.name}</span>
                    </div>
                    <span className="text-xs text-slate-400">{c.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && query.length >= 2 && results.bookings.length === 0 && results.customers.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-6">No matching bookings or customers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
