"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Phone, MessageSquare, Sparkles, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "@/components/common/ThemeToggle";
import { MenuItem } from "./DesktopMenu";
import Logo from "@/components/common/Logo";
import { cn } from "@/lib/utils";

export interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  items,
  ctaText = "Book Sanctuary",
  onCtaClick,
  className,
  ...props
}: MobileMenuProps) {
  const pathname = usePathname();

  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-text-primary/40 backdrop-blur-md lg:hidden"
          />

          {/* Slide-out Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className={cn(
              "fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-background/98 backdrop-blur-2xl border-l border-border-gold/30 p-6 flex flex-col justify-between shadow-xl overflow-y-auto lg:hidden",
              className
            )}
            {...props as React.ComponentProps<typeof motion.aside>}
          >
            {/* Top Section */}
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border-gold/15 pb-4">
                <Logo size="sm" variant="mark" text="PITRAYA" />
                <button
                  onClick={onClose}
                  className="rounded-full h-9 w-9 bg-surface/80 hover:bg-surface-hover text-text-primary hover:text-gold-primary flex items-center justify-center border border-border-gold/30 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Direct Support Row */}
              <div className="grid grid-cols-2 gap-2 bg-surface/60 border border-border-gold/20 rounded-xl p-2">
                <a
                  href="tel:+918434457228"
                  className="flex items-center justify-center gap-2 rounded-lg py-2 px-3 text-xs font-semibold text-text-primary hover:text-gold-primary hover:bg-surface-hover/80 transition-colors border border-transparent hover:border-gold-primary/30"
                >
                  <Phone className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                  <span>Call Direct</span>
                </a>
                <a
                  href="https://wa.me/918434457228?text=Namaste!%20I%20want%20to%20inquire%20about%20Gaya%20Pind%20Daan%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg py-2 px-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-surface-hover/80 transition-colors border border-transparent hover:border-emerald-500/30"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Navigation Items List */}
              <nav aria-label="Mobile Menu Links" className="flex flex-col space-y-1 pt-2">
                {items.map((item, idx) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  const itemNumber = (idx + 1).toString().padStart(2, "0");

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-3.5 py-3 transition-all duration-200 cursor-pointer border",
                        isActive
                          ? "bg-gold-primary/10 border-gold-primary/40 text-gold-primary font-semibold"
                          : "bg-transparent border-transparent text-text-primary hover:text-gold-primary hover:bg-surface/60 hover:border-border-gold/20"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold text-gold-primary/60 group-hover:text-gold-primary">
                          {itemNumber}
                        </span>
                        <span className="text-sm font-semibold tracking-wide font-cinzel">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.isMega && (
                          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold-primary/10 text-gold-primary font-medium">
                            Menu
                          </span>
                        )}
                        <ChevronRight className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isActive ? "text-gold-primary translate-x-0.5" : "text-text-muted/40 group-hover:text-gold-primary group-hover:translate-x-0.5"
                        )} />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions Area */}
            <div className="space-y-4 border-t border-border-gold/15 pt-6 mt-6">
              {/* Language Switcher */}
              <div className="flex items-center justify-between gap-2 px-1">
                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                  Appearance
                </span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between gap-2 px-1">
                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                  Language / भाषा
                </span>
                <LanguageSwitcher variant="full" />
              </div>

              {/* Book Sanctuary CTA */}
              <PrimaryButton
                fullWidth
                size="md"
                rightIcon={<Sparkles className="h-4 w-4" />}
                onClick={() => {
                  onClose();
                  if (onCtaClick) onCtaClick();
                  else window.location.href = "/packages";
                }}
                className="shadow-gold-glow"
              >
                {ctaText}
              </PrimaryButton>

              {/* Support contact note */}
              <p className="text-[11px] text-center text-text-muted font-serif italic">
                Verified Gayawal Pandits &bull; Vishnupad Gaya
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
