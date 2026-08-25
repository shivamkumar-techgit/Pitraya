"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Users,
  Hotel,
  Flame,
  Award,
  Sparkles,
} from "lucide-react";
import { PitrayaLogoEmblem } from "@/components/common/Logo";
import { BookingSessionState } from "@/types/booking";

interface ItineraryPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: BookingSessionState;
  docType?: string;
}

export default function ItineraryPdfModal({
  isOpen,
  onClose,
  session,
  docType = "journey_itinerary",
}: ItineraryPdfModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isConfirmed = session.status === "confirmed" && !!session.reservationId;
  const resId = isConfirmed ? session.reservationId! : session.sessionId;
  const dateFormatted = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    // Capture all existing document stylesheets (Tailwind + Next.js fonts)
    const stylesHtml = Array.from(
      document.querySelectorAll("style, link[rel='stylesheet']")
    )
      .map((style) => style.outerHTML)
      .join("\n");

    const printWindow = window.open("", "_blank", "width=920,height=1100");
    if (!printWindow) {
      alert("Please allow popup windows to generate your PDF Itinerary.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html class="dark">
        <head>
          <title>Pitraya_Sacred_Itinerary_${resId}</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          ${stylesHtml}
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box;
            }
            html, body {
              background-color: #0b0a08 !important;
              color: #ffffff !important;
              font-family: 'Inter', sans-serif !important;
              margin: 0 !important;
              padding: 24px !important;
            }
            .cinzel { font-family: 'Cinzel', serif !important; }
            .text-white { color: #ffffff !important; }
            .text-gold-primary { color: #f5d061 !important; }
            .text-text-muted { color: #a1a1aa !important; }
            .text-text-secondary { color: #d4d4d8 !important; }
            .text-emerald-400 { color: #34d399 !important; }
            .pdf-card {
              background-color: #14120e !important;
              border: 1px solid rgba(245, 208, 97, 0.4) !important;
              border-radius: 16px !important;
              padding: 18px !important;
            }
            
            @media print {
              @page {
                margin: 10mm;
                size: A4 portrait;
              }
              body {
                background-color: #0b0a08 !important;
                color: #ffffff !important;
                padding: 0 !important;
              }
              .no-print { display: none !important; }
              .pdf-card {
                background-color: #14120e !important;
                border: 1px solid #d4af37 !important;
              }
            }
          </style>
        </head>
        <body class="bg-[#0b0a08] text-white">
          <div style="max-width: 820px; margin: 0 auto;">
            ${printContent.innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl rounded-2xl bg-[#0b0a08] border border-gold-primary/40 shadow-xl overflow-hidden max-h-[92vh] flex flex-col text-white"
        >
          {/* MODAL HEADER ACTIONS */}
          <div className="sticky top-0 z-20 bg-black/90 border-b border-border-gold/20 px-6 py-4 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-primary" />
              <span
                className="text-xs font-bold font-cinzel uppercase tracking-widest"
                style={{ color: "#f5d061" }}
              >
                {docType === "reservation_letter" && "Official Reservation Letter"}
                {docType === "invoice" && "Tax Invoice & Investment Breakdown"}
                {docType === "payment_receipt" && "Payment Receipt & Sanctum Seal"}
                {docType === "temple_schedule" && "Vishnupad Temple & Rites Schedule"}
                {docType === "journey_itinerary" && "Official PDF Itinerary Voucher"}
                {!["reservation_letter", "invoice", "payment_receipt", "temple_schedule", "journey_itinerary"].includes(docType) && "Official PDF Document"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 py-2 px-5 rounded-full bg-gold-gradient text-black text-xs font-extrabold font-cinzel uppercase tracking-widest shadow-gold-glow hover:opacity-90 transition-all cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print / Save as PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* PRINTABLE LUXURY ITINERARY CONTENT */}
          <div
            className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0b0a08] text-white"
            ref={printRef}
            style={{ backgroundColor: "#0b0a08", color: "#ffffff" }}
          >
            {/* LUXURY BRANDING HEADER */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between pb-6 gap-6"
              style={{ borderBottom: "2px solid rgba(245, 208, 97, 0.4)" }}
            >
              <div className="flex items-center gap-4">
                <PitrayaLogoEmblem size={56} className="shrink-0" />
                <div>
                  <h1
                    className="text-2xl sm:text-3xl font-extrabold font-cinzel tracking-widest uppercase"
                    style={{ color: "#f5d061" }}
                  >
                    PITRAYA
                  </h1>
                  <p
                    className="text-xs tracking-[0.2em] font-cinzel uppercase font-semibold mt-0.5"
                    style={{ color: "#d4d4d8" }}
                  >
                    ANCESTRAL RITES CONCIERGE • GAYA
                  </p>
                  <p
                    className="text-[11px] font-serif italic mt-0.5"
                    style={{ color: "#a1a1aa" }}
                  >
                    Vishnupad Sanctum Ghats, Gaya, Bihar 823001
                  </p>
                </div>
              </div>

              {/* Reservation Official Seal */}
              <div
                className="text-center sm:text-right p-4 rounded-2xl pdf-card space-y-1"
                style={{
                  backgroundColor: "#14120e",
                  border: "1px solid rgba(245, 208, 97, 0.4)",
                }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-widest font-cinzel block"
                  style={{ color: "#f5d061" }}
                >
                  {isConfirmed ? "Official Reservation Seal" : "Draft Session Voucher"}
                </span>
                <p
                  className="text-xl font-black font-cinzel tracking-wider"
                  style={{ color: "#ffffff" }}
                >
                  {resId}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: isConfirmed ? "#34d399" : "#f5d061" }}
                >
                  <CheckCircle2 className="h-3 w-3" />{" "}
                  {isConfirmed ? "Guaranteed Reservation" : "Pre-Submission Draft Session"}
                </span>
              </div>
            </div>

            {/* DELEGATION SUMMARY CREST */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-cinzel">
              <div
                className="pdf-card space-y-1"
                style={{
                  backgroundColor: "#14120e",
                  border: "1px solid rgba(245, 208, 97, 0.3)",
                }}
              >
                <span
                  className="font-bold block text-[10px] uppercase"
                  style={{ color: "#f5d061" }}
                >
                  Issued Date
                </span>
                <p className="font-semibold" style={{ color: "#ffffff" }}>
                  {dateFormatted}
                </p>
              </div>

              <div
                className="pdf-card space-y-1"
                style={{
                  backgroundColor: "#14120e",
                  border: "1px solid rgba(245, 208, 97, 0.3)",
                }}
              >
                <span
                  className="font-bold block text-[10px] uppercase"
                  style={{ color: "#f5d061" }}
                >
                  Purohit Verification
                </span>
                <p className="font-semibold" style={{ color: "#ffffff" }}>
                  Gayawal Hereditary Panda
                </p>
              </div>

              <div
                className="pdf-card space-y-1"
                style={{
                  backgroundColor: "#14120e",
                  border: "1px solid rgba(245, 208, 97, 0.3)",
                }}
              >
                <span
                  className="font-bold block text-[10px] uppercase"
                  style={{ color: "#f5d061" }}
                >
                  Helpline Concierge
                </span>
                <p className="font-semibold" style={{ color: "#ffffff" }}>
                  +91 84344 57228
                </p>
              </div>
            </div>

            {/* SECTION 1: PILGRIM & FAMILY DETAILS */}
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 pb-2"
                style={{ borderBottom: "1px solid rgba(245, 208, 97, 0.3)" }}
              >
                <Users className="h-4 w-4" style={{ color: "#f5d061" }} />
                <h2
                  className="text-base font-bold font-cinzel uppercase tracking-wider"
                  style={{ color: "#ffffff" }}
                >
                  1. Pilgrim & Family Allocation
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div
                  className="pdf-card space-y-2"
                  style={{
                    backgroundColor: "#14120e",
                    border: "1px solid rgba(245, 208, 97, 0.3)",
                  }}
                >
                  <div
                    className="flex justify-between pb-1.5"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>Primary Pilgrim:</span>
                    <span
                      className="font-bold font-cinzel"
                      style={{ color: "#ffffff" }}
                    >
                      {session.customer.name || "Valued Pilgrim"}
                    </span>
                  </div>
                  <div
                    className="flex justify-between pb-1.5"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>Contact Phone:</span>
                    <span
                      className="font-semibold font-mono"
                      style={{ color: "#ffffff" }}
                    >
                      {session.customer.phone || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#a1a1aa" }}>Email Address:</span>
                    <span className="font-semibold" style={{ color: "#ffffff" }}>
                      {session.customer.email || "N/A"}
                    </span>
                  </div>
                </div>

                <div
                  className="pdf-card space-y-2"
                  style={{
                    backgroundColor: "#14120e",
                    border: "1px solid rgba(245, 208, 97, 0.3)",
                  }}
                >
                  <div
                    className="flex justify-between pb-1.5"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>City / Origin:</span>
                    <span className="font-semibold" style={{ color: "#ffffff" }}>
                      {session.customer.city || "Gaya Pilgrim"}, {session.customer.country}
                    </span>
                  </div>
                  <div
                    className="flex justify-between pb-1.5"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>Total Group Size:</span>
                    <span
                      className="font-bold font-cinzel"
                      style={{ color: "#f5d061" }}
                    >
                      {session.pricing.familyTotalCount} Members ({session.family.adults} Adults, {session.family.elders} Elders, {session.family.children} Children)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#a1a1aa" }}>Special Assistance:</span>
                    <span className="font-semibold" style={{ color: "#34d399" }}>
                      {session.family.wheelchairNeeded ? "Wheelchair Included" : "Standard"} •{" "}
                      {session.family.airportPickupNeeded ? "Pickup Active" : "No Pickup"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: SACRED PACKAGE EXPERIENCE & INCLUSIONS */}
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 pb-2"
                style={{ borderBottom: "1px solid rgba(245, 208, 97, 0.3)" }}
              >
                <Flame className="h-4 w-4" style={{ color: "#f5d061" }} />
                <h2
                  className="text-base font-bold font-cinzel uppercase tracking-wider"
                  style={{ color: "#ffffff" }}
                >
                  2. Sacred Experience & Vedic Inclusions
                </h2>
              </div>

              <div
                className="pdf-card space-y-4"
                style={{
                  backgroundColor: "#14120e",
                  border: "1px solid rgba(245, 208, 97, 0.3)",
                }}
              >
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3"
                  style={{ borderBottom: "1px solid rgba(245, 208, 97, 0.3)" }}
                >
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest font-cinzel block"
                      style={{ color: "#f5d061" }}
                    >
                      Confirmed Experience Tier
                    </span>
                    <h3
                      className="text-lg font-bold font-cinzel"
                      style={{ color: "#ffffff" }}
                    >
                      {session.package.title}
                    </h3>
                  </div>
                  <span
                    className="text-xs font-bold font-cinzel px-3 py-1.5 rounded-full"
                    style={{
                      color: "#f5d061",
                      backgroundColor: "rgba(245, 208, 97, 0.1)",
                      border: "1px solid rgba(245, 208, 97, 0.3)",
                    }}
                  >
                    Duration: {session.package.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <span
                    className="text-xs font-bold uppercase tracking-wider font-cinzel block"
                    style={{ color: "#f5d061" }}
                  >
                    Core Sacred Ritual Inclusions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      "Gayawal Hereditary Panda Guidance & Panji Verification",
                      "Full Traditional Pinda Daan Materials & Fresh Offerings",
                      "Phalgu River Holy Tarpan Rites & Sacred Sankalpa",
                      "Vishnupad Temple Sanctum Rites & Pind Placement",
                      "Akshay Vat Sacred Banyan Tree Oblation Ceremony",
                      "Traditional Brahmin Bhojan Offering & Dakshina",
                    ].map((inc, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color: "#f5d061" }}
                        />
                        <span style={{ color: "#d4d4d8" }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: LOGISTICS & ACCOMMODATION */}
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 pb-2"
                style={{ borderBottom: "1px solid rgba(245, 208, 97, 0.3)" }}
              >
                <Hotel className="h-4 w-4" style={{ color: "#f5d061" }} />
                <h2
                  className="text-base font-bold font-cinzel uppercase tracking-wider"
                  style={{ color: "#ffffff" }}
                >
                  3. Travel Logistics & Hotel Accommodation
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div
                  className="pdf-card space-y-2"
                  style={{
                    backgroundColor: "#14120e",
                    border: "1px solid rgba(245, 208, 97, 0.3)",
                  }}
                >
                  <span
                    className="font-bold block text-[10px] uppercase font-cinzel"
                    style={{ color: "#f5d061" }}
                  >
                    Arrival & Transit Details
                  </span>
                  <div
                    className="flex justify-between pb-1.5"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>Arrival Date:</span>
                    <span className="font-semibold" style={{ color: "#ffffff" }}>
                      {session.travel.arrivalDate}
                    </span>
                  </div>
                  <div
                    className="flex justify-between pb-1.5"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>Expected Time:</span>
                    <span className="font-semibold" style={{ color: "#ffffff" }}>
                      {session.travel.arrivalTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#a1a1aa" }}>Mode & Ref No:</span>
                    <span className="font-bold uppercase" style={{ color: "#f5d061" }}>
                      {session.travel.mode} ({session.travel.flightOrTrainNumber || "Standard Arrival"})
                    </span>
                  </div>
                </div>

                <div
                  className="pdf-card space-y-2"
                  style={{
                    backgroundColor: "#14120e",
                    border: "1px solid rgba(245, 208, 97, 0.3)",
                  }}
                >
                  <span
                    className="font-bold block text-[10px] uppercase font-cinzel"
                    style={{ color: "#f5d061" }}
                  >
                    Accommodation Specs
                  </span>
                  <div
                    className="flex justify-between pb-1.5"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>Property Tier:</span>
                    <span className="font-semibold" style={{ color: "#ffffff" }}>
                      {session.hotel.title}
                    </span>
                  </div>
                  <div
                    className="flex justify-between pb-1.5"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>Rooms Reserved:</span>
                    <span className="font-semibold" style={{ color: "#ffffff" }}>
                      {session.hotel.roomsNeeded} Room(s)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#a1a1aa" }}>Meal Plan:</span>
                    <span className="font-semibold" style={{ color: "#34d399" }}>
                      Pure Sattvik Meals Included
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: FINANCIAL SUMMARY */}
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 pb-2"
                style={{ borderBottom: "1px solid rgba(245, 208, 97, 0.3)" }}
              >
                <Award className="h-4 w-4" style={{ color: "#f5d061" }} />
                <h2
                  className="text-base font-bold font-cinzel uppercase tracking-wider"
                  style={{ color: "#ffffff" }}
                >
                  4. Investment Breakdown & Guarantee
                </h2>
              </div>

              <div
                className="pdf-card space-y-3"
                style={{
                  backgroundColor: "#14120e",
                  border: "1px solid rgba(245, 208, 97, 0.3)",
                }}
              >
                <div className="space-y-2 text-xs">
                  <div
                    className="flex justify-between pb-2"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <span style={{ color: "#a1a1aa" }}>
                      Base Package Experience ({session.package.title}):
                    </span>
                    <span className="font-semibold" style={{ color: "#ffffff" }}>
                      ₹{session.pricing.basePrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {session.pricing.extraMemberFee > 0 && (
                    <div
                      className="flex justify-between pb-2"
                      style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                    >
                      <span style={{ color: "#a1a1aa" }}>Extra Member Allocations:</span>
                      <span className="font-semibold" style={{ color: "#ffffff" }}>
                        ₹{session.pricing.extraMemberFee.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  {session.pricing.hotelUpgradeTotal > 0 && (
                    <div
                      className="flex justify-between pb-2"
                      style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                    >
                      <span style={{ color: "#a1a1aa" }}>Accommodation Tier Upgrades:</span>
                      <span className="font-semibold" style={{ color: "#ffffff" }}>
                        ₹{session.pricing.hotelUpgradeTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 text-base">
                    <span
                      className="font-bold font-cinzel uppercase"
                      style={{ color: "#ffffff" }}
                    >
                      TOTAL INVESTMENT:
                    </span>
                    <span
                      className="font-black font-cinzel text-xl"
                      style={{ color: "#f5d061" }}
                    >
                      ₹{session.pricing.grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div
                  className="pt-2 text-[11px] italic flex items-center justify-between"
                  style={{
                    borderTop: "1px solid rgba(245, 208, 97, 0.2)",
                    color: "#a1a1aa",
                  }}
                >
                  <span>
                    ✓ Includes 100% transparent Gayawal Purohit Dakshina. Zero hidden demands at ghats.
                  </span>
                  <span className="font-bold font-cinzel" style={{ color: "#f5d061" }}>
                    Status: Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 5: PILGRIMAGE ADVISORY & CONTACT */}
            <div
              className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-center sm:text-left"
              style={{ borderTop: "2px solid rgba(245, 208, 97, 0.4)" }}
            >
              <div className="space-y-1">
                <p className="font-bold font-cinzel" style={{ color: "#ffffff" }}>
                  Pitraya Concierge Sanctuary
                </p>
                <p className="text-[11px] font-serif" style={{ color: "#a1a1aa" }}>
                  24/7 Devotee Escort Desk: +91 84344 57228 • pitrayaenquiry@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-3 no-print">
                <button
                  onClick={handlePrint}
                  className="py-2.5 px-6 rounded-full bg-gold-gradient text-black font-extrabold font-cinzel text-xs uppercase tracking-widest shadow-gold-glow hover:opacity-90 transition-all cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
