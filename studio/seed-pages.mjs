/**
 * Pré-remplit les nouveaux documents "page" et les nouveaux champs de
 * `siteSettings` avec le contenu déjà affiché sur le site.
 *
 * Sans écrasement : `createIfNotExists` + `setIfMissing` — relancer le script
 * ne touche jamais à ce qui a été saisi dans le Studio.
 *
 *   node seed-pages.mjs
 */
import {readFileSync} from 'node:fs'
import {homedir} from 'node:os'

const PROJECT = 'mcvnhjxb'
const DATASET = 'production'
const token =
  process.env.SANITY_AUTH_TOKEN ??
  JSON.parse(readFileSync(`${homedir()}/.config/sanity/config.json`, 'utf8')).authToken

const documents = [
  {
    _id: 'catsPage',
    _type: 'catsPage',
    sectionLabel: 'Nos reproducteurs',
    titlePrefix: 'Nos',
    titleEmphasis: 'Chats',
    titleSuffix: 'Ragdoll',
    introText:
      'Nos reproducteurs Ragdoll, basés à Toulouse, sont sélectionnés pour leur santé, leur tempérament et la beauté de leur lignée.',
    malesTitle: 'Mâles',
    malesEmptyText: 'Aucun mâle référencé pour le moment.',
    femalesTitle: 'Femelles',
    femalesEmptyText: 'Aucune femelle référencée pour le moment.',
    seo: {
      metaTitle: "Nos Chats Ragdoll à Toulouse | La Chatterie des Vents d'Automne",
      metaDescription:
        'Découvrez nos chats reproducteurs Ragdoll à Toulouse, mâles et femelles, testés HCM, PKD, FIV et FeLV négatifs.',
    },
  },
  {
    _id: 'littersPage',
    _type: 'littersPage',
    sectionLabel: 'Disponibilités',
    titlePrefix: 'Nos',
    titleEmphasis: 'Chatons',
    titleSuffix: 'Ragdoll',
    introText:
      "Chatons Ragdoll disponibles à Toulouse, prix fixe de 2 000 € pour un chaton de compagnie. Départ à 4 mois, complet (vaccins, puce électronique iCAD, stérilisation, vermifuges, certificat vétérinaire, carnet de santé et pedigree LOOF), avec un accompagnement avant, pendant et après l'adoption.",
    emptyText:
      "Aucune portée annoncée pour le moment. Contactez-nous pour être informé(e) des prochaines naissances.",
    waitingListText: "Inscriptions sur liste d'attente ouvertes",
    seo: {
      metaTitle: "Chatons Ragdoll à Toulouse | La Chatterie des Vents d'Automne",
      metaDescription:
        'Découvrez les portées de chatons Ragdoll disponibles à Toulouse, dans le respect de la santé et du bien-être de nos chats.',
    },
  },
  {
    _id: 'contactPage',
    _type: 'contactPage',
    sectionLabel: 'Restons en contact',
    titleEmphasis: 'Contact',
    introText:
      "Une question sur nos chats Ragdoll à Toulouse, une portée à venir, ou envie de rejoindre la liste d'attente ? Écrivez-nous.",
    termsTitle: "Modalités d'adoption",
    submitLabel: 'Envoyer le message',
    successMessage: 'Merci, nous vous répondrons rapidement.',
    errorMessage:
      "Une erreur est survenue et votre message n'est pas parti. Merci de nous écrire directement :",
    seo: {
      metaTitle: "Contact | La Chatterie des Vents d'Automne - Ragdoll Toulouse",
      metaDescription:
        "Contactez La Chatterie des Vents d'Automne, élevage de Ragdoll à Toulouse, pour toute question ou réservation.",
    },
  },
  {
    _id: 'mentionsLegales',
    _type: 'legalPage',
    title: 'Mentions légales',
    sectionLabel: 'Informations légales',
    updatedAt: '2026-06-30',
  },
  {
    _id: 'politiqueConfidentialite',
    _type: 'legalPage',
    title: 'Politique de confidentialité',
    sectionLabel: 'Vos données',
    updatedAt: '2026-06-30',
  },
]

/** Nouveaux champs de siteSettings, alignés sur ce qu'affiche le site. */
const siteSettingsFields = {
  siteName: "La Chatterie des Vents d'Automne",
  tagline: 'Élevage familial de chats Ragdoll à Toulouse',
  email: 'ragdollamelie@gmail.com',
  phoneDisplay: '07 82 18 77 84',
  phone: '+33782187784',
  address: {
    streetAddress: "201 Rte d'Albi",
    postalCode: '31200',
    addressLocality: 'Toulouse',
    addressCountry: 'FR',
  },
  socialLinks: [
    {
      _key: 'instagram',
      label: '@ragdoll_des_vents_dautomne',
      url: 'https://www.instagram.com/ragdoll_des_vents_dautomne',
    },
  ],
  pricing: {
    kittenPrice: 2000,
    depositReservation: "25 % (déductible) à la réservation d'un chaton né",
    depositWaitingList: '10 % (200 €, déductible)',
  },
  legal: {
    siret: 'SIRET 94967144000012',
    loofAffix: 'Affixe LOOF n°37170',
    acaced: 'ACACED 2022',
    mediator: 'MEDIAVET',
  },
  footerNavTitle: 'Navigation',
  footerContactTitle: 'Contact',
  footerLegalTitle: 'Légal',
  defaultSeo: {
    metaTitle: "La Chatterie des Vents d'Automne | Élevage Ragdoll à Toulouse",
    metaDescription:
      'Élevage familial de chats Ragdoll à Toulouse. Chatons élevés en famille, santé testée, suivi vétérinaire complet et pedigree LOOF.',
  },
}

const mutations = [
  ...documents.map((doc) => ({createIfNotExists: doc})),
  {patch: {id: 'siteSettings', setIfMissing: siteSettingsFields}},
]

const res = await fetch(
  `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}?returnIds=true`,
  {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body: JSON.stringify({mutations}),
  },
)

const json = await res.json()
if (!res.ok) {
  console.error('Échec :', JSON.stringify(json, null, 2))
  process.exit(1)
}
console.log('OK —', json.results.map((r) => `${r.id} (${r.operation})`).join(', '))
