import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/queries";

export default async function Footer() {
  const siteSettings = await getSiteSettings();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="footer__logo">
              La Chatterie des <span>Vents d&apos;Automne</span>
            </p>
            <p className="footer__tagline">
              {siteSettings?.footerTagline ??
                "Élevage familial de chats Ragdoll à Toulouse, dans le respect de la santé et du bien-être de nos chats."}
            </p>
          </div>

          <div>
            <p className="footer__col-title">Navigation</p>
            <div className="footer__links">
              <Link href="/nos-chats">Nos Chats</Link>
              <Link href="/nos-chatons">Nos Chatons</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Contact</p>
            <div className="footer__links">
              <a href="mailto:ragdollamelie@gmail.com">ragdollamelie@gmail.com</a>
              <a href="tel:+33782187784">07 82 18 77 84</a>
              <a
                href="https://www.instagram.com/ragdoll_des_vents_dautomne"
                target="_blank"
                rel="noopener noreferrer"
              >
                @ragdoll_des_vents_dautomne
              </a>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Légal</p>
            <div className="footer__links">
              <span>201 Rte d&apos;Albi, 31200 Toulouse</span>
              <span>SIRET 94967144000012</span>
              <span>Affixe LOOF n°37170</span>
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} La Chatterie des Vents d&apos;Automne
          </p>
          <div className="footer__legal">
            <span>Médiateur : MEDIAVET</span>
            <span>ACACED 2022</span>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-de-confidentialite">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
