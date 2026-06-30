import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
  description:
    "Contactez La Chatterie des Vents d'Automne, élevage de Ragdoll à Toulouse, pour toute question ou réservation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
    description:
      "Contactez La Chatterie des Vents d'Automne, élevage de Ragdoll à Toulouse, pour toute question ou réservation.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          Restons en contact
        </p>
        <h1 className="title-hero" style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          <em>Contact</em>
        </h1>
        <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
          Une question sur nos chats Ragdoll à Toulouse, une portée à venir, ou envie de
          rejoindre la liste d&apos;attente ? Écrivez-nous.
        </p>

        <div className="split-grid split-grid--contact" style={{ marginTop: "3rem" }}>
          <div>
            <div className="contact-info-item">
              <span className="contact-info-item__icon">📍</span>
              <div>
                <p className="contact-info-item__label">Adresse</p>
                <p className="contact-info-item__value">201 Rte d&apos;Albi, 31200 Toulouse</p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__icon">📞</span>
              <div>
                <p className="contact-info-item__label">Téléphone</p>
                <p className="contact-info-item__value">
                  <a href="tel:+33782187784">07 82 18 77 84</a>
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-item__icon">✉️</span>
              <div>
                <p className="contact-info-item__label">Email</p>
                <p className="contact-info-item__value">
                  <a href="mailto:ragdollamelie@gmail.com">ragdollamelie@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="visit-card">
              <p className="visit-card__title">Modalités d&apos;adoption</p>
              <p className="body-text-sm">
                Prix fixe de 2 000 € · Acompte de 25% (déductible) à la réservation d&apos;un
                chaton né · Liste d&apos;attente : acompte de 10% (200 €, déductible) ·
                Accompagnement avant, pendant et après l&apos;adoption
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
