import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Partner Luxury Hotels | Pitraya Rituals",
  description:
    "Discover our premium, pure Sattvik hotel partners in Gaya offering comfortable and spiritually aligned accommodations.",
};

export default function HotelsPage() {
  return (
    <main className="bg-background text-text-primary min-h-screen px-4 py-8 pt-32 md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <Breadcrumbs items={[{ name: "Hotels", item: "/hotels" }]} />
        <h1 className="font-cinzel text-gold-primary mt-4 mb-6 text-3xl font-bold md:text-5xl">
          Premium Accommodations
        </h1>
        <p className="text-text-secondary mb-12 text-lg leading-relaxed">
          Your spiritual journey requires a peaceful resting place. Pitraya
          partners with the finest 3-star, 4-star, and 5-star properties in Gaya
          to provide luxurious, comfortable, and pure Sattvik stays during your
          pilgrimage.
        </p>

        <div className="grid gap-6 text-left md:grid-cols-2">
          <div className="bg-surface border-border rounded-xl border p-6">
            <h2 className="mb-2 text-xl font-bold text-white">
              Pure Sattvik Dining
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              All our partner hotels strictly adhere to pure vegetarian, Sattvik
              dietary requirements suitable for families performing sacred
              rituals.
            </p>
          </div>
          <div className="bg-surface border-border rounded-xl border p-6">
            <h2 className="mb-2 text-xl font-bold text-white">
              Proximity to Dhaam
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              We select accommodations that offer convenient access to Vishnupad
              Temple and the Phalgu River, minimizing travel stress on ritual
              days.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
