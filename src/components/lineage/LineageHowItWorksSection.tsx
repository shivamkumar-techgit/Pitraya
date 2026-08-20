"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Search, ShieldCheck, Award, ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  highlight: string;
}

const howItWorksSteps: HowItWorksStep[] = [
  {
    stepNumber: "01",
    title: "Submit Family Details",
    subtitle: "Share Gotra & Native Origins",
    description: "Fill in your family surname, Gotra, native village, and any known names of departed ancestors.",
    icon: <FileText className="h-6 w-6 text-gold-primary" />,
    highlight: "Simple 2-minute submission",
  },
  {
    stepNumber: "02",
    title: "Pandit Searches Records",
    subtitle: "Palm-Leaf Panji Verification",
    description: "Our senior Gayawal Pandits search through centuries-old handwritten palm-leaf archives in Gaya.",
    icon: <Search className="h-6 w-6 text-gold-primary" />,
    highlight: "Authentic physical registers",
  },
  {
    stepNumber: "03",
    title: "Lineage Verified",
    subtitle: "Ancestral Connection Found",
    description: "Historical entry dates, ancestral signatures, and priest lineage matches are formally verified.",
    icon: <ShieldCheck className="h-6 w-6 text-gold-primary" />,
    highlight: "Human expert confirmation",
  },
  {
    stepNumber: "04",
    title: "Receive Digital Report",
    subtitle: "Certified Sacred Heritage",
    description: "Receive your signed Digital Lineage Certificate with QR verification code and booking privileges.",
    icon: <Award className="h-6 w-6 text-gold-primary" />,
    highlight: "Official Gayawal seal issued",
  },
];

export type LineageHowItWorksSectionProps = React.HTMLAttributes<HTMLElement>;

export default function LineageHowItWorksSection({ className, ...props }: LineageHowItWorksSectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn("relative py-24 overflow-hidden bg-background text-text-primary border-b border-border-gold/20", className)}
      {...props}
    >
      {/* Sacred Rotating Circular Chakra */}
      <SacredChakraBg size="min(700px, 90vw)" opacity={0.04} rotateSpeed={150} position="top-left" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <span>FOUR SIMPLE STEPS TO SACRED CLARITY</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            How It{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Works
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted">
            From submitting basic family details to receiving a certified ancestral lineage report signed by Gayawal Pandits.
          </Paragraph>
        </div>

        {/* 4 BEAUTIFUL STEP CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              <GlassCard
                borderGold
                hoverEffect="lift"
                className="h-full flex flex-col justify-between p-6 space-y-6 relative overflow-hidden group bg-surface/80"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-gold-primary/10 border border-gold-primary/30 text-gold-primary group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <span className="text-2xl font-bold font-cinzel text-gold-primary/40 group-hover:text-gold-primary transition-colors">
                      {step.stepNumber}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel">
                      {step.subtitle}
                    </span>
                    <h3 className="text-lg font-bold font-cinzel text-text-primary">
                      {step.title}
                    </h3>
                  </div>

                  <Paragraph size="sm" variant="muted" className="leading-relaxed text-xs sm:text-sm">
                    {step.description}
                  </Paragraph>
                </div>

                <div className="pt-3 border-t border-border-gold/20 flex items-center justify-between text-xs text-gold-primary font-medium">
                  <span>✓ {step.highlight}</span>
                  {idx < howItWorksSteps.length - 1 && (
                    <span className="hidden lg:inline text-gold-primary/40">↓</span>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
