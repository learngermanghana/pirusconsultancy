import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { getSedifexProducts } from "@/lib/sedifex";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Services",
  description: "Consultation packages and relocation support services updated from Sedifex.",
  openGraph: {
    title: "Services | Pirus Consultancy",
    description: "Browse admissions, visa, and relocation support packages.",
  },
};

export default async function ServicesPage() {
  const products = await getSedifexProducts();
  const whatsappUrl = createWhatsAppLeadUrl({
    page: "services",
    pathway: "general",
    intent: "Service package inquiry",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Services"
        title="Consultation packages designed for clear outcomes"
        description="These offers are synced from Sedifex, so your team can update packages without changing code."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{product.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{product.description}</p>
            {product.price ? <p className="mt-3 text-sm font-semibold text-slate-900">{product.price}</p> : null}
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              {product.ctaLabel ?? "Chat on WhatsApp"}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
