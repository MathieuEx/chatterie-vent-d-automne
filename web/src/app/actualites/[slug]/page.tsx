import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getArticleBySlug, getArticleSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article introuvable | La Chatterie des Vents d'Automne" };
  }

  const title = `${article.title} | La Chatterie des Vents d'Automne`;
  const description =
    article.excerpt ?? `Actualité de la Chatterie des Vents d'Automne : ${article.title}.`;

  return {
    title,
    description,
    alternates: { canonical: `/actualites/${slug}` },
    openGraph: { title, description, url: `/actualites/${slug}` },
  };
}

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

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <section className="bg-gradient-kittens" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Link href="/actualites" className="btn-secondary">
          ← Toutes les actualités
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
          <Link href="/contact" className="btn-primary">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
