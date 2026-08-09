"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PackageCheck,
  SunMedium,
  Hotel,
  Plane,
  TrainTrack,
  Luggage,
  Coins,
  Clock,
  CheckSquare,
  Square,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { cn } from "@/lib/utils";

export interface PlannerData {
  city: string;
  date: string;
  members: number;
  budgetTier: "economy" | "comfort" | "luxury";
}

export interface TravelPlanResults {
  bestPackage: {
    name: string;
    tagline: string;
    pricePerFamily: string;
    includes: string[];
  };
  weather: {
    temp: string;
    condition: string;
    advice: string;
  };
  hotel: {
    name: string;
    location: string;
    type: string;
    rating: string;
  };
  flights: Array<{
    route: string;
    duration: string;
    airline: string;
    pickup: string;
  }>;
  trains: Array<{
    name: string;
    number: string;
    timing: string;
    classType: string;
  }>;
  checklist: Array<{ id: string; item: string; category: string }>;
  budgetBreakdown: Array<{ category: string; amount: string }>;
  bestRitualTime: {
    muhurat: string;
    location: string;
    reason: string;
  };
}

export interface PlannerResultsDisplayProps {
  planData: PlannerData;
  results: TravelPlanResults;
  onReset?: () => void;
}

export default function PlannerResultsDisplay({ planData, results, onReset }: PlannerResultsDisplayProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* SUMMARY BANNER */}
      <GlassCard borderGold glow padding="lg" className="bg-gradient-to-br from-gold-primary/20 via-surface to-background border-2 border-gold-primary p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold-primary/30 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-cinzel block">
              AI ITINERARY GENERATED
            </span>
            <h3 className="text-2xl font-bold font-cinzel text-text-primary">
              Personalized Gaya Pilgrimage Plan
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gold-primary bg-gold-primary/10 px-4 py-2 rounded-full border border-gold-primary/30">
            <span>{planData.city} → Gaya</span>
            <span>•</span>
            <span>{planData.members} Family Members</span>
            <span>•</span>
            <span className="capitalize">{planData.budgetTier} Tier</span>
          </div>
        </div>

        <p className="text-sm text-text-secondary font-serif italic">
          Tailored specifically for {planData.members} family members traveling from {planData.city} around {planData.date || "your chosen travel date"}.
        </p>
      </GlassCard>

      {/* 8 AI RECOMMENDATION CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. BEST PACKAGE RECOMMENDATION */}
        <GlassCard borderGold glow className="p-6 space-y-4 bg-surface/90 border-2 border-gold-primary">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-gold-primary/20 text-gold-primary border border-gold-primary/40">
              <PackageCheck className="h-6 w-6" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-primary text-black font-cinzel shadow-gold-glow">
              Best Match
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
              RECOMMENDED PACKAGE
            </span>
            <h4 className="text-xl font-bold font-cinzel text-text-primary">
              {results.bestPackage.name}
            </h4>
            <p className="text-xs text-text-muted italic">{results.bestPackage.tagline}</p>
          </div>

          <div className="p-3 rounded-xl bg-background/90 border border-gold-primary/30 space-y-1">
            <span className="text-[10px] font-bold text-gold-primary font-cinzel uppercase block">Est Package Investment</span>
            <p className="text-lg font-bold text-emerald-400 font-mono">{results.bestPackage.pricePerFamily}</p>
          </div>

          <ul className="space-y-1.5 text-xs text-text-secondary">
            {results.bestPackage.includes.map((inc, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* 2. WEATHER & SEASONAL GUIDANCE */}
        <GlassCard borderGold className="p-6 space-y-4 bg-surface/90">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
              <SunMedium className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-gold-primary font-mono">{results.weather.temp}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
              GAYA WEATHER FORECAST
            </span>
            <h4 className="text-lg font-bold font-cinzel text-text-primary">
              {results.weather.condition}
            </h4>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed bg-background/80 p-3 rounded-xl border border-border">
            💡 <strong>Attire Guidance:</strong> {results.weather.advice}
          </p>
        </GlassCard>

        {/* 3. RECOMMENDED HOTEL */}
        <GlassCard borderGold className="p-6 space-y-4 bg-surface/90">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
              <Hotel className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-gold-accent">★ {results.hotel.rating}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
              ACCOMMODATION
            </span>
            <h4 className="text-lg font-bold font-cinzel text-text-primary">
              {results.hotel.name}
            </h4>
            <p className="text-xs text-gold-primary font-medium">📍 {results.hotel.location}</p>
          </div>

          <p className="text-xs text-text-secondary bg-background/80 p-3 rounded-xl border border-border">
            🏨 <strong>Category:</strong> {results.hotel.type} • Family suite pre-booked with sattvik meals.
          </p>
        </GlassCard>

        {/* 4. FLIGHT OPTIONS */}
        <GlassCard borderGold className="p-6 space-y-4 bg-surface/90">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
              <Plane className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold text-emerald-400 font-cinzel">Airport Transfer Included</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
              FLIGHT OPTIONS
            </span>
            <h4 className="text-lg font-bold font-cinzel text-text-primary">
              Gaya (GAY) & Patna (PAT) Flights
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            {results.flights.map((fl, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-background/80 border border-border space-y-0.5">
                <div className="flex justify-between font-bold text-text-primary">
                  <span>✈️ {fl.airline}</span>
                  <span className="text-gold-primary">{fl.duration}</span>
                </div>
                <p className="text-[11px] text-text-muted">{fl.route}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* 5. TRAIN OPTIONS */}
        <GlassCard borderGold className="p-6 space-y-4 bg-surface/90">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
              <TrainTrack className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold text-emerald-400 font-cinzel">Gaya Jn Direct</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
              TRAIN OPTIONS
            </span>
            <h4 className="text-lg font-bold font-cinzel text-text-primary">
              Direct Railway Connections
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            {results.trains.map((tr, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-background/80 border border-border space-y-0.5">
                <div className="flex justify-between font-bold text-text-primary">
                  <span>🚆 {tr.name} ({tr.number})</span>
                  <span className="text-gold-accent">{tr.classType}</span>
                </div>
                <p className="text-[11px] text-text-muted">{tr.timing}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* 6. BEST RITUAL TIME */}
        <GlassCard borderGold className="p-6 space-y-4 bg-surface/90">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
              <Clock className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-emerald-400 font-cinzel">Auspicious Window</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gold-accent uppercase tracking-widest font-cinzel block">
              BEST RITUAL MUHURAT
            </span>
            <h4 className="text-lg font-bold font-cinzel text-text-primary">
              {results.bestRitualTime.muhurat}
            </h4>
            <p className="text-xs text-gold-primary font-medium">📍 {results.bestRitualTime.location}</p>
          </div>

          <p className="text-xs text-text-secondary bg-background/80 p-3 rounded-xl border border-border">
            ✨ {results.bestRitualTime.reason}
          </p>
        </GlassCard>
      </div>

      {/* 7. THINGS TO CARRY CHECKLIST & BUDGET BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHECKLIST */}
        <GlassCard borderGold className="lg:col-span-7 p-8 space-y-6 bg-surface/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
                <Luggage className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold font-cinzel text-text-primary">
                Things to Carry Checklist
              </h4>
            </div>
            <span className="text-xs text-text-muted">Click items to check off</span>
          </div>

          <div className="space-y-3">
            {results.checklist.map((c) => {
              const isChecked = !!checkedItems[c.id];
              return (
                <div
                  key={c.id}
                  onClick={() => toggleCheck(c.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer select-none",
                    isChecked
                      ? "bg-emerald-950/20 border-emerald-500/40 text-text-primary"
                      : "bg-background/80 border-border text-text-muted"
                  )}
                >
                  {isChecked ? (
                    <CheckSquare className="h-5 w-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="h-5 w-5 text-text-muted shrink-0" />
                  )}
                  <div className="flex-1 flex items-center justify-between text-xs sm:text-sm">
                    <span className={cn(isChecked ? "line-through text-text-muted" : "font-medium text-text-primary")}>
                      {c.item}
                    </span>
                    <span className="text-[11px] font-bold text-gold-primary uppercase font-cinzel">
                      {c.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* EXPECTED BUDGET BREAKDOWN */}
        <GlassCard borderGold className="lg:col-span-5 p-8 space-y-6 bg-surface/90 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/30">
                <Coins className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold font-cinzel text-text-primary">
                Expected Budget Breakdown
              </h4>
            </div>

            <div className="space-y-3">
              {results.budgetBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-background/80 border border-border text-xs sm:text-sm">
                  <span className="text-text-secondary">{item.category}</span>
                  <span className="font-bold font-mono text-gold-primary">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gold-primary/20 space-y-4">
            <div className="flex items-center justify-between text-sm font-bold font-cinzel text-text-primary">
              <span>Total Estimated Investment</span>
              <span className="text-lg text-emerald-400 font-mono">{results.bestPackage.pricePerFamily}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton
                size="md"
                onClick={() => window.location.href = "/book-now"}
                className="w-full shadow-gold-glow"
              >
                Reserve Planned Pilgrimage
              </PrimaryButton>
              {onReset && (
                <SecondaryButton size="md" onClick={onReset} className="w-full sm:w-auto shrink-0">
                  Modify Inputs
                </SecondaryButton>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
