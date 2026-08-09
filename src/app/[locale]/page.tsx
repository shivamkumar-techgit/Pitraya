"use client";

import React, { Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import HomePage from "@/components/layout/HomePage";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

// ─── Above-the-fold sections (eager) ─────────────────────────────────────────
import {
  HeroSection,
  StorySection,
  ServicesSection,
} from "@/components/sections";

// ─── Below-the-fold sections (lazy loaded) ───────────────────────────────────
const SacredTrustSection   = lazy(() => import("@/components/sections/SacredTrustSection"));
const TrustCenterSection   = lazy(() => import("@/components/sections/TrustCenterSection"));
const JourneySection       = lazy(() => import("@/components/sections/JourneySection"));
const WhyGayaSection       = lazy(() => import("@/components/sections/WhyGayaSection"));
const DestinationsSection  = lazy(() => import("@/components/sections/DestinationsSection"));
const EmotionGallerySection = lazy(() => import("@/components/sections/EmotionGallerySection"));
const TestimonialsSection  = lazy(() => import("@/components/sections/TestimonialsSection"));
const FAQSection           = lazy(() => import("@/components/sections/FAQSection"));
const BlogsSection         = lazy(() => import("@/components/sections/BlogsSection"));
const ContactSection       = lazy(() => import("@/components/sections/ContactSection"));
const CTASection           = lazy(() => import("@/components/sections/CTASection"));

// ─── Skeleton fallback for lazy sections ─────────────────────────────────────
function SectionSkeleton() {
  return (
    <div
      className="w-full py-24 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-1 w-16 rounded-full bg-gold-primary/20 animate-pulse" />
    </div>
  );
}

/**
 * Home page — Cinematic Storytelling Flow ("Movie")
 * Served under locale routes (/ and /hi)
 */
export default function Home() {
  const router = useRouter();
  const { scrollTo } = useSmoothScroll();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      scrollTo(el, { offset: -80, duration: 1.2 });
    }
  };

  return (
    <HomePage>
      {/* ── Chapter 01: The Sacred Realm ─────────────────────────────────── */}
      <HeroSection
        id="hero"
        onPrimaryClick={() => router.push("/packages")}
        onSecondaryClick={() => router.push("/planner")}
      />

      {/* ── Chapter 02: Why People Come ──────────────────────────────────── */}
      <StorySection id="story" />

      {/* ── Chapter 03: Meet Your Priest & Ritual Packages ───────────────── */}
      <ServicesSection id="services" />

      {/* ── Below the fold: lazy loaded for performance ───────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <SacredTrustSection id="trust" />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TrustCenterSection id="trust-center" />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <JourneySection id="journey" />
      </Suspense>

      {/* ── Chapter 04: History & Scripture ──────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyGayaSection id="why-gaya" />
      </Suspense>

      {/* ── Chapter 06: Sacred Places & Sanctuaries ──────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <DestinationsSection id="destinations" />
      </Suspense>

      {/* ── Chapter 07: Real Family Moments ──────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <EmotionGallerySection id="gallery" />
      </Suspense>

      {/* ── Chapter 08: Measured in Trust ────────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection id="testimonials" />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection id="faq" />
      </Suspense>

      {/* ── Knowledge & Journal ──────────────────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <BlogsSection id="blogs" />
      </Suspense>

      {/* ── Chapter 09: Begin Your Pilgrimage ────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection id="contact" />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CTASection
          id="cta"
          primaryCta={{
            text: "View All 5 Packages",
            onClick: () => router.push("/packages"),
          }}
          secondaryCta={{
            text: "Speak With Concierge",
            onClick: () => scrollToSection("contact"),
          }}
        />
      </Suspense>
    </HomePage>
  );
}
