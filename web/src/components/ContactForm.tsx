"use client";

import { useState, type SubmitEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <form name="contact" onSubmit={handleSubmit} className="contact-form">
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
