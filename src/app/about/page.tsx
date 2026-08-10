import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GoogleMapsEmbed from "@/components/common/GoogleMapsEmbed";
import {
  JsonLd,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
} from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "About Us | Pitraya Rituals Gaya",
  description:
    "Learn about Pitraya Rituals, our hereditary Gayawal Tirth Purohits, Vishnupad Dhaam office, and mission for transparent ancestral pilgrimage services.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About Us | Pitraya Rituals Gaya",
    description:
      "Learn about Pitraya Rituals, our hereditary Gayawal Tirth Purohits, Vishnupad Dhaam office, and mission for transparent ancestral pilgrimage services.",
    url: `${baseUrl}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Pitraya Rituals Gaya",
    description:
      "Learn about Pitraya Rituals, our hereditary Gayawal Tirth Purohits, Vishnupad Dhaam office, and mission for transparent ancestral pilgrimage services.",
  },
};

export default function AboutPage() {
  const breadcrumbs = [{ name: "About Us", item: "/about" }];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 md:px-8 lg:px-16">
      <JsonLd data={generateOrganizationSchema()} />
      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mb-6 text-3xl font-extrabold text-amber-400 md:text-5xl">
          About Pitraya Rituals
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-slate-300">
          Pitraya Rituals is a premier pilgrimage services organization
          operating at Vishnupad Dhaam, Gaya, Bihar. Founded with the sacred
          objective of serving devotees across India and abroad, we ensure every
          family receives authentic Vedic rites guided by hereditary Gayawal
          Tirth Purohits.
        </p>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 text-xl font-bold text-slate-100">
              Our Accreditation
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              All our Pandits and Acharyas belong to traditional Gayawal Brahmin
              families recognized by Vishnupad Temple Dhaam authorities.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 text-xl font-bold text-slate-100">
              Transparent Pricing
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Zero hidden charges. Complete packages cover Pandit Dakshina,
              samagri, hotel accommodations, vehicle transfers, and temple entry
              passes.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-amber-400">
            Location & Gaya Office Map
          </h2>
          <GoogleMapsEmbed />
        </section>
      </div>
    </main>
  );
}
