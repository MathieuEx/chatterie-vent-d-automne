import type { Metadata } from "next";
import type { Seo } from "@/lib/sanity/types";

/**
 * Construit les métadonnées d'une page en laissant le CMS prendre le dessus.
 * Si Amélie ne renseigne rien dans l'onglet "Référencement", on garde le
 * titre et la description écrits dans le code.
 */
export function pageMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  path,
}: {
  seo?: Seo | null;
  fallbackTitle: string;
  fallbackDescription: string;
  path: string;
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}
