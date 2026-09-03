"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  X,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Users,
  Car,
  Hotel,
  Award,
  Crown,
  Flame,
  Camera,
  Compass,
  Phone,
  HelpCircle,
  ArrowRight,
  Plus,
  Layers,
  MessageCircle,
  Video,
  Globe,
  MapPin,
  CheckSquare,
} from "lucide-react";

import HomePage from "@/components/layout/HomePage";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import GoldenParticles from "@/components/animations/GoldenParticles";
import BookingWizardModal from "@/components/booking/BookingWizardModal";
import FloatingHelpAdvisor from "@/components/common/FloatingHelpAdvisor";
import { cn } from "@/lib/utils";

// ─── 5 PRIMARY PACKAGE OFFERINGS DATA ──────────────────────────────────────────

export interface PackageOffering {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  price: string;
  numericPrice: number;
  duration: string;
  perfectFor: string;
  image: string;
  isPopular?: boolean;
  isNRI?: boolean;
  summaryInclusions: string[];
  hotel: string;
  transport: string;
  pandit: string;
  meals: string;
  videoPhoto: string;
  timeline: { day: string; title: string; steps: string[] }[];
}

const PACKAGES_5: PackageOffering[] = [
  {
    id: "online-pind-daan",
    badge: "🟢 NRI Special • Remote Ritual",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    title: "Online Pind Daan",
    price: "₹3,100",
    numericPrice: 3100,
    duration: "Live Video (2–3 Hours)",
    perfectFor:
      "NRIs & out-of-station families who cannot travel to Gaya in person.",
    image: "/images/hero_incense_sanctuary.png",
    isNRI: true,
    summaryInclusions: [
      "Verified Gayawal Pandit",
      "Live HD Video Call Streaming",
      "Ancestral Gotra Sankalpa",
      "Vishnupad & Falgu Rites",
      "HD Video & Photos",
      "Courier Prasad & Certificate",
    ],
    hotel: "N/A (Remote)",
    transport: "N/A (Remote)",
    pandit: "Verified Gayawal Purohit",
    meals: "N/A",
    videoPhoto: "✅ Live Video Call + HD Photos",
    timeline: [
      {
        day: "STEP 1",
        title: "Live Video Call Connection",
        steps: [
          "Join HD Video stream (Zoom/WhatsApp)",
          "Purohit chants family Gotra Sankalpa",
          "Live view of Vishnupad Sanctum",
        ],
      },
      {
        day: "STEP 2",
        title: "Falgu River & Sanctum Rites",
        steps: [
          "Pindas offered in your name",
          "Vedic mantra recitation",
          "Ancestral peace certificate generated",
        ],
      },
    ],
  },
  {
    id: "ritual-only",
    badge: "Essential • Same Day",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    title: "Sacred Ritual",
    price: "₹5,100",
    numericPrice: 5100,
    duration: "Same Day (3–4 Hours)",
    perfectFor:
      "Local & self-arranged families managing their own stay and transport.",
    image: "/images/pinda_daan_ceremony.png",
    summaryInclusions: [
      "Senior Gayawal Pandit",
      "Full Pind Samagri Kit",
      "Vishnupad Temple Access",
      "Phalgu River Tarpan",
      "Lineage Certificate",
    ],
    hotel: "Self-Arranged",
    transport: "Self-Arranged",
    pandit: "Senior Gayawal Pandit",
    meals: "Self-Arranged",
    videoPhoto: "Optional Add-on",
    timeline: [
      {
        day: "DAY 1",
        title: "Falgu & Vishnupad Ceremony",
        steps: [
          "Meet Pandit at Ghat",
          "Perform Phalgu Tarpan",
          "Vishnupad Pind Daan",
          "Certificate Handover",
        ],
      },
    ],
  },
  {
    id: "heritage-pilgrimage",
    badge: "Classic 2-Day Journey",
    badgeColor: "bg-gold-primary/20 text-gold-primary border-gold-primary/40",
    title: "Heritage Pilgrimage",
    price: "₹19,999",
    numericPrice: 19999,
    duration: "2 Days / 1 Night",
    perfectFor:
      "Families seeking standard 3-star AC hotel & private sedan airport transfers.",
    image: "/images/booking_package_real.png",
    summaryInclusions: [
      "3-Star Heritage Hotel",
      "Private AC Sedan Car",
      "Senior Gayawal Pandit",
      "Sattvik Breakfast & Dinner",
      "Full 3-Dhaam Ritual Coverage",
      "🏛️ Temple Tax: Pitraya Paid for You",
    ],
    hotel: "3-Star Heritage Hotel",
    transport: "Private AC Sedan",
    pandit: "Senior Gayawal Pandit",
    meals: "Sattvik Breakfast & Dinner",
    videoPhoto: "Photos Included",
    timeline: [
      {
        day: "DAY 1",
        title: "Arrival & Falgu River Rites",
        steps: [
          "Station/Airport Chauffeur Pickup",
          "Hotel Check-in & Rest",
          "Falgu River Evening Tarpan",
          "Sattvik Dinner",
        ],
      },
      {
        day: "DAY 2",
        title: "Vishnupad Sanctum & Departure",
        steps: [
          "Morning Vishnupad Pind Daan",
          "Akshay Vat Oblations",
          "Station/Airport Drop-off",
        ],
      },
    ],
  },
  {
    id: "moksha-journey",
    badge: "⭐ Most Recommended",
    badgeColor:
      "bg-gradient-to-r from-gold-primary to-amber-400 text-black border-gold-primary font-black",
    title: "Moksha Experience",
    price: "₹35,101",
    numericPrice: 35101,
    duration: "3 Days / 2 Nights",
    perfectFor:
      "Complete 3-Vedi ancestral liberation with 4-star resort stay & Innova MPV.",
    image: "/images/gaya_family_moment_prayer.png",
    isPopular: true,
    summaryInclusions: [
      "4-Star Heritage Resort",
      "Innova Crysta MPV",
      "All Sattvik Meals (B/L/D)",
      "Senior Acharya Escort",
      "HD Video Reel & Photos",
      "🏛️ Temple Tax: Pitraya Paid for You",
    ],
    hotel: "4-Star Heritage Resort",
    transport: "Innova Crysta MPV",
    pandit: "Senior Acharya Escort",
    meals: "All Sattvik Meals (B/L/D)",
    videoPhoto: "✅ HD Video Reel & Photos",
    timeline: [
      {
        day: "DAY 1",
        title: "VIP Arrival & Evening Aarti",
        steps: [
          "VIP Airport Meet & Greet",
          "Check-in 4-Star Resort",
          "Falgu River Sunset Aarti",
        ],
      },
      {
        day: "DAY 2",
        title: "Vishnupad & Akshay Vat 3-Vedi Rites",
        steps: [
          "Vishnupad Sanctum Puja & Darshan",
          "Akshay Vat Banyan Rites",
          "Special Ancestral Havan",
        ],
      },
      {
        day: "DAY 3",
        title: "Pretshila Hill Excursion & Departure",
        steps: [
          "Guided Pretshila Hill Rites",
          "Gaya City Sightseeing",
          "Return Escort Transfer",
        ],
      },
    ],
  },
  {
    id: "royal-concierge",
    badge: "👑 VIP Luxury Suite",
    badgeColor: "bg-purple-900/40 text-purple-200 border-purple-400/50",
    title: "Royal Heritage",
    price: "₹89,999",
    numericPrice: 89999,
    duration: "3 Days / 2 Nights",
    perfectFor:
      "VIP & NRI families requiring 5-star palace suites, butler service & private SUV fleet.",
    image: "/images/hotel_luxury_suite.png",
    summaryInclusions: [
      "5-Star Royal Palace Suite",
      "Private Fortuner / SUV Fleet",
      "Personal Butler Concierge",
      "Gourmet Sattvik Feast",
      "Cinematic 4K Drone Film",
      "Private Temple Chamber",
    ],
    hotel: "5-Star Royal Palace Suite",
    transport: "Premium SUV (Fortuner)",
    pandit: "Vedic Scholar & Senior Priest",
    meals: "Gourmet Sattvik Feast",
    videoPhoto: "✅ 4K Drone & Cinematic Film",
    timeline: [
      {
        day: "DAY 1",
        title: "Royal Welcome & Butler Check-in",
        steps: [
          "Tarmac Escort & SUV Pick-up",
          "Palace Suite Welcome",
          "Private Evening Consultation",
        ],
      },
      {
        day: "DAY 2",
        title: "Private Sanctum Rites & Drone Film",
        steps: [
          "VIP Private Temple Chamber",
          "Full 3-Vedi Grand Rites",
          "Cinematic Drone Film Capture",
        ],
      },
      {
        day: "DAY 3",
        title: "Bodh Gaya Excursion & Airport Farewell",
        steps: [
          "Private Chauffeur Bodh Gaya Excursion",
          "Gourmet Farewell Meal",
          "VIP Airport Departure",
        ],
      },
    ],
  },
];

// ─── QUICK COMPARISON MATRIX (8 ROWS) ──────────────────────────────────────────

const MATRIX_8_ROWS = [
  {
    feature: "Duration",
    online: "Live Call",
    ritual: "Same Day",
    heritage: "2 Days",
    moksha: "3 Days",
    royal: "3 Days",
  },
  {
    feature: "Accommodation",
    online: "N/A",
    ritual: "Self-Arranged",
    heritage: "3-Star Hotel",
    moksha: "4-Star Resort",
    royal: "5-Star Suite",
  },
  {
    feature: "Transport",
    online: "N/A",
    ritual: "Self-Arranged",
    heritage: "AC Sedan",
    moksha: "Innova MPV",
    royal: "Fortuner SUV",
  },
  {
    feature: "Gayawal Pandit",
    online: "Verified Priest",
    ritual: "Senior Pandit",
    heritage: "Senior Pandit",
    moksha: "Senior Acharya",
    royal: "Vedic Scholar",
  },
  {
    feature: "Sattvik Meals",
    online: "N/A",
    ritual: "Self-Arranged",
    heritage: "Breakfast & Dinner",
    moksha: "All Meals (B/L/D)",
    royal: "Gourmet Feast",
  },
  {
    feature: "Live Call / Video",
    online: "✅ Live Call",
    ritual: "Optional",
    heritage: "Photos Only",
    moksha: "✅ HD Video Reel",
    royal: "✅ 4K Drone Film",
  },
  {
    feature: "Prasad / Certificate",
    online: "✅ Courier Delivery",
    ritual: "✅ In Person",
    heritage: "✅ In Person",
    moksha: "✅ In Person",
    royal: "✅ In Person + Shipped",
  },
  {
    feature: "Starting Investment",
    online: "₹3,100",
    ritual: "₹5,100",
    heritage: "₹19,999",
    moksha: "₹35,101",
    royal: "₹89,999",
  },
  {
    feature: "Temple Tax",
    online: "Pitraya Pays",
    ritual: "Self-Pay",
    heritage: "✅ Pitraya Pays",
    moksha: "✅ Pitraya Pays",
    royal: "✅ Pitraya Pays",
  },
];

export default function PackagesPage() {
  const [selectedPkgId, setSelectedPkgId] = useState<string>("moksha-journey");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingPackageId, setBookingPackageId] =
    useState<string>("moksha-journey");

  const selectedPkg =
    PACKAGES_5.find((p) => p.id === selectedPkgId) || PACKAGES_5[3];

  const handleOpenBooking = (id: string) => {
    setBookingPackageId(id);
    setIsBookingModalOpen(true);
  };

  return (
    <HomePage>
      {/* BOOKING WIZARD MODAL */}
      <BookingWizardModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialPackageId={bookingPackageId}
      />

      {/* ─── SECTION 1: HERO (UNTOUCHED PRESERVED DESIGN) ────────────────────── */}
      <Section className="text-text-primary border-border-gold/20 bg-background relative overflow-hidden border-b pt-28 pb-20">
        <SacredChakraBg
          size="min(750px, 90vw)"
          opacity={0.05}
          rotateSpeed={160}
          position="top-right"
        />
        <GoldenParticles particleCount={30} />
        <div className="bg-gold-primary/10 pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[190px]" />

        <Container size="xl" className="relative z-10 space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gold-primary/10 border-gold-primary/30 text-gold-primary font-cinzel inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Sacred Pilgrimage Offerings
          </motion.div>

          <Heading
            size="2xl"
            font="cinzel"
            className="text-text-primary mx-auto max-w-4xl leading-tight sm:text-4xl md:text-5xl"
          >
            Transparent Sacred Packages for Every{" "}
            <GradientText variant="gold" font="cinzel">
              Family Lineage
            </GradientText>
          </Heading>

          <Paragraph
            size="lg"
            variant="muted"
            className="text-text-secondary mx-auto max-w-2xl font-serif italic"
          >
            &quot;From remote live online rites for global NRIs to luxury 5-star
            palace retreats, choose the sacred journey tailored for your loved
            ones.&quot;
          </Paragraph>
        </Container>
      </Section>

      {/* ─── SECTION 2: CHOOSE YOUR EXPERIENCE (5 CARDS GRID / MOBILE SWIPE) ──── */}
      <Section className="border-border-gold/20 bg-muted border-b py-16">
        <Container size="xl" className="space-y-10">
          <div className="space-y-2 text-center">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Step 1 • Select Your Offering
            </span>
            <Heading size="2xl" font="cinzel" className="text-text-primary">
              Choose Your Sacred Experience
            </Heading>
            <p className="text-text-muted text-xs">
              Click any package card below to view detailed timelines, stay,
              transport & ritual features.
            </p>
          </div>

          {/* 5 Package Cards (Grid on Desktop, Horizontal Swipe on Mobile) */}
          <div className="grid scrollbar-none grid-cols-1 gap-4 overflow-x-auto pb-4 sm:grid-cols-2 sm:pb-0 lg:grid-cols-5">
            {PACKAGES_5.map((pkg) => {
              const isSelected = pkg.id === selectedPkgId;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={cn(
                    "group relative flex min-w-[260px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 sm:min-w-0",
                    isSelected
                      ? "bg-gold-primary/15 border-gold-primary shadow-gold-glow scale-[1.02]"
                      : "bg-surface border-border hover:border-gold-primary/50"
                  )}
                >
                  {/* Photo Header */}
                  <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-amber-950/60 via-slate-900 to-black">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                      className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute top-2 right-2 left-2 flex items-center justify-between">
                      <span
                        className={cn(
                          "font-cinzel rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase",
                          pkg.badgeColor
                        )}
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3">
                      <p className="font-cinzel text-xs leading-tight font-bold text-white">
                        {pkg.title}
                      </p>
                      <p className="text-gold-primary text-[10px] font-medium">
                        {pkg.duration}
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
                    <div className="space-y-1">
                      <p className="font-cinzel text-gold-primary text-lg font-extrabold">
                        {pkg.price}
                      </p>
                      <p className="text-text-muted line-clamp-2 text-[11px] leading-snug">
                        {pkg.perfectFor}
                      </p>
                    </div>

                    <div className="border-border-gold/15 space-y-2 border-t pt-2">
                      {pkg.id === "online-pind-daan" ? (
                        <Link
                          href="/online-pind-daan"
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            "font-cinzel flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold shadow-md transition-all",
                            isSelected
                              ? "bg-gold-gradient text-black hover:opacity-95"
                              : "bg-surface border-gold-primary/40 text-gold-primary hover:bg-gold-primary/10 border"
                          )}
                        >
                          <span>Learn More</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenBooking(pkg.id);
                          }}
                          className={cn(
                            "font-cinzel flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold shadow-md transition-all",
                            isSelected
                              ? "bg-gold-gradient text-black hover:opacity-95"
                              : "bg-surface border-gold-primary/40 text-gold-primary hover:bg-gold-primary/10 border"
                          )}
                        >
                          <span>Book Now</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {isSelected && (
                        <span className="block text-center text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
                          ✓ Currently Viewing Below
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 3: QUICK COMPARISON (COMPACT 8-ROW MATRIX) ───────────────── */}
      <Section className="bg-background border-border-gold/20 border-b py-16">
        <Container size="xl" className="space-y-8">
          <div className="space-y-2 text-center">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Step 2 • At-A-Glance Comparison
            </span>
            <Heading size="2xl" font="cinzel" className="text-text-primary">
              Quick Feature Comparison
            </Heading>
            <p className="text-text-muted text-xs">
              Compare key offerings across all 5 tiers instantly.
            </p>
          </div>

          <div className="border-gold-primary/30 bg-surface overflow-x-auto rounded-2xl border shadow-md">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-gold-primary/30 bg-gold-primary/10 font-cinzel text-text-primary border-b tracking-wider uppercase">
                  <th className="p-4 font-bold">Key Feature</th>
                  <th
                    className={cn(
                      "p-4 text-center font-bold",
                      selectedPkgId === "online-pind-daan" &&
                        "bg-gold-primary/20 text-gold-primary"
                    )}
                  >
                    🟢 Online
                  </th>
                  <th
                    className={cn(
                      "p-4 text-center font-bold",
                      selectedPkgId === "ritual-only" &&
                        "bg-gold-primary/20 text-gold-primary"
                    )}
                  >
                    Sacred
                  </th>
                  <th
                    className={cn(
                      "p-4 text-center font-bold",
                      selectedPkgId === "heritage-pilgrimage" &&
                        "bg-gold-primary/20 text-gold-primary"
                    )}
                  >
                    Heritage
                  </th>
                  <th
                    className={cn(
                      "p-4 text-center font-bold",
                      selectedPkgId === "moksha-journey" &&
                        "bg-gold-primary/20 text-gold-primary"
                    )}
                  >
                    ⭐ Moksha
                  </th>
                  <th
                    className={cn(
                      "p-4 text-center font-bold",
                      selectedPkgId === "royal-concierge" &&
                        "bg-gold-primary/20 text-gold-primary"
                    )}
                  >
                    👑 Royal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border-gold/15 text-text-muted divide-y">
                {MATRIX_8_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gold-primary/5 transition-colors"
                  >
                    <td className="font-cinzel text-text-primary p-4 font-semibold">
                      {row.feature}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-center",
                        selectedPkgId === "online-pind-daan" &&
                          "bg-gold-primary/10 text-text-primary font-bold"
                      )}
                    >
                      {row.online}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-center",
                        selectedPkgId === "ritual-only" &&
                          "bg-gold-primary/10 text-text-primary font-bold"
                      )}
                    >
                      {row.ritual}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-center",
                        selectedPkgId === "heritage-pilgrimage" &&
                          "bg-gold-primary/10 text-text-primary font-bold"
                      )}
                    >
                      {row.heritage}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-center",
                        selectedPkgId === "moksha-journey" &&
                          "bg-gold-primary/10 text-gold-primary font-bold"
                      )}
                    >
                      {row.moksha}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-center",
                        selectedPkgId === "royal-concierge" &&
                          "bg-gold-primary/10 text-text-primary font-bold"
                      )}
                    >
                      {row.royal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 4: SELECTED PACKAGE DETAILS (DYNAMIC MASTER PANEL) ───────── */}
      <Section className="border-border-gold/20 bg-muted border-b py-16">
        <Container size="xl" className="space-y-10">
          <div className="border-border-gold/20 flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
            <div>
              <span className="text-gold-primary font-cinzel block text-xs font-bold tracking-widest uppercase">
                Selected Experience Details
              </span>
              <h2 className="font-cinzel text-text-primary flex items-center gap-3 text-2xl font-bold sm:text-3xl">
                <span>{selectedPkg.title}</span>
                <span className="text-gold-primary bg-gold-primary/10 border-gold-primary/30 rounded-full border px-3 py-1 text-base font-extrabold">
                  {selectedPkg.price}
                </span>
              </h2>
            </div>
          </div>

          {/* Single Dynamic Detailed Grid */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Col: Timeline & Inclusions */}
            <div className="space-y-6 lg:col-span-7">
              <div className="bg-surface border-gold-primary/30 space-y-6 rounded-3xl border p-6 shadow-sm">
                <div className="text-gold-primary font-cinzel border-border-gold/20 flex items-center gap-2 border-b pb-3 text-sm font-bold">
                  <Clock className="h-4 w-4" />
                  <span>
                    Timeline & Sacred Schedule ({selectedPkg.duration})
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedPkg.timeline.map((item, index) => (
                    <div
                      key={index}
                      className="border-border-gold/20 bg-surface space-y-2 rounded-2xl border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gold-primary font-cinzel bg-gold-primary/10 border-gold-primary/30 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase">
                          {item.day}
                        </span>
                        <span className="font-cinzel text-text-primary text-xs font-bold">
                          {item.title}
                        </span>
                      </div>
                      <ul className="space-y-1 pt-1">
                        {item.steps.map((st, sIdx) => (
                          <li
                            key={sIdx}
                            className="text-text-muted flex items-center gap-2 text-xs"
                          >
                            <span className="bg-gold-primary h-1.5 w-1.5 shrink-0 rounded-full" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included Summary List */}
              <div className="bg-surface border-gold-primary/30 space-y-4 rounded-3xl border p-6 shadow-sm">
                <div className="text-gold-primary font-cinzel border-border-gold/20 flex items-center gap-2 border-b pb-3 text-sm font-bold">
                  <CheckSquare className="h-4 w-4" />
                  <span>Included Key Deliverables</span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectedPkg.summaryInclusions.map((inc, idx) => (
                    <div
                      key={idx}
                      className="border-border-gold/15 bg-muted text-text-primary flex items-center gap-2.5 rounded-xl border p-2.5 text-xs"
                    >
                      <CheckCircle2 className="text-gold-primary h-4 w-4 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Logistics Summary & Quick Booking Card */}
            <div className="space-y-6 lg:col-span-5">
              <div className="bg-surface border-gold-primary/30 space-y-5 rounded-3xl border p-6 shadow-sm">
                <div className="space-y-1">
                  <span className="text-gold-primary font-cinzel block text-[10px] font-bold tracking-widest uppercase">
                    Logistics & Comfort Specs
                  </span>
                  <h4 className="font-cinzel text-text-primary text-lg font-bold">
                    Service Specifications
                  </h4>
                </div>

                <div className="divide-border-gold/15 space-y-3 divide-y text-xs">
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-text-muted flex items-center gap-2">
                      <Hotel className="text-gold-primary h-4 w-4" /> Stay
                    </span>
                    <span className="text-text-primary font-bold">
                      {selectedPkg.hotel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-text-muted flex items-center gap-2">
                      <Car className="text-gold-primary h-4 w-4" /> Transport
                    </span>
                    <span className="text-text-primary font-bold">
                      {selectedPkg.transport}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-text-muted flex items-center gap-2">
                      <User className="text-gold-primary h-4 w-4" /> Purohit
                    </span>
                    <span className="text-text-primary font-bold">
                      {selectedPkg.pandit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-text-muted flex items-center gap-2">
                      <Flame className="text-gold-primary h-4 w-4" /> Meals
                    </span>
                    <span className="text-text-primary font-bold">
                      {selectedPkg.meals}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-text-muted flex items-center gap-2">
                      <Camera className="text-gold-primary h-4 w-4" /> Media
                    </span>
                    <span className="text-text-primary font-bold">
                      {selectedPkg.videoPhoto}
                    </span>
                  </div>
                </div>

                <div className="border-border-gold/20 space-y-3 border-t pt-4">
                  {selectedPkg.id === "online-pind-daan" ? (
                    <Link
                      href="/online-pind-daan"
                      className="font-cinzel shadow-gold-glow inline-flex w-full items-center justify-center gap-2 rounded-xl py-4 text-xs font-bold text-black transition-all hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(135deg,#d4af37,#f5e19c 50%,#b8860b)",
                      }}
                    >
                      View Full Online Pind Daan Page →
                    </Link>
                  ) : (
                    <PrimaryButton
                      size="lg"
                      onClick={() => handleOpenBooking(selectedPkg.id)}
                      className="font-cinzel shadow-gold-glow w-full py-4 text-xs font-bold"
                    >
                      Reserve {selectedPkg.title} ({selectedPkg.price}) →
                    </PrimaryButton>
                  )}

                  <p className="text-text-muted text-center text-[10px]">
                    ✓ Zero cancellation fee up to 48 hours before arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 5: REAL PHOTO & VIDEO GALLERY ───────────────────────────── */}
      <Section className="bg-background border-border-gold/20 border-b py-16">
        <Container size="xl" className="space-y-8">
          <div className="space-y-2 text-center">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Authentic Media
            </span>
            <Heading size="2xl" font="cinzel" className="text-text-primary">
              Gaya Pilgrimage Photo & Video Gallery
            </Heading>
            <p className="text-text-muted text-xs">
              Real moments captured at Vishnupad Sanctum, Falgu Ghats & Heritage
              Hotels.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                title: "Vishnupad Temple",
                img: "/images/gaya_vishnupad_temple.png",
              },
              {
                title: "Phalgu River Tarpan",
                img: "/images/falgu_river_ghats.png",
              },
              {
                title: "Akshay Vat Banyan",
                img: "/images/akshay_vat_banyan.png",
              },
              {
                title: "Gayawal Purohit",
                img: "/images/gayawal_pandit_authentic.png",
              },
              { title: "Family Devotion", img: "/images/family_pind_daan.png" },
              { title: "Heritage Hotel", img: "/images/journey_hotel.png" },
              { title: "Sattvik Feast", img: "/images/booking_stay_real.png" },
              {
                title: "Digital Certificate",
                img: "/images/booking_sanctum_real.png",
              },
            ].map((media, i) => (
              <div
                key={i}
                className="border-gold-primary/30 group relative h-44 overflow-hidden rounded-2xl border shadow-lg"
              >
                <Image
                  src={media.img}
                  alt={media.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <span className="font-cinzel border-gold-primary/30 bg-surface text-text-primary rounded-full border px-2 py-0.5 text-[11px] font-bold">
                    {media.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 6: WHAT'S INCLUDED IN EVERY OFFERING ─────────────────────── */}
      <Section className="border-border-gold/20 bg-muted border-b py-16">
        <Container size="xl" className="space-y-10">
          <div className="space-y-2 text-center">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Guaranteed Standard
            </span>
            <Heading size="2xl" font="cinzel" className="text-text-primary">
              Included in Every Pitraya Offering
            </Heading>
          </div>

          <Grid cols={4} gap="md">
            {[
              {
                icon: <ShieldCheck className="text-gold-primary h-5 w-5" />,
                title: "Verified Gayawal Pandit",
                desc: "Hereditary priests holding centuries-old rights.",
              },
              {
                icon: <CheckCircle2 className="text-gold-primary h-5 w-5" />,
                title: "Dakshina Included",
                desc: "Transparent priest offerings with zero hidden charges.",
              },
              {
                icon: <Sparkles className="text-gold-primary h-5 w-5" />,
                title: "Complete Pind Kit",
                desc: "Fresh flowers, sesame, brassware & ritual samagri.",
              },
              {
                icon: <Compass className="text-gold-primary h-5 w-5" />,
                title: "Sanctum Guidance",
                desc: "Step-by-step guidance through sacred shrines.",
              },
              {
                icon: <Users className="text-gold-primary h-5 w-5" />,
                title: "Dedicated Coordinator",
                desc: "Personal assistant managing schedule & transfers.",
              },
              {
                icon: <Award className="text-gold-primary h-5 w-5" />,
                title: "Lineage Certificate",
                desc: "Official family certificate signed by Gayawal Purohits.",
              },
              {
                icon: <Phone className="text-gold-primary h-5 w-5" />,
                title: "WhatsApp Updates",
                desc: "Live photos & updates for family members back home.",
              },
              {
                icon: <Clock className="text-gold-primary h-5 w-5" />,
                title: "24/7 Family Assistance",
                desc: "Round-the-clock emergency & concierge support.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-surface border-gold-primary/20 space-y-2 rounded-2xl border p-4"
              >
                <div className="border-gold-primary/30 bg-surface w-fit rounded-xl border p-2">
                  {item.icon}
                </div>
                <h4 className="font-cinzel text-text-primary text-xs font-bold">
                  {item.title}
                </h4>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ─── SECTION 7: OPTIONAL ADD-ONS (COMPACT PILLS) ────────────────────── */}
      <Section className="bg-background border-border-gold/20 border-b py-16">
        <Container size="xl" className="space-y-8">
          <div className="space-y-2 text-center">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Custom Enhancements
            </span>
            <Heading size="2xl" font="cinzel" className="text-text-primary">
              Optional Add-on Enhancements
            </Heading>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { title: "HD Photography", price: "₹3,500" },
              { title: "4K Drone Film", price: "₹12,000" },
              { title: "VIP Sanctum Darshan", price: "₹3,000" },
              { title: "Airport SUV Upgrade", price: "₹2,500" },
              { title: "4-Star Hotel Upgrade", price: "₹8,500" },
              { title: "Rajgir & Nalanda Trip", price: "₹8,000" },
              { title: "Courier Prasad Shipping", price: "Included / ₹500" },
              { title: "Extra Brahmin Bhojan", price: "₹2,100" },
            ].map((addon, i) => (
              <div
                key={i}
                className="border-gold-primary/25 bg-surface flex items-center justify-between rounded-2xl border p-3.5"
              >
                <span className="font-cinzel text-text-primary text-xs font-bold">
                  {addon.title}
                </span>
                <span className="text-gold-primary text-xs font-bold">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 8: TRUST & METRICS ──────────────────────────────────────── */}
      <Section className="border-border-gold/20 bg-muted border-b py-16">
        <Container size="xl" className="space-y-8 text-center">
          <div className="space-y-2">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Devotee Trust
            </span>
            <Heading size="2xl" font="cinzel" className="text-text-primary">
              Why 5,000+ Families Rely on Pitraya
            </Heading>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              { title: "5,000+", desc: "Families Served" },
              { title: "4.9 ★★★★★", desc: "Google Review Rating" },
              { title: "100%", desc: "Verified Gayawal Pandits" },
              { title: "Zero", desc: "Hidden Charges" },
              { title: "24/7", desc: "Concierge Assistance" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-surface border-gold-primary/30 space-y-1 rounded-2xl border p-6"
              >
                <p className="font-cinzel text-gold-primary text-xl font-black sm:text-2xl">
                  {stat.title}
                </p>
                <p className="text-text-muted text-xs">{stat.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 9: REVIEWS ──────────────────────────────────────────────── */}
      <Section className="bg-background border-border-gold/20 border-b py-16">
        <Container size="xl" className="space-y-8">
          <div className="space-y-2 text-center">
            <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
              Devotee Testimonials
            </span>
            <Heading size="2xl" font="cinzel" className="text-text-primary">
              What Families Say About Pitraya
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Rameshwar Sharma & Family",
                city: "New Delhi",
                pkg: "Moksha Experience",
                text: "Pitraya managed our entire 3-day Gaya pilgrimage with immense reverence. The Innova vehicle, 4-star hotel, and Pandit guidance were flawless.",
              },
              {
                name: "Ananya Iyer (NRI)",
                city: "London, UK",
                pkg: "Online Pind Daan",
                text: "Living in London, performing Pind Daan remotely via Live Video Call with Pandit Ji taking our family Gotra Sankalpa was deeply emotional. Prasad arrived via courier within 5 days.",
              },
              {
                name: "Vikramaditya Singh",
                city: "Mumbai",
                pkg: "Heritage Pilgrimage",
                text: "Clean heritage hotel, polite coordinator, zero priest bargaining. Pitraya is the gold standard for Gaya rituals.",
              },
            ].map((rev, i) => (
              <GlassCard
                key={i}
                className="border-gold-primary/30 space-y-4 p-6"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {"★".repeat(5)}
                </div>
                <p className="text-text-secondary text-xs leading-relaxed italic">
                  &quot;{rev.text}&quot;
                </p>
                <div className="border-border-gold/15 border-t pt-2">
                  <p className="font-cinzel text-text-primary text-xs font-bold">
                    {rev.name}
                  </p>
                  <p className="text-text-muted text-[10px]">
                    {rev.city} • {rev.pkg}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 10: FINAL CALL TO ACTION & STICKY BOTTOM BAR ───────────── */}
      <Section className="bg-background relative overflow-hidden py-20 text-center">
        <div className="bg-gold-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]" />

        <Container size="md" className="relative z-10 space-y-6">
          <Heading size="2xl" font="cinzel" className="text-text-primary">
            Still Not Sure Which Package Fits Your Family?
          </Heading>
          <Paragraph size="sm" variant="muted" className="mx-auto max-w-xl">
            Speak directly with our Senior Gaya Pilgrimage Advisors for
            personalized guidance tailored to your family&apos;s schedule and
            lineage rites.
          </Paragraph>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <PrimaryButton
              size="lg"
              onClick={() => handleOpenBooking("moksha-journey")}
              className="font-cinzel shadow-gold-glow px-8 py-4 text-xs font-bold"
            >
              Book Selected Package ({selectedPkg.price}) →
            </PrimaryButton>

            <button
              onClick={() => {
                const text = encodeURIComponent(
                  "Namaste! I would like to consult with a Pitraya Ritual Advisor regarding my Gaya Pind Daan package selection."
                );
                window.open(
                  `https://wa.me/918434457228?text=${text}`,
                  "_blank"
                );
              }}
              className="bg-surface text-text-primary flex cursor-pointer items-center gap-2 rounded-xl border border-[#25D366]/50 px-6 py-4 text-xs font-bold transition-all hover:bg-[#25D366]/10 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:outline-none"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>Talk to Ritual Advisor (WhatsApp)</span>
            </button>
          </div>
        </Container>
      </Section>

      {/* MOBILE BOTTOM STICKY NAVIGATION BAR (WhatsApp + Book Package) */}
      <div className="border-gold-primary/30 bg-surface fixed right-0 bottom-0 left-0 z-50 flex items-center gap-3 border-t p-3 shadow-lg sm:hidden">
        <button
          onClick={() => {
            const text = encodeURIComponent(
              "Namaste! I would like to inquire about Pitraya Gaya Pind Daan packages."
            );
            window.open(`https://wa.me/918434457228?text=${text}`, "_blank");
          }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-3 text-xs font-bold text-white shadow-lg"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => handleOpenBooking(selectedPkgId)}
          className="bg-gold-gradient font-cinzel shadow-gold-glow flex flex-1 items-center justify-center gap-1 rounded-xl px-3 py-3 text-xs font-extrabold text-black"
        >
          <span>
            Book {selectedPkg.title} ({selectedPkg.price})
          </span>
        </button>
      </div>

      <FloatingHelpAdvisor />
    </HomePage>
  );
}
