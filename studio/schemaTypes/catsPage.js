import {defineField, defineType} from 'sanity'
import {headerFields, seoField} from './lib/seo'
import {englishTab} from './lib/i18n'

export default defineType({
  name: 'catsPage',
  title: 'Page "Nos Chats"',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'seo', title: 'Référencement'},
    {name: 'en', title: 'English'},
  ],
  fields: [
    ...headerFields.map((field) => ({...field, group: 'content'})),
    defineField({
      name: 'malesTitle',
      title: 'Titre de la section des mâles',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'malesEmptyText',
      title: 'Texte affiché si aucun mâle',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'femalesTitle',
      title: 'Titre de la section des femelles',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'femalesEmptyText',
      title: 'Texte affiché si aucune femelle',
      type: 'string',
      group: 'content',
    }),
    seoField(),
    englishTab(
      [
        ...headerFields,
      defineField({name: 'malesTitle', title: 'Titre des mâles (English)', type: 'string'}),
      defineField({name: 'malesEmptyText', title: 'Aucun mâle (English)', type: 'string'}),
      defineField({name: 'femalesTitle', title: 'Titre des femelles (English)', type: 'string'}),
      defineField({name: 'femalesEmptyText', title: 'Aucune femelle (English)', type: 'string'}),
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
      return {title: 'Page "Nos Chats"'}
    },
  },
})
