"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Package,
  User,
  Heart,
  Users,
  CheckCircle2,
  ShieldCheck,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Lock,
} from "lucide-react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { cn } from "@/lib/utils";

export interface OnlinePindDaanWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: "essential" | "complete" | "family";
}

const PACKAGES = [
  {
    id: "essential",
    name: "Essential",
    badge: "Simple & Sacred",
    price: "₹5,100",
    numericPrice: 5100,
    desc: "A single, revered ancestral ritual with verified Gayawal Purohit at Vishnupad.",
    features: [
      "Pandit coordination at Vishnupad",
      "Required sacred samagri & pinda dravya",
      "Family Sankalpa chanting",
      "High-resolution ritual photographs",
      "Digital booking confirmation & receipt",
    ],
  },
  {
    id: "complete",
    name: "Complete",
    badge: "Most Selected",
    price: "₹5,100",
    numericPrice: 5100,
    isPopular: true,
    desc: "Multi-site coordination covering Vishnupad & Phalgu River with dedicated video updates.",
    features: [
      "Everything in Essential",
      "Multi-site coordination (Vishnupad & Phalgu River)",
      "Recorded video updates of Sankalpa & Pind Arpan",
      "Dedicated senior lineage coordinator",
      "Post-ritual documentation & blessings message",
    ],
  },
  {
    id: "family",
    name: "Family Lineage",
    badge: "Multiple Ancestors",
    price: "₹5,100",
    numericPrice: 5100,
    desc: "Extended rites for multiple ancestral generations across all three Gaya sanctums.",
    features: [
      "Everything in Complete",
      "Tri-Sanctum rites (Vishnupad, Phalgu, Akshayavat)",
      "Multiple gotra / paternal & maternal sankalpa",
      "Comprehensive archival video & photographic logs",
      "Priority Gayawal Purohit scheduling",
    ],
  },
];

// ─── 4-Step config ───────────────────────────────────────────────────────────
const STEPS = [
  {
    n: 1,
    title: "Package & Date",
    sub: "Choose your ritual package and preferred date",
  },
  {
    n: 2,
    title: "Your Details",
    sub: "Contact information for updates & confirmation",
  },
  {
    n: 3,
    title: "Ancestor Details",
    sub: "Sacred information for the Vedic Sankalpa",
  },
  {
    n: 4,
    title: "Review & Confirm",
    sub: "Verify and submit your sacred reservation",
  },
];

export default function OnlinePindDaanWizardModal({
  isOpen,
  onClose,
  initialPackage = "complete",
}: OnlinePindDaanWizardModalProps) {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState("");
  const [submitError, setSubmitError] = useState("");

  // ─── Form State ──────────────────────────────────────────────────────────
  // Step 1
  const [selectedPackage, setSelectedPackage] =
    useState<string>(initialPackage);
  const [selectedDate, setSelectedDate] = useState("");

  // Step 2
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Step 3
  const [ancestorName, setAncestorName] = useState("");
  const [relationship, setRelationship] = useState("Father");
  const [gotra, setGotra] = useState("");
  const [dontKnowGotra, setDontKnowGotra] = useState(false);
  const [sankalpPerformer, setSankalpPerformer] = useState(
    "Son (Eldest / Younger)"
  );
  const [participantCount, setParticipantCount] =
    useState("1-3 Family Members");
  const [specialReqs, setSpecialReqs] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState("");

  if (!isOpen) return null;

  const currentPkg =
    PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[1];

  const handleSpecialReqToggle = (item: string) => {
    setSpecialReqs((prev) =>
      prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/online-pind-daan/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          phone: userPhone,
          email: userEmail,
          packageId: selectedPackage,
          packageTitle: currentPkg.name,
          grandTotal: currentPkg.numericPrice,
          ritualDate: selectedDate || "Next auspicious Muhurat",
          ancestorName,
          relationship,
          gotra: dontKnowGotra ? "Kashyap (Universal)" : gotra || "Kashyap",
          sankalpPerformer,
          participantCount,
          specialReqs,
          customNotes,
        }),
      });

      const data = await res.json();

      if (data.success || data.reservationId) {
        setGeneratedBookingId(data.reservationId || `PTR-OPD-${Date.now()}`);
        setBookingConfirmed(true);

        // Background email notification (non-blocking)
        fetch("https://formsubmit.co/ajax/pitrayaenquiry@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `New Online Pind Daan: ${data.reservationId} — ${userName}`,
            BookingReference: data.reservationId,
            Package: currentPkg.name,
            Investment: currentPkg.price,
            PreferredDate: selectedDate || "Earliest auspicious Muhurat",
            DevoteeName: userName,
            DevoteePhone: userPhone,
            DevoteeEmail: userEmail,
            AncestorName: ancestorName,
            Relationship: relationship,
            Gotra: dontKnowGotra ? "Kashyap (Universal)" : gotra || "Kashyap",
          }),
        }).catch(() => {});
      } else {
        throw new Error(data.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or WhatsApp us."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setBookingConfirmed(false);
    setSubmitError("");
    onClose();
  };

  const canProceed = () => {
    if (step === 2)
      return userName.trim().length >= 2 && userPhone.trim().length >= 10;
    if (step === 3) return ancestorName.trim().length >= 2;
    return true;
  };

  // ─── Gold gradient (for consistent luxury feel inside the dark modal) ────
  const goldGrad = "linear-gradient(135deg,#d4af37,#f5e19c 50%,#b8860b)";

  return (
    <AnimatePresence>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
        style={{
          backgroundColor: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{
            background: "#110f0c",
            border: "1px solid rgba(212,175,55,0.25)",
            maxHeight: "90vh",
          }}
          data-lenis-prevent="true"
          role="dialog"
          aria-modal="true"
          aria-label="Online Pind Daan Booking"
        >
          {/* ─── Header ────────────────────────────────────────────────── */}
          <div
            className="sticky top-0 z-20 flex items-center justify-between px-5 py-4"
            style={{
              background: "#1a1510",
              borderBottom: "1px solid rgba(212,175,55,0.18)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]" />
              <div>
                <p className="font-cinzel text-[10px] font-bold tracking-[0.18em] text-[#d4af37] uppercase">
                  {bookingConfirmed
                    ? "Reservation Confirmed"
                    : `Online Pind Daan · Step ${step} of 4`}
                </p>
                {!bookingConfirmed && (
                  <p className="mt-0.5 text-[11px] text-[#8a7f72]">
                    {STEPS[step - 1]?.sub}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={resetAndClose}
              aria-label="Close booking modal"
              className="cursor-pointer rounded-full p-2 text-[#8a7f72] transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* ─── Progress bar ──────────────────────────────────────────── */}
          {!bookingConfirmed && (
            <div className="h-[3px] w-full bg-white/5">
              <div
                className="h-[3px] transition-all duration-400"
                style={{ width: `${(step / 4) * 100}%`, background: goldGrad }}
              />
            </div>
          )}

          {/* ─── Step pills ────────────────────────────────────────────── */}
          {!bookingConfirmed && (
            <div className="flex items-center gap-2 px-5 pt-4 pb-1">
              {STEPS.map((s) => (
                <div key={s.n} className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "font-cinzel flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold transition-all",
                      s.n < step
                        ? "bg-[#d4af37] text-black"
                        : s.n === step
                          ? "border border-[#d4af37]/50 bg-[#d4af37]/20 text-[#d4af37]"
                          : "border border-white/10 bg-white/5 text-[#555]"
                    )}
                  >
                    {s.n < step ? <CheckCircle2 className="h-3 w-3" /> : s.n}
                  </div>
                  <span
                    className={cn(
                      "font-cinzel hidden text-[10px] font-medium sm:block",
                      s.n === step
                        ? "text-[#d4af37]"
                        : s.n < step
                          ? "text-[#d4af37]/60"
                          : "text-[#444]"
                    )}
                  >
                    {s.title}
                  </span>
                  {s.n < 4 && (
                    <div className="hidden h-px w-4 bg-white/10 sm:block" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ─── Body ──────────────────────────────────────────────────── */}
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            {!bookingConfirmed ? (
              <>
                {/* ══════════════════════════════════════════════════════
                    STEP 1 — Package & Date
                ══════════════════════════════════════════════════════ */}
                {step === 1 && (
                  <div className="space-y-5">
                    {/* Package selection */}
                    <div className="space-y-2">
                      <h3 className="font-cinzel flex items-center gap-2 text-sm font-bold text-white">
                        <Package className="h-4 w-4 text-[#d4af37]" />
                        Select Your Ritual Package
                      </h3>
                      <div className="space-y-3">
                        {PACKAGES.map((pkg) => (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => setSelectedPackage(pkg.id)}
                            className={cn(
                              "flex w-full cursor-pointer items-start justify-between gap-3 rounded-xl border p-4 text-left transition-all",
                              selectedPackage === pkg.id
                                ? "border-[#d4af37]/60 bg-[#d4af37]/[0.08]"
                                : "border-white/10 bg-white/[0.03] hover:border-[#d4af37]/30"
                            )}
                          >
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-cinzel text-sm font-bold text-white">
                                  {pkg.name}
                                </span>
                                <span className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#d4af37] uppercase">
                                  {pkg.badge}
                                </span>
                              </div>
                              <p className="text-[11px] leading-relaxed text-[#8a7f72]">
                                {pkg.desc}
                              </p>
                              <ul className="space-y-0.5 pt-1">
                                {pkg.features.slice(0, 3).map((f, i) => (
                                  <li
                                    key={i}
                                    className="flex items-center gap-1.5 text-[11px] text-[#6e7f6a]"
                                  >
                                    <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="shrink-0 text-right">
                              <span className="font-cinzel text-base font-bold text-[#d4af37]">
                                {pkg.price}
                              </span>
                              <p className="mt-0.5 text-[10px] text-[#6a5f52]">
                                all-inclusive
                              </p>
                              {selectedPackage === pkg.id && (
                                <span className="mt-1.5 flex items-center justify-end gap-0.5 text-[10px] font-bold text-emerald-400">
                                  <CheckCircle2 className="h-3 w-3" /> Selected
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date selection */}
                    <div className="space-y-2">
                      <h3 className="font-cinzel flex items-center gap-2 text-sm font-bold text-white">
                        <Calendar className="h-4 w-4 text-[#d4af37]" />
                        Preferred Ritual Date
                      </h3>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {[
                          {
                            label: "Earliest Auspicious",
                            desc: "Nearest Shukla / Krishna Tithi",
                          },
                          {
                            label: "Upcoming Amavasya",
                            desc: "Most potent monthly tithi",
                          },
                          {
                            label: "Specific Death Anniversary",
                            desc: "Annual Shraddha / Punya Tithi",
                          },
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.label}
                            onClick={() => setSelectedDate(opt.label)}
                            className={cn(
                              "cursor-pointer rounded-xl border p-3 text-left transition-all",
                              selectedDate === opt.label
                                ? "border-[#d4af37]/60 bg-[#d4af37]/[0.08]"
                                : "border-white/10 bg-white/[0.03] hover:border-[#d4af37]/25"
                            )}
                          >
                            <p className="text-[11px] font-bold text-[#d4af37]">
                              {opt.label}
                            </p>
                            <p className="mt-0.5 text-[10px] text-[#6a5f52]">
                              {opt.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                      <input
                        type="date"
                        value={
                          typeof selectedDate === "string" &&
                          selectedDate.match(/^\d{4}/)
                            ? selectedDate
                            : ""
                        }
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        placeholder="Or pick a specific date"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-[#5a5248] focus:border-[#d4af37]/60 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* ══════════════════════════════════════════════════════
                    STEP 2 — Your Contact Details
                ══════════════════════════════════════════════════════ */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <h3 className="font-cinzel flex items-center gap-2 text-sm font-bold text-white">
                        <User className="h-4 w-4 text-[#d4af37]" />
                        Your Contact Details
                      </h3>
                      <p className="text-[11px] text-[#8a7f72]">
                        Booking confirmation, ritual photographs, and
                        coordinator updates will be sent here.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#a09080]">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full rounded-xl border border-[#d4af37]/25 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-[#5a5248] focus:border-[#d4af37]/60 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-[#a09080]">
                            WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className="w-full rounded-xl border border-[#d4af37]/25 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-[#5a5248] focus:border-[#d4af37]/60 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-[#a09080]">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="rahul@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full rounded-xl border border-[#d4af37]/25 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-[#5a5248] focus:border-[#d4af37]/60 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[11px] text-[#8a7f72]">
                        <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        Your personal and family details are encrypted and never
                        shared.
                      </div>
                    </div>
                  </div>
                )}

                {/* ══════════════════════════════════════════════════════
                    STEP 3 — Ancestor Details + Participants + Special Reqs
                ══════════════════════════════════════════════════════ */}
                {step === 3 && (
                  <div className="space-y-5">
                    {/* Ancestor info */}
                    <div className="space-y-1.5">
                      <h3 className="font-cinzel flex items-center gap-2 text-sm font-bold text-white">
                        <Heart className="h-4 w-4 text-[#d4af37]" />
                        Departed Ancestor Details
                      </h3>
                      <p className="text-[11px] text-[#8a7f72]">
                        These names will be solemnly recited during the Vedic
                        Sankalpa.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#a09080]">
                          Name of Ancestor / Departed Soul *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Late Shri Ramesh Chandra Sharma"
                          value={ancestorName}
                          onChange={(e) => setAncestorName(e.target.value)}
                          className="w-full rounded-xl border border-[#d4af37]/25 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-[#5a5248] focus:border-[#d4af37]/60 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-[#a09080]">
                            Relationship to You
                          </label>
                          <select
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                            className="w-full rounded-xl border border-[#d4af37]/25 bg-[#1a1510] px-4 py-3 text-sm text-white focus:border-[#d4af37]/60 focus:outline-none"
                          >
                            <option value="Father">Father (Pitra)</option>
                            <option value="Mother">Mother (Matra)</option>
                            <option value="Grandfather / Grandmother">
                              Grandparents (Dada / Dadi)
                            </option>
                            <option value="Maternal Grandparents">
                              Maternal Grandparents
                            </option>
                            <option value="Spouse">
                              Spouse (Pati / Patni)
                            </option>
                            <option value="All Ancestors (Sarva Pitra)">
                              All Ancestors (Sarva Pitra)
                            </option>
                            <option value="Other Relative">
                              Other Relative
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-[#a09080]">
                            Family Gotra
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kashyap, Bharadwaj…"
                            disabled={dontKnowGotra}
                            value={
                              dontKnowGotra
                                ? "Kashyap (Universal Vedic Gotra)"
                                : gotra
                            }
                            onChange={(e) => setGotra(e.target.value)}
                            className={cn(
                              "w-full rounded-xl border border-[#d4af37]/25 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-[#5a5248] focus:border-[#d4af37]/60 focus:outline-none",
                              dontKnowGotra && "cursor-not-allowed opacity-50"
                            )}
                          />
                        </div>
                      </div>

                      {/* Don't know gotra */}
                      <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/[0.05] p-3">
                        <input
                          type="checkbox"
                          checked={dontKnowGotra}
                          onChange={(e) => setDontKnowGotra(e.target.checked)}
                          className="mt-0.5 h-4 w-4 accent-[#d4af37]"
                        />
                        <div className="text-[11px]">
                          <span className="block font-semibold text-[#d4af37]">
                            I don&apos;t know our family Gotra
                          </span>
                          <span className="text-[#6a5f52]">
                            Universal Kashyap Gotra will be invoked —
                            spiritually 100% complete per Hindu Shastras.
                          </span>
                        </div>
                      </label>

                      {/* Sankalpa performer */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-[#a09080]">
                          <Users className="mr-1 inline h-3.5 w-3.5 text-[#d4af37]" />
                          Who Performs the Remote Sankalpa?
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {[
                            "Son (Eldest / Younger)",
                            "Daughter",
                            "Grandson / Granddaughter",
                            "Spouse",
                            "Brother / Sister",
                            "Family Representative",
                          ].map((role) => (
                            <button
                              type="button"
                              key={role}
                              onClick={() => setSankalpPerformer(role)}
                              className={cn(
                                "cursor-pointer rounded-xl border p-2.5 text-left text-[11px] font-medium transition-all",
                                sankalpPerformer === role
                                  ? "border-[#d4af37]/60 bg-[#d4af37]/[0.08] text-white"
                                  : "border-white/10 bg-white/[0.03] text-[#6a5f52] hover:border-[#d4af37]/30 hover:text-white"
                              )}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Participants count */}
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#a09080]">
                          Family Members Joining Prayers from Home
                        </label>
                        <select
                          value={participantCount}
                          onChange={(e) => setParticipantCount(e.target.value)}
                          className="w-full rounded-xl border border-[#d4af37]/25 bg-[#1a1510] px-4 py-3 text-sm text-white focus:border-[#d4af37]/60 focus:outline-none"
                        >
                          <option value="1 Member (Individual)">
                            1 Devotee (Individual)
                          </option>
                          <option value="2-4 Family Members">
                            2 – 4 Family Members
                          </option>
                          <option value="5-8 Extended Family Members">
                            5 – 8 Extended Family Members
                          </option>
                          <option value="Entire Lineage (Joint Family)">
                            Entire Lineage (Joint Family)
                          </option>
                        </select>
                      </div>

                      {/* Special requirements */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-[#a09080]">
                          <Sparkles className="mr-1 inline h-3.5 w-3.5 text-[#d4af37]" />
                          Special Requirements (Optional)
                        </label>
                        <div className="space-y-2">
                          {[
                            {
                              id: "elderly",
                              label:
                                "Elderly family member taking Sankalpa from home",
                            },
                            {
                              id: "language",
                              label:
                                "Need Hindi / Bengali / Telugu / Tamil / Gujarati coordinator",
                            },
                            {
                              id: "multiple",
                              label:
                                "Multiple ancestors across different death years",
                            },
                            {
                              id: "call",
                              label:
                                "Request a pre-ritual call with coordinator",
                            },
                            {
                              id: "prasad",
                              label:
                                "Prasad & sacred Raksha Sutra delivery to home",
                            },
                          ].map((item) => (
                            <label
                              key={item.id}
                              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-[11px] text-[#8a7f72] transition-colors hover:border-[#d4af37]/25"
                            >
                              <input
                                type="checkbox"
                                checked={specialReqs.includes(item.label)}
                                onChange={() =>
                                  handleSpecialReqToggle(item.label)
                                }
                                className="h-3.5 w-3.5 rounded accent-[#d4af37]"
                              />
                              {item.label}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#a09080]">
                          Custom Instructions for the Pandit (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Please perform tarpan facing south at Phalgu river."
                          value={customNotes}
                          onChange={(e) => setCustomNotes(e.target.value)}
                          className="w-full resize-none rounded-xl border border-[#d4af37]/25 bg-white/[0.05] px-4 py-2.5 text-[11px] text-white placeholder-[#5a5248] focus:border-[#d4af37]/60 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[11px] text-[#8a7f72]">
                        <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                        <span>
                          Daughters, granddaughters and spouses are fully
                          entitled to perform ancestral rites per the Garuda
                          Purana and authentic Vedic traditions.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ══════════════════════════════════════════════════════
                    STEP 4 — Review & Confirm
                ══════════════════════════════════════════════════════ */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <h3 className="font-cinzel flex items-center gap-2 text-sm font-bold text-white">
                        <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                        Review Your Sacred Reservation
                      </h3>
                      <p className="text-[11px] text-[#8a7f72]">
                        Please verify the details before confirming your
                        booking.
                      </p>
                    </div>

                    <div className="space-y-4 rounded-xl border border-[#d4af37]/25 bg-white/[0.03] p-4 text-xs">
                      {/* Package & Price */}
                      <div className="flex items-start justify-between border-b border-white/10 pb-3">
                        <div>
                          <span className="text-[10px] font-bold text-[#6a5f52] uppercase">
                            Package
                          </span>
                          <p className="font-cinzel mt-0.5 text-sm font-bold text-[#d4af37]">
                            {currentPkg.name} Online Pind Daan
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-[#6a5f52] uppercase">
                            Total
                          </span>
                          <p className="font-cinzel mt-0.5 text-base font-bold text-white">
                            {currentPkg.price}
                          </p>
                        </div>
                      </div>

                      {/* Details grid */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[11px]">
                        {[
                          {
                            label: "Ritual Date",
                            value: selectedDate || "Next Auspicious Tithi",
                          },
                          { label: "Devotee", value: userName || "—" },
                          { label: "WhatsApp", value: userPhone || "—" },
                          { label: "Email", value: userEmail || "—" },
                          { label: "Ancestor", value: ancestorName || "—" },
                          { label: "Relationship", value: relationship },
                          {
                            label: "Gotra",
                            value: dontKnowGotra
                              ? "Kashyap (Universal)"
                              : gotra || "Kashyap",
                          },
                          { label: "Sankalpa by", value: sankalpPerformer },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <span className="block text-[10px] text-[#6a5f52]">
                              {label}:
                            </span>
                            <strong className="text-white">{value}</strong>
                          </div>
                        ))}
                      </div>

                      {specialReqs.length > 0 && (
                        <div className="border-t border-white/10 pt-3">
                          <span className="mb-1 block text-[10px] font-bold text-[#6a5f52] uppercase">
                            Special Requirements
                          </span>
                          <p className="text-[11px] text-white">
                            {specialReqs.join(" · ")}
                          </p>
                        </div>
                      )}

                      <div className="flex items-start gap-2 rounded-lg border border-t border-[#d4af37]/20 border-white/10 bg-[#d4af37]/[0.07] p-2.5 pt-3 text-[11px] text-[#8a7f72]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        Authentic Gayawal Purohit coordination · Complete puja
                        samagri · Sankalpa recitations · Photo/Video
                        documentation
                      </div>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: "🔒", text: "Secure & Encrypted" },
                        { icon: "⚡", text: "15-Min Coordinator Call" },
                        { icon: "📸", text: "Photo Documentation" },
                        { icon: "🏛️", text: "Hereditary Gayawal Pandits" },
                      ].map((b) => (
                        <div
                          key={b.text}
                          className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] p-2 text-[10px] text-[#8a7f72]"
                        >
                          <span>{b.icon}</span>
                          {b.text}
                        </div>
                      ))}
                    </div>

                    {/* Error message */}
                    {submitError && (
                      <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-[11px] text-red-400">
                        ⚠ {submitError}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* ════════════════════════════════════════════════════════
                 CONFIRMATION SCREEN
              ════════════════════════════════════════════════════════ */
              <div className="space-y-5 py-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-1.5">
                  <span className="font-cinzel text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">
                    Booking Registered
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white">
                    Pranam — Your Pind Daan is Reserved
                  </h3>
                  <p className="mx-auto max-w-sm text-[11px] text-[#8a7f72]">
                    Your booking has been saved in our system. A coordinator
                    will contact you within 15 minutes.
                  </p>
                </div>

                {/* Booking card */}
                <div className="mx-auto max-w-sm space-y-3 rounded-xl border border-[#d4af37]/25 bg-white/[0.03] p-4 text-left">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-[10px] text-[#6a5f52]">
                      Booking Reference:
                    </span>
                    <span className="font-mono text-sm font-bold text-[#d4af37]">
                      {generatedBookingId}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="block text-[10px] text-[#6a5f52]">
                        Package:
                      </span>
                      <strong className="text-white">{currentPkg.name}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#6a5f52]">
                        Total Dakshina:
                      </span>
                      <strong className="text-[#d4af37]">
                        {currentPkg.price}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#6a5f52]">
                        Ancestor:
                      </span>
                      <strong className="text-white">
                        {ancestorName || "Family Lineage"}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#6a5f52]">
                        Ritual Site:
                      </span>
                      <strong className="text-white">Vishnupad, Gaya</strong>
                    </div>
                  </div>
                </div>

                {/* Next steps */}
                <div className="mx-auto max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
                  <h4 className="font-cinzel mb-2 text-[10px] font-bold tracking-wider text-[#d4af37] uppercase">
                    What Happens Next?
                  </h4>
                  <ol className="list-decimal space-y-1.5 pl-4 text-[11px] text-[#8a7f72]">
                    <li>
                      Pitraya coordinator contacts you on WhatsApp within 15
                      minutes.
                    </li>
                    <li>
                      Gotra & Sankalpa details verified with the Panchangam.
                    </li>
                    <li>Gayawal Pandit and exact Muhurat confirmed.</li>
                    <li>
                      Ritual performed in Gaya with complete Vedic procedures.
                    </li>
                    <li>
                      Photos, video updates and blessings delivered to your
                      family.
                    </li>
                  </ol>
                </div>

                {/* Action buttons */}
                <div className="mx-auto flex max-w-sm flex-col justify-center gap-3 sm:flex-row">
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Namaste! I just reserved Online Pind Daan — Booking ID: ${generatedBookingId}. Please assist with my Sankalpa details.`
                      );
                      window.open(
                        `https://wa.me/918434457228?text=${msg}`,
                        "_blank"
                      );
                    }}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold text-black transition-all hover:bg-[#20bd5a]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat with Coordinator
                  </button>
                  <button
                    onClick={resetAndClose}
                    className="cursor-pointer rounded-xl border border-white/15 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-white/5"
                  >
                    Back to Pitraya
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─── Footer Navigation ─────────────────────────────────────── */}
          {!bookingConfirmed && (
            <div
              className="sticky bottom-0 z-20 flex items-center justify-between px-5 py-4"
              style={{
                background: "#1a1510",
                borderTop: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#8a7f72] transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {/* Price reminder on step 1 */}
                {step === 1 && (
                  <span className="font-cinzel hidden text-xs font-bold text-[#d4af37] sm:block">
                    {currentPkg.price}
                  </span>
                )}

                {step < 4 ? (
                  <PrimaryButton
                    size="sm"
                    disabled={!canProceed()}
                    onClick={() => {
                      if (step === 2 && !userName.trim()) {
                        alert("Please enter your full name to continue.");
                        return;
                      }
                      if (step === 2 && userPhone.trim().length < 10) {
                        alert(
                          "Please enter a valid WhatsApp number to continue."
                        );
                        return;
                      }
                      if (step === 3 && !ancestorName.trim()) {
                        alert(
                          "Please enter the departed ancestor's name to continue."
                        );
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="font-cinzel px-6 py-2.5 text-xs font-bold tracking-wider"
                  >
                    <span>Continue</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    size="sm"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="font-cinzel shadow-gold-glow px-7 py-2.5 text-xs font-bold tracking-wider"
                  >
                    {isSubmitting
                      ? "Securing Reservation…"
                      : `Confirm & Book (${currentPkg.price}) →`}
                  </PrimaryButton>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
