import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import PrimaryCta from "@/components/PrimaryCta";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Relocate to Europe from Nigeria | Pirus Consultancy",
  description:
    "Structured relocation guidance for Nigerians planning study, Ausbildung, or work pathways to Germany and other EU destinations.",
};

const focusAreas = [
  "Profile-based route selection (student, graduate, professional)",
  "WAEC/NECO and transcript-ready document guidance",
  "Visa interview preparation for Nigerian applicants",
  "Germany-first strategy with practical EU alternatives",
];

export default function RelocateFromNigeriaPage() {
  const whatsappHref = createWhatsAppLeadUrl({
    page: "relocate-to-europe-from-nigeria",
    pathway: "europe",
    intent: "Relocate to Europe from Nigeria",
  });

  return (
    <div className="space-y-10 pb-8">
      <section className="rounded-3xl bg-slate-950 px-6 py-10 text-white md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Nigeria to Europe pathways</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">Relocate to Europe from Nigeria with a clear plan</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-200 md:text-base">
          We help you choose realistic pathways, prepare your documents correctly, and show up ready for each stage of the process.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow="What You Get" title="Built for Nigerian applicants" />
        <div className="grid gap-3 md:grid-cols-2">
          {focusAreas.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-6">
        <SectionHeader
          eyebrow="Next Step"
          title="Start with one focused consultation"
          description="Get your personalized action plan and a checklist for your next move."
        />
        <div className="mt-5">
          <PrimaryCta whatsappHref={whatsappHref} consultationHref="/contact" />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Also exploring Ghana routes? <Link href="/relocate-to-europe-from-ghana" className="font-semibold text-slate-900 underline">See the Ghana page</Link>.
        </p>
      </section>
    </div>
  );
}
