"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  Users,
  Check,
  Calendar,
  Heart,
  MapPin,
  Camera,
  FileText,
  Lock,
  Compass,
  Flame,
  HelpCircle,
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
import GoldenParticles from "@/components/animations/GoldenParticles";
import OnlinePindDaanWizardModal from "./OnlinePindDaanWizardModal";
import { cn } from "@/lib/utils";

export default function OnlinePindDaanClient() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedPkgForWizard, setSelectedPkgForWizard] = useState<"essential" | "complete" | "family">("complete");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const openBookingWizard = (pkg: "essential" | "complete" | "family" = "complete") => {
    setSelectedPkgForWizard(pkg);
    setIsWizardOpen(true);
  };

  const openWhatsAppCoordinator = (customText?: string) => {
    const defaultMsg = "Namaste Pitraya! I am seeking guidance for booking Online Pind Daan in Gaya.";
    const text = encodeURIComponent(customText || defaultMsg);
    window.open(`https://wa.me/918434457228?text=${text}`, "_blank");
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const FAQS = [
    {
      q: "What is Online Pind Daan?",
      a: "Online Pind Daan is a service where Pitraya coordinates the authentic, physical ancestral rites in Gaya on your behalf through hereditary Gayawal Pandits, while you provide the required family details and participate through guided Sankalpa and updates remotely.",
    },
    {
      q: "Can I perform Pind Daan without travelling to Gaya?",
      a: "Yes. Hindu Shastras and the Garuda Purana allow for ancestral oblations to be performed by proxy or designated purohits when family members cannot physically travel due to health, distance, age, or international commitments, provided a solemn Sankalpa is recited with your family gotra.",
    },
    {
      q: "Who performs the ritual?",
      a: "The ritual is performed exclusively in Gaya by verified, hereditary Gayawal Pandits who hold traditional rights to conduct oblation rites at Vishnupad Sanctum, Falgu Ghat, and Akshayavat.",
    },
    {
      q: "Which places in Gaya are involved?",
      a: "Depending on your selected ritual package, rites may take place at Vishnupad Temple (Vishnu Footprint), the holy Phalgu River (for sacred Tarpan), and Akshayavat (the immortal banyan tree). The performing Pandit confirms the exact sequence based on your lineage traditions.",
    },
    {
      q: "What information do I need to provide?",
      a: "You need to provide the name of the deceased ancestor(s), relationship, family gotra (if known), name of the person performing the Sankalpa, preferred date, and contact details for sharing documentation.",
    },
    {
      q: "What if I don't know my Gotra?",
      a: "Don't worry. If your family Gotra is unknown, the universal Kashyap Gotra is invoked during the Vedic Sankalpa in strict adherence to Hindu scriptures, ensuring the ritual is spiritually 100% complete and valid.",
    },
    {
      q: "Can my family participate remotely?",
      a: "Yes. Your family coordinates remotely via WhatsApp and phone. Our team guides you through the sacred Sankalpa prayer from your home at the exact hour the Pandit begins the ceremony in Gaya.",
    },
    {
      q: "Will I receive photographs or videos?",
      a: "Yes. High-resolution ritual photographs are included in all packages. Video recordings of the Sankalpa, Pind Arpan, and Pandit blessings are included in the Complete and Family packages.",
    },
    {
      q: "Can I choose the ritual date?",
      a: "Yes. You can select any specific date, such as your ancestor's Punya Tithi (death anniversary), an upcoming Amavasya, Pitru Paksha, or the nearest auspicious Muhurat recommended by our Panchangam coordinator.",
    },
    {
      q: "Can I book on behalf of my parents or elder family members?",
      a: "Yes, children, grandchildren, or family representatives frequently arrange online Pind Daan on behalf of elder parents who are physically unable to undertake the pilgrimage journey to Gaya.",
    },
    {
      q: "What happens after payment?",
      a: "You immediately receive a Booking Reference ID (PR-XXXXXX) and automated confirmation. A dedicated Pitraya coordinator contacts you within 15 minutes on WhatsApp/Phone to verify gotra details and confirm the Pandit schedule.",
    },
    {
      q: "Can I reschedule my booking?",
      a: "Yes, you can request a date change up to 24 hours prior to the scheduled ceremony without any penalty by contacting your assigned coordinator.",
    },
    {
      q: "What happens if I need help during the booking?",
      a: "You can click 'Talk to a Pitraya Coordinator' or call our 24/7 Devotee Helpdesk at +91 84344 57228. Our team will assist you step-by-step.",
    },
    {
      q: "Is the ritual performed according to our family tradition?",
      a: "Ritual procedures can vary according to family tradition, regional lineage, and circumstances. Pitraya's coordinator helps collect your relevant family information and coordinates with the performing Gayawal Pandit regarding the appropriate traditional procedure.",
    },
  ];

  return (
    <HomePage>
      {/* ─── 7-STEP INTERACTIVE WIZARD MODAL ─────────────────────────── */}
      <OnlinePindDaanWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        initialPackage={selectedPkgForWizard}
      />

      {/* ─── 1. HERO SECTION — IMMEDIATE UNDERSTANDING ──────────────── */}
      <Section className="relative overflow-hidden bg-background pt-28 pb-20 text-text-primary border-b border-border/40">
        <GoldenParticles particleCount={20} />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[550px] w-[850px] -translate-x-1/2 rounded-full bg-gold-primary/10 blur-[180px]" />

        <Container size="xl" className="relative z-10 space-y-8 text-center">
          {/* Subtle Vedic Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-4 py-1.5 text-xs font-bold font-cinzel text-gold-primary uppercase tracking-widest"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-primary" />
            <span>Book Pind Daan in Gaya from anywhere</span>
          </motion.div>

          {/* Main Hero Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <Heading
              size="2xl"
              font="cinzel"
              className="leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Online Pind Daan in{" "}
              <GradientText variant="gold" font="cinzel">
                Sacred Gaya
              </GradientText>
            </Heading>

            <Paragraph
              size="lg"
              variant="muted"
              className="mx-auto max-w-2xl font-serif text-text-secondary leading-relaxed text-sm sm:text-base md:text-lg"
            >
              Perform the sacred ancestral rites at Gaya with guidance from experienced Gayawal Pandits — even when you cannot travel to Gaya yourself.
            </Paragraph>
          </div>

          {/* 3 Trust Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-surface/40 border border-gold-primary/20 backdrop-blur-sm flex items-center gap-3.5 text-left">
              <span className="text-2xl shrink-0">🙏</span>
              <div>
                <h4 className="text-xs font-bold font-cinzel text-white uppercase tracking-wider">Traditional Rituals</h4>
                <p className="text-[11px] text-text-muted">Performed according to established Vedic ritual practices</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface/40 border border-gold-primary/20 backdrop-blur-sm flex items-center gap-3.5 text-left">
              <span className="text-2xl shrink-0">📍</span>
              <div>
                <h4 className="text-xs font-bold font-cinzel text-white uppercase tracking-wider">Sacred Gaya Sites</h4>
                <p className="text-[11px] text-text-muted">Vishnupad, Phalgu River & appropriate holy spots</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface/40 border border-gold-primary/20 backdrop-blur-sm flex items-center gap-3.5 text-left">
              <span className="text-2xl shrink-0">📸</span>
              <div>
                <h4 className="text-xs font-bold font-cinzel text-white uppercase tracking-wider">Complete Assistance</h4>
                <p className="text-[11px] text-text-muted">Photos, videos & ritual updates shared with family</p>
              </div>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <PrimaryButton
              size="lg"
              onClick={() => openBookingWizard("complete")}
              className="font-cinzel shadow-gold-glow px-8 py-4 text-xs sm:text-sm font-bold tracking-wider"
            >
              Book Online Pind Daan →
            </PrimaryButton>

            <button
              onClick={scrollToHowItWorks}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 hover:bg-surface/80 px-6 py-4 text-xs font-bold font-cinzel text-text-secondary hover:text-white transition-all cursor-pointer"
            >
              <span>How It Works</span>
              <ChevronDown className="h-4 w-4 text-gold-primary" />
            </button>

            <button
              onClick={() => openWhatsAppCoordinator()}
              className="flex items-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/15 hover:bg-[#25D366]/25 px-6 py-4 text-xs font-bold text-emerald-400 transition-all cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>Talk to a Pitraya Coordinator</span>
            </button>
          </div>
        </Container>
      </Section>

      {/* ─── 2. QUICK ANSWER — "WHAT IS ONLINE PIND DAAN?" ───────────── */}
      <Section className="bg-surface/20 py-16 border-b border-border/30">
        <Container size="lg" className="space-y-10">
          <div className="text-center space-y-3">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Immediate Clarity
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              What is Online Pind Daan?
            </Heading>
          </div>

          <GlassCard borderGold glow className="p-6 sm:p-10 space-y-6 max-w-3xl mx-auto bg-surface/40">
            <Paragraph size="md" className="text-text-secondary font-serif leading-relaxed text-sm sm:text-base">
              Pind Daan is a sacred Hindu ancestral ritual performed to offer prayers and pindas in remembrance of departed ancestors. Gaya is traditionally regarded as the paramount pilgrimage center on earth for performing these holy rites.
            </Paragraph>

            <Paragraph size="md" className="text-text-secondary font-serif leading-relaxed text-sm sm:text-base">
              With Pitraya&apos;s online service, <strong className="text-gold-primary font-semibold">you do not have to travel to Gaya to coordinate the ritual yourself.</strong> Pitraya coordinates the physical ancestral ritual in Gaya on your behalf while you provide the required family details and receive assistance and updates remotely.
            </Paragraph>

            {/* Simple Visual Flowchart */}
            <div className="pt-4 border-t border-border/50">
              <span className="text-[11px] font-cinzel font-bold text-text-muted block mb-4 text-center uppercase tracking-wider">
                How Your Sacred Intent Travels to Gaya
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-surface/80 border border-border/60 flex flex-col items-center justify-center">
                  <span className="text-lg mb-1">👨‍👩‍👧</span>
                  <span className="font-bold text-white">You</span>
                  <span className="text-[10px] text-text-muted mt-0.5">Family Details</span>
                </div>

                <div className="hidden sm:flex items-center justify-center text-gold-primary font-bold">→</div>

                <div className="p-3 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex flex-col items-center justify-center">
                  <span className="text-lg mb-1">🔱</span>
                  <span className="font-bold text-gold-primary">Pitraya</span>
                  <span className="text-[10px] text-text-muted mt-0.5">Coordinator Desk</span>
                </div>

                <div className="hidden sm:flex items-center justify-center text-gold-primary font-bold">→</div>

                <div className="p-3 rounded-xl bg-surface/80 border border-border/60 flex flex-col items-center justify-center">
                  <span className="text-lg mb-1">🙏</span>
                  <span className="font-bold text-white">Gayawal Pandit</span>
                  <span className="text-[10px] text-text-muted mt-0.5">Sacred Gaya Rites</span>
                </div>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-400 font-serif">
                ✨ Physical ritual performed at Vishnupad Sanctum • Complete video & photo documentation delivered to your family.
              </div>
            </div>
          </GlassCard>
        </Container>
      </Section>

      {/* ─── 3. HOW ONLINE PIND DAAN WORKS (6 STEPS) ────────────────── */}
      <Section id="how-it-works-section" className="bg-background py-20 border-b border-border/40">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Step-by-Step Transparency
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              How Online Pind Daan Works
            </Heading>
            <Paragraph size="sm" variant="muted" className="font-serif">
              A smooth, spiritually sound process designed to give your family complete peace of mind.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 relative hover:border-gold-primary/40 transition-all">
              <span className="font-cinzel text-3xl font-black text-gold-primary/30">01</span>
              <h3 className="font-cinzel text-base font-bold text-white">Choose Your Ritual</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-serif">
                Select the Pind Daan package that suits your family&apos;s requirements. Pick your preferred tithi or let our coordinator suggest an auspicious Muhurat.
              </p>
              <div className="text-[11px] font-mono text-gold-primary pt-1">
                Choose date → Select package → Enter details
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 relative hover:border-gold-primary/40 transition-all">
              <span className="font-cinzel text-3xl font-black text-gold-primary/30">02</span>
              <h3 className="font-cinzel text-base font-bold text-white">Provide Family Details</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-serif">
                Provide required details about the ancestor: Name, Gotra (if known), relationship, and contact details for communication.
              </p>
              <div className="p-2.5 rounded-lg bg-gold-primary/10 border border-gold-primary/20 text-[11px] text-gold-primary font-serif">
                💛 Don&apos;t know your Gotra or ritual details? Don&apos;t worry. Our coordinator will guide you.
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 relative hover:border-gold-primary/40 transition-all">
              <span className="font-cinzel text-3xl font-black text-gold-primary/30">03</span>
              <h3 className="font-cinzel text-base font-bold text-white">Confirm Your Booking</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-serif">
                Complete your online reservation securely. You instantly receive your unique <strong className="text-white font-mono">Booking ID (PR-XXXXXX)</strong> with confirmation sent through WhatsApp, Email, and SMS.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 relative hover:border-gold-primary/40 transition-all">
              <span className="font-cinzel text-3xl font-black text-gold-primary/30">04</span>
              <h3 className="font-cinzel text-base font-bold text-white">Pitraya Coordinates Ritual</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-serif">
                Your booking is assigned to a dedicated Gaya ritual desk. The team arranges sacred samagri, locks the holy altar at Vishnupad, and verifies your family Sankalpa.
              </p>
            </div>

            {/* Step 05 */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 relative hover:border-gold-primary/40 transition-all">
              <span className="font-cinzel text-3xl font-black text-gold-primary/30">05</span>
              <h3 className="font-cinzel text-base font-bold text-white">Ritual Performed in Gaya</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-serif">
                The Pind Daan is conducted by hereditary Gayawal Pandits at the sacred pilgrimage points with full Vedic mantra recitation on behalf of your family.
              </p>
            </div>

            {/* Step 06 */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 relative hover:border-gold-primary/40 transition-all">
              <span className="font-cinzel text-3xl font-black text-gold-primary/30">06</span>
              <h3 className="font-cinzel text-base font-bold text-white">Receive Documentation</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-serif">
                After completion, receive high-resolution ritual photos, video updates where included, official ritual confirmation certificate, and Pandit&apos;s blessings.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <PrimaryButton
              size="lg"
              onClick={() => openBookingWizard("complete")}
              className="font-cinzel shadow-gold-glow px-8 py-3.5 text-xs font-bold"
            >
              Start Your Booking Now →
            </PrimaryButton>
          </div>
        </Container>
      </Section>

      {/* ─── 4. WHAT ACTUALLY HAPPENS DURING PIND DAAN? ──────────────── */}
      <Section className="bg-surface/20 py-20 border-b border-border/40">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Vedic Sequence
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              What Actually Happens During Pind Daan?
            </Heading>
            <Paragraph size="sm" variant="muted" className="font-serif">
              The sacred 6-stage timeline followed by Gayawal Pandits in Gaya.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Sankalp",
                desc: "A sacred resolve is taken invoking your family lineage, Gotra, and names of departed ancestors.",
              },
              {
                step: "02",
                title: "Pind Preparation",
                desc: "Pindas (sacred balls) are prepared using barley flour (jau), black sesame (til), milk, honey, and sacred water.",
              },
              {
                step: "03",
                title: "Pind Daan",
                desc: "The consecrated pindas are offered reverently at the sacred footprints of Lord Vishnu as prescribed in scriptures.",
              },
              {
                step: "04",
                title: "Tarpan",
                desc: "Sacred water and sesame libations are offered with specific Vedic mantras to quench the spiritual thirst of ancestors.",
              },
              {
                step: "05",
                title: "Pitra Smaran & Prayers",
                desc: "The family remembers their ancestors with gratitude and prayers for their ultimate liberation and peace.",
              },
              {
                step: "06",
                title: "Completion & Blessings",
                desc: "Concluding prayers, Brahmin dakshina, and sacred blessings are completed for peace and family prosperity.",
              },
            ].map((stage, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface/40 border border-border/60 hover:border-gold-primary/40 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-2xl font-black text-gold-primary">{stage.step}</span>
                  <Flame className="h-4 w-4 text-gold-primary/60" />
                </div>
                <h4 className="font-cinzel text-base font-bold text-white">{stage.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed font-serif">{stage.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── 5. "WHAT DO I NEED TO PROVIDE?" ─────────────────────────── */}
      <Section className="bg-background py-16 border-b border-border/40">
        <Container size="lg" className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Preparation Checklist
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              What Information Do I Need to Provide?
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Family Info */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3">
              <div className="flex items-center gap-2 text-gold-primary font-cinzel font-bold text-sm">
                <Users className="h-4 w-4" />
                <span>Family Information</span>
              </div>
              <ul className="text-xs text-text-secondary space-y-2 font-serif list-disc pl-4">
                <li>Name of person performing ritual</li>
                <li>Family / Gotra information (if known)</li>
                <li>WhatsApp & Email for updates</li>
              </ul>
            </div>

            {/* Ancestor Info */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3">
              <div className="flex items-center gap-2 text-gold-primary font-cinzel font-bold text-sm">
                <Heart className="h-4 w-4" />
                <span>Ancestor Information</span>
              </div>
              <ul className="text-xs text-text-secondary space-y-2 font-serif list-disc pl-4">
                <li>Name of the deceased ancestor(s)</li>
                <li>Relationship to the performer</li>
                <li>Relevant family details or wishes</li>
              </ul>
            </div>

            {/* Booking Info */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3">
              <div className="flex items-center gap-2 text-gold-primary font-cinzel font-bold text-sm">
                <Calendar className="h-4 w-4" />
                <span>Booking Information</span>
              </div>
              <ul className="text-xs text-text-secondary space-y-2 font-serif list-disc pl-4">
                <li>Preferred ritual date or tithi</li>
                <li>Number of family participants</li>
                <li>Any special Gotra guidance needs</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gold-primary/10 border border-gold-primary/30 max-w-2xl mx-auto text-center text-xs text-text-secondary font-serif">
            <span className="font-semibold text-gold-primary">Not sure what information is required?</span> Our Pitraya coordinator will guide you step-by-step before the ritual.
          </div>
        </Container>
      </Section>

      {/* ─── 6. CAN MY FAMILY PARTICIPATE FROM HOME? ─────────────────── */}
      <Section className="bg-surface/20 py-20 border-b border-border/40">
        <Container size="lg" className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Remote Participation
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              Can My Family Participate From Home?
            </Heading>
            <Paragraph size="md" className="text-gold-primary font-serif font-semibold">
              Yes, where supported by your selected ritual arrangement.
            </Paragraph>
          </div>

          <GlassCard className="p-8 space-y-6 max-w-3xl mx-auto bg-surface/50 border-gold-primary/30">
            <Paragraph size="sm" className="text-text-secondary font-serif leading-relaxed">
              Your family can coordinate with Pitraya remotely while the physical ritual is conducted in Gaya. Depending on the package selected, participation may include:
            </Paragraph>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
              <div className="p-3.5 rounded-xl bg-surface/80 border border-border flex items-center gap-3">
                <span className="text-lg">📱</span>
                <div>
                  <strong className="text-white block">WhatsApp Coordination</strong>
                  <span className="text-text-muted">Real-time status alerts & timings</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/80 border border-border flex items-center gap-3">
                <span className="text-lg">🙏</span>
                <div>
                  <strong className="text-white block">Sankalp Guidance</strong>
                  <span className="text-text-muted">Chant along from home at the appointed hour</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/80 border border-border flex items-center gap-3">
                <span className="text-lg">📸</span>
                <div>
                  <strong className="text-white block">Ritual Photographs</strong>
                  <span className="text-text-muted">High-res photos of your family pinda offerings</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/80 border border-border flex items-center gap-3">
                <span className="text-lg">🎥</span>
                <div>
                  <strong className="text-white block">Video Updates</strong>
                  <span className="text-text-muted">Recorded video clips of Sankalp & ceremonies</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-border/40 text-[11px] text-text-muted italic text-center">
              Note: We provide reliable recorded video updates and photographic logs to avoid connectivity interruptions inside ancient stone sanctums where live cellular signals are restricted.
            </div>
          </GlassCard>
        </Container>
      </Section>

      {/* ─── 7. WHERE IS THE RITUAL PERFORMED? ───────────────────────── */}
      <Section className="bg-background py-20 border-b border-border/40">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Sacred Geography
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              Sacred Places of Gaya
            </Heading>
            <Paragraph size="sm" variant="muted" className="font-serif">
              Depending on the ritual and traditional requirements, rites may involve sacred places such as:
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 text-left">
              <div className="h-10 w-10 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white">Vishnupad Temple</h3>
              <p className="text-xs text-text-muted font-serif leading-relaxed">
                A central pilgrimage site associated with Gaya&apos;s ancestral rites, where Lord Vishnu&apos;s immortal footprint (Charan Chinha) is permanently enshrined.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 text-left">
              <div className="h-10 w-10 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-emerald-400">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white">Phalgu River</h3>
              <p className="text-xs text-text-muted font-serif leading-relaxed">
                An important sacred setting for ancestral water oblations (Tarpan) and offerings, celebrated in the Ramayana as the river where Mata Sita offered Pinda Daan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface/30 border border-gold-primary/20 space-y-3 text-left">
              <div className="h-10 w-10 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-amber-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white">Akshayavat</h3>
              <p className="text-xs text-text-muted font-serif leading-relaxed">
                A revered eternal banyan tree associated with ancestral traditions where concluding blessings are sought for the everlasting peace of departed souls.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface/40 border border-border/60 max-w-2xl mx-auto text-center text-xs text-text-muted font-serif">
            The exact location and sequence are determined according to the selected ritual and guidance of the performing Gayawal Pandit.
          </div>
        </Container>
      </Section>

      {/* ─── 8. WHO PERFORMS THE RITUAL? ─────────────────────────────── */}
      <Section className="bg-surface/20 py-20 border-b border-border/40">
        <Container size="lg" className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Lineage Authenticity
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              Your Ritual. Guided by Tradition.
            </Heading>
            <Paragraph size="sm" variant="muted" className="font-serif max-w-2xl mx-auto">
              With Pitraya, your booking is coordinated directly with experienced Gayawal Pandits in Gaya.
            </Paragraph>
          </div>

          <div className="p-8 rounded-2xl bg-surface/40 border border-gold-primary/30 max-w-3xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif text-text-secondary">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Experienced Gayawal Pandit:</strong> Hereditary priests of Vishnupad.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Traditional Ritual Guidance:</strong> Strict adherence to Vedic scriptures.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Pitraya Coordinator:</strong> 1-on-1 dedicated assistance for your family.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Transparent Communication:</strong> Timely photos and clear updates.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gold-primary/10 border border-gold-primary/20 text-xs text-text-secondary font-serif">
              💡 We respect your family&apos;s faith. We avoid exaggerated claims and focus on genuine, meticulous coordination with verified Gayawal Purohits in Gaya.
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 9. PACKAGES — CHOOSE YOUR PIND DAAN ──────────────────────── */}
      <Section className="bg-background py-20 border-b border-border/40">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Clear & Transparent Pricing
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              Choose Your Pind Daan Package
            </Heading>
            <Paragraph size="sm" variant="muted" className="font-serif">
              All-inclusive dakshina covering Pandit coordination, puja samagri, and complete documentation.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Essential Package */}
            <div className="p-8 rounded-2xl bg-surface/30 border border-border hover:border-gold-primary/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-cinzel font-bold text-text-muted uppercase tracking-wider">🌿 Essential</span>
                  <h3 className="font-cinzel text-xl font-bold text-white">Essential Arrangement</h3>
                  <p className="text-xs text-text-muted font-serif">For families seeking a simple guided ancestral ritual.</p>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <span className="text-3xl font-bold font-cinzel text-gold-primary">₹11,000</span>
                  <span className="text-[11px] text-text-muted block">All-inclusive ritual arrangement</span>
                </div>

                <ul className="text-xs text-text-secondary space-y-2.5 font-serif pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Pandit coordination at Vishnupad</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Required sacred ritual samagri</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Family Sankalpa recitation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>High-res ritual photographs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Digital booking confirmation</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openBookingWizard("essential")}
                className="w-full py-3 rounded-xl border border-gold-primary/40 bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary font-cinzel font-bold text-xs transition-all cursor-pointer"
              >
                Choose Essential →
              </button>
            </div>

            {/* Complete Package (Most Popular) */}
            <div className="p-8 rounded-2xl bg-surface/60 border-2 border-gold-primary relative shadow-gold-glow/20 flex flex-col justify-between space-y-6">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-black font-cinzel font-extrabold text-[10px] uppercase tracking-widest">
                🪔 Most Selected Arrangement
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <span className="text-xs font-cinzel font-bold text-gold-primary uppercase tracking-wider">🪔 Complete</span>
                  <h3 className="font-cinzel text-xl font-bold text-white">Complete Sanctum Rites</h3>
                  <p className="text-xs text-text-muted font-serif">Our most popular arrangement covering multiple sacred sites.</p>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <span className="text-3xl font-bold font-cinzel text-gold-primary">₹21,000</span>
                  <span className="text-[11px] text-text-muted block">All-inclusive multi-site arrangement</span>
                </div>

                <ul className="text-xs text-text-secondary space-y-2.5 font-serif pt-2">
                  <li className="flex items-center gap-2 font-semibold text-white">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Everything in Essential</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Multi-site rites (Vishnupad + Phalgu River)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Recorded video updates of Sankalpa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Dedicated senior lineage coordinator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Pandit&apos;s blessings & completion certificate</span>
                  </li>
                </ul>
              </div>

              <PrimaryButton
                size="lg"
                onClick={() => openBookingWizard("complete")}
                className="w-full font-cinzel font-bold text-xs shadow-gold-glow"
              >
                Book Complete Arrangement →
              </PrimaryButton>
            </div>

            {/* Family Package */}
            <div className="p-8 rounded-2xl bg-surface/30 border border-border hover:border-gold-primary/40 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-cinzel font-bold text-text-muted uppercase tracking-wider">👑 Family Lineage</span>
                  <h3 className="font-cinzel text-xl font-bold text-white">Family Lineage Rites</h3>
                  <p className="text-xs text-text-muted font-serif">For larger families & multiple ancestral gotras.</p>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <span className="text-3xl font-bold font-cinzel text-gold-primary">₹31,000</span>
                  <span className="text-[11px] text-text-muted block">Multi-ancestor comprehensive rites</span>
                </div>

                <ul className="text-xs text-text-secondary space-y-2.5 font-serif pt-2">
                  <li className="flex items-center gap-2 font-semibold text-white">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Everything in Complete</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Tri-Sanctum rites (Vishnupad, Phalgu, Akshayavat)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Multiple gotras & extended ancestors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Priority Gayawal Purohit scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Comprehensive archival video logs</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openBookingWizard("family")}
                className="w-full py-3 rounded-xl border border-gold-primary/40 bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary font-cinzel font-bold text-xs transition-all cursor-pointer"
              >
                Choose Family Lineage →
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 10. TRUST & TRANSPARENCY SECTION ────────────────────────── */}
      <Section className="bg-surface/20 py-20 border-b border-border/40">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Our Core Principles
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              Why Families Choose Pitraya
            </Heading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-6 rounded-2xl bg-surface/40 border border-border/60 text-center space-y-2.5">
              <span className="text-2xl block">🪔</span>
              <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Tradition</h4>
              <p className="text-[11px] text-text-muted font-serif">Respect for established ancestral traditions & scriptures.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface/40 border border-border/60 text-center space-y-2.5">
              <span className="text-2xl block">🙏</span>
              <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Human Guidance</h4>
              <p className="text-[11px] text-text-muted font-serif">Real coordinator assistance rather than an automated booking alone.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface/40 border border-border/60 text-center space-y-2.5">
              <span className="text-2xl block">📍</span>
              <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Gaya-Based</h4>
              <p className="text-[11px] text-text-muted font-serif">Ritual arrangements coordinated physically in Gaya.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface/40 border border-border/60 text-center space-y-2.5">
              <span className="text-2xl block">📸</span>
              <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Transparency</h4>
              <p className="text-[11px] text-text-muted font-serif">Clear communication & prompt documentation.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface/40 border border-border/60 text-center space-y-2.5">
              <span className="text-2xl block">🔒</span>
              <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">Secure Booking</h4>
              <p className="text-[11px] text-text-muted font-serif">Your personal and family information is handled securely.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 11. FREQUENTLY ASKED QUESTIONS (14 ACCORDIONS) ──────────── */}
      <Section className="bg-background py-20 border-b border-border/40">
        <Container size="lg" className="space-y-10">
          <div className="text-center space-y-3">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Addressing Your Doubts
            </span>
            <Heading size="2xl" font="cinzel" className="text-white">
              Frequently Asked Questions
            </Heading>
            <Paragraph size="sm" variant="muted" className="font-serif">
              Clear, authentic answers to help you make an informed and faithful decision.
            </Paragraph>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/60 bg-surface/30 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-4 text-xs sm:text-sm font-cinzel font-bold text-white hover:text-gold-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gold-primary transition-transform duration-200 shrink-0",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-text-muted font-serif leading-relaxed border-t border-border/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── 12. FINAL EMOTIONAL CTA ─────────────────────────────────── */}
      <Section className="bg-gradient-to-b from-surface/40 to-background py-24 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gold-primary/5 blur-[120px]" />
        <Container size="md" className="relative z-10 space-y-6">
          <Heading size="2xl" font="cinzel" className="text-white sm:text-4xl">
            Fulfil Your Ancestral Duty With Faith.
          </Heading>

          <Paragraph size="md" variant="muted" className="max-w-xl mx-auto font-serif text-text-secondary">
            When distance keeps you away from Gaya, Pitraya helps you remain connected to the sacred tradition.
          </Paragraph>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <PrimaryButton
              size="lg"
              onClick={() => openBookingWizard("complete")}
              className="font-cinzel shadow-gold-glow px-9 py-4 text-sm font-bold"
            >
              Book Online Pind Daan →
            </PrimaryButton>

            <button
              onClick={() => openWhatsAppCoordinator()}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-7 py-4 text-xs font-bold font-cinzel text-text-secondary hover:text-white transition-all cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>Talk to a Pitraya Coordinator</span>
            </button>
          </div>
        </Container>
      </Section>

      {/* ─── 13. MOBILE STICKY BOTTOM BAR ────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#110f0c]/95 border-t border-gold-primary/30 p-3 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] uppercase font-bold text-text-muted block">From</span>
          <span className="text-sm font-bold font-cinzel text-gold-primary">₹11,000</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openWhatsAppCoordinator()}
            aria-label="WhatsApp coordinator"
            className="p-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366]"
          >
            <MessageCircle className="h-4 w-4" />
          </button>

          <PrimaryButton
            size="sm"
            onClick={() => openBookingWizard("complete")}
            className="font-cinzel text-xs font-bold px-4 py-2.5 shadow-gold-glow"
          >
            Book Online Pind Daan →
          </PrimaryButton>
        </div>
      </div>
    </HomePage>
  );
}
