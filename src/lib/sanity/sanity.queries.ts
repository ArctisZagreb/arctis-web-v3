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
// Updated projection for story lists - added _type
const storyListProjection = groq`{
  _id,
  _type, // Added _type
  title,
  slug,
  publishedAt,
  description,
  "mainImageUrl": image.asset->url,
  externalImg,
  externalNews{ flag, link } // Simplified selection
}`;

const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) ${storyListProjection}`;
const successStoriesQuery = groq`*[_type == "successStories"] | order(publishedAt desc) ${storyListProjection}`;

/**
 * Fetches all posts for list view.
 * Uses updated QueryResultStoryListItem type.
 */
export async function getAllPostsList(): Promise<QueryResultStoryListItem[]> {
  try {
    return await client.fetch<QueryResultStoryListItem[]>(
      postsQuery,
      {},
      { next: { tags: ["post"] } } // Add caching tag
    );
  } catch (error) {
    console.error("Failed to fetch all posts list:", error);
    return [];
  }
}

/**
 * Fetches all success stories for list view.
 * Uses updated QueryResultStoryListItem type.
 */
export async function getAllSuccessStoriesList(): Promise<
  QueryResultStoryListItem[]
> {
  try {
    return await client.fetch<QueryResultStoryListItem[]>(
      successStoriesQuery,
      {},
      { next: { tags: ["successStory"] } } // Add caching tag
    );
  } catch (error) {
    console.error("Failed to fetch all success stories list:", error);
    return [];
  }
}

// --- Single Post / Success Story ---

// Updated projection for single story - added _type
const singleStoryProjection = groq`{
    _id,
    _type, // Added _type
    title,
    slug,
    publishedAt,
    "mainImageUrl": image.asset->url,
    externalImg,
    body[]{ // Ensure all block content fields are selected if needed
        ...,
        // If image has alt defined inline:
        _type == "image" => {
           ...,
           asset->{..., "_ref": asset._ref} // Include asset reference if needed
         },
        // If youtube has fields:
        _type == "youtube" => {
            ...,
            // Select specific youtube fields if necessary
        }
    },
    externalNews{ flag, link }
    // Optional: Add author
    // ,"author": author->{name}
}`;

const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] ${singleStoryProjection}`;
const successStoryBySlugQuery = groq`*[_type == "successStories" && slug.current == $slug][0] ${singleStoryProjection}`;

/**
 * Fetches a single post by slug.
 * Uses updated QueryResultSingleStory type.
 */
export async function getPostBySlug(
  slug: string
): Promise<QueryResultSingleStory | null> {
  if (!slug) return null;
  try {
    return await client.fetch<QueryResultSingleStory | null>(
      postBySlugQuery,
      { slug },
      { next: { tags: [`post:${slug}`] } } // Add specific caching tag
    );
  } catch (error) {
    console.error(`Failed to fetch post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches a single success story by slug.
 * Uses updated QueryResultSingleStory type.
 */
export async function getSuccessStoryBySlug(
  slug: string
): Promise<QueryResultSingleStory | null> {
  if (!slug) return null;
  try {
    return await client.fetch<QueryResultSingleStory | null>(
      successStoryBySlugQuery,
      { slug },
      { next: { tags: [`successStory:${slug}`] } } // Add specific caching tag
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
    client { 
        name,
        url
    },
    typeOfWork,
    slug,
    logo { // Cijeli logo objekt
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
}`;

/**
 * Dohvaća sve reference za stranicu s referencama.
 */
export async function getAllReferences(): Promise<QueryResultReference[]> {
  try {
    // Koristi ažurirani query i tip
    return await client.fetch<QueryResultReference[]>(
      allReferencesQuery, // Osiguraj da koristi ažurirani query
      {},
      { next: { tags: ["references"] } }
    );
  } catch (error) {
    console.error("Failed to fetch all references:", error);
    return [];
  }
}

// Ponovno izvezi urlFor ako ga trebaš direktno u nekim (klijentskim) komponentama
// Iako je bolja praksa generirati URL-ove ovdje ili u Server Components gdje je moguće.
export { urlFor };
