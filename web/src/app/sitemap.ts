import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getArticleSlugs, getCatSlugs, getLitterSlugs } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/nos-chats", "/nos-chatons", "/actualites", "/faq", "/contact"];
  const [catSlugs, litterSlugs, articleSlugs] = await Promise.all([
    getCatSlugs(),
    getLitterSlugs(),
    getArticleSlugs(),
  ]);

  const staticEntries = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "/nos-chatons" || route === "/actualites"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const catEntries = catSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/nos-chats/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const litterEntries = litterSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/nos-chatons/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articleEntries = articleSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/actualites/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...catEntries, ...litterEntries, ...articleEntries];
}
