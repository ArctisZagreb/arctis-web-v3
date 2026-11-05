// src/lib/sanity.client.ts
import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;
// useCdn: false — Next.js data cache već kešira odgovore, a Sanity API (ne CDN)
// garantira svježe podatke kad webhook okine revalidateTag. S CDN-om bi se
// nakon revalidacije mogao ponovno keširati zastarjeli sadržaj.
const useCdn = false;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
if (!apiVersion) throw new Error("Missing NEXT_PUBLIC_SANITY_API_VERSION");

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn,
  // perspective: 'published', // default, or 'preview' for drafts
  // token: process.env.SANITY_API_READ_TOKEN // Uncomment this line if using token for preview or mutations
  // stega: true // Enable if using Visual Editing (https://www.sanity.io/docs/visual-editing)
});

// Helper for generating image URLs with only the asset reference data in your documents
// Read more: https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
