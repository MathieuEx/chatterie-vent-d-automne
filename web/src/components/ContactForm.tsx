"use client";

import { useState, type SubmitEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  locale: Locale;
  intro?: string;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  /** Adresse proposée en secours si l'envoi échoue. */
  fallbackEmail: string;
};

export default function ContactForm({
  locale,
  intro,
  submitLabel,
  successMessage,
  errorMessage,
  fallbackEmail,
}: Props) {
  const t = getDictionary(locale).form;
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
      {intro && <p className="body-text-sm">{intro}</p>}

      <p style={{ position: "absolute", left: "-9999px", width: 0, height: 0, opacity: 0 }}>
        <label>
          {t.honeypot}{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">{t.name}</label>
          <input id="name" name="name" type="text" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">{t.email}</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div className="form-group form-group--full">
          <label htmlFor="message">{t.message}</label>
          <textarea id="message" name="message" rows={5} required />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`btn-submit ${status === "success" ? "btn-submit--success" : ""}`}
      >
        {status === "submitting"
          ? t.sending
          : status === "success"
            ? t.sent
            : (submitLabel ?? t.submit)}
      </button>

      {status === "success" && (
        <p className="form-note">
          {successMessage ?? t.success}
        </p>
      )}

      {status === "error" && (
        <p className="form-note" style={{ color: "var(--terracotta-dark)" }}>
          {errorMessage ?? t.error}{" "}
          <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a>
        </p>
      )}
    </form>
  );
}
