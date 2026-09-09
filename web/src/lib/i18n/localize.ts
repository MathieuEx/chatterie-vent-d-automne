import type { Locale } from "./config";

/**
 * Chaque document Sanity traduisible porte un objet `en` qui reprend ses champs
 * rédactionnels. On fusionne cet objet par-dessus le document quand la page est
 * en anglais.
 *
 * Un champ anglais laissé vide n'écrase rien : la version française réapparaît
 * à sa place. Amélie peut donc traduire au fil de l'eau sans jamais laisser un
 * trou sur le site.
 */
type Translatable = { en?: object | null };

/** Retire les valeurs vides pour qu'elles ne masquent pas le français. */
function meaningfulEntries(source: object): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(source)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    result[key] = value;
  }

  return result;
}

export function localize<T extends Translatable>(doc: T, locale: Locale): T;
export function localize<T extends Translatable>(doc: T | null, locale: Locale): T | null;
export function localize<T extends Translatable>(doc: T | null, locale: Locale): T | null {
  if (!doc) return null;

  // `en` est retiré du document renvoyé : sans cela, chaque page française
  // embarquerait toute sa traduction anglaise dans le payload envoyé au
  // navigateur (et inversement), pour un contenu jamais affiché.
  const { en, ...rest } = doc;

  if (locale === "fr" || !en) return rest as T;

  return { ...rest, ...meaningfulEntries(en) } as T;
}

export function localizeAll<T extends Translatable>(docs: T[], locale: Locale): T[] {
  return docs.map((doc) => localize(doc, locale));
}
