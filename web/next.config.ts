import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le site est généré en pages statiques (dossier `out/`) et servi tel quel
  // par un Worker Cloudflare, sans serveur Node. Le contenu Sanity est donc figé
  // au build : chaque publication dans le Studio appelle, via un webhook Sanity,
  // le Deploy Hook du Worker (Settings → Builds), qui relance un build.
  //
  // Next.js garde les réponses de Sanity dans `.next/cache/fetch-cache` pendant
  // un an, et Cloudflare conserve ce dossier d'un build à l'autre : le script
  // `build` le vide d'abord, sinon les nouvelles publications seraient ignorées.
  output: "export",
  images: {
    // L'optimisation d'images intégrée exige un serveur : c'est le CDN de
    // Sanity qui redimensionne à la place.
    loader: "custom",
    loaderFile: "./src/lib/sanity/image-loader.ts",
  },
};

export default nextConfig;
