import {defineField, defineType} from 'sanity'
import {seoField} from './lib/seo'

/**
 * Pages "Mentions légales" et "Politique de confidentialité".
 *
 * Deux documents uniques (ids `mentionsLegales` et `politiqueConfidentialite`).
 * Si le champ `body` est vide, le site affiche le texte de référence intégré au
 * code — on ne risque donc jamais de se retrouver sans mentions légales.
 */
export default defineType({
  name: 'legalPage',
  title: 'Page légale',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'seo', title: 'Référencement'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionLabel',
      title: 'Petite étiquette au-dessus du titre',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Date de dernière mise à jour',
      type: 'date',
      group: 'content',
      options: {dateFormat: 'DD/MM/YYYY'},
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      group: 'content',
      description:
        'Laissez vide pour conserver le texte de référence fourni avec le site. Dès que vous écrivez ici, ce contenu remplace le texte par défaut.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Paragraphe', value: 'normal'},
            {title: 'Titre de section', value: 'h2'},
            {title: 'Sous-titre', value: 'h3'},
          ],
          lists: [{title: 'Liste à puces', value: 'bullet'}],
        },
      ],
    }),
    seoField(),
  ],
  preview: {
    select: {title: 'title'},
  },
})
