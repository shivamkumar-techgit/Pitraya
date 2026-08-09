import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Verified Gayawal Pandits | Pitraya Rituals",
  description:
    "Learn about our verified hereditary Gayawal Tirth Purohits who conduct authentic Pind Daan rituals at Vishnupad Dhaam.",
};

export default function PanditsPage() {
  return (
    <main className="bg-background text-text-primary min-h-screen px-4 py-8 pt-32 md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <Breadcrumbs items={[{ name: "Pandits", item: "/pandits" }]} />
        <h1 className="font-cinzel text-gold-primary mt-4 mb-6 text-3xl font-bold md:text-5xl">
          Verified Gayawal Pandits
        </h1>
        <p className="text-text-secondary mb-12 text-lg leading-relaxed">
          Pitraya partners exclusively with traditional, hereditary Gayawal
          Brahmin families recognized by the Vishnupad Temple Dhaam authorities
          to ensure your rituals are performed with the utmost authenticity and
          devotion.
        </p>

        <div className="grid gap-6 text-left md:grid-cols-2">
          <div className="bg-surface border-border rounded-xl border p-6">
            <h2 className="mb-2 text-xl font-bold text-white">
              Authentic Lineage
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Our Pandits hold centuries-old ritual rights and possess deep
              knowledge of Vedic scriptures, ensuring every mantra and offering
              is conducted perfectly.
            </p>
          </div>
          <div className="bg-surface border-border rounded-xl border p-6">
            <h2 className="mb-2 text-xl font-bold text-white">
              Transparent Dakshina
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              All Pandit Dakshina is included transparently in our packages,
              eliminating any unexpected demands or stressful negotiations
              during your pilgrimage.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
