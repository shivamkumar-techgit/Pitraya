import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Travel & Transport | Pitraya Rituals",
  description:
    "Seamless travel and transport arrangements for your Pind Daan pilgrimage in Gaya, Bihar.",
};

export default function TravelPage() {
  return (
    <main className="bg-background text-text-primary min-h-screen px-4 py-8 pt-32 md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <Breadcrumbs
          items={[{ name: "Travel & Transport", item: "/travel" }]}
        />
        <h1 className="font-cinzel text-gold-primary mt-4 mb-6 text-3xl font-bold md:text-5xl">
          Travel & Transport Services
        </h1>
        <p className="text-text-secondary mb-12 text-lg leading-relaxed">
          From the moment you arrive in Gaya, our dedicated concierges and
          chauffeurs ensure your travel is comfortable, safe, and entirely
          stress-free.
        </p>

        <div className="grid gap-6 text-left md:grid-cols-2">
          <div className="bg-surface border-border rounded-xl border p-6">
            <h2 className="mb-2 text-xl font-bold text-white">
              Airport & Station Transfers
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              We provide premium, air-conditioned vehicle transfers from Gaya
              Airport, Patna Airport, and Gaya Junction Railway Station directly
              to your hotel.
            </p>
          </div>
          <div className="bg-surface border-border rounded-xl border p-6">
            <h2 className="mb-2 text-xl font-bold text-white">
              Local Ritual Transport
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Navigating the crowded streets of Gaya can be challenging. Our
              local drivers will transport you smoothly between your hotel and
              the sacred ritual sites.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
