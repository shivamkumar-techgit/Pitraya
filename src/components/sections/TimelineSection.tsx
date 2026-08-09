"use client";

import React from "react";
import { Compass, Sparkles, MapPin, Feather, Heart } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Paragraph from "@/components/typography/Paragraph";
import Timeline, { GenericTimelineItem } from "@/components/common/Timeline";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface TimelineSectionProps extends React.HTMLAttributes<HTMLElement> {
  subtitle?: string;
  title?: string;
  description?: string;
  items?: GenericTimelineItem[];
  layout?: "alternating" | "left" | "horizontal";
}

const defaultItems: GenericTimelineItem[] = [
  {
    date: "Step 01",
    title: "Intention Setting & Consultation",
    description: "We align your personal goals, energetic needs, and physical preferences before embarking.",
    icon: <Compass className="h-5 w-5 text-gold-primary" />,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "Step 02",
    title: "Sacred Preparation",
    description: "Mindful breathing and herbal tea elixirs prime your body and quiet mental chatter.",
    icon: <Feather className="h-5 w-5 text-gold-primary" />,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "Step 03",
    title: "The Main Ritual Experience",
    description: "Immersive sound baths, thermal stone therapies, and tailored touch awaken your inner vitality.",
    icon: <Sparkles className="h-5 w-5 text-gold-primary" />,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "Step 04",
    title: "Integration & Awakening",
    description: "Gentle grounding and post-session guidance to carry tranquil energy into your daily life.",
    icon: <Heart className="h-5 w-5 text-gold-primary" />,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
  },
];

export default function TimelineSection({
  subtitle = "THE PATHWAY TO HARMONY",
  title = "Your Four-Step Journey",
  description = "Every ritual follows a sacred trajectory designed to progressively deepen your sense of immersion and rejuvenation.",
  items = defaultItems,
  layout = "alternating",
  className,
  ...props
}: TimelineSectionProps) {
  return (
    <Section spacing="xl" className={cn("relative overflow-hidden", className)} {...props}>
      {/* Background Sacred Circular Chakra */}
      <SacredChakraBg size="min(600px, 85vw)" opacity={0.04} rotateSpeed={150} position="center" />
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

        <Timeline items={items} layout={layout} />
      </Container>
    </Section>
  );
}
