import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/sections/FAQSection";
import {
  JsonLd,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Pitraya Rituals",
  description:
    "Find answers to commonly asked questions about Pind Daan, Gayawal Purohits, travel arrangements, and Pitraya's services in Gaya.",
  alternates: {
    canonical: `${baseUrl}/faq`,
  },
  openGraph: {
    title: "Frequently Asked Questions | Pitraya Rituals",
    description:
      "Find answers to commonly asked questions about Pind Daan, Gayawal Purohits, travel arrangements, and Pitraya's services in Gaya.",
    url: `${baseUrl}/faq`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Pitraya Rituals",
    description:
      "Find answers to commonly asked questions about Pind Daan, Gayawal Purohits, travel arrangements, and Pitraya's services in Gaya.",
  },
};

const faqData = [
  {
    question: "Who is eligible to perform Pind Daan in Gaya?",
    answer:
      "According to Vedic dharma, the eldest son holds the primary duty to perform Pind Daan for late parents. However, in his absence, any male relative (including younger brothers, grandsons, or nephews) can perform the rites. Significantly, the scriptures also permit daughters or wives to perform Pind Daan if there are no male descendants in the immediate family tree.",
  },
  {
    question: "Why are family records (Panjis) checked during the ritual?",
    answer:
      "The Gayawal Pandits maintain hand-written palm-leaf registers (Panji registers) dating back hundreds of years. These records categorize lineages by Gotra, ancestral village, and family tree branches. Checking these records verifies your ancestors' names, preserves your family history, and ensures that your oblation is officially registered under the correct lineage register.",
  },
  {
    question: "Can Pind Daan be performed online or in absentia?",
    answer:
      "While physical presence is highly recommended to experience the spiritual depth of the ritual, Vedic texts recognize Pratinidhi Shraddha (performing rites on behalf of someone else). If you cannot travel to Gaya due to health or visa constraints, a Gayawal Pandit can perform the Sankalpa and Pind Daan in your name via live video stream, with you observing the mantras from home.",
  },
  {
    question: "What is the significance of the Akshay Vat tree?",
    answer:
      "The Akshay Vat is the immortal Banyan tree of Gaya, blessed by Goddess Sita to remain eternal. It is believed to survive the cosmic dissolution (Pralaya). Offering the final leaf oblation at Akshay Vat signifies that the ancestral liberation is complete, sealed eternally, and that the souls of your forefathers are permanently released into Vaikuntha.",
  },
  {
    question: "What is the difference between Pind Daan and Tarpan?",
    answer:
      "Tarpan is the daily or periodic offering of water mixed with sesame seeds, barley, and white flowers to satisfy the thirst of ancestors. Pind Daan is the physical offering of cooked rice balls or barley flour (pindas) mixed with honey, milk, and ghee. Pind Daan is a major ceremony that represents offering solid food to satisfy the ancestors' hunger and release them from worldly ties.",
  },
];

export default function FAQPage() {
  const breadcrumbs = [{ name: "FAQ", item: "/faq" }];

  return (
    <main className="bg-background text-text-primary min-h-screen px-4 py-8 pt-32 md:px-8 lg:px-16">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={generateFaqSchema(faqData)} />

      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-4 mb-12 text-center">
          <h1 className="font-cinzel text-gold-primary mb-4 text-3xl font-bold md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-text-secondary mx-auto max-w-2xl text-lg">
            Everything you need to know about performing ancestral rituals at
            Vishnupad Dhaam and how Pitraya ensures a seamless spiritual
            journey.
          </p>
        </div>

        {/* Reuse the existing FAQ component from the homepage */}
        <FAQSection />
      </div>
    </main>
  );
}
