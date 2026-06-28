import Image from "next/image";
import Link from "next/link";
import { getLatestLitter, getGalleryImages, getSiteSettings, getCats } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import LitterCard from "@/components/LitterCard";
import CatCard from "@/components/CatCard";

export const revalidate = 3600;

const STATS = [
  { value: "3 ans", label: "d'expérience" },
  { value: "33", label: "chatons adoptés" },
  { value: "5/5", label: "Google" },
  { value: "4.7/5", label: "Facebook" },
];

const VALUES = [
  {
    title: "Tempérament",
    description:
      "Nos chatons grandissent au cœur du foyer, sociabilisés aux bruits du quotidien, aux autres chats et à Victor, notre petit chien. Un tempérament si proche de l'humain qu'on parle souvent de « chat-chien ».",
  },
  {
    title: "Santé avant tout",
    description:
      "Parents sélectionnés dans toute l'Europe, testés négatifs HCM, PKD, FIV et FeLV. Suivi vétérinaire complet : vaccins, vermifuges, puce et stérilisation précoce.",
  },
  {
    title: "Lignée & beauté",
    description:
      "Origines françaises, polonaises et néerlandaises pour préserver le standard de la race, avec des robes traditionnelles et des teintes précieuses.",
  },
];

const STANDARDS = [
  {
    title: "Bien être animal avant tout",
    description:
      "Nos chatons grandissent en liberté au sein de notre foyer, socialisés dès le plus jeune âge avec nos différents Ragdoll et notre chien.",
  },
  {
    title: "Suivi vétérinaire vigoureux",
    description:
      "Vaccinations pour typhus, coryza et leucose. Tests FIV, FeLV, ADN, HCM et PKD systématiques sur tous nos reproducteurs.",
  },
  {
    title: "Pedigree LOOF",
    description: "Chaque chaton part avec son pedigree LOOF et son certificat vétérinaire.",
  },
  {
    title: "Médiation indépendante",
    description: "En cas de litige, un médiateur agréé (MEDIAVET) est à votre disposition.",
  },
  {
    title: "Accompagnement personnalisé",
    description: "Nous restons disponibles tout au long de la vie de votre chat pour répondre à vos questions.",
  },
];

const CERTIFICATIONS = [
  { icon: "🎓", className: "cert-badge__icon--blue", name: "ACACED", detail: "Obtenu en 2022" },
  {
    icon: "🌾",
    className: "cert-badge__icon--sage",
    name: "Chambre d'Agriculture",
    detail: "Inscrite depuis 2023",
  },
  { icon: "🐾", className: "cert-badge__icon--rose", name: "Affixe LOOF", detail: "n°37170" },
];

const PROCESS_STEPS = [
  {
    title: "Premier contact",
    description: "Vous nous écrivez pour échanger sur vos attentes et découvrir nos chats.",
  },
  {
    title: "Liste d'attente",
    description: "Inscription avec un acompte de 200 € (10%) pour réserver votre place.",
  },
  {
    title: "Réservation",
    description: "À la naissance, un acompte de 25% confirme la réservation de votre chaton.",
  },
  {
    title: "Départ à 4 mois",
    description:
      "Vaccins (typhus, coryza, rappel ; rage si départ à l'étranger), puce électronique iCAD, stérilisation, vermifuges, certificat vétérinaire, carnet de santé et pedigree LOOF inclus. Accompagnement personnalisé avant, pendant et après l'adoption.",
  },
];

export default async function Home() {
  const [latestLitter, galleryImages, siteSettings, cats] = await Promise.all([
    getLatestLitter(),
    getGalleryImages(6),
    getSiteSettings(),
    getCats(),
  ]);
  const featuredCats = cats.filter((cat) => cat.status === "actif").slice(0, 3);

  return (
    <div>
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__pattern" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="badge-hero">Toulouse · Ragdoll</span>
          <h1 className="title-hero">
            La Chatterie des <em>Vents d&apos;Automne</em>
          </h1>
          <p className="body-text">
            Élevage familial passionné, dédié aux chats Ragdoll. Des chatons choyés, en
            parfaite santé, élevés sous le pied de la maison.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <Link href="/nos-chatons" className="btn-primary">
              Voir nos chatons disponibles
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous contacter →
            </Link>
          </div>
          <div className="hero-stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="hero-stats__num">{stat.value}</p>
                <p className="hero-stats__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-dark" id="about">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              className="about-image"
              style={
                siteSettings?.aboutPhoto
                  ? undefined
                  : { background: "linear-gradient(135deg, #D4BFB4 0%, #C5A89A 50%, #B8957E 100%)" }
              }
            >
              {siteSettings?.aboutPhoto && (
                <Image
                  src={urlFor(siteSettings.aboutPhoto).width(640).height(800).url()}
                  alt="La Chatterie des Vents d'Automne"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                />
              )}
            </div>
            <div className="about-image__deco" />
            <div className="about-image__badge">
              <p className="about-image__badge-num">3</p>
              <p className="about-image__badge-text">
                ans d&apos;élevage
                <br />
                passionné
              </p>
            </div>
          </div>

          <div>
            <p className="section-label">Notre histoire</p>
            <h2 className="title-section">
              Une passion née d&apos;<em>un coup de cœur</em>
            </h2>
            <p className="body-text">
              Mon histoire avec le Ragdoll a commencé bien avant la création de la chatterie.
              Plus jeune, j&apos;ai eu la chance d&apos;accueillir, avec ma famille, un chat qui
              ressemblait beaucoup à cette race — j&apos;ai immédiatement été touchée par sa
              douceur, son regard et son pelage mi-long aux nuances seal si particulières.
              Quelques années plus tard, lors de mon installation à Toulouse pour mes études,
              ce rêve est devenu réalité, puis une évidence : la naissance de la Chatterie des
              Vents d&apos;Automne.
            </p>
            <p className="body-text">
              Aujourd&apos;hui, nos chats et chatons vivent sous le pied de la maison, sociabilisés
              dès la naissance aux bruits du quotidien, aux autres chats et à Victor, notre
              petit chien. Cette proximité façonne le tempérament doux et affectueux qui
              caractérise nos Ragdolls.
            </p>
            <div className="values-list">
              {VALUES.map((value) => (
                <div key={value.title} className="values-list__item">
                  <span className="values-list__icon" />
                  <p>
                    <strong>{value.title}.</strong> {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream" id="cats">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <div>
              <p className="section-label">Nos reproducteurs</p>
              <h2 className="title-section">
                Des parents <em>sélectionnés avec soin</em>
              </h2>
              <p className="body-text">
                Tous nos reproducteurs sont testés HCM, PKD, FIV et FeLV négatifs avant toute
                reproduction.
              </p>
            </div>
            <Link href="/nos-chats" className="btn-secondary">
              Voir tous nos chats →
            </Link>
          </div>

          {featuredCats.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "var(--gap-cards)",
              }}
            >
              {featuredCats.map((cat) => (
                <CatCard key={cat._id} cat={cat} />
              ))}
            </div>
          ) : (
            <p className="body-text-sm">Nos reproducteurs seront bientôt présentés ici.</p>
          )}
        </div>
      </section>

      <section className="bg-cream-dark" id="standards">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div>
            <p className="section-label">Nos engagements qualité</p>
            <h2 className="title-section">
              Un élevage <em>encadré et transparent</em>
            </h2>
            {STANDARDS.map((standard) => (
              <div key={standard.title} className="standard-item">
                <span className="standard-item__bullet" />
                <div>
                  <p className="standard-item__title">{standard.title}</p>
                  <p className="body-text-sm">{standard.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cert-card">
            <p className="cert-card__title">Certifications</p>
            <p className="cert-card__sub">Un élevage déclaré et encadré</p>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="cert-badge">
                <span className={`cert-badge__icon ${cert.className}`}>{cert.icon}</span>
                <div>
                  <p className="cert-badge__name">{cert.name}</p>
                  <p className="cert-badge__desc">{cert.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--dark bg-warm-brown">
        <div className="container">
          <p className="section-label">Adoption</p>
          <h2 className="title-section">
            Le <em>parcours</em> pour accueillir votre chaton
          </h2>
          <div className="process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="process-step">
                <p className="process-step__num">{String(i + 1).padStart(2, "0")}</p>
                <p className="process-step__title">{step.title}</p>
                <p className="process-step__desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream" id="gallery">
        <div className="container">
          <p className="section-label">En images</p>
          <h2 className="title-section">
            La vie de nos <em>chatons</em>
          </h2>
          {galleryImages.length > 0 ? (
            <div className="gallery-grid">
              {galleryImages.map((image, i) => (
                <div key={i} className="gallery-item">
                  <Image
                    src={urlFor(image).width(640).height(440).url()}
                    alt="Photo de chaton"
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="body-text-sm" style={{ marginTop: "2rem" }}>
              Galerie à venir — les premières photos seront ajoutées dès la prochaine portée.
            </p>
          )}
        </div>
      </section>

      {latestLitter && (
        <section className="bg-gradient-kittens">
          <div className="container">
            <p className="section-label">Dernière portée</p>
            <h2 className="title-section">
              Découvrez nos <em>derniers chatons</em>
            </h2>
            <div style={{ maxWidth: 360 }}>
              <LitterCard litter={latestLitter} />
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link href="/nos-chatons" className="btn-secondary">
                Voir toutes les portées →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
