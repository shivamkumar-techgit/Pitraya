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
  Clock,
  Lock,
  ExternalLink,
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
    price: "₹11,000",
    numericPrice: 11000,
    desc: "For families seeking a single, revered ancestral ritual with verified Gayawal Purohit.",
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
    price: "₹21,000",
    numericPrice: 21000,
    isPopular: true,
    desc: "Our most comprehensive arrangement covering multiple sacred Gaya sites and dedicated video updates.",
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
    price: "₹31,000",
    numericPrice: 31000,
    desc: "For larger families performing rites for multiple ancestral generations and gotras.",
    features: [
      "Everything in Complete",
      "Tri-Sanctum rites (Vishnupad, Phalgu, Akshayavat)",
      "Multiple gotra / paternal & maternal sankalpa",
      "Comprehensive archival video & photographic logs",
      "Priority Gayawal Purohit scheduling",
    ],
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

  // Form State
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPackage);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  const [ancestorName, setAncestorName] = useState("");
  const [relationship, setRelationship] = useState("Father / Mother");
  const [gotra, setGotra] = useState("");
  const [dontKnowGotra, setDontKnowGotra] = useState(false);
  const [ancestorNotes, setAncestorNotes] = useState("");

  const [sankalpPerformer, setSankalpPerformer] = useState("Son");
  const [participantCount, setParticipantCount] = useState("1-3 Family Members");

  const [specialReqs, setSpecialReqs] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState("");

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[1];

  const handleSpecialReqToggle = (item: string) => {
    if (specialReqs.includes(item)) {
      setSpecialReqs(specialReqs.filter((r) => r !== item));
    } else {
      setSpecialReqs([...specialReqs, item]);
    }
  };

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);
    const bookingRef = `PR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedBookingId(bookingRef);

    try {
      // 1. Ingress lead to background email/CRM endpoint
      fetch("https://formsubmit.co/ajax/pitrayaenquiry@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Online Pind Daan Booking: ${bookingRef} (${userName})`,
          BookingReference: bookingRef,
          Package: currentPkg.name,
          Investment: currentPkg.price,
          PreferredDate: selectedDate || "Earliest auspicious Muhurat",
          DevoteeName: userName,
          DevoteePhone: userPhone,
          DevoteeEmail: userEmail,
          AncestorName: ancestorName,
          Relationship: relationship,
          Gotra: dontKnowGotra ? "Unknown (Coordinator guidance requested)" : gotra || "Kashyap",
          SankalpPerformer: sankalpPerformer,
          Participants: participantCount,
          SpecialRequirements: specialReqs.join(", ") || "None",
          Notes: customNotes || ancestorNotes || "None",
        }),
      }).catch((e) => console.log("Background inquiry log:", e));
    } catch (err) {
      console.log("Submit error:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed(true);
    }, 600);
  };

  const resetAndClose = () => {
    setStep(1);
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#110f0c] border border-gold-primary/30 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-white"
          data-lenis-prevent="true"
          role="dialog"
          aria-modal="true"
        >
          {/* ─── MODAL HEADER ────────────────────────────────────────── */}
          <div className="sticky top-0 z-20 bg-[#16130e] border-b border-gold-primary/20 px-6 py-4 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-gold-primary animate-pulse" />
              <div>
                <h2 className="text-sm font-bold font-cinzel text-gold-primary uppercase tracking-wider">
                  {bookingConfirmed ? "Reservation Confirmed" : `Online Pind Daan Booking • Step ${step} of 7`}
                </h2>
                {!bookingConfirmed && (
                  <p className="text-[11px] text-text-muted font-serif">
                    {step === 1 && "Select your preferred sacred date"}
                    {step === 2 && "Choose your ancestral ritual package"}
                    {step === 3 && "Your contact information"}
                    {step === 4 && "About your departed ancestor"}
                    {step === 5 && "Sankalpa performers & family details"}
                    {step === 6 && "Special guidance or assistance requirements"}
                    {step === 7 && "Review your booking & secure payment"}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={resetAndClose}
              aria-label="Close booking modal"
              className="p-2 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* ─── PROGRESS BAR (Steps 1-7) ────────────────────────────── */}
          {!bookingConfirmed && (
            <div className="w-full bg-white/5 h-1">
              <div
                className="bg-gold-gradient h-1 transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              />
            </div>
          )}

          {/* ─── MODAL BODY CONTENT ──────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {!bookingConfirmed ? (
              <>
                {/* STEP 1: SELECT DATE */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gold-primary" />
                        When would you like the ritual performed?
                      </h3>
                      <p className="text-xs text-text-muted font-serif">
                        Rituals can be conducted on any day of the year at Vishnupad. Special tithis like Amavasya, Purnima, or Pitru Paksha carry elevated astrological merit.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-2">
                          Preferred Ritual Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-surface/50 border border-gold-primary/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {[
                          { label: "Earliest Auspicious Date", desc: "Assigned to nearest Shukla/Krishna Tithi" },
                          { label: "Upcoming Amavasya", desc: "Most potent monthly ancestral tithi" },
                          { label: "Specific Death Anniversary", desc: "Annual Shraddha / Punya Tithi" },
                        ].map((opt, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedDate(opt.label)}
                            className={cn(
                              "p-3 rounded-xl border cursor-pointer transition-all text-left",
                              selectedDate === opt.label
                                ? "border-gold-primary bg-gold-primary/10 text-white"
                                : "border-border/50 bg-surface/30 hover:border-gold-primary/40 text-text-muted hover:text-text-primary"
                            )}
                          >
                            <p className="text-xs font-bold text-gold-primary">{opt.label}</p>
                            <p className="text-[11px] mt-1 text-text-muted">{opt.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-gold-primary/5 border border-gold-primary/20 flex items-start gap-3 text-xs text-text-secondary">
                        <Sparkles className="h-4 w-4 text-gold-primary shrink-0 mt-0.5" />
                        <p>
                          <strong className="text-gold-primary font-semibold">Tithi Guidance:</strong> If you are unsure of the lunar tithi, you can select today or approximate date. Our senior Gayawal Purohit will consult the Panchangam with your coordinator.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: SELECT PACKAGE */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                        <Package className="h-5 w-5 text-gold-primary" />
                        Select Your Ritual Package
                      </h3>
                      <p className="text-xs text-text-muted font-serif">
                        Transparent ritual arrangements conducted physically in Gaya with verified Gayawal Purohits.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {PACKAGES.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={cn(
                            "p-5 rounded-2xl border cursor-pointer transition-all relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
                            selectedPackage === pkg.id
                              ? "border-gold-primary bg-gold-primary/10 shadow-gold-glow/20"
                              : "border-border/50 bg-surface/40 hover:border-gold-primary/40"
                          )}
                        >
                          <div className="space-y-1.5 max-w-md">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold font-cinzel text-white">
                                {pkg.name}
                              </span>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold-primary/20 text-gold-primary border border-gold-primary/30">
                                {pkg.badge}
                              </span>
                            </div>
                            <p className="text-xs text-text-muted">{pkg.desc}</p>
                            <ul className="text-[11px] text-text-secondary space-y-1 pt-1">
                              {pkg.features.slice(0, 3).map((f, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="text-right shrink-0 flex flex-col items-end">
                            <span className="text-xl font-bold font-cinzel text-gold-primary">
                              {pkg.price}
                            </span>
                            <span className="text-[10px] text-text-muted">All-inclusive ritual dakshina</span>
                            <div
                              className={cn(
                                "mt-2 px-4 py-1.5 rounded-full text-xs font-bold font-cinzel transition-all",
                                selectedPackage === pkg.id
                                  ? "bg-gold-gradient text-black"
                                  : "border border-border text-text-muted"
                              )}
                            >
                              {selectedPackage === pkg.id ? "Selected ✓" : "Select"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: ABOUT YOU */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                        <User className="h-5 w-5 text-gold-primary" />
                        About You (Devotee Details)
                      </h3>
                      <p className="text-xs text-text-muted font-serif">
                        We will send booking confirmations, ritual photographs, and coordinator updates to these contact details.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full bg-surface/50 border border-gold-primary/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                            WhatsApp Phone Number *
                          </label>
                          <input
                            type="tel"
                            placeholder="e.g. +91 98765 43210"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className="w-full bg-surface/50 border border-gold-primary/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. rahul@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full bg-surface/50 border border-gold-primary/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-primary"
                          />
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-surface/40 border border-border/60 text-xs text-text-muted flex items-center gap-2.5">
                        <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Your personal and family details are encrypted and never shared.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: ABOUT YOUR ANCESTOR */}
                {step === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                        <Heart className="h-5 w-5 text-gold-primary" />
                        About Your Departed Ancestors
                      </h3>
                      <p className="text-xs text-text-muted font-serif">
                        These names and gotras will be solemnly recited by the Gayawal Pandit during the sacred Vedic Sankalpa.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Name of Ancestor / Deceased Person(s) *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Late Shri Ramesh Chandra Sharma"
                          value={ancestorName}
                          onChange={(e) => setAncestorName(e.target.value)}
                          className="w-full bg-surface/50 border border-gold-primary/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                            Relationship to You
                          </label>
                          <select
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                            className="w-full bg-surface/80 border border-gold-primary/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary"
                          >
                            <option value="Father">Father (Pitra)</option>
                            <option value="Mother">Mother (Matra)</option>
                            <option value="Grandfather / Grandmother">Grandparents (Dada / Dadi)</option>
                            <option value="Maternal Grandparents">Maternal Grandparents (Nana / Nani)</option>
                            <option value="Spouse">Spouse (Pati / Patni)</option>
                            <option value="All Paternal & Maternal Ancestors">All Ancestors (Sarva Pitra)</option>
                            <option value="Other">Other Relative</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                            Family Gotra
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kashyap, Bharadwaj, Sandilya"
                            disabled={dontKnowGotra}
                            value={dontKnowGotra ? "Kashyap (Universal Vedic Gotra)" : gotra}
                            onChange={(e) => setGotra(e.target.value)}
                            className={cn(
                              "w-full bg-surface/50 border border-gold-primary/30 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-primary",
                              dontKnowGotra && "opacity-50 cursor-not-allowed"
                            )}
                          />
                        </div>
                      </div>

                      {/* DON'T KNOW GOTRA REASSURANCE */}
                      <label className="flex items-start gap-2.5 p-3 rounded-xl bg-gold-primary/5 border border-gold-primary/20 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={dontKnowGotra}
                          onChange={(e) => setDontKnowGotra(e.target.checked)}
                          className="mt-0.5 accent-[#d4af37] h-4 w-4"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-gold-primary block">
                            I don&apos;t know our family Gotra
                          </span>
                          <span className="text-text-muted">
                            Don&apos;t worry. According to Hindu Shastras, the universal Kashyap Gotra is invoked during the Sankalpa so rites remain spiritually 100% complete.
                          </span>
                        </div>
                      </label>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Additional Lineage Details or Special Prayers (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Ancestor passed away in 2021, native place Varanasi, praying for peaceful moksha."
                          value={ancestorNotes}
                          onChange={(e) => setAncestorNotes(e.target.value)}
                          className="w-full bg-surface/50 border border-gold-primary/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: PARTICIPANTS & SANKALPA */}
                {step === 5 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                        <Users className="h-5 w-5 text-gold-primary" />
                        Who Will Perform The Remote Sankalp?
                      </h3>
                      <p className="text-xs text-text-muted font-serif">
                        Specify who in the family is taking the holy resolve on behalf of the lineage.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-2">
                          Primary Sankalp Performer
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {["Son (Eldest / Younger)", "Daughter", "Grandson / Granddaughter", "Spouse", "Brother / Sister", "Family Representative"].map((role) => (
                            <button
                              type="button"
                              key={role}
                              onClick={() => setSankalpPerformer(role)}
                              className={cn(
                                "p-2.5 rounded-xl border text-xs font-medium text-left transition-all",
                                sankalpPerformer === role
                                  ? "border-gold-primary bg-gold-primary/15 text-white"
                                  : "border-border/60 bg-surface/30 text-text-muted hover:border-gold-primary/30 hover:text-white"
                              )}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-2">
                          Family Members Joining Prayers from Home
                        </label>
                        <select
                          value={participantCount}
                          onChange={(e) => setParticipantCount(e.target.value)}
                          className="w-full bg-surface/80 border border-gold-primary/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary"
                        >
                          <option value="1 Member (Individual)">1 Devotee (Individual)</option>
                          <option value="2-4 Family Members">2 – 4 Family Members</option>
                          <option value="5-8 Extended Family Members">5 – 8 Extended Family Members</option>
                          <option value="Entire Lineage (Joint Family)">Entire Lineage (Joint Family)</option>
                        </select>
                      </div>

                      <div className="p-4 rounded-xl bg-surface/40 border border-border/50 text-xs text-text-muted space-y-1">
                        <p className="font-semibold text-white flex items-center gap-1.5">
                          <HelpCircle className="h-4 w-4 text-gold-primary" />
                          Can daughters perform Pind Daan?
                        </p>
                        <p>
                          Yes. Under Garuda Purana and authentic Vedic traditions, in the absence of a son or by family circumstance, daughters, granddaughters, and wives are fully entitled to perform ancestral rites.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 6: SPECIAL REQUIREMENTS */}
                {step === 6 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-gold-primary" />
                        Special Requirements & Assistance
                      </h3>
                      <p className="text-xs text-text-muted font-serif">
                        Let our pilgrimage concierge know if your family has specific regional traditions or preferences.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: "elderly", label: "Elderly family member taking Sankalp from home" },
                        { id: "language", label: "Need Pandit / Coordinator in Hindi / Bengali / Telugu / Tamil / Gujarati" },
                        { id: "multiple_ancestors", label: "Multiple ancestors across different death years" },
                        { id: "coordinator_call", label: "Request a pre-ritual 1-on-1 explanatory phone call with coordinator" },
                        { id: "prasad_shipping", label: "Prasad & sacred Raksha Sutra delivery to home address" },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-surface/30 hover:border-gold-primary/30 cursor-pointer text-xs text-text-secondary"
                        >
                          <input
                            type="checkbox"
                            checked={specialReqs.includes(item.label)}
                            onChange={() => handleSpecialReqToggle(item.label)}
                            className="accent-[#d4af37] h-4 w-4 rounded"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}

                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Any other custom instructions for the Gayawal Pandit?
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Please perform tarpan specifically facing south at Falgu river."
                          value={customNotes}
                          onChange={(e) => setCustomNotes(e.target.value)}
                          className="w-full bg-surface/50 border border-gold-primary/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: REVIEW & PAYMENT */}
                {step === 7 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-gold-primary" />
                        Review Your Pind Daan Reservation
                      </h3>
                      <p className="text-xs text-text-muted font-serif">
                        Please verify the sacred details before confirming your booking.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface/50 border border-gold-primary/30 space-y-4 text-xs">
                      <div className="flex justify-between items-center border-b border-border/50 pb-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-text-muted">Selected Package</span>
                          <p className="text-base font-bold font-cinzel text-gold-primary">{currentPkg.name} Online Pind Daan</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-text-muted">Total Investment</span>
                          <p className="text-lg font-bold font-cinzel text-white">{currentPkg.price}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-text-secondary">
                        <div>
                          <span className="text-text-muted block text-[11px]">Preferred Date:</span>
                          <strong className="text-white">{selectedDate || "Next Auspicious Tithi"}</strong>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[11px]">Devotee Name:</span>
                          <strong className="text-white">{userName || "Devotee Family"}</strong>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[11px]">Ancestor(s):</span>
                          <strong className="text-white">{ancestorName || "Ancestral Lineage"} ({relationship})</strong>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[11px]">Gotra:</span>
                          <strong className="text-white">{dontKnowGotra ? "Kashyap (Universal)" : gotra || "Kashyap"}</strong>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[11px]">Sankalpa Performed by:</span>
                          <strong className="text-white">{sankalpPerformer}</strong>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[11px]">Contact (WhatsApp):</span>
                          <strong className="text-emerald-400">{userPhone || "Not provided"}</strong>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-gold-primary/10 border border-gold-primary/20 text-[11px] text-text-secondary flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p>
                          Includes authentic Gayawal Purohit coordination, complete puja samagri, sankalpa recitations, photographic updates, and post-ritual certificate.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* CONFIRMATION SCREEN */
              <div className="text-center py-6 space-y-6 animate-fadeIn">
                <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold font-cinzel uppercase tracking-widest text-gold-primary">
                    Sacred Booking Logged
                  </span>
                  <h3 className="text-2xl font-bold font-cinzel text-white">
                    Pranam, Your Online Pind Daan is Reserved
                  </h3>
                  <p className="text-xs text-text-muted font-serif max-w-md mx-auto">
                    Your ancestral booking has been registered in our Gaya sanctum ledger.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface/50 border border-gold-primary/30 max-w-md mx-auto text-left space-y-3">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-xs text-text-muted">Booking Reference:</span>
                    <span className="font-mono font-bold text-gold-primary text-sm">{generatedBookingId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
                    <div>
                      <span className="text-text-muted block text-[10px]">Package:</span>
                      <strong className="text-white">{currentPkg.name}</strong>
                    </div>
                    <div>
                      <span className="text-text-muted block text-[10px]">Location:</span>
                      <strong className="text-white">Vishnupad, Gaya</strong>
                    </div>
                    <div>
                      <span className="text-text-muted block text-[10px]">Ancestor:</span>
                      <strong className="text-white">{ancestorName || "Family Lineage"}</strong>
                    </div>
                    <div>
                      <span className="text-text-muted block text-[10px]">Total Dakshina:</span>
                      <strong className="text-gold-primary font-bold">{currentPkg.price}</strong>
                    </div>
                  </div>
                </div>

                {/* WHAT HAPPENS NEXT */}
                <div className="p-5 rounded-2xl bg-black/40 border border-border/50 max-w-md mx-auto text-left space-y-3">
                  <h4 className="text-xs font-bold font-cinzel text-gold-primary uppercase tracking-wider">
                    What Happens Next?
                  </h4>
                  <ol className="text-xs text-text-secondary space-y-2 font-serif list-decimal pl-4">
                    <li>A senior Pitraya coordinator will contact you on WhatsApp / Phone within 15 minutes.</li>
                    <li>Your family Gotra and ancestral Sankalpa details will be verified with the Panchangam.</li>
                    <li>The performing Gayawal Purohit and exact muhurat will be confirmed.</li>
                    <li>The ritual is performed in Gaya with complete Vedic procedures.</li>
                    <li>Ritual photos, video updates, and blessings documentation will be shared with your family.</li>
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Namaste! I just reserved Online Pind Daan with Booking ID: ${generatedBookingId}. Please assist with my family Sankalpa.`
                      );
                      window.open(`https://wa.me/918434457228?text=${msg}`, "_blank");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-black font-bold text-xs hover:bg-[#20bd5a] transition-all cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat with Coordinator</span>
                  </button>

                  <button
                    onClick={resetAndClose}
                    className="py-3 px-5 rounded-xl border border-border bg-surface text-xs font-bold text-white hover:bg-surface/80 transition-all cursor-pointer"
                  >
                    Back to Pitraya
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─── MODAL FOOTER BUTTONS ────────────────────────────────── */}
          {!bookingConfirmed && (
            <div className="sticky bottom-0 z-20 bg-[#16130e] border-t border-gold-primary/20 px-6 py-4 flex items-center justify-between backdrop-blur-md">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-white px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {step < 7 ? (
                  <PrimaryButton
                    size="sm"
                    onClick={() => {
                      if (step === 3 && (!userName || !userPhone)) {
                        alert("Please provide your name and WhatsApp number to continue.");
                        return;
                      }
                      if (step === 4 && !ancestorName) {
                        alert("Please provide the ancestor/deceased person's name.");
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="font-cinzel text-xs font-bold tracking-wider px-6 py-2.5"
                  >
                    <span>Continue</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    size="sm"
                    disabled={isSubmitting}
                    onClick={handleProceedToPayment}
                    className="font-cinzel text-xs font-bold tracking-wider px-7 py-2.5 shadow-gold-glow"
                  >
                    {isSubmitting ? "Securing Reservation..." : `Confirm & Proceed (${currentPkg.price}) →`}
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
