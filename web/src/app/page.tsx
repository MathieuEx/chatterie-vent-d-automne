import Image from "next/image";
import Link from "next/link";
import {
  getLatestLitter,
  getGalleryImages,
  getSiteSettings,
  getCats,
  getTestimonials,
  getHomePage,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import LitterCard from "@/components/LitterCard";
import CatCard from "@/components/CatCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";

export const revalidate = 3600;

const ACCENT_CLASS: Record<string, string> = {
  blue: "cert-badge__icon--blue",
  sage: "cert-badge__icon--sage",
  rose: "cert-badge__icon--rose",
};

export default async function Home() {
  const [latestLitter, galleryImages, siteSettings, cats, testimonials, homePage] =
    await Promise.all([
      getLatestLitter(),
      getGalleryImages(6),
      getSiteSettings(),
      getCats(),
      getTestimonials(6),
      getHomePage(),
    ]);
  const featuredCats = cats.filter((cat) => cat.status === "actif").slice(0, 3);

  const hero = homePage?.hero;
  const about = homePage?.about;
  const catsSection = homePage?.catsSection;
  const standardsSection = homePage?.standardsSection;
  const adoptionSection = homePage?.adoptionSection;
  const testimonialsSection = homePage?.testimonialsSection;
  const gallerySection = homePage?.gallerySection;
  const latestLitterSection = homePage?.latestLitterSection;

  return (
    <div>
      <Hero data={hero} />

      <section className="bg-cream-dark" id="about">
        <div className="container split-grid">
          <div style={{ position: "relative" }}>
            <div
              className="about-image"
              style={
                siteSettings?.aboutPhoto
                  ? undefined
                  : { background: "linear-gradient(135deg, #DBC19E 0%, #C89C63 50%, #B67D45 100%)" }
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
            {about?.badgeNumber && (
              <div className="about-image__badge">
                <p className="about-image__badge-num">{about.badgeNumber}</p>
                <p className="about-image__badge-text">{about.badgeText}</p>
              </div>
            )}
          </div>

          <div>
            {about?.sectionLabel && <p className="section-label">{about.sectionLabel}</p>}
            {about?.titleEmphasis && (
              <SectionTitle prefix={about.titlePrefix} emphasis={about.titleEmphasis} />
            )}
            {about?.paragraphs?.map((paragraph, i) => (
              <p className="body-text" key={i}>
                {paragraph}
              </p>
            ))}
            <div className="values-list">
              {about?.values?.map((value) => (
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
              {catsSection?.sectionLabel && <p className="section-label">{catsSection.sectionLabel}</p>}
              {catsSection?.titleEmphasis && (
                <SectionTitle prefix={catsSection.titlePrefix} emphasis={catsSection.titleEmphasis} />
              )}
              {catsSection?.description && <p className="body-text">{catsSection.description}</p>}
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
        <div className="container split-grid">
          <div>
            {standardsSection?.sectionLabel && (
              <p className="section-label">{standardsSection.sectionLabel}</p>
            )}
            {standardsSection?.titleEmphasis && (
              <SectionTitle prefix={standardsSection.titlePrefix} emphasis={standardsSection.titleEmphasis} />
            )}
            {standardsSection?.standards?.map((standard) => (
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
            {standardsSection?.cardTitle && <p className="cert-card__title">{standardsSection.cardTitle}</p>}
            {standardsSection?.cardSubtitle && (
              <p className="cert-card__sub">{standardsSection.cardSubtitle}</p>
            )}
            {standardsSection?.certifications?.map((cert) => (
              <div key={cert.name} className="cert-badge">
                <span className={`cert-badge__icon ${ACCENT_CLASS[cert.accent ?? "blue"]}`}>
                  {cert.icon}
                </span>
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
          {adoptionSection?.sectionLabel && <p className="section-label">{adoptionSection.sectionLabel}</p>}
          {adoptionSection?.titleEmphasis && (
            <SectionTitle prefix={adoptionSection.titlePrefix} emphasis={adoptionSection.titleEmphasis} />
          )}
          <div className="process-grid">
            {adoptionSection?.steps?.map((step, i) => (
              <div key={step.title} className="process-step">
                <p className="process-step__num">{String(i + 1).padStart(2, "0")}</p>
                <p className="process-step__title">{step.title}</p>
                <p className="process-step__desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-cream-dark" id="avis">
          <div className="container">
            {testimonialsSection?.sectionLabel && (
              <p className="section-label">{testimonialsSection.sectionLabel}</p>
            )}
            {testimonialsSection?.titleEmphasis && (
              <SectionTitle prefix={testimonialsSection.titlePrefix} emphasis={testimonialsSection.titleEmphasis} />
            )}
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      <section className="bg-cream" id="gallery">
        <div className="container">
          {gallerySection?.sectionLabel && <p className="section-label">{gallerySection.sectionLabel}</p>}
          {gallerySection?.titleEmphasis && (
            <SectionTitle prefix={gallerySection.titlePrefix} emphasis={gallerySection.titleEmphasis} />
          )}
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
              {gallerySection?.emptyStateText ??
                "Galerie à venir — les premières photos seront ajoutées dès la prochaine portée."}
            </p>
          )}
        </div>
      </section>

      {latestLitter && (
        <section className="bg-gradient-kittens">
          <div className="container">
            {latestLitterSection?.sectionLabel && (
              <p className="section-label">{latestLitterSection.sectionLabel}</p>
            )}
            {latestLitterSection?.titleEmphasis && (
              <SectionTitle prefix={latestLitterSection.titlePrefix} emphasis={latestLitterSection.titleEmphasis} />
            )}
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
