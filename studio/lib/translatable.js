/**
 * Champs traduisibles de chaque type de document.
 *
 * Cette liste doit refléter les champs déclarés dans `englishTab(...)` de chaque
 * schéma : c'est elle qui dit au bouton "Repartir du français" quoi recopier, et
 * au badge "anglais périmé" quoi surveiller.
 */
export const TRANSLATABLE_FIELDS = {
  chat: ['description'],

  portee: ['title', 'description', 'priceLabel', 'priceNote'],

  article: ['title', 'excerpt', 'body'],

  homePage: [
    'hero',
    'about',
    'catsSection',
    'standardsSection',
    'adoptionSection',
    'testimonialsSection',
    'gallerySection',
    'latestLitterSection',
  ],

  faqPage: ['sectionLabel', 'introText', 'items', 'seo'],

  catsPage: [
    'sectionLabel',
    'titlePrefix',
    'titleEmphasis',
    'titleSuffix',
    'introText',
    'malesTitle',
    'malesEmptyText',
    'femalesTitle',
    'femalesEmptyText',
    'seo',
  ],

  littersPage: [
    'sectionLabel',
    'titlePrefix',
    'titleEmphasis',
    'titleSuffix',
    'introText',
    'emptyText',
    'waitingListText',
    'seo',
  ],

  contactPage: [
    'sectionLabel',
    'titlePrefix',
    'titleEmphasis',
    'titleSuffix',
    'introText',
    'termsTitle',
    'formIntro',
    'submitLabel',
    'successMessage',
    'errorMessage',
    'seo',
  ],

  siteSettings: [
    'tagline',
    'pricing',
    'footerTagline',
    'footerNavTitle',
    'footerContactTitle',
    'footerLegalTitle',
    'defaultSeo',
  ],
}

/**
 * Champs que la version anglaise ne doit jamais reprendre.
 *
 * `pricing.kittenPrice` est un montant, pas du texte : le recopier dans
 * l'onglet anglais créerait un second prix à maintenir, qui divergerait du
 * français au premier changement de tarif.
 */
const NON_TRANSLATABLE_PATHS = new Set(['pricing.kittenPrice'])

export function isTranslatableDocument(type) {
  return Boolean(TRANSLATABLE_FIELDS[type])
}

/** Sous-arbre français à traduire, nettoyé des champs non textuels. */
export function frenchSubtree(doc, type) {
  const fields = TRANSLATABLE_FIELDS[type]
  if (!doc || !fields) return null

  const subtree = {}
  for (const field of fields) {
    const value = prune(doc[field], field)
    if (value !== undefined) subtree[field] = value
  }
  return subtree
}

function prune(value, path) {
  if (NON_TRANSLATABLE_PATHS.has(path)) return undefined
  if (value === null || value === undefined) return undefined

  if (Array.isArray(value)) {
    const items = value.map((item) => prune(item, path)).filter((item) => item !== undefined)
    return items.length ? items : undefined
  }

  if (typeof value === 'object') {
    const out = {}
    for (const [key, child] of Object.entries(value)) {
      // `_key` et `_type` structurent les tableaux Sanity : on les conserve.
      if (key === '_key' || key === '_type') {
        out[key] = child
        continue
      }
      const pruned = prune(child, `${path}.${key}`)
      if (pruned !== undefined) out[key] = pruned
    }
    // Un objet réduit à ses seules clés techniques n'a rien à traduire.
    const meaningful = Object.keys(out).filter((k) => k !== '_key' && k !== '_type')
    return meaningful.length ? out : undefined
  }

  return value
}

/**
 * Empreinte stable du français traduit, mémorisée dans `en.sourceFingerprint`.
 * Sa comparaison avec l'état courant révèle une traduction devenue obsolète.
 */
export function fingerprint(doc, type) {
  const subtree = frenchSubtree(doc, type)
  if (!subtree) return null
  return hash(stableStringify(subtree))
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .filter((key) => key !== '_key')
      .sort()
      .map((key) => `${key}:${stableStringify(value[key])}`)
      .join(',')}}`
  }
  return JSON.stringify(value ?? null)
}

/** djb2 — suffisant pour détecter un changement, pas un usage cryptographique. */
function hash(input) {
  let h = 5381
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) | 0
  }
  return (h >>> 0).toString(36)
}
