import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
  description:
    "Mentions légales de La Chatterie des Vents d'Automne, élevage de chats Ragdoll à Toulouse.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          Informations légales
        </p>
        <h1 className="title-hero" style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          <em>Mentions légales</em>
        </h1>

        <div className="legal-content" style={{ marginTop: "3rem" }}>
          <p className="legal-content__updated" style={{ textAlign: "center" }}>
            Dernière mise à jour : 30 juin 2026
          </p>

          <h2>1. Éditeur du site</h2>
          <p>
            Le présent site est édité par <strong>La Chatterie des Vents d&apos;Automne</strong>,
            élevage félin spécialisé dans la race Ragdoll, dont le siège est situé au :
          </p>
          <ul>
            <li>201 Rte d&apos;Albi, 31200 Toulouse, France</li>
            <li>SIRET : 949 671 440 00012</li>
            <li>Affixe LOOF n°37170</li>
            <li>
              Email :{" "}
              <a href="mailto:ragdollamelie@gmail.com">ragdollamelie@gmail.com</a>
            </li>
            <li>
              Téléphone : <a href="tel:+33782187784">07 82 18 77 84</a>
            </li>
          </ul>
          <p>
            La Chatterie des Vents d&apos;Automne est titulaire de l&apos;ACACED (Attestation de
            Connaissances pour les Animaux de Compagnie d&apos;Espèces Domestiques) obtenue en 2022,
            et est enregistrée auprès de la Chambre d&apos;Agriculture depuis 2023.
          </p>

          <h2>2. Directrice de la publication</h2>
          <p>
            La directrice de la publication est Amélie, gérante de La Chatterie des Vents
            d&apos;Automne, joignable à l&apos;adresse email mentionnée ci-dessus.
          </p>

          <h2>3. Hébergement</h2>
          <p>
            Le site est hébergé par :
          </p>
          <ul>
            <li>
              <strong>Vercel Inc.</strong>
            </li>
            <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
            <li>
              Site web :{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                vercel.com
              </a>
            </li>
          </ul>

          <h2>4. Conception et gestion du contenu</h2>
          <p>
            Le contenu éditorial du site (textes, photographies des chats et chatons, fiches de
            portées) est géré par La Chatterie des Vents d&apos;Automne via une interface
            d&apos;administration de contenu (Sanity.io).
          </p>

          <h2>5. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des éléments présents sur ce site (textes, photographies, logos,
            illustrations, mise en page) est protégé par le droit d&apos;auteur et reste la
            propriété exclusive de La Chatterie des Vents d&apos;Automne, sauf mention contraire.
            Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans
            autorisation préalable écrite, est interdite et pourrait constituer une contrefaçon au
            sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>

          <h2>6. Médiation à la consommation</h2>
          <p>
            Conformément aux dispositions du Code de la consommation concernant le règlement
            amiable des litiges, La Chatterie des Vents d&apos;Automne adhère au service de
            médiation de la consommation <strong>MEDIAVET</strong>. En cas de litige, le
            consommateur peut déposer sa réclamation sur le site de ce médiateur, après avoir
            tenté au préalable de résoudre le différend directement auprès de l&apos;éleveur.
          </p>

          <h2>7. Limitation de responsabilité</h2>
          <p>
            La Chatterie des Vents d&apos;Automne s&apos;efforce d&apos;assurer l&apos;exactitude
            et la mise à jour des informations diffusées sur ce site (disponibilité des chatons,
            tarifs, conditions d&apos;adoption), mais ne saurait être tenue responsable des erreurs,
            omissions ou de l&apos;indisponibilité temporaire des informations. Les informations
            relatives à une portée ou un chaton sont susceptibles d&apos;évoluer rapidement compte
            tenu de la demande.
          </p>

          <h2>8. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers des sites tiers (réseaux sociaux notamment). La
            Chatterie des Vents d&apos;Automne n&apos;exerce aucun contrôle sur ces sites et décline
            toute responsabilité quant à leur contenu.
          </p>

          <h2>9. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. Pour toute question
            relative au site, vous pouvez nous contacter à l&apos;adresse{" "}
            <a href="mailto:ragdollamelie@gmail.com">ragdollamelie@gmail.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
