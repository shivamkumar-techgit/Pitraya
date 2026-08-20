"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  FileCheck2,
  MapPin,
  Phone,
  MessageSquare,
  Play,
  CheckCircle2,
  Award,
  Globe2,
  Clock,
  Users,
  Building2,
  ExternalLink,
  Sparkles,
  X,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import GoldenParticles from "@/components/animations/GoldenParticles";
import { cn } from "@/lib/utils";

export interface GayawalPartner {
  name: string;
  lineage: string;
  experience: string;
  panjiRecords: string;
  image: string;
  badge: string;
}

export interface VideoTestimonial {
  id: string;
  title: string;
  family: string;
  location: string;
  videoPoster: string;
  duration: string;
  quote: string;
  videoSrc?: string;
}

const gayawalPartners: GayawalPartner[] = [
  {
    name: "Pt. Mishra Ji",
    lineage: "Hereditary Gayawal Purohit",
    experience: "42 Years Leading Vedic Rites",
    panjiRecords: "Keeper of 150+ Yr Panji Registers",
    image: "/images/pandit_mishra_real.png",
    badge: "Master Purohit",
  },
  {
    name: "Pt. Shastri Ji",
    lineage: "Senior Vishnupad Teerth Priest",
    experience: "35 Years Ancestral Oblation",
    panjiRecords: "Expert in Gotra Verification",
    image: "/images/pandit_shastri_real.png",
    badge: "Lineage Scholar",
  },
];

const supportedLanguages = [
  { name: "Hindi", script: "हिंदी", region: "North India" },
  { name: "English", script: "English", region: "Global & NRI" },
  { name: "Tamil", script: "தமிழ்", region: "Tamil Nadu & S. India" },
  { name: "Telugu", script: "తెలుగు", region: "Andhra & Telangana" },
  { name: "Kannada", script: "ಕನ್ನಡ", region: "Karnataka" },
  { name: "Marathi", script: "मराठी", region: "Maharashtra" },
  { name: "Gujarati", script: "ગુજરાતી", region: "Gujarat" },
  { name: "Bengali", script: "বাংলা", region: "West Bengal" },
];

const videoTestimonials: VideoTestimonial[] = [
  {
    id: "v1",
    title: "Complete Peace for Our Parents' Pind Daan",
    family: "The Sharma Family",
    location: "New Delhi",
    videoPoster: "/images/family_pind_daan.png",
    duration: "2:45 min",
    quote: "Seeing our family's 100-year-old Panji record verified by Pt. Mishra Ji brought tears to my mother's eyes. Absolute transparency.",
  },
  {
    id: "v2",
    title: "Smooth VIP Concierge Experience in Gaya",
    family: "Kulkarni Family",
    location: "Mumbai",
    videoPoster: "/images/pinda_daan_ceremony.png",
    duration: "3:10 min",
    quote: "No bargaining, no touts, no confusion. The AC sedan met us at Gaya airport and everything was pre-booked seamlessly.",
  },
  {
    id: "v3",
    title: "Sacred Rites Completed for 7 Generations",
    family: "Dr. V. Reddy & Family",
    location: "Bengaluru",
    videoPoster: "/images/falgu_river_ghats.png",
    duration: "2:15 min",
    quote: "We were supported in Kannada by our dedicated concierge. The Havan and Vishnupad rites were performed with Vedic perfection.",
  },
];

export type TrustCenterSectionProps = React.HTMLAttributes<HTMLElement>;

export default function TrustCenterSection({ className, ...props }: TrustCenterSectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  return (
    <Section
      spacing="xl"
      className={cn("relative py-28 overflow-hidden bg-muted text-text-primary border-b border-border-gold/20", className)}
      {...props}
    >
      {/* Background Ambience & Sacred Rotating Circular Chakra */}
      <GoldenParticles particleCount={30} className="opacity-30 pointer-events-none" />
      <SacredChakraBg size="min(750px, 95vw)" opacity={0.045} rotateSpeed={160} position="center" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-20">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>AUTHENTICITY & CREDIBILITY PROOF</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Trust & Authenticity{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Center
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted" className="max-w-3xl mx-auto leading-relaxed text-text-secondary text-base sm:text-lg">
            Families investing in their sacred duty deserve complete proof—not mere promises. We back every pilgrimage with government registration, verified Gayawal Pandits, physical Gaya offices, and 24×7 concierge care.
          </Paragraph>
        </div>

        {/* 1. LEGAL & REGULATORY PROOF GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Govt Reg */}
          <GlassCard borderGold className="p-6 space-y-4 bg-surface/90">
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-gold-primary/15 border border-gold-primary/30 text-gold-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
                  GOVT REGISTERED COMPANY
                </span>
                <h4 className="text-base font-bold font-cinzel text-text-primary">
                  MCA Incorporated Entity
                </h4>
              </div>
            </div>
            <Paragraph size="sm" variant="muted" className="text-xs sm:text-sm leading-relaxed">
              Officially incorporated under the Ministry of Corporate Affairs, Govt of India: <strong className="text-text-primary">Pitraya Pilgrimage Services Pvt Ltd</strong>.
            </Paragraph>
            <div className="pt-2 border-t border-border-gold/20 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>✓ MCA Reg No: U74999BR2024PTC</span>
              <FileCheck2 className="h-4 w-4" />
            </div>
          </GlassCard>

          {/* GST Verification */}
          <GlassCard borderGold className="p-6 space-y-4 bg-surface/90">
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-gold-primary/15 border border-gold-primary/30 text-gold-primary">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
                  TAX VERIFIED & COMPLIANT
                </span>
                <h4 className="text-base font-bold font-cinzel text-text-primary">
                  Official GSTIN Registration
                </h4>
              </div>
            </div>
            <Paragraph size="sm" variant="muted" className="text-xs sm:text-sm leading-relaxed">
              Transparent invoicing with official GST billing. No cash demands or unexpected local priest negotiations.
            </Paragraph>
            <div className="pt-2 border-t border-border-gold/20 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>✓ GSTIN: 10AAECP4821K1Z8</span>
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </GlassCard>

          {/* Fixed Price Guarantee */}
          <GlassCard borderGold className="p-6 space-y-4 bg-surface/90">
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-gold-primary/15 border border-gold-primary/30 text-gold-primary">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
                  ZERO HIDDEN FEES
                </span>
                <h4 className="text-base font-bold font-cinzel text-text-primary">
                  All-Inclusive Dakshina Guarantee
                </h4>
              </div>
            </div>
            <Paragraph size="sm" variant="muted" className="text-xs sm:text-sm leading-relaxed">
              All pandit dakshina, pooja samagri, hotel stays, and private transfers are pre-paid in your single package.
            </Paragraph>
            <div className="pt-2 border-t border-border-gold/20 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>✓ 100% Fixed Transparent Pricing</span>
              <ShieldCheck className="h-4 w-4" />
            </div>
          </GlassCard>
        </div>

        {/* 2. PHYSICAL GAYA OFFICE & GAYAWAL PARTNERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Physical Office Card */}
          <GlassCard borderGold glow className="lg:col-span-6 p-8 space-y-6 flex flex-col justify-between bg-surface/90">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 px-3 py-1 rounded-full border border-gold-primary/30 font-cinzel">
                  <MapPin className="h-3.5 w-3.5" />
                  PHYSICAL GAYA SANCTUARY OFFICE
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Open 365 Days
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-text-primary">
                Visit Our On-Site Gaya Concierge Center
              </h3>

              <Paragraph size="sm" variant="muted" className="leading-relaxed">
                Located in Rajapur, Bodhgaya, our physical sanctuary house provides private resting lounges, herbal tea elixirs, baggage storage, and on-site Gayawal Pandit consultation for all pilgrim families.
              </Paragraph>

              <div className="p-4 rounded-xl bg-background/80 border border-gold-primary/30 space-y-1.5">
                <span className="text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel block">
                  Official Office Address:
                </span>
                <p className="text-sm text-text-primary font-medium">
                  Pitraya Sanctuary House, Rajapur, Bodhgaya, Gaya, Bihar 824231
                </p>
              </div>
            </div>

            {/* Map Action */}
            <div className="pt-4 border-t border-border-gold/20 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-text-muted">GPS Coordinates: 24.6958° N, 84.9914° E (Rajapur, Bodhgaya)</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rajapur+Bodhgaya+Gaya+Bihar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-gold-primary hover:text-gold-accent transition-colors bg-gold-primary/10 hover:bg-gold-primary/20 px-3 py-1.5 rounded-lg border border-gold-primary/30"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </GlassCard>

          {/* Gayawal Partners Showcase */}
          <GlassCard borderGold className="lg:col-span-6 p-8 space-y-6 flex flex-col justify-between bg-surface/90">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 px-3 py-1 rounded-full border border-gold-primary/30 font-cinzel">
                <Users className="h-3.5 w-3.5" />
                VERIFIED GAYAWAL PUROHIT PARTNERS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gayawalPartners.map((partner, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-background/90 border border-gold-primary/30 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-gold-primary shrink-0">
                        <Image src={partner.image} alt={partner.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-cinzel text-text-primary">{partner.name}</h4>
                        <span className="text-[11px] text-gold-accent font-semibold block">{partner.lineage}</span>
                      </div>
                    </div>
                    <div className="text-xs text-text-secondary space-y-1 pt-2 border-t border-border-gold/20">
                      <p>📜 {partner.experience}</p>
                      <p>🏛️ {partner.panjiRecords}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border-gold/20 flex items-center justify-between text-xs font-semibold text-gold-primary">
              <span>✓ 150+ Years Documented History</span>
              <span>✓ 18,000+ Families Guided</span>
            </div>
          </GlassCard>
        </div>

        {/* 3. MULTILINGUAL SUPPORT (8 LANGUAGES) & 24x7 HOTLINE */}
        <GlassCard borderGold glow padding="lg" className="bg-gradient-to-r from-surface via-background to-surface space-y-8 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: 8 Supported Languages */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel">
                <Globe2 className="h-4 w-4" />
                <span>MULTILINGUAL CONCIERGE CARE</span>
              </div>

              <Heading size="lg" font="cinzel">
                Assistance in 8 Regional Languages
              </Heading>

              <Paragraph size="sm" variant="muted" className="leading-relaxed">
                Elders and families communicate comfortably with dedicated coordinators speaking their mother tongue:
              </Paragraph>

              {/* Language Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {supportedLanguages.map((lang, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-surface/90 border border-gold-primary/30 text-center space-y-0.5">
                    <span className="block text-xs font-bold text-gold-primary font-cinzel">{lang.name}</span>
                    <span className="block text-[11px] text-text-secondary font-serif">{lang.script}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 24x7 Emergency Contact Line */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-gold-primary/20 via-surface to-background border-2 border-gold-primary space-y-4 text-center">
              <div className="inline-flex p-4 rounded-full bg-gold-primary text-black font-bold shadow-gold-glow">
                <Phone className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-primary font-cinzel block">
                  24×7 PILGRIM EMERGENCY HOTLINE
                </span>
                <h4 className="text-xl font-bold font-cinzel text-text-primary">
                  Direct Station & Airport Assistance
                </h4>
              </div>

              <p className="text-xs text-text-muted">
                Immediate airport pickup coordination, train delays, or emergency medical support.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="tel:+918434457228" className="w-full sm:w-auto">
                  <PrimaryButton leftIcon={<Phone className="h-4 w-4" />} size="sm" className="w-full sm:w-auto">
                    Call Hotline: +91 84344 57228
                  </PrimaryButton>
                </a>
                <a
                  href="https://wa.me/918434457228?text=Namaste%20Pitraya%20Emergency%20Concierge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <SecondaryButton leftIcon={<MessageSquare className="h-4 w-4 text-emerald-400" />} size="sm" className="w-full sm:w-auto">
                    WhatsApp Support (+91 84344 57228)
                  </SecondaryButton>
                </a>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 4. VIDEO TESTIMONIALS HUB */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
              AUTHENTIC PILGRIM VOICES
            </span>
            <Heading size="xl" font="cinzel">
              Video Testimonials
            </Heading>
            <Paragraph size="md" variant="muted" className="max-w-xl mx-auto">
              Watch real families share their emotional reflections after completing their ancestral duty in Gaya.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((video) => (
              <GlassCard
                key={video.id}
                borderGold
                hoverEffect="lift"
                className="p-4 space-y-4 group cursor-pointer bg-surface/90"
                onClick={() => setActiveVideo(video)}
              >
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-gold-primary/30">
                  <Image src={video.videoPoster} alt={video.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-gold-primary text-black flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 fill-black ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-gold-primary border border-gold-primary/30">
                    {video.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gold-primary font-cinzel block">
                    {video.family} • {video.location}
                  </span>
                  <h4 className="text-sm font-bold font-cinzel text-text-primary line-clamp-1">
                    {video.title}
                  </h4>
                  <p className="text-xs text-text-muted italic line-clamp-2 font-serif">
                    &ldquo;{video.quote}&rdquo;
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* VIDEO MODAL SIMULATION */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-3xl rounded-2xl bg-surface border-2 border-gold-primary p-6 space-y-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-gold-primary/30 pb-3">
                  <div>
                    <h3 className="text-lg font-bold font-cinzel text-gold-primary">{activeVideo.title}</h3>
                    <p className="text-xs text-text-muted">{activeVideo.family} ({activeVideo.location})</p>
                  </div>
                  <button onClick={() => setActiveVideo(null)} className="p-2 rounded-full hover:bg-surface-hover text-text-primary">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-gold-primary/30 bg-black flex items-center justify-center">
                  <Image src={activeVideo.videoPoster} alt={activeVideo.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover opacity-60" />
                  <div className="relative z-10 text-center space-y-3 p-6">
                    <div className="h-16 w-16 mx-auto rounded-full bg-gold-primary text-black flex items-center justify-center shadow-gold-glow animate-pulse">
                      <Play className="h-8 w-8 fill-black ml-1" />
                    </div>
                    <p className="text-sm font-cinzel text-white max-w-md mx-auto italic">
                      &ldquo;{activeVideo.quote}&rdquo;
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gold-primary text-black">
                      Verified Video Testimonial
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
