import {defineField, defineType} from 'sanity'
import {headerFields, seoField} from './lib/seo'

export default defineType({
  name: 'littersPage',
  title: 'Page "Nos Chatons"',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'seo', title: 'Référencement'},
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
  ],
  preview: {
    prepare() {
      return {title: 'Page "Nos Chatons"'}
    },
  },
})
