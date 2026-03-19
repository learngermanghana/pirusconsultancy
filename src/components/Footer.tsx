"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { useLocale } from "@/components/LocaleProvider";
import { getMessages } from "@/lib/i18n";

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="transition hover:text-slate-900">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="transition hover:text-slate-900">
      {label}
    </Link>
  );
}

export default function Footer() {
  const { locale } = useLocale();
  const messages = getMessages(locale);
  const tagline = site.tagline[locale] ?? site.tagline.en;

  return (
    <footer className="border-t border-slate-200/80">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-900">{site.name}</p>
            <p className="text-sm text-slate-600">{tagline}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {messages.footer.links.map((link) => (
              <FooterLink key={`${link.href}-${link.label}`} href={link.href} label={link.label} />
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-500">{messages.footer.transparency}</div>
      </div>
    </footer>
  );
}
