import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import {
  LineageHeroSection,
  LineageHowItWorksSection,
  DigitalFamilyTreeSection,
  SacredCertificatePreviewSection,
  AncestralTimelineSection,
} from "@/components/lineage";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Sacred Lineage Portal | Search Panji Archives | Pitraya Gaya",
  description: "Search centuries-old handwritten Panji palm-leaf records preserved by Gayawal Pandits. Trace your family lineage and book Pind Daan rituals in Gaya.",
};

export default function LineagePortalPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary selection:bg-gold-primary selection:text-black">
      <Navbar />
      <LineageHeroSection />
      <LineageHowItWorksSection />
      <DigitalFamilyTreeSection />
      <SacredCertificatePreviewSection />
      <AncestralTimelineSection />
      <CTASection
        badge="DISCOVER YOUR ANCESTRAL HERITAGE"
        title="Ready to Connect With Your Ancestral Gayawal Lineage?"
        description="Book your family's Gaya Pind Daan pilgrimage under the same hereditary priest lineage that served your ancestors generations ago."
      />
      <Footer />
    </main>
  );
}
