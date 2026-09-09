import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_CONFIG } from "@/lib/site-config";

const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT ?? SITE_CONFIG.email;

export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = (await request.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { name, email, message, "bot-field": botField } = data;

  // Piège à robots : on répond OK sans rien envoyer.
  if (botField) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide" }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  // Google affiche les mots de passe d'application par groupes de 4 ("abcd efgh
  // ijkl mnop") ; collés tels quels ils font échouer l'authentification.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!user || !pass) {
    // Sans cette trace, une variable d'environnement oubliée sur Vercel donnait
    // un formulaire qui « ne marche pas » sans le moindre indice.
    console.error(
      "[contact] Envoi impossible : GMAIL_USER et/ou GMAIL_APP_PASSWORD ne sont pas définis.",
    );
    return NextResponse.json(
      { error: "Le formulaire n'est pas configuré sur le serveur." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `Site ${SITE_CONFIG.name} <${user}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Nouveau message de ${name} via le site`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
  } catch (error) {
    console.error("[contact] Échec de l'envoi via Gmail :", error);
    return NextResponse.json({ error: "Échec de l'envoi" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
