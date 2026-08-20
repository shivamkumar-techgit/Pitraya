"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, HeartHandshake, Compass, Quote, ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface StorySectionProps extends React.HTMLAttributes<HTMLElement> {
  subtitle?: string;
  title?: string;
  description?: string;
  image?: string;
  badge?: string;
}

export default function StorySection({
  subtitle = "CHAPTER 02 • WHY WE HONOR THE ANCESTORS",
  title = "Every family carries a silent lineage connection. Vedic scriptures describe this as Pitru Rin—the ancestral debt we resolve through love and oblation.",
  description = "By offering sacred Pindas at Gaya, you do not merely perform a ritual. You provide ancestral liberation (Moksha) and secure divine blessings for the next seven generations of your lineage.",
  image = "/images/gaya_sacred_tradition.png",
  badge = "Sacred Heritage of Gaya",
  className,
  ...props
}: StorySectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn(
        "relative min-h-[85vh] py-24 flex items-center overflow-hidden text-text-primary border-y border-border-gold/20",
        "bg-background",
        className
      )}
      {...props}
    >
      {/* Background Ambient Glows & Sacred Circular Chakra */}
      <SacredChakraBg size="min(600px, 85vw)" opacity={0.04} rotateSpeed={130} position="top-left" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-gold-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gold-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Magazine Split Layout (60 / 40 offset stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT 7 COLS: Editorial Typography Column with Large Pull-Quote */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{subtitle}</span>
            </motion.div>

            {/* Emotional Question / Headline */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gold-accent uppercase tracking-widest block font-cinzel">
                Why do families undertake this sacred journey?
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-cinzel font-medium leading-[1.35] text-text-primary/95"
              >
                For thousands of years, families from across India have travelled to{" "}
                <span className="text-gold-primary font-semibold">Gaya</span> to perform{" "}
                <GradientText variant="gold" size="inherit" font="cinzel" className="font-semibold">
                  Pind Daan
                </GradientText>
                , seeking peace for their ancestors and spiritual liberation according to Vedic tradition.
              </motion.h2>
            </div>

            {/* Pull Quote Box */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative pl-6 border-l-2 border-gold-primary/60 my-6 py-2 bg-gradient-to-r from-gold-primary/5 to-transparent rounded-r-xl"
            >
              <Quote className="h-6 w-6 text-gold-primary/40 absolute -top-3 left-3 -translate-y-1/2" />
              <Paragraph
                size="lg"
                font="serif"
                className="text-lg md:text-xl italic leading-relaxed text-gold-accent/90"
              >
                &ldquo;{description}&rdquo;
              </Paragraph>
            </motion.div>

            {/* Trust Assurance Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 border-t border-border-gold/20 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-primary/15 text-gold-primary border border-gold-primary/30">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-cinzel text-text-primary uppercase tracking-wider">Lineage Guidance</h4>
                  <p className="text-xs text-text-muted">Hereditary Gayawal Pandits</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-primary/15 text-gold-primary border border-gold-primary/30">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-cinzel text-text-primary uppercase tracking-wider">Full Comfort</h4>
                  <p className="text-xs text-text-muted">Private transport & stay</p>
                </div>
              </div>
            </motion.div>

            {/* Educational CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6"
            >
              <SecondaryButton
                onClick={() => window.location.href = "/blog/why-pitraya-exists"}
                rightIcon={<ArrowRight className="h-4 w-4 text-gold-primary" />}
                className="hover:scale-105 transition-transform"
              >
                Understand the Science of Shraddha
              </SecondaryButton>
            </motion.div>
          </div>

          {/* RIGHT 5 COLS: Offset Magazine Stacked Image Collage */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Primary Large Image Frame */}
              <div className="relative h-[380px] sm:h-[440px] w-[88%] rounded-2xl overflow-hidden border border-gold-primary/40 shadow-xl group">
                <Image
                  src={image}
                  alt="Pinda Daan Ceremony Gaya"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-black/75 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold text-gold-primary border border-gold-primary/30 uppercase tracking-widest">
                  {badge}
                </span>
              </div>

              {/* Offset Overlapping Secondary Image Frame */}
              <div className="absolute -bottom-10 right-0 w-[55%] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden border-2 border-gold-primary/60 shadow-xl group bg-black">
                <Image
                  src="/images/gayawal_pandit_authentic.png"
                  alt="Authentic Gayawal Pandit"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest block">Gayawal Pandit</span>
                  <span className="text-xs text-white font-cinzel font-medium">Hereditary Priest Rites</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
