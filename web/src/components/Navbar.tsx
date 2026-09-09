"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { route, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: route("home", locale), label: t.home },
    { href: route("cats", locale), label: t.cats },
    { href: route("kittens", locale), label: t.kittens },
    { href: route("news", locale), label: t.news },
    { href: route("faq", locale), label: t.faq },
    { href: route("contact", locale), label: t.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fige la page derrière le menu ouvert. `overflow: hidden` seul est ignoré
  // par Safari iOS : on sort le body du flux en mémorisant la position, puis on
  // la restaure à la fermeture — sinon ouvrir le menu en milieu de page
  // renvoyait en haut.
  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const { body } = document;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <Link href={route("home", locale)} className="navbar__logo" onClick={closeMenu}>
        <Image
          src="/logo.png"
          alt="La Chatterie des Vents d'Automne"
          width={100}
          height={100}
          className="navbar__logo-img"
          priority
        />
      </Link>
      <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="navbar__link" onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <Link
          href={route("contact", locale)}
          className="navbar__link navbar__cta"
          onClick={closeMenu}
        >
          {t.cta}
        </Link>
        <LanguageSwitcher locale={locale} />
      </nav>
      <button
        type="button"
        className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? t.closeMenu : t.openMenu}
        aria-expanded={menuOpen}
      >
        <span className="navbar__burger-line" />
        <span className="navbar__burger-line" />
        <span className="navbar__burger-line" />
      </button>
    </header>
  );
}
