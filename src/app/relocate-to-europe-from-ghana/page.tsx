import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import PrimaryCta from "@/components/PrimaryCta";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Relocate to Europe from Ghana | Pirus Consultancy",
  description:
    "Practical relocation support for Ghanaians targeting Germany and other EU destinations through study, Ausbildung, or work pathways.",
};

const highlights = [
  "Guidance for WAEC and tertiary transcripts",
  "Blocked account preparation guidance for Germany routes",
  "Visa interview readiness for Ghanaian applicants",
  "Backup EU alternatives when Germany is not the best first step",
];

export default function RelocateFromGhanaPage() {
  const whatsappHref = createWhatsAppLeadUrl({
    page: "relocate-to-europe-from-ghana",
    pathway: "europe",
    intent: "Relocate to Europe from Ghana",
  });

  return (
    <div className="space-y-10 pb-8">
      <section className="rounded-3xl bg-slate-950 px-6 py-10 text-white md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Ghana to Europe pathways</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">Relocate to Europe from Ghana with confidence</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-200 md:text-base">
          We map your best-fit pathway, organize your document process, and help you prepare for admissions and visa steps with clear priorities.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow="Support Areas" title="Tailored for Ghanaian applicants" />
        <div className="grid gap-3 md:grid-cols-2">
          {highlights.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-6">
        <SectionHeader
          eyebrow="Book Guidance"
          title="Plan your next move in one call"
          description="Message us for a personalized roadmap and practical timeline."
        />
        <div className="mt-5">
          <PrimaryCta whatsappHref={whatsappHref} consultationHref="/contact" />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Applying from Nigeria? <Link href="/relocate-to-europe-from-nigeria" className="font-semibold text-slate-900 underline">See the Nigeria page</Link>.
        </p>
      </section>
    </div>
  );
}
