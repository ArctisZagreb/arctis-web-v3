// src/lib/sanity/sanity.queries.ts

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

// --- Reference Logos ---

const referenceLogosQuery = groq`
  *[_type == "references" && defined(logo.asset)]{
    _id,
    "clientName": client.name,
    "logoAssetRef": logo.asset // Dohvati samo asset referencu za urlFor
  }`;

/**
 * Dohvaća logotipe iz referenci za ClientLogos vrtuljak.
 * Koristi urlFor za generiranje URL-a s transformacijama.
 */
export async function getClientLogos(): Promise<ProcessedLogo[]> {
  // Add a cache control directive to improve caching behavior
  const cacheOptions = {
    next: {
      revalidate: 3600, // Cache for 1 hour (or adjust as needed)
      tags: ["client-logos"],
    },
  };

  try {
    const references = await client.fetch<QueryResultReferenceLogo[]>(
      referenceLogosQuery,
      {},
      cacheOptions // Apply cache options to the fetch
    );

    if (!references || !Array.isArray(references)) return [];

    // Pre-generate all image URLs at once to reduce processing time
    const processedLogos = references
      .map((ref): ProcessedLogo | null => {
        if (!ref.logoAssetRef?._ref) return null;

        // Generate optimized image URL with correct dimensions and format
        const imageUrl =
          urlFor(ref.logoAssetRef)
            .width(240)
            .auto("format") // Automatically choose best format
            .quality(80)
            .url() ?? null;

        return {
          key: ref._id,
          alt: ref.clientName || "Client Logo",
          imageUrl: imageUrl,
        };
      })
      .filter((logo): logo is ProcessedLogo => logo !== null);

    return processedLogos;
  } catch (error) {
    console.error("Failed to fetch client logos:", error);
    return [];
  }
}
// --- Posts / Success Stories (Lists) ---

// Zajednička projekcija za liste priča
const storyListProjection = groq`{
  _id,
  title,
  slug,
  publishedAt,
  description,
  "mainImageUrl": mainImage.asset->url, // Direktan URL slike
  externalImg,
  externalNews
}`;

const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) ${storyListProjection}`;
const successStoriesQuery = groq`*[_type == "successStories"] | order(publishedAt desc) ${storyListProjection}`;

/**
 * Dohvaća sve objave (posts) za listu.
 */
export async function getAllPostsList(): Promise<QueryResultStoryListItem[]> {
  try {
    // Fetch koristi <QueryResultStoryListItem[]> za očekivani rezultat
    return await client.fetch<QueryResultStoryListItem[]>(
      postsQuery,
      {},
      {
        /* Cache options */
      }
    );
  } catch (error) {
    console.error("Failed to fetch all posts list:", error);
    return [];
  }
}

/**
 * Dohvaća sve uspješne priče za listu.
 */
export async function getAllSuccessStoriesList(): Promise<
  QueryResultStoryListItem[]
> {
  try {
    // Fetch koristi <QueryResultStoryListItem[]> za očekivani rezultat
    return await client.fetch<QueryResultStoryListItem[]>(
      successStoriesQuery,
      {},
      {
        /* Cache options */
      }
    );
  } catch (error) {
    console.error("Failed to fetch all success stories list:", error);
    return [];
  }
}

// --- Single Post / Success Story ---

// Zajednička projekcija za pojedinačni prikaz
const singleStoryProjection = groq`{
    _id,
    title,
    slug,
    publishedAt,
    "mainImageUrl": mainImage.asset->url, // Direktan URL
    externalImg,
    body, // PortableTextBlock polje
    externalNews
}`;

const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] ${singleStoryProjection}`;
const successStoryBySlugQuery = groq`*[_type == "successStories" && slug.current == $slug][0] ${singleStoryProjection}`;

/**
 * Dohvaća jednu objavu prema slugu.
 */
export async function getPostBySlug(
  slug: string
): Promise<QueryResultSingleStory | null> {
  if (!slug) return null;
  try {
    // Fetch koristi <QueryResultSingleStory | null> i prosljeđuje slug parametar
    return await client.fetch<QueryResultSingleStory | null>(
      postBySlugQuery,
      { slug }, // Parametar za query
      {
        /* Cache options */
      }
    );
  } catch (error) {
    console.error(`Failed to fetch post with slug "${slug}":`, error);
    return null; // Vrati null u slučaju greške
  }
}

/**
 * Dohvaća jednu uspješnu priču prema slugu.
 */
export async function getSuccessStoryBySlug(
  slug: string
): Promise<QueryResultSingleStory | null> {
  if (!slug) return null;
  try {
    // Fetch koristi <QueryResultSingleStory | null> i prosljeđuje slug
    return await client.fetch<QueryResultSingleStory | null>(
      successStoryBySlugQuery,
      { slug },
      {
        /* Cache options */
      }
    );
  } catch (error) {
    console.error(`Failed to fetch success story with slug "${slug}":`, error);
    return null;
  }
}

// --- Archibus Products ---

const archibusProductsQuery = groq`
    *[_type == "archibusProducts"] | order(displayOrder asc) {
        _id,
        name,
        icon, // Cijeli Image objekt
        headerImg, // Cijeli Image objekt
        displayOrder,
        subMenuItem[]{
            _key,
            _type,
            name,
            body // PortableTextBlock
        }
    }`;

/**
 * Dohvaća sve Archibus proizvode.
 */
export async function getArchibusProducts(): Promise<
  QueryResultArchibusProduct[]
> {
  try {
    // Fetch koristi <QueryResultArchibusProduct[]>
    return await client.fetch<QueryResultArchibusProduct[]>(
      archibusProductsQuery,
      {},
      {
        /* Cache options */
      }
    );
  } catch (error) {
    console.error("Failed to fetch Archibus products:", error);
    return [];
  }
}

// --- References (Full List) ---

const allReferencesQuery = groq`
*[_type == "references"] | order(client.name asc) {
    _id,
    "clientName": client.name,
    "clientUrl": client.url,
    typeOfWork,
    slug,
    logo, // Cijeli Image objekt za urlFor
    "logoUrl": logo.asset->url, // Opcionalni direktni URL
    servicesProvided[]{
        _key,
        serviceName,
        subservices
    },
    "imageGalleryUrls": imageGallery[].asset->url // Niz URL-ova
}`;

/**
 * Dohvaća sve reference za stranicu s referencama.
 */
export async function getAllReferences(): Promise<QueryResultReference[]> {
  try {
    // Fetch koristi <QueryResultReference[]>
    return await client.fetch<QueryResultReference[]>(
      allReferencesQuery,
      {},
      {
        /* Cache options */
      }
    );
  } catch (error) {
    console.error("Failed to fetch all references:", error);
    return [];
  }
}

// Ponovno izvezi urlFor ako ga trebaš direktno u nekim (klijentskim) komponentama
// Iako je bolja praksa generirati URL-ove ovdje ili u Server Components gdje je moguće.
export { urlFor };
