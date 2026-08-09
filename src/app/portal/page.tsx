"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, User, Hotel, ShieldCheck, CheckCircle2, Clock, Phone, AlertCircle } from "lucide-react";

interface PortalTimelineItem {
  id?: string;
  title?: string;
  description?: string;
  createdAt?: string;
}

interface PortalPandit {
  name: string;
}

interface PortalHotel {
  name: string;
}

interface PortalBookingData {
  reservationId: string;
  status: string;
  customerName?: string;
  customerPhone?: string;
  packageTitle?: string;
  duration?: string;
  grandTotal?: number;
  timeline?: PortalTimelineItem[];
  pandits?: PortalPandit[];
  hotels?: PortalHotel[];
}

export default function DevoteePortalPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<PortalBookingData | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setBookingData(null);

    try {
      const res = await fetch(`/api/portal/lookup?query=${encodeURIComponent(query.trim())}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message || "No booking found.");
      } else {
        setBookingData(json.data);
      }
    } catch (err: unknown) {
      setError("Unable to connect to service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-text-primary px-4 py-8 md:px-8 md:py-12 lg:px-12 max-w-7xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-gold/10 text-accent-gold text-xs md:text-sm font-medium mb-4 border border-accent-gold/20">
          <ShieldCheck className="w-4 h-4" /> Pitraya Rituals Devotee Service Portal
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-3">
          Track Your Sacred Pind Daan Journey
        </h1>
        <p className="text-text-secondary text-sm md:text-base">
          Enter your Reservation ID (e.g., PTR-20260802-FC5683) or Phone Number to access your itinerary, pandit allocations, and live updates.
        </p>
      </motion.div>

      {/* Search Input Card */}
      <motion.form
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleLookup}
        className="max-w-2xl mx-auto mb-12"
      >
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-text-secondary pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Reservation ID (PTR-...) or Mobile Number"
            aria-label="Reservation ID or Mobile Number"
            className="w-full pl-12 pr-32 py-4 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold text-sm md:text-base shadow-sm transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-6 py-2.5 rounded-lg bg-accent-gold hover:bg-accent-gold/90 text-black font-semibold text-sm transition-all focus-visible:ring-2 focus-visible:ring-accent-gold disabled:opacity-50 shadow-sm"
          >
            {loading ? "Searching..." : "Track Status"}
          </button>
        </div>
      </motion.form>

      {/* Error Feedback */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Details Display */}
      {bookingData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="glass-panel p-6 rounded-2xl border border-border bg-surface/50 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-gold">Reservation ID</span>
                  <h2 className="text-2xl font-bold font-mono text-text-primary">{bookingData.reservationId}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {bookingData.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-surface border border-border/50">
                  <div className="flex items-center gap-2 text-text-secondary text-xs mb-1">
                    <User className="w-4 h-4 text-accent-gold" /> Primary Devotee
                  </div>
                  <div className="font-semibold text-text-primary text-sm">{bookingData.customerName}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{bookingData.customerPhone}</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border/50">
                  <div className="flex items-center gap-2 text-text-secondary text-xs mb-1">
                    <Calendar className="w-4 h-4 text-accent-gold" /> Selected Package
                  </div>
                  <div className="font-semibold text-text-primary text-sm">{bookingData.packageTitle}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{bookingData.duration}</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border/50">
                  <div className="flex items-center gap-2 text-text-secondary text-xs mb-1">
                    <Clock className="w-4 h-4 text-accent-gold" /> Grand Total
                  </div>
                  <div className="font-bold text-accent-gold text-base">₹{(bookingData.grandTotal ?? 0).toLocaleString("en-IN")}</div>
                  <div className="text-xs text-emerald-400 mt-0.5">Verified Invoice</div>
                </div>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="glass-panel p-6 rounded-2xl border border-border bg-surface/50 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-gold" /> Journey Timeline & Milestones
              </h3>
              <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
                {bookingData.timeline && bookingData.timeline.length > 0 ? (
                   bookingData.timeline.map((item: PortalTimelineItem, idx: number) => (
                    <div key={item.id || idx} className="relative pl-8">
                      <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent-gold ring-4 ring-background" />
                      <div className="text-sm font-semibold text-text-primary">{item.title}</div>
                      <div className="text-xs text-text-secondary mt-0.5">{item.description}</div>
                      <div className="text-[11px] text-text-secondary/70 mt-1">{new Date(item.createdAt ?? "").toLocaleString("en-IN")}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-text-secondary pl-8">Timeline milestones will be updated as your journey progresses.</div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pandit & Accommodation */}
            <div className="glass-panel p-6 rounded-2xl border border-border bg-surface/50 shadow-sm">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Hotel className="w-4 h-4 text-accent-gold" /> Allocations & Services
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-surface border border-border/50">
                  <div className="text-xs text-text-secondary">Assigned Pandits</div>
                  <div className="text-sm font-semibold text-text-primary mt-1">
                    {bookingData.pandits && bookingData.pandits.length > 0 ? bookingData.pandits.map((p: PortalPandit) => p.name).join(", ") : "Allocated on arrival"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border/50">
                  <div className="text-xs text-text-secondary">Hotel Accommodation</div>
                  <div className="text-sm font-semibold text-text-primary mt-1">
                    {bookingData.hotels && bookingData.hotels.length > 0 ? bookingData.hotels.map((h: PortalHotel) => h.name).join(", ") : "Standard Deluxe Suite"}
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="p-6 rounded-2xl bg-accent-gold/10 border border-accent-gold/20 text-center">
              <Phone className="w-6 h-6 text-accent-gold mx-auto mb-2" />
              <h4 className="font-semibold text-sm text-text-primary mb-1">Need Immediate Support?</h4>
              <p className="text-xs text-text-secondary mb-3">Our 24/7 Gaya Helpline Coordinators are ready to assist you.</p>
              <a
                href="tel:+919800000000"
                className="inline-block w-full py-2.5 rounded-lg bg-accent-gold hover:bg-accent-gold/90 text-black font-semibold text-xs transition-all"
              >
                Call Helpline (+91 98000 00000)
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
