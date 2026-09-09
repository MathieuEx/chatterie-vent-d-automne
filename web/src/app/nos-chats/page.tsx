import { getCats, getCatsPage } from "@/lib/sanity/queries";
import CatCard from "@/components/CatCard";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 3600;

const FALLBACK_TITLE = "Nos Chats Ragdoll à Toulouse | La Chatterie des Vents d'Automne";
const FALLBACK_DESCRIPTION =
  "Découvrez nos chats reproducteurs Ragdoll à Toulouse, mâles et femelles, testés HCM, PKD, FIV et FeLV négatifs.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCatsPage();
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
    path: "/nos-chats",
  });
}

const GRID_STYLE = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "var(--gap-cards)",
} as const;

export default async function NosChatsPage() {
  const [cats, page] = await Promise.all([getCats(), getCatsPage()]);
  const males = cats.filter((cat) => cat.role === "male");
  const femelles = cats.filter((cat) => cat.role === "femelle");

  return (
    <section className="bg-cream" style={{ paddingTop: "8rem" }}>
      <div className="container">
        <PageHeader
          content={page}
          fallback={{
            sectionLabel: "Nos reproducteurs",
            titlePrefix: "Nos",
            titleEmphasis: "Chats",
            titleSuffix: "Ragdoll",
            introText:
              "Nos reproducteurs Ragdoll, basés à Toulouse, sont sélectionnés pour leur santé, leur tempérament et la beauté de leur lignée.",
          }}
        />

        <h2 className="title-section" style={{ marginTop: "4rem" }}>
          {page?.malesTitle ?? "Mâles"}
        </h2>
        {males.length > 0 ? (
          <div style={GRID_STYLE}>
            {males.map((cat) => (
              <CatCard key={cat._id} cat={cat} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm">
            {page?.malesEmptyText ?? "Aucun mâle référencé pour le moment."}
          </p>
        )}

        <h2 className="title-section" style={{ marginTop: "4rem" }}>
          {page?.femalesTitle ?? "Femelles"}
        </h2>
        {femelles.length > 0 ? (
          <div style={GRID_STYLE}>
            {femelles.map((cat) => (
              <CatCard key={cat._id} cat={cat} />
            ))}
          </div>
        ) : (
          <p className="body-text-sm">
            {page?.femalesEmptyText ?? "Aucune femelle référencée pour le moment."}
          </p>
        )}
      </div>
    </section>
  );
}
