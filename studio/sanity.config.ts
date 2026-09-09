import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {translationBadge} from './lib/translationBadge'
import {copyFrenchAction, markTranslationCurrentAction} from './lib/translationActions'

/** Types qui n'existent qu'en un seul exemplaire : on les épingle dans le menu. */
const SINGLETONS = [
  'homePage',
  'catsPage',
  'littersPage',
  'faqPage',
  'contactPage',
  'legalPage',
  'siteSettings',
]

export default defineConfig({
  name: 'default',
  title: 'chatterie-des-vents-dautomne',

  projectId: 'mcvnhjxb',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            // ── Ce qu'Amélie met à jour souvent ──────────────────
            S.documentTypeListItem('portee').title('Portées'),
            S.documentTypeListItem('chat').title('Nos chats'),
            S.documentTypeListItem('article').title('Actualités'),
            S.documentTypeListItem('temoignage').title('Avis clients'),

            S.divider(),

            // ── Le texte de chaque page ──────────────────────────
            S.listItem()
              .title("Page d'accueil")
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Page "Nos Chats"')
              .id('catsPage')
              .child(S.document().schemaType('catsPage').documentId('catsPage')),
            S.listItem()
              .title('Page "Nos Chatons"')
              .id('littersPage')
              .child(S.document().schemaType('littersPage').documentId('littersPage')),
            S.listItem()
              .title('Page FAQ')
              .id('faqPage')
              .child(S.document().schemaType('faqPage').documentId('faqPage')),
            S.listItem()
              .title('Page Contact')
              .id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),

            S.divider(),

            // ── Réglages globaux ─────────────────────────────────
            S.listItem()
              .title('Paramètres du site')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Pages légales')
              .id('legalPages')
              .child(
                S.list()
                  .title('Pages légales')
                  .items([
                    S.listItem()
                      .title('Mentions légales')
                      .id('mentionsLegales')
                      .child(
                        S.document().schemaType('legalPage').documentId('mentionsLegales'),
                      ),
                    S.listItem()
                      .title('Politique de confidentialité')
                      .id('politiqueConfidentialite')
                      .child(
                        S.document()
                          .schemaType('legalPage')
                          .documentId('politiqueConfidentialite'),
                      ),
                  ]),
              ),
          ]),
    }),
    visionTool(),
  ],

  document: {
    // Pastille "Anglais à mettre à jour" à côté du bouton Publier : sans elle,
    // une correction du texte français laisserait les pages /en sur l'ancienne
    // version sans que personne ne s'en aperçoive.
    badges: (prev) => [...prev, translationBadge],

    actions: (prev, {schemaType}) => {
      // Pas de "Créer" ni de "Dupliquer" sur les pages uniques : Amélie ne peut
      // pas se retrouver avec deux pages d'accueil concurrentes.
      const base = SINGLETONS.includes(schemaType)
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : prev

      return [...base, copyFrenchAction, markTranslationCurrentAction]
    },
  },

  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
  },
})
