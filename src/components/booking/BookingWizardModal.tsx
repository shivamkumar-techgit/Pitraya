"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BookingWizard from "./BookingWizard";

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
}

export default function BookingWizardModal({
  isOpen,
  onClose,
  initialPackageId = "heritage-pilgrimage",
}: BookingWizardModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* ─── DARK TRANSLUCENT BACKDROP ──────────────────────────────── */}
      <motion.div
        key="booking-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[49] bg-[#0F0C08]/75 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* ─── COMPLETE SACRED IVORY BOOKING MODAL ────────────────────── */}
      <motion.div
        key="booking-modal"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background"
        data-lenis-prevent="true"
        role="dialog"
        aria-modal="true"
        aria-label="Sacred Pilgrimage Booking Wizard"
      >
        {/* ─── IVORY TOP BAR ──────────────────────────────────────────── */}
        <div className="border-border-gold/30 sticky top-0 z-50 flex items-center justify-between border-b bg-surface/95 px-6 py-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <span className="bg-gold-primary h-2 w-2 animate-pulse rounded-full" />
            <span className="font-cinzel text-gold-primary text-xs font-bold tracking-widest uppercase">
              Pitraya Concierge Sanctuary
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking wizard"
            className="border-border text-text-muted hover:border-gold-primary hover:text-text-primary font-cinzel flex cursor-pointer items-center gap-1.5 rounded-full border bg-background px-4 py-1.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
          >
            <span>Close Wizard</span>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ─── INNER WIZARD CONTENT ───────────────────────────────────── */}
        <div className="flex-1">
          <BookingWizard initialPackageId={initialPackageId} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
