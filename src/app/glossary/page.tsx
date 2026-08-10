import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { JsonLd, generateBreadcrumbSchema } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";
import { GLOSSARY_TERMS } from "@/data/glossary";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title:
    "Vedic Ritual Glossary — Pind Daan, Shradh & Ancestral Terms | Pitraya",
  description:
    "Explore the authoritative Vedic ritual glossary covering Pind Daan, Tarpan, Shradh, Pitru Loka, Gayawal Pandits, and sacred Gaya terms.",
  keywords: [
    "Vedic Ritual Glossary",
    "Pind Daan Terms",
    "Shradh Karma Dictionary",
    "Tarpan Meaning",
    "Gayawal Pandit Meaning",
    "Gaya Pilgrimage Terms",
  ],
  alternates: { canonical: `${baseUrl}/glossary` },
  openGraph: {
    title: "Vedic Ritual Glossary | Pitraya Rituals",
    description:
      "Comprehensive dictionary of ancient Vedic terms, mantras, and ritual definitions for Gaya Pind Daan and ancestral rites.",
    url: `${baseUrl}/glossary`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Ritual Glossary | Pitraya Rituals",
    description:
      "Comprehensive dictionary of ancient Vedic terms and ritual definitions.",
  },
};

export default function GlossaryPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Glossary", item: "/glossary" },
  ];

  // DefinedTermSet Schema for SEO
  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${baseUrl}/glossary#definedtermset`,
    name: "Pitraya Vedic Ritual & Ancestral Pilgrimage Glossary",
    description:
      "Authoritative reference glossary of Hindu ancestral rites, Pind Daan metaphysics, and Gayawal priesthood terms.",
    hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `${baseUrl}/glossary#definedtermset`,
      url: `${baseUrl}/glossary#${t.slug}`,
    })),
  };

  const categories = Array.from(new Set(GLOSSARY_TERMS.map((t) => t.category)));

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 pt-32 text-slate-100 md:px-8 lg:px-16">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={definedTermSetSchema} />

      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-6 mb-12 text-center">
          <div className="mb-3 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-widest text-amber-400 uppercase">
            📖 Knowledge Base & Terminology
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-amber-400 md:text-5xl">
            Vedic Ritual Glossary
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300">
            Understand the sacred terminology, metaphysical concepts, and
            ancient Sanskrit definitions behind Gaya Pind Daan, Shradh Karma,
            and ancestral liberation.
          </p>
        </header>

        {/* Categories Section */}
        {categories.map((cat) => {
          const terms = GLOSSARY_TERMS.filter((t) => t.category === cat);
          return (
            <section key={cat} className="mb-14">
              <h2 className="mb-6 border-b border-amber-500/30 pb-3 text-2xl font-bold text-amber-300">
                {cat}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {terms.map((item) => (
                  <article
                    key={item.slug}
                    id={item.slug}
                    className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:border-amber-500/40"
                  >
                    <div className="mb-3 flex items-baseline justify-between">
                      <h3 className="text-xl font-bold text-slate-100">
                        {item.term}
                      </h3>
                      {item.hindiTerm && (
                        <span className="text-sm font-semibold text-amber-400">
                          {item.hindiTerm}
                        </span>
                      )}
                    </div>
                    <p className="mb-4 text-sm leading-relaxed font-medium text-amber-200/90">
                      {item.definition}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
                      {item.detailedExplanation}
                    </p>
                    {item.relatedPillarSlug && (
                      <div className="mt-4 border-t border-slate-800 pt-3">
                        <Link
                          href={`/blog/${item.relatedPillarSlug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 transition-colors hover:text-amber-300"
                        >
                          <span>Read detailed guide →</span>
                        </Link>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
