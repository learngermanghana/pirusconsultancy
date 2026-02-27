export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

const defaultLocale: Locale = "en";

const messages = {
  en: {
    nav: {
      links: [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Resources" },
        { href: "/comparisons", label: "Comparisons" },
        { href: "/study-abroad-admissions", label: "Study Abroad" },
        { href: "/learn-german", label: "Learn German" },
        { href: "/about", label: "About & Founder" },
        { href: "/contact", label: "Contact" },
      ],
      cta: "Contact us",
      adminLogin: "Admin login",
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
        { href: "/success", label: "Success stories" },
        { href: "/blog", label: "Resource hub" },
        { href: "/contact", label: "Contact" },
        { href: "https://www.facebook.com/profile.php?id=61588152793007", label: "Facebook" },
        { href: "/germany-partner", label: "Germany Partner" },
      ],
      transparency:
        "⚠️ Transparency: We provide guidance & preparation support. We do not promise visas or guaranteed jobs.",
      adminPortal: "Admin login",
    },
    metadata: {
      title: "Your Path to Global Travel — Travel & Visa Consultancy",
      description:
        "Travel and visa consultancy for Germany, Schengen, and Australia — with real guidance, not false promises.",
    },
  },
  de: {
    nav: {
      links: [
        { href: "/", label: "Startseite" },
        { href: "/blog", label: "Ressourcen" },
        { href: "/comparisons", label: "Vergleiche" },
        { href: "/study-abroad-admissions", label: "Study Abroad" },
        { href: "/learn-german", label: "Deutsch lernen" },
        { href: "/about", label: "Über uns & Gründerin" },
        { href: "/contact", label: "Kontakt" },
      ],
      cta: "Kontakt",
      adminLogin: "Admin-Login",
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
        { href: "/blog", label: "Ressourcen" },
        { href: "/contact", label: "Kontakt" },
        { href: "https://www.facebook.com/profile.php?id=61588152793007", label: "Facebook" },
        { href: "/germany-partner", label: "Partner in Deutschland" },
      ],
      transparency:
        "⚠️ Transparenz: Wir bieten Beratung und Vorbereitung. Wir versprechen keine Visa oder garantierten Jobs.",
      adminPortal: "Admin-Login",
    },
    metadata: {
      title: "Your Path to Global Travel — Reise- und Visa-Beratung",
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
