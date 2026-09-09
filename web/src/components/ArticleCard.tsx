"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { urlFor } from "@/lib/sanity/image";
import type { Article } from "@/lib/sanity/types";
import { detailRoute, type Locale } from "@/lib/i18n/config";
import { DATE_LOCALE } from "@/lib/i18n/dictionary";

export default function ArticleCard({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  const formattedDate = new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  const card = (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "var(--shadow-card-hover)" }}
    >
      <div className="blog-card__image">
        <Image
          src={urlFor(article.coverImage).width(600).height(400).url()}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="blog-card__body">
        <p className="blog-card__date">{formattedDate}</p>
        <p className="blog-card__title">{article.title}</p>
        {article.excerpt && <p className="blog-card__excerpt">{article.excerpt}</p>}
      </div>
    </motion.article>
  );

  if (!article.slug?.current) {
    return card;
  }

  return (
    <Link href={detailRoute("news", locale, article.slug.current)} className="card-link">
      {card}
    </Link>
  );
}
