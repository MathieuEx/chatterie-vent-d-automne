import type { Litter, SiteSettings } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n/config";

/** Prix de repli si le CMS n'a rien : le tarif historique du site. */
export const FALLBACK_KITTEN_PRICE = 2000;

const EUROS: Record<Locale, Intl.NumberFormat> = {
  fr: new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
};

export function formatPrice(amount: number, locale: Locale = "fr"): string {
  return EUROS[locale].format(amount);
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
  locale: Locale = "fr",
): string {
  if (litter.priceLabel) return litter.priceLabel;
  if (typeof litter.price === "number") return formatPrice(litter.price, locale);
  return defaultPrice(settings, locale);
}

/** Prix par défaut du site, utilisé hors contexte d'une portée précise. */
export function defaultPrice(settings?: SiteSettings | null, locale: Locale = "fr"): string {
  const pricing = settings?.pricing;
  if (pricing?.kittenPriceLabel) return pricing.kittenPriceLabel;
  return formatPrice(pricing?.kittenPrice ?? FALLBACK_KITTEN_PRICE, locale);
}

/**
 * Bloc "Modalités d'adoption" de la page Contact : soit le texte saisi tel
 * quel, soit une phrase composée à partir des champs tarifs.
 */
export function adoptionTerms(
  settings?: SiteSettings | null,
  locale: Locale = "fr",
): string {
  const pricing = settings?.pricing;
  if (pricing?.termsText) return pricing.termsText;

  const price = defaultPrice(settings, locale);

  if (locale === "en") {
    return [
      `Fixed price of ${price}`,
      pricing?.depositReservation ??
        "25% deposit (deducted from the total) to reserve a born kitten",
      pricing?.depositWaitingList
        ? `Waiting list: ${pricing.depositWaitingList} deposit`
        : "Waiting list: 10% deposit (€200, deducted from the total)",
      "Guidance before, during and after the adoption",
    ].join(" · ");
  }

  return [
    `Prix fixe de ${price}`,
    pricing?.depositReservation ??
      "Acompte de 25% (déductible) à la réservation d'un chaton né",
    pricing?.depositWaitingList
      ? `Liste d'attente : acompte de ${pricing.depositWaitingList}`
      : "Liste d'attente : acompte de 10% (200 €, déductible)",
    "Accompagnement avant, pendant et après l'adoption",
  ].join(" · ");
}
