"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingAIPlannerProps extends React.HTMLAttributes<HTMLDivElement> {
  threshold?: number;
}

export default function FloatingAIPlanner({
  threshold = 200,
  className,
  ...props
}: FloatingAIPlannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className={cn("fixed bottom-6 right-6 sm:bottom-24 sm:right-48 md:right-52 z-40 flex items-center", className)}
          {...props as unknown as HTMLMotionProps<"div">}
        >
          <Link href="/planner">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-gold-primary via-amber-400 to-gold-primary text-black text-xs sm:text-sm font-bold shadow-xl shadow-gold-glow border-2 border-white/40 cursor-pointer select-none font-cinzel tracking-wider uppercase group"
            >
              {/* Pulsing Glow Ring */}
              <span className="absolute -inset-0.5 rounded-full bg-gold-primary/50 blur-md animate-pulse group-hover:bg-gold-primary/80 transition-all pointer-events-none" />
              
              <Sparkles className="h-4 w-4 relative z-10 text-black fill-black animate-spin" style={{ animationDuration: '6s' }} />
              <span className="relative z-10">AI Travel Planner</span>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
