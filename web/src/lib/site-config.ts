/**
 * Adresse publique du site, utilisée par le sitemap, robots.txt, les balises
 * canoniques, hreflang et la fiche établissement JSON-LD.
 *
 * Ordre de repli :
 *  1. `NEXT_PUBLIC_SITE_URL` — le domaine définitif, une fois qu'il existe.
 *  2. `URL` — fourni automatiquement par Netlify (ex. https://xxx.netlify.app).
 *     Sans lui, tant que le domaine n'est pas acheté, le site déclarerait à
 *     Google une adresse qui ne résout pas, et rien ne serait indexable.
 *  3. Le domaine prévu, en dernier recours (une URL valide est obligatoire
 *     pour `metadataBase`).
 *
 * `||` et non `??` : une variable définie mais vide doit aussi basculer sur le
 * repli suivant.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  "https://www.chatterie-vents-dautomne.fr";

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
