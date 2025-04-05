import React from "react";
import { ConsultingContent } from "@/components/sections/services/ConsultingContent";
import { Metadata } from "next";

/**
 * Metadata for SEO optimization
 */
export const metadata: Metadata = {
  title: "Strategic Consulting Services | Arctis",
  description:
    "Expert consulting for Corporate Real Estate (CRE) and Facility Management (FM). We provide strategic planning, process optimization, technology advisory, and change management services.",
  keywords:
    "CRE consulting, facility management, strategic planning, process optimization, technology advisory",
  openGraph: {
    title: "Strategic Consulting Services | Arctis",
    description:
      "Expert consulting for Corporate Real Estate (CRE) and Facility Management (FM)",
    type: "website",
  },
};

/**
 * ConsultingPage component that renders the consulting services page
 */
export default function ConsultingPage() {
  return (
    <main>
      <ConsultingContent />
    </main>
  );
}
