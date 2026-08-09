"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { MessageCircle, Phone, X, Headset } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingContactProps extends React.HTMLAttributes<HTMLDivElement> {
  whatsappNumber?: string;
  callNumber?: string;
  whatsappMessage?: string;
  threshold?: number;
}

export default function FloatingContact({
  whatsappNumber = "918434457228",
  callNumber = "+91 84344 57228",
  whatsappMessage = "Namaste! I would like to inquire about Pinda Daan rituals in Gaya.",
  threshold = 300,
  className,
  ...props
}: FloatingContactProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank", "noopener");
  };

  const handleCall = () => {
    window.open(`tel:${callNumber.replace(/\s/g, "")}`, "_self");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={cn("fixed bottom-20 left-4 md:left-6 z-40 flex flex-col items-start gap-2", className)}
          {...props as unknown as HTMLMotionProps<"div">}
        >
          {/* Expanded action buttons */}
          <AnimatePresence>
            {expanded && (
              <>
                {/* WhatsApp */}
                <motion.button
                  key="wa"
                  initial={{ opacity: 0, y: 12, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ delay: 0.05 }}
                  onClick={handleWhatsApp}
                  aria-label="Chat on WhatsApp"
                  className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>WhatsApp</span>
                </motion.button>

                {/* Call */}
                <motion.button
                  key="call"
                  initial={{ opacity: 0, y: 12, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ delay: 0.0 }}
                  onClick={handleCall}
                  aria-label="Call us"
                  className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full bg-gold-primary text-black text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>Call Now</span>
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            onClick={() => setExpanded((p) => !p)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={expanded ? "Close contact options" : "Open contact options"}
            aria-expanded={expanded}
            className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-md border border-border-gold/40 text-gold-primary flex items-center justify-center shadow-lg hover:border-gold-primary transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-primary"
          >
            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="h" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Headset className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
