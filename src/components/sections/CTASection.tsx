"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import MagneticButton from "@/components/buttons/MagneticButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title?: string;
  description?: string;
  image?: string;
  primaryCta?: {
    text: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    onClick?: () => void;
  };
  className?: string;
}

export default function CTASection({
  badge = "BEGIN YOUR SACRED JOURNEY",
  title = "Ready to Fulfill Your Sacred Duty to Your Forefathers?",
  description = "Connect with our Gayawal Pandits and Sanctuary Concierge to plan your family's Pind Daan pilgrimage to Gaya.",
  image = "/images/gaya_vishnupad_temple.png",
  primaryCta = { text: "Book Your Ritual Now" },
  secondaryCta = { text: "Speak With Concierge" },
  className,
  ...props
}: CTASectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn("relative overflow-hidden py-28", className)}
      {...props}
    >
      <Container size="xl">
        <div className="border-gold-primary/40 hover:border-gold-primary/60 hover:shadow-gold-glow bg-surface/10 relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-[2.5rem] border p-8 text-center backdrop-blur-sm transition-all duration-500 sm:p-12">
          {/* Temple Background Image with Dark Vignette */}
          {image && (
            <div className="absolute inset-0 z-0 h-full w-full select-none">
              <Image
                src={image}
                alt="Sacred Gaya Temple"
                fill
                unoptimized
                sizes="(max-width: 1200px) 100vw, 90vw"
                className="scale-102 object-cover brightness-[0.35] contrast-[1.15] filter"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/30" />
              <div className="from-gold-primary/15 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-transparent to-black/80" />
              {/* Sacred Circular Chakra Watermark */}
              <SacredChakraBg
                size="min(600px, 85vw)"
                opacity={0.065}
                rotateSpeed={120}
              />
            </div>
          )}

          {/* Foreground Text Content */}
          <div className="relative z-10 max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gold-primary/20 text-gold-primary border-gold-primary/40 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{badge}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Heading
                size="2xl"
                align="center"
                font="cinzel"
                className="text-white drop-shadow-md"
              >
                {title}
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Paragraph
                size="lg"
                align="center"
                variant="muted"
                className="mx-auto max-w-xl text-gray-200"
              >
                {description}
              </Paragraph>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
            >
              <MagneticButton
                size="lg"
                onClick={() => {
                  if (primaryCta.onClick) primaryCta.onClick();
                  else window.location.href = "/book-now";
                }}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {primaryCta.text}
              </MagneticButton>
              <SecondaryButton
                size="lg"
                onClick={() => {
                  if (secondaryCta.onClick) secondaryCta.onClick();
                  else window.location.href = "/contact";
                }}
              >
                {secondaryCta.text}
              </SecondaryButton>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
