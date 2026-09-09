import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/queries";
import { SITE_CONFIG } from "@/lib/site-config";
import { route, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localize } from "@/lib/i18n/localize";

export default async function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).footer;
  const settings = localize(await getSiteSettings(), locale);

  const email = settings?.email ?? SITE_CONFIG.email;
  const phoneDisplay = settings?.phoneDisplay ?? SITE_CONFIG.phoneDisplay;
  const phone = settings?.phone ?? SITE_CONFIG.phone;

  const address = settings?.address;
  const formattedAddress = address?.streetAddress
    ? [address.streetAddress, [address.postalCode, address.addressLocality].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", ")
    : `${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.postalCode} ${SITE_CONFIG.address.addressLocality}`;

  const socialLinks = settings?.socialLinks?.length
    ? settings.socialLinks
    : [{ label: "@ragdoll_des_vents_dautomne", url: SITE_CONFIG.instagram }];

  const legal = settings?.legal;
  const siret = legal?.siret ?? "SIRET 94967144000012";
  const loofAffix = legal?.loofAffix ?? "Affixe LOOF n°37170";
  const mediator = legal?.mediator ?? "MEDIAVET";
  const acaced = legal?.acaced ?? "ACACED 2022";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="footer__logo">
              La Chatterie des <span>Vents d&apos;Automne</span>
            </p>
            <p className="footer__tagline">{settings?.footerTagline ?? t.tagline}</p>
          </div>

          <div>
            <p className="footer__col-title">{settings?.footerNavTitle ?? t.navigation}</p>
            <div className="footer__links">
              <Link href={route("cats", locale)}>{getDictionary(locale).nav.cats}</Link>
              <Link href={route("kittens", locale)}>{getDictionary(locale).nav.kittens}</Link>
              <Link href={route("news", locale)}>{getDictionary(locale).nav.news}</Link>
              <Link href={route("faq", locale)}>{getDictionary(locale).nav.faq}</Link>
              <Link href={route("contact", locale)}>{getDictionary(locale).nav.contact}</Link>
            </div>
          </div>

          <div>
            <p className="footer__col-title">{settings?.footerContactTitle ?? t.contact}</p>
            <div className="footer__links">
              <a href={`mailto:${email}`}>{email}</a>
              <a href={`tel:${phone}`}>{phoneDisplay}</a>
              {socialLinks.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer__col-title">{settings?.footerLegalTitle ?? t.legal}</p>
            <div className="footer__links">
              <span>{formattedAddress}</span>
              <span>{siret}</span>
              <span>{loofAffix}</span>
              {legal?.extraMentions?.map((mention) => (
                <span key={mention}>{mention}</span>
              ))}
              {/* Les pages légales relèvent du droit français : une seule
                  version, en français, quelle que soit la langue du site. */}
              <Link href={route("legalNotice", locale)} lang="fr">
                {t.legalNotice}
              </Link>
              <Link href={route("privacy", locale)} lang="fr">
                {t.privacy}
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {settings?.siteName ?? SITE_CONFIG.name}
          </p>
          <div className="footer__legal">
            <span>
              {t.mediator} : {mediator}
            </span>
            <span>{acaced}</span>
            <Link href={route("legalNotice", locale)} lang="fr">
              {t.legalNotice}
            </Link>
            <Link href={route("privacy", locale)} lang="fr">
              {t.privacyShort}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
