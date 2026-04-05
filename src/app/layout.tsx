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
    "Pirus Consultancy supports students and young professionals relocating to Europe, with Germany as the primary pathway.",
  openGraph: {
    title: "Pirus Consultancy",
    description:
      "Structured support for study admissions, Germany pathways, and visa preparation with honest guidance.",
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
        <main className="mx-auto max-w-6xl px-4 py-8 md:py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
