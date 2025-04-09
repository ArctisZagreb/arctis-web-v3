"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Renders the Sanity Studio V3 interface
 * This page allows content editors to manage content in the CMS
 */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
