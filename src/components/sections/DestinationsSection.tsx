"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Hotel, Car } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Paragraph from "@/components/typography/Paragraph";
import SacredPlacesSection from "./SacredPlacesSection";
import { cn } from "@/lib/utils";
import DestinationCard, { DestinationCardProps } from "@/components/cards/DestinationCard";
import { FadeIn, StaggerChildren } from "@/components/animations";
import SacredChakraBg from "@/components/animations/SacredChakraBg";

export interface DestinationsSectionProps extends React.HTMLAttributes<HTMLElement> {
  subtitle?: string;
  title?: string;
  description?: string;
}

type DestinationTab = "places" | "hotels" | "transport";

const tabs: { id: DestinationTab; label: string; icon: React.ReactNode }[] = [
  { id: "places",    label: "Sacred Places",  icon: <MapPin className="h-4 w-4" /> },
  { id: "hotels",    label: "Hotels",         icon: <Hotel className="h-4 w-4" /> },
  { id: "transport", label: "Transport",      icon: <Car className="h-4 w-4" /> },
];

const hotels: DestinationCardProps[] = [
  {
    image: "/images/hotel_luxury_suite.png",
    title: "Pitraya Executive Pilgrimage Sanctuary",
    location: "Gaya (5 mins from Vishnupad Temple)",
    rating: 5.0,
    reviewsCount: 340,
    price: "Included in Package",
    tag: "✔ Included in Heritage (3★)",
    actionText: "Reserve Suite",
  },
  {
    image: "/images/hotel_bodhgaya_regency.png",
    title: "Bodhgaya Regency Heritage Resort",
    location: "Bodh Gaya (10 mins from Vishnupad)",
    rating: 4.9,
    reviewsCount: 420,
    price: "Included in Package",
    tag: "✔ Included in Moksha (4★)",
    actionText: "Reserve Suite",
  },
  {
    image: "/images/hotel_royal_heritage.png",
    title: "The Royal Heritage Residency",
    location: "Gaya City Temple Zone",
    rating: 4.8,
    reviewsCount: 290,
    price: "Included in Package",
    tag: "✔ Included in Royal (Luxury)",
    actionText: "Reserve Suite",
  },
];

const transports: DestinationCardProps[] = [
  {
    image: "/images/transport_luxury_sedan.png",
    title: "Luxury Executive Sedan",
    location: "Gaya Airport & Temple Transfers",
    rating: 4.9,
    reviewsCount: 180,
    price: "Included in Package",
    tag: "✔ Included in Heritage",
    actionText: "Reserve Vehicle",
  },
  {
    image: "/images/transport_family_mpv.png",
    title: "Executive Family Chauffeur MPV",
    location: "Family Group Local Transfers",
    rating: 5.0,
    reviewsCount: 260,
    price: "Included in Package",
    tag: "✔ Included in Moksha (Innova)",
    actionText: "Reserve Vehicle",
  },
  {
    image: "/images/transport_luxury_suv.png",
    title: "Premium Terrain Luxury SUV",
    location: "Gaya Airport & Intercity Transfers",
    rating: 4.8,
    reviewsCount: 140,
    price: "Included in Package",
    tag: "✔ Included in Royal (Luxury SUV)",
    actionText: "Reserve Vehicle",
  },
];

export default function DestinationsSection({
  subtitle = "CHAPTER 06 • SACRED PLACES & SANCTUARIES",
  title = "Holy Shrines, Stays & Sacred Transfers",
  description = "Where will our family offer oblations, bow in prayer, and rest in Gaya?",
  className,
  ...props
}: DestinationsSectionProps) {
  const [activeTab, setActiveTab] = useState<DestinationTab>("places");

  return (
    <Section
      spacing="xl"
      className={cn("relative overflow-hidden bg-black border-b border-border-gold/20 py-24", className)}
      {...props}
    >
      {/* Background Sacred Circular Chakra */}
      <SacredChakraBg size="min(600px, 85vw)" opacity={0.04} rotateSpeed={140} position="top-right" />
      <Container size="xl">
        {/* Section Header */}
        <FadeIn className="mx-auto max-w-3xl text-center space-y-4 mb-12">
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
        </FadeIn>

        {/* Tab Switcher */}
        <FadeIn delay={0.15} className="flex justify-center mb-12">
          <div className="inline-flex gap-2 p-1.5 rounded-2xl bg-surface/10 border border-border-gold/20 backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-gold-primary text-black shadow-md shadow-gold-primary/20"
                    : "text-text-muted hover:text-text-primary hover:bg-surface/30"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          {activeTab === "places" && (
            <motion.div
              key="places"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <SacredPlacesSection className="!py-0 !border-0 !bg-transparent" />
            </motion.div>
          )}

          {activeTab === "hotels" && (
            <motion.div
              key="hotels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <StaggerChildren>
                <Grid cols={{ initial: 1, md: 3 }} gap="lg">
                  {hotels.map((hotel, idx) => (
                    <DestinationCard key={idx} {...hotel} />
                  ))}
                </Grid>
              </StaggerChildren>
            </motion.div>
          )}

          {activeTab === "transport" && (
            <motion.div
              key="transport"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <StaggerChildren>
                <Grid cols={{ initial: 1, md: 3 }} gap="lg">
                  {transports.map((t, idx) => (
                    <DestinationCard key={idx} {...t} />
                  ))}
                </Grid>
              </StaggerChildren>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
