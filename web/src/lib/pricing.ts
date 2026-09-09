import type { Litter, SiteSettings } from "@/lib/sanity/types";

/** Prix de repli si le CMS n'a rien : le tarif historique du site. */
export const FALLBACK_KITTEN_PRICE = 2000;

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return euros.format(amount);
}

/**
 * Prix affiché pour une portée.
 *
 * Priorité : texte libre de la portée → prix de la portée → texte libre global
 * → prix global → tarif de repli. Amélie peut donc changer le prix d'une seule
 * portée sans toucher au tarif par défaut.
 */
export function litterPrice(
  litter: Pick<Litter, "price" | "priceLabel">,
  settings?: SiteSettings | null,
): string {
  if (litter.priceLabel) return litter.priceLabel;
  if (typeof litter.price === "number") return formatPrice(litter.price);
  return defaultPrice(settings);
}

/** Prix par défaut du site, utilisé hors contexte d'une portée précise. */
export function defaultPrice(settings?: SiteSettings | null): string {
  const pricing = settings?.pricing;
  if (pricing?.kittenPriceLabel) return pricing.kittenPriceLabel;
  return formatPrice(pricing?.kittenPrice ?? FALLBACK_KITTEN_PRICE);
}

/**
 * Bloc "Modalités d'adoption" de la page Contact : soit le texte saisi tel
 * quel, soit une phrase composée à partir des champs tarifs.
 */
export function adoptionTerms(settings?: SiteSettings | null): string {
  const pricing = settings?.pricing;
  if (pricing?.termsText) return pricing.termsText;

  return [
    `Prix fixe de ${defaultPrice(settings)}`,
    pricing?.depositReservation ??
      "Acompte de 25% (déductible) à la réservation d'un chaton né",
    pricing?.depositWaitingList
      ? `Liste d'attente : acompte de ${pricing.depositWaitingList}`
      : "Liste d'attente : acompte de 10% (200 €, déductible)",
    "Accompagnement avant, pendant et après l'adoption",
  ].join(" · ");
}
