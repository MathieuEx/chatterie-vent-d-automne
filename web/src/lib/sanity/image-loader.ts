"use client";

/**
 * Loader `next/image` pour l'export statique.
 *
 * Sans serveur, Next.js ne peut plus redimensionner les images lui-même. Le CDN
 * de Sanity sait le faire : on réécrit simplement la largeur demandée dans
 * l'URL. La hauteur est ajustée dans la même proportion, sans quoi le cadrage
 * choisi via `urlFor(...).width().height()` serait déformé.
 *
 * Les fichiers locaux (public/, ex. le logo) sont servis tels quels.
 */
export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!src.startsWith("https://cdn.sanity.io/")) {
    return src;
  }

  const url = new URL(src);
  const params = url.searchParams;

  const baseWidth = Number(params.get("w"));
  const baseHeight = Number(params.get("h"));
  if (baseWidth && baseHeight) {
    params.set("h", String(Math.round((baseHeight * width) / baseWidth)));
  }

  params.set("w", String(width));
  params.set("q", String(quality ?? 75));
  params.set("auto", "format");

  return url.toString();
}
