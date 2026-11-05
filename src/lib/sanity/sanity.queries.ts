// src/lib/sanity/sanity.queries.ts

import { cache } from "react";
import { groq } from "next-sanity";
import { client, urlFor } from "./sanity.client";

import type {
  QueryResultReferenceLogo,
  ProcessedLogo,
  QueryResultStoryListItem,
  QueryResultSingleStory,
  QueryResultArchibusProduct,
  QueryResultReference,
} from "@/types/sanity";

// ============================================================================
// Cache konfiguracija — centralizirano na jednom mjestu
// ----------------------------------------------------------------------------
// Svježina sadržaja se primarno osigurava on-demand revalidacijom preko
// Sanity webhooka (/api/revalidate) koji poziva revalidateTag(<_type>).
// Vremenska revalidacija je samo "fallback" — namjerno je duga kako bi se
// smanjio broj ISR writeova na Vercelu (svaka regeneracija stranice = write).
// Tagovi = Sanity _type dokumenta, tako da webhook može jednostavno
// revalidirati `body._type`.
// ============================================================================

const CACHE_DEFAULT = 3600; // 1 sat — postovi, success stories, reference
const CACHE_LONG = 86400; // 24 sata — logotipi, Archibus proizvodi

export const SANITY_TAGS = {
  post: "post",
  successStories: "successStories",
  references: "references",
  archibusProducts: "archibusProducts",
} as const;

// ============================================================================
// Reference Logos (za ClientLogos carousel)
// ============================================================================

const referenceLogosQuery = groq`
  *[_type == "references" && defined(logo.asset)]{
    _id,
    "clientName": client.name,
    "logoAssetRef": logo.asset
  }
`;

export async function getClientLogos(): Promise<ProcessedLogo[]> {
  try {
    const references = await client.fetch<QueryResultReferenceLogo[]>(
      referenceLogosQuery,
      {},
      {
        next: {
          revalidate: CACHE_LONG,
          tags: [SANITY_TAGS.references],
        },
      },
    );

    if (!references || !Array.isArray(references)) return [];

    return references
      .map((ref): ProcessedLogo | null => {
        if (!ref.logoAssetRef?._ref) return null;

        const imageUrl =
          urlFor(ref.logoAssetRef)
            .width(240)
            .auto("format")
            .quality(80)
            .url() ?? null;

        return {
          key: ref._id,
          alt: ref.clientName || "Client Logo",
          imageUrl,
        };
      })
      .filter((logo): logo is ProcessedLogo => logo !== null);
  } catch (error) {
    console.error("Failed to fetch client logos:", error);
    return [];
  }
}

// ============================================================================
// Posts / Success Stories — liste
// ============================================================================

const storyListProjection = groq`{
  _id,
  _type,
  title,
  slug,
  publishedAt,
  description,
  "mainImageUrl": image.asset->url,
  externalImg,
  externalNews{ flag, link }
}`;

const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) ${storyListProjection}
`;

const successStoriesQuery = groq`
  *[_type == "successStories"] | order(publishedAt desc) ${storyListProjection}
`;

export async function getAllPostsList(): Promise<QueryResultStoryListItem[]> {
  try {
    return await client.fetch<QueryResultStoryListItem[]>(
      postsQuery,
      {},
      {
        next: {
          revalidate: CACHE_DEFAULT,
          tags: [SANITY_TAGS.post],
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch all posts list:", error);
    return [];
  }
}

export async function getAllSuccessStoriesList(): Promise<
  QueryResultStoryListItem[]
> {
  try {
    return await client.fetch<QueryResultStoryListItem[]>(
      successStoriesQuery,
      {},
      {
        next: {
          revalidate: CACHE_DEFAULT,
          tags: [SANITY_TAGS.successStories],
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch all success stories list:", error);
    return [];
  }
}

// ============================================================================
// Single Post / Success Story
// ============================================================================

const singleStoryProjection = groq`{
  _id,
  _type,
  title,
  slug,
  publishedAt,
  "mainImageUrl": image.asset->url,
  externalImg,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "imageUrl": asset->url
    }
  },
  externalNews{ flag, link }
}`;

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] ${singleStoryProjection}
`;

const successStoryBySlugQuery = groq`
  *[_type == "successStories" && slug.current == $slug][0] ${singleStoryProjection}
`;

export const getPostBySlug = cache(async function getPostBySlug(
  slug: string,
): Promise<QueryResultSingleStory | null> {
  if (!slug) return null;
  try {
    return await client.fetch<QueryResultSingleStory | null>(
      postBySlugQuery,
      { slug },
      {
        next: {
          revalidate: CACHE_DEFAULT,
          tags: [SANITY_TAGS.post, `post:${slug}`],
        },
      },
    );
  } catch (error) {
    console.error(`Failed to fetch post with slug "${slug}":`, error);
    return null;
  }
});

export const getSuccessStoryBySlug = cache(async function getSuccessStoryBySlug(
  slug: string,
): Promise<QueryResultSingleStory | null> {
  if (!slug) return null;
  try {
    return await client.fetch<QueryResultSingleStory | null>(
      successStoryBySlugQuery,
      { slug },
      {
        next: {
          revalidate: CACHE_DEFAULT,
          tags: [SANITY_TAGS.successStories, `successStories:${slug}`],
        },
      },
    );
  } catch (error) {
    console.error(`Failed to fetch success story with slug "${slug}":`, error);
    return null;
  }
});

// ============================================================================
// Slugovi — za generateStaticParams (pre-render pri buildu)
// ============================================================================

const slugsByTypeQuery = groq`
  *[_type == $type && defined(slug.current)].slug.current
`;

export async function getSlugsByType(
  type: typeof SANITY_TAGS.post | typeof SANITY_TAGS.successStories,
): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(
      slugsByTypeQuery,
      { type },
      { next: { revalidate: CACHE_DEFAULT, tags: [type] } },
    );
    return Array.isArray(slugs) ? slugs : [];
  } catch (error) {
    console.error(`Failed to fetch slugs for type "${type}":`, error);
    return [];
  }
}

// ============================================================================
// Archibus Products
// ============================================================================

const archibusProductsQuery = groq`
  *[_type == "archibusProducts"] | order(displayOrder asc) {
    _id,
    name,
    icon,
    headerImg,
    displayOrder,
    subMenuItem[]{
      _key,
      _type,
      name,
      body
    }
  }
`;

export async function getArchibusProducts(): Promise<
  QueryResultArchibusProduct[]
> {
  try {
    return await client.fetch<QueryResultArchibusProduct[]>(
      archibusProductsQuery,
      {},
      {
        next: {
          revalidate: CACHE_LONG,
          tags: [SANITY_TAGS.archibusProducts],
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch Archibus products:", error);
    return [];
  }
}

// ============================================================================
// References (Full List)
// ============================================================================

const allReferencesQuery = groq`
  *[_type == "references"] | order(client.name asc) {
    _id,
    client {
      name,
      url
    },
    typeOfWork,
    slug,
    logo {
      asset,
      alt
    },
    servicesProvided[]{
      _key,
      serviceName,
      subservices
    },
    imageGallery[]{
      asset,
      _key,
      alt
    }
  }
`;

export async function getAllReferences(): Promise<QueryResultReference[]> {
  try {
    return await client.fetch<QueryResultReference[]>(
      allReferencesQuery,
      {},
      {
        next: {
          revalidate: CACHE_DEFAULT,
          tags: [SANITY_TAGS.references],
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch all references:", error);
    return [];
  }
}

export { urlFor };
