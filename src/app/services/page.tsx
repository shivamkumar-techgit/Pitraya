"use client";

import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyGayaSection from "@/components/sections/WhyGayaSection";
import SacredPlacesSection from "@/components/sections/SacredPlacesSection";
import TrustCenterSection from "@/components/sections/TrustCenterSection";
import CTASection from "@/components/sections/CTASection";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import GoldenParticles from "@/components/animations/GoldenParticles";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import { Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary selection:bg-gold-primary selection:text-black">
      <Navbar />

      {/* HERO SECTION FOR EXPERIENCES */}
      <Section className="relative py-28 overflow-hidden bg-background text-text-primary border-b border-border-gold/20 pt-36">
        <GoldenParticles particleCount={35} className="opacity-30 pointer-events-none" />
        <SacredChakraBg size="min(750px, 95vw)" opacity={0.05} rotateSpeed={160} position="center" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-background pointer-events-none" />

        <Container size="xl" className="relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl space-y-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-5 py-2 text-xs font-semibold text-gold-primary border border-gold-primary/40 shadow-gold-glow uppercase tracking-widest font-cinzel">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>SACRED EXPERIENCES &amp; VEDIC RITES</span>
            </span>

            <Heading size="display" align="center" font="cinzel" className="text-white leading-tight">
              Authentic Pind Daan &amp;{" "}
              <GradientText variant="gold" size="inherit" font="cinzel">
                Ancestral Rites
              </GradientText>
            </Heading>

            <Paragraph size="lg" align="center" variant="muted" className="max-w-2xl mx-auto font-serif italic text-text-secondary/90 leading-relaxed">
              Explore authentic oblation ceremonies, sacred temple shrines, and verified Gayawal Purohit services for your family&apos;s spiritual peace.
            </Paragraph>
          </motion.div>
        </Container>
      </Section>

      {/* SACRED EXPERIENCES SECTION */}
      <div className="relative">
        <SacredChakraBg size="min(650px, 90vw)" opacity={0.04} rotateSpeed={140} position="top-left" />
        <ServicesSection id="services" />
      </div>

      {/* WHY GAYA SANCTUARY SECTION */}
      <div className="relative">
        <SacredChakraBg size="min(650px, 90vw)" opacity={0.04} rotateSpeed={150} position="bottom-right" />
        <WhyGayaSection id="why-gaya" />
      </div>

      {/* SACRED PLACES SECTION */}
      <div className="relative">
        <SacredChakraBg size="min(650px, 90vw)" opacity={0.04} rotateSpeed={130} position="top-right" />
        <SacredPlacesSection id="destinations" />
      </div>

      {/* TRUST & AUTHENTICITY CENTER */}
      <div className="relative">
        <SacredChakraBg size="min(650px, 90vw)" opacity={0.04} rotateSpeed={140} position="center" />
        <TrustCenterSection id="trust-center" />
      </div>

      {/* CTA SECTION */}
      <CTASection
        badge="EXPERIENCE SACRED PEACE"
        title="Begin Your Family's Sacred Journey to Gaya"
        description="Book your authentic Pind Daan ritual package with verified Gayawal Pandits and sanctuary concierge support."
      />

      <Footer />
    </main>
  );
}
