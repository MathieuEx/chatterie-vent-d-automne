import {defineField, defineType} from 'sanity'
import {headerFields, seoField} from './lib/seo'

export default defineType({
  name: 'contactPage',
  title: 'Page "Contact"',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'form', title: 'Formulaire'},
    {name: 'seo', title: 'Référencement'},
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
  ],
  preview: {
    prepare() {
      return {title: 'Page "Contact"'}
    },
  },
})
