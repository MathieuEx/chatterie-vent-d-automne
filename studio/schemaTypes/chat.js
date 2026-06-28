import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'chat',
  title: 'Chat',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      description: 'Ex: "NL*Closetonature Minos (Ciel)"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorCode',
      title: 'Robe',
      type: 'string',
      description: 'Ex: "blue tortie mitted (chocolate carrier)" ou "seal point"',
    }),
    defineField({
      name: 'geneticData',
      title: 'Données génétiques',
      type: 'string',
      description: 'Ex: "B/b d/d cs/cs"',
    }),
    defineField({
      name: 'role',
      title: 'Sexe',
      type: 'string',
      options: {
        list: [
          {title: 'Mâle', value: 'male'},
          {title: 'Femelle', value: 'femelle'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          {title: 'Actif', value: 'actif'},
          {title: 'Retraité', value: 'retraite'},
        ],
        layout: 'radio',
      },
      initialValue: 'actif',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'origin',
      title: 'Origine',
      type: 'string',
      description: 'Ex: "Import Pologne"',
    }),
    defineField({
      name: 'tests',
      title: 'Tests de santé',
      type: 'string',
      initialValue: 'HCM PKD FIV FELV négatif',
    }),
    defineField({
      name: 'photo',
      title: 'Photo principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'colorCode',
      media: 'photo',
    },
  },
})
