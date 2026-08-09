"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Landmark,
  Compass,
  Scroll,
  Users,
  Calendar,
  Coins,
  Hotel,
  UtensilsCrossed,
  Car,
  HelpCircle,
  MapPin,
  Sparkles,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface WisdomCategory {
  id: string;
  name: string;
  emoji: string;
  icon: React.ReactNode;
  count: string;
  description: string;
}

export const wisdomCategories: WisdomCategory[] = [
  {
    id: "rituals",
    name: "Rituals",
    emoji: "📿",
    icon: <Flame className="h-5 w-5 text-gold-primary" />,
    count: "28 Guides",
    description: "Pind Daan, Tarpan, Tripindi & Vedic oblation procedures.",
  },
  {
    id: "temples",
    name: "Temples",
    emoji: "🏛",
    icon: <Landmark className="h-5 w-5 text-gold-primary" />,
    count: "22 Guides",
    description: "Vishnupad, Akshay Vat, Pretshila & Ramshila shrines.",
  },
  {
    id: "travel",
    name: "Travel",
    emoji: "🧭",
    icon: <Compass className="h-5 w-5 text-gold-primary" />,
    count: "18 Guides",
    description: "Delhi/Mumbai to Gaya flight, train & road routes.",
  },
  {
    id: "scriptures",
    name: "Scriptures",
    emoji: "📜",
    icon: <Scroll className="h-5 w-5 text-gold-primary" />,
    count: "15 Guides",
    description: "Vayu Purana & Garuda Purana scriptural passages.",
  },
  {
    id: "ancestors",
    name: "Ancestors",
    emoji: "👴",
    icon: <Users className="h-5 w-5 text-gold-primary" />,
    count: "14 Guides",
    description: "Gotra verification, lineage trees & 7 generations.",
  },
  {
    id: "festivals",
    name: "Festivals",
    emoji: "📅",
    icon: <Calendar className="h-5 w-5 text-gold-primary" />,
    count: "12 Guides",
    description: "Pitru Paksha calendar, Amavasya & auspicious dates.",
  },
  {
    id: "pricing",
    name: "Pricing",
    emoji: "💰",
    icon: <Coins className="h-5 w-5 text-gold-primary" />,
    count: "10 Guides",
    description: "Pandit dakshina, pooja samagri & package costs.",
  },
  {
    id: "hotels",
    name: "Hotels",
    emoji: "🛏",
    icon: <Hotel className="h-5 w-5 text-gold-primary" />,
    count: "12 Guides",
    description: "Temple zone accommodations & luxury resorts.",
  },
  {
    id: "food",
    name: "Food",
    emoji: "🍛",
    icon: <UtensilsCrossed className="h-5 w-5 text-gold-primary" />,
    count: "8 Guides",
    description: "Pure Sattvik dining rules & fasting guidelines.",
  },
  {
    id: "transport",
    name: "Transport",
    emoji: "🚕",
    icon: <Car className="h-5 w-5 text-gold-primary" />,
    count: "10 Guides",
    description: "AC chauffeurs, station pickups & airport cabs.",
  },
  {
    id: "faqs",
    name: "FAQs",
    emoji: "❓",
    icon: <HelpCircle className="h-5 w-5 text-gold-primary" />,
    count: "25 Guides",
    description: "Women rites, ashes, online oblation & rules.",
  },
  {
    id: "gaya-guide",
    name: "Gaya Guide",
    emoji: "📍",
    icon: <MapPin className="h-5 w-5 text-gold-primary" />,
    count: "16 Guides",
    description: "City etiquette, weather & essential pilgrim advice.",
  },
];

export interface WisdomCategoriesGridProps extends React.HTMLAttributes<HTMLElement> {
  activeCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export default function WisdomCategoriesGrid({
  activeCategory = "all",
  onSelectCategory,
  className,
  ...props
}: WisdomCategoriesGridProps) {
  return (
    <Section
      spacing="xl"
      className={cn("relative py-20 overflow-hidden bg-background text-text-primary border-b border-border-gold/20", className)}
      {...props}
    >
      {/* Sacred Rotating Circular Chakra */}
      <SacredChakraBg size="min(700px, 90vw)" opacity={0.04} rotateSpeed={150} position="top-right" />

      <Container size="xl" className="relative z-10 space-y-12">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <span>STRUCTURED KNOWLEDGE ARCHIVES</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Explore by{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Category
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted">
            Rather than mixed articles, dive directly into structured categories vetted by Gayawal Pandits.
          </Paragraph>
        </div>

        {/* 12 CATEGORIES CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {wisdomCategories.map((cat, idx) => {
            const isSelected = activeCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <GlassCard
                  borderGold={isSelected}
                  glow={isSelected}
                  hoverEffect="lift"
                  onClick={() => onSelectCategory?.(isSelected ? "all" : cat.id)}
                  className={cn(
                    "p-4 flex flex-col justify-between h-full space-y-3 cursor-pointer select-none text-left transition-all duration-300",
                    isSelected
                      ? "bg-gradient-to-br from-gold-primary/20 via-surface to-background border-2 border-gold-primary shadow-gold-glow"
                      : "bg-surface/70 hover:bg-surface border-border"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-[10px] font-mono font-bold text-gold-accent bg-gold-primary/10 px-2 py-0.5 rounded-full border border-gold-primary/20">
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold font-cinzel text-text-primary group-hover:text-gold-primary transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed mt-1">
                      {cat.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
