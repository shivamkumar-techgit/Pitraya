"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, Calendar, Users, Wallet, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import GradientText from "@/components/typography/GradientText";
import GlassCard from "@/components/cards/GlassCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SacredChakraBg from "@/components/animations/SacredChakraBg";
import GoldenParticles from "@/components/animations/GoldenParticles";
import PlannerResultsDisplay, { PlannerData, TravelPlanResults } from "./PlannerResultsDisplay";
import { cn } from "@/lib/utils";

const popularCities = ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad", "Pune", "NRI / Overseas"];

export type SacredTravelPlannerProps = React.HTMLAttributes<HTMLElement>;

export default function SacredTravelPlanner({ className, ...props }: SacredTravelPlannerProps) {
  const [city, setCity] = useState("Delhi");
  const [date, setDate] = useState("2026-09-25");
  const [members, setMembers] = useState(4);
  const [budgetTier, setBudgetTier] = useState<"economy" | "comfort" | "luxury">("comfort");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<TravelPlanResults | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      // Synthesize tailored AI recommendations based on user inputs
      const isLux = budgetTier === "luxury";
      const isEcon = budgetTier === "economy";

      const sampleResults: TravelPlanResults = {
        bestPackage: {
          name: isLux ? "Royal Heritage Sanctuary" : isEcon ? "Heritage Shraddha Package" : "Moksha Family Sanctuary",
          tagline: isLux
            ? "5★ Luxury Resort, Private Helicopter/AC SUV & Senior Gayawal Purohit"
            : isEcon
            ? "3★ Hotel, Group Transfers & Gayawal Pandit Guidance"
            : "4★ Hotel, Private AC Sedan & Complete Family Concierge",
          pricePerFamily: isLux
            ? `₹78,500 (For ${members} Members)`
            : isEcon
            ? `₹24,900 (For ${members} Members)`
            : `₹45,000 (For ${members} Members)`,
          includes: [
            "Hereditary Gayawal Pandit led Pind Daan",
            "Panji Lineage Record Verification",
            `${members} Seats at Private Mandap`,
            isLux ? "5★ Luxury Suite & Helicopter Option" : "4★ Heritage Hotel & Sattvik Meals",
            "Private Chauffeur Pickup & Drop",
          ],
        },
        weather: {
          temp: "26°C - 32°C",
          condition: "Pleasant Morning Breeze • Clear Skies",
          advice: "Carry light cotton traditional attire (Dhoti/Kurta or Saree) for morning river rites.",
        },
        hotel: {
          name: isLux ? "Bodhgaya Regency Heritage Resort" : "Pitraya Executive Sanctuary",
          location: "5 mins from Vishnupad Temple Gate",
          type: isLux ? "5★ Luxury Suite" : "4★ Comfort Family Suite",
          rating: "4.9 / 5",
        },
        flights: [
          {
            airline: "IndiGo / Air India Direct",
            route: `${city} (DEL) → Gaya (GAY) Direct`,
            duration: "1h 45m",
            pickup: "Private AC Chauffeur meet & greet at arrival",
          },
          {
            airline: "Connecting via Patna",
            route: `${city} → Patna (PAT) + AC Transfer to Gaya`,
            duration: "2h 10m flight + 1h 40m highway sedan",
            pickup: "Highway VIP escort",
          },
        ],
        trains: [
          {
            name: "Vande Bharat Express",
            number: "22346",
            timing: "06:00 AM Departure → 11:30 AM Gaya Jn",
            classType: "Executive Chair Car (EC)",
          },
          {
            name: "Mahabodhi Express",
            number: "12398",
            timing: "08:10 PM Departure → 06:15 AM Gaya Jn",
            classType: "First AC (1A) / 2A",
          },
        ],
        checklist: [
          { id: "c1", item: "Valid Government Photo ID (Aadhaar / Passport / Voter ID)", category: "Identity" },
          { id: "c2", item: "Ancestral detail sheet (Names of departed parents, grandparents & Gotra)", category: "Ritual" },
          { id: "c3", item: "Clean white traditional cotton clothes (Dhoti / Saree) for river ghats", category: "Attire" },
          { id: "c4", item: "Passport size family photographs for Panji register record stamping", category: "Documentation" },
          { id: "c5", item: "Personal medications & light walking sandals for temple premises", category: "Comfort" },
        ],
        budgetBreakdown: [
          { category: "Gayawal Pandit Dakshina & Panji Stamping", amount: isLux ? "₹18,000" : "₹12,000" },
          { category: "Pooja Samagri, Sesame Pindas & Havan Items", amount: "₹4,500" },
          { category: "Hotel Stay & Sattvik Family Meals", amount: isLux ? "₹32,000" : "₹18,500" },
          { category: "Private AC Vehicle Station/Airport Transfers", amount: isLux ? "₹14,000" : "₹7,500 text" },
          { category: "Personal Concierge & Assistance", amount: "Included" },
        ],
        bestRitualTime: {
          muhurat: "06:30 AM – 09:30 AM (Brahma Muhurat)",
          location: "Phalgu River Ghats & Vishnupad Sanctum",
          reason: "Morning sun rays over Phalgu river provide maximum spiritual efficacy according to Garuda Purana.",
        },
      };

      setGeneratedResults(sampleResults);
    }, 1200);
  };

  return (
    <Section
      spacing="xl"
      className={cn("relative py-28 overflow-hidden bg-[#07080D] text-text-primary border-b border-border-gold/20", className)}
      {...props}
    >
      {/* Background Ambience & Sacred Rotating Circular Chakra */}
      <GoldenParticles particleCount={35} className="opacity-30 pointer-events-none" />
      <SacredChakraBg size="min(750px, 95vw)" opacity={0.05} rotateSpeed={160} position="center" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-xs font-semibold text-gold-primary border border-gold-primary/30 uppercase tracking-widest font-cinzel"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>AI SACRED TRAVEL CONCIERGE</span>
          </motion.div>

          <Heading size="2xl" align="center" font="cinzel" className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            AI Sacred{" "}
            <GradientText variant="gold" size="inherit" font="cinzel" className="font-semibold">
              Travel Planner
            </GradientText>
          </Heading>

          <Paragraph size="lg" align="center" variant="muted" className="max-w-3xl mx-auto leading-relaxed text-text-secondary text-base sm:text-lg">
            Enter your departure city, family members, travel date, and preferred budget. Our AI concierge instantly calculates the optimal package, trains/flights, hotel sanctuary, weather advice, and auspicious ritual Muhurat.
          </Paragraph>
        </div>

        {/* INPUT FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard borderGold glow padding="lg" className="bg-surface/90 backdrop-blur-xl p-6 sm:p-10 space-y-8">
            <form onSubmit={handleGenerate} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. Coming From */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Coming From</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Delhi / Mumbai"
                    className="w-full px-4 py-3 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-sm focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
                    required
                  />
                  {/* City Quick Chips */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {popularCities.slice(0, 4).map((c, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setCity(c)}
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-colors cursor-pointer",
                          city === c
                            ? "bg-gold-primary text-black border-gold-primary"
                            : "bg-surface/60 border-border text-text-muted hover:text-gold-primary"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Travel Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-sm focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
                    required
                  />
                  <span className="block text-[10px] text-emerald-400 font-semibold">
                    ✨ Pitru Paksha & Amavasya Dates Available
                  </span>
                </div>

                {/* 3. Members */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    <span>Family Members</span>
                  </label>
                  <select
                    value={members}
                    onChange={(e) => setMembers(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-sm focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num} className="bg-background text-text-primary">
                        {num} {num === 1 ? "Person" : "Family Members"}
                      </option>
                    ))}
                  </select>
                  <span className="block text-[10px] text-text-muted">
                    Includes elder assistance
                  </span>
                </div>

                {/* 4. Budget */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gold-primary uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                    <Wallet className="h-3.5 w-3.5" />
                    <span>Budget Tier</span>
                  </label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value as "economy" | "comfort" | "luxury")}
                    className="w-full px-4 py-3 rounded-xl bg-background/90 border border-gold-primary/30 text-text-primary text-sm focus:outline-none focus:border-gold-primary transition-colors shadow-inner"
                  >
                    <option value="economy" className="bg-background text-text-primary">Economy (Heritage Package)</option>
                    <option value="comfort" className="bg-background text-text-primary">Comfort (Moksha Package)</option>
                    <option value="luxury" className="bg-background text-text-primary">Executive Luxury (Royal Package)</option>
                  </select>
                  <span className="block text-[10px] text-gold-accent font-semibold">
                    All-inclusive transparent pricing
                  </span>
                </div>

              </div>

              {/* GENERATE BUTTON */}
              <div className="flex justify-center pt-2">
                <PrimaryButton
                  type="submit"
                  size="lg"
                  isDisabled={isGenerating}
                  leftIcon={<Sparkles className="h-5 w-5" />}
                  className="w-full sm:w-auto px-12 shadow-gold-glow"
                >
                  {isGenerating ? "AI Is Calculating Your Sacred Itinerary..." : "Generate AI Sacred Travel Plan"}
                </PrimaryButton>
              </div>
            </form>
          </GlassCard>
        </motion.div>

        {/* RESULTS DISPLAY */}
        {generatedResults && (
          <PlannerResultsDisplay
            planData={{ city, date, members, budgetTier }}
            results={generatedResults}
            onReset={() => setGeneratedResults(null)}
          />
        )}
      </Container>
    </Section>
  );
}
