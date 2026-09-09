import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getLitterBySlug,
  getLitterSlugs,
  getLittersPage,
  getSiteSettings,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import StatusBadge from "@/components/StatusBadge";
import { litterPrice } from "@/lib/pricing";
import { pageMetadata } from "@/lib/seo";
import { detailRoute, route, type Locale } from "@/lib/i18n/config";
import { DATE_LOCALE, getDictionary } from "@/lib/i18n/dictionary";
import { localize } from "@/lib/i18n/localize";

export async function litterSlugParams() {
  const slugs = await getLitterSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function litterMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const litter = localize(await getLitterBySlug(slug), locale);

  if (!litter) {
    return {
      title:
        locale === "fr"
          ? "Portée introuvable | La Chatterie des Vents d'Automne"
          : "Litter not found | La Chatterie des Vents d'Automne",
    };
  }

  const description =
    litter.description ??
    (locale === "fr"
      ? `Chatons Ragdoll de la portée ${litter.title}, élevés à Toulouse.`
      : `Ragdoll kittens from the ${litter.title} litter, raised in Toulouse, France.`);

  return pageMetadata({
    seo: null,
    fallbackTitle: `${litter.title} | La Chatterie des Vents d'Automne`,
    fallbackDescription: description,
    path: detailRoute("kittens", locale, slug),
    locale,
  });
}

export default async function KittenDetailView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const t = getDictionary(locale).litter;

  const [rawLitter, rawSettings, rawPage] = await Promise.all([
    getLitterBySlug(slug),
    getSiteSettings(),
    getLittersPage(),
  ]);

  const litter = localize(rawLitter, locale);
  if (!litter) {
    notFound();
  }

  const settings = localize(rawSettings, locale);
  const littersPage = localize(rawPage, locale);

  const cover = litter.gallery?.[0];
  const restOfGallery = litter.gallery?.slice(1) ?? [];
  const formattedDate = new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(litter.birthDate));

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Link href={route("kittens", locale)} className="btn-secondary">
          {t.backToKittens}
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
            <StatusBadge status={litter.status} locale={locale} />
          </div>
        )}

        <h1 className="title-hero" style={{ marginTop: "2rem" }}>
          {litter.title}
        </h1>

        <p className="body-text-sm">
          {litter.status === "a_venir" ? t.expectedOn : t.bornOn} {formattedDate}
          {(litter.parentMale || litter.parentFemale) &&
            ` · ${litter.parentFemale} × ${litter.parentMale}`}
        </p>

        {litter.status === "a_venir" ? (
          <p className="body-text-sm" style={{ marginTop: "0.35rem" }}>
            {littersPage?.waitingListText ?? t.waitingList}
          </p>
        ) : (
          litter.stats?.total != null && (
            <p className="body-text-sm" style={{ marginTop: "0.35rem" }}>
              {t.available(litter.stats.available ?? 0, litter.stats.total)}
              {litter.stats.reserved != null && ` · ${t.reserved(litter.stats.reserved)}`}
            </p>
          )
        )}

        <p className="kitten-card__price" style={{ marginTop: "0.75rem" }}>
          {litterPrice(litter, settings, locale)}
        </p>
        {litter.priceNote && (
          <p className="body-text-sm" style={{ marginTop: "0.35rem" }}>
            {litter.priceNote}
          </p>
        )}

        {litter.description && (
          <p
            className="body-text"
            style={{ maxWidth: "100%", whiteSpace: "pre-line", marginTop: "2rem" }}
          >
            {litter.description}
          </p>
        )}

        {restOfGallery.length > 0 && (
          <>
            <h2 className="title-section" style={{ marginTop: "3.5rem" }}>
              {getDictionary(locale).cat.gallery}
            </h2>
            <div className="gallery-grid">
              {restOfGallery.map((image, index) => (
                <div className="gallery-item" key={index}>
                  <Image
                    src={urlFor(image).width(600).height(450).url()}
                    alt={`${litter.title} - ${index + 2}`}
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
            {t.contactAbout}
          </Link>
        </div>
      </div>
    </section>
  );
}
