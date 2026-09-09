/**
 * Normalise un texte libre en slug d'URL sûr.
 *
 * Le slug d'un chat était saisi à la main dans le Studio (ex: "NL* Snows Cat
 * Crew Ace"), ce qui produisait une URL contenant des espaces et une astérisque
 * et donc une page 404. On applique donc cette fonction à la saisie manuelle
 * comme au bouton "Generate".
 */
export function slugify(input) {
  return (input ?? '')
    .normalize('NFD')
    // supprime les accents (é → e, ç → c…)
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    // tout ce qui n'est pas alphanumérique devient un tiret
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/g, '')
}

/**
 * Options à étaler dans un champ `slug` pour garantir une URL valide,
 * quel que soit ce qui est tapé dans le Studio.
 */
export function slugOptions(source) {
  return {
    source,
    maxLength: 96,
    slugify,
  }
}

/** Refuse un slug qui casserait l'URL, même s'il a été forcé à la main. */
export const slugValidation = (Rule) =>
  Rule.required().custom((value) => {
    const current = value?.current
    if (!current) return 'Le slug est obligatoire — cliquez sur "Generate".'
    if (current !== slugify(current)) {
      return `Slug invalide (espaces, accents ou caractères spéciaux). Utilisez : "${slugify(current)}"`
    }
    return true
  })
