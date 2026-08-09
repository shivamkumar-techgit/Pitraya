"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Sparkles, Calendar, Layers } from "lucide-react";
import MagneticButton from "@/components/buttons/MagneticButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { cn } from "@/lib/utils";

export interface FloatingCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  threshold?: number;
  text?: string;
  onClick?: () => void;
}

export default function FloatingCTA({
  threshold = 400,
  text = "Book Ritual",
  onClick,
  className,
  ...props
}: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const ctaEl = document.getElementById("journey") || document.getElementById("cta");
      if (ctaEl) {
        ctaEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={cn("fixed bottom-24 right-6 md:right-10 z-40 hidden sm:flex items-center gap-3", className)}
          {...props as unknown as HTMLMotionProps<"div">}
        >
          {/* Primary Action: Book Ritual */}
          <Link href="/packages">
            <MagneticButton
              size="md"
              variant="primary"
              leftIcon={<Calendar className="h-4 w-4" />}
              className="shadow-gold-glow flex items-center gap-2 border border-gold-primary/30"
            >
              {text}
            </MagneticButton>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
