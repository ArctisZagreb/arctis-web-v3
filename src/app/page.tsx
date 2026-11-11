import React from "react";

import HeroSection from "@/components/sections/HeroSection";
import ClientLogos from "@/components/sections/ClientLogos";
import ServicesOverview from "@/components/sections/ServicesOverview";
import EnterprisePlatform from "@/components/sections/EnterprisePlatform";
import PartnersAndStats from "@/components/sections/PartnersAndStats";
import ProcessSection from "@/components/sections/ProcessSection";
import ArchibusPlans from "@/components/sections/ArchibusPlans";
import SolutionsTrust from "@/components/sections/SolutionsTrust";
import ResourcesPreview from "@/components/sections/ResourcesPreview";
import FaqTeaser from "@/components/sections/FaqTeaser";
import CallToActionSection from "@/components/sections/CallToActionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <ServicesOverview />
      <EnterprisePlatform />
      <PartnersAndStats />
      <ProcessSection />
      <ArchibusPlans />
      <SolutionsTrust />
      <ResourcesPreview />
      <FaqTeaser />
      <CallToActionSection />
    </>
  );
}
