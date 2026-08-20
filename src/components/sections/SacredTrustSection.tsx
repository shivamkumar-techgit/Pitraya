"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  ShieldCheck,
  Scroll,
  UserCheck,
  Package,
  Headset,
  CheckCircle2,
  Sparkles,
  Sparkle,
  Info,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GlassCard from "@/components/cards/GlassCard";
import GradientText from "@/components/typography/GradientText";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface TrustCardItem {
  id: string;
  badge: string;
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  items: Array<{
    text: string;
    isCheck?: boolean;
  }>;
  callout?: string;
  uspHighlight?: string;
  gradientVariant?: "gold" | "glass" | "accent";
}

export interface SacredTrustSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Subtitle eyebrow badge text */
  subtitle?: string;
  /** Section title choice: 'sacred' | 'families' or a custom title string */
  titleChoice?: "sacred" | "families" | string;
  /** Custom section header description */
  description?: string;
  /** Allow interactive title toggle between the 2 user options */
  showTitleToggle?: boolean;
  /** Custom card data array if overriding defaults */
  cards?: TrustCardItem[];
  /** Custom trust badges for horizontal strip */
  trustBadges?: string[];
  /** Custom items for "What's Included in Every Booking" strip */
  includedItems?: string[];
}

const defaultTrustBadges: string[] = [
  "Verified Gayawal Pandits",
  "Dakshina Included",
  "Hotel Verified",
  "Private Transport",
  "Ritual Materials Included",
  "WhatsApp Support",
  "GST Invoice Available",
  "Family Certificate",
];

const defaultIncludedItems: string[] = [
  "Authentic Gayawal Pandit",
  "Ritual Kit",
  "Dakshina Included",
  "Temple Guidance",
  "WhatsApp Updates",
  "Completion Certificate",
  "Dedicated Support",
  "Emergency Assistance",
];

const defaultTrustCards: TrustCardItem[] = [
  {
    id: "pandits",
    badge: "Vedic Lineage",
    title: "Authentic Gayawal Pandits",
    icon: <Landmark className="h-6 w-6" />,
    items: [
      { text: "Hereditary Gayawal Pandits with sacred lineage", isCheck: false },
      { text: "Centuries-old Panji record tradition", isCheck: false },
      { text: "Authentic Vedic mantras & holy rituals", isCheck: false },
      { text: "Direct ritual conduct — No middlemen", isCheck: false },
    ],
    callout: "Direct ancestral lineage guidance",
    gradientVariant: "gold",
  },
  {
    id: "pricing",
    badge: "Price Integrity",
    title: "Transparent Pricing",
    icon: <ShieldCheck className="h-6 w-6" />,
    items: [
      { text: "Dakshina Included", isCheck: true },
      { text: "Ritual Materials Included", isCheck: true },
      { text: "No Hidden Charges or Demands", isCheck: true },
      { text: "Fixed Package Price Guaranteed", isCheck: true },
    ],
    callout: "People are scared of hidden temple costs. We remove that fear entirely.",
    uspHighlight: "Zero hidden charges — 100% upfront clarity",
    gradientVariant: "accent",
  },
  {
    id: "lineage",
    badge: "Signature USP",
    title: "Verified Family Lineage",
    icon: <Scroll className="h-6 w-6" />,
    items: [
      { text: "Traditional Panji Record Verification", isCheck: false },
      { text: "Multi-generational family genealogy records", isCheck: false },
      { text: "Historical lineage guidance & registry update", isCheck: false },
    ],
    callout: "Competitors rarely highlight lineage verification. This is your ancestral legacy safeguard.",
    uspHighlight: "Exclusive Panji Verification System",
    gradientVariant: "gold",
  },
  {
    id: "manager",
    badge: "End-to-End Care",
    title: "Personal Pilgrimage Manager",
    icon: <UserCheck className="h-6 w-6" />,
    items: [
      { text: "Hotel & sanctuary booking assistance", isCheck: false },
      { text: "Private AC transport & pickup coordination", isCheck: false },
      { text: "Auspicious ritual timing schedule", isCheck: false },
      { text: "Elderly assistance & special care support", isCheck: false },
      { text: "Personal temple guidance & step-by-step escort", isCheck: false },
    ],
    callout: "Your dedicated single point of contact from arrival to departure",
    gradientVariant: "glass",
  },
  {
    id: "materials",
    badge: "All-Inclusive Rites",
    title: "Complete Ritual Materials",
    subtitle: "Every package includes:",
    icon: <Package className="h-6 w-6" />,
    items: [
      { text: "Sacred Rice & Grains", isCheck: true },
      { text: "Black Sesame (Til)", isCheck: true },
      { text: "Fresh Flowers & Kusha Grass", isCheck: true },
      { text: "Sacred Cloth & Threads", isCheck: true },
      { text: "Pure Brass Utensils & Diya", isCheck: true },
      { text: "Complete Puja Essentials", isCheck: true },
    ],
    callout: "No need to buy anything outside temple grounds.",
    uspHighlight: "100% Complete Samagri Provided",
    gradientVariant: "gold",
  },
  {
    id: "assistance",
    badge: "NRI & Outstation Support",
    title: "24×7 Family Assistance",
    icon: <Headset className="h-6 w-6" />,
    items: [
      { text: "Airport & Railway Station pickup", isCheck: false },
      { text: "24×7 Instant WhatsApp Concierge", isCheck: false },
      { text: "Emergency medical & local help", isCheck: false },
      { text: "Multi-language translation support", isCheck: false },
      { text: "Local support & family meal coordination", isCheck: false },
    ],
    callout: "Especially valuable for NRIs and families traveling from afar.",
    gradientVariant: "accent",
  },
];

export default function SacredTrustSection({
  subtitle = "THE ASSURANCE OF SANCTITY & TRUST",
  titleChoice = "sacred",
  description = "Every pilgrimage is conducted through authentic Gayawal Pandits, transparent pricing, verified rituals, and complete family assistance from arrival to completion.",
  showTitleToggle = true,
  cards = defaultTrustCards,
  trustBadges = defaultTrustBadges,
  includedItems = defaultIncludedItems,
  className,
  ...props
}: SacredTrustSectionProps) {
  const [activeTitleOption, setActiveTitleOption] = useState<"sacred" | "families">(
    titleChoice === "families" ? "families" : "sacred"
  );

  const resolveTitle = () => {
    if (typeof titleChoice === "string" && titleChoice !== "sacred" && titleChoice !== "families") {
      return titleChoice;
    }
    return activeTitleOption === "sacred"
      ? "Sacred Trust Built Across Generations"
      : "Why Thousands of Families Trust Pitraya";
  };

  return (
    <Section
      spacing="xl"
      className={cn(
        "relative overflow-hidden py-24 md:py-32 bg-background text-text-primary border-y border-border-gold/20",
        className
      )}
      aria-label="Sacred Trust and Value Proposition"
      {...props}
    >
      {/* Background Ambient Glow & Sacred Circular Chakra */}
      <SacredChakraBg size="min(700px, 90vw)" opacity={0.04} rotateSpeed={150} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-gold-primary/10 via-gold-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-gold-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center space-y-5 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{subtitle}</span>
          </motion.div>

          {/* Interactive Title & Toggle Option */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={resolveTitle()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Heading size="xl" align="center" font="cinzel" className="tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium">
                  {activeTitleOption === "sacred" ? (
                    <>
                      Sacred Trust Built{" "}
                      <GradientText variant="gold" size="inherit" font="cinzel" className="font-semibold">
                        Across Generations
                      </GradientText>
                    </>
                  ) : (
                    <>
                      Why Thousands of Families{" "}
                      <GradientText variant="gold" size="inherit" font="cinzel" className="font-semibold">
                        Trust Pitraya
                      </GradientText>
                    </>
                  )}
                </Heading>
              </motion.div>
            </AnimatePresence>

            {/* Optional Title Option Selector Switch */}
            {showTitleToggle && (
              <div className="pt-2 flex justify-center items-center gap-2">
                <span className="text-xs text-text-muted">Title Option:</span>
                <div className="inline-flex rounded-lg bg-surface border border-border p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTitleOption("sacred")}
                    className={cn(
                      "px-3 py-1 text-xs rounded-md transition-all font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary",
                      activeTitleOption === "sacred"
                        ? "bg-gold-primary text-black font-semibold shadow-sm"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                    aria-label="Switch to Sacred Trust title"
                  >
                    Sacred Trust
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTitleOption("families")}
                    className={cn(
                      "px-3 py-1 text-xs rounded-md transition-all font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary",
                      activeTitleOption === "families"
                        ? "bg-gold-primary text-black font-semibold shadow-sm"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                    aria-label="Switch to Why Families Trust title"
                  >
                    Why Families Trust
                  </button>
                </div>
              </div>
            )}
          </div>

          <Paragraph size="lg" align="center" variant="muted" className="max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
            {description}
          </Paragraph>

          {/* Thin Horizontal Trust Badges Strip */}
          {trustBadges && trustBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="pt-6 sm:pt-8"
              role="region"
              aria-label="Pitraya Trust Badges"
            >
              <div className="w-full rounded-2xl md:rounded-full bg-surface/80 border border-gold-primary/30 backdrop-blur-md px-4 py-3.5 sm:px-6 sm:py-4 shadow-lg shadow-black/40">
                <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 text-xs sm:text-sm font-medium text-text-primary">
                  {trustBadges.map((badgeText, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap text-text-secondary hover:text-gold-primary transition-colors cursor-default group"
                    >
                      <CheckCircle2 className="h-4 w-4 text-gold-primary shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <span>{badgeText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* 6 Premium Cards Layout: 2 Rows x 3 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const isGold = card.gradientVariant === "gold";
            const isAccent = card.gradientVariant === "accent";

            return (
              <GlassCard
                key={card.id || idx}
                hoverEffect="lift"
                borderGold={isGold}
                className={cn(
                  "group relative flex flex-col justify-between p-6 sm:p-6 md:p-8 rounded-2xl border transition-all duration-300",
                  "bg-surface/80 hover:bg-surface-hover/90 backdrop-blur-md",
                  isGold && "border-gold-primary/40 shadow-lg shadow-gold-primary/5 hover:border-gold-primary hover:shadow-gold-glow",
                  isAccent && "border-border-gold/30 hover:border-gold-primary/60",
                  !isGold && !isAccent && "border-border hover:border-gold-primary/40"
                )}
                aria-label={card.title}
              >
                {/* Top Card Header & Icon */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    {/* Icon Badge Container */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black">
                      {card.icon}
                    </div>

                    {/* Category / Pill Badge */}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-primary/10 px-3 py-1 text-[11px] font-semibold text-gold-primary border border-gold-primary/25 tracking-wider font-cinzel">
                      <Sparkle className="h-3 w-3 fill-gold-primary/30" />
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <Heading size="sm" font="cinzel" className="text-xl group-hover:text-gold-primary transition-colors duration-200">
                      {card.title}
                    </Heading>
                    {card.subtitle && (
                      <p className="mt-1 text-xs font-semibold text-gold-accent tracking-wide uppercase">
                        {card.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Items List */}
                  <ul className="space-y-2.5 pt-2" role="list">
                    {card.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-text-secondary leading-snug">
                        {item.isCheck ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-primary mt-0.5" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-primary/70 shrink-0 mt-2" />
                        )}
                        <span className={cn(item.isCheck && "text-text-primary font-medium")}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Callout / USP Highlight Box */}
                {(card.callout || card.uspHighlight) && (
                  <div className="mt-6 pt-4 border-t border-border-gold/20">
                    {card.uspHighlight && (
                      <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-gold-primary uppercase tracking-wider">
                        <Info className="h-3.5 w-3.5" />
                        <span>{card.uspHighlight}</span>
                      </div>
                    )}
                    {card.callout && (
                      <p className="text-xs italic text-text-muted leading-relaxed">
                        &ldquo;{card.callout}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* "What's Included in Every Booking" Premium Strip */}
        {includedItems && includedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 md:mt-16"
            role="region"
            aria-label="What's Included in Every Booking"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gold-primary/30 bg-gradient-to-r from-gold-primary/10 via-surface/90 to-gold-primary/10 p-6 sm:p-8 backdrop-blur-md shadow-xl shadow-black/50">
              {/* Background ambient glow */}
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gold-primary/10 blur-2xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                {/* Title & Badge Column */}
                <div className="text-center lg:text-left space-y-1.5 shrink-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-primary/15 px-3 py-1 text-[11px] font-bold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel">
                    <Sparkle className="h-3 w-3 fill-gold-primary" />
                    <span>Every Family Receives</span>
                  </div>
                  <Heading size="sm" font="cinzel" className="text-xl sm:text-2xl text-text-primary">
                    What&apos;s Included in Every Booking
                  </Heading>
                </div>

                {/* Grid of Included Items */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full lg:w-auto">
                  {includedItems.map((itemText, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 rounded-xl bg-surface/90 border border-gold-primary/20 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-text-primary hover:border-gold-primary/60 hover:bg-gold-primary/10 transition-all duration-200 group shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-gold-primary shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <span className="truncate">{itemText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
