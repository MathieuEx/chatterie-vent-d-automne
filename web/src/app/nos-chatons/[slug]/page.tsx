import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLitterBySlug, getLitterSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import StatusBadge from "@/components/StatusBadge";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getLitterSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const litter = await getLitterBySlug(slug);

  if (!litter) {
    return { title: "Portée introuvable | La Chatterie des Vents d'Automne" };
  }

  const title = `${litter.title} | La Chatterie des Vents d'Automne`;
  const description =
    litter.description ??
    `Découvrez la portée "${litter.title}", chatons Ragdoll élevés à Toulouse.`;

  return {
    title,
    description,
    alternates: { canonical: `/nos-chatons/${slug}` },
    openGraph: { title, description, url: `/nos-chatons/${slug}` },
  };
}

export default async function LitterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const litter = await getLitterBySlug(slug);

  if (!litter) {
    notFound();
  }

  const cover = litter.gallery?.[0];
  const restOfGallery = litter.gallery?.slice(1) ?? [];
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(litter.birthDate));

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Link href="/nos-chatons" className="btn-secondary">
          ← Toutes nos portées
        </Link>

        {cover && (
          <div
            className="kitten-card__image"
            style={{
              position: "relative",
              marginTop: "2rem",
              aspectRatio: "3 / 2",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            <Image
              src={urlFor(cover).width(1200).height(800).url()}
              alt={litter.title}
              fill
              sizes="(min-width: 1024px) 880px, 100vw"
              priority
            />
            <StatusBadge status={litter.status} />
          </div>
        )}

        <h1 className="title-hero" style={{ marginTop: "2rem" }}>
          {litter.title}
        </h1>

        <p className="body-text-sm">
          {litter.status === "a_venir" ? "Naissance prévue le" : "Née le"} {formattedDate}
          {(litter.parentMale || litter.parentFemale) &&
            ` · ${litter.parentFemale} × ${litter.parentMale}`}
        </p>

        {litter.status === "a_venir" ? (
          <p className="body-text-sm" style={{ marginTop: "0.35rem" }}>
            Inscriptions sur liste d&apos;attente ouvertes
          </p>
        ) : (
          litter.stats?.total != null && (
            <p className="body-text-sm" style={{ marginTop: "0.35rem" }}>
              {litter.stats.available ?? 0} / {litter.stats.total} chaton(s) disponible(s)
              {litter.stats.reserved != null && ` · ${litter.stats.reserved} réservé(s)`}
            </p>
          )
        )}

        <p className="kitten-card__price" style={{ marginTop: "0.75rem" }}>
          2 000 €
        </p>

        {litter.description && (
          <p className="body-text" style={{ maxWidth: "100%", whiteSpace: "pre-line", marginTop: "2rem" }}>
            {litter.description}
          </p>
        )}

        {restOfGallery.length > 0 && (
          <>
            <h2 className="title-section" style={{ marginTop: "3.5rem" }}>
              Galerie
            </h2>
            <div className="gallery-grid">
              {restOfGallery.map((image, index) => (
                <div className="gallery-item" key={index}>
                  <Image
                    src={urlFor(image).width(600).height(450).url()}
                    alt={`${litter.title} - photo ${index + 2}`}
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
            Nous contacter à propos de cette portée
          </Link>
        </div>
      </div>
    </section>
  );
}
