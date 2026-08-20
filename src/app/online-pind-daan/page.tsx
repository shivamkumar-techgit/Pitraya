"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Video,
  Globe,
  Award,
  Clock,
  ShieldCheck,
  Package,
  Phone,
  MessageCircle,
  ArrowRight,
  Star,
  Users,
  Check,
} from "lucide-react";
import HomePage from "@/components/layout/HomePage";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import BookingWizardModal from "@/components/booking/BookingWizardModal";
import GoldenParticles from "@/components/animations/GoldenParticles";

export default function OnlinePindDaanPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <HomePage>
      {/* BOOKING WIZARD MODAL */}
      <BookingWizardModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageId="online-pind-daan"
      />

      {/* ─── 1. HERO SECTION ───────────────────────────────────────── */}
      <Section className="text-text-primary relative overflow-hidden bg-background pt-28 pb-20">
        <GoldenParticles particleCount={25} />
        <div className="bg-gold-primary/10 pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[180px]" />

        <Container size="xl" className="relative z-10 space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gold-primary/15 border-gold-primary/30 text-gold-primary font-cinzel inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <span>NRI & Remote Devotee Special • Worldwide Access</span>
          </motion.div>

          <Heading
            size="2xl"
            font="cinzel"
            className="mx-auto max-w-4xl leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Online Pind Daan & Live Video Rites at{" "}
            <GradientText variant="gold" font="cinzel">
              Vishnupad Gaya
            </GradientText>
          </Heading>

          <Paragraph
            size="lg"
            variant="muted"
            className="text-text-secondary mx-auto max-w-3xl font-serif italic"
          >
            &quot;Distance should never come between a family and their
            ancestral obligations. Perform authentic Vedic Pind Daan remotely
            with live video streaming by hereditary Gayawal Purohits.&quot;
          </Paragraph>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <PrimaryButton
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="font-cinzel shadow-gold-glow px-8 py-4 text-sm font-bold tracking-wider"
            >
              <Video className="mr-2 h-4 w-4" />
              Book Online Ritual (Starting ₹3,100)
            </PrimaryButton>

            <button
              onClick={() => {
                const waMsg = encodeURIComponent(
                  "Namaste! I am an NRI / Out-of-station devotee inquiring about Online Pind Daan with Live Video Call."
                );
                window.open(
                  `https://wa.me/918434457228?text=${waMsg}`,
                  "_blank"
                );
              }}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#25D366]/50 bg-[#25D366]/20 px-6 py-4 text-xs font-bold text-white transition-all hover:bg-[#25D366]/30"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>WhatsApp NRI Concierge</span>
            </button>
          </div>

          {/* Quick Metrics Badge Bar */}
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 pt-12 md:grid-cols-4">
            {[
              { label: "Families Served", value: "2,400+ Remote Rites" },
              { label: "Video Quality", value: "HD Live Stream" },
              { label: "Prasad Delivery", value: "Worldwide Courier" },
              { label: "Priest Verification", value: "Hereditary Gayawals" },
            ].map((metric, i) => (
              <div
                key={i}
                className="bg-surface/50 border-gold-primary/20 rounded-2xl border p-4 backdrop-blur-md"
              >
                <p className="text-gold-primary font-cinzel text-sm font-bold">
                  {metric.value}
                </p>
                <p className="text-text-muted text-[11px]">{metric.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── 2. INCLUSIONS GRID ───────────────────────────────────── */}
      <Section className="bg-surface/30 border-border-gold/20 border-t py-16">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 text-center">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              What is Included
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              Complete Online Pind Daan Package (₹3,100)
            </Heading>
            <Paragraph size="sm" variant="muted" className="mx-auto max-w-2xl">
              Everything required for a reverent, authentic, and complete remote
              ancestral oblation.
            </Paragraph>
          </div>

          <Grid cols={3} gap="lg">
            {[
              {
                icon: <ShieldCheck className="text-gold-primary h-6 w-6" />,
                title: "Verified Gayawal Pandit",
                desc: "Hereditary priest possessing ancestral rights to perform rites at Vishnupad.",
              },
              {
                icon: <Video className="h-6 w-6 text-emerald-400" />,
                title: "Live Interactive Video Call",
                desc: "Participate in real-time via WhatsApp, Zoom, or Google Meet video streaming.",
              },
              {
                icon: <Sparkles className="text-gold-primary h-6 w-6" />,
                title: "Gotra & Ancestor Sankalpa",
                desc: "Solemn chanting of your family lineage, Gotra, and departed ancestors' names.",
              },
              {
                icon: <Award className="text-gold-primary h-6 w-6" />,
                title: "Vishnupad & Falgu Rites",
                desc: "Pindas offered directly at Vishnupad Sanctum and sacred Falgu River banks.",
              },
              {
                icon: <Package className="text-gold-primary h-6 w-6" />,
                title: "Digital Video & HD Photos",
                desc: "Receive high-definition video recordings and ceremony photos for your records.",
              },
              {
                icon: <Globe className="text-gold-primary h-6 w-6" />,
                title: "Courier Prasad & Certificate",
                desc: "Blessed Prasad, Raksha Sutra, and lineage certificate shipped to your home.",
              },
            ].map((item, idx) => (
              <GlassCard
                key={idx}
                className="border-gold-primary/30 space-y-3 p-6"
              >
                <div className="border-gold-primary/30 w-fit rounded-xl border bg-surface p-3">
                  {item.icon}
                </div>
                <h3 className="font-cinzel text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  {item.desc}
                </p>
              </GlassCard>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ─── 3. HOW IT WORKS ─────────────────────────────────────── */}
      <Section className="border-border-gold/20 border-t bg-muted py-16">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3 text-center">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Simple 4-Step Process
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              How Remote Pind Daan Works
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Book Online",
                desc: "Select your preferred date and submit primary contact details.",
              },
              {
                step: "02",
                title: "Share Lineage Details",
                desc: "Provide ancestor names, Gotra, and specific Sankalpa wishes.",
              },
              {
                step: "03",
                title: "Join Live Video",
                desc: "Connect via live video call as the Pandit chants Sankalpa & offers Pindas.",
              },
              {
                step: "04",
                title: "Receive Prasad",
                desc: "Get HD video recording & Prasad delivered directly to your doorstep.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-surface/50 border-gold-primary/30 relative space-y-3 rounded-2xl border p-6"
              >
                <span className="font-cinzel text-gold-primary/40 block text-3xl font-black">
                  {s.step}
                </span>
                <h4 className="font-cinzel text-base font-bold text-white">
                  {s.title}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 text-center">
            <PrimaryButton
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="font-cinzel shadow-gold-glow px-10 py-4 text-sm font-bold"
            >
              Start Online Booking Now →
            </PrimaryButton>
          </div>
        </Container>
      </Section>
    </HomePage>
  );
}
