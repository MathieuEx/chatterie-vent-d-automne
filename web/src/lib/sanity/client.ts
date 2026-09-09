import {createClient} from '@sanity/client'

/**
 * Version de l'API GROQ. C'est une constante du code, pas un réglage
 * d'environnement : la figer ici évite qu'une variable oubliée sur Vercel
 * fasse échouer le build entier ("Invalid API version string").
 */
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!PROJECT_ID) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID est absent. Renseignez-le dans web/.env en local, " +
      'et dans Vercel → Settings → Environment Variables en production.',
  )
}

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: true,
})
