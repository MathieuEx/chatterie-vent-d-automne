import {useCallback, useState} from 'react'
import {useDocumentOperation} from 'sanity'
import {fingerprint, frenchSubtree, isTranslatableDocument} from './translatable.js'
import {translationStatus} from './translationStatus.js'

/**
 * "Repartir du français" — recopie le texte français dans l'onglet anglais.
 *
 * Ne traduit pas : cela demanderait un service de traduction. Ce que ça donne,
 * c'est le squelette exact à écraser — toutes les listes (questions de FAQ,
 * étapes d'adoption…) avec le bon nombre d'entrées, donc aucun champ oublié.
 */
export function copyFrenchAction(props) {
  const {id, type, draft, published, onComplete} = props
  const doc = draft ?? published
  const {patch} = useDocumentOperation(id, type)
  const [confirming, setConfirming] = useState(false)

  const status = translationStatus(doc, type)
  const hasTranslation = status === 'stale' || status === 'upToDate'

  const apply = useCallback(() => {
    const french = frenchSubtree(doc, type)
    if (!french) return

    patch.execute([
      {
        set: {
          en: {
            ...french,
            // On repart du français : l'empreinte enregistrée est donc celle du
            // français courant, et le badge passe à "à jour" une fois qu'Amélie
            // aura écrit sa traduction par-dessus.
            sourceFingerprint: fingerprint(doc, type),
          },
        },
      },
    ])
    setConfirming(false)
    onComplete()
  }, [doc, type, patch, onComplete])

  if (!isTranslatableDocument(type) || !doc) return null

  return {
    label: 'Repartir du français',
    icon: () => '🇬🇧',
    onHandle: () => (hasTranslation ? setConfirming(true) : apply()),
    dialog: confirming && {
      type: 'confirm',
      onCancel: () => setConfirming(false),
      onConfirm: apply,
      message:
        'Une version anglaise existe déjà. La remplacer par le texte français effacera la traduction actuelle. Continuer ?',
    },
  }
}

/**
 * "Traduction à jour" — enregistre que l'anglais correspond au français
 * courant, et éteint l'avertissement.
 *
 * Utile quand la modification française ne change rien à l'anglais (une
 * coquille corrigée, une photo remplacée) : sinon le badge resterait orange en
 * permanence et Amélie finirait par ne plus le voir.
 */
export function markTranslationCurrentAction(props) {
  const {id, type, draft, published, onComplete} = props
  const doc = draft ?? published
  const {patch} = useDocumentOperation(id, type)

  if (!isTranslatableDocument(type) || !doc) return null
  if (translationStatus(doc, type) !== 'stale') return null

  return {
    label: 'Marquer la traduction à jour',
    icon: () => '✓',
    onHandle: () => {
      patch.execute([{set: {'en.sourceFingerprint': fingerprint(doc, type)}}])
      onComplete()
    },
  }
}
