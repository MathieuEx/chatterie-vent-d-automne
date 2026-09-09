import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG, SITE_URL } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/sanity/queries";
import { defaultPrice } from "@/lib/pricing";
import "./globals.css";

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

const FALLBACK_TITLE = "La Chatterie des Vents d'Automne | Élevage Ragdoll à Toulouse";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.defaultSeo?.metaTitle || FALLBACK_TITLE;
  const description = settings?.defaultSeo?.metaDescription || SITE_CONFIG.description;
  const siteName = settings?.siteName || SITE_CONFIG.name;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "/",
      siteName,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Fiche établissement lue par Google : coordonnées et tarif viennent du CMS. */
async function buildJsonLd() {
  const settings = await getSiteSettings();
  const address = settings?.address;
  const socials = settings?.socialLinks?.map((link) => link.url) ?? [SITE_CONFIG.instagram];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings?.siteName || SITE_CONFIG.name,
    description: settings?.defaultSeo?.metaDescription || SITE_CONFIG.description,
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    telephone: settings?.phone || SITE_CONFIG.phone,
    email: settings?.email || SITE_CONFIG.email,
    priceRange: defaultPrice(settings),
    address: {
      "@type": "PostalAddress",
      streetAddress: address?.streetAddress || SITE_CONFIG.address.streetAddress,
      postalCode: address?.postalCode || SITE_CONFIG.address.postalCode,
      addressLocality: address?.addressLocality || SITE_CONFIG.address.addressLocality,
      addressCountry: address?.addressCountry || SITE_CONFIG.address.addressCountry,
    },
    sameAs: socials,
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = await buildJsonLd();

  return (
    <html lang="fr" className={`${cormorant.variable} ${montserrat.variable} ${fraunces.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
