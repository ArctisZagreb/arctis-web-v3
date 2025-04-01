import React from "react";
import { ImplementationContent } from "@/components/sections/services/ImplementationContent";
// TODO: Add metadata for SEO
export const metadata = {
  title: "Solution Implementation Services | Arctis",
  description:
    "Expert ARCHIBUS implementation services, from analysis and design to data migration, testing, and deployment. Achieve faster ROI with our proven methodology.",
};

export default function ImplementationPage() {
  return (
    <main>
      <ImplementationContent />
    </main>
  );
}
