"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, UserCheck, Lock, CheckCircle2, AlertCircle, Calendar, MapPin, Sparkles, BookOpen } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import GoldenParticles from "@/components/animations/GoldenParticles";
import { cn } from "@/lib/utils";

export type LineageHeroSectionProps = React.HTMLAttributes<HTMLElement>;

export default function LineageHeroSection({ className, ...props }: LineageHeroSectionProps) {
  const [familyName, setFamilyName] = useState("Sharma");
  const [village, setVillage] = useState("Madhubani");
  const [district, setDistrict] = useState("Madhubani");
  const [state, setState] = useState("Bihar");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<"found" | "not_found" | null>("found");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      // Toggle demo result state if user enters different input
      if (familyName.toLowerCase().includes("not") || village.toLowerCase().includes("unknown")) {
        setSearchResult("not_found");
      } else {
        setSearchResult("found");
      }
    }, 1200);
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

      <Container size="xl" className="relative z-10 space-y-16">
        {/* HERO HEADER */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>CENTURIES-OLD PANJI RECORD ARCHIVES</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel" className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Find Your Family&apos;s{" "}
            <GradientText variant="gold" size="inherit" font="cinzel" className="font-semibold">
              Sacred Lineage
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted" className="max-w-2xl mx-auto leading-relaxed text-text-secondary text-base sm:text-lg font-serif italic">
            Discover if your ancestors performed Pind Daan in Gaya generations ago. Search centuries-old Panji records preserved by Gayawal Pandits.
          </Paragraph>
        </div>

        {/* SEARCH FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard borderGold glow padding="lg" className="bg-surface/90 backdrop-blur-xl p-6 sm:p-10 space-y-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Family Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel">
                    Family Name / Gotra
                  </label>
                  <input
                    type="text"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    placeholder="e.g. Sharma / Kashyap"
                    className="w-full px-4 py-3 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-sm focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
                    required
                  />
                </div>

                {/* 2. Native Village */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel">
                    Native Village
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Madhubani"
                    className="w-full px-4 py-3 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-sm focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
                    required
                  />
                </div>

                {/* 3. District */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel">
                    District
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Madhubani"
                    className="w-full px-4 py-3 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-sm focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
                  />
                </div>

                {/* 4. State */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Bihar"
                    className="w-full px-4 py-3 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-sm focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* SEARCH BUTTON */}
              <div className="flex justify-center pt-2">
                <PrimaryButton
                  type="submit"
                  size="lg"
                  isDisabled={isSearching}
                  leftIcon={<Search className="h-5 w-5" />}
                  className="w-full sm:w-auto px-10 shadow-gold-glow"
                >
                  {isSearching ? "Searching Panji Archives..." : "Search Ancestral Lineage"}
                </PrimaryButton>
              </div>
            </form>

            {/* TRUST BADGES STRIP BELOW SEARCH */}
            <div className="pt-6 border-t border-gold-primary/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-text-primary">
              <div className="flex items-center gap-2 text-gold-primary">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>✓ Private Search</span>
              </div>
              <div className="flex items-center gap-2 text-gold-primary">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>✓ Authentic Gayawal Records</span>
              </div>
              <div className="flex items-center gap-2 text-gold-primary">
                <UserCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>✓ Human Verification</span>
              </div>
              <div className="flex items-center gap-2 text-gold-primary">
                <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>✓ 100% Confidential</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* INTERACTIVE SEARCH RESULTS DISPLAY */}
        <AnimatePresence mode="wait">
          {searchResult === "found" && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <GlassCard borderGold glow padding="lg" className="bg-gradient-to-br from-emerald-950/30 via-surface to-background border-2 border-emerald-500/50 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-emerald-500/30 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-cinzel block">
                        Lineage Record Found
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
                        Ancestral Record Registered in Panji Archives
                      </h3>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-black shadow-md font-cinzel">
                    Verified Match
                  </span>
                </div>

                {/* RECORD FOUND DETAILS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4.5 rounded-xl bg-background/90 border border-border space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-primary font-cinzel block">Family</span>
                    <p className="text-sm font-semibold text-text-primary">{familyName || "Sharma"}</p>
                  </div>
                  <div className="p-4.5 rounded-xl bg-background/90 border border-border space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-primary font-cinzel block">Village</span>
                    <p className="text-sm font-semibold text-text-primary">{village || "Madhubani"}</p>
                  </div>
                  <div className="p-4.5 rounded-xl bg-background/90 border border-border space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-primary font-cinzel block">Last Recorded</span>
                    <p className="text-sm font-semibold text-emerald-400 font-mono">1936</p>
                  </div>
                  <div className="p-4.5 rounded-xl bg-background/90 border border-border space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-primary font-cinzel block">Ancestor</span>
                    <p className="text-sm font-semibold text-text-primary">Late Ram Prasad Sharma</p>
                  </div>
                  <div className="p-4.5 rounded-xl bg-background/90 border border-border space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-primary font-cinzel block">Gayawal Family</span>
                    <p className="text-sm font-semibold text-gold-accent">Mishra Ji</p>
                  </div>
                </div>

                {/* EMOTIONAL CALL TO ACTION BUTTON */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold-primary/20">
                  <p className="text-xs text-text-secondary italic font-serif">
                    Imagine the emotion of walking in the exact spiritual footsteps of your ancestors under the same Gayawal lineage priest.
                  </p>
                  <PrimaryButton
                    size="md"
                    onClick={() => window.location.href = "/book-now"}
                    className="w-full sm:w-auto shrink-0 shadow-gold-glow"
                  >
                    Book Ritual with Same Lineage
                  </PrimaryButton>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {searchResult === "not_found" && (
            <motion.div
              key="not_found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <GlassCard borderGold padding="lg" className="bg-gradient-to-br from-amber-950/30 via-surface to-background border-2 border-amber-500/50 p-6 sm:p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold font-cinzel text-amber-300">
                      Record Not Immediately Found — Manual Search Initiated
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-serif italic">
                      &ldquo;Don&apos;t worry. Many ancient records are handwritten in palm-leaf Panji registers spanning back hundreds of years. Our senior Gayawal Pandits manually verify additional physical archives before confirming.&rdquo;
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => setSearchResult("found")}
                        className="text-xs text-gold-primary underline font-semibold hover:text-gold-accent"
                      >
                        Click to view sample verified record (Sharma Family)
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
