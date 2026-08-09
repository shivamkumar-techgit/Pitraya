"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { BookOpen, Globe, MapPin, ArrowRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WisdomLibraryMegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export default function WisdomLibraryMegaMenu({
  isOpen,
  className,
  ...props
}: WisdomLibraryMegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute left-0 right-0 top-full z-40 w-full",
            "bg-black/97 backdrop-blur-2xl",
            "border-b border-border-gold/30 shadow-2xl",
            "py-8 px-6",
            className
          )}
          {...(props as unknown as HTMLMotionProps<"div">)}
        >
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Column 1: Feature CTA */}
            <div className="md:col-span-1 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-gold-primary/10 to-transparent border border-gold-primary/20">
              <div className="space-y-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold-primary/20 text-gold-primary">
                  <BookOpen className="h-4 w-4" />
                </span>
                <p className="text-sm font-bold font-cinzel text-gold-primary">Wisdom Library</p>
                <p className="text-xs text-text-muted leading-relaxed">
                  50+ expert articles on Pind Daan rituals, Vedic traditions, sacred sites, and pilgrimage planning.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-primary hover:underline mt-4 group"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Column 2: Knowledge Hub */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-primary border-b border-border-gold/20 pb-2">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Knowledge Hub</span>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Complete Pind Daan Guide",    sub: "Step-by-step ritual walkthrough",       href: "/blog/complete-guide-gaya-pind-daan" },
                  { label: "Pitru Paksha Calendar",       sub: "Auspicious dates & muhurat",            href: "/blog/pitru-paksha-2024-complete-guide" },
                  { label: "Samagri Checklist",           sub: "Items needed for Pind Daan",            href: "/blog" },
                  { label: "FAQ by Pandits",              sub: "30 questions answered",                 href: "/blog/pind-daan-faq-complete" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="block group/link">
                      <span className="font-medium text-text-primary group-hover/link:text-gold-primary transition-colors block">{link.label}</span>
                      <span className="text-[10px] text-text-muted">{link.sub}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: City Pilgrimages */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-primary border-b border-border-gold/20 pb-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>City Pilgrimages</span>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Delhi & NCR",          sub: "2-hour flight, full coordination",  href: "/pind-daan-from/delhi" },
                  { label: "Mumbai & West India",   sub: "2.5-hour flight, NRI support",     href: "/pind-daan-from/mumbai" },
                  { label: "Bangalore & South",     sub: "2.5-hour flight, all amenities",   href: "/pind-daan-from/bangalore" },
                  { label: "All 50+ Indian Cities", sub: "Find your city's route",           href: "/pind-daan-from" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="block group/link">
                      <span className="font-medium text-text-primary group-hover/link:text-gold-primary transition-colors block">{link.label}</span>
                      <span className="text-[10px] text-text-muted">{link.sub}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Planning Tools */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-primary border-b border-border-gold/20 pb-2">
                <Globe className="h-3.5 w-3.5" />
                <span>Planning Tools</span>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "AI Itinerary Planner",    sub: "Personalized ceremony scheduling",    href: "/planner" },
                  { label: "Family Lineage Search",   sub: "Trace your Vamsavali ancestry",       href: "/lineage-portal" },
                  { label: "Browse All Packages",     sub: "Complete pilgrimage solutions",        href: "/packages" },
                  { label: "Contact a Pandit",        sub: "Get expert guidance now",             href: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="block group/link">
                      <span className="font-medium text-text-primary group-hover/link:text-gold-primary transition-colors block">{link.label}</span>
                      <span className="text-[10px] text-text-muted">{link.sub}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Popular tag */}
              <div className="mt-4 pt-4 border-t border-border-gold/10">
                <Link href="/blog/complete-guide-gaya-pind-daan" className="flex items-center gap-2 group/pop">
                  <Flame className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="text-[10px] font-semibold text-text-muted group-hover/pop:text-gold-primary transition-colors">
                    Most Read: Complete Guide to Gaya Pind Daan
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
