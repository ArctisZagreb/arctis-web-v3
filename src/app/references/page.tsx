import React from "react";
import { Metadata } from "next";
import { getAllReferences } from "@/lib/sanity/sanity.queries";
import { PageHero, HeroAccent } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import ReferencesExplorer from "@/components/references/ReferencesExplorer";
import SimpleCallToAction from "@/components/sections/SimpleCallToAction";

export const metadata: Metadata = {
  title: "References & Portfolio",
  description:
    "Organisations that rely on Arctis for ARCHIBUS implementation, development, support and consulting, with the services delivered for each.",
  alternates: { canonical: "/references" },
};

export default async function ReferencesPage() {
  const references = await getAllReferences();
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="References"
        title={
          <>
            Trusted by organisations that{" "}
            <HeroAccent>run on their buildings</HeroAccent>
          </>
        }
        description="From telecoms and banking to research and industry: the clients we have delivered ARCHIBUS projects for, and exactly what we did for each."
      />

      <section className="flex-1 bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {references.length > 0 ? (
            <>
              <SectionHeading
                eyebrow="Our clients"
                title={`${references.length} clients, one focus`}
                description="Filter by the kind of work, then open a client to see the services we delivered and images from the project."
                className="mb-10"
              />
              <ReferencesExplorer references={references} />
            </>
          ) : (
            <p className="py-16 text-center text-slate-500">
              References are not available at the moment.
            </p>
          )}
        </div>
      </section>

      <SimpleCallToAction
        title="Could your organisation be next?"
        subtitle="Tell us about your portfolio and what you want to improve. We will show you how similar clients approached it."
        buttonText="Talk to an expert"
      />
    </div>
  );
}
