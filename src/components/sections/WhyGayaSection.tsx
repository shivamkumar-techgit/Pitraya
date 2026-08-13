"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Sun, Heart, Flame } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GayaAnimatedMap from "@/components/common/GayaAnimatedMap";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

interface ScriptureStory {
  scripture: string;
  title: string;
  narrative: string;
  image: string;
  icon: React.ReactNode;
}

const scriptureStories: ScriptureStory[] = [
  {
    scripture: "Vishnu Purana & Garuda Purana",
    title: "The Divine Decree of Moksha",
    narrative:
      "The Vishnu Purana declares Gaya as the sole realm on Earth where Pind Daan grants immediate Moksha to ancestors. The Garuda Purana confirms that offering oblations at Gaya liberates not just the departed soul, but seven generations of the family lineage from the cycle of birth and rebirth.",
    image: "/images/gaya_scripture_garuda_purana.png",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    scripture: "The Ramayana Chronicles",
    title: "Sita Devi's Oblation to King Dasharatha",
    narrative:
      "During their exile, Lord Rama and Sita Devi journeyed to Gaya to perform ancestral rites for King Dasharatha. When Rama went to fetch pooja items, Dasharatha's spirit manifested before Sita. She offered sand-pindas on the Phalgu River banks, witnessed by the river, the Akshay Vat tree, and the Brahmin cow.",
    image: "/images/gaya_scripture_ramayana.png",
    icon: <Flame className="text-gold-primary h-4 w-4" />,
  },
  {
    scripture: "The Mahabharata Legacy",
    title: "Yudhishthira's Rites After the War",
    narrative:
      "Following the Kurukshetra war, King Yudhishthira travelled to Gaya to perform Pind Daan and Shraddha rites for all fallen warriors. The epic records that only through Gaya's sacred soil could the souls of both Pandavas and Kauravas achieve supreme ancestral peace.",
    image: "/images/gaya_scripture_mahabharata.png",
    icon: <Heart className="text-gold-primary h-4 w-4" />,
  },
  {
    scripture: "The Gayasura Legend",
    title: "The Demon Who Became Sacred Ground",
    narrative:
      "Gayasura performed such intense penance that his body became holy. Lord Vishnu placed His sacred right foot upon Gayasura's chest, blessing him that anyone offering Pind Daan on this land would grant their ancestors direct entry to Vaikuntha. The Vishnupad Temple marks this divine footprint.",
    image: "/images/gaya_scripture_gayasura.png",
    icon: <Sun className="text-gold-primary h-4 w-4" />,
  },
];

export default function WhyGayaSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <Section
      ref={containerRef}
      spacing="lg"
      className={cn(
        "text-text-primary border-border-gold/20 relative overflow-hidden border-b bg-black py-16 sm:py-20",
        className
      )}
      {...props}
    >
      {/* Background Glows & Sacred Circular Chakra */}
      <SacredChakraBg
        size="min(650px, 85vw)"
        opacity={0.04}
        rotateSpeed={140}
        position="top-right"
      />
      <div className="bg-gold-primary/10 pointer-events-none absolute top-10 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-[160px]" />

      <Container size="xl" className="relative z-10 space-y-14 sm:space-y-16">
        {/* 1. HEADER */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gold-primary/10 text-gold-primary border-gold-primary/30 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>CHAPTER 04 • SACRED HISTORY & SCRIPTURE</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            Why{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Gaya?
            </GradientText>
          </Heading>

          <Paragraph
            size="md"
            align="center"
            variant="muted"
            className="text-text-secondary mx-auto max-w-2xl font-serif leading-relaxed italic"
          >
            Why is Gaya the only land on Earth decreed in Vishnu Purana, Garuda
            Purana, Ramayana, and Mahabharata for ancestral liberation?
          </Paragraph>
        </div>

        {/* 2. SCRIPTURE STORIES — Compact 2x2 Grid Layout */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <SubHeading
              size="sm"
              variant="gold"
              uppercase
              align="center"
              font="cinzel"
            >
              Scriptural Authority & Ancient Epics
            </SubHeading>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {scriptureStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group border-gold-primary/25 bg-surface/40 hover:border-gold-primary/60 relative flex flex-col justify-between overflow-hidden rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300"
              >
                {/* Header Image with Gradient & Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-amber-950/60 via-slate-950 to-black sm:h-48">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="text-gold-primary border-gold-primary/30 absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border bg-black/75 px-3 py-1 text-[11px] font-semibold shadow-md backdrop-blur-md">
                    {story.icon}
                    <span>{story.scripture}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between space-y-2.5 p-5 sm:p-6">
                  <div className="space-y-2">
                    <Heading
                      size="sm"
                      font="cinzel"
                      className="text-text-primary group-hover:text-gold-primary transition-colors"
                    >
                      {story.title}
                    </Heading>
                    <Paragraph
                      size="xs"
                      variant="muted"
                      className="text-text-secondary leading-relaxed"
                    >
                      {story.narrative}
                    </Paragraph>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. INTERACTIVE MAP */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <SubHeading
              size="sm"
              variant="gold"
              uppercase
              align="center"
              font="cinzel"
            >
              Interactive Sacred Geography Map
            </SubHeading>
          </div>
          <GayaAnimatedMap />
        </div>
      </Container>
    </Section>
  );
}
