"use client";

import { useState, type SubmitEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: FormData) {
  return new URLSearchParams(data as unknown as Record<string, string>).toString();
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="contact-form"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ position: "absolute", left: "-9999px", width: 0, height: 0, opacity: 0 }}>
        <label>
          Ne pas remplir si vous êtes humain : <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" type="text" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div className="form-group form-group--full">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`btn-submit ${status === "success" ? "btn-submit--success" : ""}`}
      >
        {status === "submitting"
          ? "Envoi en cours..."
          : status === "success"
            ? "Message envoyé ✓"
            : "Envoyer le message"}
      </button>

      {status === "success" && (
        <p className="form-note">Merci, nous vous répondrons rapidement.</p>
      )}
      {status === "error" && (
        <p className="form-note" style={{ color: "var(--terracotta-dark)" }}>
          Une erreur est survenue. Merci de réessayer ou de nous contacter directement par
          email.
        </p>
      )}
    </form>
  );
}
