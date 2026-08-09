"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Plane,
  UserCheck,
  Hotel,
  BookOpenCheck,
  Flame,
  TreePine,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Compass,
  CheckCircle2,
  Sparkle,
  Users,
  Star,
  ShieldCheck,
  Award,
  MapPin,
  Luggage,
  Utensils,
  Car,
  Gift,
  HeartHandshake,
  FileText,
  HelpCircle,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import IconButton from "@/components/buttons/IconButton";
import GoldenParticles from "@/components/animations/GoldenParticles";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import {
  glowingCircleVariants,
  cardFadeVariants,
  imageZoomVariants,
  textContainerVariants,
  textSlideItemVariants,
} from "@/components/animations/GuidedStepFlow";
import { cn } from "@/lib/utils";

export interface ScheduleItem {
  time: string;
  task: string;
}

export interface PackageIndicator {
  statusText: string;
  colorVariant: "green" | "yellow" | "orange";
  packages: string[];
}

export interface JourneySnapshot {
  duration: string;
  location: string;
  includedIn: string[];
  needToCarry: string;
  meals: string;
  vehicle: string;
}

export interface JourneyGuideDetails {
  whatHappens: string;
  whyItHappens: string;
  howLongItTakes: string;
  familyExperience: string;
  needToCarryItems: string[];
  whoAccompanies: string;
  packagesIncludedText: string;
  endStepTakeaway: string;
}

export interface JourneyStep {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  includesTitle: string;
  scheduleHeader: string;
  highlights: string[];
  packageTier?: string;
  estimatedTime: string;
  timelineFlow: ScheduleItem[];
  emotionalQuote: string;
  packageIndicators: PackageIndicator[];
  snapshot: JourneySnapshot;
  guideDetails: JourneyGuideDetails;
}

export const journeyTrustStats = [
  {
    label: "Families Guided",
    value: "18,000+",
    subtext: "Across India & Worldwide",
    icon: <Users className="h-5 w-5 text-gold-primary" />,
  },
  {
    label: "Pilgrim Rating",
    value: "4.9 ★★★★★",
    subtext: "Verified Verified Reviews",
    icon: <Star className="h-5 w-5 text-gold-primary fill-gold-primary" />,
  },
  {
    label: "Zero Hidden Charges",
    value: "100% Transparent",
    subtext: "Fixed Package Pricing",
    icon: <ShieldCheck className="h-5 w-5 text-gold-primary" />,
  },
  {
    label: "Hereditary Priests",
    value: "100% Gayawal",
    subtext: "Ancient Record Holders",
    icon: <Award className="h-5 w-5 text-gold-primary" />,
  },
  {
    label: "Avg Journey Time",
    value: "2 Sacred Days",
    subtext: "End-to-End Managed",
    icon: <Clock className="h-5 w-5 text-gold-primary" />,
  },
];

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Arrival & Escort",
    subtitle: "Arrive at Gaya Airport or Railway Station",
    description: "Your journey begins the moment you land at Gaya Airport or arrive at Gaya Junction railway station. Your personal Pitraya coordinator welcomes your family with folded hands, assists with your luggage, and escorts you to your waiting private vehicle. No confusion, no bargaining, no searching for priests — only peace.",
    image: "/images/journey_arrival.png",
    icon: <Plane className="h-5 w-5 text-gold-primary" />,
    includesTitle: "Your Arrival Includes",
    scheduleHeader: "Arrival Schedule",
    estimatedTime: "12:00 PM - 01:30 PM",
    emotionalQuote: "Stepping onto holy ground welcomed with folded hands — where your long-awaited pilgrimage begins in total peace.",
    timelineFlow: [
      { time: "12:00 PM", task: "Touchdown at Gaya Airport / Station" },
      { time: "12:15 PM", task: "Placard Welcome & Folded-Hands Greeting" },
      { time: "12:30 PM", task: "Luggage Assistance & Cold Refreshments" },
      { time: "01:00 PM", task: "Smooth Private Chauffeur Ride to Hotel" },
    ],
    highlights: [
      "Airport/Railway pickup with name placard",
      "Traditional welcome with folded hands",
      "Mineral water and cold refreshments",
      "Elderly assistance & wheelchair coordination",
      "Full luggage handling from terminal to vehicle",
      "Dedicated family coordinator on site",
      "Direct AC private chauffeur transfer to hotel",
      "24×7 WhatsApp support channel activated",
    ],
    packageTier: "Included in Heritage & above",
    packageIndicators: [
      {
        statusText: "Included in",
        colorVariant: "green",
        packages: ["Heritage", "Moksha", "Royal", "Elite"],
      },
    ],
    snapshot: {
      duration: "30 - 90 Minutes",
      location: "Gaya Airport / Junction Station",
      includedIn: ["Heritage", "Moksha", "Royal", "Elite"],
      needToCarry: "Government ID & Flight/Train Ticket",
      meals: "Cold Refreshments & Mineral Water",
      vehicle: "Private AC Sedan / SUV",
    },
    guideDetails: {
      whatHappens: "Direct personal greeting at terminal exit with name card, immediate baggage handling, and direct chauffeur escort.",
      whyItHappens: "Arriving in Gaya can feel overwhelming due to crowded stations and aggressive touts. A dedicated greeting preserves your family's dignity and spiritual focus.",
      howLongItTakes: "Approximately 30 to 90 minutes depending on flight/train arrival time and hotel distance.",
      familyExperience: "Frictionless transition from travel fatigue into serene luxury concierge care with folded-hands reverence.",
      needToCarryItems: ["Government Identity Proof (Aadhaar/Passport)", "Flight or Railway e-tickets"],
      whoAccompanies: "Dedicated Pitraya Airport/Station Escort & Uniformed Private Chauffeur",
      packagesIncludedText: "Heritage, Moksha, Royal, and Elite concierge packages.",
      endStepTakeaway: "Seamless arrival at hotel without dealing with local transport or bargaining.",
    },
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Meet Your Coordinator",
    subtitle: "Your Pitraya Coordinator Briefs Your Family",
    description: "During the drive and upon arrival, your dedicated Pitraya coordinator introduces themselves, walks you through the complete day-by-day schedule, answers all questions about the rituals, and confirms timings for the pandit meeting and temple visits. Everything is pre-planned — you just follow.",
    image: "/images/journey_coordinator.png",
    icon: <UserCheck className="h-5 w-5 text-gold-primary" />,
    includesTitle: "Your Journey Briefing Includes",
    scheduleHeader: "Briefing Schedule",
    estimatedTime: "01:30 PM - 02:30 PM",
    emotionalQuote: "Guided by devotion and guarded by care — leaving zero room for confusion so your heart stays focused on your ancestors.",
    timelineFlow: [
      { time: "01:30 PM", task: "Meet Personal Pitraya Coordinator" },
      { time: "01:45 PM", task: "Complete Itinerary & Schedule Walkthrough" },
      { time: "02:00 PM", task: "Ancestral Gotra & Family Record Check" },
      { time: "02:15 PM", task: "24×7 Direct WhatsApp Line Activation" },
    ],
    highlights: [
      "Dedicated Pitraya coordinator assigned to your family",
      "Full day-by-day itinerary walkthrough in your language",
      "Priority confirmation of pandit meeting & temple slots",
      "Guidance on ritual clothing and sacred purity requirements",
      "Direct mobile & WhatsApp access to your coordinator",
      "Clear explanation of all included samagri and services",
      "Zero hidden fees or extra pandit negotiations",
      "Instant answering of all family questions before rites begin",
    ],
    packageTier: "Included in Heritage & above",
    packageIndicators: [
      {
        statusText: "Included in",
        colorVariant: "green",
        packages: ["Heritage", "Moksha", "Royal", "Elite"],
      },
    ],
    snapshot: {
      duration: "45 - 60 Minutes",
      location: "Hotel Lounge / Concierge Suite",
      includedIn: ["Heritage", "Moksha", "Royal", "Elite"],
      needToCarry: "Ancestral Gotra & Departed Family Names",
      meals: "Ayurvedic Herbal Tea Elixir",
      vehicle: "On-site Briefing (No Vehicle Needed)",
    },
    guideDetails: {
      whatHappens: "Complete review of ritual schedule, verification of family Gotra details, and distribution of contact helpline numbers.",
      whyItHappens: "Clear preparation removes anxiety so elders and family members understand every detail before entering holy sites.",
      howLongItTakes: "45 to 60 minutes over welcoming herbal tea.",
      familyExperience: "Total clarity and peace of mind, knowing every minute of the next two days is fully organized.",
      needToCarryItems: ["List of departed family members & ancestors", "Family Gotra details"],
      whoAccompanies: "Senior Pitraya Family Concierge Officer",
      packagesIncludedText: "Heritage, Moksha, Royal, and Elite packages.",
      endStepTakeaway: "Personalized printed itinerary & 24/7 direct WhatsApp emergency contact line.",
    },
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Sanctuary Hotel Check-in",
    subtitle: "Private Express Check-in at Your Pre-booked Hotel",
    description: "Arrive at your pre-booked AC hotel near Vishnupad Temple. Your room is already assigned and prepared — no waiting at the front desk. Freshen up, enjoy Sattvik high tea, rest after your journey, and receive your ritual kit containing fresh clothes, flowers, sandalwood, and pooja essentials.",
    image: "/images/hotel_luxury_suite.png",
    icon: <Hotel className="h-5 w-5 text-gold-primary" />,
    includesTitle: "Your Sanctuary Stay Includes",
    scheduleHeader: "Afternoon Sanctuary Schedule",
    estimatedTime: "02:30 PM - 08:00 PM",
    emotionalQuote: "A quiet, peaceful sanctuary pre-prepared for your family, allowing your soul to rest before stepping onto holy ground.",
    timelineFlow: [
      { time: "02:30 PM", task: "Express Priority Room Check-in" },
      { time: "03:30 PM", task: "Sattvik High Tea & Refreshments" },
      { time: "04:30 PM", task: "Rest & Personal Reflection" },
      { time: "06:00 PM", task: "Sacred Pooja Samagri Kit Delivery" },
      { time: "07:30 PM", task: "Sattvik Vegetarian Dinner" },
      { time: "09:00 PM", task: "Rest Before Dawn Rituals" },
    ],
    highlights: [
      "Pre-booked 3-Star/4-Star AC hotel stay near Vishnupad",
      "Express priority room check-in with zero waiting",
      "Complete ritual kit with fresh pooja samagri delivered",
      "Sattvik meals & pure vegetarian dining arrangements",
      "Clean, hygienic rooms with hot water & elevators",
      "Peaceful environment for pre-ritual rest & meditation",
      "Morning wake-up call & tea before dawn rituals",
      "On-call hotel coordinator assistance",
    ],
    packageTier: "Included in Heritage & above",
    packageIndicators: [
      {
        statusText: "Included in",
        colorVariant: "green",
        packages: ["Heritage", "Moksha", "Royal", "Elite"],
      },
    ],
    snapshot: {
      duration: "Overnight Sanctuary Stay",
      location: "Partner 3-Star / 4-Star AC Hotel",
      includedIn: ["Heritage", "Moksha", "Royal", "Elite"],
      needToCarry: "Personal Clothing & Toiletries",
      meals: "Sattvik High Tea & Pure Veg Dinner",
      vehicle: "Private Chauffeur Drop & Morning Pickup",
    },
    guideDetails: {
      whatHappens: "Express key handover at hotel, room settlement, delivery of sacred Samagri kit, and pure Sattvik dinner service.",
      whyItHappens: "Physical rest and ritual purity are required prior to performing Pind Daan at dawn.",
      howLongItTakes: "Afternoon arrival until early morning wake-up call.",
      familyExperience: "Quiet luxury and physical restoration in air-conditioned comfort.",
      needToCarryItems: ["Modest traditional clothing for morning rites"],
      whoAccompanies: "Pitraya Hotel Desk Concierge & Hospitality Staff",
      packagesIncludedText: "Heritage, Moksha, Royal, and Elite packages.",
      endStepTakeaway: "Pre-delivered Sacred Pooja Kit (Kusha grass, sandalwood, organic brass items, fresh flowers).",
    },
  },
  {
    id: 4,
    stepNumber: "04",
    title: "Gayawal Pandit Consultation",
    subtitle: "Sit with Your Assigned Gayawal Pandit",
    description: "Meet your assigned Gayawal Pandit — a hereditary priest whose family has performed these rituals for generations. Together, you verify your ancestral records in the ancient palm-leaf registers (Panjis), confirm the names of departed family members, and take the sacred Sankalpa vow that formally begins the ritual process.",
    image: "/images/journey_pandit_consultation.png",
    icon: <BookOpenCheck className="h-5 w-5 text-gold-primary" />,
    includesTitle: "Your Pandit Consultation Includes",
    scheduleHeader: "Dawn Consultation Schedule",
    estimatedTime: "06:00 AM - 08:00 AM (Day 2)",
    emotionalQuote: "Tracing your family's sacred lineage through ancient palm-leaf registers preserved across centuries by hereditary Gayawal Pandits.",
    timelineFlow: [
      { time: "06:00 AM", task: "Wake Up & Ritual Purity Prep" },
      { time: "06:30 AM", task: "Sattvik Morning Tea" },
      { time: "07:00 AM", task: "Meet Senior Gayawal Pandit" },
      { time: "07:30 AM", task: "Ancient Panji Record Verification" },
      { time: "08:00 AM", task: "Sacred Sankalpa Vow Ceremony" },
    ],
    highlights: [
      "Hereditary Gayawal Pandit assigned with verified lineage",
      "Verification of ancestral family records in ancient Panjis",
      "Custom Sankalpa vow customized to your family lineage",
      "Detailed consultation on ancestral names & gotra",
      "Guidance on exact ritual procedures for Vishnupad & Falgu",
      "Provision of sacred threads, kusha grass, and brass utensils",
      "Private quiet space for pre-puja briefing",
      "Complete clarity on mantras and spiritual significance",
    ],
    packageTier: "Included in all packages",
    packageIndicators: [
      {
        statusText: "Included in All Packages",
        colorVariant: "green",
        packages: ["Ritual-Only", "Heritage", "Moksha", "Royal", "Elite"],
      },
    ],
    snapshot: {
      duration: "90 - 120 Minutes",
      location: "Gayawal Pandit Archives Lounge",
      includedIn: ["Ritual-Only", "Heritage", "Moksha", "Royal", "Elite"],
      needToCarry: "Names of Departed Ancestors (up to 7 generations)",
      meals: "Morning Sattvik Herbal Tea",
      vehicle: "Private AC Vehicle Transfer",
    },
    guideDetails: {
      whatHappens: "Direct sitting with hereditary Gayawal Pandit, verification of family palm-leaf register entry, and formal Sankalpa vow.",
      whyItHappens: "Gaya Pind Daan requires authoritative hereditary Pandits recognised by ancient tradition for efficacy.",
      howLongItTakes: "1.5 to 2 hours in early morning purity.",
      familyExperience: "Deep spiritual connection as you witness your family's ancestral records dating back generations.",
      needToCarryItems: ["List of deceased family members, Gotra, and death dates if known"],
      whoAccompanies: "Senior Hereditary Gayawal Pandit & Family Coordinator",
      packagesIncludedText: "Included in ALL packages (Ritual-Only, Heritage, Moksha, Royal, Elite).",
      endStepTakeaway: "Formally recorded family Panji entry & blessed Sankalpa sacred thread.",
    },
  },
  {
    id: 5,
    stepNumber: "05",
    title: "Rituals at Vishnupad & Falgu",
    subtitle: "Perform Pind Daan at Vishnupad Temple & Falgu River",
    description: "This is the core ceremony. At Vishnupad Temple, you perform Pind Daan at the sacred footprint of Lord Vishnu. Then, at the Falgu River ghats, you offer rice and sesame Pindas with full Vedic mantra recitation by your pandit. Each step is guided — your pandit explains the meaning of every mantra and ritual action.",
    image: "/images/pinda_daan_ceremony.png",
    icon: <Flame className="h-5 w-5 text-gold-primary" />,
    includesTitle: "Your Vishnupad & Falgu Rites Include",
    scheduleHeader: "Morning Ritual Schedule",
    estimatedTime: "06:00 AM - 01:00 PM",
    emotionalQuote: "Offering sacred Pindas at Lord Vishnu's divine footprint — releasing seven generations of ancestors into eternal Moksha.",
    timelineFlow: [
      { time: "06:00 AM", task: "Wake Up & Ritual Purity Prep" },
      { time: "06:30 AM", task: "Tea & Sacred Attire Preparation" },
      { time: "07:00 AM", task: "Proceed to Vishnupad Temple" },
      { time: "08:00 AM", task: "Panji Verification & Sankalpa" },
      { time: "09:00 AM", task: "Pind Daan at Vishnu Footprint" },
      { time: "10:30 AM", task: "Phalgu River Tarpan & Sand Pindas" },
      { time: "12:00 PM", task: "Sacred Fire Havan & Aarti" },
      { time: "01:00 PM", task: "Return for Sattvik Lunch" },
    ],
    highlights: [
      "Reserved space at Lord Vishnu's sacred footprint (Vishnupad)",
      "Tarpan oblation ceremony on the banks of Falgu Nadi",
      "Rice, sesame (til), and barley Pindas prepared by Pandit",
      "Continuous Vedic mantra chanting by senior Gayawal Pandit",
      "Sacred havan & fire ritual for ancestral peace",
      "VIP queue assistance at main Vishnupad sanctum",
      "Assistance for elderly family members during river rites",
      "Complete video & photo capture of sacred moments",
    ],
    packageTier: "Included in all packages",
    packageIndicators: [
      {
        statusText: "Included in All Packages",
        colorVariant: "green",
        packages: ["Ritual-Only", "Heritage", "Moksha", "Royal", "Elite"],
      },
      {
        statusText: "Cinematic Photography Included Only in",
        colorVariant: "yellow",
        packages: ["Royal", "Elite"],
      },
    ],
    snapshot: {
      duration: "4 - 5 Hours",
      location: "Vishnupad Temple Sanctum & Falgu River Ghats",
      includedIn: ["Ritual-Only", "Heritage", "Moksha", "Royal", "Elite"],
      needToCarry: "Traditional Ritual Attire (Dhoti/Saree)",
      meals: "Sattvik Feast Lunch Post-Ceremony",
      vehicle: "Dedicated VIP Transfer & Priority Temple Entry",
    },
    guideDetails: {
      whatHappens: "Offering of sacred Pindas at Vishnu Footprint, Tarpan water oblations at Falgu River, Vedic chanting, and Havan fire rite.",
      whyItHappens: "Vishnupad is the holiest ground on Earth for ancestral liberation, freeing seven past generations.",
      howLongItTakes: "4 to 5 hours of immersive Vedic rituals.",
      familyExperience: "Profound emotional release, spiritual fulfillment, and sacred peace.",
      needToCarryItems: ["White or traditional unstitched ritual garments"],
      whoAccompanies: "Gayawal Vedic Priest, Havan Assistant, & Personal Escort Coordinator",
      packagesIncludedText: "Included in ALL packages.",
      endStepTakeaway: "Pind Daan completion certificate, sanctified Prasad, and HD ritual photography.",
    },
  },
  {
    id: 6,
    stepNumber: "06",
    title: "Visit Akshay Vat & Holy Sites",
    subtitle: "Complete the Pilgrimage at the Immortal Banyan Tree",
    description: "Your Gaya pilgrimage is considered incomplete without visiting Akshay Vat — the immortal banyan tree. Here, you offer the final leaf oblation that permanently seals ancestral liberation. Your pandit also guides you through brief prayers at nearby sacred spots like Pretshila Hill and Mangla Gauri Temple.",
    image: "/images/akshay_vat_banyan.png",
    icon: <TreePine className="h-5 w-5 text-gold-primary" />,
    includesTitle: "Your Akshay Vat Rites Include",
    scheduleHeader: "Afternoon Rites Schedule",
    estimatedTime: "02:00 PM - 05:30 PM",
    emotionalQuote: "Sealing your family's ancestral liberation permanently beneath the shade of the Immortal Banyan Tree.",
    timelineFlow: [
      { time: "02:00 PM", task: "Transfer to Akshay Vat Banyan Tree" },
      { time: "02:30 PM", task: "Final Leaf Oblation Ceremony" },
      { time: "03:30 PM", task: "Mangla Gauri Shakti Peetha Darshan" },
      { time: "04:30 PM", task: "Optional Pretshila Hill Rites" },
      { time: "05:30 PM", task: "Return to Hotel & Rest" },
    ],
    highlights: [
      "Final leaf oblation under the Immortal Banyan Tree (Akshay Vat)",
      "Permanent sealing of ancestral liberation (Moksha)",
      "Guided visit to Pretshila Hill for unnatural death rites (if needed)",
      "Mangla Gauri Shakti Peetha darshan for maternal line blessings",
      "Explanation of Panch Sakshi (five eternal witnesses)",
      "Private vehicle transfer between all sacred spots",
      "Peaceful time for personal family prayers & contemplation",
      "Sacred water and thread blessings from Akshay Vat priest",
    ],
    packageTier: "Included in Heritage & above",
    packageIndicators: [
      {
        statusText: "Akshay Vat Rites Included in",
        colorVariant: "green",
        packages: ["Heritage", "Moksha", "Royal", "Elite"],
      },
      {
        statusText: "Bodh Gaya & Pretshila Excursion",
        colorVariant: "orange",
        packages: ["Moksha", "Royal", "Optional Add-on"],
      },
    ],
    snapshot: {
      duration: "3.5 Hours",
      location: "Akshay Vat Banyan Complex & Shakti Peetha",
      includedIn: ["Heritage", "Moksha", "Royal", "Elite"],
      needToCarry: "Comfortable Walking Footwear",
      meals: "Refreshing Herbal Drinks & Snacks",
      vehicle: "Private AC Chauffeur Vehicle",
    },
    guideDetails: {
      whatHappens: "Offering final leaf oblation under Akshay Vat Banyan, Shakti Peetha darshan, and Panch Sakshi eternal witness invocation.",
      whyItHappens: "Akshay Vat seals the Pind Daan permanently so the ritual never has to be repeated for these ancestors.",
      howLongItTakes: "3.5 hours during peaceful afternoon hours.",
      familyExperience: "Culmination of your pilgrimage with deep sense of finality and everlasting divine blessing.",
      needToCarryItems: ["Modest walking attire & camera for memory capture"],
      whoAccompanies: "Akshay Vat Priest & Pitraya Chauffeur Guide",
      packagesIncludedText: "Heritage, Moksha, Royal, and Elite packages.",
      endStepTakeaway: "Sacred Banyan Leaf seal & blessed Panch Sakshi token.",
    },
  },
  {
    id: 7,
    stepNumber: "07",
    title: "Departure & Blessings",
    subtitle: "Your Journey Ends, Your Blessings Continue",
    description: "As your rituals conclude, your Gayawal Pandit blesses your family, presents your lineage certificate, and offers Mahaprasad to carry home. You leave Gaya not only with memories—but with the satisfaction of fulfilling one of the most sacred duties in Hindu tradition.",
    image: "/images/journey_departure.png",
    icon: <CarFront className="h-5 w-5 text-gold-primary" />,
    includesTitle: "Your Departure & Blessing Includes",
    scheduleHeader: "Departure & Blessing Schedule",
    estimatedTime: "09:00 AM - 01:00 PM",
    emotionalQuote: "Your Journey Ends, Your Blessings Continue — As your rituals conclude, your Gayawal Pandit blesses your family, presents your lineage certificate, and offers Mahaprasad to carry home. You leave Gaya not only with memories, but with the satisfaction of fulfilling one of the most sacred duties in Hindu tradition.",
    timelineFlow: [
      { time: "09:00 AM", task: "Final Pandit Blessing Ceremony" },
      { time: "09:30 AM", task: "Signed Lineage Certificate Handover" },
      { time: "10:00 AM", task: "Sacred Mahaprasadam Packaging" },
      { time: "11:00 AM", task: "Hotel Check-out & Luggage Loading" },
      { time: "12:00 PM", task: "Private Chauffeur Car Transfer to Airport/Station" },
    ],
    highlights: [
      "Formal signed family lineage certificate issued by Pandit",
      "Sacred Mahaprasadam & temple bhog packaged for travel",
      "Final blessing ceremony for family prosperity & health",
      "Safe luggage loading into private chauffeur vehicle",
      "Direct transfer to Gaya Airport or Railway Station",
      "On-time arrival guarantee for flight/train departure",
      "Digital photo album & ritual certificate sent via WhatsApp",
      "Lifelong family record added to Pitraya sacred registry",
    ],
    packageTier: "Included in Heritage & above",
    packageIndicators: [
      {
        statusText: "Included in",
        colorVariant: "green",
        packages: ["Heritage", "Moksha", "Royal", "Elite"],
      },
    ],
    snapshot: {
      duration: "2 - 3 Hours",
      location: "Hotel Suite to Gaya Terminal",
      includedIn: ["Heritage", "Moksha", "Royal", "Elite"],
      needToCarry: "All Personal Belongings & Lineage Certificate",
      meals: "Travel Sattvik Meal Box & Mahaprasad",
      vehicle: "Private AC Chauffeur Airport/Station Transfer",
    },
    guideDetails: {
      whatHappens: "Pandit final blessing ceremony, formal handover of signed Lineage Certificate, Mahaprasadam packaging, and private chauffeur transfer.",
      whyItHappens: "Completes the sacred duty with formal record keeping and smooth, stress-free return travel.",
      howLongItTakes: "2 to 3 hours leading up to flight or train departure.",
      familyExperience: "Profound peace, pride, and spiritual joy carrying ancestral blessings back to your home.",
      needToCarryItems: ["Packed luggage & travel documents"],
      whoAccompanies: "Senior Gayawal Pandit & Private Chauffeur",
      packagesIncludedText: "Heritage, Moksha, Royal, and Elite packages.",
      endStepTakeaway: "Formal Signed Family Lineage Certificate, Packaged Temple Mahaprasad, & Digital Keepsake Album.",
    },
  },
];

export default function JourneySection({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeStep = journeySteps.find((s) => s.id === activeStepId) || journeySteps[0];

  const handleNext = () => {
    if (activeStepId < journeySteps.length) {
      setActiveStepId(activeStepId + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepId > 1) {
      setActiveStepId(activeStepId - 1);
    }
  };

  return (
    <Section
      spacing="xl"
      className={cn("relative py-24 overflow-hidden text-text-primary border-b border-border-gold/20 bg-[#08090F]", className)}
      {...props}
    >
      {/* Background Golden Particles & Sacred Circular Chakra */}
      <GoldenParticles particleCount={30} className="opacity-30 pointer-events-none" />
      <SacredChakraBg size="min(750px, 95vw)" opacity={0.045} rotateSpeed={160} />

      {/* Ambient Glow background lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>CHAPTER 05 • THE STEP-BY-STEP PILGRIMAGE GUIDE</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel">
            The Sacred{" "}
            <GradientText variant="gold" size="inherit" font="cinzel">
              Journey
            </GradientText>
          </Heading>

          {/* Subheading Quote & Detailed Narrative */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-cinzel font-medium text-gold-primary tracking-tight">
              &ldquo;Welcome Home to Your Ancestors&rdquo;
            </h3>
            
            <Paragraph size="lg" align="center" variant="muted" className="leading-relaxed text-text-secondary text-base sm:text-lg">
              After months—or perhaps years—of planning this sacred duty, your journey finally begins. As you step out of Gaya Airport or Railway Station, your personal Pitraya coordinator welcomes your family with folded hands, assists with your luggage, and escorts you to your waiting vehicle.
            </Paragraph>

            {/* Peace & Luxury Concierge Pill Strip */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-text-primary">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/90 border border-gold-primary/30 text-gold-primary backdrop-blur-md shadow-xs">
                ✓ No confusion
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/90 border border-gold-primary/30 text-gold-primary backdrop-blur-md shadow-xs">
                ✓ No bargaining
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/90 border border-gold-primary/30 text-gold-primary backdrop-blur-md shadow-xs">
                ✓ No searching for priests
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-primary text-black font-bold shadow-md shadow-gold-primary/20">
                <Sparkle className="h-3.5 w-3.5 fill-black" />
                Only Peace — Luxury Concierge Experience
              </span>
            </div>
          </div>
        </div>

        {/* TRUST STATISTICS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {journeyTrustStats.map((stat, idx) => (
            <GlassCard
              key={idx}
              borderGold
              className="p-4 flex flex-col items-center text-center space-y-2 group hover:border-gold-primary/60 transition-all duration-300 bg-surface/80"
            >
              <div className="p-2.5 rounded-xl bg-gold-primary/10 border border-gold-primary/30 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-cinzel text-gold-primary">
                  {stat.value}
                </span>
                <span className="block text-xs font-semibold text-text-primary uppercase tracking-wider font-cinzel mt-0.5">
                  {stat.label}
                </span>
                <span className="block text-[11px] text-text-muted mt-0.5">
                  {stat.subtext}
                </span>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* HORIZONTAL TIMELINE STEPPER HEADER */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel">
              Journey Progress: Step {activeStepId} of {journeySteps.length}
            </span>
            <div className="flex items-center gap-2">
              <IconButton
                ariaLabel="Previous Step"
                variant="outline"
                shape="circle"
                size="sm"
                isDisabled={activeStepId === 1}
                onClick={handlePrev}
                icon={<ChevronLeft className="h-4 w-4" />}
              />
              <IconButton
                ariaLabel="Next Step"
                variant="outline"
                shape="circle"
                size="sm"
                isDisabled={activeStepId === journeySteps.length}
                onClick={handleNext}
                icon={<ChevronRight className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* HORIZONTAL TIMELINE PROGRESS TRACK */}
          <div className="relative w-full overflow-x-auto pb-4 scrollbar-none" ref={scrollContainerRef}>
            <div className="relative flex items-center justify-between min-w-[860px] px-6 py-4">
              {/* Connecting Horizontal Line Progress Fill */}
              <div className="absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-border-gold/30 z-0">
                <motion.div
                  className="h-full bg-gold-gradient shadow-gold-glow"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${((activeStepId - 1) / (journeySteps.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Step Nodes */}
              {journeySteps.map((step) => {
                const isActive = step.id === activeStepId;
                const isCompleted = step.id < activeStepId;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className="relative z-10 flex flex-col items-center group focus:outline-none"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        boxShadow: isActive
                          ? "0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.3)"
                          : "0 0 0px rgba(212, 175, 55, 0)",
                      }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 font-bold text-sm",
                        isActive
                          ? "bg-gold-primary text-black border-white shadow-gold-glow"
                          : isCompleted
                          ? "bg-gold-primary/20 text-gold-primary border-gold-primary/60"
                          : "bg-background text-text-muted border-border hover:border-gold-primary/40"
                      )}
                    >
                      {step.icon}
                    </motion.div>

                    <span
                      className={cn(
                        "mt-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 font-cinzel",
                        isActive ? "text-gold-primary" : "text-text-muted group-hover:text-text-primary"
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ACTIVE STEP FEATURE SHOWCASE CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardFadeVariants}
            custom={0}
            className="space-y-8"
          >
            <GlassCard borderGold glow padding="lg" className="bg-gradient-to-br from-surface via-background to-surface overflow-hidden space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Image Showcase & Real Operational Time Schedule Box */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Step Image */}
                  <motion.div
                    variants={imageZoomVariants}
                    className="relative h-[280px] sm:h-[320px] w-full overflow-hidden rounded-2xl border border-gold-primary/30 shadow-xl group"
                  >
                    <Image
                      src={activeStep.image}
                      alt={activeStep.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-black/70 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-gold-primary border border-gold-primary/30">
                      Step {activeStep.stepNumber} of 07
                    </span>
                    {activeStep.packageTier && (
                      <span className="absolute top-4 right-4 rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-gold-primary border border-gold-primary/40 shadow-sm">
                        ✓ {activeStep.packageTier}
                      </span>
                    )}
                  </motion.div>

                  {/* Real Operational Time Schedule Box */}
                  <div className="rounded-2xl border border-gold-primary/30 bg-surface/95 p-4 sm:p-5 space-y-3.5 shadow-xl backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-gold-primary/20 pb-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gold-primary uppercase tracking-wider font-cinzel">
                        <Clock className="h-4 w-4 text-gold-primary shrink-0" />
                        <span>{activeStep.scheduleHeader} ({activeStep.estimatedTime})</span>
                      </div>
                      <span className="text-[10px] font-semibold uppercase text-gold-accent bg-gold-primary/10 px-2.5 py-0.5 rounded-full border border-gold-primary/20">
                        Exact Timeline
                      </span>
                    </div>

                    {/* Time-Stamped Sequence List */}
                    <motion.div variants={textContainerVariants} className="space-y-2">
                      {activeStep.timelineFlow.map((item, idx) => (
                        <motion.div key={idx} variants={textSlideItemVariants} className="flex items-center gap-2.5 text-xs">
                          <span className="font-mono font-bold text-gold-primary bg-gold-primary/10 px-2.5 py-1 rounded-md border border-gold-primary/30 w-24 text-center shrink-0 shadow-xs">
                            {item.time}
                          </span>
                          <span className="font-medium text-text-primary text-xs sm:text-sm">{item.task}</span>
                          {idx < activeStep.timelineFlow.length - 1 && (
                            <span className="ml-auto text-gold-primary/40 text-xs shrink-0">↓</span>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Right Column: Step Description, Complete Pilgrimage Guide Details */}
                <motion.div variants={textContainerVariants} className="lg:col-span-7 space-y-6">
                  <motion.div variants={textSlideItemVariants} className="space-y-2">
                    <span className="text-xs font-semibold text-gold-accent uppercase tracking-widest font-cinzel">
                      {activeStep.subtitle}
                    </span>
                    <Heading size="xl" font="cinzel" className="text-text-primary text-2xl sm:text-3xl">
                      {activeStep.title}
                    </Heading>
                  </motion.div>

                  <motion.div variants={textSlideItemVariants}>
                    <Paragraph size="md" variant="muted" className="leading-relaxed text-text-secondary text-sm sm:text-base">
                      {activeStep.description}
                    </Paragraph>
                  </motion.div>

                  {/* COMPLETE PILGRIMAGE GUIDE DETAILED DIMENSIONS GRID */}
                  <motion.div variants={textSlideItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* What Happens & Why */}
                    <div className="p-4 rounded-xl bg-surface/90 border border-gold-primary/20 space-y-2 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel">
                        <HelpCircle className="h-4 w-4 text-gold-primary shrink-0" />
                        <span>What & Why It Happens</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        <strong className="text-text-primary">What:</strong> {activeStep.guideDetails.whatHappens}
                      </p>
                      <p className="text-xs text-gold-accent leading-relaxed pt-1 border-t border-border-gold/20">
                        <strong className="text-gold-primary">Spiritual Reason:</strong> {activeStep.guideDetails.whyItHappens}
                      </p>
                    </div>

                    {/* Who Accompanies & Takeaway */}
                    <div className="p-4 rounded-xl bg-surface/90 border border-gold-primary/20 space-y-2 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel">
                        <HeartHandshake className="h-4 w-4 text-gold-primary shrink-0" />
                        <span>Who Accompanies & Takeaways</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        <strong className="text-text-primary">Escort:</strong> {activeStep.guideDetails.whoAccompanies}
                      </p>
                      <p className="text-xs text-emerald-300 leading-relaxed pt-1 border-t border-border-gold/20">
                        <strong className="text-emerald-400">Step Takeaway:</strong> {activeStep.guideDetails.endStepTakeaway}
                      </p>
                    </div>
                  </motion.div>

                  {/* Package Indicators */}
                  {activeStep.packageIndicators && activeStep.packageIndicators.length > 0 && (
                    <motion.div variants={textSlideItemVariants} className="space-y-2 pt-1">
                      {activeStep.packageIndicators.map((indicator, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "rounded-xl border p-3 sm:px-4 sm:py-3 backdrop-blur-md transition-all duration-300 shadow-sm flex flex-wrap items-center justify-between gap-2.5 text-xs",
                            indicator.colorVariant === "green" && "border-emerald-500/40 bg-emerald-950/25 text-emerald-300",
                            indicator.colorVariant === "yellow" && "border-amber-500/40 bg-amber-950/25 text-amber-300",
                            indicator.colorVariant === "orange" && "border-orange-500/40 bg-orange-950/25 text-orange-300"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "h-2.5 w-2.5 rounded-full shrink-0 animate-pulse",
                              indicator.colorVariant === "green" && "bg-emerald-400 shadow-emerald-500/50 shadow-sm",
                              indicator.colorVariant === "yellow" && "bg-amber-400 shadow-amber-500/50 shadow-sm",
                              indicator.colorVariant === "orange" && "bg-orange-400 shadow-orange-500/50 shadow-sm"
                            )} />
                            <span className="font-bold uppercase tracking-wider font-cinzel text-[11px] sm:text-xs">
                              {indicator.statusText}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            {indicator.packages.map((pkgName, pIdx) => (
                              <span
                                key={pIdx}
                                className={cn(
                                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border shadow-2xs",
                                  indicator.colorVariant === "green" && "bg-emerald-500/20 border-emerald-500/50 text-emerald-200",
                                  indicator.colorVariant === "yellow" && "bg-amber-400/20 border-amber-400/50 text-amber-200",
                                  indicator.colorVariant === "orange" && "bg-orange-500/20 border-orange-500/50 text-orange-200"
                                )}
                              >
                                ✓ {pkgName}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Emotional Spiritual Moment Banner */}
                  <motion.div variants={textSlideItemVariants} className="rounded-2xl bg-gradient-to-r from-gold-primary/15 via-gold-primary/5 to-transparent border-l-4 border-gold-primary p-4 sm:p-5 space-y-1.5 shadow-md">
                    <div className="flex items-center gap-2 text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel">
                      <Sparkle className="h-3.5 w-3.5 fill-gold-primary shrink-0" />
                      <span>Spiritual Reflection</span>
                    </div>
                    <p className="text-sm sm:text-base font-cinzel font-medium text-text-primary italic leading-relaxed">
                      &ldquo;{activeStep.emotionalQuote}&rdquo;
                    </p>
                  </motion.div>

                  {/* 8 Bullet Points Grid */}
                  <motion.div variants={textSlideItemVariants} className="space-y-3.5 pt-2 border-t border-border-gold/20">
                    <span className="text-xs font-bold text-gold-primary uppercase tracking-wider block font-cinzel">
                      {activeStep.includesTitle}:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                      {activeStep.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary leading-snug group">
                          <CheckCircle2 className="h-4 w-4 text-gold-primary shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110" />
                          <span className="text-text-primary font-medium">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </div>

              {/* YOUR JOURNEY SNAPSHOT GRID CARD */}
              <motion.div variants={textSlideItemVariants} className="pt-6 border-t border-gold-primary/30">
                <div className="rounded-2xl bg-surface/95 border border-gold-primary/40 p-6 space-y-5 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between flex-wrap gap-3 border-b border-gold-primary/20 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-gold-primary/15 border border-gold-primary/30 text-gold-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gold-primary uppercase tracking-widest font-cinzel">
                          YOUR JOURNEY SNAPSHOT
                        </h4>
                        <p className="text-xs text-text-muted">Quick specifications for Step {activeStep.stepNumber}</p>
                      </div>
                    </div>

                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-gold-primary text-black shadow-gold-glow font-cinzel">
                      Step {activeStep.stepNumber} of 07
                    </span>
                  </div>

                  {/* 6 SNAPSHOT PARAMETER TILES */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* 1. Duration */}
                    <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                      <div className="flex items-center gap-1.5 text-gold-primary text-[11px] font-bold uppercase tracking-wider font-cinzel">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Duration</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-text-primary">{activeStep.snapshot.duration}</p>
                    </div>

                    {/* 2. Location */}
                    <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                      <div className="flex items-center gap-1.5 text-gold-primary text-[11px] font-bold uppercase tracking-wider font-cinzel">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Location</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-text-primary">{activeStep.snapshot.location}</p>
                    </div>

                    {/* 3. Included In */}
                    <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                      <div className="flex items-center gap-1.5 text-gold-primary text-[11px] font-bold uppercase tracking-wider font-cinzel">
                        <Gift className="h-3.5 w-3.5" />
                        <span>Included In</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {activeStep.snapshot.includedIn.map((tier, tIdx) => (
                          <span key={tIdx} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gold-primary/15 text-gold-primary border border-gold-primary/30">
                            {tier}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 4. Need To Carry */}
                    <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                      <div className="flex items-center gap-1.5 text-gold-primary text-[11px] font-bold uppercase tracking-wider font-cinzel">
                        <Luggage className="h-3.5 w-3.5" />
                        <span>Need To Carry</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-text-primary">{activeStep.snapshot.needToCarry}</p>
                    </div>

                    {/* 5. Meals */}
                    <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                      <div className="flex items-center gap-1.5 text-gold-primary text-[11px] font-bold uppercase tracking-wider font-cinzel">
                        <Utensils className="h-3.5 w-3.5" />
                        <span>Meals</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-text-primary">{activeStep.snapshot.meals}</p>
                    </div>

                    {/* 6. Vehicle */}
                    <div className="p-3.5 rounded-xl bg-background/80 border border-border space-y-1">
                      <div className="flex items-center gap-1.5 text-gold-primary text-[11px] font-bold uppercase tracking-wider font-cinzel">
                        <Car className="h-3.5 w-3.5" />
                        <span>Vehicle</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-text-primary">{activeStep.snapshot.vehicle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}
