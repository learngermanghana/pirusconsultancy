import type { Metadata } from "next";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import SectionHeader from "@/components/SectionHeader";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Study in Germany",
  description: "Admissions, application, and visa preparation support for students planning to study in Germany.",
  openGraph: {
    title: "Study in Germany with Pirus Consultancy",
    description: "Get structured guidance from profile review to visa readiness.",
  },
};

const points = [
  "Program and university selection support",
  "SOP, motivation letter, and CV review",
  "Application documentation checks",
  "Visa document preparation support",
  "Mock interview and pre-departure planning",
];

export default function StudyInGermanyPage() {
  const whatsappUrl = createWhatsAppLeadUrl({
    page: "study_in_germany",
    pathway: "study",
    intent: "Study in Germany support",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Germany Pathway"
        title="Study in Germany with a clear, step-by-step plan"
        description="We guide you through program selection, applications, and visa preparation with transparent support."
      />

      <div className="rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">What we support</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {points.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-slate-50 p-6">
        <h3 className="text-base font-semibold text-slate-900">Need German language preparation?</h3>
        <p className="mt-2 text-sm text-slate-600">
          We can guide you to the right preparation path, including the Falowen learning option.
        </p>
        <Link href="/learn-german" className="mt-3 inline-block text-sm font-semibold text-slate-900 underline">
          Explore Learn German options
        </Link>
      </div>

      <PrimaryCta whatsappHref={whatsappUrl} consultationHref="/contact" />
    </div>
  );
}
