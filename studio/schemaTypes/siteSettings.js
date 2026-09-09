import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  groups: [
    {name: 'identity', title: 'Identité', default: true},
    {name: 'contact', title: 'Coordonnées'},
    {name: 'pricing', title: 'Tarifs'},
    {name: 'legal', title: 'Informations légales'},
    {name: 'footer', title: 'Pied de page'},
    {name: 'seo', title: 'Référencement'},
  ],

  fields: [
    // ── Identité ────────────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Nom de la chatterie',
      type: 'string',
      group: 'identity',
      description: 'Ex: "La Chatterie des Vents d\'Automne"',
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan court',
      type: 'string',
      group: 'identity',
      description: 'Ex: "Élevage familial de chats Ragdoll à Toulouse"',
    }),
    defineField({
      name: 'aboutPhoto',
      title: 'Photo "Notre histoire" (page d\'accueil)',
      type: 'image',
      group: 'identity',
      options: {hotspot: true},
    }),

    // ── Coordonnées ─────────────────────────────────────────────
    defineField({
      name: 'email',
      title: 'Adresse e-mail',
      type: 'string',
      group: 'contact',
      description: 'Reçoit aussi les messages du formulaire de contact.',
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Téléphone (tel qu\'affiché)',
      type: 'string',
      group: 'contact',
      description: 'Ex: "07 82 18 77 84"',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone (format international)',
      type: 'string',
      group: 'contact',
      description: 'Utilisé par le bouton d\'appel sur mobile. Ex: "+33782187784"',
    }),
    defineField({
      name: 'address',
      title: 'Adresse postale',
      type: 'object',
      group: 'contact',
      options: {columns: 2},
      fields: [
        defineField({name: 'streetAddress', title: 'Rue', type: 'string'}),
        defineField({name: 'postalCode', title: 'Code postal', type: 'string'}),
        defineField({name: 'addressLocality', title: 'Ville', type: 'string'}),
        defineField({
          name: 'addressCountry',
          title: 'Pays (code)',
          type: 'string',
          description: 'Ex: "FR"',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'array',
      group: 'contact',
      description: 'Affichés dans le pied de page.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Texte affiché',
              type: 'string',
              description: 'Ex: "@ragdoll_des_vents_dautomne"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Lien',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    }),

    // ── Tarifs ──────────────────────────────────────────────────
    defineField({
      name: 'pricing',
      title: 'Tarifs',
      type: 'object',
      group: 'pricing',
      description:
        'Prix affichés sur les portées, la page Nos Chatons et la page Contact. Une portée peut définir son propre prix pour passer outre celui-ci.',
      fields: [
        defineField({
          name: 'kittenPrice',
          title: 'Prix par défaut d\'un chaton (€)',
          type: 'number',
          description: 'Ex: 2000 — affiché automatiquement "2 000 €".',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'kittenPriceLabel',
          title: 'Texte à la place du prix (optionnel)',
          type: 'string',
          description: 'Remplace le prix par défaut partout. Ex: "Nous consulter".',
        }),
        defineField({
          name: 'depositReservation',
          title: 'Acompte à la réservation',
          type: 'string',
          description: 'Ex: "25 % (déductible) à la réservation d\'un chaton né"',
        }),
        defineField({
          name: 'depositWaitingList',
          title: 'Acompte liste d\'attente',
          type: 'string',
          description: 'Ex: "10 % (200 €, déductible)"',
        }),
        defineField({
          name: 'termsText',
          title: 'Bloc "Modalités d\'adoption" (page Contact)',
          type: 'text',
          description:
            'Laissez vide pour composer automatiquement le texte à partir des champs ci-dessus.',
        }),
      ],
    }),

    // ── Informations légales ────────────────────────────────────
    defineField({
      name: 'legal',
      title: 'Informations légales',
      type: 'object',
      group: 'legal',
      description: 'Affichées dans le pied de page et sur la page Mentions légales.',
      fields: [
        defineField({name: 'siret', title: 'SIRET', type: 'string'}),
        defineField({name: 'loofAffix', title: 'Affixe LOOF', type: 'string', description: 'Ex: "n°37170"'}),
        defineField({name: 'acaced', title: 'ACACED', type: 'string', description: 'Ex: "ACACED 2022"'}),
        defineField({name: 'mediator', title: 'Médiateur', type: 'string', description: 'Ex: "MEDIAVET"'}),
        defineField({
          name: 'extraMentions',
          title: 'Mentions supplémentaires',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Une ligne par mention, affichée dans le pied de page.',
        }),
      ],
    }),

    // ── Pied de page ────────────────────────────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Slogan du pied de page',
      type: 'text',
      group: 'footer',
    }),
    defineField({
      name: 'footerNavTitle',
      title: 'Titre de la colonne "Navigation"',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerContactTitle',
      title: 'Titre de la colonne "Contact"',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerLegalTitle',
      title: 'Titre de la colonne "Légal"',
      type: 'string',
      group: 'footer',
    }),

    // ── Référencement ───────────────────────────────────────────
    defineField({
      name: 'defaultSeo',
      title: 'Référencement par défaut',
      type: 'object',
      group: 'seo',
      description:
        'Titre et description affichés dans Google pour la page d\'accueil, et utilisés en repli pour les autres pages.',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Titre Google',
          type: 'string',
          description: '50 à 60 caractères idéalement.',
          validation: (Rule) => Rule.max(70).warning('Au-delà de 70 caractères, Google tronque le titre.'),
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
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Paramètres du site'}
    },
  },
})
