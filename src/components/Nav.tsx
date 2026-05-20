"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/study-in-germany", label: "Pathways" },
  { href: "/services", label: "Services" },
  { href: "/events", label: "Events" },
  { href: "/assessment", label: "Assessment" },
  { href: "/blog", label: "Blog" },
];

const pathwayLinks = [
  { href: "/study-in-germany", label: "Study in Germany" },
  { href: "/relocate-to-europe-from-ghana", label: "From Ghana" },
  { href: "/relocate-to-europe-from-nigeria", label: "From Nigeria" },
  { href: "/europe-pathways", label: "Europe alternatives" },
];

function isActive(pathname: string, href: string) {
  if (href === "/study-in-germany") {
    return pathname === href || pathname.includes("relocate-to-europe") || pathname.includes("europe-pathways");
  }
  return pathname === href;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [pathwaysOpen, setPathwaysOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <a href="#main-content" className="sr-only absolute left-4 top-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white focus:not-sr-only">
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
          <Image src="/images/pirus-logo.svg" alt="Pirus Consultancy logo" width={36} height={36} className="h-9 w-9 rounded object-cover" priority />
          <span className="truncate">Pirus Consultancy</span>
        </Link>

        <button type="button" className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-site-nav">
          {open ? "Close" : "Menu"}
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            if (link.href === "/study-in-germany") {
              return (
                <div key={link.href} className="group relative">
                  <Link href={link.href} className={`rounded-full px-3 py-2 text-sm font-semibold transition ${active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"}`} aria-current={active ? "page" : undefined}>
                    {link.label}
                  </Link>
                  <div className="invisible absolute left-0 top-full z-20 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                    {pathwayLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link key={link.href} href={link.href} className={`rounded-full px-3 py-2 text-sm font-semibold transition ${active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"}`} aria-current={active ? "page" : undefined}>
                {link.label}
              </Link>
            );
          })}
          <Link href="/booking" className="ml-2 rounded-full bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-200">
            Book
          </Link>
        </nav>
      </div>

      {open ? (
        <nav id="mobile-site-nav" className="space-y-2 border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            if (link.href === "/study-in-germany") {
              return (
                <div key={link.href} className="rounded-xl border border-slate-200 p-2">
                  <button type="button" className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold ${active ? "bg-slate-900 text-white" : "text-slate-800"}`} onClick={() => setPathwaysOpen((value) => !value)}>
                    Pathways <span>{pathwaysOpen ? "−" : "+"}</span>
                  </button>
                  {pathwaysOpen ? (
                    <div className="mt-2 space-y-1">
                      {pathwayLinks.map((item) => (
                        <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }
            return (
              <Link key={link.href} href={link.href} className={`block rounded-xl px-3 py-2 text-sm font-semibold ${active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"}`} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined}>
                {link.label}
              </Link>
            );
          })}
          <Link href="/booking" className="block rounded-xl bg-amber-300 px-3 py-3 text-center text-sm font-bold text-slate-950" onClick={() => setOpen(false)}>
            Book Consultation
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
