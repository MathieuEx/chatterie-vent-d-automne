"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/nos-chats", label: "Nos Chats" },
  { href: "/nos-chatons", label: "Nos Chatons" },
  { href: "/actualites", label: "Actualités" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <Link href="/" className="navbar__logo" onClick={closeMenu}>
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
        <Link href="/contact" className="navbar__link navbar__cta" onClick={closeMenu}>
          Nous contacter
        </Link>
        <LanguageSwitcher />
      </nav>
      <button
        type="button"
        className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
      >
        <span className="navbar__burger-line" />
        <span className="navbar__burger-line" />
        <span className="navbar__burger-line" />
      </button>
    </header>
  );
}
