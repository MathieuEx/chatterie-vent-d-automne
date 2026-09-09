import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Rafraîchit le site dès qu'Amélie publie dans Sanity.
 *
 * Sans ce déclencheur, les pages sont regénérées au plus toutes les heures
 * (`revalidate = 3600`) : une correction de prix ou une nouvelle portée pouvait
 * mettre 60 minutes à apparaître.
 *
 * À brancher dans Sanity → Manage → API → Webhooks :
 *   URL     : https://<domaine>/api/revalidate
 *   Trigger : Create, Update, Delete
 *   Secret  : la même valeur que la variable d'environnement SANITY_WEBHOOK_SECRET
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[revalidate] SANITY_WEBHOOK_SECRET n'est pas défini.");
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 503 });
  }

  // Sanity envoie le secret dans cet en-tête quand il est renseigné côté webhook.
  const provided =
    request.headers.get("sanity-webhook-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json({ error: "Secret invalide" }, { status: 401 });
  }

  // Tout le contenu vient du même CMS : on purge l'ensemble du site, ce qui
  // évite d'avoir à deviner quelles pages dépendent du document modifié.
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, at: Date.now() });
}
