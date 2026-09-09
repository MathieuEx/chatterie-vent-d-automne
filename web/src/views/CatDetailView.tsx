import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCatBySlug, getCatSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo";
import { detailRoute, route, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localize } from "@/lib/i18n/localize";

export async function catSlugParams() {
  const slugs = await getCatSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function catMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const cat = localize(await getCatBySlug(slug), locale);

  if (!cat) {
    return {
      title:
        locale === "fr"
          ? "Chat introuvable | La Chatterie des Vents d'Automne"
          : "Cat not found | La Chatterie des Vents d'Automne",
    };
  }

  const description =
    cat.description ??
    (locale === "fr"
      ? `Découvrez ${cat.name}, chat reproducteur Ragdoll${cat.colorCode ? ` (${cat.colorCode})` : ""} à Toulouse.`
      : `Meet ${cat.name}, a Ragdoll breeding cat${cat.colorCode ? ` (${cat.colorCode})` : ""} in Toulouse, France.`);

  return pageMetadata({
    seo: null,
    fallbackTitle: `${cat.name} | La Chatterie des Vents d'Automne`,
    fallbackDescription: description,
    path: detailRoute("cats", locale, slug),
    locale,
  });
}

export default async function CatDetailView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const t = getDictionary(locale).cat;
  const cat = localize(await getCatBySlug(slug), locale);

  if (!cat) {
    notFound();
  }

  const roleLabel = cat.role === "male" ? t.male : t.female;
  const roleClass = cat.role === "male" ? "badge-genre--male" : "badge-genre--female";

  return (
    <section className="bg-cream" style={{ paddingTop: "8rem" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Link href={route("cats", locale)} className="btn-secondary">
          {t.backToCats}
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
          <span className={`badge-genre ${roleClass}`}>{roleLabel}</span>
        </div>

        {cat.status === "retraite" && (
          <p className="meta-label" style={{ marginTop: "2rem" }}>
            {t.retired}
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
            {t.genetics} : {cat.geneticData}
          </p>
        )}
        {cat.tests && (
          <p className="body-text-sm" style={{ color: "var(--sage)", marginTop: "0.35rem" }}>
            ✓ {cat.tests}
          </p>
        )}

        {cat.description && (
          <p
            className="body-text"
            style={{ maxWidth: "100%", whiteSpace: "pre-line", marginTop: "2rem" }}
          >
            {cat.description}
          </p>
        )}

        {cat.gallery && cat.gallery.length > 0 && (
          <>
            <h2 className="title-section" style={{ marginTop: "3.5rem" }}>
              {t.gallery}
            </h2>
            <div className="gallery-grid">
              {cat.gallery.map((image, index) => (
                <div className="gallery-item" key={index}>
                  <Image
                    src={urlFor(image).width(600).height(450).url()}
                    alt={`${cat.name} - ${index + 1}`}
                    width={600}
                    height={450}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: "3.5rem", marginBottom: "4rem" }}>
          <Link href={route("contact", locale)} className="btn-primary">
            {t.contactAbout(cat.name)}
          </Link>
        </div>
      </div>
    </section>
  );
}
