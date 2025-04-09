import React from "react";
import { Metadata } from "next";
import { getAllPostsList } from "@/lib/sanity/sanity.queries";
import { HeaderBackground } from "@/components/ui/header-background";
import NewsListClient from "@/components/post/NewsListClient";

export const metadata: Metadata = {
  title: "News | Arctis",
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
      <section className="relative py-20 md:py-28 lg:py-32 text-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
        <HeaderBackground />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            News & Insights
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the latest updates, articles, and developments from the
            Arctis team and the IWMS industry.
          </p>
        </div>
      </section>

      {/* Content Area */}
      <main className="flex-1 py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <NewsListClient initialPosts={allPosts} />
        </div>
      </main>
    </div>
  );
}
