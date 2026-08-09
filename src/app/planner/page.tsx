import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import { SacredTravelPlanner } from "@/components/planner";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "AI Sacred Travel Planner | Personal Pilgrimage Itinerary | Pitraya Gaya",
  description: "Generate a personalized travel plan for your Gaya Pind Daan pilgrimage. Instant recommendations for packages, flights, trains, weather, hotels, and ritual timings.",
};

export default function PlannerPage() {
  return (
    <main className="min-h-screen bg-black text-text-primary selection:bg-gold-primary selection:text-black">
      <Navbar />
      <SacredTravelPlanner />
      <CTASection
        badge="TAILORED SACRED CONCIERGE"
        title="Ready to Reserve Your AI Travel Itinerary?"
        description="Connect directly with our Gaya teerth purohits and wellness coordinators to lock in your planned travel dates and package preferences."
      />
      <Footer />
    </main>
  );
}
