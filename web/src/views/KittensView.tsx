import type { Metadata } from "next";
import { getLitters, getLittersPage, getSiteSettings } from "@/lib/sanity/queries";
import LitterCard from "@/components/LitterCard";
import PageHeader from "@/components/PageHeader";
import { defaultPrice, litterPrice } from "@/lib/pricing";
import { pageMetadata } from "@/lib/seo";
import { route, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localize, localizeAll } from "@/lib/i18n/localize";

const FALLBACK = {
  fr: {
    title: "Chatons Ragdoll à Toulouse | La Chatterie des Vents d'Automne",
    description:
      "Découvrez les portées de chatons Ragdoll disponibles à Toulouse, dans le respect de la santé et du bien-être de nos chats.",
    label: "Disponibilités",
    prefix: "Nos",
    emphasis: "Chatons",
    suffix: "Ragdoll",
    intro: (price: string) =>
      `Chatons Ragdoll disponibles à Toulouse, prix fixe de ${price} pour un chaton de compagnie. Départ à 4 mois, complet (vaccins, puce électronique iCAD, stérilisation, vermifuges, certificat vétérinaire, carnet de santé et pedigree LOOF), avec un accompagnement avant, pendant et après l'adoption.`,
  },
  en: {
    title: "Ragdoll Kittens in Toulouse | La Chatterie des Vents d'Automne",
    description:
      "Discover our Ragdoll kitten litters available in Toulouse, France, raised with the health and wellbeing of our cats at heart.",
    label: "Availability",
    prefix: "Our",
    emphasis: "Ragdoll",
    suffix: "Kittens",
    intro: (price: string) =>
      `Ragdoll kittens available in Toulouse, France, at a fixed price of ${price} for a pet companion kitten. They leave at four months old, fully prepared: vaccinations, iCAD microchip, neutering, worming, veterinary health certificate, health record and LOOF pedigree — with guidance before, during and after the adoption.`,
  },
} as const;

export async function kittensMetadata(locale: Locale): Promise<Metadata> {
  const page = localize(await getLittersPage(), locale);
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK[locale].title,
    fallbackDescription: FALLBACK[locale].description,
    path: route("kittens", locale),
    locale,
  });
}

export default async function KittensView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).litter;
  const fallback = FALLBACK[locale];

  const [rawLitters, rawPage, rawSettings] = await Promise.all([
    getLitters(),
    getLittersPage(),
    getSiteSettings(),
  ]);
  const litters = localizeAll(rawLitters, locale);
  const page = localize(rawPage, locale);
  const settings = localize(rawSettings, locale);

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <PageHeader
          content={page}
          fallback={{
            sectionLabel: fallback.label,
            titlePrefix: fallback.prefix,
            titleEmphasis: fallback.emphasis,
            titleSuffix: fallback.suffix,
            introText: fallback.intro(defaultPrice(settings)),
          }}
        />

        {litters.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--gap-cards)",
              marginTop: "3rem",
            }}
          >
            {litters.map((litter) => (
              <LitterCard
                key={litter._id}
                litter={litter}
                locale={locale}
                price={litterPrice(litter, settings)}
                waitingListText={page?.waitingListText}
              />
            ))}
          </div>
        ) : (
          <p className="body-text-sm" style={{ textAlign: "center", marginTop: "3rem" }}>
            {page?.emptyText ?? t.none}
          </p>
        )}
      </div>
    </section>
  );
}
