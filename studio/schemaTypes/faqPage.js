import {defineField, defineType} from 'sanity'
import {seoField} from './lib/seo'

export default defineType({
  name: 'faqPage',
  title: 'Page FAQ',
  type: 'document',
  fields: [
    defineField({name: 'sectionLabel', title: 'Étiquette de section', type: 'string', group: 'content'}),
    defineField({name: 'introText', title: 'Texte d\'introduction', type: 'text', group: 'content'}),
    defineField({
      name: 'items',
      title: 'Questions / Réponses',
      type: 'array',
      group: 'content',
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
    seoField('seo'),
  ],
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'seo', title: 'Référencement'},
  ],
  preview: {
    prepare() {
      return {title: 'Page FAQ'}
    },
  },
})
