import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getPostBySlug } from "@/lib/sanity/sanity.queries";
import { CustomPortableTextComponents } from "@/components/portable-text/CustomPortableTextComponents";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

type PageParams = {
  slug: string;
};

interface NewsDetailPageProps {
  params: Promise<PageParams>;
}

/**
 * Generates metadata for the news article page
 * Uses post data to create SEO-friendly title, description and Open Graph tags
 */
export async function generateMetadata(
  { params }: NewsDetailPageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: "News Article Not Found" };
  }

  return {
    title: `${post.title || "News Article"} | Arctis`,
    description: post.description || "Read this news article from Arctis.",
    openGraph: {
      title: post.title || "News Article | Arctis",
      description: post.description || "",
      type: "article",
      publishedTime: post.publishedAt || undefined,
      images: post.mainImageUrl
        ? [
            {
              url: post.mainImageUrl,
              alt: post.imageAlt || post.title || "Article Image",
            },
          ]
        : [],
    },
  };
}

/**
 * News article detail page that displays a single post
 * Renders the article title, metadata, featured image, and content
 */
export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const displayImageUrl = post.mainImageUrl || post.externalImg;
  const displayImageAlt =
    post.imageAlt || post.title || "News article main image";

  return (
    <article className="flex flex-col">
      <main className="flex-1 py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Article Header */}
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
              {post.title || "Untitled Post"}
            </h1>

            {/* Publication Metadata */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
              {post.publishedAt && (
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1.5" />
                  <time dateTime={post.publishedAt}>
                    Published on{" "}
                    {format(new Date(post.publishedAt), "MMMM d, yyyy")}
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

          {/* Article Content */}
          {post.body ? (
            <div className="prose prose-lg lg:prose-xl max-w-none">
              <PortableText
                value={post.body}
                components={CustomPortableTextComponents}
              />
            </div>
          ) : (
            <p className="text-muted-foreground">
              Article content is not available.
            </p>
          )}
        </div>
      </main>
    </article>
  );
}
