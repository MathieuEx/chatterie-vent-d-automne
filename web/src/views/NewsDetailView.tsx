import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getArticleBySlug, getArticleSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { pageMetadata } from "@/lib/seo";
import { detailRoute, route, type Locale } from "@/lib/i18n/config";
import { DATE_LOCALE, getDictionary } from "@/lib/i18n/dictionary";
import { localize } from "@/lib/i18n/localize";
import type { SanityImageSource } from "@sanity/image-url";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      <div className="article-content__image">
        <Image
          src={urlFor(value).width(880).height(560).url()}
          alt=""
          width={880}
          height={560}
        />
      </div>
    ),
  },
};

export async function articleSlugParams() {
  const slugs = await getArticleSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function articleMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const article = localize(await getArticleBySlug(slug), locale);

  if (!article) {
    return {
      title:
        locale === "fr"
          ? "Article introuvable | La Chatterie des Vents d'Automne"
          : "Article not found | La Chatterie des Vents d'Automne",
    };
  }

  const description =
    article.excerpt ??
    (locale === "fr"
      ? `Actualité de la Chatterie des Vents d'Automne : ${article.title}.`
      : `News from La Chatterie des Vents d'Automne: ${article.title}.`);

  return pageMetadata({
    seo: null,
    fallbackTitle: `${article.title} | La Chatterie des Vents d'Automne`,
    fallbackDescription: description,
    path: detailRoute("news", locale, slug),
    locale,
  });
}

export default async function NewsDetailView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const t = getDictionary(locale);
  const article = localize(await getArticleBySlug(slug), locale);

  if (!article) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Link href={route("news", locale)} className="btn-secondary">
          {t.news.backToNews}
        </Link>

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
            src={urlFor(article.coverImage).width(1200).height(800).url()}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 880px, 100vw"
            priority
          />
        </div>

        <h1 className="title-hero" style={{ marginTop: "2rem" }}>
          {article.title}
        </h1>

        <p className="body-text-sm">{formattedDate}</p>

        {article.body && (
          <div className="article-content">
            <PortableText value={article.body} components={portableTextComponents} />
          </div>
        )}

        <div style={{ marginTop: "3.5rem", marginBottom: "4rem" }}>
          <Link href={route("contact", locale)} className="btn-primary">
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
