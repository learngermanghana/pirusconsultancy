import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { getSedifexServices } from "@/lib/sedifex";

export const metadata: Metadata = {
  title: "Services",
  description: "Consultation packages and relocation support services updated from Sedifex.",
  openGraph: {
    title: "Services | Pirus Consultancy",
    description: "Browse admissions, visa, and relocation support packages.",
  },
};

export default async function ServicesPage() {
  const services = await getSedifexServices();

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Services"
        title="Consultation packages designed for clear outcomes"
        description="Choose a service and continue to online booking. This page pulls Sedifex items where item type is service."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{service.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            {service.price ? <p className="mt-3 text-sm font-semibold text-slate-900">{service.price}</p> : null}
            <Link href={`/booking?service=${encodeURIComponent(service.id)}`} className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              {service.ctaLabel ?? "Book this service"}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
