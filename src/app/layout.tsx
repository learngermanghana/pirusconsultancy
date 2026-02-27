import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { headers } from "next/headers";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getLocaleFromHeader, getMessages } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata() {
  const headersList = await headers();
  const locale = getLocaleFromHeader(headersList.get("accept-language"));
  const { metadata } = getMessages(locale);
  const baseUrl = `https://${site.domain}`;

  return {
    metadataBase: new URL(baseUrl),
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      url: baseUrl,
      siteName: site.name,
      images: [{ url: "/images/study.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["/images/study.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = getLocaleFromHeader(headersList.get("accept-language"));

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `https://${site.domain}`,
    sameAs: ["https://www.facebook.com/profile.php?id=61588152793007"],
    description: "Travel, visa, and study-abroad advisory for applicants in Ghana.",
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 antialiased"
        suppressHydrationWarning
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <LocaleProvider initialLocale={locale}>
          <Nav />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
