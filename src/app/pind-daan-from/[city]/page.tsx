import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import CityPindDaanClient from "@/components/city-pilgrimage/CityPindDaanClient";
import { getSiteUrl } from "@/lib/config/site";
import { getCityBySlug, CITIES } from "@/data/cities";

const baseUrl = getSiteUrl();

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ city: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) return { title: "City Not Found" };

  const title = `Pind Daan from ${city.name} — Book Gaya Pilgrimage Package`;
  const description = `Complete Gaya Pind Daan package from ${city.name} — travel coordination, ${city.travelHoursByAir}hr flights, ceremony booking, and NRI support from ${city.state}.`;

  return {
    title,
    description,
    keywords: [
      `Pind Daan from ${city.name}`,
      `Gaya pilgrimage ${city.name}`,
      `ancestral rites ${city.name}`,
      `Pind Daan booking from ${city.state}`,
      `Pind Daan ${city.name} to Gaya`,
    ],
    alternates: {
      canonical: `${baseUrl}/pind-daan-from/${citySlug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/pind-daan-from/${citySlug}`,
    },
  };
}

export default async function CityPindDaanPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) notFound();

  return <CityPindDaanClient city={city} />;
}