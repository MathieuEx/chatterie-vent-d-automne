import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | La Chatterie des Vents d'Automne",
  description:
    "Politique de confidentialité de La Chatterie des Vents d'Automne : données collectées via le formulaire de contact, finalités, durée de conservation et droits RGPD.",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          Vos données, votre confiance
        </p>
        <h1 className="title-hero" style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          <em>Politique de confidentialité</em>
        </h1>

        <div className="legal-content" style={{ marginTop: "3rem" }}>
          <p className="legal-content__updated" style={{ textAlign: "center" }}>
            Dernière mise à jour : 30 juin 2026
          </p>

          <h2>1. Qui sommes-nous ?</h2>
          <p>
            La présente politique de confidentialité décrit la manière dont{" "}
            <strong>La Chatterie des Vents d&apos;Automne</strong> (201 Rte d&apos;Albi, 31200
            Toulouse, SIRET 949 671 440 00012), responsable du traitement, collecte et utilise les
            données personnelles transmises via le formulaire de contact de ce site, conformément
            au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et
            Libertés.
          </p>

          <h2>2. Données collectées</h2>
          <p>
            Le formulaire de contact du site (page « Contact ») collecte uniquement les données
            que vous saisissez volontairement :
          </p>
          <ul>
            <li>
              <strong>Nom</strong> — pour vous identifier et personnaliser notre réponse.
            </li>
            <li>
              <strong>Adresse email</strong> — pour pouvoir vous répondre.
            </li>
            <li>
              <strong>Message</strong> — le contenu de votre demande (question, demande de
              réservation, inscription en liste d&apos;attente, etc.).
            </li>
          </ul>
          <p>
            Un champ technique invisible (« honeypot ») est également présent dans le formulaire
            afin de détecter les soumissions automatisées (robots/spam) ; il ne collecte aucune
            donnée vous concernant et n&apos;est jamais affiché ni rempli par un visiteur humain.
          </p>
          <p>
            Aucune autre donnée n&apos;est collectée sur le site : nous n&apos;utilisons ni cookie
            de suivi, ni outil de mesure d&apos;audience, ni traceur publicitaire.
          </p>

          <h2>3. Finalité du traitement</h2>
          <p>
            Les données saisies dans le formulaire de contact sont utilisées exclusivement pour :
          </p>
          <ul>
            <li>répondre à votre demande d&apos;information ;</li>
            <li>traiter une demande de réservation ou d&apos;inscription en liste d&apos;attente ;</li>
            <li>assurer le suivi de la relation avec les futurs ou anciens adoptants.</li>
          </ul>
          <p>
            La base légale de ce traitement est l&apos;exécution de mesures précontractuelles
            prises à votre demande et, plus largement, notre intérêt légitime à répondre aux
            demandes qui nous sont adressées.
          </p>

          <h2>4. Destinataires des données</h2>
          <p>
            Lorsque vous soumettez le formulaire, vos données sont transmises par email à{" "}
            <strong>Amélie</strong>, gérante de La Chatterie des Vents d&apos;Automne, seule
            destinataire de vos messages. L&apos;envoi de cet email s&apos;appuie techniquement sur
            les services de messagerie <strong>Google (Gmail)</strong> et sur l&apos;hébergeur du
            site, <strong>Vercel Inc.</strong>, qui traite la requête le temps de l&apos;envoi sans
            conservation additionnelle de votre part. Vos données ne sont jamais vendues, louées,
            ni transmises à des tiers à des fins commerciales ou publicitaires.
          </p>

          <h2>5. Durée de conservation</h2>
          <p>
            Les données transmises via le formulaire de contact sont conservées dans la boîte
            email de La Chatterie des Vents d&apos;Automne le temps nécessaire au traitement de
            votre demande, et au maximum <strong>3 ans</strong> à compter du dernier contact, sauf
            si une relation contractuelle (réservation, adoption) se poursuit, auquel cas les
            données utiles au suivi de l&apos;animal et de l&apos;adoption peuvent être conservées
            plus longtemps, conformément aux obligations légales applicables à l&apos;activité
            d&apos;élevage félin (suivi LOOF, traçabilité sanitaire).
          </p>

          <h2>6. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
          <ul>
            <li>droit d&apos;accès et de rectification ;</li>
            <li>droit à l&apos;effacement (« droit à l&apos;oubli ») ;</li>
            <li>droit à la limitation du traitement ;</li>
            <li>droit d&apos;opposition ;</li>
            <li>droit à la portabilité de vos données.</li>
          </ul>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter à tout moment par email à{" "}
            <a href="mailto:ragdollamelie@gmail.com">ragdollamelie@gmail.com</a>, en précisant
            votre demande. Une réponse vous sera apportée dans un délai d&apos;un mois.
          </p>
          <p>
            Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous
            pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de
            l&apos;Informatique et des Libertés) :{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              www.cnil.fr
            </a>
            .
          </p>

          <h2>7. Sécurité</h2>
          <p>
            Le site est servi exclusivement en HTTPS. Les données saisies dans le formulaire de
            contact sont transmises de manière chiffrée et ne transitent par aucune base de
            données du site : elles sont directement envoyées par email, sans stockage côté
            serveur ni en base de données.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Ce site n&apos;utilise aucun cookie de mesure d&apos;audience, de profilage ou de
            publicité. Aucun consentement « cookies » n&apos;est donc requis pour naviguer sur le
            site.
          </p>

          <h2>9. Modification de cette politique</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour à tout moment, notamment pour
            se conformer à toute évolution réglementaire ou technique. La date de dernière mise à
            jour figure en haut de cette page.
          </p>
        </div>
      </div>
    </section>
  );
}
