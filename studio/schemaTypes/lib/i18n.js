import {defineField} from 'sanity'

/**
 * Chaque document traduisible reçoit une section "Version anglaise" reprenant
 * ses champs rédactionnels.
 *
 * Un champ anglais laissé vide n'efface rien : le site réaffiche le texte
 * français à sa place. Amélie peut donc traduire progressivement, sans qu'une
 * page se retrouve à moitié vide entre deux sessions.
 */

/**
 * Prépare un champ français pour sa copie anglaise.
 *
 * Deux retraits indispensables :
 * - `group`, qui n'a pas de sens à l'intérieur d'un objet ;
 * - `validation`, sans quoi les champs marqués obligatoires côté français
 *   rendraient le document impubliable tant que la traduction n'est pas
 *   terminée — exactement ce qu'on veut éviter.
 */
function asOptionalField(field) {
  const {group, validation, initialValue, ...rest} = field

  if (Array.isArray(rest.fields)) {
    rest.fields = rest.fields.map(asOptionalField)
  }

  if (Array.isArray(rest.of)) {
    rest.of = rest.of.map((member) =>
      Array.isArray(member.fields)
        ? {...member, fields: member.fields.map(asOptionalField)}
        : member,
    )
  }

  return rest
}

/**
 * @param fields  champs traduisibles (les définitions françaises, réutilisées)
 * @param group   onglet d'accueil, pour les documents qui utilisent déjà des
 *                groupes. Omis, la traduction apparaît en section repliable en
 *                bas du formulaire.
 */
export function englishTab(fields, group) {
  return defineField({
    name: 'en',
    title: 'Version anglaise',
    type: 'object',
    ...(group ? {group} : {}),
    description:
      'Traduction affichée sur les pages /en du site. Un champ laissé vide affiche automatiquement le texte français.',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...fields.map(asOptionalField),
      defineField({
        name: 'sourceFingerprint',
        title: 'Empreinte du texte français traduit',
        type: 'string',
        // Écrit par le bouton "Repartir du français" et par le bouton
        // "Traduction à jour" ; sert au badge qui signale une version anglaise
        // devenue obsolète. Aucun intérêt à l'afficher à Amélie.
        hidden: true,
        readOnly: true,
      }),
    ],
  })
}
