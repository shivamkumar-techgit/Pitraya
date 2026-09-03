"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  ChevronDown,
  Check,
  ArrowRight,
} from "lucide-react";
import HomePage from "@/components/layout/HomePage";
import OnlinePindDaanWizardModal from "./OnlinePindDaanWizardModal";
import { cn } from "@/lib/utils";

// ─── ANIMATION HELPERS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
    },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: "essential" as const,
    emoji: "🌿",
    name: "Essential",
    price: "₹5,100",
    subtitle: "Simple guided ritual",
    features: [
      "Pandit coordination at Vishnupad",
      "Sacred ritual samagri & pindas",
      "Family Gotra Sankalpa recitation",
      "High-resolution ritual photographs",
      "Digital booking confirmation & ID",
      "WhatsApp coordinator support",
    ],
    highlight: false,
  },
  {
    id: "complete" as const,
    emoji: "🪔",
    name: "Complete",
    price: "₹5,100",
    subtitle: "Most selected arrangement",
    features: [
      "All of Essential, plus:",
      "Multi-site rites — Vishnupad + Phalgu River",
      "Recorded video clips of Sankalpa & rites",
      "Dedicated senior lineage coordinator",
      "Pandit blessings & completion certificate",
      "Priority scheduling & confirmation",
    ],
    highlight: true,
  },
  {
    id: "family" as const,
    emoji: "👑",
    name: "Family Lineage",
    price: "₹5,100",
    subtitle: "Multi-ancestor extended rites",
    features: [
      "All of Complete, plus:",
      "Tri-Sanctum — Vishnupad, Phalgu & Akshayavat",
      "Multiple gotras & extended ancestors",
      "Priority Gayawal Purohit scheduling",
      "Comprehensive archival video documentation",
      "Family ritual guidance consultation",
    ],
    highlight: false,
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Choose & Book",
    desc: "Select your preferred package and pick a date, or let us recommend an auspicious Muhurat.",
  },
  {
    n: "02",
    title: "Share Details",
    desc: "Provide ancestor name, gotra (if known) and relationship. Do not know Gotra? We will guide you.",
  },
  {
    n: "03",
    title: "Confirmation",
    desc: "Receive your Booking ID (PR-XXXXXX) instantly via WhatsApp, Email and SMS.",
  },
  {
    n: "04",
    title: "Pitraya Arranges",
    desc: "Coordinator schedules the Pandit, sacred samagri and ritual timing in Gaya.",
  },
  {
    n: "05",
    title: "Ritual in Gaya",
    desc: "Hereditary Gayawal Purohit performs authentic Pind Daan at Vishnupad with full Vedic mantras.",
  },
  {
    n: "06",
    title: "You Receive",
    desc: "Photos, video updates, ritual certificate and Pandit blessings delivered to your family.",
  },
];

const RITUAL_STAGES = [
  {
    icon: "🔔",
    title: "Sankalp",
    desc: "Sacred resolve invoking family lineage, Gotra and departed ancestors names.",
  },
  {
    icon: "🌾",
    title: "Pind Preparation",
    desc: "Pindas prepared with barley flour, black sesame, milk, honey and Ganga water.",
  },
  {
    icon: "🙏",
    title: "Pind Daan",
    desc: "Pindas offered at Lord Vishnu sacred footprint per Vedic scripture.",
  },
  {
    icon: "💧",
    title: "Tarpan",
    desc: "Water and sesame libations with specific mantras to bless departed ancestors.",
  },
  {
    icon: "❤️",
    title: "Pitra Smaran",
    desc: "Family remembers ancestors with gratitude, prayers for peace and liberation.",
  },
  {
    icon: "✨",
    title: "Completion",
    desc: "Concluding prayers, Brahmin dakshina, Pandit blessings for family prosperity.",
  },
];

const FAQS = [
  {
    q: "What is Online Pind Daan?",
    a: "Pitraya coordinates the authentic, physical ancestral rites in Gaya on your behalf through hereditary Gayawal Pandits. You provide family details and receive photographic and video documentation remotely — the physical ritual is fully performed in Gaya.",
  },
  {
    q: "Is this ritually valid according to Hindu scripture?",
    a: "Yes. The Garuda Purana and Vedic tradition allow ancestral oblations performed by proxy or designated purohits when family members cannot physically travel, provided a solemn Sankalpa is recited with the correct family gotra.",
  },
  {
    q: "What if I do not know my Gotra?",
    a: "Do not worry. If your family Gotra is unknown, the universal Kashyap Gotra is invoked during the Vedic Sankalpa — a practice fully sanctioned in Hindu scriptures, ensuring the ritual is 100% spiritually complete and valid.",
  },
  {
    q: "Who actually performs the ritual in Gaya?",
    a: "Verified hereditary Gayawal Pandits — priests who hold traditional ancestral rights to conduct oblation rites at Vishnupad Sanctum, Phalgu Ghat and Akshayavat in Gaya.",
  },
  {
    q: "Will I receive photos and videos?",
    a: "High-resolution ritual photographs are included in all packages. Video recordings of the Sankalpa, Pind Arpan and Pandit blessings are included in the Complete and Family Lineage packages.",
  },
  {
    q: "Can I choose a specific ritual date?",
    a: "Yes — you can choose your ancestor Punya Tithi, an upcoming Amavasya, Pitru Paksha, or let our Panchangam coordinator recommend the nearest auspicious Muhurat.",
  },
  {
    q: "What happens after payment?",
    a: "You instantly receive a Booking Reference ID (PR-XXXXXX). A dedicated Pitraya coordinator contacts you within 15 minutes on WhatsApp and Phone to verify gotra details and confirm the Pandit schedule.",
  },
  {
    q: "Can I reschedule?",
    a: "Yes — date changes can be requested up to 24 hours before the scheduled ceremony without any additional charge by contacting your assigned coordinator.",
  },
  {
    q: "Can someone book on behalf of elderly parents?",
    a: "Yes, children, grandchildren or family representatives frequently arrange online Pind Daan on behalf of elder parents who are physically unable to undertake the Gaya pilgrimage journey.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes, you receive an official ritual completion certificate confirming the rites were performed with your ancestor name and the coordinating Purohit verification — included in the Complete and Family Lineage packages.",
  },
];

const TRUST_PILLARS = [
  {
    icon: "🪔",
    title: "Vedic Tradition",
    desc: "Strict adherence to established ancestral practices.",
  },
  {
    icon: "🧭",
    title: "Human Guidance",
    desc: "Real coordinator — not just an automated booking.",
  },
  {
    icon: "📍",
    title: "Gaya-Coordinated",
    desc: "Ritual physically arranged in Gaya by our local team.",
  },
  {
    icon: "📸",
    title: "Transparency",
    desc: "Photographic and video documentation delivered promptly.",
  },
  {
    icon: "🔒",
    title: "Secure Booking",
    desc: "Your family details handled with complete privacy.",
  },
  {
    icon: "⚡",
    title: "15-Min Response",
    desc: "Coordinator contacts you within 15 minutes of booking.",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function OnlinePindDaanClient() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<
    "essential" | "complete" | "family"
  >("complete");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openWizard = (
    pkg: "essential" | "complete" | "family" = "complete"
  ) => {
    setSelectedPkg(pkg);
    setIsWizardOpen(true);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Namaste Pitraya! I want to book Online Pind Daan in Gaya. Please guide me."
    );
    window.open(`https://wa.me/918434457228?text=${text}`, "_blank");
  };

  // ─── GOLD GRADIENT ──────────────────────────────────────────────────────────
  const goldGrad = "linear-gradient(135deg,#d4af37,#f5e19c 50%,#b8860b)";

  return (
    <HomePage>
      {/* Booking Modal */}
      <OnlinePindDaanWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        initialPackage={selectedPkg}
      />

      {/* ════════════════════════════════════════════════════════════════════
          § 1  HERO — atmospheric full-bleed dark
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#09080a] px-4 pt-24 pb-20 text-white">
        {/* ambient glow layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[10%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.08] blur-[160px]" />
          <div className="absolute bottom-0 left-[20%] h-[300px] w-[400px] rounded-full bg-[#8b1c3a]/10 blur-[120px]" />
          <div className="absolute top-[30%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#d4af37]/[0.05] blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cinzel inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/[0.08] px-5 py-2 text-[11px] font-bold tracking-[0.18em] text-[#d4af37] uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Book Pind Daan in Gaya — From Anywhere in the World
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="font-cinzel text-4xl leading-[1.08] font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-white">Online</span>{" "}
            <span
              style={{
                background: goldGrad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pind Daan
            </span>
            <br />
            <span
              className="text-3xl font-light tracking-normal text-white sm:text-4xl md:text-5xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              in Sacred Gaya
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="mx-auto max-w-2xl text-sm leading-relaxed text-[#b0a898] sm:text-base md:text-lg"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Perform the sacred ancestral rites at Gaya with guidance from
            experienced Gayawal Pandits —{" "}
            <em className="font-semibold text-[#d4af37] not-italic">
              even when you cannot travel to Gaya yourself.
            </em>
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "🙏 Traditional Vedic Rituals",
              "📍 Vishnupad Gaya Sites",
              "📸 Photo & Video Documentation",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold text-[#c9bfa8] backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.55 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => openWizard("complete")}
              className="group font-cinzel inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-black transition-all hover:shadow-[0_0_32px_rgba(212,175,55,0.5)] active:scale-[0.98]"
              style={{ background: goldGrad }}
            >
              Book Online Pind Daan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={openWhatsApp}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-4 text-sm font-semibold text-[#4ade80] backdrop-blur-sm transition-all hover:bg-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to a Coordinator
            </button>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[#d4af37]/40"
        >
          <span className="font-cinzel text-[9px] font-bold tracking-[0.2em] uppercase">
            Scroll to learn more
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 2  WHAT IS ONLINE PIND DAAN
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-background border-border border-b px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <AnimSection className="space-y-10">
            <motion.div variants={fadeUp} className="space-y-3 text-center">
              <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                Immediate Clarity
              </span>
              <h2 className="font-cinzel text-text-primary text-3xl leading-snug font-bold sm:text-4xl">
                What is Online Pind Daan?
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="border-border bg-surface space-y-6 rounded-3xl border p-8 sm:p-10"
            >
              <p
                className="text-text-secondary text-base leading-relaxed sm:text-lg"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Pind Daan is a sacred Hindu ancestral ritual performed to offer
                prayers and pindas in remembrance of departed ancestors. Gaya is
                traditionally regarded as the supreme pilgrimage site for these
                rites.
              </p>
              <p
                className="text-text-secondary text-base leading-relaxed sm:text-lg"
                style={{ fontFamily: "Georgia, serif" }}
              >
                With Pitraya&apos;s online service,{" "}
                <strong className="text-gold-primary font-semibold">
                  you do not have to travel to Gaya.
                </strong>{" "}
                Pitraya coordinates the physical ritual in Gaya through verified
                Gayawal Pandits on your behalf — you provide family details and
                receive complete photographic and video documentation.
              </p>

              {/* Flow diagram */}
              <div className="border-border border-t pt-4">
                <p className="font-cinzel text-text-muted mb-5 text-center text-[10px] font-bold tracking-widest uppercase">
                  How Your Sacred Intent Travels to Gaya
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      icon: "👨‍👩‍👧",
                      label: "Your Family",
                      sub: "Details & Sankalpa",
                    },
                    {
                      icon: "🔱",
                      label: "Pitraya",
                      sub: "Coordinator Desk",
                      hi: true,
                    },
                    {
                      icon: "🙏",
                      label: "Gayawal Pandit",
                      sub: "Performs in Gaya",
                    },
                    { icon: "📸", label: "Documentation", sub: "Back to you" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col items-center rounded-2xl border p-4 text-center transition-all",
                        item.hi
                          ? "border-gold-primary/40 bg-gold-primary/[0.08]"
                          : "border-border bg-surface"
                      )}
                    >
                      <span className="mb-1.5 text-2xl">{item.icon}</span>
                      <span
                        className={cn(
                          "font-cinzel text-xs font-bold",
                          item.hi ? "text-gold-primary" : "text-text-primary"
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="text-text-muted mt-0.5 text-[10px]">
                        {item.sub}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.08] px-4 py-2 text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Physical ritual performed at Vishnupad Sanctum — complete
                  documentation delivered to your family
                </p>
              </div>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 3  HOW IT WORKS — 6-step process
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        className="bg-muted border-border border-b px-4 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <AnimSection className="space-y-12">
            <motion.div variants={fadeUp} className="space-y-3 text-center">
              <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                Step-by-Step Transparency
              </span>
              <h2 className="font-cinzel text-text-primary text-3xl font-bold sm:text-4xl">
                How Online Pind Daan Works
              </h2>
              <p
                className="text-text-secondary mx-auto max-w-xl text-sm"
                style={{ fontFamily: "Georgia, serif" }}
              >
                A smooth, spiritually sound process designed for complete peace
                of mind.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PROCESS_STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group bg-surface border-border hover:border-gold-primary/40 relative overflow-hidden rounded-2xl border p-6 transition-all duration-300"
                >
                  <span className="font-cinzel text-gold-primary/[0.05] pointer-events-none absolute -top-2 -right-2 text-7xl leading-none font-black select-none">
                    {s.n}
                  </span>
                  <div className="relative z-10 space-y-3">
                    <span className="font-cinzel text-gold-primary bg-gold-primary/10 border-gold-primary/20 rounded-full border px-2.5 py-1 text-xs font-bold">
                      STEP {s.n}
                    </span>
                    <h3 className="font-cinzel text-text-primary group-hover:text-gold-primary text-base font-bold transition-colors">
                      {s.title}
                    </h3>
                    <p
                      className="text-text-secondary text-xs leading-relaxed"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center">
              <button
                onClick={() => openWizard("complete")}
                className="font-cinzel inline-flex cursor-pointer items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-black transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: goldGrad }}
              >
                Start Booking Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 4  RITUAL STAGES — 6-stage Vedic timeline
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-background border-border border-b px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <AnimSection className="space-y-12">
            <motion.div variants={fadeUp} className="space-y-3 text-center">
              <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                Vedic Sequence
              </span>
              <h2 className="font-cinzel text-text-primary text-3xl font-bold sm:text-4xl">
                What Actually Happens During Pind Daan?
              </h2>
              <p
                className="text-text-secondary mx-auto max-w-xl text-sm"
                style={{ fontFamily: "Georgia, serif" }}
              >
                The sacred 6-stage timeline performed by Gayawal Pandits in
                Gaya.
              </p>
            </motion.div>

            <div className="relative">
              {/* vertical spine on desktop */}
              <div className="from-gold-primary/30 via-gold-primary/10 absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b to-transparent lg:block" />

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {RITUAL_STAGES.map((stage, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className={cn(
                      "group bg-surface hover:border-gold-primary/40 border-border flex items-start gap-4 rounded-2xl border p-6 transition-all duration-300",
                      i % 2 === 0 ? "lg:mr-6" : "lg:ml-6"
                    )}
                  >
                    <div className="bg-gold-primary/10 border-gold-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-xl">
                      {stage.icon}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-gold-primary/60 text-[10px] font-bold tracking-wider uppercase">
                          0{i + 1}
                        </span>
                        <h4 className="font-cinzel text-text-primary group-hover:text-gold-primary text-sm font-bold transition-colors">
                          {stage.title}
                        </h4>
                      </div>
                      <p
                        className="text-text-secondary text-xs leading-relaxed"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {stage.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 5  WHAT TO PROVIDE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-muted border-border border-b px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimSection className="space-y-10">
            <motion.div variants={fadeUp} className="space-y-3 text-center">
              <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                Preparation Checklist
              </span>
              <h2 className="font-cinzel text-text-primary text-3xl font-bold sm:text-4xl">
                What Information Do I Need?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  icon: "👨‍👩‍👧",
                  title: "Family Information",
                  items: [
                    "Name of the person performing Sankalpa",
                    "Family Gotra (if known — optional)",
                    "WhatsApp & Email for updates",
                  ],
                },
                {
                  icon: "🙏",
                  title: "Ancestor Information",
                  items: [
                    "Full name of the deceased ancestor",
                    "Relationship to the ritual performer",
                    "Any specific family wishes",
                  ],
                },
                {
                  icon: "📅",
                  title: "Booking Details",
                  items: [
                    "Preferred ritual date or tithi",
                    "Number of family participants",
                    "Special Gotra guidance needs (if any)",
                  ],
                },
              ].map((col, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-surface border-border hover:border-gold-primary/30 space-y-4 rounded-2xl border p-6 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="bg-gold-primary/10 border-gold-primary/20 flex h-10 w-10 items-center justify-center rounded-xl border text-xl">
                      {col.icon}
                    </div>
                    <h3 className="font-cinzel text-text-primary text-sm font-bold">
                      {col.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {col.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-text-secondary flex items-start gap-2 text-xs"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              className="bg-gold-primary/[0.08] border-gold-primary/20 text-text-secondary mx-auto max-w-2xl rounded-2xl border p-5 text-center text-sm"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="text-gold-primary font-semibold">
                Not sure what to provide?
              </span>{" "}
              Our Pitraya coordinator will personally guide you step-by-step
              before the ritual begins.
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 6  FAMILY PARTICIPATION + SACRED SITES (2-col split)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-background border-border border-b px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <AnimSection className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left — Remote Participation */}
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="space-y-2">
                <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                  Remote Participation
                </span>
                <h2 className="font-cinzel text-text-primary text-2xl font-bold sm:text-3xl">
                  Can My Family Participate From Home?
                </h2>
                <p
                  className="text-gold-primary text-base font-semibold"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Yes — within your selected ritual arrangement.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    e: "📱",
                    t: "WhatsApp Coordination",
                    d: "Real-time status alerts and timings throughout the ritual",
                  },
                  {
                    e: "🔥",
                    t: "Sankalpa Guidance",
                    d: "Chant along with the Pandit from your home at the appointed hour",
                  },
                  {
                    e: "📸",
                    t: "Ritual Photographs",
                    d: "High-resolution photos of your family pinda offerings",
                  },
                  {
                    e: "🎥",
                    t: "Video Updates",
                    d: "Recorded clips of Sankalpa & ceremonies (Complete and Family packages)",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border-border bg-surface flex items-start gap-3.5 rounded-xl border p-4"
                  >
                    <div className="bg-gold-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg">
                      {item.e}
                    </div>
                    <div>
                      <h4 className="font-cinzel text-text-primary text-xs font-bold">
                        {item.t}
                      </h4>
                      <p
                        className="text-text-secondary mt-0.5 text-xs"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p
                className="text-text-muted bg-surface border-border rounded-xl border p-3 text-[11px] italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Note: We provide reliable recorded video updates rather than
                fragile live streams — ancient stone sanctums restrict cellular
                connectivity inside.
              </p>
            </motion.div>

            {/* Right — Sacred Sites */}
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="space-y-2">
                <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                  Sacred Geography
                </span>
                <h2 className="font-cinzel text-text-primary text-2xl font-bold sm:text-3xl">
                  Where Is the Ritual Performed?
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    e: "🛕",
                    t: "Vishnupad Temple",
                    d: "Lord Vishnu immortal footprint (Charan Chinha) permanently enshrined — the central site for Gaya ancestral oblations.",
                    badge: "All Packages",
                  },
                  {
                    e: "🌊",
                    t: "Phalgu River",
                    d: "Sacred river celebrated in the Ramayana where Mata Sita offered Pinda Daan — site of ancestral Tarpan water oblations.",
                    badge: "Complete & Family",
                  },
                  {
                    e: "🌳",
                    t: "Akshayavat",
                    d: "The eternal banyan tree where concluding blessings are sought for the everlasting peace of departed souls.",
                    badge: "Family Lineage",
                  },
                ].map((site, i) => (
                  <div
                    key={i}
                    className="border-border bg-surface hover:border-gold-primary/30 space-y-2.5 rounded-2xl border p-5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="bg-gold-primary/10 border-gold-primary/15 flex h-9 w-9 items-center justify-center rounded-xl border text-lg">
                          {site.e}
                        </div>
                        <h4 className="font-cinzel text-text-primary text-sm font-bold">
                          {site.t}
                        </h4>
                      </div>
                      <span className="text-gold-primary bg-gold-primary/10 border-gold-primary/20 font-cinzel rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider whitespace-nowrap uppercase">
                        {site.badge}
                      </span>
                    </div>
                    <p
                      className="text-text-secondary pl-[2.65rem] text-xs leading-relaxed"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {site.d}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 7  PACKAGES — dark section with gold glow
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#09080a] px-4 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.06] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <AnimSection className="space-y-12">
            <motion.div variants={fadeUp} className="space-y-3 text-center">
              <span className="font-cinzel text-xs font-bold tracking-widest text-[#d4af37] uppercase">
                Clear & Transparent Pricing
              </span>
              <h2 className="font-cinzel text-3xl font-bold text-white sm:text-4xl">
                Choose Your Pind Daan Package
              </h2>
              <p
                className="mx-auto max-w-xl text-sm text-[#8a8070]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                All-inclusive arrangement covering Pandit coordination, puja
                samagri and complete documentation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {PACKAGES.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  variants={fadeUp}
                  className={cn(
                    "relative flex flex-col rounded-3xl border p-8 transition-all duration-300",
                    pkg.highlight
                      ? "border-[#d4af37]/50 bg-[#d4af37]/[0.06] shadow-[0_0_60px_rgba(212,175,55,0.15)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  )}
                >
                  {pkg.highlight && (
                    <div
                      className="font-cinzel absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-extrabold tracking-widest text-black uppercase"
                      style={{ background: goldGrad }}
                    >
                      Most Selected
                    </div>
                  )}

                  <div className="flex-1 space-y-5">
                    <div className="space-y-1">
                      <span className="text-2xl">{pkg.emoji}</span>
                      <h3 className="font-cinzel text-xl font-bold text-white">
                        {pkg.name}
                      </h3>
                      <p
                        className="text-[12px] text-[#8a8070]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {pkg.subtitle}
                      </p>
                    </div>

                    <div className="border-t border-white/[0.08] pt-4">
                      <span className="font-cinzel text-3xl font-black text-[#d4af37]">
                        {pkg.price}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-[#6a6060]">
                        All-inclusive ritual arrangement
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {pkg.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#b0a898]"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openWizard(pkg.id)}
                    className={cn(
                      "font-cinzel mt-6 w-full cursor-pointer rounded-xl py-3.5 text-xs font-bold transition-all",
                      pkg.highlight
                        ? "text-black hover:opacity-90"
                        : "border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                    )}
                    style={pkg.highlight ? { background: goldGrad } : {}}
                  >
                    Choose {pkg.name} →
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-6 text-[11px] font-semibold text-[#6a6060]"
            >
              {[
                "🔒 Secure Payment",
                "✅ Instant Booking ID",
                "📱 WhatsApp Confirmation",
                "↩️ Rescheduling Allowed",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 8  TRUST PILLARS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-background border-border border-b px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <AnimSection className="space-y-10">
            <motion.div variants={fadeUp} className="space-y-3 text-center">
              <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                Our Core Principles
              </span>
              <h2 className="font-cinzel text-text-primary text-3xl font-bold sm:text-4xl">
                Why Families Choose Pitraya
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {TRUST_PILLARS.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group border-border bg-surface hover:border-gold-primary/40 hover:bg-gold-primary/5 flex flex-col items-center space-y-3 rounded-2xl border p-5 text-center transition-all duration-300"
                >
                  <div className="bg-gold-primary/10 border-gold-primary/20 flex h-11 w-11 items-center justify-center rounded-2xl border text-xl transition-transform group-hover:scale-110">
                    {p.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-text-primary text-[11px] font-bold">
                      {p.title}
                    </h4>
                    <p className="text-text-muted text-[10px] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 9  FAQ — accordion
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-muted border-border border-b px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <AnimSection className="space-y-10">
            <motion.div variants={fadeUp} className="space-y-3 text-center">
              <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                Addressing Your Questions
              </span>
              <h2 className="font-cinzel text-text-primary text-3xl font-bold sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p
                className="text-text-secondary text-sm"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Clear, authentic answers to help you make a faithful and
                informed decision.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-2.5">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-all duration-200",
                      isOpen
                        ? "border-gold-primary/30 bg-surface"
                        : "border-border bg-surface/60"
                    )}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
                    >
                      <span
                        className={cn(
                          "font-cinzel text-sm font-semibold transition-colors",
                          isOpen
                            ? "text-gold-primary"
                            : "text-text-primary group-hover:text-gold-primary"
                        )}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "text-gold-primary/60 h-4 w-4 shrink-0 transition-transform duration-200",
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
                          transition={{ duration: 0.22 }}
                        >
                          <div
                            className="text-text-secondary border-border/60 border-t px-5 pt-3.5 pb-5 text-sm leading-relaxed"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          § 10  FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#09080a] px-4 py-28 text-center">
        <div className="pointer-events-none absolute inset-0 scale-150 rounded-full bg-[#d4af37]/[0.05] blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-3xl space-y-7">
          <span className="font-cinzel inline-block text-[11px] font-bold tracking-[0.2em] text-[#d4af37]/70 uppercase">
            Complete Your Ancestral Duty
          </span>

          <h2 className="font-cinzel text-3xl leading-tight font-black text-white sm:text-4xl md:text-5xl">
            Fulfil Your Ancestral Duty
            <br className="hidden sm:block" />
            <span
              style={{
                background: goldGrad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              With Faith.
            </span>
          </h2>

          <p
            className="mx-auto max-w-xl text-base leading-relaxed text-[#8a8070]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            When distance keeps you away from Gaya, Pitraya helps your family
            remain connected to the sacred tradition.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openWizard("complete")}
              className="group font-cinzel inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-9 py-4 text-sm font-bold text-black transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-[0.98]"
              style={{ background: goldGrad }}
            >
              Book Online Pind Daan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={openWhatsApp}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-[#c9bfa8] backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-[#4ade80]" />
              Talk to a Pitraya Coordinator
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-2 text-[11px] font-semibold text-[#5a5050]">
            {[
              "📞 +91 84344 57228",
              "✉️ pitrayaenquiry@gmail.com",
              "📍 Gaya, Bihar, India",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE STICKY BAR
      ════════════════════════════════════════════════════════════════════ */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between gap-3 border-t border-[#d4af37]/20 bg-[#0d0b08]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
        <div>
          <span className="font-cinzel block text-[9px] font-bold tracking-wider text-[#6a6060] uppercase">
            From
          </span>
          <span className="font-cinzel text-sm font-black text-[#d4af37]">
            ₹5,100
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openWhatsApp}
            aria-label="WhatsApp coordinator"
            className="cursor-pointer rounded-xl border border-[#25D366]/30 bg-[#25D366]/15 p-2.5 text-[#25D366] transition-all hover:bg-[#25D366]/25"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
          <button
            onClick={() => openWizard("complete")}
            className="font-cinzel cursor-pointer rounded-xl px-5 py-2.5 text-xs font-bold text-black transition-all active:scale-[0.97]"
            style={{ background: goldGrad }}
          >
            Book Pind Daan →
          </button>
        </div>
      </div>
    </HomePage>
  );
}
