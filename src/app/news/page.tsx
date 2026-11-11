import React from "react";
import { Metadata } from "next";
import { getAllPostsList } from "@/lib/sanity/sanity.queries";
import { PageHero, HeroAccent } from "@/components/ui/page-hero";
import NewsListClient from "@/components/post/NewsListClient";

export const metadata: Metadata = {
  title: "News",
  description:
    "Stay updated with the latest news, articles, and insights from Arctis d.o.o., experts in IWMS and ARCHIBUS.",
};

/**
 * News page that displays a list of all articles
 * Server component that passes fetched data to client components
 */
export default async function NewsPage() {
  // Fetch all posts server-side
  const allPosts = await getAllPostsList();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PageHero
        eyebrow="News"
        title={
          <>
            News & <HeroAccent>insights</HeroAccent>
          </>
        }
        description="Explore the latest updates, articles, and developments from the Arctis team and the IWMS industry."
      />

      {/* Content Area */}
      <div className="flex-1 py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <NewsListClient initialPosts={allPosts} />
        </div>
      </div>
    </div>
  );
}
