import { getLitters, getLittersPage, getSiteSettings } from "@/lib/sanity/queries";
import LitterCard from "@/components/LitterCard";
import PageHeader from "@/components/PageHeader";
import { defaultPrice, litterPrice } from "@/lib/pricing";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 3600;

const FALLBACK_TITLE = "Chatons Ragdoll à Toulouse | La Chatterie des Vents d'Automne";
const FALLBACK_DESCRIPTION =
  "Découvrez les portées de chatons Ragdoll disponibles à Toulouse, dans le respect de la santé et du bien-être de nos chats.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLittersPage();
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
    path: "/nos-chatons",
  });
}

export default async function NosChatonsPage() {
  const [litters, page, settings] = await Promise.all([
    getLitters(),
    getLittersPage(),
    getSiteSettings(),
  ]);

  const fallbackIntro =
    `Chatons Ragdoll disponibles à Toulouse, prix fixe de ${defaultPrice(settings)} pour un ` +
    "chaton de compagnie. Départ à 4 mois, complet (vaccins, puce électronique iCAD, " +
    "stérilisation, vermifuges, certificat vétérinaire, carnet de santé et pedigree LOOF), " +
    "avec un accompagnement avant, pendant et après l'adoption.";

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <PageHeader
          content={page}
          fallback={{
            sectionLabel: "Disponibilités",
            titlePrefix: "Nos",
            titleEmphasis: "Chatons",
            titleSuffix: "Ragdoll",
            introText: fallbackIntro,
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
                price={litterPrice(litter, settings)}
                waitingListText={page?.waitingListText}
              />
            ))}
          </div>
        ) : (
          <p className="body-text-sm" style={{ textAlign: "center", marginTop: "3rem" }}>
            {page?.emptyText ??
              "Aucune portée annoncée pour le moment. Contactez-nous pour être informé(e) des prochaines naissances."}
          </p>
        )}
      </div>
    </section>
  );
}
