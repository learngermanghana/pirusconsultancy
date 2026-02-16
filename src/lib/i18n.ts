export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

const defaultLocale: Locale = "en";

const messages = {
  en: {
    nav: {
      links: [
        { href: "/", label: "Home" },
        { href: "/guidance", label: "Work Abroad" },
        { href: "/tours", label: "Tours" },
        { href: "/blog", label: "Resources" },
        { href: "/help", label: "Help" },
        { href: "/study-abroad-admissions", label: "Study Abroad" },
        { href: "/learn-german", label: "Learn German" },
        { href: "/about", label: "About & Founder" },
        { href: "/contact", label: "Contact" },
      ],
      cta: "Contact us",
      languageLabel: "Language",
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
      languageOptions: [
        { value: "en", label: "English" },
        { value: "de", label: "Deutsch" },
      ],
    },
    footer: {
      links: [
        { href: "/about", label: "About & Founder" },
        { href: "/tours", label: "Work Abroad Tours" },
        { href: "/success", label: "Success stories" },
        { href: "/blog", label: "Resource hub" },
        { href: "/help", label: "Help" },
        { href: "/contact", label: "Contact" },
        { href: "/germany-partner", label: "Germany Partner" },
      ],
      transparency:
        "⚠️ Transparency: We provide guidance & preparation support. We do not promise visas or guaranteed jobs.",
    },
    metadata: {
      title: "MyGermanyPath — Travel & Visa Consultancy",
      description:
        "Travel and visa consultancy for Germany, Schengen, and Australia — with real guidance, not false promises.",
    },
  },
  de: {
    nav: {
      links: [
        { href: "/", label: "Startseite" },
        { href: "/guidance", label: "Work Abroad" },
        { href: "/tours", label: "Touren" },
        { href: "/blog", label: "Ressourcen" },
        { href: "/help", label: "Hilfe" },
        { href: "/study-abroad-admissions", label: "Studium im Ausland" },
        { href: "/learn-german", label: "Deutsch lernen" },
        { href: "/about", label: "Über uns & Gründerin" },
        { href: "/contact", label: "Kontakt" },
      ],
      cta: "Kontakt",
      languageLabel: "Sprache",
      openMenuLabel: "Menü öffnen",
      closeMenuLabel: "Menü schließen",
      languageOptions: [
        { value: "en", label: "English" },
        { value: "de", label: "Deutsch" },
      ],
    },
    footer: {
      links: [
        { href: "/about", label: "Über uns & Gründerin" },
        { href: "/tours", label: "Work Abroad Touren" },
        { href: "/success", label: "Erfolgsgeschichten" },
        { href: "/blog", label: "Ressourcen" },
        { href: "/help", label: "Hilfe" },
        { href: "/contact", label: "Kontakt" },
        { href: "/germany-partner", label: "Partner in Deutschland" },
      ],
      transparency:
        "⚠️ Transparenz: Wir bieten Beratung und Vorbereitung. Wir versprechen keine Visa oder garantierten Jobs.",
    },
    metadata: {
      title: "MyGermanyPath — Reise- und Visa-Beratung",
      description:
        "Reise- und Visa-Beratung für Deutschland, Schengen und Australien — mit echten Schritten statt leeren Versprechen.",
    },
  },
} satisfies Record<Locale, unknown>;

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages[defaultLocale];
}

export function getLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const normalized = acceptLanguage.toLowerCase();
  if (normalized.includes("de")) {
    return "de";
  }

  return defaultLocale;
}

export function normalizeLocale(value: string | null | undefined): Locale {
  if (!value) {
    return defaultLocale;
  }

  const normalized = value.toLowerCase();
  if (normalized.startsWith("de")) {
    return "de";
  }

  return defaultLocale;
}
