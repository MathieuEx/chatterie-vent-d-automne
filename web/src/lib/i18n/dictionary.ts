import type { Locale } from "./config";

/**
 * Étiquettes d'interface. Tout ce qui est rédactionnel (descriptions, FAQ,
 * histoire d'Amélie…) vit dans Sanity, pas ici — ce dictionnaire ne couvre que
 * les mots du site lui-même, que le CMS n'a pas à gérer.
 */
const DICTIONARY = {
  fr: {
    nav: {
      home: "Accueil",
      cats: "Nos Chats",
      kittens: "Nos Chatons",
      news: "Actualités",
      faq: "FAQ",
      contact: "Contact",
      cta: "Nous contacter",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      changeLanguage: "Changer de langue",
    },
    cat: {
      male: "Mâle",
      female: "Femelle",
      retired: "Retraité",
      males: "Mâles",
      females: "Femelles",
      noMales: "Aucun mâle référencé pour le moment.",
      noFemales: "Aucune femelle référencée pour le moment.",
      genetics: "Données génétiques",
      gallery: "Galerie",
      backToCats: "← Tous nos chats",
      contactAbout: (name: string) => `Nous contacter à propos de ${name}`,
      seeAll: "Voir tous nos chats →",
    },
    litter: {
      bornOn: "Née le",
      expectedOn: "Naissance prévue le",
      available: (available: number, total: number) =>
        `${available} / ${total} chaton(s) disponible(s)`,
      reserved: (count: number) => `${count} réservé(s)`,
      waitingList: "Inscriptions sur liste d'attente ouvertes",
      backToKittens: "← Toutes nos portées",
      contactAbout: "Nous contacter à propos de cette portée",
      seeAll: "Voir toutes les portées →",
      none: "Aucune portée annoncée pour le moment. Contactez-nous pour être informé(e) des prochaines naissances.",
    },
    status: {
      a_venir: "À venir",
      disponible: "Disponible",
      option: "Option",
      reserve: "Réservé",
      adopte: "Dans sa nouvelle famille",
    },
    news: {
      backToNews: "← Toutes les actualités",
      none: "Aucune actualité pour le moment.",
      readMore: "Lire la suite →",
    },
    form: {
      name: "Nom",
      email: "Email",
      message: "Message",
      submit: "Envoyer le message",
      sending: "Envoi en cours...",
      sent: "Message envoyé ✓",
      success: "Merci, nous vous répondrons rapidement.",
      error:
        "Une erreur est survenue et votre message n'est pas parti. Merci de nous écrire directement :",
      honeypot: "Ne pas remplir si vous êtes humain :",
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      emailLabel: "Email",
      terms: "Modalités d'adoption",
    },
    footer: {
      navigation: "Navigation",
      contact: "Contact",
      legal: "Légal",
      legalNotice: "Mentions légales",
      privacy: "Politique de confidentialité",
      privacyShort: "Confidentialité",
      mediator: "Médiateur",
      tagline:
        "Élevage familial de chats Ragdoll à Toulouse, dans le respect de la santé et du bien-être de nos chats.",
    },
    notFound: {
      title: "Page introuvable",
      backHome: "Retour à l'accueil",
    },
  },

  en: {
    nav: {
      home: "Home",
      cats: "Our Cats",
      kittens: "Our Kittens",
      news: "News",
      faq: "FAQ",
      contact: "Contact",
      cta: "Get in touch",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      changeLanguage: "Change language",
    },
    cat: {
      male: "Male",
      female: "Female",
      retired: "Retired",
      males: "Males",
      females: "Females",
      noMales: "No males listed at the moment.",
      noFemales: "No females listed at the moment.",
      genetics: "Genetic data",
      gallery: "Gallery",
      backToCats: "← All our cats",
      contactAbout: (name: string) => `Get in touch about ${name}`,
      seeAll: "See all our cats →",
    },
    litter: {
      bornOn: "Born on",
      expectedOn: "Expected on",
      available: (available: number, total: number) =>
        `${available} of ${total} kitten${total > 1 ? "s" : ""} available`,
      reserved: (count: number) => `${count} reserved`,
      waitingList: "Waiting list now open",
      backToKittens: "← All our litters",
      contactAbout: "Get in touch about this litter",
      seeAll: "See all litters →",
      none: "No litter announced at the moment. Get in touch to hear about upcoming births.",
    },
    status: {
      a_venir: "Expected",
      disponible: "Available",
      option: "On hold",
      reserve: "Reserved",
      adopte: "In their new home",
    },
    news: {
      backToNews: "← All news",
      none: "No news yet.",
      readMore: "Read more →",
    },
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
      sending: "Sending...",
      sent: "Message sent ✓",
      success: "Thank you, we will get back to you shortly.",
      error:
        "Something went wrong and your message was not sent. Please email us directly:",
      honeypot: "Do not fill in if you are human:",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      terms: "Adoption terms",
    },
    footer: {
      navigation: "Navigation",
      contact: "Contact",
      legal: "Legal",
      legalNotice: "Legal notice",
      privacy: "Privacy policy",
      privacyShort: "Privacy",
      mediator: "Mediator",
      tagline:
        "A family-run Ragdoll cattery in Toulouse, France, devoted to the health and wellbeing of our cats.",
    },
    notFound: {
      title: "Page not found",
      backHome: "Back to home",
    },
  },
} as const;

export type Dictionary = (typeof DICTIONARY)["fr"];

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARY[locale] as Dictionary;
}

/** Code de langue complet, pour <html lang> et le formatage des dates. */
export const HTML_LANG: Record<Locale, string> = {
  fr: "fr",
  en: "en",
};

export const DATE_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
};
