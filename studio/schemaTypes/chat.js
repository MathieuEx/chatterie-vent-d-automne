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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Utilisé dans l\'URL de la page du chat. Cliquez sur "Generate" puis "Publish".',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Présentation détaillée affichée sur la page du chat (caractère, histoire, etc.)',
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
    defineField({
      name: 'gallery',
      title: 'Galerie photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
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
