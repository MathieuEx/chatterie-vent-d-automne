import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG, SITE_URL } from "@/lib/site-config";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "La Chatterie des Vents d'Automne | Élevage Ragdoll à Toulouse",
  description: SITE_CONFIG.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: SITE_CONFIG.name,
    title: "La Chatterie des Vents d'Automne | Élevage Ragdoll à Toulouse",
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "La Chatterie des Vents d'Automne | Élevage Ragdoll à Toulouse",
    description: SITE_CONFIG.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: "2000 EUR",
  address: {
    "@type": "PostalAddress",
    ...SITE_CONFIG.address,
  },
  sameAs: [SITE_CONFIG.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
