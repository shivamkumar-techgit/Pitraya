import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/layout/FAQSection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Pitraya Rituals",
  description:
    "Find answers to commonly asked questions about Pind Daan, Gayawal Purohits, travel arrangements, and Pitraya's services in Gaya.",
};

export default function FAQPage() {
  return (
    <main className="bg-background text-text-primary min-h-screen px-4 py-8 pt-32 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ name: "FAQ", item: "/faq" }]} />

        <div className="mt-4 mb-12 text-center">
          <h1 className="font-cinzel text-gold-primary mb-4 text-3xl font-bold md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-text-secondary mx-auto max-w-2xl text-lg">
            Everything you need to know about performing ancestral rituals at
            Vishnupad Dhaam and how Pitraya ensures a seamless spiritual
            journey.
          </p>
        </div>

        {/* Reuse the existing FAQ component from the homepage */}
        <FAQSection />
      </div>
    </main>
  );
}
