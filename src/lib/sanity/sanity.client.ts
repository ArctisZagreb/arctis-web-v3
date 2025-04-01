// src/lib/sanity.client.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;
const useCdn = process.env.NODE_ENV === "production"; // Koristi CDN u produkciji

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
if (!apiVersion) throw new Error("Missing NEXT_PUBLIC_SANITY_API_VERSION");

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn, // if you want to ensure fresh data
  // perspective: 'published', // default, or 'preview' for drafts
  // token: process.env.SANITY_API_READ_TOKEN // Uncomment this line if using token for preview or mutations
  // stega: true // Enable if using Visual Editing (https://www.sanity.io/docs/visual-editing)
});

// Helper for generating image URLs with only the asset reference data in your documents
// Read more: https://www.sanity.io/docs/image-url
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
