import {defineField, defineType} from 'sanity'
import {headerFields, seoField} from './lib/seo'
import {englishTab} from './lib/i18n'

export default defineType({
  name: 'littersPage',
  title: 'Page "Nos Chatons"',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'seo', title: 'Référencement'},
    {name: 'en', title: 'English'},
  ],
  fields: [
    ...headerFields.map((field) => ({...field, group: 'content'})),
    defineField({
      name: 'emptyText',
      title: 'Texte affiché si aucune portée',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'waitingListText',
      title: 'Texte des portées à venir',
      type: 'string',
      group: 'content',
      description: 'Ex: "Inscriptions sur liste d\'attente ouvertes"',
    }),
    seoField(),
    englishTab(
      [
        ...headerFields,
      defineField({name: 'emptyText', title: 'Aucune portée (English)', type: 'text'}),
      defineField({name: 'waitingListText', title: 'Portées à venir (English)', type: 'string'}),
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
  preview: {
    prepare() {
      return {title: 'Page "Nos Chatons"'}
    },
  },
})
