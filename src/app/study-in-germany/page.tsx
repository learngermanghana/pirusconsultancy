import type { Metadata } from "next";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import SectionHeader from "@/components/SectionHeader";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Study in Germany from Ghana or Nigeria",
  description:
    "Practical study-in-Germany guidance for Ghanaians, Nigerians, and Africans: admission checks, Studienkolleg, Ausbildung alternatives, visa documents, and consultation booking.",
  openGraph: {
    title: "Study in Germany from Ghana or Nigeria | Pirus Consultancy",
    description:
      "Plan your Germany study pathway with realistic document checks, admission strategy, visa preparation, and Europe alternatives for African applicants.",
  },
};

const audienceCards = [
  {
    title: "Ghanaian applicants",
    text: "We help you understand how WAEC/WASSCE, HND, diploma, degree, transcripts, and financial proof may affect your Germany study route.",
  },
  {
    title: "Nigerian applicants",
    text: "We support NECO/WAEC, OND/HND, university transcripts, document review, admission planning, and visa readiness for Germany or Europe alternatives.",
  },
  {
    title: "Other African applicants",
    text: "If Germany is not immediately possible, we help you compare realistic alternatives without giving false promises or shortcuts.",
  },
];

const pathwayOptions = [
  {
    title: "Direct university admission",
    bestFor: "Applicants whose certificate and previous studies meet German university entrance requirements.",
    action: "We check your profile, program fit, documents, and application route before you waste money applying blindly.",
  },
  {
    title: "Studienkolleg route",
    bestFor: "Applicants whose school certificate is not enough for direct university admission in Germany.",
    action: "We help you understand entrance exams, German language requirements, subject tracks, and realistic timelines.",
  },
  {
    title: "Ausbildung route",
    bestFor: "Applicants who prefer vocational training and work-based pathways instead of a university degree route.",
    action: "We review language level, CV, motivation, documents, and whether your profile is suitable for Ausbildung applications.",
  },
  {
    title: "Europe alternative route",
    bestFor: "Applicants who want to relocate but may not be ready for Germany immediately.",
    action: "We compare possible study or relocation routes in other European countries based on your budget, documents, and goals.",
  },
];

const documentChecklist = [
  "Passport and personal details",
  "WAEC/NECO/WASSCE or secondary school certificate",
  "Diploma, HND, bachelor degree, or transcript if available",
  "CV in the correct format",
  "Motivation letter or SOP",
  "German or English language proof if required",
  "Financial proof plan, including blocked account or sponsor route",
  "Previous refusals or visa history, if any",
];

const commonMistakes = [
  "Choosing a program before checking whether your qualification is accepted.",
  "Assuming every German university accepts every African certificate directly.",
  "Ignoring German language requirements until it is too late.",
  "Paying random agents before understanding your exact pathway.",
  "Applying without a proper visa document and financial proof strategy.",
  "Only focusing on Germany when a Europe alternative may be more realistic first.",
];

const consultationSteps = [
  "We review your education background and country-specific documents.",
  "We identify whether direct admission, Studienkolleg, Ausbildung, or an alternative route fits you.",
  "We explain the documents, cost areas, language needs, and timeline.",
  "You receive a practical next-step plan instead of vague promises.",
];

export default function StudyInGermanyPage() {
  const whatsappUrl = createWhatsAppLeadUrl({
    page: "study_in_germany",
    pathway: "study",
    intent: "Study in Germany from Ghana or Nigeria pathway support",
  });

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-sm">
        <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Germany pathway for Africans</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Study in Germany from Ghana or Nigeria with a clear pathway plan.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
              This page is for African applicants who want honest guidance before applying. We help you check if Germany is realistic now, whether you need Studienkolleg, whether Ausbildung fits, or whether a Europe alternative is better.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/booking?service=Pathway%20Clarity%20Session" className="rounded-xl bg-amber-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-amber-200">
                Book Pathway Consultation
              </Link>
              <Link href="/assessment" className="rounded-xl border border-white/30 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
                Start Free Assessment
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm font-semibold text-amber-200">Best for</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
              <li>• SHS/WASSCE/WAEC/NECO leavers checking university or Studienkolleg options.</li>
              <li>• HND, OND, diploma, and degree holders unsure which route fits.</li>
              <li>• Applicants preparing admission, blocked account, language, and visa documents.</li>
              <li>• People who want Europe relocation guidance without fake guarantees.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Who this page is for"
          title="Built for Ghanaian, Nigerian, and African applicants"
          description="The right route depends on your certificate, budget, language level, and timeline. We help you avoid guessing."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {audienceCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Pathway options" title="Germany is not one route. Choose the route your profile can support." />
        <div className="grid gap-4 md:grid-cols-2">
          {pathwayOptions.map((pathway) => (
            <article key={pathway.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-900">{pathway.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700"><strong>Best for:</strong> {pathway.bestFor}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700"><strong>How we help:</strong> {pathway.action}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Document check</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">What we review before advising you</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            We do not advise blindly. Your certificate type, grades, language level, budget, and visa history can change the correct route.
          </p>
          <Link href="/booking?service=Admission%20%26%20Document%20Review" className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
            Book Document Review
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Common documents to prepare</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {documentChecklist.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Avoid costly mistakes" title="Common mistakes we see from African applicants" />
        <div className="grid gap-3 md:grid-cols-2">
          {commonMistakes.map((mistake) => (
            <div key={mistake} className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-900">
              {mistake}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-slate-900 p-6 text-white md:p-8">
        <SectionHeader
          eyebrow="Consultation flow"
          title="What happens when you book a pathway session"
          description="The goal is not to promise admission or visa approval. The goal is to give you a clear, honest plan before you spend money."
          tone="inverse"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {consultationSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-300">Step {index + 1}</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <PrimaryCta whatsappHref={whatsappUrl} consultationHref="/booking" />
        </div>
      </section>

      <CaseStudiesSection />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Need German language preparation?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          German language can affect Studienkolleg, Ausbildung, daily life, and embassy confidence. If you are below the required level, we can guide you to the right preparation path, including Falowen learning options.
        </p>
        <Link href="/learn-german" className="mt-4 inline-flex rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
          Explore Learn German options
        </Link>
      </section>
    </div>
  );
}
