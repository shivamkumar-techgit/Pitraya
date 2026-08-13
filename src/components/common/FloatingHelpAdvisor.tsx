"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, HelpCircle, X, Sparkles } from "lucide-react";

export interface FloatingHelpAdvisorProps {
  phoneNumber?: string;
  whatsappNumber?: string;
}

export default function FloatingHelpAdvisor({
  phoneNumber = "+918434457228",
  whatsappNumber = "918434457228",
}: FloatingHelpAdvisorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Namaste! I would like to consult with a Pitraya Ritual Advisor regarding my ancestral Gaya Pinda Daan pilgrimage."
    );
    window.open(
      `https://wa.me/${whatsappNumber}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <div className="pointer-events-auto fixed right-4 bottom-4 z-40 flex flex-col items-end sm:right-6 sm:bottom-6">
      {/* Expanded Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="border-gold-primary/40 mb-3 w-72 space-y-4 rounded-3xl border bg-black/95 p-5 text-white shadow-2xl backdrop-blur-xl sm:w-80"
          >
            <div className="border-border-gold/20 flex items-start justify-between border-b pb-3">
              <div className="space-y-0.5">
                <span className="text-gold-primary font-cinzel flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase">
                  <Sparkles className="h-3 w-3" /> Senior Advisor Concierge
                </span>
                <h4 className="font-cinzel text-sm font-bold text-white">
                  Need Help Planning?
                </h4>
                <p className="text-text-muted text-xs">
                  Speak directly with our Gaya Pilgrimage Advisors.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted rounded-full p-1 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close advisor popup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#25D366]/40 bg-[#25D366]/15 p-3 text-left transition-all hover:bg-[#25D366]/25"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white transition-colors group-hover:text-[#25D366]">
                      WhatsApp Advisor
                    </p>
                    <p className="text-text-muted text-[11px]">
                      Instant 1-on-1 Chat
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#25D366]">
                  Chat Now
                </span>
              </button>

              {/* Call Now Button */}
              <button
                onClick={handleCallClick}
                className="bg-gold-primary/15 border-gold-primary/40 hover:bg-gold-primary/25 group flex w-full cursor-pointer items-center justify-between rounded-2xl border p-3 text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gold-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-black shadow-md">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="group-hover:text-gold-primary text-xs font-bold text-white transition-colors">
                      Call Senior Advisor
                    </p>
                    <p className="text-text-muted text-[11px]">
                      Direct Phone Guidance
                    </p>
                  </div>
                </div>
                <span className="text-gold-primary text-xs font-bold">
                  Call Now
                </span>
              </button>
            </div>

            <div className="pt-1 text-center">
              <span className="text-text-muted text-[10px] italic">
                ✓ Specially tailored for elderly pilgrims & joint families.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="from-gold-primary via-gold-secondary to-gold-primary border-gold-primary/60 hover:shadow-gold-glow flex cursor-pointer items-center gap-2 rounded-full border bg-gradient-to-r px-3.5 py-3 text-xs font-bold text-black shadow-2xl transition-all sm:gap-3 sm:px-5 sm:py-3.5"
        aria-label="Need Help? Talk to Ritual Advisor"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-black"></span>
        </span>
        <HelpCircle className="h-4 w-4 shrink-0" />
        <span className="font-cinzel hidden font-extrabold tracking-wider uppercase sm:inline">
          Need Help? Talk to Ritual Advisor
        </span>
        <span className="font-cinzel font-extrabold tracking-wider uppercase sm:hidden">
          Advisor
        </span>
      </motion.button>
    </div>
  );
}
