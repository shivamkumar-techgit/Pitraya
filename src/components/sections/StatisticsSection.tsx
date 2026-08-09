"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Heart, Users, Star, Landmark } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import Statistics from "@/components/common/Statistics";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface StatisticsSectionProps extends React.HTMLAttributes<HTMLElement> {
  subtitle?: string;
  title?: string;
  description?: string;
}

const pitrayaMetrics = [
  {
    value: "10,000+",
    label: "Families Guided",
    description: "Families assisted in completing authentic Gaya Pind Daan rituals.",
    icon: <Users className="h-5 w-5 text-gold-primary" />,
  },
  {
    value: "100%",
    label: "Authentic Gayawal Pandits",
    description: "Every ceremony led by verified hereditary priests with lineage Panjis.",
    icon: <Landmark className="h-5 w-5 text-gold-primary" />,
  },
  {
    value: "4.95 / 5",
    label: "Family Satisfaction",
    description: "Rated for serenity, clear coordination, and complete peace of mind.",
    icon: <Star className="h-5 w-5 text-gold-primary" />,
  },
  {
    value: "7 Generations",
    label: "Ancestral Liberation",
    description: "Vedic Pind Daan rites granting Moksha according to Garuda Purana.",
    icon: <Heart className="h-5 w-5 text-gold-primary" />,
  },
];

export default function StatisticsSection({
  subtitle = "MEASURED IN TRUST",
  title = "Our Sacred Impact",
  description = "A testament to our unwavering dedication to ancestral peace, authentic lineage traditions, and full hospitality.",
  className,
  ...props
}: StatisticsSectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn(
        "relative py-20 overflow-hidden text-text-primary border-b border-border-gold/20",
        "[background:radial-gradient(ellipse_at_center,_#1C1400_0%,_#0A0900_55%,_#000_100%)]",
        className
      )}
      {...props}
    >
      {/* Background Sacred Circular Chakra */}
      <SacredChakraBg size="min(550px, 80vw)" opacity={0.05} rotateSpeed={120} position="center" />
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-12">
        {/* Full-width Centered Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30"
          >
            <Award className="h-3.5 w-3.5" />
            <span>CHAPTER 08 • MEASURED IN TRUST</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            {title === "Our Sacred Impact" ? (
              <>
                Our Sacred{" "}
                <GradientText variant="gold" size="inherit" font="cinzel">
                  Impact
                </GradientText>
              </>
            ) : (
              title
            )}
          </Heading>

          <Paragraph size="md" align="center" variant="muted" className="max-w-xl mx-auto">
            Can I trust Pitraya with my family&apos;s sacred duty? 10,000+ families guided with authentic Gayawal Pandits and complete sanctity.
          </Paragraph>
        </div>

        {/* FULL-WIDTH COUNTER BAR LAYOUT — Horizontal Strip Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-gold-primary/30 bg-surface/30 backdrop-blur-xl p-8 sm:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border-gold/20">
            {pitrayaMetrics.map((metric, idx) => (
              <div key={idx} className={cn("space-y-3 text-center sm:text-left", idx > 0 ? "sm:pl-8 pt-6 sm:pt-0" : "")}>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-primary/15 border border-gold-primary/30">
                  {metric.icon}
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-cinzel font-bold text-gold-primary tracking-tight">
                    {metric.value}
                  </h3>
                  <h4 className="text-sm font-semibold font-cinzel text-text-primary mt-1">
                    {metric.label}
                  </h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
