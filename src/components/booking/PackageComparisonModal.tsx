"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus, Sparkles, ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { PACKAGE_TIERS_DATA } from "@/hooks/useBookingSession";
import { cn } from "@/lib/utils";

interface PackageComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (packageId: string) => void;
  currentSelectedId: string;
}

const comparisonFeatures = [
  {
    feature: "Starting Price",
    sacred: "₹5,100",
    heritage: "Starting from ₹19,999",
    moksha: "Starting from ₹35,101",
    royal: "Starting from ₹89,999",
    legacy: "Starting from ₹1,50,000",
  },
  {
    feature: "Duration",
    sacred: "3–4 Hours",
    heritage: "2 Days / 1 Night",
    moksha: "3 Days / 2 Nights",
    royal: "3 Days / 2 Nights",
    legacy: "4–5 Days Bespoke",
  },
  {
    feature: "Hotel Accommodation",
    sacred: false,
    heritage: "3-Star Heritage Hotel",
    moksha: "4-Star Heritage Resort",
    royal: "5-Star Luxury Palace Suite",
    legacy: "Bespoke Palace Wing",
  },
  {
    feature: "Private Vehicle Transport",
    sacred: false,
    heritage: "Dedicated AC Sedan",
    moksha: "Innova Crysta MPV",
    royal: "Luxury SUV (Fortuner)",
    legacy: "Executive Fleet (BMW/Mercedes)",
  },
  {
    feature: "Gayawal Pandit Guidance",
    sacred: "Standard Priest",
    heritage: "Senior Gayawal Purohit",
    moksha: "Senior Priest & Scholar",
    royal: "Senior Vedic Scholar",
    legacy: "Archival Lineage Scholar",
  },
  {
    feature: "Airport / Station Transfers",
    sacred: false,
    heritage: "✅ Included",
    moksha: "✅ Included",
    royal: "VIP Meet & Greet",
    legacy: "Tarmac Escort & Fleet",
  },
  {
    feature: "Sattvik Meals",
    sacred: false,
    heritage: "Breakfast & Dinner",
    moksha: "Full Board (All Meals)",
    royal: "Gourmet Sattvik Feast",
    legacy: "Custom Private Chef",
  },
  {
    feature: "Photography & Media",
    sacred: false,
    heritage: "Optional Add-on",
    moksha: "Photos & HD Film",
    royal: "Cinematic Film & Drone",
    legacy: "Full Documentary Reel",
  },
  {
    feature: "Dedicated Coordinator",
    sacred: "Ghat Assistant",
    heritage: "Dedicated Coordinator",
    moksha: "Personal Escort",
    royal: "24/7 Butler Concierge",
    legacy: "Private Host Manager",
  },
];

export default function PackageComparisonModal({
  isOpen,
  onClose,
  onSelectPackage,
  currentSelectedId,
}: PackageComparisonModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-surface border-gold-primary/30 relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border p-6 shadow-xl sm:p-8"
        >
          {/* Header */}
          <div className="border-border-gold/20 mb-6 flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-gold-primary font-cinzel text-xs font-bold tracking-widest uppercase">
                Sacred Tier Matrix
              </span>
              <h2 className="font-cinzel flex items-center gap-2 text-2xl font-bold text-white">
                Compare Pilgrimage Experiences
                <Sparkles className="text-gold-primary h-5 w-5" />
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted cursor-pointer rounded-full p-2 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Table Container */}
          <div className="border-border-gold/15 flex-1 overflow-x-auto rounded-2xl border bg-black/40">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-border-gold/20 bg-surface/80 border-b">
                  <th className="text-text-muted font-cinzel w-1/6 p-4 font-bold tracking-wider uppercase">
                    Feature
                  </th>
                  {PACKAGE_TIERS_DATA.map((pkg) => {
                    const isSelected = pkg.id === currentSelectedId;
                    return (
                      <th
                        key={pkg.id}
                        className={cn(
                          "border-border-gold/15 border-l p-4 text-center transition-colors",
                          isSelected ? "bg-gold-primary/10" : ""
                        )}
                      >
                        <div className="space-y-1">
                          <span className="text-gold-primary font-cinzel block text-[10px] font-bold tracking-widest uppercase">
                            {pkg.tierName}
                          </span>
                          <p className="font-cinzel text-sm font-bold text-white">
                            {pkg.title}
                          </p>
                          <p className="text-gold-primary font-bold">
                            ₹{pkg.startingPrice.toLocaleString("en-IN")}
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                onSelectPackage(pkg.id);
                                onClose();
                              }}
                              className={cn(
                                "w-full cursor-pointer rounded-xl border px-3 py-1.5 text-[11px] font-bold transition-all",
                                isSelected
                                  ? "bg-gold-gradient border-gold-primary shadow-gold-glow text-black"
                                  : "bg-surface/50 border-border hover:border-gold-primary/50 text-white"
                              )}
                            >
                              {isSelected ? "Selected" : "Select"}
                            </button>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-border-gold/10 divide-y">
                {comparisonFeatures.map((row, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="border-border-gold/15 border-r bg-black/20 p-4 font-serif font-medium text-white">
                      {row.feature}
                    </td>
                    {[
                      row.sacred,
                      row.heritage,
                      row.moksha,
                      row.royal,
                      row.legacy,
                    ].map((val, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="text-text-secondary border-border-gold/10 border-r p-4 text-center last:border-r-0"
                      >
                        {val === false ? (
                          <span className="text-text-muted/50 inline-flex items-center font-sans text-xs">
                            <Minus className="h-4 w-4" /> Not Included
                          </span>
                        ) : typeof val === "string" && val.startsWith("✅") ? (
                          <span className="font-semibold text-emerald-400">
                            {val}
                          </span>
                        ) : (
                          <span className="font-medium text-white">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="text-text-muted flex items-center justify-between pt-4 text-center text-xs">
            <span>
              All tiers include 100% transparent Gayawal Purohit Dakshina with
              zero hidden costs.
            </span>
            <button
              onClick={onClose}
              className="text-gold-primary flex cursor-pointer items-center gap-1 font-bold hover:underline"
            >
              Close Comparison <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
