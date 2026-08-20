"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2, MessageSquareQuote, MapPin } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import IconButton from "@/components/buttons/IconButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface TestimonialStory {
  id: number;
  author: string;
  location: string;
  relation: string;
  rating: number;
  quote: string;
  story: string;
  image: string;
  verified: boolean;
}

const pitrayaTestimonials: TestimonialStory[] = [
  {
    id: 1,
    author: "Rameshwar Sharma & Family",
    location: "New Delhi",
    relation: "Pind Daan for Late Parents",
    rating: 5,
    quote: "Performing our parents' Pind Daan at Vishnupad with Pitraya brought a profound sense of closure that our family had sought for years.",
    story: "From the moment we arrived at Gaya airport, our coordinator handled every single detail. Our assigned Gayawal Pandit Ji checked our family register (Panji) dating back 4 generations. The rituals at Vishnupad Temple and Akshay Vat were conducted with such peace and authenticity. We departed with light hearts.",
    image: "/images/package_heritage_real.png",
    verified: true,
  },
  {
    id: 2,
    author: "Ananya & Rajesh Kulkarni",
    location: "Mumbai, Maharashtra",
    relation: "Tripindi Shraddha Ceremony",
    rating: 5,
    quote: "The reverence and discipline of the Gayawal Pandits brought tears of relief to my mother's eyes.",
    story: "We were worried about navigating Gaya's crowds and finding authentic priests. Pitraya's team provided a private AC car, pre-checked hotel, and dedicated Pandit Ji who guided us step-by-step through the mantras at Phalgu River ghats. Truly an indispensable service for families.",
    image: "/images/gaya_family_moment_river.png",
    verified: true,
  },
  {
    id: 3,
    author: "Dr. Vikramaditya Reddy",
    location: "Bengaluru, Karnataka",
    relation: "Annual Pitru Paksha Rites",
    rating: 5,
    quote: "An extraordinary blend of traditional Vedic sanctity and executive-level hospitality.",
    story: "I traveled from Bengaluru with my elderly uncle. Pitraya's concierge team ensured wheel-chair assistance, private mandap seating at Vishnupad, and complete sattvik meals at our hotel. Fulfilling our duty to our forefathers felt serene and dignified.",
    image: "/images/gaya_family_moment_prayer.png",
    verified: true,
  },
];

export type TestimonialsSectionProps = React.HTMLAttributes<HTMLElement>;

export default function TestimonialsSection({ className, ...props }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeItem = pitrayaTestimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % pitrayaTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + pitrayaTestimonials.length) % pitrayaTestimonials.length);
  };

  return (
    <Section
      spacing="xl"
      className={cn("relative py-24 overflow-hidden text-text-primary border-b border-border-gold/20 bg-background", className)}
      {...props}
    >
      {/* Background Sacred Circular Chakra */}
      <SacredChakraBg size="min(650px, 90vw)" opacity={0.04} rotateSpeed={150} position="bottom-right" />
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gold-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-14">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30"
          >
            <MessageSquareQuote className="h-3.5 w-3.5" />
            <span>FAMILY REFLECTIONS</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Words From Our{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Community
            </GradientText>
          </Heading>

          <Paragraph size="md" align="center" variant="muted" className="max-w-2xl mx-auto">
            Read real reflections shared by families who have completed their sacred ancestral pilgrimages in Gaya with Pitraya.
          </Paragraph>
        </div>

        {/* CAROUSEL SPOTLIGHT LAYOUT — Split Real Photography + Story Card */}
        <div className="max-w-5xl mx-auto">
          <GlassCard
            borderGold
            glow
            padding="none"
            className="relative bg-gradient-to-br from-surface via-background to-surface rounded-2xl overflow-hidden shadow-xl border border-gold-primary/30"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]"
              >
                {/* Left Column: Real Family Pilgrimage Photograph */}
                <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[260px] overflow-hidden group">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.author}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/80" />
                  
                  {/* Badge on photo */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold text-gold-primary border border-gold-primary/30 shadow-md">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Gaya, Bihar • Verified Pilgrimage</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-xs font-cinzel text-gold-primary italic">
                    {activeItem.author} — {activeItem.location}
                  </div>
                </div>

                {/* Right Column: Authentic Family Reflection Story */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  {/* Top: Stars & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(activeItem.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold-primary text-gold-primary" />
                      ))}
                    </div>
                    {activeItem.verified && (
                      <div className="flex items-center gap-1.5 rounded-full bg-gold-primary/10 px-3 py-1 text-[11px] font-semibold text-gold-primary border border-gold-primary/30">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-primary" />
                        <span>Verified Family Review</span>
                      </div>
                    )}
                  </div>

                  {/* Quote Headline */}
                  <div className="relative">
                    <Quote className="h-8 w-8 text-gold-primary/20 absolute -top-3 -left-2" />
                    <Heading size="md" font="serif" className="italic font-medium leading-relaxed text-text-primary text-lg sm:text-xl pt-2">
                      &ldquo;{activeItem.quote}&rdquo;
                    </Heading>
                  </div>

                  {/* Story Text */}
                  <Paragraph size="sm" variant="muted" className="leading-relaxed text-text-secondary">
                    {activeItem.story}
                  </Paragraph>

                  {/* Author Info & Controls */}
                  <div className="pt-4 border-t border-border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold font-cinzel text-gold-primary">{activeItem.author}</h4>
                      <p className="text-xs text-text-muted">{activeItem.relation} • {activeItem.location}</p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-2">
                      <IconButton
                        ariaLabel="Previous Reflection"
                        variant="outline"
                        shape="circle"
                        size="sm"
                        onClick={handlePrev}
                        icon={<ChevronLeft className="h-4 w-4" />}
                      />
                      <span className="text-xs text-text-muted px-2 font-mono">
                        {currentIndex + 1} / {pitrayaTestimonials.length}
                      </span>
                      <IconButton
                        ariaLabel="Next Reflection"
                        variant="outline"
                        shape="circle"
                        size="sm"
                        onClick={handleNext}
                        icon={<ChevronRight className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>

      </Container>
    </Section>
  );
}
