import React from "react";

import HeroSection from "@/components/sections/HeroSection";
import ClientLogos from "@/components/sections/ClientLogos";
import ServicesOverview from "@/components/sections/ServicesOverview";
import SolutionsTrust from "@/components/sections/SolutionsTrust";
import ArchibusPlans from "@/components/sections/ArchibusPlans";
import CallToActionSection from "@/components/sections/CallToActionSection";
import ResourcesPreview from "@/components/sections/ResourcesPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <ServicesOverview />
      <SolutionsTrust />
      <ArchibusPlans />
      <CallToActionSection />
      <ResourcesPreview />
    </>
  );
}
/* Ajmo na <SolutionsTrust /> sekciju */
