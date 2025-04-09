import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getSuccessStoryBySlug } from "@/lib/sanity/sanity.queries";
import { CustomPortableTextComponents } from "@/components/portable-text/CustomPortableTextComponents";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

type PageParams = {
  slug: string;
};

interface SuccessStoryDetailPageProps {
  params: Promise<PageParams>;
}

/**
 * Generates metadata for the success story page
 * Uses story data to create SEO-friendly title, description and Open Graph tags
 */
export async function generateMetadata(
  { params }: SuccessStoryDetailPageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const story = await getSuccessStoryBySlug(resolvedParams.slug);

  if (!story) {
    return { title: "Success Story Not Found" };
  }

  return {
    title: `${story.title || "Success Story"} | Arctis`,
    description: story.description || "Read this success story from Arctis.",
    openGraph: {
      title: story.title || "Success Story | Arctis",
      description: story.description || "",
      type: "article",
      publishedTime: story.publishedAt || undefined,
      images: story.mainImageUrl
        ? [
            {
              url: story.mainImageUrl,
              alt: story.imageAlt || story.title || "Success Story Image",
            },
          ]
        : [],
    },
  };
}

/**
 * Success story detail page that displays a single case study
 * Renders the story title, metadata, featured image, and content
 */
export default async function SuccessStoryDetailPage({
  params,
}: SuccessStoryDetailPageProps) {
  const resolvedParams = await params;
  const story = await getSuccessStoryBySlug(resolvedParams.slug);

  if (!story) {
    notFound();
  }

  const displayImageUrl = story.mainImageUrl || story.externalImg;
  const displayImageAlt =
    story.imageAlt || story.title || "Success story main image";

  return (
    <article className="flex flex-col">
      <main className="flex-1 py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Story Header */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
              {story.title || "Untitled Success Story"}
            </h1>

            {/* Publication Metadata */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
              {story.publishedAt && (
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1.5" />
                  <time dateTime={story.publishedAt}>
                    Published on{" "}
                    {format(new Date(story.publishedAt), "MMMM d, yyyy")}
                  </time>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {displayImageUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md mb-8 bg-gray-100">
                <Image
                  src={displayImageUrl}
                  alt={displayImageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 960px"
                />
              </div>
            )}
          </header>

          {/* Story Content */}
          {story.body ? (
            <div className="prose prose-lg lg:prose-xl max-w-none">
              <PortableText
                value={story.body}
                components={CustomPortableTextComponents}
              />
            </div>
          ) : (
            <p className="text-muted-foreground">
              Success story content is not available.
            </p>
          )}
        </div>
      </main>
    </article>
  );
}
