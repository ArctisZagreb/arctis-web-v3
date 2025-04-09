import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";
import type { QueryResultStoryListItem } from "@/types/sanity";

interface StoryCardProps {
  item: QueryResultStoryListItem;
}

/**
 * StoryCard component for displaying news or success story items
 * Handles both internal and external links with appropriate styling
 */
export default function StoryCard({ item }: StoryCardProps) {
  // Determine resource URL and link behavior
  const isExternal = !!(item.externalNews?.flag && item.externalNews.link);
  let resourceUrl = "#";

  if (isExternal) {
    resourceUrl = item.externalNews!.link!;
  } else if (item.slug?.current) {
    const typePath = item._type === "post" ? "news" : "success-stories";
    resourceUrl = `/${typePath}/${item.slug.current}`;
  }

  const target = isExternal ? "_blank" : "_self";
  const rel = isExternal ? "noopener noreferrer" : undefined;

  // Determine image source with fallback
  const imageUrl = item.mainImageUrl || item.externalImg;
  const displayImageUrl = imageUrl || "/images/placeholder-card.png";

  // Set content type label
  const typeLabel = item._type === "post" ? "News" : "Success Story";

  return (
    <Card className="flex flex-col w-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl h-full border border-gray-200/80 hover:border-gray-300">
      {/* Featured Image */}
      <Link
        href={resourceUrl}
        target={target}
        rel={rel}
        aria-label={`Read more about ${item.title || "this resource"}`}
      >
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
          <Image
            src={displayImageUrl}
            alt={item.title || "Resource image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => {
              console.warn(`Failed to load image: ${displayImageUrl}`);
            }}
          />
        </div>
      </Link>

      {/* Content Section */}
      <CardContent className="p-5 flex flex-col flex-grow">
        {/* Resource Metadata */}
        <div className="flex justify-between items-center mb-3 text-xs text-muted-foreground">
          <Badge variant={item._type === "post" ? "default" : "secondary"}>
            {typeLabel}
          </Badge>
          {item.publishedAt && (
            <time dateTime={item.publishedAt} className="flex-shrink-0 ml-2">
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
          <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
            {item.title || "Untitled Resource"}
            {isExternal && (
              <ExternalLink className="inline-block h-4 w-4 ml-1 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
            )}
          </h3>
        </Link>

        {/* Resource Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
          {item.description || "No description available."}
        </p>
      </CardContent>
    </Card>
  );
}
