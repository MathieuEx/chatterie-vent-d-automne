/**
 * Adresse publique du site, utilisée par le sitemap, robots.txt, les balises
 * canoniques, hreflang et la fiche établissement JSON-LD.
 *
 * `NEXT_PUBLIC_SITE_URL` (réglée dans les variables de build Cloudflare), avec
 * le domaine principal en repli : une URL valide est obligatoire pour
 * `metadataBase`.
 *
 * `||` et non `??` : une variable définie mais vide doit aussi basculer sur le
 * repli.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ventsdautomne.com";

export const SITE_NAME = "La Chatterie des Vents d'Automne";

export const SITE_CONFIG = {
  name: SITE_NAME,
  tagline: "Élevage familial de chats Ragdoll à Toulouse",
  description:
    "Élevage familial de chats Ragdoll à Toulouse. Chatons élevés en famille, santé testée, suivi vétérinaire complet et pedigree LOOF.",
  email: "ragdollamelie@gmail.com",
  phone: "+33782187784",
  phoneDisplay: "07 82 18 77 84",
  instagram: "https://www.instagram.com/ragdoll_des_vents_dautomne",
  address: {
    streetAddress: "201 Rte d'Albi",
    postalCode: "31200",
    addressLocality: "Toulouse",
    addressCountry: "FR",
  },
};
