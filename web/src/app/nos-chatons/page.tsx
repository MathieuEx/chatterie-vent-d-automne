import { getLitters } from "@/lib/sanity/queries";
import LitterCard from "@/components/LitterCard";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Chatons Ragdoll à Toulouse | La Chatterie des Vents d'Automne",
  description:
    "Découvrez les portées de chatons Ragdoll disponibles à Toulouse, dans le respect de la santé et du bien-être de nos chats.",
  alternates: { canonical: "/nos-chatons" },
  openGraph: {
    title: "Chatons Ragdoll à Toulouse | La Chatterie des Vents d'Automne",
    description:
      "Découvrez les portées de chatons Ragdoll disponibles à Toulouse, dans le respect de la santé et du bien-être de nos chats.",
    url: "/nos-chatons",
  },
};

export default async function NosChatonsPage() {
  const litters = await getLitters();

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          Disponibilités
        </p>
        <h1 className="title-hero" style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          Nos <em>Chatons</em> Ragdoll
        </h1>
        <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
          Chatons Ragdoll disponibles à Toulouse, prix fixe de 2 000 € pour un chaton de
          compagnie. Départ à 4 mois, complet (vaccins, puce électronique iCAD, stérilisation,
          vermifuges, certificat vétérinaire, carnet de santé et pedigree LOOF), avec un
          accompagnement avant, pendant et après l&apos;adoption.
        </p>

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
              <LitterCard key={litter._id} litter={litter} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm" style={{ textAlign: "center", marginTop: "3rem" }}>
            Aucune portée annoncée pour le moment. Contactez-nous pour être informé(e) des
            prochaines naissances.
          </p>
        )}
      </div>
    </section>
  );
}
