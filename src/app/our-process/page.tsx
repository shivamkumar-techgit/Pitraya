import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  JsonLd,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Our Process — Step-by-Step Gaya Pind Daan Journey | Pitraya Rituals",
  description:
    "Learn how Pitraya manages your Gaya Pind Daan pilgrimage step-by-step: Tithi selection, airport pickup, Gayawal Purohit coordination, 3-Dhaam rites, and Brahmin Bhojan.",
  alternates: { canonical: `${baseUrl}/our-process` },
  openGraph: {
    title: "Our Process | Step-by-Step Gaya Pind Daan Journey",
    description:
      "From initial consultation to Suphal certificate issuance—see how Pitraya guides your family through Gaya Pind Daan.",
    url: `${baseUrl}/our-process`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process | Step-by-Step Gaya Pind Daan Journey",
    description:
      "From consultation to Suphal certificate—see how Pitraya guides your family.",
  },
};

export default function OurProcessPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Our Process", item: "/our-process" },
  ];

  const steps = [
    {
      step: "01",
      title: "Consultation & Tithi Selection",
      desc: "Our Acharyas calculate the most auspicious ceremony dates (Amavasya, Pitru Paksha, or Tithi) based on your family's ancestral records.",
    },
    {
      step: "02",
      title: "Seamless Arrival & Hotel Check-in",
      desc: "Our private AC Innova meets your family at Gaya Junction or Patna/Gaya Airport and escorts you to your pre-booked Sattvik hotel.",
    },
    {
      step: "03",
      title: "Pre-Ritual Pandit Briefing",
      desc: "Meet your dedicated hereditary Gayawal Tirth Purohit who verifies your Gotra, native village, and records your visit in the ancestral Panji register.",
    },
    {
      step: "04",
      title: "Tri-Dhaam Sacred Rites Execution",
      desc: "Guided execution across Phalgu River (Sankalpa & Tarpan), Vishnupad Temple Dhaam (Pinda offering at Lord Vishnu's Footprint), and Akshayvat (Final oblation).",
    },
    {
      step: "05",
      title: "Brahmin Bhojan & Suphal Blessing",
      desc: "Auspicious Brahmin Annadaan and traditional Suphal blessing by Gayawal Pandits, certifying the complete salvation of your lineage.",
    },
    {
      step: "06",
      title: "Safe Return & Post-Ritual Guidance",
      desc: "Drop-off at station/airport along with Prasad, holy Phalgu water, and clear post-pind daan Niyam rules for your family.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 pt-32 text-slate-100 md:px-8 lg:px-16">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={generateOrganizationSchema()} />

      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-6 mb-12 text-center">
          <div className="mb-3 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-widest text-amber-400 uppercase">
            🗺️ Step-by-Step Pilgrimage Roadmap
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-amber-400 md:text-5xl">
            The Pitraya Pilgrimage Process
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300">
            We handle every detail of your family&apos;s journey so you can
            focus entirely on honoring your forefathers.
          </p>
        </header>

        {/* Timeline Steps */}
        <section className="mb-14 space-y-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex flex-col items-start gap-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:border-amber-500/40 md:flex-row"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-2xl font-extrabold text-amber-400">
                {s.step}
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-slate-100">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Banner */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-100">
            Begin Your Family&apos;s Pilgrimage Today
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-slate-300">
            Contact our dedicated pilgrimage coordinator via WhatsApp or online
            booking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/packages"
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
            >
              View All Packages →
            </Link>
            <Link
              href="/planner"
              className="rounded-xl border border-amber-500/40 bg-slate-800 px-6 py-3 text-sm font-bold text-amber-400 transition-colors hover:bg-slate-700"
            >
              Use AI Planner →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
