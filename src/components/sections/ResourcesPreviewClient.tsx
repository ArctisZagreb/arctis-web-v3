"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { QueryResultStoryListItem } from "@/types/sanity";
import { format } from "date-fns";

/**
 * Generates the appropriate URL for different resource types
 * Handles external links and internal routes based on resource properties
 */
function getResourceUrl(item: QueryResultStoryListItem): string {
  if (item.externalNews?.flag && item.externalNews.link) {
    return item.externalNews.link;
  }
  if (item.slug?.current) {
    const typePath = item._type === "post" ? "news" : "success-stories";
    return `/${typePath}/${item.slug.current}`;
  }
  console.warn(`Could not generate URL for item: ${item._id}`);
  return "#";
}

interface ResourcesPreviewClientProps {
  resourcesToShow: QueryResultStoryListItem[];
}

/**
 * Client Component for displaying resource cards in a grid layout
 * Renders news and success stories with appropriate metadata and styling
 */
export default function ResourcesPreviewClient({
  resourcesToShow,
}: ResourcesPreviewClientProps) {
  if (resourcesToShow.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 md:mb-14 text-center">
          <p className="mt-8 text-muted-foreground">
            No recent resources found. Check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resourcesToShow.map((item) => {
          const resourceUrl = getResourceUrl(item);
          const isExternal = !!(
            item.externalNews?.flag && item.externalNews.link
          );
          const target = isExternal ? "_blank" : "_self";
          const rel = isExternal ? "noopener noreferrer" : undefined;
          const imageUrl = item.mainImageUrl || item.externalImg;
          const displayImageUrl = imageUrl || "/images/placeholder-card.png";
          const typeLabel = item._type === "post" ? "News" : "Success Story";

          return (
            <div key={item._id} className="flex">
              <Card className="flex flex-col w-full h-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl border border-gray-200/80 hover:border-gray-300">
                <Link
                  href={resourceUrl}
                  target={target}
                  rel={rel}
                  aria-label={item.title || "View resource"}
                >
                  <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
                    <Image
                      src={displayImageUrl}
                      alt={item.title || "Resource image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <CardContent className="p-5 flex flex-col flex-grow">
                  {/* Resource Metadata */}
                  <div className="flex justify-between items-center mb-3 text-xs text-muted-foreground">
                    <Badge
                      variant={item._type === "post" ? "default" : "secondary"}
                    >
                      {typeLabel}
                    </Badge>
                    {item.publishedAt && (
                      <time
                        dateTime={item.publishedAt}
                        className="flex-shrink-0 ml-2"
                      >
                        {format(new Date(item.publishedAt), "MMM d, yyyy")}
                      </time>
                    )}
                  </div>

                  {/* Resource Title */}
                  <Link
                    href={resourceUrl}
                    target={target}
                    rel={rel}
                    className="group mb-2"
                  >
                    <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 group-hover:text-blue-700 transition-colors">
                      {item.title || "Untitled Resource"}
                      {isExternal && (
                        <ExternalLink className="inline-block h-4 w-4 ml-1 text-gray-500 group-hover:text-blue-600 transition-colors" />
                      )}
                    </h3>
                  </Link>

                  {/* Resource Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-grow mb-4">
                    {item.description || "No description available."}
                  </p>

                  {/* Action Link */}
                  <Link
                    href={resourceUrl}
                    target={target}
                    rel={rel}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center group mt-auto pt-2"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
