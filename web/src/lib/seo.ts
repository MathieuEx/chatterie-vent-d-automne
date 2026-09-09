import type { Metadata } from "next";
import type { Seo } from "@/lib/sanity/types";
import { alternateOf, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

/**
 * Construit les métadonnées d'une page en laissant le CMS prendre le dessus.
 * Si Amélie ne renseigne rien dans l'onglet "Référencement", on garde le
 * titre et la description écrits dans le code.
 *
 * Les balises `hreflang` disent explicitement à Google que les deux versions
 * sont la même page dans deux langues : sans elles, il les traiterait comme du
 * contenu dupliqué et n'en indexerait qu'une.
 */
export function pageMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  path,
  locale,
}: {
  seo?: Seo | null;
  fallbackTitle: string;
  fallbackDescription: string;
  path: string;
  locale: Locale;
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;

  const other = locale === "fr" ? "en" : "fr";
  const languages = {
    [locale]: path,
    [other]: alternateOf(path, other),
    "x-default": locale === DEFAULT_LOCALE ? path : alternateOf(path, DEFAULT_LOCALE),
  };

  return {
    title,
    description,
    alternates: { canonical: path, languages },
    openGraph: {
      title,
      description,
      url: path,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
    },
  };
}
