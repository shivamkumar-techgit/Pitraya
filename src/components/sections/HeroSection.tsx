"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Users,
  ChevronDown,
  Star,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import GradientText from "@/components/typography/GradientText";
import MagneticButton from "@/components/buttons/MagneticButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

function playTempleBellChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(432, now);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(864, now);
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(1296, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    osc3.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + 4.8);
    osc2.stop(now + 4.8);
    osc3.stop(now + 4.8);
  } catch {
    // Graceful fallback if web audio is blocked
  }
}

export type MediaBackgroundType = "video1" | "video2" | "image1" | "image2";

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title?: string;
  gradientTitleWord?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const mediaSources: Record<
  MediaBackgroundType,
  { type: "video" | "image"; src: string; label: string }
> = {
  video1: {
    type: "video",
    src: "/videos/City_of_Gaya_sunrise_rituals_202607201244 (online-video-cutter.com).mp4",
    label: "Video 1: Sunrise Gaya Ritual",
  },
  video2: {
    type: "video",
    src: "/videos/kling_20260720_VIDEO_Ultra_real_3630_0 (1).mov",
    label: "Video 2: Ultra Sanctuary",
  },
  image1: {
    type: "image",
    src: "/images/hero_temple_sunrise.png",
    label: "Image 1: AI Golden Temple",
  },
  image2: {
    type: "image",
    src: "/images/hero_incense_sanctuary.png",
    label: "Image 2: AI Incense Sanctum",
  },
};

const trustItems = [
  { icon: ShieldCheck, label: "Verified Gayawal Pandits" },
  { icon: MapPin, label: "Vishnupad & Phalgu" },
  { icon: Users, label: "End-to-end family care" },
];

const trustStats = [
  { value: "2,000+", label: "Families Served", icon: null },
  { value: "4.9", label: "Rating", icon: Star },
  { value: "8 Yrs", label: "Heritage", icon: null },
];

export default function HeroSection({
  badge,
  title,
  gradientTitleWord,
  description,
  primaryCtaText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  secondaryCtaText,
  onPrimaryClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSecondaryClick,
  className,
  ...props
}: HeroSectionProps) {
  const t = useTranslations("hero");

  const displayBadge = badge ?? t("badge");
  const displayTitle = title ?? t("title");
  const displayGradientTitle = gradientTitleWord ?? t("titleGradient");
  const displayDescription = description ?? t("subtitle");
  const displayPrimaryCta = primaryCtaText ?? t("primaryCta");

  const [currentMedia] = useState<MediaBackgroundType>("video1");
  const [isPlayingBell, setIsPlayingBell] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeMedia = mediaSources[currentMedia];

  const handleRingBell = () => {
    playTempleBellChime();
    setIsPlayingBell(true);
    setTimeout(() => setIsPlayingBell(false), 4500);
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-background pt-24 pb-16 sm:pt-28 sm:pb-24",
        className
      )}
      {...props}
    >
      {/* Sacred Chakra watermark — top right */}
      <SacredChakraBg
        size="min(580px, 80vw)"
        opacity={0.035}
        rotateSpeed={180}
        position="top-right"
      />

      {/* Warm ambient glow — left column warmth */}
      <div className="pointer-events-none absolute top-0 left-0 h-[600px] w-[500px] rounded-full bg-gold-primary/[0.07] blur-[160px]" />

      {/* Warm gradient band — editorial depth behind text column, no divider */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(245,239,225,0.50) 0%, rgba(248,244,236,0) 100%)",
        }}
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">

          {/* ── LEFT COLUMN: Editorial Typography ──────────────────────── */}
          <div className="flex flex-col items-start text-left lg:col-span-6">

            {/* Eyebrow badge */}
            {displayBadge && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-cinzel text-gold-primary mb-5 inline-flex items-center gap-2 rounded-full border border-border-gold bg-surface px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] uppercase shadow-sm sm:text-xs"
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span>{displayBadge}</span>
              </motion.span>
            )}

            {/* Main heading — larger, more dramatic */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="font-cinzel text-text-primary max-w-xl leading-[1.12] font-bold tracking-tight text-[2rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.9rem]"
            >
              <span className="block">{displayTitle}</span>
              <span className="mt-2 block">
                <GradientText
                  variant="gold"
                  size="inherit"
                  font="cinzel"
                  className="font-bold tracking-wide uppercase"
                >
                  {displayGradientTitle}
                </GradientText>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="text-text-secondary mt-5 max-w-lg font-serif text-sm leading-relaxed sm:text-base"
            >
              {displayDescription}
            </motion.p>

            {/* CTA group */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <MagneticButton
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                onClick={() => {
                  if (onPrimaryClick) onPrimaryClick();
                  else window.location.href = "/packages";
                }}
                className="font-cinzel shadow-gold-glow w-full px-8 py-3.5 text-xs font-bold sm:w-auto"
              >
                {displayPrimaryCta}
              </MagneticButton>

              <button
                type="button"
                onClick={() => {
                  const text = encodeURIComponent(
                    "Namaste! I would like to inquire about Gaya Pind Daan pilgrimage packages."
                  );
                  window.open(
                    `https://wa.me/918434457228?text=${text}`,
                    "_blank"
                  );
                }}
                className="font-cinzel text-text-primary focus-visible:ring-gold-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#25D366]/50 bg-surface px-6 py-3.5 text-xs font-bold shadow-sm transition-all hover:border-[#25D366] hover:bg-[#25D366]/[0.07] focus-visible:ring-2 focus-visible:outline-none sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.6 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {trustItems.map((item) => (
                <span
                  key={item.label}
                  className="text-text-secondary inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-medium shadow-sm"
                >
                  <item.icon className="text-gold-primary h-3.5 w-3.5" />
                  {item.label}
                </span>
              ))}
            </motion.div>

            {/* Trust stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.6 }}
              className="mt-5 flex items-center gap-5 border-t border-border pt-4"
              aria-label="Trust statistics"
            >
              {trustStats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1">
                      {stat.icon && (
                        <stat.icon className="h-3 w-3 fill-gold-primary text-gold-primary" />
                      )}
                      <span className="font-cinzel text-text-primary text-sm font-bold leading-none">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-text-muted mt-0.5 text-[10px] uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                  {i < trustStats.length - 1 && (
                    <div className="h-8 w-px bg-border" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Temple bell chime */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52, duration: 0.5 }}
              type="button"
              onClick={handleRingBell}
              className="text-gold-primary hover:bg-surface font-cinzel mt-5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-gold/40 bg-transparent px-3 py-1.5 text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:outline-none"
            >
              {isPlayingBell ? (
                <Volume2 className="h-3.5 w-3.5 animate-bounce" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
              <span>
                {isPlayingBell
                  ? "Sacred Chime Sounding..."
                  : "Chime 432Hz Temple Bell"}
              </span>
            </motion.button>
          </div>

          {/* ── RIGHT COLUMN: Premium Media Card ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-6"
          >
            {/* Warm shadow bloom beneath the card */}
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gold-primary/[0.05] blur-2xl" />

            <div className="border-border-gold/40 relative aspect-[4/5] overflow-hidden rounded-3xl border shadow-[0_24px_60px_rgba(62,40,15,0.13)] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
              {activeMedia.type === "video" ? (
                <video
                  ref={videoRef}
                  key={activeMedia.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/hero_temple_sunrise.png"
                  className="h-full w-full object-cover"
                >
                  <source src={activeMedia.src} />
                </video>
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeMedia.src})` }}
                />
              )}

              {/* Dark vignette — CONTEXTUAL overlay on photography, intentional */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

              {/* Caption — white text on dark overlay = contextual, correct */}
              <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
                <p className="font-cinzel text-xs font-semibold text-white drop-shadow-sm sm:text-sm">
                  Sunrise rites at Gaya
                </p>
                <span className="rounded-full border border-white/30 bg-black/50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                  Live sanctuary
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 hidden flex-col items-center gap-1 sm:flex"
          aria-hidden="true"
        >
          <span className="font-cinzel text-text-muted text-[9px] tracking-[0.22em] uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-gold-primary/60" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

