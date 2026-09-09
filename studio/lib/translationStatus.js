import {fingerprint, frenchSubtree, isTranslatableDocument} from './translatable.js'

/**
 * État de la traduction anglaise d'un document, tel qu'affiché par le badge.
 *
 * - `none`     : rien n'a été traduit — le site affiche le français sur /en.
 * - `stale`    : le français a changé depuis la traduction. C'est le cas à
 *                signaler : sans avertissement, une correction de prix ou de
 *                condition resterait périmée en anglais sans que personne ne
 *                le sache.
 * - `upToDate` : la traduction correspond au français actuel.
 */
export function translationStatus(doc, type) {
  if (!doc || !isTranslatableDocument(type)) return null

  const french = frenchSubtree(doc, type)
  if (!french || Object.keys(french).length === 0) return null

  const en = doc.en
  const hasTranslation =
    en && Object.keys(en).some((key) => key !== 'sourceFingerprint' && !isBlank(en[key]))

  if (!hasTranslation) return 'none'

  const current = fingerprint(doc, type)
  return en.sourceFingerprint === current ? 'upToDate' : 'stale'
}

function isBlank(value) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}
