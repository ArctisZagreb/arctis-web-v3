import React from "react";
import WhoWeAreSection from "@/components/sections/about/WhoWeAreSection";
import TechnologySection from "@/components/sections/about/TechnologySection";
import PartnersSection from "@/components/sections/about/PartnersSection";
import { Metadata } from "next";
import { PageHero, HeroAccent } from "@/components/ui/page-hero";

// Page metadata for SEO
export const metadata: Metadata = {
  title: "About Us | IWMS Experts",
  description:
    "Learn more about ARCTIS, our expertise in IWMS, ARCHIBUS, BIM+FM synergy, the technologies we use, and our valued partners.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PageHero
        eyebrow="About us"
        title={
          <>
            The team behind your <HeroAccent>workplace technology</HeroAccent>
          </>
        }
        description="Discover our journey, expertise in IWMS & ARCHIBUS, the technologies driving our success, and the partners we collaborate with."
      />

      {/* Main content */}
      <div className="flex-1">
        <WhoWeAreSection />
        <TechnologySection />
        <PartnersSection />
      </div>
    </div>
  );
}
