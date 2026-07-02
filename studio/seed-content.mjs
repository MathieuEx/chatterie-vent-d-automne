// Script one-off : pousse le contenu éditorial actuel (codé en dur dans le front)
// vers Sanity, pour que rien ne disparaisse au moment du branchement du CMS.
//
// Exécution (depuis studio/) : npx sanity exec seed-content.mjs --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    badge: 'Toulouse · Ragdoll',
    titlePrefix: 'La Chatterie des',
    titleEmphasis: "Vents d'Automne",
    description:
      "Élevage familial passionné à Toulouse, dédié aux chats Ragdoll. Des chatons choyés, en parfaite santé, élevés sous le pied de la maison.",
    ctaPrimaryLabel: 'Voir nos chatons disponibles',
    ctaSecondaryLabel: 'Nous contacter →',
    stats: [
      {_type: 'object', _key: 's1', value: '3 ans', label: "d'expérience"},
      {_type: 'object', _key: 's2', value: '33', label: 'chatons adoptés'},
      {_type: 'object', _key: 's3', value: '5/5', label: 'Google'},
      {_type: 'object', _key: 's4', value: '4.7/5', label: 'Facebook'},
    ],
  },
  about: {
    sectionLabel: 'Notre histoire',
    titlePrefix: "Une passion née d'",
    titleEmphasis: 'un coup de cœur',
    paragraphs: [
      "Mon histoire avec le Ragdoll a commencé bien avant la création de la chatterie. Plus jeune, j'ai eu la chance d'accueillir, avec ma famille, un chat qui ressemblait beaucoup à cette race — j'ai immédiatement été touchée par sa douceur, son regard et son pelage mi-long aux nuances seal si particulières. Quelques années plus tard, lors de mon installation à Toulouse pour mes études, ce rêve est devenu réalité, puis une évidence : la naissance de la Chatterie des Vents d'Automne.",
      "Aujourd'hui, nos chats et chatons vivent sous le pied de la maison, sociabilisés dès la naissance aux bruits du quotidien, aux autres chats et à Victor, notre petit chien. Cette proximité façonne le tempérament doux et affectueux qui caractérise nos Ragdolls.",
    ],
    badgeNumber: '3',
    badgeText: "ans d'élevage passionné",
    values: [
      {
        _type: 'object',
        _key: 'v1',
        title: 'Tempérament',
        description:
          "Nos chatons grandissent au cœur du foyer, sociabilisés aux bruits du quotidien, aux autres chats et à Victor, notre petit chien. Un tempérament si proche de l'humain qu'on parle souvent de « chat-chien ».",
      },
      {
        _type: 'object',
        _key: 'v2',
        title: 'Santé avant tout',
        description:
          "Parents sélectionnés dans toute l'Europe, testés négatifs HCM, PKD, FIV et FeLV. Suivi vétérinaire complet : vaccins, vermifuges, puce et stérilisation précoce.",
      },
      {
        _type: 'object',
        _key: 'v3',
        title: 'Lignée & beauté',
        description:
          "Origines françaises, polonaises et néerlandaises pour préserver le standard de la race, avec des robes traditionnelles et des teintes précieuses.",
      },
    ],
  },
  catsSection: {
    sectionLabel: 'Nos reproducteurs',
    titlePrefix: 'Des parents',
    titleEmphasis: 'sélectionnés avec soin',
    description:
      'Tous nos reproducteurs sont testés HCM, PKD, FIV et FeLV négatifs avant toute reproduction.',
  },
  standardsSection: {
    sectionLabel: 'Nos engagements qualité',
    titlePrefix: 'Un élevage',
    titleEmphasis: 'encadré et transparent',
    standards: [
      {
        _type: 'object',
        _key: 'st1',
        title: 'Bien être animal avant tout',
        description:
          'Nos chatons grandissent en liberté au sein de notre foyer, socialisés dès le plus jeune âge avec nos différents Ragdoll et notre chien.',
      },
      {
        _type: 'object',
        _key: 'st2',
        title: 'Suivi vétérinaire vigoureux',
        description:
          'Vaccinations pour typhus, coryza et leucose. Tests FIV, FeLV, ADN, HCM et PKD systématiques sur tous nos reproducteurs.',
      },
      {
        _type: 'object',
        _key: 'st3',
        title: 'Pedigree LOOF',
        description: 'Chaque chaton part avec son pedigree LOOF et son certificat vétérinaire.',
      },
      {
        _type: 'object',
        _key: 'st4',
        title: 'Médiation indépendante',
        description: 'En cas de litige, un médiateur agréé (MEDIAVET) est à votre disposition.',
      },
      {
        _type: 'object',
        _key: 'st5',
        title: 'Accompagnement personnalisé',
        description: 'Nous restons disponibles tout au long de la vie de votre chat pour répondre à vos questions.',
      },
    ],
    cardTitle: 'Certifications',
    cardSubtitle: 'Un élevage déclaré et encadré',
    certifications: [
      {_type: 'object', _key: 'c1', icon: '🎓', name: 'ACACED', detail: 'Obtenu en 2022', accent: 'blue'},
      {
        _type: 'object',
        _key: 'c2',
        icon: '🌾',
        name: "Chambre d'Agriculture",
        detail: 'Inscrite depuis 2023',
        accent: 'sage',
      },
      {_type: 'object', _key: 'c3', icon: '🐾', name: 'Affixe LOOF', detail: 'n°37170', accent: 'rose'},
    ],
  },
  adoptionSection: {
    sectionLabel: 'Adoption',
    titlePrefix: 'Le',
    titleEmphasis: 'parcours pour accueillir votre chaton',
    steps: [
      {
        _type: 'object',
        _key: 'p1',
        title: 'Premier contact',
        description: 'Vous nous écrivez pour échanger sur vos attentes et découvrir nos chats.',
      },
      {
        _type: 'object',
        _key: 'p2',
        title: "Liste d'attente",
        description: "Inscription avec un acompte de 200 € (10%) pour réserver votre place.",
      },
      {
        _type: 'object',
        _key: 'p3',
        title: 'Réservation',
        description: "À la naissance, un acompte de 25% confirme la réservation de votre chaton.",
      },
      {
        _type: 'object',
        _key: 'p4',
        title: 'Départ à 4 mois',
        description:
          "Vaccins (typhus, coryza, rappel ; rage si départ à l'étranger), puce électronique iCAD, stérilisation, vermifuges, certificat vétérinaire, carnet de santé et pedigree LOOF inclus. Accompagnement personnalisé avant, pendant et après l'adoption.",
      },
    ],
  },
  testimonialsSection: {
    sectionLabel: 'Avis de nos familles',
    titlePrefix: 'Ce qu\'ils disent de',
    titleEmphasis: 'nous',
  },
  gallerySection: {
    sectionLabel: 'En images',
    titlePrefix: 'La vie de nos',
    titleEmphasis: 'chatons',
    emptyStateText: 'Galerie à venir — les premières photos seront ajoutées dès la prochaine portée.',
  },
  latestLitterSection: {
    sectionLabel: 'Dernière portée',
    titlePrefix: 'Découvrez nos',
    titleEmphasis: 'derniers chatons',
  },
}

const faqPage = {
  _id: 'faqPage',
  _type: 'faqPage',
  sectionLabel: 'Questions fréquentes',
  introText:
    "Tout ce qu'il faut savoir avant d'adopter un chaton Ragdoll à La Chatterie des Vents d'Automne.",
  items: [
    {
      _type: 'object',
      _key: 'q1',
      question: "Quel est le prix d'un chaton ?",
      answer:
        "Nos chatons Ragdoll sont proposés à un prix fixe de 2 000 €. Ce tarif couvre l'ensemble du travail de sélection mené sur la santé, le tempérament et la lignée derrière chaque chaton.",
    },
    {
      _type: 'object',
      _key: 'q2',
      question: 'À quel âge les chatons quittent-ils la chatterie ?',
      answer:
        'Les chatons partent à 4 mois, uniquement lorsqu\'ils sont prêts : sevrage terminé, vaccinations à jour et identification effectuée.',
    },
    {
      _type: 'object',
      _key: 'q3',
      question: 'Quelles vaccinations et soins vétérinaires les chatons reçoivent-ils avant le départ ?',
      answer:
        "Chaque chaton reçoit la vaccination typhus/coryza/leucose avec rappel, des vermifuges et traitements antiparasitaires réguliers, ainsi qu'un certificat vétérinaire de bonne santé. Un vaccin antirabique est également réalisé en cas de départ à l'étranger.",
    },
    {
      _type: 'object',
      _key: 'q4',
      question: 'Les chatons sont-ils stérilisés avant leur départ ?',
      answer:
        'Oui, tous les chatons partent stérilisés (ou castrés), sauf départ en lignée de reproduction sous conditions spécifiques convenues à l\'avance.',
    },
    {
      _type: 'object',
      _key: 'q5',
      question: 'Les chatons sont-ils identifiés et inscrits au LOOF ?',
      answer:
        "Chaque chaton est identifié par puce électronique (Thermochip, fichier iCAD) et inscrit au LOOF, avec un pedigree fourni ou en cours d'établissement à la remise du chaton.",
    },
    {
      _type: 'object',
      _key: 'q6',
      question: 'Comment réserver un chaton déjà né ?',
      answer:
        'La réservation d\'un chaton né se fait avec un acompte de 25% du prix, déductible du montant total. Le solde est réglé au moment du départ du chaton.',
    },
    {
      _type: 'object',
      _key: 'q7',
      question: "Comment s'inscrire sur la liste d'attente pour une future portée ?",
      answer:
        "L'inscription sur notre liste d'attente, en places limitées, se fait avec un acompte de 10% (200 €), également déductible du prix final. Vous pouvez indiquer vos préférences de sexe, de couleur (seal, blue, lilac, chocolate, cinnamon, fawn…) et de robe (mitted, bicolore, point, tabby, tortie…), et serez contacté en priorité à la naissance.",
    },
    {
      _type: 'object',
      _key: 'q8',
      question: 'Quelles garanties de santé pour les parents reproducteurs ?',
      answer:
        'Tous nos reproducteurs, sélectionnés en France et en Europe, sont testés négatifs aux maladies HCM, PKD, FIV et FeLV. Une copie des résultats des tests de santé des parents est remise à chaque adoptant.',
    },
    {
      _type: 'object',
      _key: 'q9',
      question: "Que reçoit-on à l'adoption d'un chaton ?",
      answer:
        "En plus du chaton lui-même, vous recevez son carnet de santé, son pedigree LOOF (ou en cours), une copie des résultats de santé des parents, ainsi qu'un kit de bienvenue complet.",
    },
    {
      _type: 'object',
      _key: 'q10',
      question: "Quel accompagnement après l'adoption ?",
      answer:
        "Nous proposons un accompagnement personnalisé avant, pendant et après l'adoption, avec un suivi disponible tout au long de la vie de votre chat si vous le souhaitez.",
    },
  ],
}

const siteSettingsPatch = {
  footerTagline: 'Élevage familial de chats Ragdoll à Toulouse, dans le respect de la santé et du bien-être de nos chats.',
}

async function run() {
  await client.createOrReplace(homePage)
  console.log('✔ homePage créé/mis à jour')

  await client.createOrReplace(faqPage)
  console.log('✔ faqPage créé/mis à jour')

  await client
    .patch('siteSettings')
    .setIfMissing(siteSettingsPatch)
    .commit({autoGenerateArrayKeys: true})
    .catch(async (err) => {
      if (err?.statusCode === 404) {
        await client.createOrReplace({_id: 'siteSettings', _type: 'siteSettings', ...siteSettingsPatch})
      } else {
        throw err
      }
    })
  console.log('✔ siteSettings mis à jour (footerTagline)')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
