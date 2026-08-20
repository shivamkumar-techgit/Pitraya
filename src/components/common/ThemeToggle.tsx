"use client";

import React from "react";
import { useTheme } from "@/design/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ThemeToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "midnight-sanctuary";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-all duration-300 hover:border-gold-primary hover:shadow-gold-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary",
        className
      )}
      aria-label="Toggle theme"
      {...props}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-gold-primary" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? -180 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-gold-primary" />
      </motion.div>
    </button>
  );
}
