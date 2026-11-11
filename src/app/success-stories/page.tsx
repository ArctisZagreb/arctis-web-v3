import React from "react";
import { Metadata } from "next";
import { getAllSuccessStoriesList } from "@/lib/sanity/sanity.queries";
import { PageHero, HeroAccent } from "@/components/ui/page-hero";
import SuccessStoriesListClient from "@/components/post/SuccessStoriesListClient";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Read about successful IWMS and ARCHIBUS implementations by Arctis d.o.o. Discover how we help clients achieve their facility management goals.",
};

/**
 * Success Stories page that displays client implementations and case studies
 * Server component that passes fetched data to client components
 */
export default async function SuccessStoriesPage() {
  // Fetch all success stories server-side
  const allStories = await getAllSuccessStoriesList();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PageHero
        eyebrow="Success stories"
        title={
          <>
            Results that <HeroAccent>speak for themselves</HeroAccent>
          </>
        }
        description="See how organisations transform their operations with ARCHIBUS and expert IWMS consultancy."
      />

      {/* Content Area */}
      <div className="flex-1 py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SuccessStoriesListClient initialStories={allStories} />
        </div>
      </div>
    </div>
  );
}
