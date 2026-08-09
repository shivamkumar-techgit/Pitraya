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
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 rounded-3xl bg-black/95 border border-gold-primary/40 p-5 shadow-2xl backdrop-blur-xl text-white space-y-4"
          >
            <div className="flex items-start justify-between border-b border-border-gold/20 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Senior Advisor Concierge
                </span>
                <h4 className="text-sm font-bold text-white font-cinzel">
                  Need Help Planning?
                </h4>
                <p className="text-xs text-text-muted">
                  Speak directly with our Gaya Pilgrimage Advisors.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close advisor popup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 hover:bg-[#25D366]/25 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-[#25D366] transition-colors">
                      WhatsApp Advisor
                    </p>
                    <p className="text-[11px] text-text-muted">Instant 1-on-1 Chat</p>
                  </div>
                </div>
                <span className="text-xs text-[#25D366] font-bold">Chat Now</span>
              </button>

              {/* Call Now Button */}
              <button
                onClick={handleCallClick}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-gold-primary/15 border border-gold-primary/40 hover:bg-gold-primary/25 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gold-gradient text-black flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-gold-primary transition-colors">
                      Call Senior Advisor
                    </p>
                    <p className="text-[11px] text-text-muted">Direct Phone Guidance</p>
                  </div>
                </div>
                <span className="text-xs text-gold-primary font-bold">Call Now</span>
              </button>
            </div>

            <div className="pt-1 text-center">
              <span className="text-[10px] text-text-muted italic">
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
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-gold-primary via-gold-secondary to-gold-primary text-black font-bold text-xs shadow-2xl border border-gold-primary/60 cursor-pointer transition-all hover:shadow-gold-glow"
        aria-label="Need Help? Talk to Ritual Advisor"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
        </span>
        <HelpCircle className="h-4 w-4 shrink-0" />
        <span className="font-cinzel tracking-wider font-extrabold uppercase">
          Need Help? Talk to Ritual Advisor
        </span>
      </motion.button>
    </div>
  );
}
