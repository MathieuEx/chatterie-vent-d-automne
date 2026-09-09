import type { Metadata } from "next";
import { getArticles } from "@/lib/sanity/queries";
import ArticleCard from "@/components/ArticleCard";
import { pageMetadata } from "@/lib/seo";
import { route, type Locale } from "@/lib/i18n/config";
import { localizeAll } from "@/lib/i18n/localize";

const FALLBACK = {
  fr: {
    title: "Actualités | La Chatterie des Vents d'Automne",
    description:
      "Suivez l'actualité de la Chatterie des Vents d'Automne : naissances, nouvelles portées et vie de l'élevage de Ragdoll à Toulouse.",
    label: "Actualités",
    titlePrefix: "La vie de la ",
    titleEmphasis: "chatterie",
    intro:
      "Naissances, nouvelles portées et coulisses de l'élevage : retrouvez ici les dernières nouvelles de la Chatterie des Vents d'Automne.",
    empty: "Aucune actualité publiée pour le moment. Revenez bientôt !",
  },
  en: {
    title: "News | La Chatterie des Vents d'Automne",
    description:
      "Follow the life of La Chatterie des Vents d'Automne: births, new litters and everyday life at our Ragdoll cattery in Toulouse, France.",
    label: "News",
    titlePrefix: "Life at the ",
    titleEmphasis: "cattery",
    intro:
      "Births, new litters and behind the scenes: the latest news from La Chatterie des Vents d'Automne.",
    empty: "No news published yet. Come back soon!",
  },
} as const;

export async function newsMetadata(locale: Locale): Promise<Metadata> {
  return pageMetadata({
    fallbackTitle: FALLBACK[locale].title,
    fallbackDescription: FALLBACK[locale].description,
    path: route("news", locale),
    locale,
  });
}

export default async function NewsView({ locale }: { locale: Locale }) {
  const fallback = FALLBACK[locale];
  const articles = localizeAll(await getArticles(), locale);

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          {fallback.label}
        </p>
        <h1
          className="title-hero"
          style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
        >
          {fallback.titlePrefix}
          <em>{fallback.titleEmphasis}</em>
        </h1>
        <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
          {fallback.intro}
        </p>

        {articles.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--gap-cards)",
              marginTop: "3rem",
            }}
          >
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm" style={{ textAlign: "center", marginTop: "3rem" }}>
            {fallback.empty}
          </p>
        )}
      </div>
    </section>
  );
}
