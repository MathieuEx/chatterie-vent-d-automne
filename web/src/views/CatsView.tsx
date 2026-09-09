import type { Metadata } from "next";
import { getCats, getCatsPage } from "@/lib/sanity/queries";
import CatCard from "@/components/CatCard";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";
import { route, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localize, localizeAll } from "@/lib/i18n/localize";

const FALLBACK = {
  fr: {
    title: "Nos Chats Ragdoll à Toulouse | La Chatterie des Vents d'Automne",
    description:
      "Découvrez nos chats reproducteurs Ragdoll à Toulouse, mâles et femelles, testés HCM, PKD, FIV et FeLV négatifs.",
    intro:
      "Nos reproducteurs Ragdoll, basés à Toulouse, sont sélectionnés pour leur santé, leur tempérament et la beauté de leur lignée.",
    prefix: "Nos",
    emphasis: "Chats",
    suffix: "Ragdoll",
    label: "Nos reproducteurs",
  },
  en: {
    title: "Our Ragdoll Cats in Toulouse | La Chatterie des Vents d'Automne",
    description:
      "Meet our Ragdoll breeding cats in Toulouse, France — males and females, all tested negative for HCM, PKD, FIV and FeLV.",
    intro:
      "Our Ragdoll breeding cats, based in Toulouse, are chosen for their health, their temperament and the beauty of their bloodline.",
    prefix: "Our",
    emphasis: "Ragdoll",
    suffix: "Cats",
    label: "Our breeding cats",
  },
} as const;

export async function catsMetadata(locale: Locale): Promise<Metadata> {
  const page = localize(await getCatsPage(), locale);
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK[locale].title,
    fallbackDescription: FALLBACK[locale].description,
    path: route("cats", locale),
    locale,
  });
}

const GRID_STYLE = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "var(--gap-cards)",
} as const;

export default async function CatsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).cat;
  const fallback = FALLBACK[locale];
  const [rawCats, rawPage] = await Promise.all([getCats(), getCatsPage()]);
  const cats = localizeAll(rawCats, locale);
  const page = localize(rawPage, locale);

  const males = cats.filter((cat) => cat.role === "male");
  const femelles = cats.filter((cat) => cat.role === "femelle");

  return (
    <section className="bg-cream" style={{ paddingTop: "8rem" }}>
      <div className="container">
        <PageHeader
          content={page}
          fallback={{
            sectionLabel: fallback.label,
            titlePrefix: fallback.prefix,
            titleEmphasis: fallback.emphasis,
            titleSuffix: fallback.suffix,
            introText: fallback.intro,
          }}
        />

        <h2 className="title-section" style={{ marginTop: "4rem" }}>
          {page?.malesTitle ?? t.males}
        </h2>
        {males.length > 0 ? (
          <div style={GRID_STYLE}>
            {males.map((cat) => (
              <CatCard key={cat._id} cat={cat} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm">{page?.malesEmptyText ?? t.noMales}</p>
        )}

        <h2 className="title-section" style={{ marginTop: "4rem" }}>
          {page?.femalesTitle ?? t.females}
        </h2>
        {femelles.length > 0 ? (
          <div style={GRID_STYLE}>
            {femelles.map((cat) => (
              <CatCard key={cat._id} cat={cat} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm">{page?.femalesEmptyText ?? t.noFemales}</p>
        )}
      </div>
    </section>
  );
}
