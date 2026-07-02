"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: Record<string, unknown>,
          elementId: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
    __gtPatched?: boolean;
  }
}

// Google Translate's widget rewrites text nodes directly in the DOM, which can
// make React crash on removeChild/insertBefore during unrelated re-renders.
// This patch makes both operations no-ops when the node has already moved,
// instead of throwing.
function patchDomForGoogleTranslate() {
  if (window.__gtPatched) return;
  window.__gtPatched = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

const LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

// Google's widget exposes a hidden <select class="goog-te-combo"> that
// drives the actual translation — changing it programmatically is the
// standard way to trigger a translation from a custom-styled control.
function setGoogleTranslateLanguage(code: string) {
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!select) return;
  select.value = code;
  select.dispatchEvent(new Event("change"));
}

// Google injects its own <style>/inline styles for the "Traduit en : ..."
// banner *after* ours load, so a plain CSS rule loses the cascade. Instead,
// actively re-hide the banner iframe and undo the body offset it applies,
// every time Google touches the DOM.
function watchAndHideBanner() {
  const enforce = () => {
    const banner = document.querySelector<HTMLIFrameElement>(".goog-te-banner-frame");
    if (banner && banner.style.display !== "none") {
      banner.style.display = "none";
    }
    if (document.body.style.top && document.body.style.top !== "0px") {
      document.body.style.top = "0px";
    }
  };

  const observer = new MutationObserver(enforce);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style"],
  });
  enforce();

  return observer;
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    patchDomForGoogleTranslate();
    const observer = watchAndHideBanner();

    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "fr",
          includedLanguages: "en,es",
          layout: 0, // InlineLayout.SIMPLE
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const handleSelect = (code: string) => {
    setGoogleTranslateLanguage(code);
    setOpen(false);
  };

  return (
    <div className="language-switcher" ref={rootRef}>
      {/* Google's widget stays mounted (it performs the actual translation)
          but is visually hidden — the page shows a custom icon trigger instead. */}
      <div id="google_translate_element" className="language-switcher__google" aria-hidden="true" />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      <button
        type="button"
        className="language-switcher__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-label="Traduire la page"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
        </svg>
      </button>

      {open && (
        <div className="language-switcher__menu" role="menu">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="menuitem"
              onClick={() => handleSelect(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
