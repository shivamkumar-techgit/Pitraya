"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppFloatingButton({
  phoneNumber = "918434457228",
  defaultMessage = "Namaste! I would like to inquire about Pinda Daan rituals & package bookings in Gaya with Pitraya.",
}: WhatsAppFloatingButtonProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(defaultMessage);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encoded}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="pointer-events-auto fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="border-gold-primary/30 text-text-primary relative hidden max-w-xs items-center gap-2 rounded-2xl border bg-black/90 p-3 pr-3.5 shadow-2xl backdrop-blur-md sm:flex"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="space-y-0.5 text-left">
              <p className="text-gold-primary font-cinzel text-xs font-bold">
                24x7 WhatsApp Concierge
              </p>
              <p className="text-text-muted text-[11px] leading-tight">
                Need instant help planning your Gaya pilgrimage?
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-text-muted hover:text-text-primary ml-1 cursor-pointer p-0.5 transition-colors"
              aria-label="Close tooltip"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating WhatsApp Button */}
      <motion.button
        onClick={handleOpenWhatsApp}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:bg-[#20ba5a] focus:outline-none sm:h-14 sm:w-14"
        aria-label="Chat with Pitraya Concierge on WhatsApp"
      >
        {/* Pulsing ring behind button */}
        <span className="pointer-events-none absolute -inset-1 animate-ping rounded-full bg-[#25D366] opacity-40" />

        {/* Official WhatsApp Icon */}
        <svg
          className="relative z-10 h-6 w-6 fill-current transition-transform group-hover:scale-110 sm:h-7 sm:w-7"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </motion.button>
    </div>
  );
}
