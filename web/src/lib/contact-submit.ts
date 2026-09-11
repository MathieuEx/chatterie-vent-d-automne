/**
 * Envoi du formulaire de contact.
 *
 * Deux acheminements possibles, choisis par `NEXT_PUBLIC_CONTACT_PROVIDER` :
 *
 * - `netlify` (défaut) — Netlify Forms. Les réponses arrivent dans le tableau
 *   de bord Netlify, qui prévient Amélie par e-mail. Aucun identifiant à
 *   configurer, ce qui règle le problème du formulaire resté muet faute de mot
 *   de passe d'application Gmail.
 * - `email` — l'ancienne route /api/contact, qui envoie via Gmail SMTP. À
 *   utiliser si le site quitte Netlify, ou en secours.
 */
export type ContactProvider = "netlify" | "email";

export const CONTACT_PROVIDER: ContactProvider =
  process.env.NEXT_PUBLIC_CONTACT_PROVIDER === "email" ? "email" : "netlify";

/** Chemin du formulaire déclaré à Netlify (voir public/__forms.html). */
const NETLIFY_FORM_ENDPOINT = "/__forms.html";
const NETLIFY_FORM_NAME = "contact";

export async function submitContactForm(
  data: Record<string, string>,
): Promise<boolean> {
  if (CONTACT_PROVIDER === "email") {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  }

  // Netlify attend un corps encodé comme un envoi de formulaire HTML classique,
  // accompagné du nom du formulaire déclaré au déploiement.
  const body = new URLSearchParams({ ...data, "form-name": NETLIFY_FORM_NAME });

  const res = await fetch(NETLIFY_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    // Sans cette trace, un échec ne laissait aucun indice : le visiteur voyait
    // un message d'erreur générique et la console restait muette. Les deux
    // causes courantes se distinguent par le code renvoyé.
    const hint =
      res.status === 404
        ? "formulaire non enregistré — activer « Form detection » dans Netlify puis redéployer"
        : res.status === 405
          ? "requête interceptée par Next.js au lieu de Netlify Forms"
          : "réponse inattendue de Netlify";
    console.error(`[contact] Envoi refusé (HTTP ${res.status}) : ${hint}`);
  }

  return res.ok;
}
