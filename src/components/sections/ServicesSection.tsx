"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Video,
  Globe,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import { cn } from "@/lib/utils";

export interface ServicePackage {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  price: string;
  badge?: string;
  isFeatured?: boolean;
  suitableFor: string;
}

const defaultPitrayaServices: ServicePackage[] = [
  {
    id: "online-pind-daan",
    icon: <Globe className="h-5 w-5 text-emerald-400" />,
    title: "Online Pind Daan",
    subtitle: "Remote Live Video Ritual for NRIs",
    description:
      "Perform authentic Pind Daan remotely with HD live video streaming, Gotra Sankalpa, and courier Prasad delivery.",
    image: "/images/hero_incense_sanctuary.png",
    features: [
      "Verified Gayawal Pandit & Live HD Video Stream",
      "Ancestral Gotra Sankalpa & Vishnupad Rites",
      "Courier Prasad & Digital Certificate Delivery",
    ],
    price: "Starts from ₹3,100",
    badge: "🟢 NRI Special",
    suitableFor: "🌍 NRIs & Remote Devotees",
  },
  {
    id: "ritual-only",
    icon: <Flame className="text-gold-primary h-5 w-5" />,
    title: "Sacred Ritual Services",
    subtitle: "Vedic Rites for Local Families",
    description:
      "For families requiring only authentic Vedic rituals with hereditary Gayawal Pandits without hotel or transport bundling.",
    image: "/images/pinda_daan_ceremony.png",
    features: [
      "Dedicated Gayawal Pandit with Panji verification",
      "Vishnupad & Phalgu River Tarpan assistance",
      "Complete ritual kit & Pinda samagri included",
    ],
    price: "Starts from ₹5,100",
    suitableFor: "👨‍👩‍👧 Local / Self-Arranged Pilgrims",
  },
  {
    id: "heritage-pilgrimage",
    icon: <Sparkles className="text-gold-primary h-5 w-5" />,
    title: "Heritage Pilgrimage",
    subtitle: "Complete Stay + Transport + Rituals",
    description:
      "Our classic 2-day pilgrimage package covering 3-Vedi Pind Daan, Gayawal Pandit guidance, AC car transfers, and 3-star hotel.",
    image: "/images/booking_package_real.png",
    features: [
      "All 3-Vedi Pind Daan ceremonies & Vedic mantras",
      "3-Star AC Hotel stay with Sattvik meals",
      "AC private sedan transfers (Airport/Station/Temples)",
    ],
    price: "Starts from ₹19,999",
    badge: "Classic 2-Day",
    suitableFor: "👨‍👩‍👧‍👦 Standard Family Journeys",
  },
  {
    id: "moksha-journey",
    icon: <Sparkles className="text-gold-primary h-5 w-5" />,
    title: "Moksha Experience",
    subtitle: "4-Star Resort + Innova MPV + VIP Sanctum",
    description:
      "Complete 3-day ancestral liberation journey with 4-star resort stay, Innova Crysta MPV, and Sanctum access.",
    image: "/images/gaya_family_moment_prayer.png",
    features: [
      "Full 3-Vedi ancestral liberation rites & Havan",
      "4-Star Heritage Resort stay & All Sattvik meals",
      "Innova Crysta MPV & Senior Acharya Escort",
    ],
    price: "Starts from ₹35,101",
    badge: "⭐ Most Recommended",
    isFeatured: true,
    suitableFor: "⭐ Complete Ancestral Liberation",
  },
  {
    id: "royal-concierge",
    icon: <Award className="h-5 w-5 text-purple-300" />,
    title: "Royal Heritage",
    subtitle: "5-Star Palace Suite + Butler + Drone Film",
    description:
      "Bespoke VIP luxury retreat with senior Gayawal priests, private SUV fleet, 5-star palace suite, and cinematic drone film.",
    image: "/images/hotel_luxury_suite.png",
    features: [
      "Senior Priest & Personal Butler Concierge",
      "5-Star Royal Palace Suite & Private Temple Space",
      "4K Drone Film & High-Resolution Photography",
    ],
    price: "Starts from ₹89,999",
    badge: "👑 VIP Luxury Suite",
    suitableFor: "👑 VIP & NRI Families",
  },
];

export type ServicesSectionProps = React.HTMLAttributes<HTMLElement>;

export default function ServicesSection({
  className,
  ...props
}: ServicesSectionProps) {
  return (
    <Section
      spacing="xl"
      className={cn(
        "text-text-primary border-border-gold/20 bg-muted relative overflow-hidden border-b py-16 sm:py-24",
        className
      )}
      {...props}
    >
      <SacredChakraBg
        size="min(650px, 90vw)"
        opacity={0.045}
        rotateSpeed={170}
      />

      <Container
        size="xl"
        className="relative z-10 space-y-12 px-4 sm:space-y-16 sm:px-6"
      >
        {/* Section Header */}
        <div className="mx-auto max-w-3xl space-y-3 text-center sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gold-primary/10 text-gold-primary border-gold-primary/30 font-cinzel inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>5 Primary Pilgrimage Offerings</span>
          </motion.div>

          <Heading
            size="2xl"
            font="cinzel"
            className="text-text-primary text-2xl leading-tight sm:text-4xl md:text-5xl"
          >
            Transparent Sacred Offerings for{" "}
            <GradientText variant="gold" font="cinzel">
              Every Devotee
            </GradientText>
          </Heading>

          <Paragraph
            size="md"
            variant="muted"
            className="text-text-secondary mx-auto max-w-2xl font-serif text-xs italic sm:text-base"
          >
            &quot;From remote live video rites for global NRIs to luxury 5-star
            palace retreats, explore our 5 primary offerings.&quot;
          </Paragraph>
        </div>

        {/* 5 Package Cards (Grid on Desktop, Swipe on Mobile) */}
        <div className="grid scrollbar-none grid-cols-1 gap-4 overflow-x-auto pb-4 sm:pb-0 md:grid-cols-3 lg:grid-cols-5">
          {defaultPitrayaServices.map((pkg) => (
            <GlassCard
              key={pkg.id}
              className={cn(
                "group flex min-w-[270px] flex-col justify-between rounded-2xl border p-4 transition-all duration-300 sm:min-w-0",
                pkg.isFeatured
                  ? "bg-gold-primary/15 border-gold-primary shadow-gold-glow scale-[1.02]"
                  : "bg-surface border-border-gold/20 hover:border-gold-primary/50 shadow-md"
              )}
            >
              {/* Photo Header */}
              <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-black">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {pkg.badge && (
                  <div className="absolute top-2 left-2">
                    <span className="font-cinzel text-gold-primary border-gold-primary/30 rounded-full border bg-black/80 px-2 py-0.5 text-[9px] font-bold uppercase">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="absolute right-2 bottom-2 left-2">
                  <p className="font-cinzel text-xs leading-tight font-bold text-white">
                    {pkg.title}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <p className="text-gold-primary text-xs font-bold">
                    {pkg.price}
                  </p>
                  <p className="text-text-muted line-clamp-3 text-[11px] leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="border-border-gold/15 space-y-2 border-t pt-3">
                  <Link
                    href="/packages"
                    className="bg-gold-gradient font-cinzel flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold text-black shadow-md transition-opacity hover:opacity-95"
                  >
                    <span>View Package</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="pt-4 text-center">
          <Link href="/packages">
            <PrimaryButton
              size="lg"
              className="font-cinzel shadow-gold-glow px-8 py-3.5 text-xs font-bold"
            >
              Explore All 5 Package Specifications →
            </PrimaryButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
