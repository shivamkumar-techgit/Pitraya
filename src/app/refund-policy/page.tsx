import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import { JsonLd, generateBreadcrumbSchema } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Refund Policy | Pitraya Rituals",
  description:
    "Refund policy for Pitraya Rituals Pind Daan and pilgrimage services.",
  alternates: { canonical: `${baseUrl}/refund-policy` },
  openGraph: {
    title: "Refund Policy | Pitraya Rituals",
    description:
      "Refund policy for Pitraya Rituals Pind Daan and pilgrimage services.",
    url: `${baseUrl}/refund-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy | Pitraya Rituals",
    description:
      "Refund policy for Pitraya Rituals Pind Daan and pilgrimage services.",
  },
};

export default function RefundPolicyPage() {
  const breadcrumbs = [{ name: "Refund Policy", item: "/refund-policy" }];

  return (
    <main className="bg-background text-text-primary min-h-screen px-4 py-8 pt-32 md:px-8 lg:px-16">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="font-cinzel text-gold-primary mt-4 mb-8 text-3xl font-bold md:text-5xl">
          Refund Policy
        </h1>

        <div className="prose prose-invert prose-gold text-text-secondary max-w-none">
          <p className="lead mb-8 text-lg">
            At Pitraya, we understand that planning a sacred pilgrimage like
            Pind Daan requires careful thought, and sometimes circumstances
            change. We have established this transparent Refund Policy to ensure
            clarity and peace of mind for our yajmans (clients).
          </p>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            1. Eligibility for Refunds
          </h2>
          <p>
            Refunds are eligible only under specific conditions related to the
            cancellation of booking packages before the scheduled arrival date.
            The amount refunded depends strictly on the timeline of the
            cancellation as outlined in our Cancellation Policy.
          </p>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            2. Non-Refundable Services
          </h2>
          <p>
            Please note that certain expenses incurred on your behalf are
            non-refundable. These include:
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>
              Ritual Samagri (holy items) that have already been procured and
              personalized for your family&apos;s ritual.
            </li>
            <li>
              Any donations or Dakshina already handed over to the Tirth
              Purohits on your behalf prior to cancellation.
            </li>
            <li>Processing fees charged by payment gateways (usually 2-3%).</li>
          </ul>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            3. Refund Processing Time
          </h2>
          <p>Once a cancellation is approved and a refund is initiated:</p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>
              Refunds will be processed back to the original method of payment
              (Credit Card, Debit Card, UPI, or Net Banking).
            </li>
            <li>
              Please allow 7 to 10 business days for the credited amount to
              reflect in your bank account.
            </li>
            <li>
              In case of international payments, the refund duration might
              extend up to 14-21 business days depending on the intermediary
              banks.
            </li>
          </ul>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            4. Failed Transactions
          </h2>
          <p>
            If money has been deducted from your account but the booking was not
            confirmed due to a technical failure, the entire amount will be
            automatically refunded by our payment gateway partner within 5-7
            business days.
          </p>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            5. Dispute Resolution
          </h2>
          <p>
            Any discrepancies or disputes regarding refunds will be addressed
            with compassion and fairness, but are ultimately subject to the
            jurisdiction of the courts in Gaya, Bihar.
          </p>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            Contact Us
          </h2>
          <p>
            For any queries regarding your refund status, please reach out to
            our support team at{" "}
            <a
              href="mailto:pitrayaenquiry@gmail.com"
              className="text-gold-primary hover:underline"
            >
              pitrayaenquiry@gmail.com
            </a>{" "}
            or call us at +91 84344 57228.
          </p>
        </div>
      </div>
    </main>
  );
}
