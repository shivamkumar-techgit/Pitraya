import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cancellation Policy | Pitraya Rituals",
  description:
    "Cancellation policy for Pitraya Rituals Pind Daan and pilgrimage services.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="bg-background text-text-primary min-h-screen px-4 py-8 pt-32 md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[
            { name: "Cancellation Policy", item: "/cancellation-policy" },
          ]}
        />
        <h1 className="font-cinzel text-gold-primary mt-4 mb-8 text-3xl font-bold md:text-5xl">
          Cancellation Policy
        </h1>

        <div className="prose prose-invert prose-gold text-text-secondary max-w-none">
          <p className="lead mb-8 text-lg">
            We recognize that unforeseen events such as health issues, travel
            disruptions, or personal emergencies may require you to cancel your
            pilgrimage. Pitraya has designed a structured cancellation policy to
            balance fairness to our Yajmans with commitments made to our service
            partners on the ground.
          </p>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            1. General Cancellation Timeline
          </h2>
          <p>
            Cancellations must be communicated in writing via email to{" "}
            <a
              href="mailto:support@pitraya.com"
              className="text-gold-primary hover:underline"
            >
              support@pitraya.com
            </a>
            . The date and time of the email receipt will determine the
            cancellation window.
          </p>

          <div className="mt-6 mb-8 overflow-x-auto">
            <table className="border-border w-full border-collapse border text-left">
              <thead>
                <tr className="bg-surface border-border border-b">
                  <th className="p-4 font-bold text-white">
                    Cancellation Window
                  </th>
                  <th className="p-4 font-bold text-white">Refund Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-border border-b">
                  <td className="p-4">15+ days prior to scheduled arrival</td>
                  <td className="p-4">
                    100% Refund (minus payment gateway fees)
                  </td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-4">
                    7 to 14 days prior to scheduled arrival
                  </td>
                  <td className="p-4">75% Refund</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-4">
                    3 to 6 days prior to scheduled arrival
                  </td>
                  <td className="p-4">50% Refund</td>
                </tr>
                <tr>
                  <td className="p-4">Less than 48 hours / No-Show</td>
                  <td className="p-4">No Refund</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            2. Hotel and Accommodation Partners
          </h2>
          <p>
            If your package includes hotel accommodations, the hotel&apos;s
            individual cancellation policy will supersede Pitraya&apos;s general
            policy for the accommodation portion of your package. High-season
            dates (such as Pitru Paksha) often carry stricter, non-refundable
            hotel policies.
          </p>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            3. Rescheduling (Postponement)
          </h2>
          <p>
            In lieu of cancellation, you may request to postpone your pilgrimage
            to a later date.
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>
              Rescheduling requests made 7+ days prior to arrival are generally
              processed without penalty, subject to hotel and priest
              availability.
            </li>
            <li>
              Requests made within 7 days may incur a rescheduling fee of up to
              20% of the package cost to cover advanced preparations.
            </li>
            <li>
              Bookings cannot be rescheduled to peak Pitru Paksha dates without
              a price adjustment.
            </li>
          </ul>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            4. Force Majeure
          </h2>
          <p>
            In the event of cancellation due to unforeseen natural disasters,
            government lockdowns, or extreme circumstances out of our control
            (Force Majeure), Pitraya will offer a free postponement or a maximum
            possible refund after deducting unrecoverable third-party costs.
          </p>

          <h2 className="font-cinzel mt-12 mb-4 text-2xl text-white">
            Contacting Us
          </h2>
          <p>
            To initiate a cancellation or request a date change, please email us
            immediately with your Booking ID at{" "}
            <a
              href="mailto:support@pitraya.com"
              className="text-gold-primary hover:underline"
            >
              support@pitraya.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
