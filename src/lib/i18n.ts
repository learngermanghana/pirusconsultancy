export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

const defaultLocale: Locale = "en";

const messages = {
  en: {
    nav: {
      links: [
        { href: "/", label: "Home" },
        { href: "/ausbildung-germany", label: "Ausbildung" },
        { href: "/study-germany", label: "Study" },
        { href: "/work-in-germany", label: "Work" },
        { href: "/help", label: "Help & FAQ" },
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
        { href: "/success", label: "Success" },
        { href: "/help", label: "Help & FAQ" },
        { href: "/contact", label: "Contact" },
        { href: "/germany-partner", label: "Germany Partner" },
      ],
      transparency:
        "⚠️ Transparency: We provide guidance & preparation support. We do not promise visas or guaranteed jobs.",
    },
    metadata: {
      title: "MyGermanyPath — Study, Ausbildung, and Work Guidance",
      description:
        "Study, Ausbildung, and Work guidance for Germany — with real steps, not false promises.",
    },
  },
  de: {
    nav: {
      links: [
        { href: "/", label: "Startseite" },
        { href: "/ausbildung-germany", label: "Ausbildung" },
        { href: "/study-germany", label: "Studium" },
        { href: "/work-in-germany", label: "Arbeit" },
        { href: "/help", label: "Hilfe & FAQ" },
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
        { href: "/success", label: "Erfolgsgeschichten" },
        { href: "/help", label: "Hilfe & FAQ" },
        { href: "/contact", label: "Kontakt" },
        { href: "/germany-partner", label: "Partner in Deutschland" },
      ],
      transparency:
        "⚠️ Transparenz: Wir bieten Beratung und Vorbereitung. Wir versprechen keine Visa oder garantierten Jobs.",
    },
    metadata: {
      title: "MyGermanyPath — Beratung zu Studium, Ausbildung und Arbeit",
      description:
        "Beratung zu Studium, Ausbildung und Arbeit in Deutschland — mit echten Schritten statt leeren Versprechen.",
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
