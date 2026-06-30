import { getCats } from "@/lib/sanity/queries";
import CatCard from "@/components/CatCard";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nos Chats Ragdoll à Toulouse | La Chatterie des Vents d'Automne",
  description:
    "Découvrez nos chats reproducteurs Ragdoll à Toulouse, mâles et femelles, testés HCM, PKD, FIV et FeLV négatifs.",
  alternates: { canonical: "/nos-chats" },
  openGraph: {
    title: "Nos Chats Ragdoll à Toulouse | La Chatterie des Vents d'Automne",
    description:
      "Découvrez nos chats reproducteurs Ragdoll à Toulouse, mâles et femelles, testés HCM, PKD, FIV et FeLV négatifs.",
    url: "/nos-chats",
  },
};

export default async function NosChatsPage() {
  const cats = await getCats();
  const males = cats.filter((cat) => cat.role === "male");
  const femelles = cats.filter((cat) => cat.role === "femelle");

  return (
    <section className="bg-cream" style={{ paddingTop: "8rem" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          Nos reproducteurs
        </p>
        <h1 className="title-hero" style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          Nos <em>Chats</em> Ragdoll
        </h1>
        <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
          Nos reproducteurs Ragdoll, basés à Toulouse, sont sélectionnés pour leur santé, leur
          tempérament et la beauté de leur lignée.
        </p>

        <h2 className="title-section" style={{ marginTop: "4rem" }}>
          Mâles
        </h2>
        {males.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "var(--gap-cards)",
            }}
          >
            {males.map((cat) => (
              <CatCard key={cat._id} cat={cat} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm">Aucun mâle référencé pour le moment.</p>
        )}

        <h2 className="title-section" style={{ marginTop: "4rem" }}>
          Femelles
        </h2>
        {femelles.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "var(--gap-cards)",
            }}
          >
            {femelles.map((cat) => (
              <CatCard key={cat._id} cat={cat} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm">Aucune femelle référencée pour le moment.</p>
        )}
      </div>
    </section>
  );
}
