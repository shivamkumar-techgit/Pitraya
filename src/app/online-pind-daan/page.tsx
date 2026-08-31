import { Metadata } from "next";
import OnlinePindDaanClient from "@/components/online-pind-daan/OnlinePindDaanClient";

export const metadata: Metadata = {
  title: "Online Pind Daan in Gaya | Book Sacred Ancestral Rites from Anywhere | Pitraya",
  description:
    "Perform authentic Vedic Pind Daan at Vishnupad Gaya with guidance from hereditary Gayawal Pandits — even when you cannot travel. Complete photographic & video documentation.",
  keywords: [
    "Online Pind Daan",
    "Pind Daan in Gaya online",
    "Gaya Pind Daan booking",
    "Vishnupad online puja",
    "Remote ancestral rites Gaya",
    "Gayawal Pandit online Pind Daan",
    "Pitru Paksha online booking",
  ],
  alternates: {
    canonical: "https://pitraya.com/online-pind-daan",
  },
  openGraph: {
    title: "Online Pind Daan in Gaya | Book from Anywhere • Pitraya",
    description:
      "Sacred ancestral oblations coordinated in Gaya by hereditary Gayawal Purohits. Dedicated coordinator assistance, Sankalpa guidance, and complete documentation.",
    url: "https://pitraya.com/online-pind-daan",
    siteName: "Pitraya",
    locale: "en_IN",
    type: "website",
  },
};

export default function OnlinePindDaanPage() {
  return <OnlinePindDaanClient />;
}
