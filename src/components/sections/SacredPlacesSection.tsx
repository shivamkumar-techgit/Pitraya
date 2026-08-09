"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Compass, CheckCircle2, ChevronRight, Clock, Calendar, Navigation } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface SacredPlace {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  deity: string;
  rituals: string;
  description: string;
  highlights: string[];
  /** Why this specific place is sacred */
  whySacred: string;
  /** Best time/season to visit */
  bestTime: string;
  /** How long the ritual takes */
  duration: string;
  /** Nearby sacred locations */
  nearbyPlaces: string[];
}

export const sacredPlacesData: SacredPlace[] = [
  {
    id: "vishnupad",
    title: "Vishnupad Temple",
    subtitle: "The Footprint of Salvation",
    image: "/images/gaya_sacred_place_vishnupad.png",
    deity: "Lord Vishnu",
    rituals: "Phalgu Pinda Daan, Footprint Worship, Shraddha Rites",
    description: "Located on the banks of the Phalgu River, this historic temple houses the sacred 40cm footprint of Lord Vishnu stamped in solid basalt. It represents the focal spiritual center where offering oblation releases ancestors from the cycle of birth and rebirth.",
    highlights: ["Footprint of Lord Vishnu", "Sacred Basalt Shrines", "Primary Pinda Daan Site"],
    whySacred: "Lord Vishnu placed His foot here upon Gayasura, declaring that any Pind Daan performed at this spot grants direct Moksha to seven generations of ancestors. No other temple in India carries this divine decree.",
    bestTime: "September to March (Pitru Paksha in September–October is the most auspicious period)",
    duration: "2–3 hours for the complete Pind Daan ceremony",
    nearbyPlaces: ["Phalgu River Ghats (adjacent)", "Akshay Vat (1 km)", "Mangla Gauri Temple (2 km)"],
  },
  {
    id: "falgu",
    title: "Phalgu River Ghats",
    subtitle: "The Subterranean River of Blessings",
    image: "/images/gaya_sacred_place_falgu.png",
    deity: "Sita Devi & Lord Rama",
    rituals: "Tarpan Ceremonies, Sand-Pinda Offerings, Holy Cleansing Rites",
    description: "The Phalgu is a unique sacred river that flows beneath a layer of sand. Blessed by Goddess Sita, the sand itself is used to form sacred Pindas. The act of offering tarpan on its ghats is considered highly auspicious and spiritually cleansing.",
    highlights: ["Under-sand Subterranean Flow", "Phalgu River Ghats", "Sita Devi's Blessing Site"],
    whySacred: "Sita Devi cursed the Phalgu River to flow underground after it refused to witness her Pind Daan offering. Despite this, the river's sand remains sacred — Pindas made from this sand are considered the most powerful for ancestral liberation.",
    bestTime: "Year-round; early morning (5–8 AM) is the most auspicious time for Tarpan ceremonies",
    duration: "1–2 hours for Tarpan and sand-Pinda offerings",
    nearbyPlaces: ["Vishnupad Temple (adjacent)", "Pretshila Hill (3 km)", "Bodh Gaya (12 km)"],
  },
  {
    id: "akshayvat",
    title: "Akshay Vat (Immortal Banyan)",
    subtitle: "The Undying Tree of Eternity",
    image: "/images/gaya_sacred_place_akshayvat.png",
    deity: "Eternal Cosmic Energy",
    rituals: "Final Pinda Daan Oblations, Ancestral Leaf Offerings, Wish Bindings",
    description: "An immortal, ancient banyan tree that survives all cosmic dissolutions. According to tradition, the Gaya pilgrimage is incomplete without performing the final oblation ceremony here, offering a leaf to the tree to seal your ancestors' salvation forever.",
    highlights: ["Immortal Banyan Tree", "Final Pilgrimage Ritual Seal", "Dasharatha's Manifestation Site"],
    whySacred: "This is one of the five eternal witnesses (Panch Sakshi) of Sita's Pind Daan. The tree is believed to be indestructible — it survived even the cosmic dissolution (Pralaya). Performing the final Pind here seals the ancestral liberation permanently.",
    bestTime: "October to February; visit after completing rituals at Vishnupad Temple",
    duration: "45 minutes to 1 hour for the leaf-offering ceremony",
    nearbyPlaces: ["Vishnupad Temple (1 km)", "Phalgu River Ghats (1.5 km)", "Ram Kund (0.5 km)"],
  },
  {
    id: "pretshila",
    title: "Pretshila Hill",
    subtitle: "The Hill of Wandering Souls",
    image: "/images/gaya_sacred_place_pretshila.png",
    deity: "Yama (Lord of Death)",
    rituals: "Pret-Shraddha Oblations, Untimely Death Rites, Stone Leaf Offerings",
    description: "A sacred hill dedicated to Yama, the Lord of Death. Rites performed at the peak are specifically designed for ancestors who suffered untimely, sudden, or unnatural deaths, pacifying restless spirits and guiding them toward light.",
    highlights: ["Yama Dev Temple & Shrine", "Untimely Death Ancestral Rites", "Scenic Sacred Peak Overview"],
    whySacred: "This is the only place in Gaya specifically designated for rites of ancestors who died unnatural deaths (accidents, suicide, sudden illness). The Garuda Purana prescribes Pret-Shraddha here to release trapped souls from the Pret Yoni (ghostly realm).",
    bestTime: "October to March; morning hours are preferred for the climb and rituals",
    duration: "2–3 hours including the climb and complete Pret-Shraddha ceremony",
    nearbyPlaces: ["Phalgu River Ghats (3 km)", "Vishnupad Temple (4 km)", "Ram Gaya Temple (2 km)"],
  },
  {
    id: "mangla_gauri",
    title: "Mangla Gauri",
    subtitle: "The Shakti Peetha of Nurturing Grace",
    image: "/images/gaya_sacred_place_manglagauri.png",
    deity: "Goddess Mangla Gauri",
    rituals: "Shakti Pujas, Maternal Lineage Blessings, Health & Abundance Rites",
    description: "Perched atop a hill, this temple is one of the 18 honored Maha Shakti Peethas. It represents Goddess Sati's breasts, symbolizing divine maternal nourishment. Pilgrims pay homage here to seek blessings for family lineage continuity, protection, and prosperity.",
    highlights: ["Maha Shakti Peetha Shrine", "Ancient Hilltop Architecture", "Maternal Ancestor Blessings"],
    whySacred: "One of the 18 Maha Shakti Peethas in India, this temple is where Goddess Sati's breasts fell. It is the only Shakti Peetha in Gaya, and visiting here is essential for blessing the maternal lineage and ensuring family prosperity and protection.",
    bestTime: "Year-round; Tuesdays and Fridays are considered especially auspicious for Shakti Puja",
    duration: "1–1.5 hours for darshan and Shakti Puja",
    nearbyPlaces: ["Vishnupad Temple (2 km)", "Brahmayoni Hill (1.5 km)", "Gaya City Market (1 km)"],
  },
];

export default function SacredPlacesSection({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [activeId, setActiveId] = useState<string>("vishnupad");
  const activePlace = sacredPlacesData.find((p) => p.id === activeId) || sacredPlacesData[0];

  return (
    <Section
      spacing="xl"
      className={cn(
        "relative py-28 overflow-hidden bg-black text-text-primary border-b border-border-gold/20",
        className
      )}
      {...props}
    >
      {/* Background Ambient Glows & Sacred Circular Chakra */}
      <SacredChakraBg size="min(700px, 90vw)" opacity={0.04} rotateSpeed={160} position="bottom-left" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-gold-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>THE SEATS OF SALVATION</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Sacred{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Places
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted" className="max-w-2xl mx-auto">
            Discover the five ancient realms of Gaya where earthly realms, cosmic energies, and ancestral horizons meet in eternal grace.
          </Paragraph>
        </div>

        {/* Interactive Desktop Layout / Mobile Tab selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SELECTOR STACK */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 lg:overflow-x-visible scrollbar-none w-full">
            {sacredPlacesData.map((place) => {
              const isActive = place.id === activeId;
              return (
                <button
                  key={place.id}
                  onClick={() => setActiveId(place.id)}
                  className="text-left shrink-0 lg:shrink w-[220px] sm:w-[260px] lg:w-full focus:outline-none group"
                >
                  <GlassCard
                    padding="sm"
                    className={cn(
                      "flex items-center gap-4 transition-all duration-300 border cursor-pointer hover:bg-surface/50",
                      isActive
                        ? "border-gold-primary/70 bg-surface-hover/80 shadow-gold-glow scale-[1.02]"
                        : "border-border-gold/20 bg-surface/30 hover:border-gold-primary/45"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
                        isActive
                          ? "bg-gold-primary text-black border-gold-primary"
                          : "bg-background text-gold-primary border-border-gold/30 group-hover:bg-gold-primary/10"
                      )}
                    >
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div className="truncate">
                      <h4
                        className={cn(
                          "text-sm font-semibold transition-colors font-cinzel",
                          isActive ? "text-gold-primary" : "text-text-primary group-hover:text-gold-primary"
                        )}
                      >
                        {place.title}
                      </h4>
                      <p className="text-[10px] text-text-muted truncate uppercase tracking-widest mt-0.5">
                        {place.deity}
                      </p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "ml-auto h-4 w-4 text-text-muted shrink-0 hidden lg:block transition-transform duration-300",
                        isActive ? "translate-x-1 text-gold-primary" : "group-hover:translate-x-0.5"
                      )}
                    />
                  </GlassCard>
                </button>
              );
            })}
          </div>

          {/* RIGHT DETAILED PREVIEW CASE CARD */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlace.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard
                  glow
                  borderGold
                  padding="none"
                  className="overflow-hidden bg-gradient-to-br from-surface/80 via-background to-surface/90 flex flex-col"
                >
                  {/* Top: Image + Title overlay */}
                  <div className="relative h-[220px] md:h-[280px] overflow-hidden group select-none border-b border-border-gold/30">
                    <Image
                      src={activePlace.image}
                      alt={activePlace.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-black/65 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold text-gold-primary border border-gold-primary/30 uppercase tracking-widest">
                      {activePlace.deity}
                    </span>
                    <div className="absolute bottom-5 left-6 right-6">
                      <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest block">
                        {activePlace.subtitle}
                      </span>
                      <Heading size="lg" font="cinzel" className="text-white">
                        {activePlace.title}
                      </Heading>
                    </div>
                  </div>

                  {/* Bottom: Informational detailed layout */}
                  <div className="p-6 md:p-8 flex flex-col space-y-6">
                    {/* Why Sacred */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gold-primary uppercase tracking-wider block">Why This Place is Sacred</span>
                      <Paragraph size="sm" variant="muted" className="leading-relaxed">
                        {activePlace.whySacred}
                      </Paragraph>
                    </div>

                    {/* Key Ceremonies */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Key Ceremonies</span>
                      <span className="text-sm text-text-primary font-medium">{activePlace.rituals}</span>
                    </div>

                    {/* Info Grid: Best Time, Duration, Nearby */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-border/40">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Best Time to Visit</span>
                        </div>
                        <span className="text-xs text-text-primary font-medium leading-relaxed block">{activePlace.bestTime}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Duration</span>
                        </div>
                        <span className="text-xs text-text-primary font-medium leading-relaxed block">{activePlace.duration}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Navigation className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Nearby Locations</span>
                        </div>
                        <ul className="space-y-1">
                          {activePlace.nearbyPlaces.map((np, i) => (
                            <li key={i} className="text-xs text-text-secondary leading-snug">{np}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Spiritual Attributes */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold text-gold-primary uppercase tracking-wider block">
                        Spiritual Attributes:
                      </span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {activePlace.highlights.map((h, i) => (
                          <span key={i} className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <CheckCircle2 className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
