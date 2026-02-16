import Link from "next/link";

const guidance = [
  {
    title: "Who qualifies",
    points: [
      "Skilled workers need a recognized degree or vocational qualification and a job offer that matches it.",
      "EU Blue Card applicants must meet salary thresholds and have a recognized university degree (or an equivalent in-demand IT path).",
      "Regulated professions (healthcare, teaching, engineering) require formal recognition before a visa is issued.",
    ],
  },
  {
    title: "German level needed",
    points: [
      "English-speaking tech roles can be possible, but most employers still expect at least B1 for daily work.",
      "Regulated professions usually require B2 or higher German for licensing and patient/client communication.",
      "For long-term integration, plan for B1/B2 even if the job ad is in English.",
    ],
  },
  {
    title: "Timeline",
    points: [
      "4–8 months: get qualification recognition (ZAB or the relevant chamber) and collect work experience proofs.",
      "3–6 months: job search, interviews, and contract negotiation; ensure salary meets visa requirements.",
      "2–3 months: visa appointment and processing, then prepare relocation (housing, Anmeldung, insurance).",
    ],
  },
  {
    title: "Common mistakes",
    points: [
      "Applying without recognition documents or with a job offer that does not match the qualification.",
      "Assuming any salary qualifies for a Blue Card—thresholds change yearly and vary by shortage occupations.",
      "Skipping language planning and later struggling with probation periods, paperwork, or client contact.",
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

export default function WorkInGermanyPage() {
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
            href="/contact"
            className="inline-flex rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
