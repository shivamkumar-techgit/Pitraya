"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import MagneticButton from "@/components/buttons/MagneticButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import GoldenParticles from "@/components/animations/GoldenParticles";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

// Web Audio API Synthesizer for Authentic 432Hz Sacred Temple Bell Chime
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

export default function HeroSection({
  badge,
  title,
  gradientTitleWord,
  description,
  primaryCtaText,
  secondaryCtaText,
  onPrimaryClick,
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
  const displaySecondaryCta = secondaryCtaText ?? t("secondaryCta");

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
        "text-text-primary relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-black pt-24 pb-16 sm:min-h-[720px] sm:pt-28 sm:pb-24",
        className
      )}
      {...props}
    >
      {/* 1. MEDIA BACKGROUND */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 z-0 h-full w-full overflow-hidden select-none"
      >
        {activeMedia.type === "video" ? (
          <video
            ref={videoRef}
            key={activeMedia.src}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero_temple_sunrise.png"
            className="h-full w-full object-cover brightness-[0.7] contrast-110 filter"
          >
            <source src={activeMedia.src} />
          </video>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center brightness-[0.7] filter"
            style={{ backgroundImage: `url(${activeMedia.src})` }}
          />
        )}
      </motion.div>

      {/* 2. OVERLAYS & AMBIENT LIGHTING */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-black via-black/50 to-black/30" />
      <div className="from-gold-primary/15 pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] via-transparent to-black/90" />

      {/* SANSKRIT CHAKRA BACKGROUND */}
      <SacredChakraBg
        size="min(600px, 92vw)"
        opacity={0.05}
        rotateSpeed={180}
      />

      {/* FLOATING PARTICLES */}
      <GoldenParticles particleCount={25} className="z-10" />

      {/* 3. HERO CONTENT CONTAINER */}
      <Container size="xl" className="relative z-20 px-4 text-center sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 sm:gap-6">
          {/* Badge */}
          {displayBadge && (
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-cinzel text-gold-primary border-gold-primary/40 shadow-gold-glow inline-flex items-center gap-2 rounded-full border bg-black/80 px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase backdrop-blur-xl sm:text-xs"
            >
              <Sparkles className="text-gold-primary h-3.5 w-3.5 shrink-0 animate-pulse" />
              <span>{displayBadge}</span>
            </motion.span>
          )}

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            <h1 className="font-cinzel text-3xl leading-[1.15] font-bold tracking-tight text-white drop-shadow-2xl text-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block font-semibold">{displayTitle}</span>
              <span className="mt-1 block sm:mt-3">
                <GradientText
                  variant="gold"
                  size="inherit"
                  font="cinzel"
                  className="drop-shadow-gold font-bold tracking-widest uppercase"
                >
                  {displayGradientTitle}
                </GradientText>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-text-secondary/90 max-w-2xl px-2 font-serif text-sm leading-relaxed italic sm:text-lg md:text-xl"
          >
            &quot;{displayDescription}&quot;
          </motion.p>

          {/* Mobile-Optimized CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="flex w-full flex-col items-center justify-center gap-3.5 pt-2 sm:w-auto sm:flex-row"
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
              onClick={() => {
                const text = encodeURIComponent(
                  "Namaste! I would like to inquire about Gaya Pind Daan pilgrimage packages."
                );
                window.open(
                  `https://wa.me/918434457228?text=${text}`,
                  "_blank"
                );
              }}
              className="font-cinzel flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#25D366]/50 bg-[#25D366]/20 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#25D366]/30 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </button>
          </motion.div>

          {/* Temple Bell Audio Button */}
          <div className="pt-2">
            <button
              onClick={handleRingBell}
              className="text-gold-primary/80 hover:text-gold-primary font-cinzel border-gold-primary/20 inline-flex cursor-pointer items-center gap-1.5 rounded-full border bg-black/60 px-3 py-1 text-[11px] transition-colors"
            >
              {isPlayingBell ? (
                <Volume2 className="text-gold-primary h-3.5 w-3.5 animate-bounce" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
              <span>
                {isPlayingBell
                  ? "Sacred Chime Sounding..."
                  : "🔔 Chime 432Hz Temple Bell"}
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
