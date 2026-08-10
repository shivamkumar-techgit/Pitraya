import { Metadata } from "next";
import { JsonLd, generateBreadcrumbSchema } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Privacy Policy | Pitraya Rituals",
  description:
    "Privacy policy and data protection terms for Pitraya Rituals users and yajmans.",
  alternates: { canonical: `${baseUrl}/privacy-policy` },
  openGraph: {
    title: "Privacy Policy | Pitraya Rituals",
    description:
      "Privacy policy and data protection terms for Pitraya Rituals users and yajmans.",
    url: `${baseUrl}/privacy-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Pitraya Rituals",
    description:
      "Privacy policy and data protection terms for Pitraya Rituals users and yajmans.",
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [{ name: "Privacy Policy", item: "/privacy-policy" }];

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-black">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <h1 className="font-sans text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Privacy Policy
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Read our privacy policy and data protection terms.
      </p>
    </main>
  );
}
