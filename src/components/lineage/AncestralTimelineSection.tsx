"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, CheckCircle2, Sparkles, MapPin, Feather } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface TimelineMilestone {
  year: string;
  title: string;
  ancestor: string;
  location: string;
  ritualType: string;
  description: string;
  panjiRef: string;
}

const centuryMilestones: TimelineMilestone[] = [
  {
    year: "1850",
    title: "Initial Family Panji Registry Entry",
    ancestor: "Great-Great Grandfather Pt. Mahadeo Sharma",
    location: "Vishnupad Temple Sanctum, Gaya",
    ritualType: "First Recorded Lineage Pind Daan",
    description: "Initial family Gotra registration in the ancient palm-leaf Panji registers maintained by Gayawal Pandits during the pre-colonial era.",
    panjiRef: "Vol. 12 • Folio 44",
  },
  {
    year: "1902",
    title: "Phalgu River Tarpan Ceremony",
    ancestor: "Great-Grandfather Pt. Kashinath Sharma",
    location: "Phalgu River Ghats",
    ritualType: "Sand Pinda & Water Oblations",
    description: "Complete ancestral Tarpan ceremony performed on the holy sand ghats of Phalgu Nadi under the supervision of Mishra Gayawal lineage.",
    panjiRef: "Vol. 28 • Folio 102",
  },
  {
    year: "1937",
    title: "Akshay Vat Leaf Oblation & Seal",
    ancestor: "Grandfather Late Ram Prasad Sharma",
    location: "Immortal Banyan Tree (Akshay Vat)",
    ritualType: "Permanent Moksha Leaf Seal Rites",
    description: "Final leaf oblation offered beneath the Immortal Banyan Tree, permanently sealing ancestral liberation for seven prior generations.",
    panjiRef: "Vol. 42 • Folio 118",
  },
  {
    year: "1978",
    title: "Family Lineage Renewal Rites",
    ancestor: "Father Late Shiv Kumar Sharma",
    location: "Vishnupad Footprint Shrine",
    ritualType: "Pind Daan & Havan Fire Ceremony",
    description: "Ritual renewal and additional oblation for departed family members, registered with official signed certificate copy.",
    panjiRef: "Vol. 69 • Folio 204",
  },
  {
    year: "2026",
    title: "Modern Digital Lineage Pilgrimage",
    ancestor: "You & Current Family Generation",
    location: "Gaya Sacred Sanctuary & Temple Complex",
    ritualType: "Complete Managed Concierge Pilgrimage",
    description: "Your modern pilgrimage carrying forward 176 years of documented family devotion with luxury hotel stay, AC private chauffeur, and Gayawal Pandits.",
    panjiRef: "DIGITAL-2026-LIVE",
  },
];

export type AncestralTimelineSectionProps = React.HTMLAttributes<HTMLElement>;

export default function AncestralTimelineSection({ className, ...props }: AncestralTimelineSectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn("relative py-28 overflow-hidden bg-background text-text-primary border-b border-border-gold/20", className)}
      {...props}
    >
      {/* Sacred Rotating Circular Chakra */}
      <SacredChakraBg size="min(750px, 95vw)" opacity={0.045} rotateSpeed={160} position="center" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <Clock className="h-3.5 w-3.5" />
            <span>CENTURY-LONG FAMILY FAITH</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Ancestral Century{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Timeline
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted">
            Trace every sacred ritual performed by your family across generations from 1850 to 2026.
          </Paragraph>
        </div>

        {/* TIMELINE TRACK */}
        <div className="max-w-5xl mx-auto relative">
          {/* Central Stem Line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-border-gold/30 z-0">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 0 }}
              className="w-full h-full bg-gold-gradient shadow-gold-glow"
            />
          </div>

          <div className="space-y-12 relative z-10">
            {centuryMilestones.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-stretch",
                    isEven ? "md:flex-row-reverse" : "",
                    "pl-14 md:pl-0"
                  )}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-1/2 px-2 md:px-8">
                    <GlassCard borderGold hoverEffect="lift" className="p-6 space-y-4 bg-surface/90 backdrop-blur-md">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-black bg-gold-primary px-3 py-1 rounded-full shadow-gold-glow font-cinzel">
                          <Calendar className="h-3.5 w-3.5" />
                          YEAR {item.year}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-gold-accent bg-gold-primary/10 px-2.5 py-0.5 rounded-full border border-gold-primary/20">
                          {item.panjiRef}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-lg font-bold font-cinzel text-text-primary">
                          {item.title}
                        </h4>
                        <p className="text-xs font-semibold text-gold-primary font-cinzel">
                          👤 {item.ancestor}
                        </p>
                      </div>

                      <Paragraph size="sm" variant="muted" className="leading-relaxed text-xs sm:text-sm">
                        {item.description}
                      </Paragraph>

                      <div className="pt-2 border-t border-border-gold/20 flex items-center justify-between text-xs text-text-muted">
                        <span>📍 {item.location}</span>
                        <span className="font-semibold text-emerald-400">✓ {item.ritualType}</span>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Node Circle Indicator */}
                  <div
                    className={cn(
                      "absolute md:static flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-gold-primary shadow-gold-glow z-20 shrink-0",
                      "left-6 md:left-auto -translate-x-1/2 md:translate-x-0"
                    )}
                  >
                    <div className="h-3.5 w-3.5 rounded-full bg-gold-primary animate-pulse" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
