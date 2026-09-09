import {defineField, defineType} from 'sanity'
import {headerFields, seoField} from './lib/seo'
import {englishTab} from './lib/i18n'

export default defineType({
  name: 'contactPage',
  title: 'Page "Contact"',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'form', title: 'Formulaire'},
    {name: 'seo', title: 'Référencement'},
    {name: 'en', title: 'English'},
  ],
  fields: [
    ...headerFields.map((field) => ({...field, group: 'content'})),
    defineField({
      name: 'termsTitle',
      title: 'Titre du bloc "Modalités d\'adoption"',
      type: 'string',
      group: 'content',
      description:
        'Le contenu de ce bloc se règle dans "Paramètres du site" → onglet Tarifs.',
    }),

    defineField({
      name: 'formIntro',
      title: 'Texte au-dessus du formulaire',
      type: 'text',
      group: 'form',
    }),
    defineField({
      name: 'submitLabel',
      title: 'Texte du bouton d\'envoi',
      type: 'string',
      group: 'form',
      description: 'Ex: "Envoyer le message"',
    }),
    defineField({
      name: 'successMessage',
      title: 'Message de confirmation',
      type: 'string',
      group: 'form',
      description: 'Affiché quand le message est bien parti.',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Message d\'erreur',
      type: 'text',
      group: 'form',
      description: 'Affiché si l\'envoi échoue.',
    }),

    seoField(),
    englishTab(
      [
        ...headerFields,
      defineField({name: 'termsTitle', title: 'Titre modalités (English)', type: 'string'}),
      defineField({name: 'formIntro', title: 'Intro du formulaire (English)', type: 'text'}),
      defineField({name: 'submitLabel', title: 'Bouton d\'envoi (English)', type: 'string'}),
      defineField({name: 'successMessage', title: 'Message de confirmation (English)', type: 'string'}),
      defineField({name: 'errorMessage', title: 'Message d\'erreur (English)', type: 'text'}),
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
      return {title: 'Page "Contact"'}
    },
  },
})
