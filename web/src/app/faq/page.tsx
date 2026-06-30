import type { Metadata } from "next";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
  description:
    "Toutes les réponses à vos questions sur l'adoption d'un chaton Ragdoll : prix, conditions de départ, réservation, liste d'attente et garanties de santé.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
    description:
      "Toutes les réponses à vos questions sur l'adoption d'un chaton Ragdoll : prix, conditions de départ, réservation, liste d'attente et garanties de santé.",
    url: "/faq",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "Quel est le prix d'un chaton ?",
    answer:
      "Nos chatons Ragdoll sont proposés à un prix fixe de 2 000 €. Ce tarif couvre l'ensemble du travail de sélection mené sur la santé, le tempérament et la lignée derrière chaque chaton.",
  },
  {
    question: "À quel âge les chatons quittent-ils la chatterie ?",
    answer:
      "Les chatons partent à 4 mois, uniquement lorsqu'ils sont prêts : sevrage terminé, vaccinations à jour et identification effectuée.",
  },
  {
    question: "Quelles vaccinations et soins vétérinaires les chatons reçoivent-ils avant le départ ?",
    answer:
      "Chaque chaton reçoit la vaccination typhus/coryza/leucose avec rappel, des vermifuges et traitements antiparasitaires réguliers, ainsi qu'un certificat vétérinaire de bonne santé. Un vaccin antirabique est également réalisé en cas de départ à l'étranger.",
  },
  {
    question: "Les chatons sont-ils stérilisés avant leur départ ?",
    answer:
      "Oui, tous les chatons partent stérilisés (ou castrés), sauf départ en lignée de reproduction sous conditions spécifiques convenues à l'avance.",
  },
  {
    question: "Les chatons sont-ils identifiés et inscrits au LOOF ?",
    answer:
      "Chaque chaton est identifié par puce électronique (Thermochip, fichier iCAD) et inscrit au LOOF, avec un pedigree fourni ou en cours d'établissement à la remise du chaton.",
  },
  {
    question: "Comment réserver un chaton déjà né ?",
    answer:
      "La réservation d'un chaton né se fait avec un acompte de 25% du prix, déductible du montant total. Le solde est réglé au moment du départ du chaton.",
  },
  {
    question: "Comment s'inscrire sur la liste d'attente pour une future portée ?",
    answer:
      "L'inscription sur notre liste d'attente, en places limitées, se fait avec un acompte de 10% (200 €), également déductible du prix final. Vous pouvez indiquer vos préférences de sexe, de couleur (seal, blue, lilac, chocolate, cinnamon, fawn…) et de robe (mitted, bicolore, point, tabby, tortie…), et serez contacté en priorité à la naissance.",
  },
  {
    question: "Quelles garanties de santé pour les parents reproducteurs ?",
    answer:
      "Tous nos reproducteurs, sélectionnés en France et en Europe, sont testés négatifs aux maladies HCM, PKD, FIV et FeLV. Une copie des résultats des tests de santé des parents est remise à chaque adoptant.",
  },
  {
    question: "Que reçoit-on à l'adoption d'un chaton ?",
    answer:
      "En plus du chaton lui-même, vous recevez son carnet de santé, son pedigree LOOF (ou en cours), une copie des résultats de santé des parents, ainsi qu'un kit de bienvenue complet.",
  },
  {
    question: "Quel accompagnement après l'adoption ?",
    answer:
      "Nous proposons un accompagnement personnalisé avant, pendant et après l'adoption, avec un suivi disponible tout au long de la vie de votre chat si vous le souhaitez.",
  },
];

export default function FaqPage() {
  return (
    <section className="bg-cream-dark" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
      <div className="container">
        <p className="section-label" style={{ justifyContent: "center" }}>
          Questions fréquentes
        </p>
        <h1 className="title-hero" style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          <em>FAQ</em>
        </h1>
        <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
          Tout ce qu&apos;il faut savoir avant d&apos;adopter un chaton Ragdoll à La Chatterie des
          Vents d&apos;Automne.
        </p>

        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FaqAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
