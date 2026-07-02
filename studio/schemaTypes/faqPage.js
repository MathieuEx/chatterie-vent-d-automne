import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqPage',
  title: 'Page FAQ',
  type: 'document',
  fields: [
    defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string'}),
    defineField({name: 'introText', title: 'Texte d\'introduction', type: 'text'}),
    defineField({
      name: 'items',
      title: 'Questions / Réponses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'answer', title: 'Réponse', type: 'text', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'question'}},
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Page FAQ'}
    },
  },
})
