"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/nos-chats", label: "Nos Chats" },
  { href: "/nos-chatons", label: "Nos Chatons" },
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <Link href="/" className="navbar__logo" onClick={closeMenu}>
        <Image
          src="/logo.jpg"
          alt="La Chatterie des Vents d'Automne"
          width={52}
          height={52}
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
