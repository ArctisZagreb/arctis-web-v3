import React from "react";
import { Metadata } from "next";
import { ImplementationContent } from "@/components/sections/services/ImplementationContent";

/**
 * Metadata configuration for the Implementation Services page.
 * This enhances SEO through improved page description, title,
 * and structured data for search engines.
 */
export const metadata: Metadata = {
  title: "Solution Implementation Services | Arctis",
  description:
    "Expert ARCHIBUS implementation services, from analysis and design to data migration, testing, and deployment. Achieve faster ROI with our proven methodology.",
  // Open Graph metadata for better social media sharing
  openGraph: {
    title: "Solution Implementation Services | Arctis",
    description:
      "Expert ARCHIBUS implementation services with proven methodology for faster ROI.",
    type: "website",
  },
  // Additional keywords can help with legacy SEO systems
  keywords: [
    "ARCHIBUS implementation",
    "solution deployment",
    "data migration",
    "system integration",
    "enterprise software implementation",
  ],
};

/**
 * Implementation Services Page Component
 *
 * Renders the main content for the ARCHIBUS implementation services
 * offered by Arctis, focusing on the complete implementation lifecycle.
 *
 * @returns {JSX.Element} The rendered Implementation page
 */
export default function ImplementationPage() {
  return (
    <main>
      <ImplementationContent />
    </main>
  );
}
