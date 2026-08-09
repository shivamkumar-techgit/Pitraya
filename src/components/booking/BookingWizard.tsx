"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Users,
  Hotel,
  Clock,
  Phone,
  MessageCircle,
  Download,
  CheckCircle2,
  Layers,
  Heart,
  Plus,
  Minus,
} from "lucide-react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GlassCard from "@/components/cards/GlassCard";
import PackageComparisonModal from "@/components/booking/PackageComparisonModal";
import ItineraryPdfModal from "./ItineraryPdfModal";
import { useBookingSession, PACKAGE_TIERS_DATA } from "@/hooks/useBookingSession";
import { BookingStep } from "@/types/booking";
import { cn } from "@/lib/utils";

const STEPS: { id: BookingStep; label: string }[] = [
  { id: "choose-experience", label: "Choose Experience" },
  { id: "family-details", label: "Family Details" },
  { id: "journey", label: "Journey" },
  { id: "stay", label: "Stay" },
  { id: "confirmation", label: "Confirmation" },
];

interface BookingWizardProps {
  initialPackageId?: string;
  onComplete?: (reservationId: string) => void;
}

export default function BookingWizard({
  initialPackageId = "heritage-pilgrimage",
  onComplete,
}: BookingWizardProps) {
  const {
    session,
    selectPackage,
    updateFamily,
    updateTravel,
    updateHotel,
    updateCustomer,
    setStepIndex,
    confirmReservation,
  } = useBookingSession(initialPackageId);

  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = back
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [confirmedReservationId, setConfirmedReservationId] = useState<string | null>(null);

  const currentStepIndex = session.currentStepIndex;
  const progressPercent = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setDirection(1);
      setStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setStepIndex(currentStepIndex - 1);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalConfirm = async () => {
    setIsSubmitting(true);
    let resId = confirmReservation();

    try {
      // POST /api/bookings -> Prisma -> Neon PostgreSQL -> Booking Created
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...session,
          status: "lead",
        }),
      });

      const data = await res.json();
      if (data.success && data.reservationId) {
        resId = data.reservationId;
      }
    } catch (err) {
      console.warn("Server booking POST warning, using local reservation fallback:", err);
    } finally {
      setIsSubmitting(false);
      setConfirmedReservationId(resId);
      if (onComplete) onComplete(resId);
    }

    // Auto-generate WhatsApp message & open in new tab
    const pkgName = session.package.title;
    const dateStr = session.travel.arrivalDate;
    const guestsStr = session.pricing.familyTotalCount;
    const name = session.customer.name || "Devotee";

    const waMsg = encodeURIComponent(
      `Namaste ${name} Ji 🙏\n\nThank you for choosing Pitraya for your family's Gaya Pinda Daan pilgrimage.\n\n` +
        `📍 *Reservation ID*: ${resId}\n` +
        `✨ *Experience*: ${pkgName}\n` +
        `📅 *Arrival*: ${dateStr}\n` +
        `👨‍👩‍👧 *Guests*: ${guestsStr} Members\n` +
        `💰 *Estimated Investment*: ₹${session.pricing.grandTotal.toLocaleString("en-IN")}\n\n` +
        `Our Senior Pilgrimage Coordinator will contact you within 15 minutes to review your lineage details.`
    );

    setTimeout(() => {
      window.open(`https://wa.me/918434457228?text=${waMsg}`, "_blank", "noopener,noreferrer");
    }, 800);
  };

  // ----------------------------------------------------
  // CONFIRMED SCREEN
  // ----------------------------------------------------
  if (confirmedReservationId || session.status === "confirmed") {
    const resId = confirmedReservationId || session.reservationId || session.sessionId;
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-background text-text-primary">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full rounded-3xl bg-surface/90 border border-gold-primary/40 p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center space-y-8"
        >
          {/* Hero Temple Image Header */}
          <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-gold-primary/40 shadow-xl">
            <Image
              src="/images/gaya_vishnupad_temple.png"
              alt="Vishnupad Temple Sanctum"
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-center">
              <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                ★ Sanctum Confirmation
              </span>
              <p className="text-base font-bold font-cinzel text-white">
                Your Sacred Journey is Reserved
              </p>
            </div>
          </div>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-primary/20 border-2 border-gold-primary text-gold-primary animate-bounce">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
              Ancestral Oblations Confirmed
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              We look forward to guiding your family&apos;s sacred rites at Vishnupad Temple.
            </p>
          </div>

          {/* Reservation ID Card */}
          <div className="p-6 rounded-2xl bg-black/60 border border-gold-primary/30 space-y-2 shadow-inner">
            <p className="text-xs text-text-muted uppercase tracking-wider font-cinzel font-bold">
              Official Reservation Identifier
            </p>
            <p className="text-2xl sm:text-3xl font-black font-cinzel text-gold-primary tracking-widest">
              {resId}
            </p>
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
              <Clock className="h-4 w-4" />
              <span>Our Pilgrimage Coordinator will contact you within 15 minutes.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => {
                const waMsg = encodeURIComponent(
                  `Namaste! I am checking on my Pitraya Reservation ID: ${resId}`
                );
                window.open(`https://wa.me/918434457228?text=${waMsg}`, "_blank");
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba5a] transition-all cursor-pointer shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Concierge</span>
            </button>

            <button
              onClick={() => window.open("tel:+918434457228")}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gold-gradient text-black font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow-lg"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </button>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface border border-gold-primary/40 text-gold-primary font-bold text-xs hover:bg-gold-primary/10 transition-all cursor-pointer shadow-md"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF Itinerary</span>
            </button>
          </div>

          <div className="pt-4 border-t border-border-gold/15 text-xs text-text-muted">
            <p>A confirmation email has been logged. Need modifications? Contact our 24/7 helpline.</p>
          </div>

          <ItineraryPdfModal
            isOpen={isPdfModalOpen}
            onClose={() => setIsPdfModalOpen(false)}
            session={session}
          />
        </motion.div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN WIZARD INTERFACE
  // ----------------------------------------------------
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-background text-text-primary">
      <PackageComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectPackage={selectPackage}
        currentSelectedId={session.package.id}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HERO TITLE HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-primary text-xs font-bold font-cinzel uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            Sacred Pilgrimage Concierge
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cinzel text-white tracking-wide">
            Let&apos;s Plan Your Family&apos;s Sacred Journey
          </h1>
          <p className="text-xs sm:text-sm text-text-muted max-w-2xl mx-auto font-serif italic">
            &quot;Every ritual thoughtfully curated, every tradition reverently preserved.&quot;
          </p>
        </div>

        {/* PROGRESS BAR & STEP NAVIGATION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold font-cinzel uppercase tracking-wider text-text-muted">
            <span className="text-gold-primary">Journey Planning</span>
            <span className="text-white">{progressPercent}% Completed</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-surface border border-border-gold/20 overflow-hidden">
            <motion.div
              className="h-full bg-gold-gradient shadow-gold-glow"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* STEP TABS (NO STEP NUMBERS) */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-2">
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isPassed = idx < currentStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setDirection(idx > currentStepIndex ? 1 : -1);
                    setStepIndex(idx);
                  }}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-[11px] font-bold font-cinzel transition-all uppercase tracking-wider text-center border cursor-pointer flex flex-col items-center justify-center gap-1",
                    isActive
                      ? "bg-gold-primary/15 text-gold-primary border-gold-primary shadow-gold-glow"
                      : isPassed
                      ? "bg-surface/60 text-white border-border-gold/30 hover:border-gold-primary/50"
                      : "bg-surface/20 text-text-muted border-transparent hover:text-white"
                  )}
                >
                  <span className="truncate">{step.label}</span>
                  {isPassed && <Check className="h-3 w-3 text-gold-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN WIZARD CONTENT: LEFT FORM / RIGHT STICKY PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE STEP FORM (7 COLUMNS) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-surface/60 border border-gold-primary/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl min-h-[560px] flex flex-col justify-between">
              
              {/* SLIDING ANIMATED CONTENT */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStepIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 flex-1"
                >
                  {/* STEP 0: CHOOSE EXPERIENCE */}
                  {currentStepIndex === 0 && (
                    <div className="space-y-6">
                      {/* HERO IMAGE BANNER FOR STEP 0 */}
                      <div className="relative h-36 sm:h-44 w-full rounded-2xl overflow-hidden border border-gold-primary/30 shadow-lg">
                        <Image
                          src="/images/booking_package_real.png"
                          alt="Authentic Gayawal Purohit Guidance"
                          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-left space-y-0.5">
                          <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                            ★ Step 1 • Sacred Experience Selection
                          </span>
                          <p className="text-sm sm:text-base font-bold font-cinzel text-white leading-tight">
                            Honoring Generations with Hereditary Gayawal Purohits
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                            Step 1 of 5
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
                            Choose Your Sacred Tier
                          </h2>
                        </div>
                        <button
                          onClick={() => setIsCompareOpen(true)}
                          className="py-1.5 px-3 rounded-xl bg-gold-primary/10 border border-gold-primary/40 text-gold-primary text-xs font-bold hover:bg-gold-primary/20 transition-all cursor-pointer flex items-center gap-1.5 font-cinzel"
                        >
                          <Layers className="h-3.5 w-3.5" />
                          Compare Experiences
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {PACKAGE_TIERS_DATA.map((pkg) => {
                          const isSelected = pkg.id === session.package.id;
                          return (
                            <div
                              key={pkg.id}
                              onClick={() => selectPackage(pkg.id)}
                              className={cn(
                                "rounded-2xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden group",
                                isSelected
                                  ? "bg-gold-primary/10 border-gold-primary shadow-gold-glow"
                                  : "bg-black/30 border-border hover:border-gold-primary/40"
                              )}
                            >
                              {/* Option Card Photo Header */}
                              <div className="relative h-28 w-full border-b border-border-gold/20">
                                <Image
                                  src={pkg.image}
                                  alt={pkg.title}
                                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                                  <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest font-cinzel bg-black/80 px-2 py-0.5 rounded-full border border-gold-primary/30">
                                    {pkg.tierName}
                                  </span>
                                  {pkg.isPopular && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider bg-gold-gradient text-black px-2 py-0.5 rounded-full shadow-md">
                                      ★ Popular
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                                <div className="space-y-1">
                                  <h3 className="text-sm font-bold font-cinzel text-white group-hover:text-gold-primary transition-colors">
                                    {pkg.title}
                                  </h3>
                                  <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
                                    {pkg.subtitle}
                                  </p>
                                </div>

                                <div className="pt-2 border-t border-border-gold/15 flex items-baseline justify-between">
                                  <div>
                                    <span className="text-[9px] text-text-muted uppercase tracking-wider block font-sans">
                                      Starting from
                                    </span>
                                    <span className="text-base font-bold font-cinzel text-gold-primary">
                                      ₹{pkg.startingPrice.toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-text-muted italic">{pkg.duration}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 1: FAMILY DETAILS */}
                  {currentStepIndex === 1 && (
                    <div className="space-y-6">
                      {/* HERO IMAGE BANNER FOR STEP 1 */}
                      <div className="relative h-36 sm:h-44 w-full rounded-2xl overflow-hidden border border-gold-primary/30 shadow-lg">
                        <Image
                          src="/images/booking_family_real.png"
                          alt="Authentic Indian Family Devotion"
                          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-left space-y-0.5">
                          <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                            ★ Step 2 • Family Group Sizing
                          </span>
                          <p className="text-sm sm:text-base font-bold font-cinzel text-white leading-tight">
                            &quot;Generations Honoring Generations at Falgu River Ghats&quot;
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                          Step 2 of 5
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
                          How many people are travelling?
                        </h2>
                        <p className="text-xs text-text-muted">
                          Configure your family group to calculate multi-member allocations.
                        </p>
                      </div>

                      {/* Member Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* ADULTS */}
                        <div className="p-4 rounded-2xl bg-black/40 border border-border-gold/20 flex flex-col items-center justify-between space-y-3">
                          <div className="text-center">
                            <span className="text-3xl">👨</span>
                            <p className="text-xs font-bold text-white font-cinzel mt-1">Adults</p>
                            <p className="text-[10px] text-text-muted">Age 12–59</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateFamily({ adults: Math.max(1, session.family.adults - 1) })
                              }
                              className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:border-gold-primary cursor-pointer"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-lg font-bold font-cinzel text-gold-primary w-4 text-center">
                              {session.family.adults}
                            </span>
                            <button
                              onClick={() => updateFamily({ adults: session.family.adults + 1 })}
                              className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:border-gold-primary cursor-pointer"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* ELDERS */}
                        <div className="p-4 rounded-2xl bg-black/40 border border-border-gold/20 flex flex-col items-center justify-between space-y-3">
                          <div className="text-center">
                            <span className="text-3xl">👵</span>
                            <p className="text-xs font-bold text-white font-cinzel mt-1">Elders</p>
                            <p className="text-[10px] text-text-muted">Age 60+</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateFamily({ elders: Math.max(0, session.family.elders - 1) })
                              }
                              className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:border-gold-primary cursor-pointer"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-lg font-bold font-cinzel text-gold-primary w-4 text-center">
                              {session.family.elders}
                            </span>
                            <button
                              onClick={() => updateFamily({ elders: session.family.elders + 1 })}
                              className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:border-gold-primary cursor-pointer"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* CHILDREN */}
                        <div className="p-4 rounded-2xl bg-black/40 border border-border-gold/20 flex flex-col items-center justify-between space-y-3">
                          <div className="text-center">
                            <span className="text-3xl">👧</span>
                            <p className="text-xs font-bold text-white font-cinzel mt-1">Children</p>
                            <p className="text-[10px] text-text-muted">Under 12 yrs</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateFamily({ children: Math.max(0, session.family.children - 1) })
                              }
                              className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:border-gold-primary cursor-pointer"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-lg font-bold font-cinzel text-gold-primary w-4 text-center">
                              {session.family.children}
                            </span>
                            <button
                              onClick={() => updateFamily({ children: session.family.children + 1 })}
                              className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:border-gold-primary cursor-pointer"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* SPECIAL ASSISTANCE TOGGLES */}
                      <div className="pt-4 border-t border-border-gold/15 space-y-3">
                        <span className="text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel block">
                          Special Care Preferences
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div
                            onClick={() =>
                              updateFamily({ wheelchairNeeded: !session.family.wheelchairNeeded })
                            }
                            className={cn(
                              "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                              session.family.wheelchairNeeded
                                ? "bg-gold-primary/10 border-gold-primary"
                                : "bg-black/30 border-border"
                            )}
                          >
                            <span className="text-xs font-semibold text-white">Need Wheelchair?</span>
                            <span
                              className={cn(
                                "text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider",
                                session.family.wheelchairNeeded
                                  ? "bg-gold-gradient text-black"
                                  : "bg-surface text-text-muted"
                              )}
                            >
                              {session.family.wheelchairNeeded ? "Yes" : "No"}
                            </span>
                          </div>

                          <div
                            onClick={() =>
                              updateFamily({
                                airportPickupNeeded: !session.family.airportPickupNeeded,
                              })
                            }
                            className={cn(
                              "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                              session.family.airportPickupNeeded
                                ? "bg-gold-primary/10 border-gold-primary"
                                : "bg-black/30 border-border"
                            )}
                          >
                            <span className="text-xs font-semibold text-white">
                              Need Airport Pickup?
                            </span>
                            <span
                              className={cn(
                                "text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider",
                                session.family.airportPickupNeeded
                                  ? "bg-gold-gradient text-black"
                                  : "bg-surface text-text-muted"
                              )}
                            >
                              {session.family.airportPickupNeeded ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: JOURNEY */}
                  {currentStepIndex === 2 && (
                    <div className="space-y-6">
                      {/* HERO IMAGE BANNER FOR STEP 2 */}
                      <div className="relative h-36 sm:h-44 w-full rounded-2xl overflow-hidden border border-gold-primary/30 shadow-lg">
                        <Image
                          src="/images/booking_travel_real.png"
                          alt="Authentic Chauffeur Transport in Gaya"
                          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-left space-y-0.5">
                          <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                            ★ Step 3 • Travel Logistics
                          </span>
                          <p className="text-sm sm:text-base font-bold font-cinzel text-white leading-tight">
                            Chauffeur-Driven Escort from Gaya Airport or Railway Station
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                          Step 3 of 5
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
                          How will you arrive?
                        </h2>
                        <p className="text-xs text-text-muted">
                          We will organize seamless local escort meeting points based on your travel mode.
                        </p>
                      </div>

                      {/* Travel Mode Cards with Images */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "flight", label: "Flight", icon: "✈️", image: "/images/booking_flight_real.png" },
                          { id: "train", label: "Train", icon: "🚆", image: "/images/journey_arrival.png" },
                          { id: "road", label: "Private Vehicle", icon: "🚗", image: "/images/transport_luxury_suv.png" },
                        ].map((mode) => {
                          const isSelected = session.travel.mode === mode.id;
                          return (
                            <div
                              key={mode.id}
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              onClick={() => updateTravel({ mode: mode.id as any })}
                              className={cn(
                                "rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between overflow-hidden group",
                                isSelected
                                  ? "bg-gold-primary/10 border-gold-primary shadow-gold-glow"
                                  : "bg-black/30 border-border hover:border-gold-primary/40"
                              )}
                            >
                              <div className="relative h-24 w-full">
                                <Image
                                  src={mode.image}
                                  alt={mode.label}
                                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute bottom-2 left-2 text-2xl">{mode.icon}</div>
                              </div>

                              <div className="p-3 text-center">
                                <span className="text-xs font-bold font-cinzel text-white">
                                  {mode.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Arrival Details Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold font-cinzel text-gold-primary">
                            Arrival Date
                          </label>
                          <input
                            type="date"
                            value={session.travel.arrivalDate}
                            onChange={(e) => updateTravel({ arrivalDate: e.target.value })}
                            className="w-full rounded-xl bg-black/60 border border-border-gold/30 p-3 text-xs text-white focus:border-gold-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold font-cinzel text-gold-primary">
                            Arrival Time
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 10:30 AM"
                            value={session.travel.arrivalTime}
                            onChange={(e) => updateTravel({ arrivalTime: e.target.value })}
                            className="w-full rounded-xl bg-black/60 border border-border-gold/30 p-3 text-xs text-white focus:border-gold-primary focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-xs font-bold font-cinzel text-gold-primary flex items-center justify-between">
                            <span>Flight / Train Number</span>
                            <span className="text-[10px] text-text-muted font-sans font-normal">
                              (Optional)
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 6E-2411 or Vande Bharat 22345"
                            value={session.travel.flightOrTrainNumber || ""}
                            onChange={(e) =>
                              updateTravel({ flightOrTrainNumber: e.target.value })
                            }
                            className="w-full rounded-xl bg-black/60 border border-border-gold/30 p-3 text-xs text-white focus:border-gold-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: STAY */}
                  {currentStepIndex === 3 && (
                    <div className="space-y-6">
                      {/* HERO IMAGE BANNER FOR STEP 3 */}
                      <div className="relative h-36 sm:h-44 w-full rounded-2xl overflow-hidden border border-gold-primary/30 shadow-lg">
                        <Image
                          src="/images/booking_stay_real.png"
                          alt="Authentic Luxury Heritage Hotel Interior"
                          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-left space-y-0.5">
                          <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                            ★ Step 4 • Accommodation Selection
                          </span>
                          <p className="text-sm sm:text-base font-bold font-cinzel text-white leading-tight">
                            Pre-Inspected Sattvik Sanctuaries Proximity to Vishnupad
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                          Step 4 of 5
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
                          Select Accommodation Tier
                        </h2>
                        <p className="text-xs text-text-muted">
                          Every property is verified for pure Sattvik hygiene and proximity to Vishnupad.
                        </p>
                      </div>

                      {/* Hotel Cards with Images */}
                      <div className="space-y-3">
                        {[
                          {
                            id: "heritage-3star",
                            title: "⭐⭐⭐ Heritage Stay",
                            tag: "Included • Our Recommendation",
                            subtitle: "Clean, air-conditioned heritage hotel with Sattvik dining.",
                            extraPrice: 0,
                            image: "/images/journey_hotel.png",
                          },
                          {
                            id: "heritage-4star",
                            title: "⭐⭐⭐⭐ Heritage Resort",
                            tag: "Upgrade • More Comfort",
                            subtitle: "Premium resort with serene courtyard & executive amenities.",
                            extraPrice: 8500,
                            image: "/images/booking_stay_real.png",
                          },
                          {
                            id: "royal-palace",
                            title: "⭐⭐⭐⭐⭐ Royal Palace Suite",
                            tag: "Royal • The Finest Experience",
                            subtitle: "Bespoke palace suite with private dining & butler service.",
                            extraPrice: 22000,
                            image: "/images/hotel_luxury_suite.png",
                          },
                        ].map((hotel) => {
                          const isSelected = session.hotel.tierId === hotel.id;
                          return (
                            <div
                              key={hotel.id}
                              onClick={() =>
                                updateHotel({
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  tierId: hotel.id as any,
                                  title: hotel.title,
                                  subtitle: hotel.subtitle,
                                  upgradePricePerPerson: hotel.extraPrice,
                                })
                              }
                              className={cn(
                                "rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-stretch overflow-hidden group",
                                isSelected
                                  ? "bg-gold-primary/10 border-gold-primary shadow-gold-glow"
                                  : "bg-black/30 border-border hover:border-gold-primary/40"
                              )}
                            >
                              <div className="relative h-28 sm:h-auto sm:w-40 shrink-0 border-b sm:border-b-0 sm:border-r border-border-gold/20">
                                <Image
                                  src={hotel.image}
                                  alt={hotel.title}
                                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                                />
                              </div>

                              <div className="p-4 flex-1 flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                                    {hotel.tag}
                                  </span>
                                  <h3 className="text-sm font-bold font-cinzel text-white">
                                    {hotel.title}
                                  </h3>
                                  <p className="text-xs text-text-muted">{hotel.subtitle}</p>
                                </div>

                                <div className="text-right shrink-0">
                                  {isSelected ? (
                                    <span className="text-xs font-bold text-gold-primary font-cinzel">
                                      {hotel.extraPrice > 0
                                        ? `+₹${hotel.extraPrice.toLocaleString("en-IN")}`
                                        : "Included"}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-text-muted font-cinzel">Select</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Rooms Selector */}
                      <div className="pt-2 flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-border-gold/20">
                        <div>
                          <p className="text-xs font-bold text-white font-cinzel">Rooms Needed</p>
                          <p className="text-[10px] text-text-muted">Double occupancy allocation</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateHotel({ roomsNeeded: Math.max(1, session.hotel.roomsNeeded - 1) })
                            }
                            className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:border-gold-primary cursor-pointer"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-base font-bold font-cinzel text-gold-primary w-4 text-center">
                            {session.hotel.roomsNeeded}
                          </span>
                          <button
                            onClick={() => updateHotel({ roomsNeeded: session.hotel.roomsNeeded + 1 })}
                            className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:border-gold-primary cursor-pointer"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: CONFIRMATION & DETAILS */}
                  {currentStepIndex === 4 && (
                    <div className="space-y-6">
                      {/* HERO IMAGE BANNER FOR STEP 4 */}
                      <div className="relative h-36 sm:h-44 w-full rounded-2xl overflow-hidden border border-gold-primary/30 shadow-lg">
                        <Image
                          src="/images/booking_sanctum_real.png"
                          alt="Authentic Vishnupad Temple Ghats at Dawn"
                          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-left space-y-0.5">
                          <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                            ★ Step 5 • Pilgrim Details & Confirmation
                          </span>
                          <p className="text-sm sm:text-base font-bold font-cinzel text-white leading-tight">
                            Finalizing Your Sacred Reservation for Gaya Sanctum
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                          Step 5 of 5
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
                          Pilgrim Contact Details
                        </h2>
                        <p className="text-xs text-text-muted">
                          Provide your details so our senior Gayawal coordinator can reach you.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold font-cinzel text-gold-primary">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Ramesh Sharma"
                            value={session.customer.name}
                            onChange={(e) => updateCustomer({ name: e.target.value })}
                            className="w-full rounded-xl bg-black/60 border border-border-gold/30 p-3 text-xs text-white focus:border-gold-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold font-cinzel text-gold-primary">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={session.customer.phone}
                            onChange={(e) => updateCustomer({ phone: e.target.value })}
                            className="w-full rounded-xl bg-black/60 border border-border-gold/30 p-3 text-xs text-white focus:border-gold-primary focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-xs font-bold font-cinzel text-gold-primary">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="ramesh@example.com"
                            value={session.customer.email}
                            onChange={(e) => updateCustomer({ email: e.target.value })}
                            className="w-full rounded-xl bg-black/60 border border-border-gold/30 p-3 text-xs text-white focus:border-gold-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold font-cinzel text-gold-primary">
                            City
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Mumbai"
                            value={session.customer.city}
                            onChange={(e) => updateCustomer({ city: e.target.value })}
                            className="w-full rounded-xl bg-black/60 border border-border-gold/30 p-3 text-xs text-white focus:border-gold-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold font-cinzel text-gold-primary">
                            Country
                          </label>
                          <input
                            type="text"
                            value={session.customer.country}
                            onChange={(e) => updateCustomer({ country: e.target.value })}
                            className="w-full rounded-xl bg-black/60 border border-border-gold/30 p-3 text-xs text-white focus:border-gold-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* TRUST BOOSTER SECTION */}
                      <div className="p-4 rounded-2xl bg-black/40 border border-border-gold/20 space-y-3">
                        <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                          Sacred Trust Commitments
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-text-secondary">
                          <div className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                            <span>Secure Reservation</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                            <span>No Hidden Charges</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                            <span>Free Cancellation</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                            <span>Dedicated Coordinator</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                            <span>WhatsApp Support</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                            <span>5000+ Families</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* NAVIGATION BUTTONS BAR */}
              <div className="pt-6 border-t border-border-gold/20 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-bold font-cinzel py-2.5 px-4 rounded-xl transition-all cursor-pointer border",
                    currentStepIndex === 0
                      ? "opacity-30 cursor-not-allowed text-text-muted border-transparent"
                      : "text-white border-border hover:border-gold-primary"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                {currentStepIndex < STEPS.length - 1 ? (
                  <PrimaryButton
                    size="md"
                    onClick={handleNext}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                  >
                    Continue
                  </PrimaryButton>
                ) : (
                  <button
                    onClick={handleFinalConfirm}
                    className="py-3 px-8 rounded-full bg-gold-gradient text-black font-bold font-cinzel text-xs uppercase tracking-widest shadow-gold-glow hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Heart className="h-4 w-4 fill-black" />
                    <span>Reserve My Pilgrimage</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE DESKTOP STICKY LIVE PREVIEW (5 COLUMNS) */}
          <div className="lg:col-span-5 sticky top-8 space-y-4">
            <GlassCard
              glow
              borderGold
              className="p-6 rounded-3xl bg-surface/80 backdrop-blur-xl space-y-6 overflow-hidden"
            >
              {/* SUMMARY HERO PHOTO BANNER */}
              <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-gold-primary/30 shadow-md">
                <Image
                  src="/images/booking_sanctum_real.png"
                  alt="Authentic Vishnupad Sanctum"
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-gold-primary uppercase tracking-widest font-cinzel bg-black/80 px-2.5 py-0.5 rounded-full border border-gold-primary/30">
                    ★ Your Sacred Sanctuary
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-border-gold/20 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest font-cinzel block">
                    Live Pilgrimage Preview
                  </span>
                  <h3 className="text-lg font-bold font-cinzel text-white">
                    YOUR EXPERIENCE
                  </h3>
                </div>
                <div className="h-8 w-8 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>

              {/* LIVE ITEM SUMMARY LIST */}
              <div className="space-y-4 text-xs">
                {/* Package */}
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white font-cinzel">{session.package.title}</p>
                    <p className="text-text-muted text-[11px]">{session.package.duration}</p>
                  </div>
                  <span className="font-bold text-gold-primary font-cinzel">
                    ₹{session.package.startingPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Family */}
                <div className="flex items-center justify-between pt-2 border-t border-border-gold/10">
                  <span className="text-text-muted">Guests</span>
                  <span className="font-semibold text-white">
                    {session.pricing.familyTotalCount} Members ({session.family.adults}A, {session.family.elders}E, {session.family.children}C)
                  </span>
                </div>

                {/* Travel */}
                <div className="flex items-center justify-between pt-2 border-t border-border-gold/10">
                  <span className="text-text-muted">Travel Mode</span>
                  <span className="font-semibold text-white uppercase">
                    {session.travel.mode} ({session.travel.arrivalDate})
                  </span>
                </div>

                {/* Hotel */}
                <div className="flex items-center justify-between pt-2 border-t border-border-gold/10">
                  <span className="text-text-muted">Accommodation</span>
                  <div className="text-right">
                    <p className="font-semibold text-white">{session.hotel.title}</p>
                    {session.pricing.hotelUpgradeTotal > 0 && (
                      <p className="text-[10px] text-gold-primary font-bold">
                        +₹{session.pricing.hotelUpgradeTotal.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* DYNAMIC TOTAL PRICE CARD */}
              <div className="p-4 rounded-2xl bg-black/60 border border-gold-primary/40 space-y-1 text-center shadow-inner">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest font-cinzel block">
                  Estimated Investment
                </span>
                <motion.div
                  key={session.pricing.grandTotal}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-black font-cinzel text-gold-primary tracking-tight"
                >
                  ₹{session.pricing.grandTotal.toLocaleString("en-IN")}
                </motion.div>
                <span className="text-[10px] text-text-muted italic block">
                  Transparent Vedic dakshina included • Zero hidden costs
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <ItineraryPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        session={session}
      />
    </div>
  );
}
