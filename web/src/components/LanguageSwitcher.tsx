"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateOf, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

/**
 * Bascule français / anglais.
 *
 * Remplace l'ancien widget Google Translate, qui traduisait la page côté
 * navigateur : invisible pour les moteurs de recherche, et il obligeait à
 * remplacer `removeChild`/`insertBefore` sur tout le document pour éviter que
 * React ne plante. Ici, chaque langue a ses propres URL, donc de vrais liens.
 */
const LANGUAGES: { code: Locale; label: string; short: string }[] = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
];

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const t = getDictionary(locale).nav;

  return (
    <div className="language-switcher" aria-label={t.changeLanguage}>
      {LANGUAGES.map((language) => {
        const isCurrent = language.code === locale;

        return isCurrent ? (
          <span
            key={language.code}
            className="language-switcher__link language-switcher__link--current"
            aria-current="true"
          >
            {language.short}
          </span>
        ) : (
          <Link
            key={language.code}
            href={alternateOf(pathname, language.code)}
            className="language-switcher__link"
            hrefLang={language.code}
            lang={language.code}
            // Les deux langues ont des layouts racine distincts (<html lang>
            // différent) : la navigation client de Next ne peut pas franchir
            // cette frontière, on force donc un chargement de page complet.
            prefetch={false}
          >
            {language.short}
          </Link>
        );
      })}
    </div>
  );
}
