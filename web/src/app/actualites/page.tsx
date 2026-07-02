import { getArticles } from "@/lib/sanity/queries";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Actualités | La Chatterie des Vents d'Automne",
  description:
    "Suivez l'actualité de la Chatterie des Vents d'Automne : naissances, nouvelles portées et vie de l'élevage de Ragdoll à Toulouse.",
  alternates: { canonical: "/actualites" },
  openGraph: {
    title: "Actualités | La Chatterie des Vents d'Automne",
    description:
      "Suivez l'actualité de la Chatterie des Vents d'Automne : naissances, nouvelles portées et vie de l'élevage de Ragdoll à Toulouse.",
    url: "/actualites",
  },
};

export default async function ActualitesPage() {
  const articles = await getArticles();

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          Actualités
        </p>
        <h1 className="title-hero" style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          La vie de la <em>chatterie</em>
        </h1>
        <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
          Naissances, nouvelles portées et coulisses de l&apos;élevage : retrouvez ici les
          dernières nouvelles de la Chatterie des Vents d&apos;Automne.
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
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm" style={{ textAlign: "center", marginTop: "3rem" }}>
            Aucune actualité publiée pour le moment. Revenez bientôt !
          </p>
        )}
      </div>
    </section>
  );
}
