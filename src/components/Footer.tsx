import Link from "next/link";

const quickLinks = [
  { href: "/study-in-germany", label: "Study in Germany" },
  { href: "/europe-pathways", label: "Europe Pathways" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const resources = [
  { href: "/blog", label: "Articles & Resources" },
  { href: "/assessment", label: "Free Assessment" },
  { href: "/learn-german", label: "Learn German (Falowen)" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">Pirus Consultancy</p>
          <p className="mt-2 text-sm text-slate-300">
            Honest, structured relocation support for students and young professionals moving to Germany and Europe.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">Resources</p>
          <ul className="mt-3 space-y-2 text-sm">
            {resources.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">Connect</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <a href="https://wa.me/4917620721491" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/pirusconsultancy/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://web.facebook.com/pursueconsultancy/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
