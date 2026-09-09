import {defineField, defineType} from 'sanity'
import {slugOptions, slugValidation} from './lib/slug'

export default defineType({
  name: 'portee',
  title: 'Portée',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Ex: "Portée de Wanda & Ciel - Mars 2026"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: slugOptions('title'),
      validation: slugValidation,
    }),
    defineField({
      name: 'birthDate',
      title: 'Date de naissance',
      type: 'date',
      description:
        'Pour une portée pas encore née (statut "À venir"), indiquez la date prévue.',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'parentMale',
      title: 'Père',
      type: 'string',
    }),
    defineField({
      name: 'parentFemale',
      title: 'Mère',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          {title: 'À venir (attendue)', value: 'a_venir'},
          {title: 'Disponible', value: 'disponible'},
          {title: 'Option', value: 'option'},
          {title: 'Réservé', value: 'reserve'},
          {title: 'Dans sa nouvelle famille', value: 'adopte'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'disponible',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prix affiché (€)',
      type: 'number',
      description:
        'Prix d\'un chaton de cette portée, en euros. Laissez vide pour utiliser le prix par défaut défini dans "Paramètres du site".',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Texte à la place du prix (optionnel)',
      type: 'string',
      description:
        'Remplace complètement le prix affiché. Ex: "Nous consulter" ou "À partir de 2 000 €". Laissez vide pour afficher le prix ci-dessus.',
    }),
    defineField({
      name: 'priceNote',
      title: 'Précision sous le prix (optionnel)',
      type: 'string',
      description: 'Ex: "Acompte de 25 % à la réservation"',
    }),
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'object',
      fields: [
        defineField({
          name: 'total',
          title: 'Nombre total de chatons',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'available',
          title: 'Nombre encore disponibles',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'reserved',
          title: 'Nombre réservés',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'gallery.0',
    },
    prepare({title, status, media}) {
      return {
        title,
        subtitle: status,
        media,
      }
    },
  },
})
