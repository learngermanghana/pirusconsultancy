"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/study-in-germany", label: "Study in Germany" },
  { href: "/europe-pathways", label: "Europe Pathways" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900">
          Pirus Consultancy
        </Link>
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-1 text-sm md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {open ? (
        <nav className="space-y-2 border-t border-slate-200 px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
