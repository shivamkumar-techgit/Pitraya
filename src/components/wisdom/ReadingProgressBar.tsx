"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReadingProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  articleTitle?: string;
}

export default function ReadingProgressBar({ articleTitle = "Pitraya Wisdom Article", className, ...props }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border-gold/30 shadow-lg px-4 py-2 flex items-center justify-between text-xs font-cinzel", className)} {...props}>
      <div className="flex items-center gap-2 text-gold-primary truncate max-w-xs sm:max-w-md">
        <BookOpen className="h-4 w-4 shrink-0" />
        <span className="truncate font-semibold text-text-primary">{articleTitle}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[11px] font-bold text-gold-primary">
          Reading Progress <span className="font-mono text-emerald-400">{Math.round(progress)}%</span>
        </span>
        <div className="w-24 sm:w-40 h-2 rounded-full bg-surface border border-gold-primary/30 overflow-hidden">
          <motion.div
            style={{ width: `${progress}%` }}
            className="h-full bg-gold-gradient shadow-gold-glow"
          />
        </div>
      </div>
    </div>
  );
}
