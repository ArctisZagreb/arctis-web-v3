import React from "react";
import { Metadata } from "next";
import { HeaderBackground } from "@/components/ui/header-background";
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
      <section className="relative py-20 md:py-28 lg:py-36 text-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
        <HeaderBackground />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            Return Of Investment Calculator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Estimate your potential annual savings by switching to Archibus.
            Input your current operational data for a personalized projection.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <RoiCalculator />
        </div>
      </main>
    </div>
  );
}
