import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutPhoto',
      title: 'Photo "Notre histoire" (page d\'accueil)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Paramètres du site'}
    },
  },
})
