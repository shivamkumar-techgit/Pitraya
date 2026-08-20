"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import GradientText from "@/components/typography/GradientText";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

interface EmotionPhoto {
  src: string;
  alt: string;
  caption: string;
  /** tall = portrait, wide = landscape, sq = square */
  aspect?: "tall" | "wide" | "sq";
}

export type EmotionGallerySectionProps = React.HTMLAttributes<HTMLElement>;

const photos: EmotionPhoto[] = [
  {
    src: "/images/gaya_family_moment_prayer.png",
    alt: "Family united in prayer performing Pinda Daan ceremony at Gaya",
    caption: "A family united in ancestral prayer",
    aspect: "tall",
  },
  {
    src: "/images/gaya_family_moment_hands.png",
    alt: "Close-up of hands offering sacred pindas with brass pooja thali",
    caption: "Hands carrying a thousand prayers",
    aspect: "sq",
  },
  {
    src: "/images/gaya_family_moment_river.png",
    alt: "Pilgrim family performing Tarpan oblations on Phalgu River banks at sunrise",
    caption: "Dawn tarpan on the sacred Phalgu River",
    aspect: "wide",
  },
  {
    src: "/images/gaya_family_moment_havan.png",
    alt: "Family sitting together at Yagya fire altar in Gaya temple",
    caption: "Flames carrying offerings to the cosmos",
    aspect: "sq",
  },
  {
    src: "/images/gayawal_pandit_authentic.png",
    alt: "Authentic hereditary Gayawal Pandit guiding ritual ceremony",
    caption: "Hereditary Gayawal Pandit — keeper of lineage",
    aspect: "tall",
  },
  {
    src: "/images/gaya_sacred_place_falgu.png",
    alt: "Pilgrims reflecting quietly after ancestral rites at sunrise",
    caption: "Eternal peace for seven generations",
    aspect: "wide",
  },
];

export default function EmotionGallerySection({
  className,
  ...props
}: EmotionGallerySectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn(
        "border-border-gold/15 relative overflow-hidden border-b bg-muted py-24",
        className
      )}
      {...props}
    >
      {/* Background Sacred Circular Chakra & Ambient glow */}
      <SacredChakraBg
        size="min(600px, 85vw)"
        opacity={0.04}
        rotateSpeed={160}
        position="center"
      />
      <div className="bg-gold-primary/4 pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]" />

      <Container size="xl" className="relative z-10">
        {/* Section header — intentionally minimal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 space-y-3 text-center"
        >
          <p className="text-gold-primary text-xs font-bold tracking-[0.3em] uppercase">
            CHAPTER 07 • REAL FAMILY MOMENTS
          </p>
          <h2 className="font-cinzel text-text-primary text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">
            People remember{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              emotions,
            </GradientText>{" "}
            not itineraries.
          </h2>
          <p className="text-text-muted mx-auto max-w-xl font-serif text-base italic">
            What does this sacred moment feel like for a real family? These are
            the moments that bring eternal peace.
          </p>
        </motion.div>

        {/* Free-floating masonry grid */}
        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...({ whileHover: { scale: 1.02 } } as any)}
              className={cn(
                "group border-border-gold/20 relative cursor-pointer overflow-hidden rounded-2xl border",
                photo.aspect === "tall" && "row-span-2",
                photo.aspect === "wide" && "col-span-2"
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                unoptimized
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover brightness-[0.85] transition-transform duration-700 group-hover:scale-105 group-hover:brightness-95"
              />

              {/* Caption — fades up on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <p className="font-cinzel text-gold-primary absolute right-4 bottom-4 left-4 text-xs tracking-wider italic opacity-0 transition-all duration-400 group-hover:opacity-100">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing emotional line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-muted mx-auto mt-12 max-w-md text-center font-serif text-sm italic"
        >
          &ldquo;What the eyes see here, the soul carries for seven
          lifetimes.&rdquo;
        </motion.p>
      </Container>
    </Section>
  );
}
