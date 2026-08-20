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

export default function HeroSection({
  badge,
  title,
  gradientTitleWord,
  description,
  primaryCtaText,
  onPrimaryClick,
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
        "relative w-full overflow-hidden bg-background pt-24 pb-12 sm:pt-28 sm:pb-20",
        className
      )}
      {...props}
    >
      <SacredChakraBg
        size="min(640px, 90vw)"
        opacity={0.04}
        rotateSpeed={180}
        position="top-right"
      />
      <div className="pointer-events-none absolute top-20 left-0 h-[420px] w-[420px] rounded-full bg-gold-primary/10 blur-[140px]" />

      <Container size="xl" className="relative z-10 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col items-start text-left lg:col-span-6">
            {displayBadge && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-cinzel text-gold-primary mb-5 inline-flex items-center gap-2 rounded-full border border-border-gold bg-surface px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase shadow-sm sm:text-xs"
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span>{displayBadge}</span>
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="font-cinzel text-text-primary max-w-xl text-3xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-6xl"
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

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="text-text-secondary mt-5 max-w-lg font-serif text-sm leading-relaxed sm:text-lg"
            >
              {displayDescription}
            </motion.p>

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
                className="font-cinzel text-text-primary focus-visible:ring-gold-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-surface px-6 py-3.5 text-xs font-bold shadow-sm transition-all hover:border-[#25D366] hover:bg-[#25D366]/10 focus-visible:ring-2 focus-visible:outline-none sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </button>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-2">
              {trustItems.map((item) => (
                <span
                  key={item.label}
                  className="text-text-secondary inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-medium"
                >
                  <item.icon className="text-gold-primary h-3.5 w-3.5" />
                  {item.label}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={handleRingBell}
              className="text-gold-primary hover:bg-surface-hover font-cinzel mt-6 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-gold/40 bg-surface px-3 py-1.5 text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:outline-none"
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
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="relative lg:col-span-6"
          >
            <div className="border-border-gold relative aspect-[4/5] overflow-hidden rounded-3xl border shadow-lg sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
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
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
                <p className="font-cinzel text-xs font-semibold text-white sm:text-sm">
                  Sunrise rites at Gaya
                </p>
                <span className="rounded-full border border-white/30 bg-black/50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                  Live sanctuary
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
