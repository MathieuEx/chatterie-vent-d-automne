import {defineField, defineType} from 'sanity'
import {seoField} from './lib/seo'
import {englishTab} from './lib/i18n'

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
    englishTab(
      [
        defineField({name: 'sectionLabel', title: 'Étiquette (English)', type: 'string'}),
        defineField({name: 'introText', title: 'Introduction (English)', type: 'text'}),
        defineField({
          name: 'items',
          title: 'Questions / Réponses (English)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'question', title: 'Question', type: 'string'}),
                defineField({name: 'answer', title: 'Réponse', type: 'text'}),
              ],
              preview: {select: {title: 'question'}},
            },
          ],
        }),
        defineField({
          name: 'seo',
          title: 'Référencement (English)',
          type: 'object',
          fields: [
            defineField({name: 'metaTitle', title: 'Titre Google (English)', type: 'string'}),
            defineField({name: 'metaDescription', title: 'Description Google (English)', type: 'text'}),
          ],
        }),
      ],
      'en',
    ),
  ],
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'seo', title: 'Référencement'},
    {name: 'en', title: 'English'},
  ],
  preview: {
    prepare() {
      return {title: 'Page FAQ'}
    },
  },
})
