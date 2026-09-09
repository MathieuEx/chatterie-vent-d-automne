import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG, SITE_URL } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/sanity/queries";
import { defaultPrice } from "@/lib/pricing";
import { alternateOf, route, type Locale } from "@/lib/i18n/config";
import { HTML_LANG } from "@/lib/i18n/dictionary";
import { localize } from "@/lib/i18n/localize";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-logo",
});

const FALLBACK_TITLE: Record<Locale, string> = {
  fr: "La Chatterie des Vents d'Automne | Élevage Ragdoll à Toulouse",
  en: "La Chatterie des Vents d'Automne | Ragdoll Cattery in Toulouse",
};

const FALLBACK_DESCRIPTION: Record<Locale, string> = {
  fr: SITE_CONFIG.description,
  en: "A family-run Ragdoll cattery in Toulouse, France. Kittens raised underfoot, health-tested parents, full veterinary follow-up and LOOF pedigree.",
};

/**
 * Métadonnées communes aux deux langues.
 *
 * Chaque langue a son propre layout racine (le `<html lang>` doit changer), et
 * ces deux layouts partagent tout le reste via ce module.
 */
export async function shellMetadata(locale: Locale): Promise<Metadata> {
  const settings = localize(await getSiteSettings(), locale);
  const title = settings?.defaultSeo?.metaTitle || FALLBACK_TITLE[locale];
  const description = settings?.defaultSeo?.metaDescription || FALLBACK_DESCRIPTION[locale];
  const home = route("home", locale);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: home,
      languages: {
        fr: route("home", "fr"),
        en: route("home", "en"),
        "x-default": route("home", "fr"),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      url: home,
      siteName: settings?.siteName || SITE_CONFIG.name,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Fiche établissement lue par Google : coordonnées et tarif viennent du CMS. */
async function buildJsonLd(locale: Locale) {
  const settings = localize(await getSiteSettings(), locale);
  const address = settings?.address;
  const socials = settings?.socialLinks?.map((link) => link.url) ?? [SITE_CONFIG.instagram];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings?.siteName || SITE_CONFIG.name,
    description: settings?.defaultSeo?.metaDescription || FALLBACK_DESCRIPTION[locale],
    url: `${SITE_URL}${route("home", locale)}`,
    image: `${SITE_URL}/logo.png`,
    telephone: settings?.phone || SITE_CONFIG.phone,
    email: settings?.email || SITE_CONFIG.email,
    priceRange: defaultPrice(settings, locale),
    address: {
      "@type": "PostalAddress",
      streetAddress: address?.streetAddress || SITE_CONFIG.address.streetAddress,
      postalCode: address?.postalCode || SITE_CONFIG.address.postalCode,
      addressLocality: address?.addressLocality || SITE_CONFIG.address.addressLocality,
      addressCountry: address?.addressCountry || SITE_CONFIG.address.addressCountry,
    },
    inLanguage: HTML_LANG[locale],
    sameAs: socials,
  };
}

export default async function LayoutShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const jsonLd = await buildJsonLd(locale);

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${cormorant.variable} ${montserrat.variable} ${fraunces.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}

export { alternateOf };
