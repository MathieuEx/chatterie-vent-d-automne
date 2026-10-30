import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Envoi du formulaire de contact via Web3Forms.
 *
 * Le site est exporté en pages statiques : il n'a plus de serveur pour envoyer
 * un e-mail. Le navigateur poste donc directement chez Web3Forms, qui transmet
 * le message à l'adresse réglée dans son tableau de bord (app.web3forms.com).
 *
 * La clé d'accès est publique par conception : elle désigne seulement la boîte
 * de destination et ne donne accès à rien d'autre.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export async function submitContactForm(
  data: Record<string, string>,
): Promise<boolean> {
  const { "bot-field": botField, ...fields } = data;

  // Piège à robots : on fait croire à un envoi réussi sans rien transmettre.
  if (botField) {
    return true;
  }

  if (!WEB3FORMS_KEY) {
    // Sans cette trace, une variable oubliée dans Cloudflare donnait un
    // formulaire qui « ne marche pas » sans le moindre indice.
    console.error(
      "[contact] Envoi impossible : NEXT_PUBLIC_WEB3FORMS_KEY n'était pas défini au moment du build.",
    );
    return false;
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...fields,
      access_key: WEB3FORMS_KEY,
      subject: `Nouveau message de ${fields.name} via le site`,
      from_name: `Site ${SITE_CONFIG.name}`,
      // Web3Forms écarte d'office les envois où ce champ est coché.
      botcheck: false,
    }),
  });

  // Le corps indique si l'envoi est accepté et, sinon, pourquoi (clé invalide,
  // quota atteint…) : plus parlant que le seul code HTTP.
  const result = (await res.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (!result?.success) {
    console.error(
      `[contact] Envoi refusé par Web3Forms (HTTP ${res.status}) : ${result?.message ?? "réponse illisible"}`,
    );
    return false;
  }

  return true;
}
