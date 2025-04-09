import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/lib/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

/**
 * Validates required environment variables
 */
if (!projectId) {
  throw new Error(
    "The `NEXT_PUBLIC_SANITY_PROJECT_ID` environment variable is missing."
  );
}
if (!dataset) {
  throw new Error(
    "The `NEXT_PUBLIC_SANITY_DATASET` environment variable is missing."
  );
}

/**
 * Sanity Studio configuration
 * Defines project settings, plugins, and schema for the content management system
 */
export default defineConfig({
  name: "arctis-project-studio",
  title: "Arctis Content Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
