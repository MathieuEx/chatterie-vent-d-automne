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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <Link href="/" className="navbar__logo">
        <Image
          src="/logo.jpg"
          alt="La Chatterie des Vents d'Automne"
          width={52}
          height={52}
          className="navbar__logo-img"
          priority
        />
      </Link>
      <nav className="navbar__links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="navbar__link">
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className="navbar__link navbar__cta">
          Nous contacter
        </Link>
      </nav>
    </header>
  );
}
