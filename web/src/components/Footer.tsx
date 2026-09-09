import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/queries";
import { SITE_CONFIG } from "@/lib/site-config";

export default async function Footer() {
  const settings = await getSiteSettings();

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
            <p className="footer__tagline">
              {settings?.footerTagline ??
                "Élevage familial de chats Ragdoll à Toulouse, dans le respect de la santé et du bien-être de nos chats."}
            </p>
          </div>

          <div>
            <p className="footer__col-title">{settings?.footerNavTitle ?? "Navigation"}</p>
            <div className="footer__links">
              <Link href="/nos-chats">Nos Chats</Link>
              <Link href="/nos-chatons">Nos Chatons</Link>
              <Link href="/actualites">Actualités</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <p className="footer__col-title">{settings?.footerContactTitle ?? "Contact"}</p>
            <div className="footer__links">
              <a href={`mailto:${email}`}>{email}</a>
              <a href={`tel:${phone}`}>{phoneDisplay}</a>
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer__col-title">{settings?.footerLegalTitle ?? "Légal"}</p>
            <div className="footer__links">
              <span>{formattedAddress}</span>
              <span>{siret}</span>
              <span>{loofAffix}</span>
              {legal?.extraMentions?.map((mention) => (
                <span key={mention}>{mention}</span>
              ))}
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {settings?.siteName ?? SITE_CONFIG.name}
          </p>
          <div className="footer__legal">
            <span>Médiateur : {mediator}</span>
            <span>{acaced}</span>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-de-confidentialite">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
