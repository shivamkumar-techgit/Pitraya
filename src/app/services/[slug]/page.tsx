import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  JsonLd,
  generateServiceSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";

interface ServiceData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtitle: string;
  serviceType: string;
  faqs: { question: string; answer: string }[];
}

const SERVICES_CATALOG: Record<string, ServiceData> = {
  "pind-daan": {
    slug: "pind-daan",
    title: "Gaya Pind Daan Ritual Services",
    metaTitle: "Authentic Gaya Pind Daan Booking | Vishnupad Temple Rituals",
    metaDescription:
      "Book authentic Pind Daan rituals at Gaya, Vishnupad Temple Dhaam, and Phalgu River. Complete pandit arrangements, Vedic samagri, hotel stay, and transport.",
    heroHeadline: "Sacred Pind Daan Rituals at Vishnupad Dhaam, Gaya",
    heroSubtitle:
      "Ensure eternal peace and salvation for ancestors with certified Vedic Gayawal Tirth Purohits.",
    serviceType: "Religious Ritual & Pilgrimage Service",
    faqs: [
      {
        question:
          "Why is Gaya considered the most sacred location for Pind Daan?",
        answer:
          "Gaya is blessed by Lord Vishnu's footprint (Vishnupad) and Lord Brahma's boon, making it the supreme Dhaam for ancestral liberation.",
      },
      {
        question: "How long does a complete Pind Daan ceremony take in Gaya?",
        answer:
          "Single-day rituals take 3-4 hours. Complete 3-Dhaam rituals (Phalgu River, Vishnupad, Akshayvat) take 1 to 3 days depending on package tier.",
      },
    ],
  },
  shradh: {
    slug: "shradh",
    title: "Vedic Shradh Karma & Annadaan",
    metaTitle: "Vedic Shradh Karma & Brahmin Bhojan Booking in Gaya",
    metaDescription:
      "Perform ancestral Shradh Karma rituals, Tarpan, and Brahmin Annadaan in Gaya with experienced Vedic pandits.",
    heroHeadline: "Complete Vedic Shradh Karma & Tarpan Services",
    heroSubtitle:
      "Honor your lineage through traditional Vedic mantras, Pinda offering, and auspicious Brahmin Bhojan.",
    serviceType: "Ancestral Shradh Ritual Service",
    faqs: [
      {
        question:
          "What items and samagri are included in the Shradh Karma package?",
        answer:
          "All ritual samagri including sesame seeds, kusha grass, barley, fresh flowers, sweet offerings, and Brahmin Bhojan are fully provided.",
      },
    ],
  },
  "brahmin-booking": {
    slug: "brahmin-booking",
    title: "Verified Vedic Pandit & Brahmin Booking",
    metaTitle: "Book Verified Vedic Pandits & Acharyas in Gaya | Pitraya",
    metaDescription:
      "Directly book accredited Gayawal Tirth Purohits and certified Vedic Pandits for Pind Daan, Shradh, and Kashi-Gaya pilgrimage rites.",
    heroHeadline: "Accredited Gayawal Tirth Purohits & Vedic Pandits",
    heroSubtitle:
      "Perform your family rituals under the guidance of knowledgeable hereditary Gayawal Pandits.",
    serviceType: "Vedic Pandit & Priest Booking Service",
    faqs: [
      {
        question: "Are the Pandits verified by local temple authorities?",
        answer:
          "Yes, all our Pandits are hereditary Gayawal Purohits verified by Vishnupad Temple Dhaam authorities.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_CATALOG[slug];
  if (!service) return { title: "Service Not Found" };

  const baseUrl = getSiteUrl();

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `${baseUrl}/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${baseUrl}/services/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_CATALOG[slug];
  if (!service) notFound();

  const breadcrumbs = [
    { name: "Services", item: "/services" },
    { name: service.title, item: `/services/${slug}` },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 md:px-8 lg:px-16">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateServiceSchema(
          service.title,
          service.metaDescription,
          service.serviceType
        )}
      />
      <JsonLd data={generateFaqSchema(service.faqs)} />

      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12 text-center md:text-left">
          <h1 className="mb-4 text-3xl font-extrabold text-amber-400 md:text-5xl">
            {service.heroHeadline}
          </h1>
          <p className="max-w-3xl text-lg text-slate-300 md:text-xl">
            {service.heroSubtitle}
          </p>
        </header>

        <section className="mb-12 rounded-xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-100">
            Service Details & Procedure
          </h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            Pitraya provides complete hassle-free ritual arrangements in Gaya.
            From your arrival at Gaya Junction / Patna Airport to Pandit
            coordination, puja samagri, temple entry pass, and hotel
            accommodation, our dedicated field coordinator accompanies your
            family throughout.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-amber-400">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
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
      </div>
    </main>
  );
}
