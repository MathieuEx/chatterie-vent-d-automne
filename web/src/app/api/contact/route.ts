import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CONTACT_RECIPIENT = "ragdollamelie@gmail.com";

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, message, "bot-field": botField } = data as Record<string, string>;

  if (botField) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `Site Chatterie des Vents d'Automne <${process.env.GMAIL_USER}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Nouveau message de ${name} via le site`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
  } catch {
    return NextResponse.json({ error: "Échec de l'envoi" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
