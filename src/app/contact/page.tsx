import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  JsonLd,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";
import ContactPageClient from "@/components/contact/ContactPageClient";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Contact Pitraya Rituals — Book Gaya Pind Daan, WhatsApp & Office",
  description:
    "Contact Pitraya Rituals for Gaya Pind Daan bookings, NRI pilgrimage coordination, package inquiries, and Gayawal Pandit consultations. WhatsApp, email, or visit our Vishnupad Gaya office.",
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    title: "Contact Pitraya Rituals — Gaya Pind Daan Bookings",
    description:
      "Book your Gaya Pind Daan ceremony, ask our Gayawal Pandits, or visit our Vishnupad office. Multiple contact options — WhatsApp is fastest.",
    type: "website",
    url: `${baseUrl}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Pitraya Rituals",
    description: "Book Gaya Pind Daan, NRI coordination, package inquiries.",
  },
};

const contactFaqs = [
  {
    question: "How do I book a Pind Daan ceremony at Gaya?",
    answer:
      "Send your ancestor's name, gotra, preferred ceremony dates, and number of family members via WhatsApp to +91 84344 57228 or fill the contact form on this page. A Pitraya coordinator confirms within 4 hours.",
  },
  {
    question: "Can I book Gaya Pind Daan from abroad as an NRI?",
    answer:
      "Yes. Pitraya Rituals serves NRI families from the USA, UK, Canada, UAE, Singapore, and Australia. We offer full ceremony coordination, proxy Pind Daan, and live video streaming for families who cannot travel.",
  },
  {
    question: "What is the fastest way to contact Pitraya Rituals?",
    answer:
      "WhatsApp at +91 84344 57228 is the fastest channel — responses within 15 minutes during office hours (5 AM to 9 PM IST daily).",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary selection:bg-gold-primary selection:text-black">
      {/* SEO JSON-LD Schemas */}
      <JsonLd data={generateOrganizationSchema()} />
      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd data={generateBreadcrumbSchema([{ name: "Contact", item: "/contact" }])} />
      <JsonLd data={generateFaqSchema(contactFaqs)} />

      <Navbar />

      {/* Breadcrumbs */}
      <div className="px-4 pt-24 pb-0 max-w-7xl mx-auto">
        <Breadcrumbs items={[{ name: "Contact", item: "/contact" }]} />
      </div>

      {/* Main content — full client component */}
      <ContactPageClient />

      <Footer />
    </main>
  );
}
