import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  getAllPostsList,
  getAllSuccessStoriesList,
} from "@/lib/sanity/sanity.queries";
import ResourcesPreviewClient from "./ResourcesPreviewClient";

/**
 * ResourcesPreview - Server Component
 * Fetches and displays the latest resources (blog posts and success stories)
 * in a paginated preview section with a link to view all resources.
 */
async function ResourcesPreview() {
  // Fetch latest posts and success stories in parallel
  const [latestPosts, latestStories] = await Promise.all([
    getAllPostsList(),
    getAllSuccessStoriesList(),
  ]);

  // Combine both resource types and sort by publication date (newest first)
  const combinedResources = [...latestPosts, ...latestStories].sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime()
  );

  // Limit display to the 3 most recent resources
  const resourcesToShow = combinedResources.slice(0, 3);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white border-t">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-10 md:mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            Latest Resources
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Stay updated with our latest news and success stories.
          </p>
        </div>

        {/* Resources List (Client Component) */}
        <ResourcesPreviewClient resourcesToShow={resourcesToShow} />

        {/* Call-to-Action */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/news">
              View All Resources <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ResourcesPreview;
