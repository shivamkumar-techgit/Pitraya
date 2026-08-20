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

export interface TransportationSectionProps extends React.HTMLAttributes<HTMLElement> {
  subtitle?: string;
  title?: string;
  description?: string;
}

const defaultFleets: DestinationCardProps[] = [
  {
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800",
    title: "Luxury Executive Sedan",
    location: "Gaya Airport & Local Transfers",
    rating: 4.9,
    reviewsCount: 180,
    price: "$80 / transfer",
    tag: "Mercedes C-Class / Audi A4",
    actionText: "Reserve Vehicle",
  },
  {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    title: "Executive Multi-Purpose MPV",
    location: "Family Group local transfers",
    rating: 5.0,
    reviewsCount: 260,
    price: "$100 / transfer",
    tag: "Toyota Innova Crysta / Hycross",
    actionText: "Reserve Vehicle",
  },
  {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    title: "Premium Terrain Luxury SUV",
    location: "High clearance state transfers",
    rating: 4.8,
    reviewsCount: 140,
    price: "$130 / transfer",
    tag: "Toyota Fortuner / Land Cruiser",
    actionText: "Reserve Vehicle",
  },
];

export default function TransportationSection({
  subtitle = "VIP CHAUFFEUR FLEETS",
  title = "Sacred Vehicle Transfers",
  description = "A seamless transition from arrival to departure. Our professional, English-speaking chauffeurs and clean, air-conditioned vehicles ensure absolute road comfort.",
  className,
  ...props
}: TransportationSectionProps) {
  return (
    <Section spacing="xl" className={cn("relative overflow-hidden bg-background text-text-primary border-b border-border-gold/20 py-28", className)} {...props}>
      {/* Background Sacred Circular Chakra */}
      <SacredChakraBg size="min(550px, 80vw)" opacity={0.04} rotateSpeed={140} position="bottom-right" />
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
          {defaultFleets.map((fleet, idx) => (
            <DestinationCard key={idx} {...fleet} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
