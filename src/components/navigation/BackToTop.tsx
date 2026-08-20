"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

export interface BackToTopProps extends React.HTMLAttributes<HTMLButtonElement> {
  threshold?: number;
}

export default function BackToTop({ threshold = 300, className, ...props }: BackToTopProps) {
  const [visible, setVisible]           = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setVisible(scrolled > threshold);

      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) setScrollProgress((scrolled / height) * 100);
    };

    // Lenis fires its own scroll events — listen on the window for position
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const handleClick = () => {
    // scrollTo(0) routes through Lenis for silky smooth scroll-to-top
    scrollTo(0, { duration: 1.4 });
  };

  // SVG radial progress
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={handleClick}
          aria-label="Back to top"
          className={cn(
            "fixed bottom-6 right-6 md:right-10 z-40",
            "flex h-11 w-11 items-center justify-center rounded-full",
            "bg-surface text-gold-primary",
            "border border-border-gold hover:border-gold-primary",
            "hover:scale-105 active:scale-95",
            "transition-all duration-200 shadow-lg hover:shadow-gold-glow/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary",
            className
          )}
          {...props as unknown as HTMLMotionProps<"button">}
        >
          {/* Radial progress circle */}
          <svg className="absolute -rotate-90 w-full h-full p-[1px] pointer-events-none select-none" aria-hidden="true">
            <circle
              cx="21.5" cy="21.5" r={radius}
              className="stroke-border-gold/10 fill-none"
              strokeWidth="2.5"
            />
            <circle
              cx="21.5" cy="21.5" r={radius}
              className="stroke-gold-primary fill-none transition-[stroke-dashoffset] duration-150"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
