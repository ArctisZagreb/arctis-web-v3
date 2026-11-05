import type { MetadataRoute } from "next";
import { siteInfo } from "@/data/siteInfo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/"],
    },
    sitemap: `${siteInfo.siteUrl}/sitemap.xml`,
  };
}
