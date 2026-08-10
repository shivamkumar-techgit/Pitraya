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
  title:
    "Why Choose Pitraya Rituals — Authentic Gaya Pilgrimage & Transparency",
  description:
    "Discover why thousands of families trust Pitraya Rituals for Gaya Pind Daan. Verified Gayawal Pandits, zero-harassment transparent pricing, and end-to-end travel management.",
  alternates: { canonical: `${baseUrl}/why-pitraya` },
  openGraph: {
    title: "Why Choose Pitraya Rituals | Authentic Gaya Pind Daan",
    description:
      "Verified Gayawal Purohits, transparent package pricing, AC transport, sattvik hotels, and live video streaming for NRI families.",
    url: `${baseUrl}/why-pitraya`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Pitraya Rituals | Gaya Pilgrimage",
    description:
      "Verified Gayawal Purohits, transparent package pricing, and full pilgrimage coordination.",
  },
};

export default function WhyPitrayaPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Why Pitraya", item: "/why-pitraya" },
  ];

  const pillars = [
    {
      icon: "📜",
      title: "Hereditary Gayawal Purohits",
      desc: "All rituals are conducted by authorized, hereditary Gayawal Tirth Purohits possessing centuries-old Panji genealogical registers.",
    },
    {
      icon: "💎",
      title: "Transparent & Fixed Pricing",
      desc: "Zero bargaining or surprise demands at ritual sites. All Dakshina, samagri, temple passes, and transport are 100% pre-included.",
    },
    {
      icon: "🚗",
      title: "End-to-End Pilgrimage Logistics",
      desc: "Dedicated AC vehicle pickup from Gaya Junction or Patna Airport, pure Sattvik hotel stays, and private field coordinator guidance.",
    },
    {
      icon: "📹",
      title: "NRI & Remote Live Streaming",
      desc: "High-definition live video streaming and Pratinidhi Sankalpa for overseas families unable to travel to Gaya in person.",
    },
    {
      icon: "🪔",
      title: "Authentic Vedic Samagri",
      desc: "Pure black sesame seeds, Kusha grass, fresh lotus flowers, barley flour, and holy Ganga/Phalgu water used for every Pind Daan.",
    },
    {
      icon: "🛡️",
      title: "Suphal Certificate & Panji Entry",
      desc: "Official record entry in traditional Gayawal Panji registers and issuance of digital Suphal certificate upon completion.",
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
            ⭐ Trust & Transparency Policy
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-amber-400 md:text-5xl">
            Why Choose Pitraya Rituals?
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300">
            Performing Pind Daan for your ancestors should be a peaceful, deeply
            sacred experience—free from commercial anxiety, priest bargaining,
            or logistical hassle.
          </p>
        </header>

        {/* 6 Trust Pillars Grid */}
        <section className="mb-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:border-amber-500/40"
            >
              <div className="mb-4 text-4xl">{p.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-slate-100">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">{p.desc}</p>
            </div>
          ))}
        </section>

        {/* Comparison Section */}
        <section className="mb-14 rounded-3xl border border-amber-500/20 bg-slate-900 p-8">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-amber-300">
            Pitraya vs. Unorganized Local Pilgrimage
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 font-bold text-amber-400">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Traditional Unorganized Travel</th>
                  <th className="p-4 text-amber-300">
                    Pitraya Managed Experience
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-4 font-bold text-slate-200">
                    Pricing Clarity
                  </td>
                  <td className="p-4 text-red-400">
                    Uncertain; unexpected demands at ritual spots
                  </td>
                  <td className="p-4 font-bold text-emerald-400">
                    100% Fixed & Transparent upfront
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-200">
                    Pandit Accreditation
                  </td>
                  <td className="p-4 text-red-400">
                    Unverified local agents or middlemen
                  </td>
                  <td className="p-4 font-bold text-emerald-400">
                    Hereditary Gayawal Purohits with Panji records
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-200">
                    Transport & Hotels
                  </td>
                  <td className="p-4 text-red-400">
                    Self-arranged auto rickshaws & unpredictable stays
                  </td>
                  <td className="p-4 font-bold text-emerald-400">
                    Private AC Innova & verified 3★/5★ Sattvik hotels
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-200">
                    Field Assistance
                  </td>
                  <td className="p-4 text-red-400">
                    None; navigating crowded Vedis alone
                  </td>
                  <td className="p-4 font-bold text-emerald-400">
                    Dedicated local coordinator accompanies your family
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-100">
            Ready to Plan Your Sacred Journey?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-slate-300">
            Consult our senior Acharyas to select the ideal Tithi and package
            for your family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/packages"
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Explore Packages →
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-amber-500/40 bg-slate-800 px-6 py-3 text-sm font-bold text-amber-400 transition-colors hover:bg-slate-700"
            >
              Consult Gayawal Pandit
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
