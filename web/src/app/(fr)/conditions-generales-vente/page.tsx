import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getLegalPage } from "@/lib/sanity/queries";

const FALLBACK_TITLE =
  "Conditions générales de vente | La Chatterie des Vents d'Automne - Ragdoll Toulouse";
const FALLBACK_DESCRIPTION =
  "Conditions générales de vente de La Chatterie des Vents d'Automne : réservation, acompte, remboursement, remise du chaton et garanties.";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("conditionsGeneralesVente");
  return {
    title: page?.seo?.metaTitle || FALLBACK_TITLE,
    description: page?.seo?.metaDescription || FALLBACK_DESCRIPTION,
    alternates: { canonical: "/conditions-generales-vente" },
    robots: { index: false, follow: true },
  };
}

export default async function ConditionsGeneralesVentePage() {
  const page = await getLegalPage("conditionsGeneralesVente");

  // Dès qu'Amélie écrit quelque chose dans le Studio, son texte remplace
  // le texte de référence ci-dessous — qui reste le filet de sécurité.
  if (page?.body?.length) {
    return (
      <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
        <div className="container">
          {page.sectionLabel && (
            <p className="section-label" style={{ justifyContent: "center" }}>
              {page.sectionLabel}
            </p>
          )}
          <h1
            className="title-hero"
            style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            <em>{page.title}</em>
          </h1>
          <div className="legal-content" style={{ marginTop: "3rem" }}>
            {page.updatedAt && (
              <p className="legal-content__updated" style={{ textAlign: "center" }}>
                Dernière mise à jour :{" "}
                {new Intl.DateTimeFormat("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(page.updatedAt))}
              </p>
            )}
            <PortableText value={page.body} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          Réservation, acompte et remboursement
        </p>
        <h1
          className="title-hero"
          style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
        >
          <em>Conditions générales de vente</em>
        </h1>

        <div className="legal-content" style={{ marginTop: "3rem" }}>
          <p className="legal-content__updated" style={{ textAlign: "center" }}>
            Dernière mise à jour : 21 septembre 2026
          </p>

          <h2>1. Champ d&apos;application</h2>
          <p>
            Les présentes conditions générales de vente (CGV) régissent la cession, à titre
            onéreux, des chatons de race Ragdoll proposés par{" "}
            <strong>La Chatterie des Vents d&apos;Automne</strong> (201 Rte d&apos;Albi, 31200
            Toulouse, SIRET 949 671 440 00012, affixe LOOF n°37170), ci-après « l&apos;éleveuse »,
            à toute personne physique non professionnelle, ci-après « l&apos;adoptant ». Toute
            demande de réservation, par le formulaire de contact du site ou par tout autre moyen,
            implique l&apos;acceptation sans réserve des présentes CGV.
          </p>

          <h2>2. Chatons proposés</h2>
          <p>
            Les chatons sont des chats de race Ragdoll inscrits ou inscriptibles au LOOF (Livre
            Officiel des Origines Félines), issus de reproducteurs testés (cardiomyopathie
            hypertrophique, polykystose rénale, FIV, FeLV selon les portées). Les fiches de portée
            publiées sur le site (sexe, couleur, disponibilité) sont mises à jour aussi souvent que
            possible mais n&apos;ont pas de valeur contractuelle tant qu&apos;aucun acompte
            n&apos;a été versé : la disponibilité effective d&apos;un chaton est confirmée au
            moment de la réservation.
          </p>

          <h2>3. Prix</h2>
          <p>
            Le prix d&apos;un chaton est celui affiché sur la fiche de la portée concernée ou
            communiqué par l&apos;éleveuse au moment de la demande (à titre indicatif, tarif fixe
            de 2 000 € pour un chaton de compagnie, hors chaton reproducteur ou d&apos;exposition
            dont le tarif est convenu séparément). Ce prix inclut le chaton complet : vaccination,
            identification par puce électronique (i-CAD), stérilisation, vermifugation, certificat
            vétérinaire, carnet de santé et pedigree LOOF (ou dossier d&apos;inscription en cours).
          </p>

          <h2>4. Réservation et acompte</h2>
          <p>
            La réservation d&apos;un chaton déjà né est confirmée par le versement d&apos;un
            acompte égal à <strong>25 % du prix</strong>, déductible du solde à régler lors de la
            remise du chaton. L&apos;inscription sur liste d&apos;attente pour une portée à venir
            peut être confirmée par un acompte de <strong>10 % (soit 200 €)</strong>, également
            déductible du prix final. Le solde est réglé le jour de la remise du chaton, selon les
            modalités de paiement convenues avec l&apos;éleveuse.
          </p>
          <p>
            Le versement de l&apos;acompte vaut engagement ferme des deux parties sur la cession
            du chaton concerné (ou, en liste d&apos;attente, sur la priorité d&apos;attribution
            d&apos;un chaton de la portée à venir).
          </p>

          <h2>5. Annulation et remboursement</h2>
          <p>
            <strong>Si l&apos;adoptant renonce</strong> à l&apos;adoption après le versement de
            l&apos;acompte, celui-ci reste acquis à l&apos;éleveuse à titre de dédommagement pour
            l&apos;immobilisation du chaton, sauf accord amiable contraire trouvé entre les
            parties (par exemple un report sur un autre chaton disponible).
          </p>
          <p>
            <strong>Si l&apos;éleveuse n&apos;est pas en mesure de livrer</strong> le chaton
            réservé (problème de santé constaté avant la cession, décès, portée finalement non
            menée à terme, etc.), l&apos;acompte est intégralement remboursé à l&apos;adoptant
            dans un délai de 14 jours, ou reporté sur un autre chaton disponible ou une prochaine
            portée si l&apos;adoptant le préfère.
          </p>
          <p>
            En cas de report de la date de remise à l&apos;initiative de l&apos;une des parties
            pour un motif légitime (raison sanitaire, retard de croissance du chaton, empêchement
            de l&apos;adoptant), une nouvelle date est fixée d&apos;un commun accord sans remise en
            cause de la réservation ni de l&apos;acompte versé.
          </p>

          <h2>6. Remise du chaton</h2>
          <p>
            Conformément à l&apos;article L. 214-8 du Code rural et de la pêche maritime, aucun
            chaton n&apos;est cédé avant l&apos;âge de huit semaines ; en pratique, les chatons de
            La Chatterie des Vents d&apos;Automne partent à l&apos;âge d&apos;environ quatre mois,
            une fois complets sur le plan sanitaire. La remise a lieu en main propre, au domicile de
            l&apos;éleveuse ou en un lieu convenu, contre règlement du solde et signature du
            certificat de cession.
          </p>
          <p>
            Avant toute remise, l&apos;adoptant signe un{" "}
            <strong>certificat d&apos;engagement et de connaissance</strong> relatif aux besoins et
            contraintes de l&apos;espèce féline, conformément à l&apos;article L. 214-8 du Code
            rural et de la pêche maritime. Lorsque la réservation résulte d&apos;un échange à
            distance (site internet, téléphone), un délai de réflexion d&apos;au moins sept jours
            est respecté entre la signature de ce certificat et la remise effective du chaton — délai
            naturellement couvert par le temps de croissance du chaton jusqu&apos;à son départ.
          </p>

          <h2>7. Droit de rétractation</h2>
          <p>
            La cession étant finalisée par une remise en main propre du chaton, en présence
            physique et simultanée des deux parties, elle ne constitue pas un contrat conclu «
            à distance » au sens des articles L. 221-18 et suivants du Code de la consommation :
            le délai légal de rétractation de 14 jours applicable aux ventes à distance ne
            s&apos;applique donc pas à la vente d&apos;un chaton par La Chatterie des Vents
            d&apos;Automne. Les modalités d&apos;annulation applicables sont celles décrites à
            l&apos;article 5 ci-dessus.
          </p>

          <h2>8. Garanties</h2>
          <p>
            Le chaton est cédé accompagné d&apos;un certificat vétérinaire de bonne santé établi
            avant son départ. L&apos;adoptant bénéficie de la garantie légale contre les vices
            rédhibitoires prévue aux articles L. 213-1 à L. 213-5 du Code rural et de la pêche
            maritime, dont la liste et les délais de recours applicables à l&apos;espèce féline
            sont fixés par arrêté ministériel. Toute réclamation à ce titre doit être accompagnée
            d&apos;un certificat vétérinaire précisant la nature de l&apos;affection constatée et
            adressée à l&apos;éleveuse dans les délais légaux.
          </p>
          <p>
            En complément de cette garantie légale, l&apos;éleveuse s&apos;engage à accompagner
            l&apos;adoptant avant, pendant et après l&apos;adoption (conseils d&apos;alimentation,
            d&apos;éducation et de suivi vétérinaire) et reste joignable en cas de question ou de
            difficulté.
          </p>

          <h2>9. Médiation</h2>
          <p>
            Conformément au Code de la consommation, en cas de litige non résolu directement avec
            l&apos;éleveuse, l&apos;adoptant peut recourir gratuitement au service de médiation de
            la consommation <strong>MEDIAVET</strong>, auprès duquel La Chatterie des Vents
            d&apos;Automne est inscrite.
          </p>

          <h2>10. Droit applicable</h2>
          <p>
            Les présentes conditions générales de vente sont soumises au droit français. Pour
            toute question, l&apos;adoptant peut contacter l&apos;éleveuse à l&apos;adresse{" "}
            <a href="mailto:ragdollamelie@gmail.com">ragdollamelie@gmail.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
