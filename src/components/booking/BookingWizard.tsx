"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Clock,
  MessageCircle,
  Download,
  CheckCircle2,
  Layers,
  Heart,
  Plus,
  Minus,
  CreditCard,
} from "lucide-react";
import { initiatePayUCheckout } from "@/lib/payments/payuClient";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GlassCard from "@/components/cards/GlassCard";
import PackageComparisonModal from "@/components/booking/PackageComparisonModal";
import ItineraryPdfModal from "./ItineraryPdfModal";
import {
  useBookingSession,
  PACKAGE_TIERS_DATA,
} from "@/hooks/useBookingSession";
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
  const [confirmedReservationId, setConfirmedReservationId] = useState<
    string | null
  >(null);

  React.useEffect(() => {
    if (initialPackageId) {
      selectPackage(initialPackageId);
      setStepIndex(1); // Auto-skip redundant package selection step
    }
  }, [initialPackageId]);

  const currentStepIndex = session.currentStepIndex;
  const progressPercent = Math.round(
    ((currentStepIndex + 1) / STEPS.length) * 100
  );

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

  const [_isSubmitting, setIsSubmitting] = useState(false);

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
      console.warn(
        "Server booking POST warning, using local reservation fallback:",
        err
      );
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
      window.open(
        `https://wa.me/918434457228?text=${waMsg}`,
        "_blank",
        "noopener,noreferrer"
      );
    }, 800);
  };

  // ----------------------------------------------------
  // CONFIRMED SCREEN
  // ----------------------------------------------------
  if (confirmedReservationId || session.status === "confirmed") {
    const resId =
      confirmedReservationId || session.reservationId || session.sessionId;
    return (
      <div className="bg-background text-text-primary flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface/90 border-gold-primary/40 w-full max-w-2xl space-y-8 rounded-3xl border p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
        >
          {/* Hero Temple Image Header */}
          <div className="border-gold-primary/40 relative h-44 w-full overflow-hidden rounded-2xl border shadow-xl">
            <Image
              src="/images/gaya_vishnupad_temple.png"
              alt="Vishnupad Temple Sanctum"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute right-4 bottom-3 left-4 text-center">
              <span className="text-gold-primary font-cinzel block text-[10px] font-bold tracking-widest uppercase">
                ★ Sanctum Confirmation
              </span>
              <p className="font-cinzel text-base font-bold text-white">
                Your Sacred Journey is Reserved
              </p>
            </div>
          </div>

          <div className="bg-gold-primary/20 border-gold-primary text-gold-primary mx-auto flex h-16 w-16 animate-bounce items-center justify-center rounded-full border-2">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-cinzel text-2xl font-bold text-white sm:text-3xl">
              Ancestral Oblations Confirmed
            </h2>
            <p className="text-text-muted text-xs sm:text-sm">
              We look forward to guiding your family&apos;s sacred rites at
              Vishnupad Temple.
            </p>
          </div>

          {/* Reservation ID Card */}
          <div className="border-gold-primary/30 space-y-2 rounded-2xl border bg-black/60 p-6 shadow-inner">
            <p className="text-text-muted font-cinzel text-xs font-bold tracking-wider uppercase">
              Official Reservation Identifier
            </p>
            <p className="font-cinzel text-gold-primary text-2xl font-black tracking-widest sm:text-3xl">
              {resId}
            </p>
            <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-emerald-400">
              <Clock className="h-4 w-4" />
              <span>
                Our Pilgrimage Coordinator will contact you within 15 minutes.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            <button
              onClick={() => {
                initiatePayUCheckout({
                  reservationId: resId,
                  amount: session.pricing.grandTotal,
                  customerName: session.customer.name || "Devotee",
                  customerEmail:
                    session.customer.email || "devotee@pitraya.com",
                  customerPhone: session.customer.phone || "9999999999",
                  packageTitle: session.package.title,
                });
              }}
              className="col-span-1 flex transform cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-amber-400 sm:col-span-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>
                Pay Securely Online via PayU (UPI / Cards / NetBanking) →
              </span>
            </button>

            <button
              onClick={() => {
                const waMsg = encodeURIComponent(
                  `Namaste! I am checking on my Pitraya Reservation ID: ${resId}`
                );
                window.open(
                  `https://wa.me/918434457228?text=${waMsg}`,
                  "_blank"
                );
              }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#20ba5a]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Concierge</span>
            </button>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="bg-surface border-gold-primary/40 text-gold-primary hover:bg-gold-primary/10 flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold shadow-md transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF Itinerary</span>
            </button>
          </div>

          <div className="border-border-gold/15 text-text-muted border-t pt-4 text-xs">
            <p>
              A confirmation email has been logged. Need modifications? Contact
              our 24/7 helpline.
            </p>
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
    <div className="bg-background text-text-primary min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <PackageComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectPackage={selectPackage}
        currentSelectedId={session.package.id}
      />

      <div className="mx-auto max-w-7xl space-y-8">
        {/* HERO TITLE HEADER */}
        <div className="space-y-3 text-center">
          <div className="bg-gold-primary/10 border-gold-primary/30 text-gold-primary font-cinzel inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Sacred Pilgrimage Concierge
          </div>
          <h1 className="font-cinzel text-3xl font-bold tracking-wide text-white sm:text-4xl md:text-5xl">
            Let&apos;s Plan Your Family&apos;s Sacred Journey
          </h1>
          <p className="text-text-muted mx-auto max-w-2xl font-serif text-xs italic sm:text-sm">
            &quot;Every ritual thoughtfully curated, every tradition reverently
            preserved.&quot;
          </p>
        </div>

        {/* PROGRESS BAR & STEP NAVIGATION */}
        <div className="space-y-4">
          <div className="font-cinzel text-text-muted flex items-center justify-between text-xs font-bold tracking-wider uppercase">
            <span className="text-gold-primary">Journey Planning</span>
            <span className="text-white">{progressPercent}% Completed</span>
          </div>
          <div className="bg-surface border-border-gold/20 h-1.5 w-full overflow-hidden rounded-full border">
            <motion.div
              className="bg-gold-gradient shadow-gold-glow h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* STEP TABS (NO STEP NUMBERS) */}
          <div className="grid grid-cols-3 gap-2 pt-2 sm:grid-cols-5">
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
                    "font-cinzel flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border px-3 py-2.5 text-center text-[11px] font-bold tracking-wider uppercase transition-all",
                    isActive
                      ? "bg-gold-primary/15 text-gold-primary border-gold-primary shadow-gold-glow"
                      : isPassed
                        ? "bg-surface/60 border-border-gold/30 hover:border-gold-primary/50 text-white"
                        : "bg-surface/20 text-text-muted border-transparent hover:text-white"
                  )}
                >
                  <span className="truncate">{step.label}</span>
                  {isPassed && <Check className="text-gold-primary h-3 w-3" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN WIZARD CONTENT: LEFT FORM / RIGHT STICKY PREVIEW */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* LEFT SIDE STEP FORM (7 COLUMNS) */}
          <div className="space-y-6 lg:col-span-7">
            <div className="bg-surface/60 border-gold-primary/30 relative flex min-h-[560px] flex-col justify-between overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* SLIDING ANIMATED CONTENT */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStepIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 space-y-6"
                >
                  {/* STEP 0: CHOOSE EXPERIENCE */}
                  {currentStepIndex === 0 && (
                    <div className="space-y-6">
                      {/* HERO IMAGE BANNER FOR STEP 0 */}
                      <div className="border-gold-primary/30 relative h-36 w-full overflow-hidden rounded-2xl border shadow-lg sm:h-44">
                        <Image
                          src="/images/booking_package_real.png"
                          alt="Authentic Gayawal Purohit Guidance"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute right-4 bottom-3 left-4 space-y-0.5 text-left">
                          <span className="text-gold-primary font-cinzel block text-[9px] font-bold tracking-widest uppercase">
                            ★ Step 1 • Sacred Experience Selection
                          </span>
                          <p className="font-cinzel text-sm leading-tight font-bold text-white sm:text-base">
                            Honoring Generations with Hereditary Gayawal
                            Purohits
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gold-primary font-cinzel block text-xs font-bold tracking-widest uppercase">
                            Step 1 of 5
                          </span>
                          <h2 className="font-cinzel text-xl font-bold text-white sm:text-2xl">
                            Choose Your Sacred Tier
                          </h2>
                        </div>
                        <button
                          onClick={() => setIsCompareOpen(true)}
                          className="bg-gold-primary/10 border-gold-primary/40 text-gold-primary hover:bg-gold-primary/20 font-cinzel flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all"
                        >
                          <Layers className="h-3.5 w-3.5" />
                          Compare Experiences
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {PACKAGE_TIERS_DATA.map((pkg) => {
                          const isSelected = pkg.id === session.package.id;
                          return (
                            <div
                              key={pkg.id}
                              onClick={() => selectPackage(pkg.id)}
                              className={cn(
                                "group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border transition-all",
                                isSelected
                                  ? "bg-gold-primary/10 border-gold-primary shadow-gold-glow"
                                  : "border-border hover:border-gold-primary/40 bg-black/30"
                              )}
                            >
                              {/* Option Card Photo Header */}
                              <div className="border-border-gold/20 relative h-28 w-full overflow-hidden border-b bg-gradient-to-br from-amber-950/60 via-slate-900 to-black">
                                <Image
                                  src={pkg.image}
                                  alt={pkg.title}
                                  fill
                                  unoptimized
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute top-2 right-2 left-2 flex items-center justify-between">
                                  <span className="text-gold-primary font-cinzel border-gold-primary/30 rounded-full border bg-black/80 px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase">
                                    {pkg.tierName}
                                  </span>
                                  {pkg.isPopular && (
                                    <span className="bg-gold-gradient rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider text-black uppercase shadow-md">
                                      ★ Popular
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
                                <div className="space-y-1">
                                  <h3 className="font-cinzel group-hover:text-gold-primary text-sm font-bold text-white transition-colors">
                                    {pkg.title}
                                  </h3>
                                  <p className="text-text-muted line-clamp-2 text-[11px] leading-relaxed">
                                    {pkg.subtitle}
                                  </p>
                                </div>

                                <div className="border-border-gold/15 flex items-baseline justify-between border-t pt-2">
                                  <div>
                                    <span className="text-text-muted block font-sans text-[9px] tracking-wider uppercase">
                                      Starting from
                                    </span>
                                    <span className="font-cinzel text-gold-primary text-base font-bold">
                                      ₹
                                      {pkg.startingPrice.toLocaleString(
                                        "en-IN"
                                      )}
                                    </span>
                                  </div>
                                  <span className="text-text-muted text-[10px] italic">
                                    {pkg.duration}
                                  </span>
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
                      <div className="border-gold-primary/30 relative h-36 w-full overflow-hidden rounded-2xl border shadow-lg sm:h-44">
                        <Image
                          src="/images/booking_family_real.png"
                          alt="Authentic Indian Family Devotion"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute right-4 bottom-3 left-4 space-y-0.5 text-left">
                          <span className="text-gold-primary font-cinzel block text-[9px] font-bold tracking-widest uppercase">
                            ★ Step 2 • Family Group Sizing
                          </span>
                          <p className="font-cinzel text-sm leading-tight font-bold text-white sm:text-base">
                            &quot;Generations Honoring Generations at Falgu
                            River Ghats&quot;
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="border-gold-primary/30 bg-gold-primary/10 mb-4 flex items-center justify-between rounded-2xl border p-3.5 text-xs">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-gold-primary h-4 w-4" />
                            <span className="text-text-muted">
                              Selected Package:
                            </span>
                            <span className="font-cinzel font-bold text-white">
                              {session.package.title} (₹
                              {session.package.startingPrice.toLocaleString(
                                "en-IN"
                              )}
                              )
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStepIndex(0)}
                            className="text-gold-primary cursor-pointer text-[11px] font-bold underline transition-colors hover:text-white"
                          >
                            Change Package
                          </button>
                        </div>

                        <span className="text-gold-primary font-cinzel block text-xs font-bold tracking-widest uppercase">
                          ★ STEP 2 • FAMILY COMPOSITION
                        </span>
                        <h2 className="font-cinzel text-xl font-bold text-white sm:text-2xl">
                          How many people are travelling?
                        </h2>
                        <p className="text-text-muted text-xs">
                          Configure your family group to calculate multi-member
                          allocations.
                        </p>
                      </div>

                      {/* Member Cards */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {/* ADULTS */}
                        <div className="border-border-gold/20 flex flex-col items-center justify-between space-y-3 rounded-2xl border bg-black/40 p-4">
                          <div className="text-center">
                            <span className="text-3xl">👨</span>
                            <p className="font-cinzel mt-1 text-xs font-bold text-white">
                              Adults
                            </p>
                            <p className="text-text-muted text-[10px]">
                              Age 12–59
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateFamily({
                                  adults: Math.max(
                                    1,
                                    session.family.adults - 1
                                  ),
                                })
                              }
                              className="bg-surface border-border hover:border-gold-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-white"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-cinzel text-gold-primary w-4 text-center text-lg font-bold">
                              {session.family.adults}
                            </span>
                            <button
                              onClick={() =>
                                updateFamily({
                                  adults: session.family.adults + 1,
                                })
                              }
                              className="bg-surface border-border hover:border-gold-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* ELDERS */}
                        <div className="border-border-gold/20 flex flex-col items-center justify-between space-y-3 rounded-2xl border bg-black/40 p-4">
                          <div className="text-center">
                            <span className="text-3xl">👵</span>
                            <p className="font-cinzel mt-1 text-xs font-bold text-white">
                              Elders
                            </p>
                            <p className="text-text-muted text-[10px]">
                              Age 60+
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateFamily({
                                  elders: Math.max(
                                    0,
                                    session.family.elders - 1
                                  ),
                                })
                              }
                              className="bg-surface border-border hover:border-gold-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-white"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-cinzel text-gold-primary w-4 text-center text-lg font-bold">
                              {session.family.elders}
                            </span>
                            <button
                              onClick={() =>
                                updateFamily({
                                  elders: session.family.elders + 1,
                                })
                              }
                              className="bg-surface border-border hover:border-gold-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* CHILDREN */}
                        <div className="border-border-gold/20 flex flex-col items-center justify-between space-y-3 rounded-2xl border bg-black/40 p-4">
                          <div className="text-center">
                            <span className="text-3xl">👧</span>
                            <p className="font-cinzel mt-1 text-xs font-bold text-white">
                              Children
                            </p>
                            <p className="text-text-muted text-[10px]">
                              Under 12 yrs
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateFamily({
                                  children: Math.max(
                                    0,
                                    session.family.children - 1
                                  ),
                                })
                              }
                              className="bg-surface border-border hover:border-gold-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-white"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-cinzel text-gold-primary w-4 text-center text-lg font-bold">
                              {session.family.children}
                            </span>
                            <button
                              onClick={() =>
                                updateFamily({
                                  children: session.family.children + 1,
                                })
                              }
                              className="bg-surface border-border hover:border-gold-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* SPECIAL ASSISTANCE TOGGLES */}
                      <div className="border-border-gold/15 space-y-3 border-t pt-4">
                        <span className="text-gold-primary font-cinzel block text-xs font-bold tracking-wider uppercase">
                          Special Care Preferences
                        </span>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div
                            onClick={() =>
                              updateFamily({
                                wheelchairNeeded:
                                  !session.family.wheelchairNeeded,
                              })
                            }
                            className={cn(
                              "flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all",
                              session.family.wheelchairNeeded
                                ? "bg-gold-primary/10 border-gold-primary"
                                : "border-border bg-black/30"
                            )}
                          >
                            <span className="text-xs font-semibold text-white">
                              Need Wheelchair?
                            </span>
                            <span
                              className={cn(
                                "rounded-lg px-3 py-1 text-xs font-bold tracking-wider uppercase",
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
                                airportPickupNeeded:
                                  !session.family.airportPickupNeeded,
                              })
                            }
                            className={cn(
                              "flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all",
                              session.family.airportPickupNeeded
                                ? "bg-gold-primary/10 border-gold-primary"
                                : "border-border bg-black/30"
                            )}
                          >
                            <span className="text-xs font-semibold text-white">
                              Need Airport Pickup?
                            </span>
                            <span
                              className={cn(
                                "rounded-lg px-3 py-1 text-xs font-bold tracking-wider uppercase",
                                session.family.airportPickupNeeded
                                  ? "bg-gold-gradient text-black"
                                  : "bg-surface text-text-muted"
                              )}
                            >
                              {session.family.airportPickupNeeded
                                ? "Yes"
                                : "No"}
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
                      <div className="border-gold-primary/30 relative h-36 w-full overflow-hidden rounded-2xl border shadow-lg sm:h-44">
                        <Image
                          src="/images/booking_travel_real.png"
                          alt="Authentic Chauffeur Transport in Gaya"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute right-4 bottom-3 left-4 space-y-0.5 text-left">
                          <span className="text-gold-primary font-cinzel block text-[9px] font-bold tracking-widest uppercase">
                            ★ Step 3 • Travel Logistics
                          </span>
                          <p className="font-cinzel text-sm leading-tight font-bold text-white sm:text-base">
                            Chauffeur-Driven Escort from Gaya Airport or Railway
                            Station
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-gold-primary font-cinzel block text-xs font-bold tracking-widest uppercase">
                          Step 3 of 5
                        </span>
                        <h2 className="font-cinzel text-xl font-bold text-white sm:text-2xl">
                          How will you arrive?
                        </h2>
                        <p className="text-text-muted text-xs">
                          We will organize seamless local escort meeting points
                          based on your travel mode.
                        </p>
                      </div>

                      {/* Travel Mode Cards with Images */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                          {
                            id: "flight",
                            label: "Flight",
                            icon: "✈️",
                            image: "/images/booking_flight_real.png",
                          },
                          {
                            id: "train",
                            label: "Train",
                            icon: "🚆",
                            image: "/images/journey_arrival.png",
                          },
                          {
                            id: "road",
                            label: "Private Vehicle",
                            icon: "🚗",
                            image: "/images/transport_luxury_suv.png",
                          },
                        ].map((mode) => {
                          const isSelected = session.travel.mode === mode.id;
                          return (
                            <div
                              key={mode.id}
                              onClick={() =>
                                updateTravel({
                                  mode: mode.id as "flight" | "train" | "road",
                                })
                              }
                              className={cn(
                                "group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border text-center transition-all",
                                isSelected
                                  ? "bg-gold-primary/10 border-gold-primary shadow-gold-glow"
                                  : "border-border hover:border-gold-primary/40 bg-black/30"
                              )}
                            >
                              <div className="relative flex h-24 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-amber-950/60 via-slate-900 to-black">
                                <Image
                                  src={mode.image}
                                  alt={mode.label}
                                  fill
                                  unoptimized
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute bottom-2 left-2 z-10 text-2xl">
                                  {mode.icon}
                                </div>
                              </div>

                              <div className="p-3 text-center">
                                <span className="font-cinzel text-xs font-bold text-white">
                                  {mode.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Arrival Details Inputs */}
                      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="font-cinzel text-gold-primary text-xs font-bold">
                            Arrival Date
                          </label>
                          <input
                            type="date"
                            value={session.travel.arrivalDate}
                            onChange={(e) =>
                              updateTravel({ arrivalDate: e.target.value })
                            }
                            className="border-border-gold/30 focus:border-gold-primary w-full rounded-xl border bg-black/60 p-3 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-cinzel text-gold-primary text-xs font-bold">
                            Arrival Time
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 10:30 AM"
                            value={session.travel.arrivalTime}
                            onChange={(e) =>
                              updateTravel({ arrivalTime: e.target.value })
                            }
                            className="border-border-gold/30 focus:border-gold-primary w-full rounded-xl border bg-black/60 p-3 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="font-cinzel text-gold-primary flex items-center justify-between text-xs font-bold">
                            <span>Flight / Train Number</span>
                            <span className="text-text-muted font-sans text-[10px] font-normal">
                              (Optional)
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 6E-2411 or Vande Bharat 22345"
                            value={session.travel.flightOrTrainNumber || ""}
                            onChange={(e) =>
                              updateTravel({
                                flightOrTrainNumber: e.target.value,
                              })
                            }
                            className="border-border-gold/30 focus:border-gold-primary w-full rounded-xl border bg-black/60 p-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: STAY */}
                  {currentStepIndex === 3 && (
                    <div className="space-y-6">
                      {/* HERO IMAGE BANNER FOR STEP 3 */}
                      <div className="border-gold-primary/30 relative h-36 w-full overflow-hidden rounded-2xl border shadow-lg sm:h-44">
                        <Image
                          src="/images/booking_stay_real.png"
                          alt="Authentic Luxury Heritage Hotel Interior"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute right-4 bottom-3 left-4 space-y-0.5 text-left">
                          <span className="text-gold-primary font-cinzel block text-[9px] font-bold tracking-widest uppercase">
                            ★ Step 4 • Accommodation Selection
                          </span>
                          <p className="font-cinzel text-sm leading-tight font-bold text-white sm:text-base">
                            Pre-Inspected Sattvik Sanctuaries Proximity to
                            Vishnupad
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-gold-primary font-cinzel block text-xs font-bold tracking-widest uppercase">
                          Step 4 of 5
                        </span>
                        <h2 className="font-cinzel text-xl font-bold text-white sm:text-2xl">
                          Select Accommodation Tier
                        </h2>
                        <p className="text-text-muted text-xs">
                          Every property is verified for pure Sattvik hygiene
                          and proximity to Vishnupad.
                        </p>
                      </div>

                      {/* Hotel Cards with Images */}
                      <div className="space-y-3">
                        {[
                          {
                            id: "heritage-3star",
                            title: "⭐⭐⭐ Heritage Stay",
                            tag: "Included • Our Recommendation",
                            subtitle:
                              "Clean, air-conditioned heritage hotel with Sattvik dining.",
                            extraPrice: 0,
                            image: "/images/journey_hotel.png",
                          },
                          {
                            id: "heritage-4star",
                            title: "⭐⭐⭐⭐ Heritage Resort",
                            tag: "Upgrade • More Comfort",
                            subtitle:
                              "Premium resort with serene courtyard & executive amenities.",
                            extraPrice: 8500,
                            image: "/images/booking_stay_real.png",
                          },
                          {
                            id: "royal-palace",
                            title: "⭐⭐⭐⭐⭐ Royal Palace Suite",
                            tag: "Royal • The Finest Experience",
                            subtitle:
                              "Bespoke palace suite with private dining & butler service.",
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
                                  tierId: hotel.id as
                                    | "heritage-3star"
                                    | "heritage-4star"
                                    | "royal-palace",
                                  title: hotel.title,
                                  subtitle: hotel.subtitle,
                                  upgradePricePerPerson: hotel.extraPrice,
                                })
                              }
                              className={cn(
                                "group flex cursor-pointer flex-col items-stretch overflow-hidden rounded-2xl border transition-all sm:flex-row",
                                isSelected
                                  ? "bg-gold-primary/10 border-gold-primary shadow-gold-glow"
                                  : "border-border hover:border-gold-primary/40 bg-black/30"
                              )}
                            >
                              <div className="border-border-gold/20 relative h-28 shrink-0 overflow-hidden border-b bg-gradient-to-br from-amber-950/60 via-slate-900 to-black sm:h-auto sm:w-40 sm:border-r sm:border-b-0">
                                <Image
                                  src={hotel.image}
                                  alt={hotel.title}
                                  fill
                                  unoptimized
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>

                              <div className="flex flex-1 items-center justify-between gap-4 p-4">
                                <div className="space-y-1">
                                  <span className="text-gold-primary font-cinzel block text-[10px] font-bold tracking-widest uppercase">
                                    {hotel.tag}
                                  </span>
                                  <h3 className="font-cinzel text-sm font-bold text-white">
                                    {hotel.title}
                                  </h3>
                                  <p className="text-text-muted text-xs">
                                    {hotel.subtitle}
                                  </p>
                                </div>

                                <div className="shrink-0 text-right">
                                  {isSelected ? (
                                    <span className="text-gold-primary font-cinzel text-xs font-bold">
                                      {hotel.extraPrice > 0
                                        ? `+₹${hotel.extraPrice.toLocaleString("en-IN")}`
                                        : "Included"}
                                    </span>
                                  ) : (
                                    <span className="text-text-muted font-cinzel text-xs">
                                      Select
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Rooms Selector */}
                      <div className="border-border-gold/20 flex items-center justify-between rounded-2xl border bg-black/40 p-4 pt-2">
                        <div>
                          <p className="font-cinzel text-xs font-bold text-white">
                            Rooms Needed
                          </p>
                          <p className="text-text-muted text-[10px]">
                            Double occupancy allocation
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateHotel({
                                roomsNeeded: Math.max(
                                  1,
                                  session.hotel.roomsNeeded - 1
                                ),
                              })
                            }
                            className="bg-surface border-border hover:border-gold-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-white"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-cinzel text-gold-primary w-4 text-center text-base font-bold">
                            {session.hotel.roomsNeeded}
                          </span>
                          <button
                            onClick={() =>
                              updateHotel({
                                roomsNeeded: session.hotel.roomsNeeded + 1,
                              })
                            }
                            className="bg-surface border-border hover:border-gold-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-white"
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
                      <div className="border-gold-primary/30 relative h-36 w-full overflow-hidden rounded-2xl border shadow-lg sm:h-44">
                        <Image
                          src="/images/booking_sanctum_real.png"
                          alt="Authentic Vishnupad Temple Ghats at Dawn"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute right-4 bottom-3 left-4 space-y-0.5 text-left">
                          <span className="text-gold-primary font-cinzel block text-[9px] font-bold tracking-widest uppercase">
                            ★ Step 5 • Pilgrim Details & Confirmation
                          </span>
                          <p className="font-cinzel text-sm leading-tight font-bold text-white sm:text-base">
                            Finalizing Your Sacred Reservation for Gaya Sanctum
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-gold-primary font-cinzel block text-xs font-bold tracking-widest uppercase">
                          Step 5 of 5
                        </span>
                        <h2 className="font-cinzel text-xl font-bold text-white sm:text-2xl">
                          Pilgrim Contact Details
                        </h2>
                        <p className="text-text-muted text-xs">
                          Provide your details so our senior Gayawal coordinator
                          can reach you.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="font-cinzel text-gold-primary text-xs font-bold">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Ramesh Sharma"
                            value={session.customer.name}
                            onChange={(e) =>
                              updateCustomer({ name: e.target.value })
                            }
                            className="border-border-gold/30 focus:border-gold-primary w-full rounded-xl border bg-black/60 p-3 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-cinzel text-gold-primary text-xs font-bold">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={session.customer.phone}
                            onChange={(e) =>
                              updateCustomer({ phone: e.target.value })
                            }
                            className="border-border-gold/30 focus:border-gold-primary w-full rounded-xl border bg-black/60 p-3 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="font-cinzel text-gold-primary text-xs font-bold">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="ramesh@example.com"
                            value={session.customer.email}
                            onChange={(e) =>
                              updateCustomer({ email: e.target.value })
                            }
                            className="border-border-gold/30 focus:border-gold-primary w-full rounded-xl border bg-black/60 p-3 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-cinzel text-gold-primary text-xs font-bold">
                            City
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Mumbai"
                            value={session.customer.city}
                            onChange={(e) =>
                              updateCustomer({ city: e.target.value })
                            }
                            className="border-border-gold/30 focus:border-gold-primary w-full rounded-xl border bg-black/60 p-3 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-cinzel text-gold-primary text-xs font-bold">
                            Country
                          </label>
                          <input
                            type="text"
                            value={session.customer.country}
                            onChange={(e) =>
                              updateCustomer({ country: e.target.value })
                            }
                            className="border-border-gold/30 focus:border-gold-primary w-full rounded-xl border bg-black/60 p-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* TRUST BOOSTER SECTION */}
                      <div className="border-border-gold/20 space-y-3 rounded-2xl border bg-black/40 p-4">
                        <span className="text-gold-primary font-cinzel block text-[10px] font-bold tracking-widest uppercase">
                          Sacred Trust Commitments
                        </span>
                        <div className="text-text-secondary grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                          <div className="flex items-center gap-1.5">
                            <Check className="text-gold-primary h-3.5 w-3.5 shrink-0" />
                            <span>Secure Reservation</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="text-gold-primary h-3.5 w-3.5 shrink-0" />
                            <span>No Hidden Charges</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="text-gold-primary h-3.5 w-3.5 shrink-0" />
                            <span>Free Cancellation</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="text-gold-primary h-3.5 w-3.5 shrink-0" />
                            <span>Dedicated Coordinator</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="text-gold-primary h-3.5 w-3.5 shrink-0" />
                            <span>WhatsApp Support</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="text-gold-primary h-3.5 w-3.5 shrink-0" />
                            <span>5000+ Families</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* NAVIGATION BUTTONS BAR */}
              <div className="border-border-gold/20 flex items-center justify-between border-t pt-6">
                <button
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className={cn(
                    "font-cinzel flex cursor-pointer items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all",
                    currentStepIndex === 0
                      ? "text-text-muted cursor-not-allowed border-transparent opacity-30"
                      : "border-border hover:border-gold-primary text-white"
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
                    className="bg-gold-gradient font-cinzel shadow-gold-glow flex cursor-pointer items-center gap-2 rounded-full px-8 py-3 text-xs font-bold tracking-widest text-black uppercase transition-all hover:opacity-90"
                  >
                    <Heart className="h-4 w-4 fill-black" />
                    <span>Reserve My Pilgrimage</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE DESKTOP STICKY LIVE PREVIEW (5 COLUMNS) */}
          <div className="sticky top-8 space-y-4 lg:col-span-5">
            <GlassCard
              glow
              borderGold
              className="bg-surface/80 space-y-6 overflow-hidden rounded-3xl p-6 backdrop-blur-xl"
            >
              {/* SUMMARY HERO PHOTO BANNER */}
              <div className="border-gold-primary/30 relative h-28 w-full overflow-hidden rounded-2xl border shadow-md">
                <Image
                  src="/images/booking_sanctum_real.png"
                  alt="Authentic Vishnupad Sanctum"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute right-3 bottom-2 left-3 flex items-center justify-between">
                  <span className="text-gold-primary font-cinzel border-gold-primary/30 rounded-full border bg-black/80 px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase">
                    ★ Your Sacred Sanctuary
                  </span>
                </div>
              </div>

              <div className="border-border-gold/20 flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-gold-primary font-cinzel block text-[10px] font-bold tracking-widest uppercase">
                    Live Pilgrimage Preview
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-white">
                    YOUR EXPERIENCE
                  </h3>
                </div>
                <div className="bg-gold-primary/10 border-gold-primary/30 text-gold-primary flex h-8 w-8 items-center justify-center rounded-full border">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>

              {/* LIVE ITEM SUMMARY LIST */}
              <div className="space-y-4 text-xs">
                {/* Package */}
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <p className="font-cinzel font-bold text-white">
                      {session.package.title}
                    </p>
                    <p className="text-text-muted text-[11px]">
                      {session.package.duration}
                    </p>
                  </div>
                  <span className="text-gold-primary font-cinzel font-bold">
                    ₹{session.package.startingPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Family */}
                <div className="border-border-gold/10 flex items-center justify-between border-t pt-2">
                  <span className="text-text-muted">Guests</span>
                  <span className="font-semibold text-white">
                    {session.pricing.familyTotalCount} Members (
                    {session.family.adults}A, {session.family.elders}E,{" "}
                    {session.family.children}C)
                  </span>
                </div>

                {/* Travel */}
                <div className="border-border-gold/10 flex items-center justify-between border-t pt-2">
                  <span className="text-text-muted">Travel Mode</span>
                  <span className="font-semibold text-white uppercase">
                    {session.travel.mode} ({session.travel.arrivalDate})
                  </span>
                </div>

                {/* Hotel */}
                <div className="border-border-gold/10 flex items-center justify-between border-t pt-2">
                  <span className="text-text-muted">Accommodation</span>
                  <div className="text-right">
                    <p className="font-semibold text-white">
                      {session.hotel.title}
                    </p>
                    {session.pricing.hotelUpgradeTotal > 0 && (
                      <p className="text-gold-primary text-[10px] font-bold">
                        +₹
                        {session.pricing.hotelUpgradeTotal.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* DYNAMIC TOTAL PRICE CARD */}
              <div className="border-gold-primary/40 space-y-1 rounded-2xl border bg-black/60 p-4 text-center shadow-inner">
                <span className="text-text-muted font-cinzel block text-[10px] font-bold tracking-widest uppercase">
                  Estimated Investment
                </span>
                <motion.div
                  key={session.pricing.grandTotal}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className="font-cinzel text-gold-primary text-3xl font-black tracking-tight"
                >
                  ₹{session.pricing.grandTotal.toLocaleString("en-IN")}
                </motion.div>
                <span className="text-text-muted block text-[10px] italic">
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
