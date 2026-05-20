import Link from "next/link";

const quickLinks = [
  { href: "/study-in-germany", label: "Pathways" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book Consultation" },
  { href: "/blog", label: "Blog" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/assessment", label: "Free Assessment" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">Pirus Consultancy</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Honest, structured relocation support for Ghanaians, Nigerians, and Africans planning Germany or Europe pathways.
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-400">
            We do not guarantee admission, scholarship, visa approval, or relocation success. We provide practical guidance and document support.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">Main Links</p>
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
              <a href="https://www.facebook.com/profile.php?id=61588442788460" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Facebook
              </a>
            </li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
