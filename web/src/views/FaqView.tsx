import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { getFaqPage } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo";
import { route, type Locale } from "@/lib/i18n/config";
import { localize } from "@/lib/i18n/localize";

const FALLBACK = {
  fr: {
    title: "FAQ | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
    description:
      "Toutes les réponses à vos questions sur l'adoption d'un chaton Ragdoll : prix, conditions de départ, réservation, liste d'attente et garanties de santé.",
    label: "Questions fréquentes",
  },
  en: {
    title: "FAQ | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
    description:
      "Answers to your questions about adopting a Ragdoll kitten: price, departure conditions, reservation, waiting list and health guarantees.",
    label: "Frequently asked questions",
  },
} as const;

export async function faqMetadata(locale: Locale): Promise<Metadata> {
  const page = localize(await getFaqPage(), locale);
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK[locale].title,
    fallbackDescription: FALLBACK[locale].description,
    path: route("faq", locale),
    locale,
  });
}

export default async function FaqView({ locale }: { locale: Locale }) {
  const page = localize(await getFaqPage(), locale);

  return (
    <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          {page?.sectionLabel ?? FALLBACK[locale].label}
        </p>
        <h1
          className="title-hero"
          style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
        >
          <em>FAQ</em>
        </h1>
        {page?.introText && (
          <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
            {page.introText}
          </p>
        )}

        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FaqAccordion items={page?.items ?? []} />
        </div>
      </div>
    </section>
  );
}
