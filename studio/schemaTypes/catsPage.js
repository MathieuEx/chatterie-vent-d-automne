import {defineField, defineType} from 'sanity'
import {headerFields, seoField} from './lib/seo'

export default defineType({
  name: 'catsPage',
  title: 'Page "Nos Chats"',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'seo', title: 'Référencement'},
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
  ],
  preview: {
    prepare() {
      return {title: 'Page "Nos Chats"'}
    },
  },
})
