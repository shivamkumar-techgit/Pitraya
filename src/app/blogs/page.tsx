import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import { WisdomLibraryHero } from "@/components/wisdom";
import FeaturedGuidesGrid from "@/components/wisdom/FeaturedGuidesGrid";
import CTASection from "@/components/sections/CTASection";
import { getAllArticles } from "@/lib/blog/repository";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Gaya Pind Daan Wisdom Library — All 9 Guides | Pitraya",
  description:
    "Complete collection of Gaya Pind Daan guides — Vishnupad Temple, Falgu River history, Pitru Paksha calendar, NRI guide, dress code, and Gayawal Pandit tradition.",
  alternates: { canonical: `${baseUrl}/blog` },
};

// Server Component: reads ALL articles from content/blog/ on disk
export default function WisdomLibraryPage() {
  const articles = getAllArticles(); // runs on server, returns all 9

  return (
    <main className="min-h-screen bg-black text-text-primary selection:bg-gold-primary selection:text-black">
      <Navbar />

      {/* Hero section */}
      <WisdomLibraryHero />

      {/* Self-contained grid: search, filter, AND all articles */}
      <FeaturedGuidesGrid articles={articles} />

      <CTASection
        badge="PITRAYA WISDOM LIBRARY ⭐"
        title="Have Questions About Your Family's Specific Ritual Rules?"
        description="Speak directly with our Gayawal Pandits to verify your lineage Panji records and plan your Gaya Pind Daan pilgrimage."
      />

      <Footer />
    </main>
  );
}
