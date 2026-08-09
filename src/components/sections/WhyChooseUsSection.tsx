"use client";

import React from "react";
import SacredTrustSection, { SacredTrustSectionProps } from "./SacredTrustSection";

export interface WhyChooseUsSectionProps extends SacredTrustSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

export default function WhyChooseUsSection({
  subtitle = "THE ASSURANCE OF SANCTITY",
  title = "Sacred Trust Built Across Generations",
  description = "Every pilgrimage is conducted through authentic Gayawal Pandits, transparent pricing, verified rituals, and complete family assistance from arrival to completion.",
  ...props
}: WhyChooseUsSectionProps) {
  return (
    <SacredTrustSection
      subtitle={subtitle}
      titleChoice={title}
      description={description}
      {...props}
    />
  );
}
