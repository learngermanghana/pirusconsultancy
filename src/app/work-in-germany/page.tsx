import Link from "next/link";
import PathwayComparisonCalculator from "@/components/PathwayComparisonCalculator";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

const guidance = [
  {
    title: "Who qualifies? (quick checklist)",
    points: [
      "Have a relevant qualification or practical work experience in your target role.",
      "Are willing to learn German and commit to language goals during preparation.",
      "Can support yourself initially for relocation, housing, and settlement costs.",
      "Have a clean record and can provide required police/background documents.",
      "Are ready for interviews and can present your profile for German employers.",
    ],
  },
  {
    title: "Expected timeline (example)",
    points: [
      "Profile assessment and route matching: about 1 week.",
      "Language preparation: usually 3–6 months depending on your starting level.",
      "Job search and interviews: around 1–4 months based on sector demand.",
      "Visa processing after submission: typically 2–4 months.",
      "Total average journey: 6–12 months (varies by profile and embassy queues).",
    ],
  },
  {
    title: "Common mistakes applicants make",
    points: [
      "Applying without recognized qualifications or missing recognition documents.",
      "Submitting incomplete documents and delaying visa appointments.",
      "Choosing the wrong visa category for your profile and salary.",
      "Paying illegal placement fees or trusting non-transparent recruiters.",
      "Ignoring German language preparation and struggling after arrival.",
    ],
  },
];

const supportServices = [
  "Eligibility and route matching (Skilled Worker vs EU Blue Card)",
  "Recognition and documentation checklist planning",
  "CV and motivation review for German employers",
  "Interview preparation and relocation readiness",
  "Visa file review before submission",
];

const pathways = [
  {
    title: "Skilled Worker Visa",
    description: "For degree holders or vocational graduates with a matching job offer.",
  },
  {
    title: "EU Blue Card",
    description: "For high-salary professionals meeting degree and salary requirements.",
  },
  {
    title: "Ausbildung (Vocational Training)",
    description: "For younger applicants building practical career skills and long-term work options.",
  },
];

const processSteps = [
  "Eligibility assessment",
  "German language preparation",
  "Job or Ausbildung placement",
  "Visa file preparation",
  "Embassy application",
  "Departure and arrival support",
];

const inDemandFields = [
  "Nursing and healthcare",
  "Construction trades",
  "Electrical and mechanical technicians",
  "IT professionals",
  "Logistics and drivers",
];

const germanySuccessStories = [
  {
    profile: "Kofi A. – Electrical technician",
    outcome: "Work visa to Hamburg",
  },
  {
    profile: "Mariam B. – Care assistant",
    outcome: "Ausbildung placement in Bavaria",
  },
  {
    profile: "Daniel O. – IT technician",
    outcome: "EU Blue Card track to Berlin",
  },
];

export default function WorkInGermanyPage() {
  const workWhatsAppUrl = createWhatsAppLeadUrl({
    page: "/work-in-germany",
    pathway: "work",
    intent: "Work visa eligibility, recognition process, and document planning",
  });

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">Work in Germany</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Work in Germany: Requirements, Steps, and Support</h1>
        <p className="max-w-3xl text-base text-slate-600">
          This page focuses fully on the Germany work pathway so you can understand eligibility,
          timelines, and what to prepare before applying.
        </p>
      </header>

      <section className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Your main work pathways to Germany</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {pathways.map((pathway) => (
            <article key={pathway.title} className="rounded-2xl border border-indigo-200 bg-white p-4">
              <h3 className="text-sm font-bold text-slate-900">{pathway.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{pathway.description}</p>
            </article>
          ))}
        </div>
      </section>

      <PathwayComparisonCalculator highlightedPathway="Work" />

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">How our Germany work process works</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {processSteps.map((step, index) => (
            <li
              key={step}
              className="flex min-h-24 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Step {index + 1}</span>
              <span className="mt-2 text-sm font-medium text-slate-800">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {guidance.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-lg font-bold text-slate-900">{item.title}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">How we support your work visa journey</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {supportServices.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Example in-demand job fields</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {inDemandFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Our approach</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>No fake job promises.</li>
            <li>No guaranteed visas.</li>
            <li>Transparent service fees.</li>
            <li>Step-by-step support throughout your process.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-600">
            Visa outcomes are always decided case-by-case by German authorities.
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">Recent Germany success stories</h2>
        <p className="mt-2 text-sm text-slate-600">
          Snapshot examples from recent profiles we have supported in Germany pathways.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {germanySuccessStories.map((story) => (
            <article key={story.profile} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">{story.profile}</h3>
              <p className="mt-2 text-sm text-slate-600">{story.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <CaseStudiesSection />

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">Next Step</h2>
        <p className="mt-2 text-sm text-slate-600">
          Want help confirming your eligibility or preparing documents? Start with an assessment or
          contact us directly.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/assessment"
            className="inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Start visa assessment
          </Link>
          <Link
            href={workWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Talk to us on WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}
