import {defineField, defineType} from 'sanity'

const titleFields = [
  defineField({
    name: 'titlePrefix',
    title: 'Début du titre',
    type: 'string',
    description: 'Ex: "Une passion née d\'" (la fin du titre sera affichée en italique)',
  }),
  defineField({
    name: 'titleEmphasis',
    title: 'Fin du titre (en italique)',
    type: 'string',
    description: 'Ex: "un coup de cœur"',
    validation: (Rule) => Rule.required(),
  }),
]

const cardFields = [
  defineField({name: 'title', title: 'Titre', type: 'string', validation: (Rule) => Rule.required()}),
  defineField({name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required()}),
]

export default defineType({
  name: 'homePage',
  title: 'Page d\'accueil',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'about', title: 'À propos'},
    {name: 'cats', title: 'Reproducteurs'},
    {name: 'standards', title: 'Engagements qualité'},
    {name: 'adoption', title: 'Parcours d\'adoption'},
    {name: 'testimonials', title: 'Avis'},
    {name: 'gallery', title: 'Galerie'},
    {name: 'latestLitter', title: 'Dernière portée'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'badge', title: 'Badge', type: 'string', description: 'Ex: "Toulouse · Ragdoll"'}),
        defineField({
          name: 'titlePrefix',
          title: 'Début du titre',
          type: 'string',
          description: 'Ex: "La Chatterie des"',
        }),
        defineField({
          name: 'titleEmphasis',
          title: 'Fin du titre (en italique)',
          type: 'string',
          description: 'Ex: "Vents d\'Automne"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({name: 'description', title: 'Texte d\'accroche', type: 'text'}),
        defineField({name: 'ctaPrimaryLabel', title: 'Texte du bouton principal', type: 'string'}),
        defineField({name: 'ctaSecondaryLabel', title: 'Texte du bouton secondaire', type: 'string'}),
        defineField({
          name: 'stats',
          title: 'Chiffres clés',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'value', title: 'Valeur', type: 'string', validation: (Rule) => Rule.required()}),
                defineField({name: 'label', title: 'Libellé', type: 'string', validation: (Rule) => Rule.required()}),
              ],
              preview: {select: {title: 'value', subtitle: 'label'}},
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'À propos ("Notre histoire")',
      type: 'object',
      group: 'about',
      fields: [
        defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string'}),
        ...titleFields,
        defineField({
          name: 'paragraphs',
          title: 'Paragraphes',
          type: 'array',
          of: [{type: 'text'}],
        }),
        defineField({name: 'badgeNumber', title: 'Chiffre du badge', type: 'string', description: 'Ex: "3"'}),
        defineField({
          name: 'badgeText',
          title: 'Texte du badge',
          type: 'string',
          description: 'Ex: "ans d\'élevage passionné"',
        }),
        defineField({
          name: 'values',
          title: 'Nos valeurs',
          type: 'array',
          of: [{type: 'object', fields: cardFields, preview: {select: {title: 'title', subtitle: 'description'}}}],
        }),
      ],
    }),
    defineField({
      name: 'catsSection',
      title: 'Section reproducteurs',
      type: 'object',
      group: 'cats',
      fields: [
        defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string'}),
        ...titleFields,
        defineField({name: 'description', title: 'Description', type: 'text'}),
      ],
    }),
    defineField({
      name: 'standardsSection',
      title: 'Engagements qualité',
      type: 'object',
      group: 'standards',
      fields: [
        defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string'}),
        ...titleFields,
        defineField({
          name: 'standards',
          title: 'Nos engagements',
          type: 'array',
          of: [{type: 'object', fields: cardFields, preview: {select: {title: 'title', subtitle: 'description'}}}],
        }),
        defineField({name: 'cardTitle', title: 'Titre de la carte certifications', type: 'string'}),
        defineField({name: 'cardSubtitle', title: 'Sous-titre de la carte certifications', type: 'string'}),
        defineField({
          name: 'certifications',
          title: 'Certifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'icon', title: 'Icône (emoji)', type: 'string', description: 'Ex: "🎓"'}),
                defineField({name: 'name', title: 'Nom', type: 'string', validation: (Rule) => Rule.required()}),
                defineField({name: 'detail', title: 'Détail', type: 'string', description: 'Ex: "Obtenu en 2022"'}),
                defineField({
                  name: 'accent',
                  title: 'Couleur',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Bleu', value: 'blue'},
                      {title: 'Sauge', value: 'sage'},
                      {title: 'Rose', value: 'rose'},
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'blue',
                }),
              ],
              preview: {select: {title: 'name', subtitle: 'detail'}},
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'adoptionSection',
      title: 'Parcours d\'adoption',
      type: 'object',
      group: 'adoption',
      fields: [
        defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string'}),
        ...titleFields,
        defineField({
          name: 'steps',
          title: 'Étapes',
          type: 'array',
          of: [{type: 'object', fields: cardFields, preview: {select: {title: 'title', subtitle: 'description'}}}],
        }),
      ],
    }),
    defineField({
      name: 'testimonialsSection',
      title: 'Section avis',
      type: 'object',
      group: 'testimonials',
      fields: [defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string'}), ...titleFields],
    }),
    defineField({
      name: 'gallerySection',
      title: 'Section galerie',
      type: 'object',
      group: 'gallery',
      fields: [
        defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string'}),
        ...titleFields,
        defineField({name: 'emptyStateText', title: 'Texte si galerie vide', type: 'text'}),
      ],
    }),
    defineField({
      name: 'latestLitterSection',
      title: 'Section dernière portée',
      type: 'object',
      group: 'latestLitter',
      fields: [defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string'}), ...titleFields],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Page d\'accueil'}
    },
  },
})
