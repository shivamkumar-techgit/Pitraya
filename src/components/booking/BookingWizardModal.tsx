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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex flex-col">
        {/* TOP BAR WITH CLOSE BUTTON */}
        <div className="sticky top-0 z-50 bg-black/80 border-b border-border-gold/20 px-6 py-4 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gold-primary animate-pulse" />
            <span className="text-xs font-bold font-cinzel text-gold-primary uppercase tracking-widest">
              Pitraya Concierge Sanctuary
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-surface border border-border-gold/30 text-xs font-bold text-text-muted hover:text-white hover:border-gold-primary transition-all cursor-pointer font-cinzel"
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
