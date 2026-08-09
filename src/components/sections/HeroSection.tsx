"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Volume2, VolumeX, Play, Film, Image as ImageIcon, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import MagneticButton from "@/components/buttons/MagneticButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import GoldenParticles from "@/components/animations/GoldenParticles";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import IconButton from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

// Web Audio API Synthesizer for Authentic 432Hz Sacred Temple Bell Chime
function playTempleBellChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Sacred 432Hz tuning & harmonic overtones
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(432, now);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(864, now);

    osc3.type = "sine";
    osc3.frequency.setValueAtTime(1296, now);

    // Natural bell envelope: rapid attack, long exponential resonant decay
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

const mediaSources: Record<MediaBackgroundType, { type: "video" | "image"; src: string; label: string }> = {
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

  const [currentMedia, setCurrentMedia] = useState<MediaBackgroundType>("video1");
  const [isPlayingBell, setIsPlayingBell] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeMedia = mediaSources[currentMedia];

  const handleRingBell = () => {
    playTempleBellChime();
    setIsPlayingBell(true);
    setTimeout(() => setIsPlayingBell(false), 4500);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: [0.215, 0.61, 0.355, 1] as any, // easeOutCubic
      },
    },
  };

  return (
    <section
      className={cn(
        "relative h-screen min-h-[720px] w-full flex items-center justify-center overflow-hidden bg-black text-text-primary",
        className
      )}
      {...props}
    >
      {/* 1. MEDIA BACKGROUND (Video or Image) with Mouse Parallax & Entrance Zoom */}
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1.02, opacity: 1 }}
        transition={{ duration: 2.0, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none will-change-transform transform-gpu"
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
            className="w-full h-full object-cover filter brightness-75 contrast-110"
          >
            <source src={activeMedia.src} />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center filter brightness-75"
            style={{ backgroundImage: `url(${activeMedia.src})` }}
          />
        )}
      </motion.div>

      {/* 2. GOLDEN OVERLAY, VIGNETTE & RADIAL LIGHT RAYS */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20 z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-background/80 z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.15),transparent_45%)] z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(212,175,55,0.08),transparent_35%)] z-1 pointer-events-none" />

      {/* 2b. CREPUSCULAR LIGHT SHAFTS — Sacred sunrise rays from top-center */}
      <div
        className="absolute inset-0 z-2 pointer-events-none opacity-[0.07]"
        style={{
          background: [
            "conic-gradient(from 265deg at 50% -10%, transparent 0deg, rgba(212,175,55,0.9) 3deg, transparent 6deg, transparent 12deg, rgba(212,175,55,0.7) 15deg, transparent 18deg, transparent 25deg, rgba(212,175,55,0.8) 28deg, transparent 31deg, transparent 36deg, rgba(212,175,55,0.6) 39deg, transparent 42deg, transparent 270deg)",
          ].join(","),
        }}
      />

      {/* 2c. SANSKRIT MANDALA WATERMARK — Sacred geometry backdrop */}
      <SacredChakraBg size="min(650px, 92vw)" opacity={0.05} rotateSpeed={180} />

      {/* 2d. FLOATING DIYA FLAMES — 8 sacred lamp dots at bottom */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-16 z-12 pointer-events-none"
          style={{ left: `${10 + i * 11}%` }}
          animate={{
            y: [0, -12 - (i % 3) * 6, 0],
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2.8 + (i % 4) * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
          }}
        >
          {/* Flame outer glow */}
          <div className="w-2 h-3 rounded-full bg-amber-400/80 blur-[2px] shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          {/* Flame core */}
          <div className="absolute top-0.5 left-0.5 w-1 h-2 rounded-full bg-yellow-200/90" />
        </motion.div>
      ))}

      {/* 3. FLOATING GOLDEN CANVAS PARTICLES */}
      <GoldenParticles particleCount={35} className="z-10" />


      {/* 4. MORNING FOG LAYER ANIMATIONS */}
      <div className="absolute bottom-0 inset-x-0 h-96 pointer-events-none z-10 overflow-hidden opacity-60">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <div
          className="absolute -bottom-20 -left-1/2 w-[200%] h-64 bg-repeat-x opacity-40 animate-fog-slow filter blur-xl"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.18) 0%, rgba(20, 20, 24, 0.6) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute -bottom-10 -left-1/4 w-[180%] h-56 bg-repeat-x opacity-35 animate-fog-fast filter blur-2xl"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0%, rgba(10, 10, 12, 0.7) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* 5. HERO CONTENT CONTAINER (Text Reveal & Button Fade) */}
      <Container size="xl" className="relative z-20 text-center pt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-5xl flex-col items-center gap-6"
        >
          {/* Badge */}
          {displayBadge && (
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 rounded-full bg-black/60 backdrop-blur-xl px-5 py-2 text-xs font-semibold text-gold-primary border border-gold-primary/40 shadow-gold-glow"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-gold-primary" />
              <span>{displayBadge}</span>
            </motion.span>
          )}

          {/* Large Heading Reveal */}
          <motion.div variants={itemVariants}>
            <Heading
              size="display"
              align="center"
              font="cinzel"
              className="max-w-5xl leading-[1.15] text-shadow-lg drop-shadow-2xl text-white font-medium select-none"
            >
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-semibold tracking-tight">
                {displayTitle}
              </span>
              <span className="block mt-2 sm:mt-4">
                <GradientText variant="gold" size="inherit" font="cinzel" className="drop-shadow-gold inline-block font-semibold tracking-widest uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                  {displayGradientTitle}
                </GradientText>
              </span>
            </Heading>
          </motion.div>

          {/* Description Fade */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl text-text-secondary/90 italic leading-relaxed font-serif"
          >
            {displayDescription}
          </motion.p>

          {/* CTA Buttons Fade */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-5 pt-4"
          >
            <MagneticButton
              size="xl"
              variant="primary"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              onClick={() => {
                if (onPrimaryClick) onPrimaryClick();
                else window.location.href = "/packages";
              }}
              className="shadow-gold-glow hover:scale-105 transition-transform"
            >
              {displayPrimaryCta}
            </MagneticButton>

            <SecondaryButton 
              size="xl" 
              onClick={() => {
                if (onSecondaryClick) onSecondaryClick();
                else window.location.href = "/contact";
              }} 
              className="border-gold-primary/40 hover:border-gold-primary text-gold-primary hover:scale-105 transition-transform"
              leftIcon={<Sparkles className="h-4 w-4 text-gold-primary animate-pulse" />}
            >
              {displaySecondaryCta}
            </SecondaryButton>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-auto select-none"
        onClick={() => {
          const nextSection = document.getElementById("story");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold-primary/60 font-sans">Scroll</span>
        <div className="w-5 h-9 rounded-full border border-gold-primary/30 flex justify-center p-1 bg-black/30 backdrop-blur-sm hover:border-gold-primary transition-colors">
          <motion.div
            animate={{
              y: [0, 14, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-gold-primary shadow-gold-glow"
          />
        </div>
      </motion.div>
    </section>
  );
}
