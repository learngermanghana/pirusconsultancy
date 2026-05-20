import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pirusconsultancy.com"),
  title: {
    default: "Pirus Consultancy | Germany & Europe Relocation Guidance",
    template: "%s | Pirus Consultancy",
  },
  description:
    "Pirus Consultancy supports Ghanaian students and young professionals relocating to Germany and wider Europe, with Germany as the primary pathway.",
  keywords: [
    "Ghana to Germany travel support",
    "Ghana to Europe relocation",
    "travel to Europe from Ghana",
    "Germany visa guidance Ghana",
    "study in Germany from Ghana",
    "Europe relocation consultancy",
    "Ghanaian students in Germany",
    "Pirus Consultancy",
  ],
  icons: {
    icon: [
      { url: "/images/pirus-logo.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/images/pirus-logo.svg", type: "image/svg+xml", sizes: "192x192" },
    ],
    apple: [{ url: "/images/pirus-logo.svg", sizes: "180x180", type: "image/svg+xml" }],
    shortcut: ["/images/pirus-logo.svg"],
  },
  openGraph: {
    title: "Pirus Consultancy",
    description:
      "Structured support for Ghanaian applicants pursuing study admissions, Germany pathways, and Europe travel preparation with honest guidance.",
    url: "https://pirusconsultancy.com",
    siteName: "Pirus Consultancy",
    type: "website",
    images: [{ url: "/images/study.jpg", width: 1200, height: 630, alt: "Pirus Consultancy" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Nav />
        <main id="main-content" className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          {children}
        </main>
        <a
          href="https://sedifex.com/join-customers/f2e11386cba94eeeb11fe525"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-50 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
        >
          Join our mailing list
        </a>
        <Footer />
      </body>
    </html>
  );
}
