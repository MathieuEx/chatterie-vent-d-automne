import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { getFaqPage } from "@/lib/sanity/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
  description:
    "Toutes les réponses à vos questions sur l'adoption d'un chaton Ragdoll : prix, conditions de départ, réservation, liste d'attente et garanties de santé.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
    description:
      "Toutes les réponses à vos questions sur l'adoption d'un chaton Ragdoll : prix, conditions de départ, réservation, liste d'attente et garanties de santé.",
    url: "/faq",
  },
};

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
