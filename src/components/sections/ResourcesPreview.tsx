// src/components/sections/ResourcesPreview.tsx
//
// "Proof in practice": istaknute priče klijenata (velika kartica + dvije
// manje) i kratki popis najnovijih vijesti. Server komponenta — bez JS-a
// na klijentu.

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getAllPostsList,
  getAllSuccessStoriesList,
} from "@/lib/sanity/sanity.queries";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { QueryResultStoryListItem } from "@/types/sanity";

function getResourceLink(item: QueryResultStoryListItem) {
  if (item.externalNews?.flag && item.externalNews.link) {
    return { href: item.externalNews.link, external: true };
  }
  if (item.slug?.current) {
    const base = item._type === "post" ? "news" : "success-stories";
    return { href: `/${base}/${item.slug.current}`, external: false };
  }
  return null;
}

function StoryImage({
  item,
  sizes,
  priority = false,
}: {
  item: QueryResultStoryListItem;
  sizes: string;
  priority?: boolean;
}) {
  const src = item.mainImageUrl || item.externalImg;
  if (!src) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#0a1430] to-[#050b1f]" />
    );
  }
  // next/image samo za dopuštene domene; ostalo kao obični <img>
  if (src.startsWith("https://cdn.sanity.io/")) {
    return (
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
  );
}

function StoryCard({
  item,
  featured = false,
}: {
  item: QueryResultStoryListItem;
  featured?: boolean;
}) {
  const link = getResourceLink(item);
  if (!link) return null;

  return (
    <Link
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative isolate flex h-full overflow-hidden rounded-2xl bg-[#050b1f] text-white",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        featured ? "min-h-[340px] md:min-h-[460px]" : "min-h-[220px]",
      )}
    >
      <div className="absolute inset-0 -z-10">
        <StoryImage
          item={item}
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 60vw"
              : "(max-width: 1024px) 100vw, 40vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1f] via-[#050b1f]/70 to-[#050b1f]/10" />
      </div>

      <div className={cn("mt-auto w-full", featured ? "p-7 md:p-9" : "p-6")}>
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cyan-200 ring-1 ring-white/15 backdrop-blur">
          Success story
        </span>
        <h3
          className={cn(
            "mt-3 font-semibold tracking-tight text-balance",
            featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl",
          )}
        >
          {item.title}
        </h3>
        {featured && item.description && (
          <p className="mt-3 line-clamp-2 max-w-xl text-[15px] leading-relaxed text-slate-300">
            {item.description}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
          Read the story
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

async function ResourcesPreview() {
  const [posts, stories] = await Promise.all([
    getAllPostsList(),
    getAllSuccessStoriesList(),
  ]);

  const featuredStories = stories.filter((s) => getResourceLink(s)).slice(0, 3);
  const latestPosts = posts.filter((p) => getResourceLink(p)).slice(0, 3);

  if (featuredStories.length === 0 && latestPosts.length === 0) return null;

  const [first, ...rest] = featuredStories;

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Proof in practice"
              title="How leading organisations use ARCHIBUS"
              description="See what a single source of truth for space, assets and operations makes possible."
            />
            <Link
              href="/success-stories"
              className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              All success stories
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {first && (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <Reveal>
              <StoryCard item={first} featured />
            </Reveal>
            {rest.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {rest.map((story, i) => (
                  <Reveal key={story._id} delay={0.08 * (i + 1)}>
                    <StoryCard item={story} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Najnovije vijesti */}
        {latestPosts.length > 0 && (
          <Reveal className="mt-12 border-t border-slate-200 pt-8">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Latest news
              </h3>
              <Link
                href="/news"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                All news
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="divide-y divide-slate-100">
              {latestPosts.map((post) => {
                const link = getResourceLink(post)!;
                return (
                  <li key={post._id}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 py-4"
                    >
                      {post.publishedAt && (
                        <time
                          dateTime={post.publishedAt}
                          className="hidden w-28 shrink-0 text-sm tabular-nums text-slate-500 sm:block"
                        >
                          {format(new Date(post.publishedAt), "MMM d, yyyy")}
                        </time>
                      )}
                      <span className="flex-1 font-medium text-slate-900 transition-colors group-hover:text-blue-700">
                        {post.title}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default ResourcesPreview;
