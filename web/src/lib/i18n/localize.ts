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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Une valeur vide côté anglais laisse passer le français. */
function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/**
 * Fusionne la traduction par-dessus le français, champ par champ et en
 * profondeur.
 *
 * La descente dans les sous-objets est indispensable : l'onglet anglais de
 * `siteSettings` ne contient que les textes de `pricing`, pas le montant
 * `kittenPrice`. Un remplacement en bloc effaçait donc le prix côté anglais —
 * le site annonçait 2 200 € en français et 2 000 € en anglais.
 *
 * Les tableaux, eux, sont remplacés en bloc : une liste traduite (les questions
 * de la FAQ, les étapes d'adoption) doit être complète, sinon on mélangerait
 * les deux langues au sein d'une même liste.
 */
function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (isEmpty(value)) continue;

    const current = result[key];
    result[key] =
      isPlainObject(value) && isPlainObject(current) ? deepMerge(current, value) : value;
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

  return deepMerge(rest, en as Record<string, unknown>) as T;
}

export function localizeAll<T extends Translatable>(docs: T[], locale: Locale): T[] {
  return docs.map((doc) => localize(doc, locale));
}
