"use client";

import Link from "next/link";
import { motion } from "motion/react";

const STATS = [
  { value: "3 ans", label: "d'expérience" },
  { value: "33", label: "chatons adoptés" },
  { value: "5/5", label: "Google" },
  { value: "4.7/5", label: "Facebook" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__pattern" />
      <motion.div
        className="container"
        style={{ position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="badge-hero">Toulouse · Ragdoll</span>
        <h1 className="title-hero">
          La Chatterie des <em>Vents d&apos;Automne</em>
        </h1>
        <p className="body-text">
          Élevage familial passionné à Toulouse, dédié aux chats Ragdoll. Des chatons choyés,
          en parfaite santé, élevés sous le pied de la maison.
        </p>
        <div style={{ display: "flex", gap: "1.25rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <Link href="/nos-chatons" className="btn-primary">
            Voir nos chatons disponibles
          </Link>
          <Link href="/contact" className="btn-secondary">
            Nous contacter →
          </Link>
        </div>
        <div className="hero-stats">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="hero-stats__num">{stat.value}</p>
              <p className="hero-stats__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
