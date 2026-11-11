import React from "react";
import { Metadata } from "next";
import { PageHero, HeroAccent } from "@/components/ui/page-hero";
import RoiCalculator from "@/components/roi/RoiCalculator";

// Page metadata for SEO
export const metadata: Metadata = {
  title: "Archibus ROI Calculator | Estimate Your Savings",
  description:
    "Calculate the potential annual savings your organization could achieve by implementing Archibus IWMS. Enter your data for a personalized estimate.",
};

export default function RoiCalculatorPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PageHero
        eyebrow="ROI calculator"
        title={
          <>
            Estimate your <HeroAccent>return on investment</HeroAccent>
          </>
        }
        description="Estimate your potential annual savings by switching to Archibus. Input your current operational data for a personalized projection."
        size="compact"
      />

      {/* Main Content Area */}
      <div className="flex-1 bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <RoiCalculator />
        </div>
      </div>
    </div>
  );
}
