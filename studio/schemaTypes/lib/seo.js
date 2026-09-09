import {defineField} from 'sanity'

/**
 * Bloc "Référencement" réutilisable par chaque page éditable.
 * Alimente le <title> et la meta description que Google affiche.
 */
export function seoField(group = 'seo') {
  return defineField({
    name: 'seo',
    title: 'Référencement (Google)',
    type: 'object',
    group,
    description: 'Ce que Google affiche dans ses résultats pour cette page.',
    fields: [
      defineField({
        name: 'metaTitle',
        title: 'Titre Google',
        type: 'string',
        description: '50 à 60 caractères idéalement.',
        validation: (Rule) =>
          Rule.max(70).warning('Au-delà de 70 caractères, Google tronque le titre.'),
      }),
      defineField({
        name: 'metaDescription',
        title: 'Description Google',
        type: 'text',
        description: '150 à 160 caractères idéalement.',
        validation: (Rule) =>
          Rule.max(180).warning('Au-delà de 180 caractères, Google tronque la description.'),
      }),
    ],
  })
}

/** Champs d'en-tête communs aux pages simples (étiquette + titre + intro). */
export const headerFields = [
  defineField({
    name: 'sectionLabel',
    title: 'Petite étiquette au-dessus du titre',
    type: 'string',
    description: 'Ex: "Nos reproducteurs"',
  }),
  defineField({
    name: 'titlePrefix',
    title: 'Début du titre',
    type: 'string',
    description: 'Ex: "Nos" (affiché en normal)',
  }),
  defineField({
    name: 'titleEmphasis',
    title: 'Fin du titre (en italique)',
    type: 'string',
    description: 'Ex: "Chats"',
  }),
  defineField({
    name: 'titleSuffix',
    title: 'Après le titre en italique',
    type: 'string',
    description: 'Ex: "Ragdoll"',
  }),
  defineField({
    name: 'introText',
    title: 'Texte d\'introduction',
    type: 'text',
  }),
]
