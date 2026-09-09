import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { getFaqPage } from "@/lib/sanity/queries";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

const FALLBACK_TITLE = "FAQ | La Chatterie des Vents d'Automne - Ragdoll Toulouse";
const FALLBACK_DESCRIPTION =
  "Toutes les réponses à vos questions sur l'adoption d'un chaton Ragdoll : prix, conditions de départ, réservation, liste d'attente et garanties de santé.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFaqPage();
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
    path: "/faq",
  });
}
export default async function FaqPage() {
  const faqPage = await getFaqPage();

  return (
    <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          {faqPage?.sectionLabel ?? "Questions fréquentes"}
        </p>
        <h1 className="title-hero" style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          <em>FAQ</em>
        </h1>
        {faqPage?.introText && (
          <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
            {faqPage.introText}
          </p>
        )}

        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FaqAccordion items={faqPage?.items ?? []} />
        </div>
      </div>
    </section>
  );
}
