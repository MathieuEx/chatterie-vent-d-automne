/**
 * Enregistre l'empreinte du français pour les documents déjà traduits.
 *
 * Sans elle, le badge du Studio afficherait "Anglais à mettre à jour" sur tous
 * les documents dès le premier jour — une fausse alerte qui apprendrait à
 * Amélie à ignorer le signal, exactement l'inverse du but recherché.
 *
 *   node seed-fingerprints.mjs
 */
import {readFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {fingerprint} from './lib/translatable.js'
import {TRANSLATABLE_FIELDS} from './lib/translatable.js'

const PROJECT = 'mcvnhjxb'
const DATASET = 'production'
const token =
  process.env.SANITY_AUTH_TOKEN ??
  JSON.parse(readFileSync(`${homedir()}/.config/sanity/config.json`, 'utf8')).authToken

const types = Object.keys(TRANSLATABLE_FIELDS)
const query = `*[_type in $types && defined(en)]`

const docs = await fetch(
  `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(
    query,
  )}&$types=${encodeURIComponent(JSON.stringify(types))}`,
  {headers: {Authorization: `Bearer ${token}`}},
)
  .then((r) => r.json())
  .then((r) => r.result ?? [])

const mutations = docs
  .filter((doc) => !doc.en?.sourceFingerprint)
  .map((doc) => ({
    patch: {id: doc._id, set: {'en.sourceFingerprint': fingerprint(doc, doc._type)}},
  }))

if (mutations.length === 0) {
  console.log('Rien à faire — toutes les traductions ont déjà leur empreinte.')
  process.exit(0)
}

const res = await fetch(
  `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}?returnIds=true`,
  {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body: JSON.stringify({mutations}),
  },
)

const json = await res.json()
if (!res.ok) {
  console.error('Échec :', JSON.stringify(json, null, 2))
  process.exit(1)
}
console.log(`OK — ${json.results.length} empreintes enregistrées`)
