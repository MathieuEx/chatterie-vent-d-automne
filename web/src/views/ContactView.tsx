import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { getContactPage, getSiteSettings } from "@/lib/sanity/queries";
import { adoptionTerms } from "@/lib/pricing";
import { pageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";
import { route, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localize } from "@/lib/i18n/localize";

const FALLBACK = {
  fr: {
    title: "Contact | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
    description:
      "Contactez La Chatterie des Vents d'Automne, élevage de Ragdoll à Toulouse, pour toute question ou réservation.",
    label: "Restons en contact",
    emphasis: "Contact",
    intro:
      "Une question sur nos chats Ragdoll à Toulouse, une portée à venir, ou envie de rejoindre la liste d'attente ? Écrivez-nous.",
  },
  en: {
    title: "Contact | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
    description:
      "Get in touch with La Chatterie des Vents d'Automne, a Ragdoll cattery in Toulouse, France, for any question or reservation.",
    label: "Get in touch",
    emphasis: "Contact",
    intro:
      "A question about our Ragdoll cats in Toulouse, an upcoming litter, or would you like to join the waiting list? Write to us.",
  },
} as const;

export async function contactMetadata(locale: Locale): Promise<Metadata> {
  const page = localize(await getContactPage(), locale);
  return pageMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK[locale].title,
    fallbackDescription: FALLBACK[locale].description,
    path: route("contact", locale),
    locale,
  });
}

export default async function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).form;
  const fallback = FALLBACK[locale];

  const [rawPage, rawSettings] = await Promise.all([getContactPage(), getSiteSettings()]);
  const page = localize(rawPage, locale);
  const settings = localize(rawSettings, locale);

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
            sectionLabel: fallback.label,
            titleEmphasis: fallback.emphasis,
            introText: fallback.intro,
          }}
        />

        <div className="split-grid split-grid--contact" style={{ marginTop: "3rem" }}>
          <div>
            <div className="contact-info-item">
              <span className="contact-info-item__icon">📍</span>
              <div>
                <p className="contact-info-item__label">{t.addressLabel}</p>
                <p className="contact-info-item__value">{formattedAddress}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__icon">📞</span>
              <div>
                <p className="contact-info-item__label">{t.phoneLabel}</p>
                <p className="contact-info-item__value">
                  <a href={`tel:${phone}`}>{phoneDisplay}</a>
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__icon">✉️</span>
              <div>
                <p className="contact-info-item__label">{t.emailLabel}</p>
                <p className="contact-info-item__value">
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </div>

            <div className="visit-card">
              <p className="visit-card__title">{page?.termsTitle ?? t.terms}</p>
              <p className="body-text-sm">{adoptionTerms(settings, locale)}</p>
            </div>
          </div>

          <ContactForm
            locale={locale}
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
