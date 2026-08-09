import React from "react";
import Script from "next/script";

export interface AnalyticsHeaderProps {
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  gaMeasurementId?: string;
}

export default function AnalyticsHeader({
  googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google_verification_token_pitraya_2026",
  bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "bing_verification_token_pitraya_2026",
  gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-PITRAYA2026",
}: AnalyticsHeaderProps) {
  return (
    <>
      {/* Search Engine Verification Tags */}
      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}
      {bingSiteVerification && (
        <meta name="msvalidate.01" content={bingSiteVerification} />
      )}

      {/* GA4 Google Analytics Script Injection */}
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
