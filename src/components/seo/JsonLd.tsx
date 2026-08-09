import React from "react";
import { getSiteUrl } from "@/lib/config/site";

export interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | any[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateOrganizationSchema() {
  const baseUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Pitraya Rituals",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Authentic Gaya Pind Daan and Vedic Pilgrimage Services Provider.",
    "email": "shkshvm@gmail.com",
    "telephone": "+91-84344-57228",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gaya",
      "addressRegion": "Bihar",
      "addressCountry": "IN",
      "postalCode": "823001",
    },
    "sameAs": [
      "https://facebook.com/pitrayarituals",
      "https://instagram.com/pitrayarituals",
    ],
  };
}

export function generateLocalBusinessSchema() {
  const baseUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "name": "Pitraya Rituals - Gaya Vishnupad Office",
    "image": `${baseUrl}/gaya-office.jpg`,
    "telephone": "+91-84344-57228",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vishnupad Temple Dhaam Road",
      "addressLocality": "Gaya",
      "addressRegion": "Bihar",
      "postalCode": "823001",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7955,
      "longitude": 85.0002,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "05:00",
      "closes": "21:00",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
    },
  };
}

export function generateServiceSchema(name: string, description: string, serviceType: string) {
  const baseUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "serviceType": serviceType,
    "provider": {
      "@id": `${baseUrl}/#organization`,
    },
    "areaServed": {
      "@type": "City",
      "name": "Gaya",
    },
  };
}

export function generateFaqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  const baseUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": it.item.startsWith("http") ? it.item : `${baseUrl}${it.item}`,
    })),
  };
}

export function generateArticleSchema(title: string, description: string, url: string, datePublished: string) {
  const baseUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
    "author": {
      "@type": "Organization",
      "name": "Pitraya Rituals Acharyas",
    },
    "publisher": {
      "@id": `${baseUrl}/#organization`,
    },
    "datePublished": datePublished,
  };
}
