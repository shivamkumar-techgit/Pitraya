"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Flame, CheckCircle2, ArrowRight, ShieldCheck, Award, Layers } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import MagneticButton from "@/components/buttons/MagneticButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { PitrayaLogoEmblem } from "@/components/common/Logo";
import { cn } from "@/lib/utils";

export interface ServicePackage {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  price: string;
  badge?: string;
  isFeatured?: boolean;
  suitableFor: string;
}

const defaultPitrayaServices: ServicePackage[] = [
  {
    icon: <Flame className="h-5 w-5 text-gold-primary" />,
    title: "Sacred Ritual Services",
    subtitle: "Vedic Rites for Local or Self-Arranged Pilgrims",
    description: "For families requiring only authentic Vedic rituals with hereditary Gayawal Pandits without hotel or transport bundling.",
    image: "/images/package_heritage_real.png",
    features: [
      "Dedicated Gayawal Pandit with Panji register verification",
      "Vishnupad & Phalgu River Tarpan assistance",
      "Complete ritual kit & Pinda materials included",
    ],
    price: "Starts from ₹5,100",
    suitableFor: "👨‍👩‍👧 Local / Self-Arranged Pilgrims",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-gold-primary" />,
    title: "Pilgrimage Experiences",
    subtitle: "Complete Stay + Transport + Rituals",
    description: "Our core all-inclusive pilgrimage packages covering 3-Vedi Pind Daan (Vishnupad, Phalgu River, Akshay Vat), hereditary Gayawal Pandit guidance, private AC transfers, and premium hotel stay.",
    image: "/images/package_moksha_real.png",
    features: [
      "All 3-Vedi Pind Daan ceremonies & Vedic mantras",
      "Premium hotel stay with pure Sattvik meals",
      "AC private chauffeur transfers (Airport/Station/Temples)",
    ],
    price: "Starts from ₹24,999",
    badge: "Most Popular",
    isFeatured: true,
    suitableFor: "👨‍👩‍👧‍👦 Small Families (2-4 members)",
  },
  {
    icon: <Award className="h-5 w-5 text-gold-primary" />,
    title: "Luxury Spiritual Concierge",
    subtitle: "Fully Managed Private Pilgrimage & Retreat",
    description: "Ultra-luxury retreat experience with senior Gayawal priests, private SUV transfers, luxury 5-star hotel suites, VIP temple access, and cinematic documentation.",
    image: "/images/package_royal_real.png",
    features: [
      "Senior Gayawal Priest & 24x7 Concierge Butler",
      "Luxury 5-star hotel suites & private temple spaces",
      "Cinematic photo/video & family genealogy book",
    ],
    price: "Starts from ₹89,999",
    suitableFor: "👑 Families seeking VIP Temple access & Luxury",
  },
];

export type ServicesSectionProps = React.HTMLAttributes<HTMLElement>;

export default function ServicesSection({ className, ...props }: ServicesSectionProps) {
  return (
    <Section spacing="xl" className={cn("relative py-28 overflow-hidden bg-black text-text-primary border-b border-border-gold/20", className)} {...props}>
      {/* Background Ambience Glow & Sacred Circular Chakra */}
      <SacredChakraBg size="min(650px, 90vw)" opacity={0.045} rotateSpeed={170} />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[500px] bg-gold-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>CHAPTER 03 • PILGRIMAGE PACKAGES & EXPERIENCES</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Choose Your{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Sacred Experience Tier
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted" className="max-w-2xl mx-auto">
            Explore our 3 primary pilgrimage categories. Click any tier below to view full details, hotel rooms, private AC vehicles, and Day-by-Day timelines.
          </Paragraph>
        </div>

        {/* AI TRAVEL PLANNER BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <GlassCard borderGold glow padding="md" className="bg-gradient-to-r from-gold-primary/20 via-surface/90 to-background border-2 border-gold-primary/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-gold-glow">
            <div className="flex items-center gap-4 text-left">
              <div className="p-2.5 rounded-2xl bg-black/90 border-2 border-gold-primary/60 shadow-gold-glow shrink-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                >
                  <PitrayaLogoEmblem size={28} />
                </motion.div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold-primary font-cinzel block">
                  ✦ NEED HELP CHOOSING A PACKAGE?
                </span>
                <h4 className="text-lg font-bold font-cinzel text-text-primary">
                  Calculate Custom Package, Flights, Hotels &amp; Muhurat with AI
                </h4>
                <p className="text-xs text-text-muted font-serif italic">
                  Enter your family size, travel dates &amp; budget to generate a personalized pilgrimage itinerary in 10 seconds.
                </p>
              </div>
            </div>
            <Link href="/planner" className="shrink-0 w-full sm:w-auto">
              <PrimaryButton
                leftIcon={
                  <div className="p-1 rounded-full bg-black/90 border border-gold-primary/40 flex items-center justify-center shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className="shrink-0 flex items-center justify-center"
                    >
                      <PitrayaLogoEmblem size={18} />
                    </motion.div>
                  </div>
                }
                size="md"
                className="w-full shadow-gold-glow"
              >
                Launch AI Travel Planner
              </PrimaryButton>
            </Link>
          </GlassCard>
        </motion.div>

        {/* 3-COLUMN LAYOUT — Balanced Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-2">
          {defaultPitrayaServices.map((service, idx) => {
            const isFeatured = service.isFeatured;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={cn(
                  "flex flex-col",
                  isFeatured && "lg:-translate-y-4 z-10"
                )}
              >
                <GlassCard
                  borderGold={isFeatured}
                  glow={isFeatured}
                  padding="none"
                  className={cn(
                    "h-full flex flex-col justify-between overflow-hidden transition-all duration-300 rounded-3xl",
                    isFeatured 
                      ? "bg-gradient-to-b from-gold-primary/15 via-surface/80 to-surface border-2 border-gold-primary/50 shadow-gold-glow"
                      : "bg-surface/40 hover:bg-surface/60 border border-border-gold/20"
                  )}
                >
                  {/* Image Banner */}
                  <div className="relative h-[200px] w-full overflow-hidden group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    {service.badge && (
                      <span className="absolute top-4 left-4 rounded-full bg-gold-primary text-black font-bold px-3.5 py-1 text-[10px] uppercase tracking-widest shadow-md">
                        {service.badge}
                      </span>
                    )}
                    <span className="absolute top-4 right-4 rounded-full bg-black/80 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-gold-primary border border-gold-primary/30 font-cinzel">
                      {service.price}
                    </span>
                    <div className="absolute bottom-4 left-5 right-5">
                      <span className="text-[10px] font-semibold text-gold-primary uppercase tracking-widest block">
                        {service.subtitle}
                      </span>
                      <Heading size="sm" font="cinzel" className="text-white">
                        {service.title}
                      </Heading>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Suitable For */}
                      <div className="rounded-xl bg-gold-primary/5 border border-gold-primary/20 px-3.5 py-2 text-xs text-gold-primary/95 font-medium flex items-center gap-2">
                        <span>{service.suitableFor}</span>
                      </div>

                      {/* 3 Highlights */}
                      <div className="space-y-2 pt-2 border-t border-border-gold/15">
                        <span className="text-[10px] font-bold text-gold-primary uppercase tracking-wider block">
                          Key Highlights:
                        </span>
                        <div className="space-y-2">
                          {service.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary leading-snug">
                              <CheckCircle2 className="h-3.5 w-3.5 text-gold-primary shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 flex items-center justify-between border-t border-border-gold/15 mt-auto">
                      <div>
                        <span className="text-[9px] text-text-muted uppercase tracking-wider block">Pricing</span>
                        <span className="text-xs font-bold text-gold-primary font-cinzel">{service.price.replace("Starts from ", "")}</span>
                      </div>
                      <Link href="/packages" className="shrink-0">
                        <PrimaryButton size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                          View Details
                        </PrimaryButton>
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM PROMINENT BANNER DIRECTING TO DEDICATED PACKAGES PAGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard padding="lg" className="border border-gold-primary/40 bg-gradient-to-r from-gold-primary/10 via-surface/40 to-gold-primary/10 rounded-3xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-2">
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                  <Layers className="h-5 w-5 text-gold-primary" />
                  <span>Want to compare all 5 package tiers side-by-side?</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-2xl">
                  Review complete feature breakdown tables, vehicle choices, hotel ratings, transparent pricing, and 10 optional experience add-ons on our dedicated sales page.
                </p>
              </div>
              <Link href="/packages" className="shrink-0">
                <MagneticButton size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Go to Packages Page
                </MagneticButton>
              </Link>
            </div>
          </GlassCard>
        </motion.div>

      </Container>
    </Section>
  );
}
