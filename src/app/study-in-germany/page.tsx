import type { Metadata } from "next";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import SectionHeader from "@/components/SectionHeader";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Study in Germany",
  description: "Direct university and Studienkolleg guidance, with Europe alternatives when needed.",
  openGraph: {
    title: "Study in Germany with Pirus Consultancy",
    description: "Plan direct university entry, Studienkolleg, and practical Europe alternatives in one place.",
  },
};

const directEntryGuidance = [
  {
    title: "Who qualifies",
    points: [
      "You need a recognized higher education entrance qualification (HZB) for your target program; some applicants must first attend Studienkolleg.",
      "A formal admission letter (or conditional admission) from a German university is the core requirement for a student visa.",
      "Proof of finances (blocked account, scholarship, or guarantor) and valid health insurance are mandatory for the visa.",
    ],
  },
  {
    title: "German level needed",
    points: [
      "German-taught degrees usually require B2 to C1 (proved by TestDaF, DSH, Goethe, or telc certificates).",
      "English-taught degrees often accept IELTS/TOEFL, but day-to-day life still needs at least A2/B1 for housing, bureaucracy, and work.",
      "If your admission is conditional on language prep, expect to show a clear plan and timeline for reaching the required level.",
    ],
  },
  {
    title: "Timeline",
    points: [
      "12–6 months before start: shortlist programs, confirm HZB recognition, and check uni-assist/APS requirements.",
      "6–3 months: apply, gather translations, secure blocked account funds, and book embassy appointments early.",
      "3–1 months: receive admission, buy insurance, submit visa, then prepare for arrival (housing + registration).",
    ],
  },
];

const studienkollegGuidance = [
  {
    title: "Who qualifies",
    points: [
      "If your school certificate is not a direct university entrance qualification in Germany, Studienkolleg is required.",
      "You must apply to a German university first and receive an invitation to the Studienkolleg entrance exam.",
      "Admission is limited and competitive; places are allocated by test score and subject track.",
    ],
  },
  {
    title: "German level needed",
    points: [
      "Most Studienkolleg programs require at least B1, often B2, before you can sit the entrance exam.",
      "Technical tracks (T/M/W/G/S) also expect strong math or subject knowledge alongside German.",
      "Plan for an intensive language course before applying if you are below the required level.",
    ],
  },
  {
    title: "Timeline",
    points: [
      "9–12 months: confirm HZB status, pick a track, and book language exams.",
      "6–3 months: apply to universities/Studienkollegs and prepare for the Aufnahmeprüfung.",
      "1–2 semesters: complete the program and pass the Feststellungsprüfung to start university.",
    ],
  },
];

const europeAlternatives = [
  "Alternative study destinations in Europe",
  "Admissions and document strategy",
  "Visa preparation support",
  "Relocation planning and travel readiness",
];

export default function StudyInGermanyPage() {
  const whatsappUrl = createWhatsAppLeadUrl({
    page: "study_in_germany",
    pathway: "study",
    intent: "Study in Germany and Europe pathways support",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Germany Pathway"
        title="Study in Germany (including Studienkolleg)"
        description="A combined overview of direct university entry, Studienkolleg preparation, and smart Europe alternatives when needed."
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">Direct university entry</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use this if your qualification already meets the German HZB requirements.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {directEntryGuidance.map((item) => (
            <div key={item.title} className="rounded-3xl border p-6">
              <p className="text-lg font-bold">{item.title}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">Studienkolleg path</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use this when your current qualification is not a direct university entrance credential.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {studienkollegGuidance.map((item) => (
            <div key={item.title} className="rounded-3xl border p-6">
              <p className="text-lg font-bold">{item.title}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900">Europe alternatives (when Germany is not immediately viable)</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {europeAlternatives.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 p-5 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <CaseStudiesSection />

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
