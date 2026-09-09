import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getArticleSlugs, getCatSlugs, getLitterSlugs } from "@/lib/sanity/queries";
import { detailRoute, route, type RouteKey } from "@/lib/i18n/config";

/**
 * Chaque page est déclarée dans les deux langues, et chaque entrée porte les
 * `alternates.languages` de l'autre version : c'est ce qui indique à Google
 * qu'il s'agit de la même page traduite, et non de contenu dupliqué.
 */
function bilingualEntry(
  key: RouteKey,
  options: { changeFrequency: "weekly" | "monthly"; priority: number },
) {
  const paths = { fr: route(key, "fr"), en: route(key, "en") };

  return (["fr", "en"] as const).map((locale) => ({
    url: `${SITE_URL}${paths[locale]}`,
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: {
        fr: `${SITE_URL}${paths.fr}`,
        en: `${SITE_URL}${paths.en}`,
      },
    },
  }));
}

function bilingualDetailEntries(
  key: Extract<RouteKey, "cats" | "kittens" | "news">,
  slugs: { slug: string }[],
  options: { changeFrequency: "weekly" | "monthly"; priority: number },
) {
  return slugs.flatMap(({ slug }) => {
    const paths = {
      fr: detailRoute(key, "fr", slug),
      en: detailRoute(key, "en", slug),
    };

    return (["fr", "en"] as const).map((locale) => ({
      url: `${SITE_URL}${paths[locale]}`,
      lastModified: new Date(),
      changeFrequency: options.changeFrequency,
      priority: options.priority,
      alternates: {
        languages: {
          fr: `${SITE_URL}${paths.fr}`,
          en: `${SITE_URL}${paths.en}`,
        },
      },
    }));
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [catSlugs, litterSlugs, articleSlugs] = await Promise.all([
    getCatSlugs(),
    getLitterSlugs(),
    getArticleSlugs(),
  ]);

  return [
    ...bilingualEntry("home", { changeFrequency: "monthly", priority: 1 }),
    ...bilingualEntry("cats", { changeFrequency: "monthly", priority: 0.8 }),
    ...bilingualEntry("kittens", { changeFrequency: "weekly", priority: 0.8 }),
    ...bilingualEntry("news", { changeFrequency: "weekly", priority: 0.8 }),
    ...bilingualEntry("faq", { changeFrequency: "monthly", priority: 0.8 }),
    ...bilingualEntry("contact", { changeFrequency: "monthly", priority: 0.8 }),

    ...bilingualDetailEntries("cats", catSlugs, {
      changeFrequency: "monthly",
      priority: 0.6,
    }),
    ...bilingualDetailEntries("kittens", litterSlugs, {
      changeFrequency: "weekly",
      priority: 0.7,
    }),
    ...bilingualDetailEntries("news", articleSlugs, {
      changeFrequency: "monthly",
      priority: 0.6,
    }),

    // Pages légales : version française uniquement (obligation de droit français).
    {
      url: `${SITE_URL}${route("legalNotice", "fr")}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}${route("privacy", "fr")}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.2,
    },
  ];
}
