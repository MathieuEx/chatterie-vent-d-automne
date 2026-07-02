"use client";

import { useEffect } from "react";
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

export default function LanguageSwitcher() {
  useEffect(() => {
    patchDomForGoogleTranslate();

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
  }, []);

  return (
    <div className="language-switcher">
      <div id="google_translate_element" />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}
