import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GoogleMapsEmbed from "@/components/common/GoogleMapsEmbed";
import { JsonLd, generateOrganizationSchema, generateLocalBusinessSchema } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "About Us | Pitraya Rituals Gaya",
  description: "Learn about Pitraya Rituals, our hereditary Gayawal Tirth Purohits, Vishnupad Dhaam office, and mission for transparent ancestral pilgrimage services.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 md:px-8 lg:px-16">
      <JsonLd data={generateOrganizationSchema()} />
      <JsonLd data={generateLocalBusinessSchema()} />

      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ name: "About Us", item: "/about" }]} />
        <h1 className="text-3xl md:text-5xl font-extrabold text-amber-400 mb-6">About Pitraya Rituals</h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Pitraya Rituals is a premier pilgrimage services organization operating at Vishnupad Dhaam, Gaya, Bihar. Founded with the sacred objective of serving devotees across India and abroad, we ensure every family receives authentic Vedic rites guided by hereditary Gayawal Tirth Purohits.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-2">Our Accreditation</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              All our Pandits and Acharyas belong to traditional Gayawal Brahmin families recognized by Vishnupad Temple Dhaam authorities.
            </p>
          </div>
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-2">Transparent Pricing</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Zero hidden charges. Complete packages cover Pandit Dakshina, samagri, hotel accommodations, vehicle transfers, and temple entry passes.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-400 mb-6">Location & Gaya Office Map</h2>
          <GoogleMapsEmbed />
        </section>
      </div>
    </main>
  );
}
