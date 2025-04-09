import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableTextReactComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/sanity.client"; // Adjust path if needed
import { ExternalLink } from "lucide-react";

/**
 * Extracts YouTube Video ID from various URL formats
 * @param url - The YouTube URL
 * @returns The video ID or null if not found
 */
function getYouTubeId(url: string | undefined): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export const CustomPortableTextComponents: Partial<PortableTextReactComponents> =
  {
    // --- Block Styles ---
    // Note: If using @tailwindcss/typography's `prose` class on the container,
    // these definitions might only be needed for significant style overrides.
    // The `prose` class handles h1-h6, p, blockquote, lists, strong, em etc.
    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-10 mb-5 border-b pb-3">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800 mt-8 mb-4 border-b pb-2">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl md:text-2xl font-semibold text-gray-700 mt-6 mb-3">
          {children}
        </h4>
      ),
      normal: ({ children }) => {
        // Avoid rendering empty paragraphs
        if (
          React.Children.count(children) === 1 &&
          (children as any[])[0] === ""
        ) {
          return null;
        }
        return (
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
            {children}
          </p>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 italic text-gray-600 pl-4 py-2 my-6">
          {children}
        </blockquote>
      ),
      cite: ({ children }) => (
        <cite className="block text-right text-sm text-gray-500 mt-1 mb-4 pr-4">
          {children}
        </cite>
      ),
      // Add h5, h6 if needed
    },

    // --- List Styles ---
    // Again, `prose` handles basic list styling well. Override if needed.
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc space-y-2 pl-6 my-5 text-base md:text-lg text-gray-700 leading-relaxed">
          {children}
        </ul>
      ),
      // Add 'number' if you use numbered lists
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
    },

    // --- Custom Types ---
    types: {
      image: ({ value }) => {
        // value has type 'Image & {alt?: string}' because we added 'alt' field in blockContent schema
        const altText = value.alt || "Decorative image related to content";
        // Use urlFor to get image properties
        const imageUrl = urlFor(value)
          // You can add optimizations here if needed, e.g., .width(1000).auto('format').url()
          .url();

        if (!imageUrl) {
          console.warn("Image missing URL:", value);
          return (
            <div className="my-6 text-center text-red-500">
              [Image not available]
            </div>
          );
        }

        // Attempt to get dimensions from the asset reference if available for intrinsic sizing
        // This requires fetching asset metadata. If not fetched, provide defaults or use fill.
        // const dimensions = value.asset?._ref // Need to resolve ref to get metadata e.g., 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg'
        // let width = 800; // Default
        // let height = 600; // Default
        // if (dimensions) {
        //    try {
        //       const [, , dims] = dimensions.split('-');
        //       const [w, h] = dims.split('x').map(Number);
        //       width = w;
        //       height = h;
        //    } catch (e) { console.error("Error parsing image dimensions", e)}
        // }

        return (
          <figure className="my-8 text-center">
            {" "}
            {/* Use figure for semantic grouping */}
            <Image
              src={imageUrl}
              alt={altText}
              width={800} // Provide a sensible width constraint
              height={600} // Provide a corresponding height or calculate aspect ratio
              sizes="(max-width: 768px) 100vw, 800px" // Adjust sizes based on your layout/breakpoint
              className="mx-auto rounded-lg shadow-md object-contain" // Center image, add style
            />
            {value.alt && ( // Display alt text as caption if it exists (optional behavior)
              <figcaption className="mt-3 text-sm text-gray-500 italic">
                {value.alt}
              </figcaption>
            )}
          </figure>
        );
      },

      youtube: ({ value }) => {
        const id = getYouTubeId(value?.url);
        const description = value?.videoDesc;

        if (!id) {
          return <div className="my-6 text-red-500">[Invalid YouTube URL]</div>;
        }

        return (
          <figure className="my-8">
            {" "}
            {/* Use figure for semantic grouping */}
            <div
              className="relative w-full overflow-hidden rounded-lg shadow-md"
              style={{ paddingTop: "56.25%" }} // 16:9 Aspect Ratio
            >
              <iframe
                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full border-0"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {description && (
              <figcaption className="mt-3 text-sm text-gray-500 italic text-center">
                {description}
              </figcaption>
            )}
          </figure>
        );
      },
    },

    // --- Mark Definitions ---
    marks: {
      link: ({ children, value }) => {
        const href = value?.href || "";
        const isInternal = href.startsWith("/") || href.startsWith("#"); // Basic check for internal links
        // More robust: Check against process.env.NEXT_PUBLIC_SITE_URL if needed

        if (isInternal) {
          return (
            <Link
              href={href}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {children}
            </Link>
          );
        }

        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center transition-colors"
          >
            {children}
            <ExternalLink className="inline-block h-4 w-4 ml-1 flex-shrink-0" />{" "}
            {/* Icon for external links */}
          </a>
        );
      },
      // Basic decorators - usually handled by `prose` plugin
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      underline: ({ children }) => <u className="underline">{children}</u>,
      "strike-through": ({ children }) => (
        <s className="line-through">{children}</s>
      ),
    },
  };
