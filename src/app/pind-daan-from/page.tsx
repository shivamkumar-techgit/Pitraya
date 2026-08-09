import React from "react";
import { Metadata } from "next";
import CityHubClient from "@/components/city-pilgrimage/CityHubClient";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Pind Daan from Major Indian Cities — Complete Pilgrimage Coordination",
  description:
    "Book Gaya Pind Daan from Delhi, Mumbai, Bangalore, Chennai, Hyderabad, and 40+ Indian cities. Complete travel coordination, ceremony execution, and NRI support from your city.",
  keywords: [
    "Pind Daan from cities",
    "Gaya pilgrimage from",
    "Pind Daan Delhi, Mumbai, Bangalore",
    "Pind Daan booking by city",
    "ancestral rites from city",
  ],
  alternates: {
    canonical: `${baseUrl}/pind-daan-from`,
  },
  openGraph: {
    title: "Pind Daan from Major Indian Cities",
    description: "Complete pilgrimage coordination from 50+ cities across India to Gaya Vishnupad Temple.",
    type: "website",
    url: `${baseUrl}/pind-daan-from`,
  },
};

export default function CityHubPage() {
  return <CityHubClient />;
}
