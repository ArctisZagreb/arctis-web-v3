import React from "react";
import { Metadata } from "next";
import { getAllSuccessStoriesList } from "@/lib/sanity/sanity.queries";
import { HeaderBackground } from "@/components/ui/header-background";
import SuccessStoriesListClient from "@/components/post/SuccessStoriesListClient";

export const metadata: Metadata = {
  title: "Success Stories | Arctis",
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
      <section className="relative py-20 md:py-28 lg:py-32 text-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
        <HeaderBackground />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            Success Stories
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how we&apos;ve helped clients like you transform their
            operations with ARCHIBUS and expert IWMS consultancy.
          </p>
        </div>
      </section>

      {/* Content Area */}
      <main className="flex-1 py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SuccessStoriesListClient initialStories={allStories} />
        </div>
      </main>
    </div>
  );
}
