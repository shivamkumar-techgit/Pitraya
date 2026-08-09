"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <div
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-black/90 backdrop-blur-xl"
        data-lenis-prevent="true"
      >
        {/* TOP BAR WITH CLOSE BUTTON */}
        <div className="border-border-gold/20 sticky top-0 z-50 flex items-center justify-between border-b bg-black/80 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="bg-gold-primary h-2.5 w-2.5 animate-pulse rounded-full" />
            <span className="font-cinzel text-gold-primary text-xs font-bold tracking-widest uppercase">
              Pitraya Concierge Sanctuary
            </span>
          </div>
          <button
            onClick={onClose}
            className="bg-surface border-border-gold/30 text-text-muted hover:border-gold-primary font-cinzel flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold transition-all hover:text-white"
          >
            <span>Close Wizard</span>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* INNER WIZARD CONTENT */}
        <div className="flex-1">
          <BookingWizard initialPackageId={initialPackageId} />
        </div>
      </div>
    </AnimatePresence>
  );
}
