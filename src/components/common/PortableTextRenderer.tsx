"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/sanity.queries";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@/types/sanity";
import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";

// Helper function to get image URL from Sanity image source
const getImageUrl = (
  source: SanityImageSource | null | undefined
): string | null => {
  if (
    !source ||
    (typeof source === "object" &&
      !(source as any).asset &&
      !(source as any)._ref)
  ) {
    return null;
  }
  try {
    return urlFor(source)?.auto("format").fit("max").url() ?? null;
  } catch (error) {
    console.error("Error building image URL:", error, "Source:", source);
    return null;
  }
};

// Custom components for rendering Portable Text content
export const customPortableTextComponents: PortableTextComponents = {
  // Block styles
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-5 text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-800 border-b border-gray-200 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-800">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold mt-5 mb-2 text-gray-700">
        {children}
      </h4>
    ),
    normal: ({ children }) => {
      const childArray = React.Children.toArray(children);
      if (
        childArray.length === 1 &&
        typeof childArray[0] === "string" &&
        (childArray[0] as string).trim() === ""
      ) {
        return null;
      }
      return (
        <p className="text-base text-gray-700 leading-relaxed mb-5">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-600 bg-blue-50/60 rounded-r-md shadow-sm">
        {children}
      </blockquote>
    ),
    cite: ({ children }) => (
      <cite className="block text-right text-sm text-muted-foreground mt-2 not-italic pr-2">
        — {children}
      </cite>
    ),
  },

  // List styles
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-1.5 pl-6 my-5 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-1.5 pl-6 my-5 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed marker:text-blue-500">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed marker:text-blue-500">{children}</li>
    ),
  },

  // Custom block types
  types: {
    image: ({ value }) => {
      const imgDesc = value.caption || value.alt || value.imgDesc;
      const imageUrl = getImageUrl(value);

      if (!imageUrl) {
        return (
          <div className="my-6 text-center text-red-500 font-mono text-xs">
            [Image Data Missing or Invalid]
          </div>
        );
      }
      return (
        <figure className="my-8">
          <div className="relative w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg border border-gray-200/80">
            <Image
              src={imageUrl}
              alt={imgDesc || "Content image"}
              width={900}
              height={600}
              className="block w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 900px"
              priority={false}
              unoptimized={imageUrl.endsWith(".gif")}
            />
          </div>
          {imgDesc && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3 px-4">
              {imgDesc}
            </figcaption>
          )}
        </figure>
      );
    },
    youtube: ({ value }) => {
      const videoDesc = value.videoDesc;
      const urlString = value.url;

      if (typeof urlString !== "string") {
        return (
          <div className="my-6 text-center text-red-500 font-mono text-xs">
            [Missing YouTube URL]
          </div>
        );
      }

      let videoId: string | null = null;
      try {
        const url = new URL(urlString);
        if (url.hostname === "youtu.be")
          videoId = url.pathname.slice(1).split("/")[0];
        else if (url.hostname.includes("youtube.com")) {
          videoId = url.searchParams.get("v");
          if (!videoId && url.pathname.includes("/embed/")) {
            const pathParts = url.pathname.split("/");
            const embedIndex = pathParts.indexOf("embed");
            if (embedIndex !== -1 && pathParts.length > embedIndex + 1)
              videoId = pathParts[embedIndex + 1];
          }
        }
      } catch (_e) {
        return (
          <div className="my-6 text-center text-red-500 font-mono text-xs">
            [Invalid YouTube URL Format]
          </div>
        );
      }

      if (!videoId)
        return (
          <div className="my-6 text-center text-red-500 font-mono text-xs">
            [Could not parse YouTube Video ID]
          </div>
        );

      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full max-w-3xl mx-auto bg-black rounded-lg shadow-lg overflow-hidden border border-gray-800">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
              title={videoDesc || "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
          {videoDesc && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3 px-4">
              {videoDesc}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  // Text mark styles
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      if (!href)
        return <span className="text-red-500">[Missing Link URL]</span>;
      const isInternal = href.startsWith("/") || href.startsWith("#");
      const rel = !isInternal ? "noopener noreferrer" : undefined;
      const target = !isInternal ? "_blank" : undefined;

      if (isInternal)
        return (
          <Link
            href={href}
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-sm transition-colors"
          >
            {children}
          </Link>
        );
      return (
        <a
          href={href}
          rel={rel}
          target={target}
          className="text-blue-600 font-medium hover:text-blue-800 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-sm transition-colors inline-flex items-center"
        >
          <span>{children}</span>
          <LinkIcon className="h-3 w-3 ml-1 opacity-80 flex-shrink-0" />
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-red-600 rounded text-[0.9em] font-mono break-words">
        {children}
      </code>
    ),
    underline: ({ children }) => (
      <u className="underline decoration-blue-400 decoration-2 underline-offset-2">
        {children}
      </u>
    ),
    "strike-through": ({ children }) => (
      <s className="line-through text-muted-foreground">{children}</s>
    ),
  },
};

// Main component for rendering Portable Text content
interface PortableTextRendererProps {
  value: PortableTextBlock[] | undefined | null;
  className?: string;
}

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({
  value,
  className,
}) => {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "prose prose-slate max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-a:font-medium",
        "prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-sm prose-img:border",
        "prose-li:my-1",
        "prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50/60 prose-blockquote:rounded-r-md prose-blockquote:shadow-sm",
        "prose-code:before:content-none prose-code:after:content-none prose-code:bg-slate-100 prose-code:border prose-code:border-slate-200 prose-code:text-red-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-code:font-mono",
        "prose-hr:my-8 prose-hr:border-slate-200",
        className
      )}
    >
      <PortableText value={value} components={customPortableTextComponents} />
    </div>
  );
};

export default PortableTextRenderer;
