import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Cinzel, Cormorant_Garamond, Noto_Sans_Devanagari } from "next/font/google";
import { cn } from "@/lib/utils";
import WhatsAppFloatingButton from "@/components/common/WhatsAppFloatingButton";
import AuthProvider from "@/components/providers/AuthProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AnalyticsHeader from "@/components/seo/AnalyticsHeader";
import { getSiteUrl } from "@/lib/config/site";
import "./globals.css";

// ─── Fonts (next/font → zero render-blocking, self-hosted) ───────────────────

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

// ─── Site URL ─────────────────────────────────────────────────────────────────

const siteUrl = getSiteUrl();

// ─── Page Metadata ───────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Pitraya Rituals - Authentic Gaya Pind Daan & Pilgrimage Services",
    template: "%s | Pitraya Rituals",
  },
  description:
    "Book authentic Gaya Pind Daan, Shradh Karma, and Vedic rituals with verified Pandits at Vishnupad Dhaam and Phalgu River. Complete end-to-end pilgrimage travel, hotel accommodations, and ritual management.",
  keywords: ["Gaya Pind Daan", "Pind Daan Online Booking", "Vedic Pandits Gaya", "Phalgu River Shradh", "Pitru Paksha Gaya"],
  authors: [{ name: "Pitraya Rituals Team" }],
  creator: "Pitraya Rituals",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/icon.svg"],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "hi": "/hi",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Pitraya Rituals - Authentic Gaya Pind Daan Services",
    description: "End-to-end sacred Pind Daan pilgrimage services at Gaya, Vishnupad Temple, and Phalgu River.",
    url: siteUrl,
    siteName: "Pitraya Rituals",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pitraya Rituals - Gaya Pind Daan Services",
    description: "Book verified Pandits and complete Pind Daan pilgrimage packages in Gaya.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Pitraya Rituals",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "description": "Authentic Gaya Pind Daan and Vedic Pilgrimage Services Provider.",
      "email": "shkshvm@gmail.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-84344-57228",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"],
      },
    },
    {
      "@type": "TouristTrip",
      "@id": `${siteUrl}/#trip`,
      "name": "Gaya Sacred Pind Daan Pilgrimage Package",
      "description": "3-Day guided Pind Daan rituals at Vishnupad Dhaam, Phalgu River, and Akshayvat in Gaya.",
      "touristType": ["Pilgrims", "Devotees"],
      "provider": { "@id": `${siteUrl}/#organization` },
    },
  ],
};

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased dark notranslate",
        inter.variable,
        outfit.variable,
        cinzel.variable,
        cormorant.variable,
        devanagari.variable
      )}
    >
      <head>
        <meta name="google" content="notranslate" />
        <AnalyticsHeader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <AuthProvider>
          <SmoothScrollProvider>
            {children}
            <WhatsAppFloatingButton />
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
