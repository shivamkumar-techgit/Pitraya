import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  JsonLd,
  generateServiceSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from "@/components/seo/JsonLd";
import InternalLinkHub from "@/components/seo/InternalLinkHub";
import { getSiteUrl } from "@/lib/config/site";

interface PackageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtitle: string;
  price: string;
  faqs: { question: string; answer: string }[];
}

const PACKAGES_CATALOG: Record<string, PackageData> = {
  "online-pind-daan": {
    slug: "online-pind-daan",
    title: "Online Pind Daan Package (Live Video Call & NRI Special)",
    metaTitle: "Online Pind Daan Booking for NRIs & Remote Families | Pitraya",
    metaDescription:
      "Book authentic Online Pind Daan at Gaya with live video call streaming, verified Gayawal Pandits, HD photography, digital certificate, and courier Prasad delivery.",
    heroHeadline: "Online Pind Daan for Remote Families & NRIs",
    heroSubtitle:
      "Perform sacred ancestral oblations remotely with live interactive video call, verified Gayawal Purohit Sankalp, and home Prasad delivery.",
    price: "₹3,100",
    faqs: [
      {
        question: "How does Online Pind Daan work?",
        answer:
          "Our Senior Gayawal Purohit connects with your family via HD Live Video Call (WhatsApp / Zoom / Google Meet). He takes your family Sankalpa with name and Gotra, and performs the Pind Daan rites on the Phalgu River and Vishnupad Sanctum.",
      },
      {
        question: "Will I receive Prasad and Certificate?",
        answer:
          "Yes! We send an official family lineage certificate, digital video recording, and courier sacred Prasad & Raksha Sutra directly to your doorstep globally.",
      },
    ],
  },
  "gaya-pind-daan": {
    slug: "gaya-pind-daan",
    title: "Essential Gaya Pind Daan Package",
    metaTitle: "Essential Gaya Pind Daan Package Booking | Pitraya",
    metaDescription:
      "Book our essential Gaya Pind Daan package. Includes certified Gayawal Purohit, complete ritual samagri, and Vishnupad Dhaam ceremony coordination.",
    heroHeadline: "Essential Pind Daan Package",
    heroSubtitle:
      "A complete, respectful, and fully guided half-day Pind Daan ceremony at Vishnupad Dhaam.",
    price: "₹11,000",
    faqs: [
      {
        question: "What is included in this package?",
        answer:
          "This package includes the certified Gayawal Purohit Dakshina, all necessary puja samagri, temple entry coordination, and a dedicated field guide.",
      },
      {
        question: "Does this include accommodation?",
        answer:
          "No, the Essential package covers only the rituals. If you need hotel stays, please look at our Heritage Pilgrimage Package.",
      },
    ],
  },
  "heritage-pilgrimage": {
    slug: "heritage-pilgrimage",
    title: "Heritage Pilgrimage Package",
    metaTitle: "Heritage Pilgrimage Pind Daan Package | Gaya | Pitraya",
    metaDescription:
      "Our most popular 2-day Gaya Pind Daan package including premium hotel stay, station transfers, certified Pandit, and 3-Dhaam rituals.",
    heroHeadline: "Heritage Pilgrimage Package",
    heroSubtitle:
      "Our most popular comprehensive 2-day pilgrimage experience, including luxury accommodation and local transport.",
    price: "₹25,000",
    faqs: [
      {
        question: "Is hotel accommodation included?",
        answer:
          "Yes, this package includes a 1-night stay in a premium 3-star equivalent pure Sattvik hotel in Gaya.",
      },
      {
        question: "Are transfers provided?",
        answer:
          "Yes, pickup and drop-off from Gaya Junction or Gaya Airport are fully included.",
      },
    ],
  },
  "supreme-moksha": {
    slug: "supreme-moksha",
    title: "Supreme Moksha Package",
    metaTitle: "Supreme Moksha 3-Day Pind Daan Package | Kashi & Gaya",
    metaDescription:
      "The ultimate 3-day spiritual journey covering extensive ancestral rituals at multiple sacred sites with luxury stays and private chauffeur.",
    heroHeadline: "Supreme Moksha Package",
    heroSubtitle:
      "An extensive 3-day VIP spiritual journey with 5-star accommodations, private chauffeur, and multiple sacred site rituals.",
    price: "₹51,000",
    faqs: [
      {
        question: "What makes this package 'Supreme'?",
        answer:
          "It includes luxury 4/5 star hotel accommodations, a dedicated AC Innova vehicle for 3 days, premium Pandit Dakshina, VIP temple access, and comprehensive rituals across Vishnupad, Akshayavat, and Phalgu.",
      },
    ],
  },
};

PACKAGES_CATALOG["budget"] = PACKAGES_CATALOG["gaya-pind-daan"];
PACKAGES_CATALOG["premium"] = PACKAGES_CATALOG["heritage-pilgrimage"];
PACKAGES_CATALOG["vip"] = PACKAGES_CATALOG["supreme-moksha"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = PACKAGES_CATALOG[slug];
  if (!pkg) return { title: "Package Not Found" };

  const baseUrl = getSiteUrl();

  return {
    title: pkg.metaTitle,
    description: pkg.metaDescription,
    alternates: {
      canonical: `${baseUrl}/packages/${slug}`,
    },
    openGraph: {
      title: pkg.metaTitle,
      description: pkg.metaDescription,
      url: `${baseUrl}/packages/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.metaTitle,
      description: pkg.metaDescription,
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = PACKAGES_CATALOG[slug];
  if (!pkg) notFound();

  const breadcrumbs = [
    { name: "Packages", item: "/packages" },
    { name: pkg.title, item: `/packages/${slug}` },
  ];

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* JSON-LD structured data */}
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateServiceSchema(
          pkg.title,
          pkg.metaDescription,
          "Pilgrimage Package"
        )}
      />
      <JsonLd data={generateFaqSchema(pkg.faqs)} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border-gold/20 bg-background pb-16 pt-28">
        {/* Warm ambient glow */}
        <div className="pointer-events-none absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-gold-primary/[0.07] blur-[140px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-8 space-y-5 text-left">
            {/* Eyebrow badge */}
            <span className="font-cinzel inline-flex items-center gap-2 rounded-full border border-border-gold bg-surface px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-gold-primary uppercase shadow-sm">
              Pitraya Sacred Pilgrimage Package
            </span>

            {/* H1 */}
            <h1 className="font-cinzel max-w-3xl text-3xl font-bold leading-tight text-text-primary md:text-5xl">
              {pkg.heroHeadline}
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl font-serif text-base leading-relaxed text-text-secondary md:text-lg">
              {pkg.heroSubtitle}
            </p>

            {/* Price + CTA row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="font-cinzel rounded-full border border-border-gold bg-gold-primary/10 px-5 py-2 text-xl font-black text-gold-primary">
                Starting at {pkg.price}
              </span>
              <Link
                href={`/book-now?experience=${slug}`}
                className="font-cinzel inline-flex items-center gap-2 rounded-xl bg-gold-primary px-8 py-3.5 text-sm font-bold text-black shadow-gold-glow transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
              >
                Book This Package →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGE DETAILS ──────────────────────────────────────────── */}
      <section className="border-b border-border-gold/20 bg-muted py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="space-y-4 rounded-3xl border border-border-gold/40 bg-surface p-6 shadow-sm md:p-8">
            <h2 className="font-cinzel text-2xl font-bold text-text-primary">
              Package Details &amp; Inclusions
            </h2>
            <div className="h-px bg-border-gold/30" />
            <p className="font-serif leading-relaxed text-text-secondary">
              Our <strong className="text-text-primary font-semibold">{pkg.title}</strong> is
              designed to provide you and your family with complete peace of
              mind. Pitraya handles all logistics — verifying the Gayawal
              Tirth Purohit, assembling the exact Vedic samagri, and
              coordinating your timetable at Vishnupad Dhaam.
            </p>
            <p className="font-serif text-sm leading-relaxed text-text-muted">
              Every Pitraya package includes a verified Gayawal Purohit,
              complete ritual samagri, Dakshina, ancestral lineage certificate,
              HD documentation, and a dedicated family coordinator — with zero
              hidden charges.
            </p>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ───────────────────────────────── */}
      <section className="border-b border-border-gold/20 bg-background py-16">
        <div className="mx-auto max-w-5xl space-y-8 px-4 md:px-8">
          <h2 className="font-cinzel text-2xl font-bold text-text-primary">
            Frequently Asked{" "}
            <span className="text-gold-primary">Questions</span>
          </h2>
          <div className="space-y-4">
            {pkg.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="space-y-2 rounded-2xl border border-border-gold/30 bg-surface p-5 shadow-sm"
              >
                <h3 className="font-cinzel text-base font-bold text-text-primary">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 text-center">
        <div className="mx-auto max-w-2xl space-y-5 px-4">
          <span className="font-cinzel inline-block text-[11px] font-bold tracking-[0.16em] text-gold-primary uppercase">
            Begin Your Sacred Journey
          </span>
          <h2 className="font-cinzel text-2xl font-bold leading-snug text-text-primary">
            Ready to Honour Your Ancestors at Gaya?
          </h2>
          <p className="font-serif text-base leading-relaxed text-text-secondary">
            Our pilgrimage advisors will guide your family through every sacred
            step — from arrival to the final rites.
          </p>
          <Link
            href={`/book-now?experience=${slug}`}
            className="font-cinzel inline-flex items-center gap-2 rounded-xl bg-gold-primary px-8 py-4 text-sm font-bold text-black shadow-gold-glow transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
          >
            Book {pkg.title} →
          </Link>
        </div>
      </section>

      {/* ── INTERNAL LINK HUB ────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <InternalLinkHub />
      </div>
    </main>
  );
}
