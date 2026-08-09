"use client";

import React from "react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Paragraph from "@/components/typography/Paragraph";
import DestinationCard, { DestinationCardProps } from "@/components/cards/DestinationCard";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface HotelsSectionProps extends React.HTMLAttributes<HTMLElement> {
  subtitle?: string;
  title?: string;
  description?: string;
}

const defaultHotels: DestinationCardProps[] = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    title: "Bodhgaya Regency Sanctuary",
    location: "Bodh Gaya (5 mins from Mahabodhi)",
    rating: 5.0,
    reviewsCount: 340,
    price: "$180/night",
    tag: "Zen Retreat",
    actionText: "Book Suite",
  },
  {
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    title: "Hyatt Place Zen Haven",
    location: "Gaya City (10 mins from Vishnupad)",
    rating: 4.9,
    reviewsCount: 420,
    price: "$220/night",
    tag: "Modern Luxury",
    actionText: "Book Suite",
  },
  {
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    title: "The Royal Heritage Residency",
    location: "Bodh Gaya Temple Zone",
    rating: 4.8,
    reviewsCount: 290,
    price: "$260/night",
    tag: "Palace Suite",
    actionText: "Book Suite",
  },
];

export default function HotelsSection({
  subtitle = "ZEN SUITES & ACCOMMODATIONS",
  title = "Partner Hotel Sanctuaries",
  description = "Retreat into peaceful luxury after your ceremonies. We align with Gaya's finest suites to ensure comfort and space for mindfulness.",
  className,
  ...props
}: HotelsSectionProps) {
  return (
    <Section spacing="xl" className={cn("relative overflow-hidden bg-black text-text-primary border-b border-border-gold/20 py-28", className)} {...props}>
      {/* Background Sacred Circular Chakra */}
      <SacredChakraBg size="min(550px, 80vw)" opacity={0.04} rotateSpeed={130} position="top-left" />
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

        <Grid cols={{ initial: 1, md: 3 }} gap="lg">
          {defaultHotels.map((hotel, idx) => (
            <DestinationCard key={idx} {...hotel} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
