import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import PrimaryCta from "@/components/PrimaryCta";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Study in Germany from Africa | Pirus Consultancy",
  description:
    "Admissions and visa preparation support for African students who want to study in Germany with a realistic, profile-based strategy.",
};

const checklist = [
  "Program and intake selection support",
  "SOP, CV, and application document review",
  "Financial proof and blocked account planning guidance",
  "Visa interview and pre-departure readiness",
];

export default function StudyInGermanyFromAfricaPage() {
  const whatsappHref = createWhatsAppLeadUrl({
    page: "study-in-germany-from-africa",
    pathway: "study",
    intent: "Study in Germany from Africa",
  });

  return (
    <div className="space-y-10 pb-8">
      <section className="rounded-3xl bg-slate-950 px-6 py-10 text-white md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Africa to Germany student pathway</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">Study in Germany from Africa with structured support</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-200 md:text-base">
          From school selection to visa readiness, we help you avoid guesswork and move step by step with practical guidance.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow="Core Support" title="What we help you prepare" />
        <div className="grid gap-3 md:grid-cols-2">
          {checklist.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-6">
        <SectionHeader
          eyebrow="Get Started"
          title="Build your Germany study plan"
          description="Message us on WhatsApp or book a consultation to review your profile and next actions."
        />
        <div className="mt-5">
          <PrimaryCta whatsappHref={whatsappHref} consultationHref="/contact" />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Looking for wider options? <Link href="/europe-pathways" className="font-semibold text-slate-900 underline">Explore Europe pathways</Link>.
        </p>
      </section>
    </div>
  );
}
