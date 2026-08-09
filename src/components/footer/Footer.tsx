"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import GradientText from "@/components/typography/GradientText";
import Paragraph from "@/components/typography/Paragraph";
import Newsletter from "./Newsletter";
import FooterLinks from "./FooterLinks";
import ContactCard from "./ContactCard";
import SocialLinks from "./SocialLinks";
import FooterBottom from "./FooterBottom";
import Logo from "@/components/common/Logo";
import { cn } from "@/lib/utils";

// Decorative Temple & Sacred Geometry SVG Component
function DecorativeTempleSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-auto max-h-48 text-gold-primary/20 hover:text-gold-primary/30 transition-colors duration-500", className)}
      aria-hidden="true"
    >
      {/* Outer Glow Lines */}
      <path
        d="M600 20 L660 70 L740 70 L680 120 L700 200 L600 150 L500 200 L520 120 L460 70 L540 70 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      
      {/* Temple Roof Apex */}
      <path
        d="M600 10 L680 60 L780 60 L850 110 L950 110 L1050 170 L1180 170"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M600 10 L520 60 L420 60 L350 110 L250 110 L150 170 L20 170"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Pillars & Archways */}
      <line x1="600" y1="10" x2="600" y2="210" stroke="currentColor" strokeWidth="1" />
      <circle cx="600" cy="110" r="45" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="600" cy="110" r="25" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      
      {/* Pagoda Tiers */}
      <path d="M500 90 H700" stroke="currentColor" strokeWidth="1.5" />
      <path d="M440 130 H760" stroke="currentColor" strokeWidth="1.5" />
      <path d="M380 170 H820" stroke="currentColor" strokeWidth="2" />
      <path d="M300 210 H900" stroke="currentColor" strokeWidth="2.5" />

      {/* Lotus Petals Base */}
      <path d="M550 210 C 570 180, 630 180, 650 210" stroke="currentColor" strokeWidth="1.5" />
      <path d="M520 210 C 560 160, 640 160, 680 210" stroke="currentColor" strokeWidth="1.5" />
      <path d="M480 210 C 540 140, 660 140, 720 210" stroke="currentColor" strokeWidth="1.5" />

      {/* Rays of Radiance */}
      <line x1="600" y1="110" x2="350" y2="30" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="600" y1="110" x2="850" y2="30" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="600" y1="110" x2="200" y2="110" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="600" y1="110" x2="1000" y2="110" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-text-primary border-t border-border-gold/30 pt-20 pb-8 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Logo & Tagline Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <Logo size="lg" variant="stacked" text="PITRAYA" tagline="ANCESTRAL RITES • GAYA SANCTUARY" />

          <Paragraph size="lg" align="center" variant="muted" font="serif" className="italic max-w-lg pt-2">
            &ldquo;Guiding every family with authentic Vedic rituals, experienced Gayawal Pandits, and complete comfort.&rdquo;
          </Paragraph>
        </div>

        {/* Newsletter Section */}
        <Newsletter />

        {/* Links & Contact details */}
        <Grid cols={{ initial: 1, lg: 4 }} gap="xl" className="pt-4">
          <div className="lg:col-span-3">
            <FooterLinks />
          </div>
          <div>
            <ContactCard />
          </div>
        </Grid>

        {/* Social Links */}
        <SocialLinks />

        {/* Copyright & Legal Bottom bar */}
        <FooterBottom />

        {/* Decorative Temple SVG */}
        <div className="pt-8 flex justify-center">
          <DecorativeTempleSVG />
        </div>
      </Container>
    </footer>
  );
}
