import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable | La Chatterie des Vents d'Automne",
  description: "La page que vous cherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: "90vh" }}>
      <div className="hero__bg" />
      <div className="hero__pattern" />
      <div
        className="container"
        style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", textAlign: "center" }}
      >
        <span className="badge-hero">Erreur 404</span>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(4.5rem, 11vw, 7.5rem)",
            fontWeight: 400,
            color: "var(--terracotta)",
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}
        >
          404
        </p>
        <h1 className="title-hero">
          Ce chaton s&apos;est <em>faufilé</em> hors de la page
        </h1>
        <p className="body-text" style={{ margin: "0 auto 2.5rem" }}>
          Comme nos Ragdolls partis explorer la maison, la page que vous cherchez s&apos;est
          volatilisée. Pas de panique, on vous raccompagne au chaud.
        </p>
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
          <Link href="/nos-chatons" className="btn-secondary">
            Voir nos chatons disponibles →
          </Link>
        </div>
      </div>
    </section>
  );
}
