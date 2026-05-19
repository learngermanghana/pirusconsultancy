"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/study-in-germany", label: "Study in Germany" },
  { href: "/services", label: "Services" },
  { href: "/assessment", label: "Assessment" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only absolute left-4 top-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white focus:not-sr-only"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">
          <Image
            src="/images/pirus-logo.svg"
            alt="Pirus Consultancy logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded object-cover"
            priority
          />
          <span>Pirus Consultancy</span>
        </Link>
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-1 text-sm md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-site-nav"
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-slate-950 underline decoration-2 underline-offset-4" : "text-slate-700 hover:text-slate-950"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {open ? (
        <nav id="mobile-site-nav" className="space-y-2 border-t border-slate-200 px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded px-2 py-1 text-sm font-medium ${
                pathname === link.href ? "bg-slate-100 text-slate-950" : "text-slate-700"
              }`}
              onClick={() => setOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
