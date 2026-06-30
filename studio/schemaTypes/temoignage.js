import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Nom de l\'auteur',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Note',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'source',
      title: 'Plateforme',
      type: 'string',
      options: {
        list: [
          {title: 'Google', value: 'google'},
          {title: 'Facebook', value: 'facebook'},
        ],
        layout: 'radio',
      },
      initialValue: 'google',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Avis',
      type: 'text',
      description: 'Copier-coller le texte de l\'avis tel que publié sur Google ou Facebook.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de l\'avis',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      rating: 'rating',
      source: 'source',
    },
    prepare({title, rating, source}) {
      return {
        title,
        subtitle: `${'★'.repeat(rating ?? 0)} · ${source === 'facebook' ? 'Facebook' : 'Google'}`,
      }
    },
  },
})
