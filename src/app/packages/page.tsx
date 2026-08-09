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
import SecondaryButton from "@/components/buttons/SecondaryButton";
import MagneticButton from "@/components/buttons/MagneticButton";
import ContactForm from "@/components/forms/ContactForm";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import GoldenParticles from "@/components/animations/GoldenParticles";
import BookingWizardModal from "@/components/booking/BookingWizardModal";
import FloatingHelpAdvisor from "@/components/common/FloatingHelpAdvisor";
import { cn } from "@/lib/utils";

// --- DATA DEFINITIONS ---

interface ComparisonRow {
  feature: string;
  ritualOnly: string | boolean;
  heritage: string | boolean;
  moksha: string | boolean;
  royal: string | boolean;
}

const comparisonData: ComparisonRow[] = [
  { feature: "Gayawal Pandit", ritualOnly: "✅ Standard", heritage: "✅ Senior", moksha: "✅ Senior Priest", royal: "Vedic Scholar / Senior" },
  { feature: "Ritual Kit & Pind Items", ritualOnly: "✅ Standard", heritage: "Premium", moksha: "Premium", royal: "Luxury Custom" },
  { feature: "Vishnupad Temple Rites", ritualOnly: "✅ Included", heritage: "✅ Included", moksha: "VIP Sanctum Access", royal: "VIP Private Space" },
  { feature: "Phalgu River Tarpan", ritualOnly: "Optional", heritage: "✅ Included", moksha: "✅ Included", royal: "✅ Included" },
  { feature: "Akshay Vat Oblation", ritualOnly: "Optional", heritage: "✅ Included", moksha: "✅ Included", royal: "✅ Included" },
  { feature: "Hotel Stay", ritualOnly: false, heritage: "3-Star AC Hotel", moksha: "4-Star Heritage Resort", royal: "Luxury 5-Star Suite" },
  { feature: "Private Transport", ritualOnly: false, heritage: "Private AC Sedan", moksha: "Innova Crysta MPV", royal: "Premium SUV / Fortuner" },
  { feature: "Airport / Station Pickup", ritualOnly: false, heritage: "✅ Included", moksha: "✅ Included", royal: "VIP Meet & Greet" },
  { feature: "Sattvik Meals", ritualOnly: false, heritage: "Breakfast", moksha: "All Meals (B/L/D)", royal: "Gourmet Sattvik Feast" },
  { feature: "Photography & Video", ritualOnly: false, heritage: false, moksha: "Photos & HD Video", royal: "Cinematic Film" },
  { feature: "Dedicated Coordinator", ritualOnly: false, heritage: "✅ Included", moksha: "Dedicated Escort", royal: "Personal Butler Concierge" },
];

const whatsIncludedInEvery: { icon: React.ReactNode; title: string; desc: string }[] = [
  { icon: <ShieldCheck className="h-5 w-5 text-gold-primary" />, title: "Verified Gayawal Pandit", desc: "Strictly hereditary priests holding centuries-old ritual rights." },
  { icon: <CheckCircle2 className="h-5 w-5 text-gold-primary" />, title: "Dakshina Included", desc: "Transparent, upfront priest offerings with zero hidden charges." },
  { icon: <Sparkles className="h-5 w-5 text-gold-primary" />, title: "Ritual Materials Included", desc: "Fresh flowers, sesame seeds, rice, brassware, and ritual clothes." },
  { icon: <Compass className="h-5 w-5 text-gold-primary" />, title: "Temple Guidance", desc: "Complete step-by-step guidance through crowded shrines." },
  { icon: <Users className="h-5 w-5 text-gold-primary" />, title: "Dedicated Coordinator", desc: "Personal assistant managing your schedule and logistics." },
  { icon: <Award className="h-5 w-5 text-gold-primary" />, title: "Completion Certificate", desc: "Official family lineage certificate signed by Gayawal Purohits." },
  { icon: <Phone className="h-5 w-5 text-gold-primary" />, title: "WhatsApp Updates", desc: "Live updates and photo sharing for family back home." },
  { icon: <Clock className="h-5 w-5 text-gold-primary" />, title: "24/7 Family Assistance", desc: "Round-the-clock emergency and concierge support." },
];

const optionalAddons = [
  { title: "Extra Hotel Night", price: "₹3,500", unit: "per night", desc: "Additional AC room stay with breakfast for extended rest." },
  { title: "Innova Crysta Upgrade", price: "₹2,500", unit: "per day", desc: "Upgrade sedan transfer to a spacious Innova Crysta MPV." },
  { title: "Tempo Traveller (12 Seater)", price: "₹6,000", unit: "per day", desc: "Ideal for large joint family groups travelling together." },
  { title: "Professional Photography", price: "₹8,000", unit: "full event", desc: "High-resolution photo coverage of all sacred ritual steps." },
  { title: "Cinematic Ritual Film", price: "₹15,000", unit: "full video", desc: "4K documentary video reel capturing family oblations." },
  { title: "Drone Aerial Coverage", price: "₹10,000", unit: "where permitted", desc: "Sweeping aerial cinematic shots of Falgu River ghats." },
  { title: "Additional Brahmin Bhojan", price: "₹2,100", unit: "per 5 brahmins", desc: "Feed additional Brahmins at Vishnupad to amplify merit." },
  { title: "Gaya–Bodh Gaya Sightseeing Tour", price: "₹5,000", unit: "full day", desc: "Guided tour of Mahabodhi Temple, Bodhi Tree & Monasteries." },
  { title: "Rajgir & Nalanda Day Trip", price: "₹8,000", unit: "excursion", desc: "Day excursion to ancient Vishwa Shanti Stupa & Nalanda ruins." },
  { title: "Airport VIP Meet & Greet", price: "₹3,000", unit: "per group", desc: "Tarmac escort, luggage assistance & priority exit." },
];

const packageFaqs = [
  {
    q: "What is the difference between Sacred Ritual Services and Pilgrimage Packages?",
    a: "Sacred Ritual Services (starting ₹5,100) are designed for local pilgrims or families who have already booked their own hotel and transport. It provides only the core Vedic rites, Gayawal Pandit, and ritual materials. Pilgrimage Packages (starting ₹24,999) are all-inclusive end-to-end journeys bundled with hotel stay, private AC vehicle transfers, meals, and dedicated coordinators.",
  },
  {
    q: "Can we customize a package for larger family groups?",
    a: "Yes, absolutely! All our packages can be expanded for joint families of 6 to 30+ members. We arrange multi-room hotel suites, Tempo Travellers or luxury buses, and additional Gayawal Pandits to ensure everyone participates seamlessly.",
  },
  {
    q: "Are Pandit Dakshina and Temple Entry Fees included in the price?",
    a: "Yes. Pitraya operates with 100% pricing transparency. All standard Gayawal Pandit Dakshina, ritual item costs, Pind materials, and temple access fees are fully included. You will never be asked for unexpected extra payments at the ghats.",
  },
  {
    q: "How do we reserve our preferred package?",
    a: "You can click 'Book Package' on your chosen tier below, submit your expected travel dates and lineage details, or speak directly with our Sanctuary Concierge over phone/WhatsApp. A 20% deposit secures your hotel, car, and assigned Gayawal Pandit.",
  },
];

interface PackageData {
  id: string;
  tier: string;
  title: string;
  subtitle: string;
  story: string;
  price: string;
  tag: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
  
  // Tab 1: Timeline & Story
  perfectFor: string[];
  duration: string;
  recommendedArrival: string;
  dayTimeline: {
    day: string;
    steps: string[];
  }[];
  
  // Tab 2: Stay & Transport
  stayTitle?: string;
  stayFeatures?: string[];
  stayImage?: string;
  vehicleTitle?: string;
  vehicleFeatures?: string[];
  vehicleImage?: string;
  
  // Tab 3: Sacred Rituals Covered
  ritualsCovered: string[];
  ritualsImage: string;
  
  // Tab 4: Pricing & Inclusions
  inclusions: string[];
  exclusions: string[];
  suitableFor: string;
  extraMemberFee?: string;
}

const detailedPackages: PackageData[] = [
  {
    id: "ritual-only",
    tier: "Sacred Experience",
    title: "Sacred Ritual Service",
    subtitle: "Authentic Vedic rites for local or self-arranged pilgrims",
    story: "Imagine standing on the sacred Falgu River ghats at dawn, holding the traditional Pinda in your hands. Under the guidance of your personal Gayawal Pandit, your family lineage is verified in centuries-old registers. As the ancient mantras echo across the water, you feel a deep, long-awaited peace wash over your family.",
    price: "₹5,100",
    tag: "Ritual-Only Option",
    image: "/images/package_heritage_real.png",
    perfectFor: [
      "Local Gaya / Bihar families seeking direct purohit connection",
      "Families staying in self-booked hotels or with relatives",
      "Same-day pilgrims who do not need accommodation or vehicle fleet"
    ],
    duration: "3–4 Hours (Single Session Rites)",
    recommendedArrival: "Morning Train or Flight (same-day departure)",
    dayTimeline: [
      {
        day: "Your Sacred Duty Fulfilled",
        steps: [
          "Ghat Meeting with Hereditary Priest",
          "Ancestral Lineage Panji Verification",
          "Sacred Sankalpa Ceremony",
          "Pind Daan recitation at Vishnupad Temple",
          "Holy Tarpan at Falgu River Ghats",
          "Akshay Vat Banyan Tree Oblation",
          "Traditional Brahmin Bhojan (1 Brahmin)",
          "Ancestral Rites Certificate Presentation",
          "Departure with Ancestral Blessings"
        ]
      }
    ],
    stayTitle: "No Accommodation Included",
    stayFeatures: [
      "Stay is not included in this ritual-only tier",
      "Perfect if you already have local accommodation booked",
      "Can be easily upgraded to include hotel stay on request"
    ],
    stayImage: "/images/scripture_cards.png",
    vehicleTitle: "No Transportation Included",
    vehicleFeatures: [
      "Pickups, drops, and transfers are self-arranged",
      "Local coordination provided for meeting points",
      "Sedan or SUV local transfer upgrades can be requested"
    ],
    vehicleImage: "/images/scripture_cards.png",
    ritualsCovered: [
      "Sankalp Ceremony",
      "Lineage Panji Verification",
      "Vishnupad Pind Daan",
      "Phalgu River Tarpan",
      "Akshay Vat Ritual",
      "Brahmin Bhojan (1 Brahmin)",
      "Blessing Ceremony",
      "Completion Certificate"
    ],
    ritualsImage: "/images/gaya_vishnupad_temple.png",
    inclusions: [
      "Hereditary Gayawal Pandit Ji guidance",
      "Complete standard ritual kit and Pinda materials",
      "Transparent priest Dakshina (Zero extra priest demands)",
      "Panji ancestral register verification",
      "Lineage certificate signed by purohits"
    ],
    exclusions: [
      "Hotel stay & lodging",
      "Airport & station vehicle pickups/drops",
      "Meals & food services",
      "Personal shopping & local sightseeing",
      "Additional Brahmin Bhojan donations"
    ],
    suitableFor: "👨‍👩‍👧 Up to 4 family members",
    extraMemberFee: "₹1,100 / person",
  },
  {
    id: "heritage-pilgrimage",
    tier: "Heritage Experience",
    title: "Heritage Pilgrimage",
    subtitle: "Comfortable all-inclusive 2-day pilgrimage",
    story: "Imagine stepping off your morning train in Gaya to a warm greeting, your private chauffeur ready to take you to a clean, comfortable hotel. Before sunrise the next day, you stand at the ghats. Mantras rise into the morning mist, the ancestral registers are opened, and your lineage is verified. Every ritual is conducted with gentle guidance, concluding with a traditional Brahmin Bhojan.",
    price: "₹24,999",
    tag: "Comfort Pilgrimage",
    image: "/images/package_heritage_real.png",
    perfectFor: [
      "Small families (2–4 members)",
      "First-time visitors to Gaya seeking guided comfort",
      "Travelers seeking clean amenities without luxury premium pricing"
    ],
    duration: "2 Days / 1 Night",
    recommendedArrival: "Morning Train or Morning Flight (Day 1)",
    dayTimeline: [
      {
        day: "Day 1: Your Sacred Journey Begins",
        steps: [
          "Airport Welcome & Garland",
          "Traditional Welcome Tilak",
          "Private Chauffeur AC Sedan Ride",
          "Comfort Hotel Check-in & Rest",
          "Private Lineage Panji Verification Session",
          "Evening Vishnupad Temple Darshan",
          "Traditional Satvik Dinner"
        ]
      },
      {
        day: "Day 2: Honoring the Forefathers",
        steps: [
          "Dawn Purification & River Sankalpa",
          "Sacred Pind Daan at Vishnupad Temple",
          "Holy Tarpan ghat rites at Falgu River",
          "Final Akshay Vat Banyan Tree Oblation",
          "Feeding of 2 Brahmins (Brahmin Bhojan)",
          "Private Chauffeur Departure Transfer"
        ]
      }
    ],
    stayTitle: "Premium 3-Star Heritage Hotel",
    stayFeatures: [
      "Fully Air Conditioned Rooms",
      "Attached Bathroom with hot water facilities",
      "Complimentary breakfast included",
      "Located near Vishnupad Temple (10 min drive)",
      "Family rooms available for joint bookings",
      "Elevator/Lift available & Free High-Speed WiFi"
    ],
    stayImage: "/images/journey_hotel.png",
    vehicleTitle: "Private AC Sedan (Dzire, Aura, Etios)",
    vehicleFeatures: [
      "AC Sedan dedicated to your family group",
      "Airport & Railway Station pickup and drop off",
      "All temple transfers & local market travels",
      "Parking fees, driver allowance, tolls, and fuel included",
      "Strictly 100% transparency with zero hidden transport costs"
    ],
    vehicleImage: "/images/transport_luxury_sedan.png",
    ritualsCovered: [
      "Sankalp",
      "Panji Verification",
      "Vishnupad Pind Daan",
      "Phalgu River Tarpan",
      "Akshay Vat Ritual",
      "Brahmin Bhojan (2 Brahmins)",
      "Blessing Ceremony",
      "Completion Certificate"
    ],
    ritualsImage: "/images/gaya_vishnupad_temple.png",
    inclusions: [
      "Heritage AC Hotel Stay (1 Night)",
      "Private AC Sedan Transport",
      "Authentic Gayawal Pandit Ji",
      "Fresh ritual materials & complete kit",
      "All-inclusive priest Dakshina",
      "2 Meals (Breakfast + Dinner)",
      "Dedicated local coordination assistant"
    ],
    exclusions: [
      "Flight / Train tickets to Gaya",
      "Personal shopping and laundry services",
      "Local sightseeing beyond the temple route",
      "Personal donations to temples beyond included Dakshina"
    ],
    suitableFor: "👨‍👩‍👧 2 Adults (Up to 4 members)",
    extraMemberFee: "₹3,500 / person",
  },
  {
    id: "moksha-journey",
    tier: "Moksha Experience",
    title: "Complete Moksha Journey",
    subtitle: "Comprehensive 3-day ancestral salvation",
    story: "Imagine arriving in Gaya to a warm welcome, with a private Innova chauffeur escorting your family to a peaceful resort. The next morning, as the sun begins to rise, you begin the ultimate 3-vedi Shraddha. As the sacred mantras echo from the Falgu River to the halls of Vishnupad Temple and the roots of the ancient Akshay Vat, your ancestors' souls are released. You return home carrying a leather-bound genealogy record—a legacy preserved forever.",
    price: "₹49,999",
    tag: "Full 3-Vedi Package",
    image: "/images/package_moksha_real.png",
    badge: "Most Popular Choice",
    isPopular: true,
    perfectFor: [
      "Medium-to-large families (up to 6 members)",
      "Seekers of complete 3-Vedi Pind Daan (Vishnupad, Phalgu, Akshay Vat)",
      "Families preferring spacious MPV transport and 4-star resort amenities"
    ],
    duration: "3 Days / 2 Nights",
    recommendedArrival: "Morning/Afternoon Train or Flight (Day 1)",
    dayTimeline: [
      {
        day: "Day 1: Step into the Spiritual Realm",
        steps: [
          "VIP Station/Airport Welcome",
          "Traditional Welcome Garland & Tilak",
          "AC Innova Transfer to Resort",
          "Peaceful Resort Check-in & Rest",
          "Private Genealogy Panji Verification Session",
          "Evening Bodh Gaya Spiritual Walk (Mahabodhi Temple)",
          "Gourmet Sattvik Buffet Dinner"
        ]
      },
      {
        day: "Day 2: The Ultimate Ancestral Liberation",
        steps: [
          "Dawn Purification at Falgu River",
          "Sacred Sankalpa & Tarpan Ghat Rites",
          "Main Pind Daan Puja inside Vishnupad Temple",
          "Final Akshay Vat Banyan Tree Oblations",
          "Feeding of 5 Brahmins (Brahmin Bhojan)",
          "HD Photoshoot & Video Coverage of Offerings",
          "Evening Meditation & Buffet Dinner at Resort"
        ]
      },
      {
        day: "Day 3: Releasing the Ancestors' Souls",
        steps: [
          "Early Morning Pretshila Hill Pilgrimage (Pitru Dosha Relief)",
          "Final Moksha Blessing Ceremony by Senior Priests",
          "Presentation of Custom Embossed Genealogy Box & Lineage Certificate",
          "Private Chauffeur Departure Transfer"
        ]
      }
    ],
    stayTitle: "4-Star Heritage Resort (e.g., Bodhgaya Regency)",
    stayFeatures: [
      "Premium Executive AC Rooms",
      "All buffet meals included (Pure Sattvik preparation)",
      "Attached luxury bathroom with bath amenities",
      "Swimming pool, spa, and landscaped garden views",
      "Located in peaceful environment near temples",
      "Free high-speed WiFi, lift access & in-room service"
    ],
    stayImage: "/images/hotel_bodhgaya_regency.png",
    vehicleTitle: "Private AC Toyota Innova Crysta MPV",
    vehicleFeatures: [
      "Premium Toyota Innova Crysta AC MPV",
      "VIP greeting & baggage handling at airport/station",
      "Dedicated chauffeur for all temple & Bodh Gaya rides",
      "Parking, driver allowance, tolls, and fuel included",
      "Extremely spacious and ideal for elderly travelers"
    ],
    vehicleImage: "/images/transport_family_mpv.png",
    ritualsCovered: [
      "Sankalp & Panji Verification",
      "Vishnupad Temple Pind Daan",
      "Phalgu River Tarpan",
      "Akshay Vat Ritual",
      "Pretshila Hill Rites",
      "Brahmin Bhojan (5 Brahmins)",
      "Blessing Ceremony",
      "Completion Certificate & Genealogy Gift Box"
    ],
    ritualsImage: "/images/akshay_vat_banyan.png",
    inclusions: [
      "4-Star Resort Stay (2 Nights)",
      "Toyota Innova Crysta Transport",
      "Senior Gayawal Pandit Ji guidance",
      "Premium ritual materials and kit items",
      "All priest Dakshina & charges included",
      "Full board meals (Breakfast, Lunch, Dinner)",
      "Professional photo & high-definition video coverage",
      "Dedicated tour manager coordinator"
    ],
    exclusions: [
      "Flight / Train tickets",
      "Personal laundry and shopping purchases",
      "Sightseeing beyond Gaya and Bodh Gaya",
      "Extra room service items or non-sattvik demands"
    ],
    suitableFor: "👨‍👩‍👧‍👦 4 Adults (Up to 6 members)",
    extraMemberFee: "₹4,500 / person",
  },
  {
    id: "royal-concierge",
    tier: "Royal Experience",
    title: "Royal Heritage Concierge",
    subtitle: "Fully managed private luxury retreat with VIP access",
    story: "Imagine step-by-step VIP care starting at the airport tarmac, where your family is greeted with traditional garlands and led to a luxury SUV. In your executive palace suite, a personal butler attends to every need. Under the guidance of Gaya's most senior Vedic scholars, you perform the sacred rites in private, reserved temple mandaps. From the grand Havan to the feeding of 11 Brahmins, this is a royal homage to your family's legacy.",
    price: "₹89,999",
    tag: "Luxury Retreat Experience",
    image: "/images/package_royal_real.png",
    perfectFor: [
      "Multi-generational families seeking absolute luxury and ease",
      "Elderly travelers requiring wheelchair support and customized slow pace",
      "Families seeking senior Vedic scholars and private temple setups"
    ],
    duration: "3 Days / 2 Nights",
    recommendedArrival: "Morning Flight or Train",
    dayTimeline: [
      {
        day: "Day 1: A Royal Welcome to Holy Gaya",
        steps: [
          "VIP Airport Tarmac Greeting",
          "Welcome Garland, Tilak & Refreshments",
          "Luxury SUV Private Chauffeur Transfer",
          "In-Suite VIP Palace Check-in",
          "Personal Butler Welcome & High Tea",
          "Personal Lineage Panji History Session",
          "Exclusive Private Evening Ghat Aarti Ceremony",
          "Gourmet Organic Sattvik Banquet"
        ]
      },
      {
        day: "Day 2: The Sacred Legacy Rites",
        steps: [
          "Dawn Holy Bath & Purification",
          "Private Ghat Sankalpa & Tarpan Ceremony",
          "Exclusive VIP Mandap Vishnupad Temple Pind Daan",
          "Grand Havan & Ancestral Peace Pujas",
          "Feeding of 11 Brahmins (Brahmin Bhojan)",
          "Cinematic Video & Drone Footage Capture",
          "Ayurvedic Spa & Relaxation Session"
        ]
      },
      {
        day: "Day 3: Vedic Blessing & Departure",
        steps: [
          "VIP Exclusive Darshan at Mahabodhi Temple",
          "Hand-Bound Genealogy Leather Book Presentation",
          "VIP Airport Lounge Escort & Departure Transfer"
        ]
      }
    ],
    stayTitle: "5-Star Luxury Palace Suite (e.g., Royal Residency)",
    stayFeatures: [
      "Opulent palace-style executive suites",
      "24x7 Personal butler service in-suite",
      "Gourmet pure Sattvik organic dining custom menus",
      "Complimentary Ayurvedic Spa & massage sessions",
      "Exclusive access to private hotel lounges",
      "In-room high check-in, high-speed private WiFi"
    ],
    stayImage: "/images/hotel_luxury_suite.png",
    vehicleTitle: "Premium Luxury AC SUV (Fortuner / Carnival)",
    vehicleFeatures: [
      "Toyota Fortuner or Kia Carnival Luxury AC SUV",
      "Tarmac VIP meet, greet & priority security exit",
      "Luxury private chauffeur on-call 24x7 for all rides",
      "Parking, chauffeur allowance, tolls, and fuel fully covered",
      "Cold refreshments, sanitizers, and luxury amenities on board"
    ],
    vehicleImage: "/images/transport_luxury_suv.png",
    ritualsCovered: [
      "Ancient Genealogy Panji Search",
      "VIP Private Temple Space Rites",
      "Special Sankalpa & Tarpan Ceremony",
      "Senior Vedic Scholar & Priest Guidance",
      "Grand Havan & Pitru Shanti Pujas",
      "Grand Brahmin Bhojan (11 Brahmins)",
      "4K Cinematic Video & Drone Coverage",
      "Genealogy Leather Book & Exclusive Family Gift Box"
    ],
    ritualsImage: "/images/sacred_fire_havan.png",
    inclusions: [
      "5-Star Suite Stay (2 Nights)",
      "Luxury SUV Chauffeur Transport",
      "Senior Vedic Scholars & Gayawal Priests",
      "Premium Havan & complete ritual materials",
      "Priest Dakshina & all offerings",
      "All organic gourmet Sattvik meals",
      "24x7 Butler & Dedicated Tour Escort",
      "Cinematic Film, Photo coverage & Drone footage",
      "Genealogy Book & Gift Box"
    ],
    exclusions: [
      "Flight / Train tickets to Gaya",
      "Personal laundry and shopping purchases",
      "Bespoke requests beyond standard VIP itinerary"
    ],
    suitableFor: "👨‍👩‍👧‍👦 Up to 6 members",
    extraMemberFee: "₹6,500 / person",
  },
  {
    id: "eternal-legacy",
    tier: "Legacy Experience",
    title: "Eternal Legacy Concierge",
    subtitle: "Invitation only bespoke ancestral legacy compilation",
    story: "An invitation-only multi-day legacy compilation. Imagine a comprehensive search across historical Panji archives to reconstruct and document your family's history over centuries. Your large family gathers at a fully reserved resort wing, performing private multi-day rituals documented by cinematic filmmakers, preserving your spiritual lineage for the next ten generations.",
    price: "Invitation Only",
    tag: "Invitation Only",
    image: "/images/hero_incense_sanctuary.png",
    perfectFor: [
      "NRI and Global families seeking extensive lineage search",
      "Large joint family reunions returning to ancestral roots",
      "Families seeking complete Vedic legacy preservation"
    ],
    duration: "4–5 Days / Custom Duration",
    recommendedArrival: "Bespoke Custom Plan",
    dayTimeline: [
      {
        day: "Custom Legacy Session",
        steps: [
          "Bespoke private wing reservation at luxury heritage resort",
          "Lineage tracing & document verification compiled over multiple days",
          "Private drone documented multi-vedi Shraddha ceremony",
          "Private study sessions & discussions with senior Vedic scholars"
        ]
      }
    ],
    stayTitle: "Bespoke Palace Wing Reservation",
    stayFeatures: [
      "Bespoke reservation of palace wings or high-end villas",
      "Custom guest menus & pure Sattvik banquets",
      "Dedicated event spaces for family gatherings",
      "24/7 personal security and premium support"
    ],
    stayImage: "/images/hotel_royal_heritage.png",
    vehicleTitle: "BMW / Mercedes Private Fleet",
    vehicleFeatures: [
      "BMW 7-Series / Mercedes S-Class executive fleet",
      "Bespoke coordination for large group transports",
      "Full airport escort & custom luggage handling"
    ],
    vehicleImage: "/images/transport_luxury_suv.png",
    ritualsCovered: [
      "Bespoke Multi-day Lineage Compilation",
      "Grand Vedic Havan & ancestral Pujas",
      "Full 3-Vedi Shraddha with live streaming support",
      "Genealogy research compiled in a custom wooden box"
    ],
    ritualsImage: "/images/sacred_fire_havan.png",
    inclusions: [
      "Entirely custom-curated luxury stays",
      "Luxury premium vehicle fleets",
      "Senior Vedic scholars",
      "Cinematic documentary production",
      "Bespoke lineage books"
    ],
    exclusions: [
      "All custom exclusions detailed during pre-booking consultation"
    ],
    suitableFor: "👨‍👩‍👧‍👦 Custom Group Sizing",
    extraMemberFee: "Bespoke Pricing",
  }
];

function PackageCard({ pkg, onSelect }: { pkg: PackageData; onSelect: () => void }) {
  const [activeTab, setActiveTab] = useState<"timeline" | "stay" | "rituals" | "why-pitraya" | "inclusions">("timeline");

  return (
    <GlassCard
      glow={pkg.isPopular}
      borderGold={pkg.isPopular}
      padding="none"
      className={cn(
        "transition-all duration-300 relative overflow-hidden rounded-3xl",
        pkg.isPopular 
          ? "bg-gradient-to-b from-gold-primary/10 via-surface/75 to-surface border-2 border-gold-primary/60 shadow-gold-glow"
          : "bg-surface/30 border border-border-gold/20"
      )}
    >
      {pkg.isPopular && (
        <div className="absolute top-0 right-0 bg-gold-gradient text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-lg z-20">
          ★ {pkg.badge}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        
        {/* LEFT COLUMN: Summary & Suitability */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-r border-border-gold/15 bg-black/40">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest block font-cinzel">
                {pkg.tier}
              </span>
              <Heading size="md" font="cinzel" className="text-white">
                {pkg.title}
              </Heading>
              <p className="text-xs text-text-muted italic font-serif leading-relaxed animate-pulse">
                {pkg.subtitle}
              </p>
            </div>

            {/* Storytelling Narrative callout */}
            <div className="p-4 rounded-xl bg-gold-primary/[0.03] border-l-2 border-gold-primary text-[11px] text-text-secondary leading-relaxed font-serif italic shadow-inner">
              &quot;{pkg.story}&quot;
            </div>

            <div className="text-3xl font-black font-cinzel text-gold-primary flex items-baseline gap-1.5">
              <span>{pkg.price}</span>
              {pkg.price !== "Invitation Only" && <span className="text-[10px] text-text-muted uppercase tracking-wider font-sans font-normal">All-inclusive</span>}
            </div>

            {/* Suitability Badge */}
            <div className="space-y-2 pt-4 border-t border-border-gold/15 text-xs text-text-secondary">
              <div className="flex items-center gap-2 text-white font-medium">
                <span className="text-gold-primary">Suitable For:</span>
                <span>{pkg.suitableFor}</span>
              </div>
              {pkg.extraMemberFee && (
                <div className="flex items-center gap-2">
                  <span className="text-gold-primary/80">Extra Member:</span>
                  <span>{pkg.extraMemberFee}</span>
                </div>
              )}
            </div>

            {/* Perfect For */}
            <div className="space-y-2.5 pt-4 border-t border-border-gold/15">
              <strong className="text-[10px] font-bold text-gold-primary uppercase tracking-wider block">
                Perfect For:
              </strong>
              <ul className="space-y-2 text-xs text-text-secondary">
                {pkg.perfectFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-gold-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 space-y-2">
            <button
              onClick={onSelect}
              className="w-full py-3.5 px-6 rounded-full bg-gold-gradient text-black font-extrabold font-cinzel text-xs uppercase tracking-widest hover:shadow-gold-glow transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>BOOK THIS EXPERIENCE</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="flex items-center justify-between text-[10px] text-text-muted px-1 font-serif italic">
              <span>From {pkg.price}</span>
              <span>Estimated time : 2 minutes</span>
              <span>No payment required</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Tabs & Detailed Content */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-surface/10">
          
          {/* Tabs Bar */}
          <div className="flex flex-wrap border-b border-border-gold/15 gap-1 pb-3">
            {[
              { id: "timeline", label: "Timeline", icon: <Clock className="h-3.5 w-3.5" /> },
              { id: "stay", label: "Stay & Vehicle", icon: <Hotel className="h-3.5 w-3.5" /> },
              { id: "rituals", label: "Sacred Rituals", icon: <Flame className="h-3.5 w-3.5" /> },
              { id: "why-pitraya", label: "Why Pitraya?", icon: <Sparkles className="h-3.5 w-3.5" /> },
              { id: "inclusions", label: "Value & Trust", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                   onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider border cursor-pointer focus:outline-none",
                    isActive
                      ? "bg-gold-primary/10 text-gold-primary border-gold-primary/40 shadow-sm"
                      : "text-text-secondary border-transparent hover:text-white"
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <div className="py-6 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeTab === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Duration & Recommended Arrival */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/30 p-4 rounded-2xl border border-border-gold/10 text-xs">
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider block">Duration</span>
                      <strong className="text-gold-primary text-sm font-cinzel">{pkg.duration}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider block">Recommended Arrival</span>
                      <strong className="text-gold-primary text-sm font-cinzel">{pkg.recommendedArrival}</strong>
                    </div>
                  </div>

                  {/* Vertical Journey Steps */}
                  <div className="space-y-4 pt-2">
                    <span className="text-[10px] font-bold text-gold-primary uppercase tracking-wider block">Your Journey Flow:</span>
                    <div className="space-y-3 pl-3 border-l border-gold-primary/30">
                      {pkg.dayTimeline.map((dayItem, dIdx) => (
                        <div key={dIdx} className="space-y-2">
                          <strong className="text-xs font-bold text-white font-cinzel tracking-wide block uppercase">
                            {dayItem.day}
                          </strong>
                          <div className="flex flex-col gap-1.5 text-xs text-text-secondary">
                            {dayItem.steps.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-2">
                                <span className="text-gold-primary/80 shrink-0">↓</span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "stay" && (
                <motion.div
                  key="stay"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {/* Accommodation Card */}
                    <div className="rounded-2xl border border-border-gold/10 bg-black/30 overflow-hidden flex flex-col">
                      {pkg.stayImage && (
                        <div className="relative h-28 w-full shrink-0">
                          <Image src={pkg.stayImage} alt={pkg.stayTitle || ""} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        </div>
                      )}
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <strong className="text-xs font-bold text-white font-cinzel block uppercase tracking-wide">
                            🏨 Stay Includes
                          </strong>
                          <span className="text-[10px] text-gold-primary/80 block font-medium mt-0.5">{pkg.stayTitle}</span>
                          <ul className="space-y-1 mt-2 text-[11px] text-text-secondary font-sans">
                            {pkg.stayFeatures?.map((f, idx) => (
                              <li key={idx}>• {f}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Transport Card */}
                    <div className="rounded-2xl border border-border-gold/10 bg-black/30 overflow-hidden flex flex-col">
                      {pkg.vehicleImage && (
                        <div className="relative h-28 w-full shrink-0">
                          <Image src={pkg.vehicleImage} alt={pkg.vehicleTitle || ""} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        </div>
                      )}
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <strong className="text-xs font-bold text-white font-cinzel block uppercase tracking-wide">
                            🚘 Vehicle Transfers
                          </strong>
                          <span className="text-[10px] text-gold-primary/80 block font-medium mt-0.5">{pkg.vehicleTitle}</span>
                          <ul className="space-y-1 mt-2 text-[11px] text-text-secondary font-sans">
                            {pkg.vehicleFeatures?.map((f, idx) => (
                              <li key={idx}>• {f}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "rituals" && (
                <motion.div
                  key="rituals"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  <div className="md:col-span-5 relative h-36 md:h-52 w-full rounded-2xl overflow-hidden border border-border-gold/15">
                    <Image src={pkg.ritualsImage} alt="Sacred Rituals" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <strong className="text-xs font-bold text-white font-cinzel block uppercase tracking-wide">
                      Sacred Rituals Covered
                    </strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary font-sans">
                      {pkg.ritualsCovered.map((rit, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                          <span>{rit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "why-pitraya" && (
                <motion.div
                  key="why-pitraya"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <strong className="text-xs font-bold text-white font-cinzel block uppercase tracking-wide">
                    🛡️ The Pitraya Promise — Vedic Rites with Absolute Peace of Mind
                  </strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                    
                    {/* Lineage */}
                    <div className="p-3.5 rounded-xl bg-gold-primary/5 border border-border-gold/10 hover:border-gold-primary/20 transition-colors space-y-1">
                      <div className="flex items-center gap-2 text-gold-primary font-bold">
                        <Award className="h-4 w-4" />
                        <span>250+ Years of Gayawal Lineage</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed pl-6">
                        Guided strictly by authentic, hereditary priests carrying ancestral rights.
                      </p>
                    </div>

                    {/* Genealogy */}
                    <div className="p-3.5 rounded-xl bg-gold-primary/5 border border-border-gold/10 hover:border-gold-primary/20 transition-colors space-y-1">
                      <div className="flex items-center gap-2 text-gold-primary font-bold">
                        <Compass className="h-4 w-4" />
                        <span>Personal Family Genealogy Search</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed pl-6">
                        Verify and trace your ancestral lineage records inside historical Panji registers.
                      </p>
                    </div>

                    {/* Concierge */}
                    <div className="p-3.5 rounded-xl bg-gold-primary/5 border border-border-gold/10 hover:border-gold-primary/20 transition-colors space-y-1">
                      <div className="flex items-center gap-2 text-gold-primary font-bold">
                        <Users className="h-4 w-4" />
                        <span>Dedicated Ritual Concierge</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed pl-6">
                        Complete focus: One dedicated family, one local coordinator, and one verified priest.
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="p-3.5 rounded-xl bg-gold-primary/5 border border-border-gold/10 hover:border-gold-primary/20 transition-colors space-y-1">
                      <div className="flex items-center gap-2 text-gold-primary font-bold">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Transparent Pricing Promise</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed pl-6">
                        No hidden Dakshina. No unexpected cost surprises at ghats or temples.
                      </p>
                    </div>

                    {/* Hospitality */}
                    <div className="p-3.5 rounded-xl bg-gold-primary/5 border border-border-gold/10 hover:border-gold-primary/20 transition-colors space-y-1 sm:col-span-2">
                      <div className="flex items-center gap-2 text-gold-primary font-bold">
                        <Hotel className="h-4 w-4" />
                        <span>Premium Hospitality Verification</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed pl-6">
                        Every hotel room, every AC transfer vehicle, and every Sattvik meal is personally inspected and pre-verified.
                      </p>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeTab === "inclusions" && (
                <motion.div
                  key="inclusions"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* What is Included */}
                  <div className="space-y-3">
                    <strong className="text-xs font-bold text-white font-cinzel block uppercase tracking-wide">
                      ✅ What&apos;s Included
                    </strong>
                    <div className="space-y-1.5 text-xs text-text-secondary font-sans">
                      {pkg.inclusions.map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-gold-primary shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What is NOT Included */}
                  <div className="space-y-3">
                    <strong className="text-xs font-bold text-white font-cinzel block uppercase tracking-wide">
                      ❌ Not Included
                    </strong>
                    <div className="space-y-1.5 text-xs text-text-secondary font-sans">
                      {pkg.exclusions.map((exc, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <X className="h-3 w-3 text-red-500/80 shrink-0 mt-1" />
                          <span>{exc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </GlassCard>
  );
}

export default function PackagesPage() {
  const [activeWizardPkgId, setActiveWizardPkgId] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HomePage>
      {/* 1. HERO SECTION */}
      <Section className="relative py-28 overflow-hidden bg-black text-text-primary border-b border-border-gold/20 pt-36">
        <GoldenParticles particleCount={35} className="opacity-30 pointer-events-none" />
        <SacredChakraBg size="min(750px, 95vw)" opacity={0.05} rotateSpeed={160} position="center" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-black/90 pointer-events-none" />
        <Container size="xl" className="relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl space-y-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-5 py-2 text-xs font-semibold text-gold-primary border border-gold-primary/40 shadow-gold-glow">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>TRANSPARENT VEDIC EXPERIENCES</span>
            </span>

            <Heading size="display" align="center" font="cinzel" className="text-white leading-tight">
              Choose How You Wish to{" "}
              <GradientText variant="gold" size="inherit" font="cinzel">
                Honor Your Ancestors
              </GradientText>
            </Heading>

            <Paragraph size="lg" align="center" variant="muted" className="max-w-2xl mx-auto font-serif italic text-text-secondary/90 leading-relaxed">
              Not every family follows the same journey. Whether you seek a simple sacred ritual, a guided pilgrimage, or a fully managed luxury spiritual retreat, every experience is rooted in authentic Gayawal tradition.
            </Paragraph>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <MagneticButton
                size="xl"
                variant="primary"
                onClick={() => scrollToSection("packages-list")}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                View Packages
              </MagneticButton>
              <SecondaryButton
                size="xl"
                onClick={() => scrollToSection("booking")}
                leftIcon={<Phone className="h-4 w-4 text-gold-primary" />}
              >
                Book Custom Package
              </SecondaryButton>
            </div>
          </motion.div>

          {/* Quick Experience Category Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-5xl mx-auto text-left">
            <GlassCard padding="md" className="border-gold-primary/20 hover:border-gold-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">Sacred Ritual Services</h3>
                  <p className="text-xs text-text-muted mt-1 font-sans">Authentic rites for local & self-arranged pilgrims.</p>
                  <span className="text-xs font-bold text-gold-primary block mt-2">Starts from ₹5,100</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard padding="md" className="border-gold-primary/40 bg-gold-primary/5 hover:border-gold-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-primary/20 text-gold-primary border border-gold-primary/40">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">Pilgrimage Experiences</h3>
                  <p className="text-xs text-text-muted mt-1 font-sans">All-inclusive stay + private AC transport + rituals.</p>
                  <span className="text-xs font-bold text-gold-primary block mt-2">Starts from ₹24,999</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard padding="md" className="border-gold-primary/20 hover:border-gold-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">Luxury Concierge</h3>
                  <p className="text-xs text-text-muted mt-1 font-sans">Fully managed private luxury retreat & VIP access.</p>
                  <span className="text-xs font-bold text-gold-primary block mt-2">Starts from ₹89,999</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* 2. PACKAGE COMPARISON TABLE */}
      <Section id="comparison" className="py-24 bg-[#0A090D] text-text-primary border-b border-border-gold/20">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest block font-cinzel">
              TRANSPARENT TIER COMPARISON
            </span>
            <Heading size="2xl" align="center" font="cinzel">
              Side-by-Side Package Comparison
            </Heading>
            <Paragraph size="md" variant="muted" align="center">
              Compare features, inclusions, and service tiers at a glance to select the perfect pilgrimage flow for your family.
            </Paragraph>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gold-primary/30 bg-surface/20 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-left text-sm border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-gold-primary/30 bg-black/60 font-cinzel text-gold-primary uppercase text-xs tracking-wider">
                  <th className="p-4 sm:p-6 w-1/4">Pilgrimage Feature</th>
                  <th className="p-4 sm:p-6 text-center">Ritual Service<br/><span className="text-[10px] text-text-muted">From ₹5,100</span></th>
                  <th className="p-4 sm:p-6 text-center">Heritage<br/><span className="text-[10px] text-text-muted">₹24,999</span></th>
                  <th className="p-4 sm:p-6 text-center bg-gold-primary/10 text-gold-accent border-x border-gold-primary/30">Moksha (Popular)<br/><span className="text-[10px] text-gold-primary">₹49,999</span></th>
                  <th className="p-4 sm:p-6 text-center">Royal Concierge<br/><span className="text-[10px] text-text-muted">₹89,999</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-gold/10 font-sans">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white font-cinzel">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-center text-text-secondary">
                      {typeof row.ritualOnly === "boolean" ? (row.ritualOnly ? <Check className="h-5 w-5 text-gold-primary mx-auto" /> : <X className="h-4 w-4 text-text-muted/40 mx-auto" />) : row.ritualOnly}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-text-secondary">
                      {typeof row.heritage === "boolean" ? (row.heritage ? <Check className="h-5 w-5 text-gold-primary mx-auto" /> : <X className="h-4 w-4 text-text-muted/40 mx-auto" />) : row.heritage}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-semibold text-white bg-gold-primary/5 border-x border-gold-primary/20">
                      {typeof row.moksha === "boolean" ? (row.moksha ? <Check className="h-5 w-5 text-gold-primary mx-auto" /> : <X className="h-4 w-4 text-text-muted/40 mx-auto" />) : row.moksha}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-gold-primary font-medium">
                      {typeof row.royal === "boolean" ? (row.royal ? <Check className="h-5 w-5 text-gold-primary mx-auto" /> : <X className="h-4 w-4 text-text-muted/40 mx-auto" />) : row.royal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 3. DETAILED TABS-DASHBOARD PACKAGE CARDS */}
      <Section id="packages-list" className="py-28 bg-black text-text-primary border-b border-border-gold/20">
        <Container size="xl" className="space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest block font-cinzel">
              EXPLORE DETAILED PACKAGES
            </span>
            <Heading size="2xl" align="center" font="cinzel">
              Curated Experiences for Every Family
            </Heading>
            <Paragraph size="md" variant="muted" align="center">
              Review full timelines, check stay/vehicle specs, explore rituals, and understand pricing transparency for every package tier.
            </Paragraph>
          </div>

          <div className="space-y-12">
            {detailedPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onSelect={() => setActiveWizardPkgId(pkg.id)}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. WHAT'S INCLUDED IN EVERY PILGRIMAGE */}
      <Section className="py-24 bg-[#0B0907] text-text-primary border-b border-border-gold/20">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest block font-cinzel">
              THE PITRAYA ASSURANCE
            </span>
            <Heading size="2xl" align="center" font="cinzel">
              Included in Every Pilgrimage Experience
            </Heading>
            <Paragraph size="md" variant="muted" align="center">
              No matter which package tier you select, these 8 core guarantees are built into every single journey we guide.
            </Paragraph>
          </div>

          <Grid cols={4} gap="lg" className="pt-4">
            {whatsIncludedInEvery.map((item, idx) => (
              <GlassCard key={idx} padding="md" className="border-gold-primary/20 hover:border-gold-primary/50 transition-colors">
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-gold-primary/10 w-fit text-gold-primary border border-gold-primary/30">
                    {item.icon}
                  </div>
                  <h4 className="font-cinzel text-base font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">{item.desc}</p>
                </div>
              </GlassCard>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 5. OPTIONAL ADD-ONS SECTION */}
      <Section className="py-24 bg-black text-text-primary border-b border-border-gold/20">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest block font-cinzel">
              PERSONALIZE YOUR JOURNEY
            </span>
            <Heading size="2xl" align="center" font="cinzel">
              Optional Experience Add-ons
            </Heading>
            <Paragraph size="md" variant="muted" align="center">
              Tailor your pilgrimage with extra hotel nights, vehicle upgrades, photography coverage, or side excursions.
            </Paragraph>
          </div>

          <Grid cols={2} gap="md">
            {optionalAddons.map((addon, idx) => (
              <GlassCard key={idx} padding="md" className="border-gold-primary/20 hover:border-gold-primary/40 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                      <Plus className="h-4 w-4 text-gold-primary" />
                      <span>{addon.title}</span>
                    </h4>
                    <p className="text-xs text-text-muted font-sans">{addon.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold font-cinzel text-gold-primary">{addon.price}</span>
                    <span className="text-[10px] text-text-muted block font-sans">{addon.unit}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 6. PACKAGE FAQS */}
      <Section className="py-24 bg-[#0A090D] text-text-primary border-b border-border-gold/20">
        <Container size="xl" className="space-y-12 max-w-4xl">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest block font-cinzel">
              PACKAGE QUESTIONS
            </span>
            <Heading size="2xl" align="center" font="cinzel">
              Frequently Asked Package Questions
            </Heading>
          </div>

          <div className="space-y-4">
            {packageFaqs.map((faq, idx) => (
              <GlassCard key={idx} padding="md" className="border-gold-primary/20 space-y-2">
                <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-gold-primary shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed pl-6 font-sans">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. BOOKING FORM SECTION */}
      <Section id="booking" className="py-28 bg-black text-text-primary">
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest block font-cinzel">
              RESERVE YOUR PACKAGE
            </span>
            <Heading size="2xl" align="center" font="cinzel">
              Begin Your Family&apos;s Pilgrimage Booking
            </Heading>
            <Paragraph size="md" variant="muted" align="center">
              Select your desired package and travel dates below. Our Sanctuary Concierge will confirm hotel, vehicle, and Gayawal Pandit availability within 24 hours.
            </Paragraph>
          </div>

          <div className="max-w-3xl mx-auto">
            <GlassCard padding="lg" className="border-gold-primary/30">
              <ContactForm />
            </GlassCard>
          </div>
        </Container>
      </Section>

      <BookingWizardModal
        isOpen={!!activeWizardPkgId}
        onClose={() => setActiveWizardPkgId(null)}
        initialPackageId={activeWizardPkgId || "heritage-pilgrimage"}
      />
      <FloatingHelpAdvisor />
    </HomePage>
  );
}
