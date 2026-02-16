"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { getMessages, Locale } from "@/lib/i18n";

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-nowrap text-sm text-slate-600 transition hover:text-slate-900"
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="whitespace-nowrap text-sm text-slate-600 transition hover:text-slate-900" onClick={onClick}>
      {label}
    </Link>
  );
}

export default function Nav() {
  const { locale, setLocale } = useLocale();
  const messages = getMessages(locale);
  const [isOpen, setIsOpen] = useState(false);

  // When the mobile navigation menu is open, prevent the body from scrolling
  // to improve the user experience on small screens. When the menu closes or
  // the component unmounts, restore the body scroll. The guard for
  // `document` ensures this runs only in the browser.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  return (
    <header className="relative sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-slate-900">
          MyGermanyPath
        </Link>

        {/* Desktop navigation: horizontally scrollable if there are many links. */}
        <nav
          className="hidden flex-auto items-center gap-4 overflow-x-auto whitespace-nowrap px-6 md:flex lg:gap-5"
          aria-label="Primary"
        >
          {messages.nav.links.map((l) => (
            <NavLink key={`${l.href}-${l.label}`} href={l.href} label={l.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <label className="sr-only" htmlFor="locale-select">
            {messages.nav.languageLabel}
          </label>
          <select
            id="locale-select"
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 shadow-sm"
            value={locale}
            onChange={(event) => setLocale(event.target.value as Locale)}
          >
            {messages.nav.languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Link
            href="/contact"
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            {messages.nav.cta}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:text-slate-900 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">
            {isOpen ? messages.nav.closeMenuLabel : messages.nav.openMenuLabel}
          </span>
          <div className="flex h-5 w-5 flex-col items-center justify-center gap-1">
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>
      {isOpen ? (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-40 border-t border-slate-200/80 bg-white/95 px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3">
            {messages.nav.links.map((l) => (
              <NavLink key={`${l.href}-${l.label}`} href={l.href} label={l.label} onClick={() => setIsOpen(false)} />
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="mobile-locale-select">
              {messages.nav.languageLabel}
            </label>
            <select
              id="mobile-locale-select"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
            >
              {messages.nav.languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Link
              href="/contact"
              className="rounded-xl bg-sky-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              onClick={() => setIsOpen(false)}
            >
              {messages.nav.cta}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
