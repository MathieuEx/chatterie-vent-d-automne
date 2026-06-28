import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import StatusBadge from "@/components/StatusBadge";
import type { Litter } from "@/lib/sanity/types";

export default function LitterCard({ litter }: { litter: Litter }) {
  const cover = litter.gallery?.[0];
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(litter.birthDate));

  return (
    <article className="kitten-card">
      <div className="kitten-card__image">
        {cover && (
          <Image
            src={urlFor(cover).width(480).height(480).url()}
            alt={litter.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        )}
        <StatusBadge status={litter.status} />
      </div>
      <div className="kitten-card__body">
        <p className="kitten-card__name">{litter.title}</p>
        <p className="kitten-card__detail">
          {litter.status === "a_venir" ? "Naissance prévue le" : "Née le"} {formattedDate}
          {(litter.parentMale || litter.parentFemale) &&
            ` · ${litter.parentFemale} × ${litter.parentMale}`}
        </p>
        {litter.status === "a_venir" ? (
          <p className="kitten-card__detail">Inscriptions sur liste d&apos;attente ouvertes</p>
        ) : (
          litter.stats?.total != null && (
            <p className="kitten-card__detail">
              {litter.stats.available ?? 0} / {litter.stats.total} chaton(s) disponible(s)
            </p>
          )
        )}
        <p className="kitten-card__price">2 000 €</p>
      </div>
    </article>
  );
}
