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
    heritage: "Starting from ₹24,999",
    moksha: "Starting from ₹49,999",
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl rounded-2xl bg-surface border border-gold-primary/30 p-6 sm:p-8 shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-gold/20 pb-4 mb-6">
            <div>
              <span className="text-xs font-bold text-gold-primary uppercase tracking-widest font-cinzel">
                Sacred Tier Matrix
              </span>
              <h2 className="text-2xl font-bold font-cinzel text-white flex items-center gap-2">
                Compare Pilgrimage Experiences
                <Sparkles className="h-5 w-5 text-gold-primary" />
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-text-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto flex-1 rounded-2xl border border-border-gold/15 bg-black/40">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-border-gold/20 bg-surface/80">
                  <th className="p-4 font-bold text-text-muted uppercase tracking-wider font-cinzel w-1/6">
                    Feature
                  </th>
                  {PACKAGE_TIERS_DATA.map((pkg) => {
                    const isSelected = pkg.id === currentSelectedId;
                    return (
                      <th
                        key={pkg.id}
                        className={cn(
                          "p-4 text-center border-l border-border-gold/15 transition-colors",
                          isSelected ? "bg-gold-primary/10" : ""
                        )}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest block font-cinzel">
                            {pkg.tierName}
                          </span>
                          <p className="font-bold text-white text-sm font-cinzel">
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
                                "w-full py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer border",
                                isSelected
                                  ? "bg-gold-gradient text-black border-gold-primary shadow-gold-glow"
                                  : "bg-surface/50 text-white border-border hover:border-gold-primary/50"
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
              <tbody className="divide-y divide-border-gold/10">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-white font-serif border-r border-border-gold/15 bg-black/20">
                      {row.feature}
                    </td>
                    {[row.sacred, row.heritage, row.moksha, row.royal, row.legacy].map(
                      (val, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="p-4 text-center text-text-secondary border-r border-border-gold/10 last:border-r-0"
                        >
                          {val === false ? (
                            <span className="inline-flex items-center text-text-muted/50 font-sans text-xs">
                              <Minus className="h-4 w-4" /> Not Included
                            </span>
                          ) : typeof val === "string" && val.startsWith("✅") ? (
                            <span className="text-emerald-400 font-semibold">{val}</span>
                          ) : (
                            <span className="text-white font-medium">{val}</span>
                          )}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="pt-4 text-center text-xs text-text-muted flex items-center justify-between">
            <span>All tiers include 100% transparent Gayawal Purohit Dakshina with zero hidden costs.</span>
            <button
              onClick={onClose}
              className="text-gold-primary font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              Close Comparison <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
