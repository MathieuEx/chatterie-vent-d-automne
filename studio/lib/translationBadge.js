import {translationStatus} from './translationStatus.js'

/**
 * Pastille affichée à côté du bouton "Publier".
 *
 * Le cas qui compte est `stale` : le français a été modifié après la
 * traduction, donc le site sert encore l'ancien texte anglais. Sans ce signal,
 * la divergence est invisible — un prix corrigé en français resterait affiché à
 * l'ancien tarif sur les pages /en.
 */
export function translationBadge(props) {
  const doc = props.draft ?? props.published
  const status = translationStatus(doc, props.type)

  if (status === 'stale') {
    return {
      label: 'Anglais à mettre à jour',
      title:
        "Le texte français a changé depuis la dernière traduction. Les pages /en affichent encore l'ancienne version anglaise.",
      color: 'warning',
    }
  }

  if (status === 'none') {
    return {
      label: 'Pas de version anglaise',
      title: 'Les pages /en afficheront le texte français pour ce document.',
      color: 'default',
    }
  }

  if (status === 'upToDate') {
    return {
      label: 'Anglais à jour',
      title: 'La version anglaise correspond au texte français actuel.',
      color: 'success',
    }
  }

  return null
}
