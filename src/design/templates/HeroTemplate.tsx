"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { motion } from "framer-motion";

export interface HeroTemplateProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta?: React.ReactNode;
  secondaryCta?: React.ReactNode;
  trustBadges?: React.ReactNode;
  backgroundElement?: React.ReactNode;
  className?: string;
}

export default function HeroTemplate({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  trustBadges,
  backgroundElement,
  className,
}: HeroTemplateProps) {
  return (
    <section className={cn("relative min-h-[90vh] flex flex-col justify-center overflow-hidden", className)}>
      {/* Background Layer */}
      {backgroundElement && (
        <div className="absolute inset-0 z-0">
          {backgroundElement}
        </div>
      )}
      
      {/* Dark Overlay for Hero (Hero is always dark theme) */}
      <div className="absolute inset-0 bg-gradient-hero z-10 opacity-70" />

      {/* Content Layer */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-6 md:space-y-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
          className="space-y-6 max-w-4xl"
        >
          {badge && <div className="mb-4">{badge}</div>}
          
          <Heading size="display" variant="default">
            {title}
          </Heading>
          
          <Paragraph size="xl" variant="subtle" className="max-w-2xl mx-auto">
            {description}
          </Paragraph>
        </motion.div>

        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.0, 0.0, 0.2, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          >
            {primaryCta}
            {secondaryCta}
          </motion.div>
        )}

        {trustBadges && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 pt-12 border-t border-border-gold/20 w-full max-w-3xl"
          >
            {trustBadges}
          </motion.div>
        )}
      </div>
    </section>
  );
}
