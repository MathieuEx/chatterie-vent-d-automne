"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { urlFor } from "@/lib/sanity/image";
import type { Cat } from "@/lib/sanity/types";

const ROLE_BADGE: Record<Cat["role"], { label: string; className: string }> = {
  male: { label: "Mâle", className: "badge-genre--male" },
  femelle: { label: "Femelle", className: "badge-genre--female" },
};

export default function CatCard({ cat }: { cat: Cat }) {
  const roleBadge = ROLE_BADGE[cat.role];

  const card = (
    <motion.article
      className="cat-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "var(--shadow-card-hover)" }}
    >
      <div className="cat-card__image">
        <Image
          src={urlFor(cat.photo).width(480).height(320).url()}
          alt={cat.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className={`badge-genre ${roleBadge.className}`}>{roleBadge.label}</span>
      </div>
      <div className="cat-card__body">
        {cat.status === "retraite" && <p className="meta-label">Retraité</p>}
        <h3 className="title-card">{cat.name}</h3>

        {(cat.colorCode || cat.origin) && (
          <div className="cat-card__traits">
            {cat.colorCode && <span className="badge-trait">{cat.colorCode}</span>}
            {cat.origin && <span className="badge-trait">{cat.origin}</span>}
          </div>
        )}

        {cat.geneticData && <p className="body-text-sm">{cat.geneticData}</p>}
        {cat.tests && <p className="body-text-sm" style={{ color: "var(--sage)" }}>✓ {cat.tests}</p>}
      </div>
    </motion.article>
  );

  if (!cat.slug?.current) {
    return card;
  }

  return (
    <Link href={`/nos-chats/${cat.slug.current}`} className="card-link">
      {card}
    </Link>
  );
}
