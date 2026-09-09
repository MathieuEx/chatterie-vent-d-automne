"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { urlFor } from "@/lib/sanity/image";
import StatusBadge from "@/components/StatusBadge";
import type { Litter } from "@/lib/sanity/types";
import { detailRoute, type Locale } from "@/lib/i18n/config";
import { DATE_LOCALE, getDictionary } from "@/lib/i18n/dictionary";

type Props = {
  litter: Litter;
  locale: Locale;
  /** Prix déjà résolu côté serveur (portée → réglages du site → repli). */
  price: string;
  /** Texte des portées à venir, réglable depuis le CMS. */
  waitingListText?: string;
};

export default function LitterCard({ litter, locale, price, waitingListText }: Props) {
  const t = getDictionary(locale);
  const cover = litter.gallery?.[0];
  const formattedDate = new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(litter.birthDate));

  const card = (
    <motion.article
      className="kitten-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "var(--shadow-card-hover)" }}
    >
      <div className="kitten-card__image">
        {cover && (
          <Image
            src={urlFor(cover).width(480).height(480).url()}
            alt={litter.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        )}
        <StatusBadge status={litter.status} locale={locale} />
      </div>
      <div className="kitten-card__body">
        <p className="kitten-card__name">{litter.title}</p>
        <p className="kitten-card__detail">
          {litter.status === "a_venir" ? t.litter.expectedOn : t.litter.bornOn} {formattedDate}
          {(litter.parentMale || litter.parentFemale) &&
            ` · ${litter.parentFemale} × ${litter.parentMale}`}
        </p>
        {litter.status === "a_venir" ? (
          <p className="kitten-card__detail">
            {waitingListText ?? t.litter.waitingList}
          </p>
        ) : (
          litter.stats?.total != null && (
            <p className="kitten-card__detail">
              {t.litter.available(litter.stats.available ?? 0, litter.stats.total)}
            </p>
          )
        )}
        <p className="kitten-card__price">{price}</p>
        {litter.priceNote && <p className="kitten-card__detail">{litter.priceNote}</p>}
      </div>
    </motion.article>
  );

  if (!litter.slug?.current) {
    return card;
  }

  return (
    <Link href={detailRoute("kittens", locale, litter.slug.current)} className="card-link">
      {card}
    </Link>
  );
}
