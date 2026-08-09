"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Paragraph from "@/components/typography/Paragraph";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

export interface GallerySectionProps extends React.HTMLAttributes<HTMLElement> {
  subtitle?: string;
  title?: string;
  description?: string;
  images?: GalleryItem[];
}

const defaultImages: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    alt: "Meditation Chamber",
    title: "The Golden Sanctuary",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    alt: "Aromatherapy Oils",
    title: "Botanical Elixirs",
    category: "Apothecary",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    alt: "Thermal Hydro Pool",
    title: "Mineral Water Plunge",
    category: "Hydrotherapy",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    alt: "Yoga Meditation",
    title: "Dawn Mindfulness",
    category: "Movement",
  },
];

export default function GallerySection({
  subtitle = "VISUAL IMMERSION",
  title = "Explore Our Sanctuaries",
  description = "A glimpse into the serene spaces, natural textures, and calming ambiances created for your restoration.",
  images = defaultImages,
  className,
  ...props
}: GallerySectionProps) {
  return (
    <Section spacing="xl" className={cn("relative overflow-hidden", className)} {...props}>
      {/* Background Sacred Circular Chakra */}
      <SacredChakraBg size="min(650px, 90vw)" opacity={0.04} rotateSpeed={150} position="bottom-left" />
      <Container size="xl">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          {subtitle && (
            <SubHeading size="sm" variant="gold" uppercase align="center" font="cinzel">
              {subtitle}
            </SubHeading>
          )}
          <Heading size="xl" align="center" font="cinzel">
            {title}
          </Heading>
          {description && (
            <Paragraph size="lg" align="center" variant="muted">
              {description}
            </Paragraph>
          )}
        </div>

        <Grid cols={{ initial: 1, sm: 2, lg: 4 }} gap="md">
          {images.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative h-80 w-full overflow-hidden rounded-2xl glass-panel border-gold-primary/20 cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {item.category && (
                  <span className="text-xs font-semibold text-gold-primary uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                )}
                {item.title && (
                  <Heading size="sm" className="text-white font-serif">
                    {item.title}
                  </Heading>
                )}
              </div>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
