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
    <main className="min-h-screen bg-slate-950 px-4 py-8 pt-32 text-slate-100 md:px-8 lg:px-16">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateServiceSchema(
          pkg.title,
          pkg.metaDescription,
          "Pilgrimage Package"
        )}
      />
      <JsonLd data={generateFaqSchema(pkg.faqs)} />

      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12 text-center md:text-left">
          <h1 className="mb-4 text-3xl font-extrabold text-amber-400 md:text-5xl">
            {pkg.heroHeadline}
          </h1>
          <p className="mb-6 max-w-3xl text-lg text-slate-300 md:text-xl">
            {pkg.heroSubtitle}
          </p>
          <div className="mb-8 text-2xl font-bold text-white">
            Starting at {pkg.price}
          </div>
          <Link
            href={`/book-now?experience=${slug}`}
            className="inline-block rounded-xl bg-amber-500 px-8 py-3.5 text-lg font-bold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Book This Package
          </Link>
        </header>

        <section className="mb-12 rounded-xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-100">
            Package Details & inclusions
          </h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            Our {pkg.title} is designed to provide you and your family with
            complete peace of mind. Pitraya handles all logistics, including
            verifying the Gayawal Tirth Purohit, assembling the exact Vedic
            samagri required, and coordinating your timetable at Vishnupad
            Dhaam.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-amber-400">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {pkg.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="mb-2 text-lg font-semibold text-slate-100">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <InternalLinkHub />
      </div>
    </main>
  );
}
