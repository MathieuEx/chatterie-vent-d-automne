/**
 * Remplit la version anglaise des documents Sanity.
 *
 * Écrit avec `setIfMissing` sur l'objet `en` entier : relancer le script ne
 * touche jamais à une traduction déjà relue ou corrigée dans le Studio.
 *
 *   node seed-translations.mjs
 */
import {readFileSync} from 'node:fs'
import {homedir} from 'node:os'

const PROJECT = 'mcvnhjxb'
const DATASET = 'production'
const token =
  process.env.SANITY_AUTH_TOKEN ??
  JSON.parse(readFileSync(`${homedir()}/.config/sanity/config.json`, 'utf8')).authToken

// ── Page d'accueil ──────────────────────────────────────────────
const homePageEn = {
  hero: {
    badge: 'Toulouse · Ragdoll & Cherubim',
    titlePrefix: 'La Chatterie des',
    titleEmphasis: "Vents d'Automne",
    description:
      'A devoted family cattery in Toulouse, France, dedicated to Ragdoll and Cherubim cats. Cherished, perfectly healthy cats and kittens, raised in the heart of our home.',
    ctaPrimaryLabel: 'See our available kittens',
    ctaSecondaryLabel: 'Get in touch →',
    stats: [
      {_key: 's1', _type: 'object', value: '4 years', label: 'of experience'},
      {_key: 's2', _type: 'object', value: '39', label: 'kittens adopted'},
      {_key: 's3', _type: 'object', value: '5/5', label: 'Google'},
      {_key: 's4', _type: 'object', value: '4.6/5', label: 'Facebook'},
    ],
  },

  about: {
    sectionLabel: 'Our story',
    titlePrefix: 'A passion born of ',
    titleEmphasis: 'love at first sight',
    badgeNumber: '4',
    badgeText: 'years of devoted breeding',
    paragraphs: [
      "My story with the Ragdoll began long before La Chatterie des Vents d'Automne existed.\n\nWhen I was younger, my family and I were lucky enough to welcome a cat who looked remarkably like a Ragdoll. I was immediately struck by his gentleness, that very particular gaze, and his beautiful semi-long coat in a superb seal point. That meeting sparked a genuine attachment to the breed.\n\nA few years later, when I moved to Toulouse for my studies, I was finally able to make that dream come true and welcome my first Ragdoll.\n\nOver time, my passion only grew. I naturally became interested in selection, genetics, and the health and wellbeing of cats, before training more deeply and seriously as a breeder.\n\nThe wish to pass on my vision — to raise balanced, beautiful, thoroughly socialised kittens while respecting the breed and its qualities — soon became self-evident.\n\nAnd so La Chatterie des Vents d'Automne was born.",
      'Today our cats and kittens live at the heart of our home, socialised from birth to everyday sounds, to other cats, and to Victor, our little dog. That closeness shapes the gentle, affectionate temperament our Ragdolls are known for.',
    ],
    values: [
      {
        _key: 'v1',
        _type: 'object',
        title: 'Temperament',
        description:
          'Our kittens grow up in the middle of family life, socialised to everyday sounds, to other cats, and to Victor, our little dog. Their temperament is so close to people that they are often called "dog-like cats".',
      },
      {
        _key: 'v2',
        _type: 'object',
        title: 'Health first',
        description:
          'Health sits at the heart of our selection. Our breeding cats are rigorously screened for HCM, PKD, FIV and FeLV, and receive regular veterinary follow-up. Every kitten is given complete, attentive care so it can grow up in the best possible conditions.',
      },
      {
        _key: 'v3',
        _type: 'object',
        title: 'Bloodline & beauty',
        description:
          'Exceptional European bloodlines\n\nOur breeding cats come from carefully chosen lines, sourced from respected catteries in France and across Europe — notably in Poland, Austria and the Netherlands.\n\nThis diversity of origins lets us mix bloodlines, preserve a rich genetic heritage and limit inbreeding, while selecting rare coats and colours with a demanding eye and in keeping with the Ragdoll standard.',
      },
    ],
  },

  catsSection: {
    sectionLabel: 'Our breeding cats',
    titlePrefix: 'Parents',
    titleEmphasis: 'chosen with care',
    description:
      'All our breeding cats test negative for HCM, PKD, FIV and FeLV before any mating.',
  },

  standardsSection: {
    sectionLabel: 'Our quality commitments',
    titlePrefix: 'A cattery that is',
    titleEmphasis: 'regulated and transparent',
    cardTitle: 'Certifications',
    cardSubtitle: 'A registered and regulated cattery',
    certifications: [
      {
        _key: 'c1',
        _type: 'object',
        icon: '🎓',
        name: 'ACACED',
        detail: 'Obtained in 2022',
        accent: 'blue',
      },
      {
        _key: 'c2',
        _type: 'object',
        icon: '🌾',
        name: 'Chamber of Agriculture',
        detail: 'Registered since 2023',
        accent: 'sage',
      },
      {
        _key: 'c3',
        _type: 'object',
        icon: '🐾',
        name: 'LOOF affix',
        detail: 'no. 37170',
        accent: 'rose',
      },
    ],
    standards: [
      {
        _key: 'st1',
        _type: 'object',
        title: 'Animal wellbeing above all',
        description:
          'Our kittens grow up freely within our home, socialised from the earliest age with our various Ragdolls and our dog.',
      },
      {
        _key: 'st2',
        _type: 'object',
        title: 'Rigorous veterinary follow-up',
        description:
          'Vaccination against feline panleukopenia, cat flu and leukaemia. FIV, FeLV, DNA, HCM and PKD testing as standard on all our breeding cats.',
      },
      {
        _key: 'st3',
        _type: 'object',
        title: 'LOOF pedigree',
        description:
          'Every kitten leaves with its LOOF pedigree (the French feline studbook) and its veterinary certificate.',
      },
      {
        _key: 'st4',
        _type: 'object',
        title: 'Independent mediation',
        description:
          'Should a dispute arise, an approved mediator (MEDIAVET) is at your disposal.',
      },
      {
        _key: 'st5',
        _type: 'object',
        title: 'Personal guidance',
        description:
          'We remain available throughout your cat’s life to answer your questions.',
      },
    ],
  },

  adoptionSection: {
    sectionLabel: 'Adoption',
    titlePrefix: 'The journey',
    titleEmphasis: 'to welcoming your kitten',
    steps: [
      {
        _key: 'p1',
        _type: 'object',
        title: 'First contact',
        description:
          'You write to us so we can talk through what you are looking for and introduce you to our cats.',
      },
      {
        _key: 'p2',
        _type: 'object',
        title: 'Waiting list',
        description: 'Registration with a €200 deposit to reserve your place.',
      },
      {
        _key: 'p3',
        _type: 'object',
        title: 'Reservation',
        description:
          'Once the kittens are born, a 25% deposit confirms your kitten’s reservation.',
      },
      {
        _key: 'p4',
        _type: 'object',
        title: 'Departure at 4 months',
        description:
          'Vaccinations (panleukopenia, cat flu and booster; rabies if travelling abroad), i-CAD microchip, neutering, worming, veterinary certificate, health record and LOOF pedigree all included. Personal guidance before, during and after the adoption.',
      },
    ],
  },

  testimonialsSection: {
    sectionLabel: 'What our families say',
    titlePrefix: 'What they say',
    titleEmphasis: 'about us',
  },

  gallerySection: {
    sectionLabel: 'In pictures',
    titlePrefix: 'Life with our',
    titleEmphasis: 'kittens',
    emptyStateText: 'Gallery coming soon — the first photos will be added with the next litter.',
  },

  latestLitterSection: {
    sectionLabel: 'Latest litter',
    titlePrefix: 'Discover our',
    titleEmphasis: 'newest kittens',
  },
}

// ── FAQ ─────────────────────────────────────────────────────────
const faqItemsEn = [
  {
    question: "How much does a kitten from La Chatterie des Vents d'Automne cost?",
    answer:
      'Our traditional Ragdoll kittens intended as companions are offered at a single price of €2,000.\nOur Cherubim Ragdoll kittens (mink, sepia and solid) are offered at a single price of €2,200.\n\nThis price reflects a breeding philosophy built on excellence rather than quantity. It covers substantial work on genetic selection, the careful choice of bloodlines, health screening of the breeding cats, daily socialisation within our family, and guidance before, during and after the adoption. Our priority is to raise balanced companions in perfect health, true to the exceptional temperament of the Ragdoll and the Cherubim.',
  },
  {
    question: 'When can I welcome my kitten?',
    answer:
      'Our kittens never leave on the basis of age alone, but above all on their maturity. As a rule, they join their family from 14 weeks, once we judge them fully ready both physically and behaviourally. That extra time at the cattery allows them to become balanced, well-socialised and settled companions.',
  },
  {
    question: 'How are the kittens prepared before they leave?',
    answer:
      'Before joining their family, each of our kittens receives complete veterinary follow-up so they can leave in the best possible condition.\n\nThey are identified with a thermochip microchip, vaccinated against panleukopenia, cat flu and leukaemia (initial course and booster), wormed regularly, and given a full clinical examination by our vet before departure, with a certificate of good health issued.\n\nTheir parents, our breeding cats, are also rigorously selected and tested for the main genetic diseases of the breed, so that every family receives a healthy companion.\n\nAll health documents, along with the guidance you need to welcome your kitten properly, are handed over on the day it leaves.',
  },
  {
    question: 'Are the kittens neutered before they leave?',
    answer:
      "Yes. All our kittens intended as companions leave La Chatterie des Vents d'Automne neutered — an ovariectomy for females, castration for males.\n\nThis is part of our commitment to a responsible departure and to protecting the long-term wellbeing and health of our kittens.\n\nKittens destined to join a breeding programme may however be subject to specific conditions, agreed in advance with registered breeders and within a considered breeding project approved by the cattery.",
  },
  {
    question: 'Are the kittens microchipped and registered with the LOOF?',
    answer:
      "Yes. Every kitten leaving La Chatterie des Vents d'Automne is individually identified with a Thermochip microchip, registered with i-CAD (the French national pet identification database).\n\nOur kittens are also registered with the LOOF, the French feline studbook. Their pedigree is handed over with the departure documents when it has already been issued. If it is still being processed at the time of departure, it is sent to the adopting family as soon as it arrives.\n\nAll the administrative steps relating to identification and LOOF registration are handled with the same care we give to the health, wellbeing and follow-up of every kitten.",
  },
  {
    question: 'How do I reserve a kitten that has already been born?',
    answer:
      "When a kitten has already been born and is available to reserve, the adoption can be confirmed by paying a deposit of 25% of the total price.\n\nThis deposit is deducted from the kitten's final price, with the balance settled when it leaves for its new family.\n\nThe reservation is formalised by a reservation contract setting out the terms of sale and the respective commitments of La Chatterie des Vents d'Automne and the adopting family.\n\nEvery reservation is therefore framed clearly and transparently, so the adoption goes as smoothly as possible for the kitten and for its future family.",
  },
  {
    question: 'How do I join the waiting list for a future litter?',
    answer:
      'We deliberately keep our waiting lists small, so that we can guide each family personally and stay true to the cattery’s planned litters.\n\nRegistration is confirmed by a €200 deposit, deducted from the final amount when the kitten is reserved.\n\nWhen you register, you can tell us your preferences regarding:\n\n* sex;\n* colour: seal, blue, lilac, chocolate, cinnamon, fawn…;\n* coat pattern: mitted, bicolour, point, tabby, tortie…;\n* coat intensity: traditional Ragdoll, Cherubim Mink or Cherubim Solid.\n\nWhen the kittens are born, registered families are contacted in waiting-list order and according to their wishes, so they have first refusal on the kittens that match what they are looking for.\n\nWe take the time to talk with every family and help you find the companion that best suits your expectations, while respecting our breeding choices and the wellbeing of each kitten.',
  },
  {
    question: 'What guarantees are there regarding the kittens’ health?',
    answer:
      'Health is one of the founding pillars of our selection work.\n\nOur breeding cats are chosen to demanding standards in France and across Europe, notably in Austria, the Netherlands and Poland. They receive rigorous health monitoring and are tested for the main infectious and hereditary diseases found in cats — in particular HCM, PKD, FIV and FeLV — through tests carried out by the Genindexe laboratory and by qualified vets.\n\nSince 2026 we have further strengthened our approach with the MyCatDNA™ genetic panel, which screens more than 45 genetic diseases as well as blood group, genetic diversity and many characteristics linked to a cat’s genetic heritage.\n\nThe kittens also undergo parentage analysis at the Genindexe laboratory, scientifically confirming their relationship to the declared parents. This ensures rigorous traceability for every birth and establishes each kitten’s individual genetic status for the diseases studied.\n\nThe results of the examinations and health tests carried out on the parents, together with the documents relating to the kitten’s genetic follow-up, are given to adopting families as part of their companion’s file.\n\nThis cannot, of course, guarantee that a living creature will never develop any illness in its lifetime. What it does allow is selecting our breeding cats with the greatest possible rigour, identifying known genetic risks, and giving families transparent information about the health and bloodlines of their future companion.\n\n🤎 For us, selection is never only about appearance. Health, traceability, temperament and quality of life are at the heart of every planned litter.',
  },
  {
    question: 'What does adopting a kitten include?',
    answer:
      "Adopting a kitten from La Chatterie des Vents d'Automne comes with a set of documents, guarantees and thoughtful touches designed to help you welcome your companion in the best possible conditions.\n\nWhen your kitten leaves, you receive:\n\n* the sales contract;\n* its health record, up to date with the care and vaccinations given;\n* its LOOF pedigree, where already issued, or the documents relating to its registration;\n* a certificate of good health issued by our vet;\n* the parents' health documents and results;\n* one month of health insurance with Agria, offered free of charge;\n* a complete welcome kit, carefully prepared to support your kitten's first days in its new home.\n\nBut our support does not stop on departure day. 🤎\n\nEvery family also benefits from our availability and advice throughout their companion's life. We remain on hand to answer your questions, guide you through the different stages of its life, and follow its progress within its family with real delight.\n\nBecause for us, a kitten does not simply leave the cattery: it joins a family, and the bond between us does not end the day it goes home. 🍂🐾",
  },
  {
    question: 'What support do you offer after the adoption?',
    answer:
      "Support from La Chatterie des Vents d'Automne does not stop the day your kitten joins its family.\n\nWe guide you before, during and after the adoption, so that every stage goes as smoothly as possible. Before your kitten arrives, we advise you and help you prepare its environment. On departure day, we pass on everything you need to know to ease its settling in and its first days in its new home.\n\nAfter the adoption, we remain available to answer your questions, advise you and support you through the different stages of its life: feeding, behaviour, development, settling in, or any other question about your companion.\n\n🤎 If you wish, we also stay present throughout your cat's life.\n\nWe care deeply about keeping in touch with the families who welcome our kittens and following their progress over the years. Hearing from them, seeing their daily lives and watching them grow up within their family is a particularly precious part of what we do.\n\n🍂 For us, adoption is not the end of a relationship but the beginning of a story we are glad to keep following.",
  },
  {
    question: 'Do you offer cats for breeding?',
    answer:
      'Yes, but exclusively as part of a registered breeding project that meets our ethical requirements.\n\nCats showing breeding qualities may be offered only to catteries registered with the French Chamber of Agriculture, holding a SIRET business number and an affix, and sharing a vision of breeding close to our own: respect for animal welfare, considered selection, rigorous health monitoring and preservation of the breed standard.\n\nEach project is reviewed individually to make sure the future environment and breeding practices match our values.\n\nFor these placements, the price of a traditional point Ragdoll or a Cherubim Ragdoll — Mink, Sepia or Solid — ranges from €2,800 to €4,000, depending on the cat’s quality, coat, origins and characteristics.\n\nNo cat intended for breeding is offered to a private individual on this basis. These placements are reserved exclusively for breeding professionals who meet our criteria.',
  },
].map((item, index) => ({_key: `en-faq-${index + 1}`, _type: 'object', ...item}))

const faqPageEn = {
  sectionLabel: 'Frequently asked questions',
  introText:
    "Everything you need to know before adopting a Ragdoll kitten from La Chatterie des Vents d'Automne.",
  items: faqItemsEn,
  seo: {
    metaTitle: "FAQ | Adopting a Ragdoll Kitten in Toulouse",
    metaDescription:
      'Answers to your questions about adopting a Ragdoll kitten in Toulouse: price, departure conditions, reservation, waiting list and health guarantees.',
  },
}

// ── Pages simples ───────────────────────────────────────────────
const catsPageEn = {
  sectionLabel: 'Our breeding cats',
  titlePrefix: 'Our',
  titleEmphasis: 'Ragdoll',
  titleSuffix: 'Cats',
  introText:
    'Our Ragdoll breeding cats, based in Toulouse, France, are chosen for their health, their temperament and the beauty of their bloodline.',
  malesTitle: 'Males',
  malesEmptyText: 'No males listed at the moment.',
  femalesTitle: 'Females',
  femalesEmptyText: 'No females listed at the moment.',
  seo: {
    metaTitle: 'Our Ragdoll Breeding Cats in Toulouse, France',
    metaDescription:
      'Meet our Ragdoll and Cherubim breeding cats in Toulouse, France — males and females, all tested negative for HCM, PKD, FIV and FeLV.',
  },
}

const littersPageEn = {
  sectionLabel: 'Availability',
  titlePrefix: 'Our',
  titleEmphasis: 'Ragdoll',
  titleSuffix: 'Kittens',
  introText:
    'Ragdoll kittens available in Toulouse, France, at a fixed price of €2,000 for a pet companion kitten. They leave at four months old, fully prepared: vaccinations, i-CAD microchip, neutering, worming, veterinary health certificate, health record and LOOF pedigree — with guidance before, during and after the adoption.',
  emptyText:
    'No litter announced at the moment. Get in touch to hear about upcoming births.',
  waitingListText: 'Waiting list now open',
  seo: {
    metaTitle: 'Ragdoll Kittens for Adoption in Toulouse, France',
    metaDescription:
      'Discover our Ragdoll kitten litters available in Toulouse, France, raised with the health and wellbeing of our cats at heart.',
  },
}

const contactPageEn = {
  sectionLabel: 'Get in touch',
  titleEmphasis: 'Contact',
  introText:
    "A question about our Ragdoll cats in Toulouse, an upcoming litter, or would you like to join the waiting list? Write to us.",
  termsTitle: 'Adoption terms',
  submitLabel: 'Send message',
  successMessage: 'Thank you, we will get back to you shortly.',
  errorMessage:
    'Something went wrong and your message was not sent. Please email us directly:',
  seo: {
    metaTitle: "Contact | Ragdoll Cattery in Toulouse, France",
    metaDescription:
      "Get in touch with La Chatterie des Vents d'Automne, a Ragdoll cattery in Toulouse, France, for any question or reservation.",
  },
}

const siteSettingsEn = {
  tagline: 'A family-run Ragdoll cattery in Toulouse, France',
  pricing: {
    depositReservation: '25% deposit (deducted from the total) to reserve a born kitten',
    depositWaitingList: '10% (€200, deducted from the total)',
  },
  footerTagline:
    'A family-run Ragdoll cattery in Toulouse, France, devoted to the health and wellbeing of our cats.',
  footerNavTitle: 'Navigation',
  footerContactTitle: 'Contact',
  footerLegalTitle: 'Legal',
  defaultSeo: {
    metaTitle: "La Chatterie des Vents d'Automne | Ragdoll Cattery in Toulouse",
    metaDescription:
      'A family-run Ragdoll cattery in Toulouse, France. Kittens raised underfoot, health-tested parents, full veterinary follow-up and LOOF pedigree.',
  },
}

// ── Chats ───────────────────────────────────────────────────────
const catsEn = {
  '1985de1c-b58b-476f-91ef-1439b31a44fe': {
    description:
      "Ciel — Minos\n\nBorn on 1 May 2024 in the Netherlands, Ciel is a magnificent Cherubim — the new name given to non-traditional Ragdolls — from a French-Dutch line: his mother was born in the Netherlands while his father is French.\n\nCiel is a real big teddy bear with a tender heart. He has a personality of gold: playful, funny, affectionate and always ready to join in with life at home. He follows us everywhere, watches everything we do and constantly seeks contact with the people he loves. With him around, it is impossible to take a step without your little four-legged companion underfoot. 🤎\n\nBehind that eternal kitten spirit is also an incredibly gentle, level-headed cat. Ciel loves being close to us, curling up against us and sharing every moment of daily life. His joyful, endearing and deeply affectionate nature makes him an absolutely unique companion.\n\nHis beautiful fawn mink mitted coat is one of his most precious features. This rare and fascinating colour reveals a warm, subtle shade between beige and grey, with the particular depth that only mink gives. It is a hue still rarely seen, and one we are especially glad to be working with in our cattery.\n\nCiel also has a harmonious build, a well-rounded forehead, an elegant profile, a strong chin and a particularly expressive gaze.\n\n✨ A magnificent Cherubim, as rare in his colour as in his origins, and above all exceptional in character: a big, playful, funny teddy bear, deeply attached to his family.",
  },
  '5e37b06c-6615-42fc-833f-a8fa5aaa54f3': {
    description:
      'Lana — Ultraviolence Lana\n\nBorn on 24 September 2023 to two French parents, Lana embodies, with remarkable gentleness, everything we love about the Ragdoll.\n\nHer temperament is deeply oriented towards people: gentle, serene and extremely affectionate, she naturally seeks closeness and loves to curl up against us. She lets herself be carried with absolute trust and sometimes even grooms us — a little declaration of love in her own way. 🤎\n\nHer beautiful blue tortie mitted coat, dense and silky, sets off her deep blue gaze and her particularly soft expression. Her fine bone structure and harmonious proportions give her an elegant, refined presence.\n\nBut it is above all her character that makes her so precious. Lana is a steady, gentle, deeply affectionate cat: present without being intrusive, calm without being distant, and always wonderfully delicate.\n\n✨ A true companion for life, as beautiful in appearance as in the gentleness of her soul.',
  },
}

// ── Portées ─────────────────────────────────────────────────────
const UPCOMING_LITTER_EN =
  "A new adventure begins…\n\nOur two lovebirds have recently been paired and, if Mother Nature smiles on us, a new litter of kittens will soon be joining the family at La Chatterie des Vents d'Automne.\n\nEvery pairing is carefully considered in order to preserve the qualities closest to our hearts: the health, temperament, beauty and wellbeing of our Ragdolls and Cherubims.\n\nThe waiting list is open. If you would like to welcome one of our future kittens, do get in touch so we can talk through your adoption plans."

const littersEn = {
  '0e7b2d6a-f601-454b-a7e3-f14b7a4c085f': {
    title: 'Lana & Ciel litter — September 2026',
    description: UPCOMING_LITTER_EN,
  },
  '25a32801-5f24-418a-82cb-86b81d3a60dc': {
    title: 'Wanda & Sisko litter — October 2026',
    description: UPCOMING_LITTER_EN,
  },
  '8b629832-9e7f-4d6f-9555-c64452e3f598': {
    title: 'Shanoa & Ciel litter — September 2026',
    description: UPCOMING_LITTER_EN,
  },
  '2e0bf354-1c61-483f-a759-bf607838b941': {
    title: 'Lénore & Ciel litter',
    description:
      'Some births are carefully planned; others arrive as wonderful surprises. The Lénore and Ciel litter belongs firmly to the second category.\n\nOn 1 September 2026 we had the immense joy of welcoming five magnificent kittens from this unexpected union. Beautiful kittens, already remarkable for their size and their presence.\n\nThe litter is made up of two male Ragdolls, one male Cherubim and two female Cherubims.\n\nLénore’s delivery went perfectly, calmly and serenely, and mother and all five little ones are doing wonderfully well.\n\nThis unexpected litter is one of the loveliest surprises of our year, and we have the privilege of following these five little beings very closely as they slowly begin to reveal their full potential.',
  },
}

// ── Mutations ───────────────────────────────────────────────────
const mutations = [
  {patch: {id: 'homePage', setIfMissing: {en: homePageEn}}},
  {patch: {id: 'faqPage', setIfMissing: {en: faqPageEn}}},
  {patch: {id: 'catsPage', setIfMissing: {en: catsPageEn}}},
  {patch: {id: 'littersPage', setIfMissing: {en: littersPageEn}}},
  {patch: {id: 'contactPage', setIfMissing: {en: contactPageEn}}},
  {patch: {id: 'siteSettings', setIfMissing: {en: siteSettingsEn}}},
  ...Object.entries(catsEn).map(([id, en]) => ({patch: {id, setIfMissing: {en}}})),
  ...Object.entries(littersEn).map(([id, en]) => ({patch: {id, setIfMissing: {en}}})),
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
console.log(`OK — ${json.results.length} documents traduits`)
