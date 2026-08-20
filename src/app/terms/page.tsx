import { Metadata } from "next";
import { JsonLd, generateBreadcrumbSchema } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Terms of Service | Pitraya Rituals",
  description:
    "Terms and conditions for Pitraya Rituals Pind Daan and pilgrimage services in Gaya.",
  alternates: { canonical: `${baseUrl}/terms` },
  openGraph: {
    title: "Terms of Service | Pitraya Rituals",
    description:
      "Terms and conditions for Pitraya Rituals Pind Daan and pilgrimage services in Gaya.",
    url: `${baseUrl}/terms`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Pitraya Rituals",
    description:
      "Terms and conditions for Pitraya Rituals Pind Daan and pilgrimage services in Gaya.",
  },
};

export default function TermsPage() {
  const breadcrumbs = [{ name: "Terms of Service", item: "/terms" }];

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-background p-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <h1 className="font-sans text-3xl font-bold tracking-tight text-text-primary">
        Terms of Service
      </h1>
      <p className="mt-2 text-text-secondary">
        Review our terms and conditions of service.
      </p>
    </main>
  );
}
