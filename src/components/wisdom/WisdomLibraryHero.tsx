"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Flame, Sparkles, Star, Layers, ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import GoldenParticles from "@/components/animations/GoldenParticles";
import { cn } from "@/lib/utils";

const searchPrompts = [
  "What is Pind Daan",
  "Best Hotels",
  "Akshay Vat",
  "Pitru Paksha",
  "Dress Code",
  "Pandit Charges",
];

export interface WisdomLibraryHeroProps extends React.HTMLAttributes<HTMLElement> {
  onSearchChange?: (query: string) => void;
}

export default function WisdomLibraryHero({ onSearchChange, className, ...props }: WisdomLibraryHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePromptClick = (prompt: string) => {
    setSearchQuery(prompt);
    onSearchChange?.(prompt);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearchChange?.(val);
  };

  return (
    <Section
      spacing="xl"
      className={cn("relative py-28 overflow-hidden bg-background text-text-primary border-b border-border-gold/20", className)}
      {...props}
    >
      {/* Background Ambience & Sacred Rotating Circular Chakra */}
      <GoldenParticles particleCount={35} className="opacity-30 pointer-events-none" />
      <SacredChakraBg size="min(750px, 95vw)" opacity={0.05} rotateSpeed={160} position="center" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-12">
        {/* HERO HEADER */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>CHAPTER 06 • SACRED KNOWLEDGE</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel" className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Everything You Need to Know{" "}
            <GradientText variant="gold" size="inherit" font="cinzel" className="font-semibold block sm:inline">
              Before Coming to Gaya
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted" className="max-w-2xl mx-auto leading-relaxed text-text-secondary text-base sm:text-lg font-serif italic">
            Authentic guides written with Gayawal Pandits for rituals, travel, and sacred traditions.
          </Paragraph>
        </div>

        {/* INTERACTIVE INTERNAL SEARCH ENGINE BAR */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <GlassCard borderGold glow padding="none" className="p-2 bg-surface/90 backdrop-blur-xl border-2 border-gold-primary/60 shadow-gold-glow">
            <div className="relative flex items-center">
              <Search className="h-5 w-5 text-gold-primary absolute left-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder='Search Wisdom Library... "What is Pind Daan", "Best Hotels", "Akshay Vat", "Pandit Charges"'
                className="w-full pl-12 pr-28 py-4 bg-transparent text-text-primary text-sm sm:text-base focus:outline-none placeholder:text-text-muted/60 font-sans"
              />
              <button
                type="button"
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-gold-primary text-black font-bold text-xs uppercase tracking-wider font-cinzel hover:scale-105 transition-transform shadow-gold-glow"
              >
                Search
              </button>
            </div>
          </GlassCard>

          {/* SEARCH PROMPT CHIPS */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-text-muted font-cinzel text-[11px] uppercase tracking-wider">Try searching:</span>
            {searchPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(prompt)}
                className={cn(
                  "px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer text-xs font-medium",
                  searchQuery === prompt
                    ? "bg-gold-primary text-black border-gold-primary font-bold shadow-gold-glow"
                    : "bg-surface/60 border-border-gold/30 text-text-secondary hover:text-gold-primary hover:border-gold-primary"
                )}
              >
                &ldquo;{prompt}&rdquo;
              </button>
            ))}
          </div>
        </motion.div>

        {/* STATS STRIP */}
        <div className="max-w-3xl mx-auto pt-4 border-t border-gold-primary/20 flex flex-wrap items-center justify-around gap-6 text-xs sm:text-sm font-semibold text-text-primary">
          <div className="flex items-center gap-2 text-amber-400">
            <Flame className="h-4 w-4" />
            <span>🔥 120+ Authentic Guides</span>
          </div>
          <div className="flex items-center gap-2 text-gold-primary">
            <Layers className="h-4 w-4" />
            <span>📖 18 Knowledge Categories</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Star className="h-4 w-4 fill-emerald-400" />
            <span>⭐ Updated Weekly by Gayawal Pandits</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
