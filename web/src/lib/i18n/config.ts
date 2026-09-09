export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/**
 * Le français reste à la racine (`/nos-chats`) : ces URL sont déjà indexées par
 * Google et les déplacer sous `/fr/` ferait perdre le référencement acquis.
 * L'anglais vit sous `/en/`, avec ses propres segments — un chemin anglais se
 * positionne mieux sur une recherche anglaise qu'un chemin français.
 */
const ROUTES = {
  home: { fr: "/", en: "/en" },
  cats: { fr: "/nos-chats", en: "/en/our-cats" },
  kittens: { fr: "/nos-chatons", en: "/en/our-kittens" },
  news: { fr: "/actualites", en: "/en/news" },
  faq: { fr: "/faq", en: "/en/faq" },
  contact: { fr: "/contact", en: "/en/contact" },
  legalNotice: { fr: "/mentions-legales", en: "/mentions-legales" },
  privacy: { fr: "/politique-de-confidentialite", en: "/politique-de-confidentialite" },
} as const;

export type RouteKey = keyof typeof ROUTES;

/** URL d'une page dans une langue donnée. */
export function route(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

/** URL d'une fiche (chat, portée, actualité) dans une langue donnée. */
export function detailRoute(
  key: Extract<RouteKey, "cats" | "kittens" | "news">,
  locale: Locale,
  slug: string,
): string {
  return `${route(key, locale)}/${slug}`;
}

/**
 * Équivalent d'une URL dans l'autre langue, pour le sélecteur de langue et les
 * balises hreflang.
 */
export function alternateOf(path: string, target: Locale): string {
  const source: Locale = target === "en" ? "fr" : "en";
  const keys = Object.keys(ROUTES) as RouteKey[];

  // Correspondance exacte d'abord. Sans cette première passe, "/en/our-cats"
  // serait capturé par l'accueil anglais ("/en") en tant que préfixe et
  // renverrait "/our-cats" — une URL qui n'existe pas.
  for (const key of keys) {
    if (path === ROUTES[key][source]) return ROUTES[key][target];
  }

  // Puis les fiches de détail, dont le slug est commun aux deux langues.
  // L'accueil est exclu : son chemin préfixe toutes les autres routes.
  for (const key of keys) {
    if (key === "home") continue;
    const from = ROUTES[key][source];
    if (path.startsWith(`${from}/`)) {
      return `${ROUTES[key][target]}${path.slice(from.length)}`;
    }
  }

  return route("home", target);
}
