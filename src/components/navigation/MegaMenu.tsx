"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Sparkles, Landmark, Compass, ArrowRight } from "lucide-react";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";

export interface MegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export default function MegaMenu({ isOpen, className, ...props }: MegaMenuProps) {
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
            "glass-panel",
            "border-b border-border-gold/30 shadow-lg",
            "py-8 px-6",
            className
          )}
          {...(props as unknown as HTMLMotionProps<"div">)}
        >
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Column 1: Feature Card */}
            <div className="md:col-span-1 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-gold-primary/10 to-transparent border border-gold-primary/20">
              <div className="space-y-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold-primary/20 text-gold-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
                <Heading size="sm" font="cinzel" className="text-gold-primary">
                  Vedic Legacy
                </Heading>
                <Paragraph size="xs" variant="muted" className="leading-relaxed">
                  Every ritual performed at our Gaya sanctuaries follows centuries of lineages certified by the Vedic council.
                </Paragraph>
              </div>
              <Link
                href="/#journey"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-primary hover:underline mt-4 group"
              >
                <span>Explore Pilgrimage Journey</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Column 2: Sacred Sanctuaries */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-primary border-b border-border-gold/20 pb-2">
                <Landmark className="h-3.5 w-3.5" />
                <span>Sanctuaries</span>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Vishnupad Temple",      sub: "Basalt footprint of Lord Vishnu",     href: "/#destinations" },
                  { label: "Phalgu Sand Oblation",   sub: "Sita Devi oblation river bank",       href: "/#destinations" },
                  { label: "Akshayavat Banyan",      sub: "Eternal tree of salvation",           href: "/#destinations" },
                  { label: "Pretshila Hill",          sub: "Liberation site for wandering souls", href: "/#destinations" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-gold-primary transition-colors block group/link">
                      <span className="font-medium text-text-primary block group-hover/link:text-gold-primary transition-colors">{link.label}</span>
                      <span className="text-[10px] text-text-muted">{link.sub}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Ritual Offerings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-primary border-b border-border-gold/20 pb-2">
                <Compass className="h-3.5 w-3.5" />
                <span>Ritual Offerings</span>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Ancestral Pinda Daan",  sub: "Complete single-day rites package",   href: "/#services" },
                  { label: "Pitru Paksha Shradh",   sub: "16-day ancestral remembrance rites",  href: "/#services" },
                  { label: "Karma Cleansing",        sub: "Sound baths & reset ceremonies",      href: "/#services" },
                  { label: "VIP Concierge Escort",  sub: "Dedicated transport & stays",          href: "/#services" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-gold-primary transition-colors block group/link">
                      <span className="font-medium text-text-primary block group-hover/link:text-gold-primary transition-colors">{link.label}</span>
                      <span className="text-[10px] text-text-muted">{link.sub}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Ambient Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-border-gold/10 hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400"
                alt="Gaya Sunrise Pilgrimage"
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-[9px] font-bold text-gold-primary bg-black/60 px-2 py-0.5 rounded-md border border-gold-primary/30 uppercase tracking-widest block w-fit mb-1">
                  Ambience
                </span>
                <span className="text-xs font-semibold text-white font-cinzel">Gaya Morning Fog</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
