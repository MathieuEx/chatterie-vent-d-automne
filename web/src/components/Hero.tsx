"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { HomePage } from "@/lib/sanity/types";

type HeroProps = {
  data?: HomePage["hero"];
};

export default function Hero({ data }: HeroProps) {
  if (!data?.titleEmphasis) return null;

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
        {data.badge && <span className="badge-hero">{data.badge}</span>}
        <h1 className="title-hero">
          {data.titlePrefix ? `${data.titlePrefix} ` : null}
          <em>{data.titleEmphasis}</em>
        </h1>
        {data.description && <p className="body-text">{data.description}</p>}
        <div style={{ display: "flex", gap: "1.25rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {data.ctaPrimaryLabel && (
            <Link href="/nos-chatons" className="btn-primary">
              {data.ctaPrimaryLabel}
            </Link>
          )}
          {data.ctaSecondaryLabel && (
            <Link href="/contact" className="btn-secondary">
              {data.ctaSecondaryLabel}
            </Link>
          )}
        </div>
        {data.stats && data.stats.length > 0 && (
          <div className="hero-stats">
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <p className="hero-stats__num">{stat.value}</p>
                <p className="hero-stats__label">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
