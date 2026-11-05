import type { MetadataRoute } from "next";
import { siteInfo } from "@/data/siteInfo";
import { getSlugsByType } from "@/lib/sanity/sanity.queries";

const staticRoutes = [
  "",
  "/aboutus",
  "/project-management",
  "/implementation",
  "/consulting",
  "/archibus",
  "/roi",
  "/roi-info",
  "/news",
  "/success-stories",
  "/faq",
  "/references",
  "/contact",
  "/privacy-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteInfo.siteUrl;
  const [postSlugs, storySlugs] = await Promise.all([
    getSlugsByType("post"),
    getSlugsByType("successStories"),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      priority: route === "" ? 1 : 0.7,
    })),
    ...postSlugs.map((slug) => ({ url: `${base}/news/${slug}`, priority: 0.5 })),
    ...storySlugs.map((slug) => ({
      url: `${base}/success-stories/${slug}`,
      priority: 0.5,
    })),
  ];
}
