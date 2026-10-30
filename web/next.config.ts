import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le site est généré en pages statiques (dossier `out/`) et servi tel quel
  // par Cloudflare Pages, sans serveur Node. Le contenu Sanity est donc figé
  // au build : chaque publication relance un déploiement via un webhook.
  output: "export",
  images: {
    // L'optimisation d'images intégrée exige un serveur : c'est le CDN de
    // Sanity qui redimensionne à la place.
    loader: "custom",
    loaderFile: "./src/lib/sanity/image-loader.ts",
  },
};

export default nextConfig;
