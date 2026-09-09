import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { getContactPage, getSiteSettings } from "@/lib/sanity/queries";
import { adoptionTerms } from "@/lib/pricing";
import { pageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";
import type { Metadata } from "next";

export const revalidate = 3600;

const FALLBACK_TITLE = "Contact | La Chatterie des Vents d'Automne - Ragdoll Toulouse";
const FALLBACK_DESCRIPTION =
  "Contactez La Chatterie des Vents d'Automne, élevage de Ragdoll à Toulouse, pour toute question ou réservation.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()]);

  const address = settings?.address;
  const formattedAddress = address?.streetAddress
    ? [address.streetAddress, [address.postalCode, address.addressLocality].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", ")
    : `${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.postalCode} ${SITE_CONFIG.address.addressLocality}`;

  const email = settings?.email ?? SITE_CONFIG.email;
  const phoneDisplay = settings?.phoneDisplay ?? SITE_CONFIG.phoneDisplay;
  const phone = settings?.phone ?? SITE_CONFIG.phone;

  return (
    <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <PageHeader
          content={page}
          fallback={{
            sectionLabel: "Restons en contact",
            titleEmphasis: "Contact",
            introText:
              "Une question sur nos chats Ragdoll à Toulouse, une portée à venir, ou envie de rejoindre la liste d'attente ? Écrivez-nous.",
          }}
        />

        <div className="split-grid split-grid--contact" style={{ marginTop: "3rem" }}>
          <div>
            <div className="contact-info-item">
              <span className="contact-info-item__icon">📍</span>
              <div>
                <p className="contact-info-item__label">Adresse</p>
                <p className="contact-info-item__value">{formattedAddress}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__icon">📞</span>
              <div>
                <p className="contact-info-item__label">Téléphone</p>
                <p className="contact-info-item__value">
                  <a href={`tel:${phone}`}>{phoneDisplay}</a>
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__icon">✉️</span>
              <div>
                <p className="contact-info-item__label">Email</p>
                <p className="contact-info-item__value">
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </div>

            <div className="visit-card">
              <p className="visit-card__title">
                {page?.termsTitle ?? "Modalités d'adoption"}
              </p>
              <p className="body-text-sm">{adoptionTerms(settings)}</p>
            </div>
          </div>

          <ContactForm
            intro={page?.formIntro}
            submitLabel={page?.submitLabel}
            successMessage={page?.successMessage}
            errorMessage={page?.errorMessage}
            fallbackEmail={email}
          />
        </div>
      </div>
    </section>
  );
}
