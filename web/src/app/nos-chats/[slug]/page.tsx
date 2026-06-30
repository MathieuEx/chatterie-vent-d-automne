import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCatBySlug, getCatSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 3600;

const ROLE_BADGE = {
  male: { label: "Mâle", className: "badge-genre--male" },
  femelle: { label: "Femelle", className: "badge-genre--female" },
} as const;

export async function generateStaticParams() {
  const slugs = await getCatSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);

  if (!cat) {
    return { title: "Chat introuvable | La Chatterie des Vents d'Automne" };
  }

  const title = `${cat.name} | La Chatterie des Vents d'Automne`;
  const description =
    cat.description ??
    `Découvrez ${cat.name}, chat reproducteur Ragdoll${cat.colorCode ? ` (${cat.colorCode})` : ""} à Toulouse.`;

  return {
    title,
    description,
    alternates: { canonical: `/nos-chats/${slug}` },
    openGraph: { title, description, url: `/nos-chats/${slug}` },
  };
}

export default async function CatDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);

  if (!cat) {
    notFound();
  }

  const roleBadge = ROLE_BADGE[cat.role];

  return (
    <section className="bg-cream" style={{ paddingTop: "8rem" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Link href="/nos-chats" className="btn-secondary">
          ← Tous nos chats
        </Link>

        <div
          className="cat-card__image"
          style={{
            position: "relative",
            marginTop: "2rem",
            aspectRatio: "3 / 2",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          <Image
            src={urlFor(cat.photo).width(1200).height(800).url()}
            alt={cat.name}
            fill
            sizes="(min-width: 1024px) 880px, 100vw"
            priority
          />
          <span className={`badge-genre ${roleBadge.className}`}>{roleBadge.label}</span>
        </div>

        {cat.status === "retraite" && (
          <p className="meta-label" style={{ marginTop: "2rem" }}>
            Retraité
          </p>
        )}
        <h1 className="title-hero" style={{ marginTop: cat.status === "retraite" ? 0 : "2rem" }}>
          {cat.name}
        </h1>

        {(cat.colorCode || cat.origin) && (
          <div className="cat-card__traits">
            {cat.colorCode && <span className="badge-trait">{cat.colorCode}</span>}
            {cat.origin && <span className="badge-trait">{cat.origin}</span>}
          </div>
        )}

        {cat.geneticData && (
          <p className="body-text-sm" style={{ marginTop: "0.5rem" }}>
            Données génétiques : {cat.geneticData}
          </p>
        )}
        {cat.tests && (
          <p className="body-text-sm" style={{ color: "var(--sage)", marginTop: "0.35rem" }}>
            ✓ {cat.tests}
          </p>
        )}

        {cat.description && (
          <p className="body-text" style={{ maxWidth: "100%", whiteSpace: "pre-line", marginTop: "2rem" }}>
            {cat.description}
          </p>
        )}

        {cat.gallery && cat.gallery.length > 0 && (
          <>
            <h2 className="title-section" style={{ marginTop: "3.5rem" }}>
              Galerie
            </h2>
            <div className="gallery-grid">
              {cat.gallery.map((image, index) => (
                <div className="gallery-item" key={index}>
                  <Image
                    src={urlFor(image).width(600).height(450).url()}
                    alt={`${cat.name} - photo ${index + 1}`}
                    width={600}
                    height={450}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: "3.5rem", marginBottom: "4rem" }}>
          <Link href="/contact" className="btn-primary">
            Nous contacter à propos de {cat.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
