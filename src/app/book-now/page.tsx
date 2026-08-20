"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HomePage from "@/components/layout/HomePage";
import BookingWizard from "@/components/booking/BookingWizard";
import FloatingHelpAdvisor from "@/components/common/FloatingHelpAdvisor";

function BookNowContent() {
  const searchParams = useSearchParams();
  const experienceId = searchParams.get("experience") || "heritage-pilgrimage";

  return (
    <HomePage>
      <div className="pt-20">
        <BookingWizard initialPackageId={experienceId} />
        <FloatingHelpAdvisor />
      </div>
    </HomePage>
  );
}

export default function BookNowPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-gold-primary font-cinzel">
          Loading Sacred Booking Wizard...
        </div>
      }
    >
      <BookNowContent />
    </Suspense>
  );
}
