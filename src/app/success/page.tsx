const testimonials = [
  {
    name: "Sofia R.",
    outcome: "Germany family visit visa approved",
    quote:
      "They helped us organize every supporting document clearly. Our appointment was smooth and the visa was approved in two weeks.",
  },
  {
    name: "Daniel K.",
    outcome: "UK study route planning",
    quote:
      "The counselor explained realistic timelines and fixed gaps in my financial documents before submission.",
  },
  {
    name: "Isabella T.",
    outcome: "France business travel package",
    quote:
      "From invitation letter review to itinerary planning, the process felt professional and transparent.",
  },
];

const caseStudies = [
  {
    title: "Case study: first-time applicant",
    summary:
      "Client had no previous travel history. We built a stronger profile using employment proof, sponsorship clarity, and a concise travel itinerary.",
    result: "Visa approved after first submission.",
  },
  {
    title: "Case study: urgent conference travel",
    summary:
      "Business traveler needed quick turnaround. We prioritized checklist completion and a clear conference-purpose documentation pack.",
    result: "Application submitted in 5 working days.",
  },
];

export default function Success() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Testimonials & success stories</p>
        <h1 className="text-3xl font-bold text-slate-900">Client outcomes we are proud of</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Authentic feedback and real case snapshots showing how structured preparation improves travel and visa outcomes.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">{item.name}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-sky-700">{item.outcome}</p>
            <p className="mt-3 text-sm text-slate-600">“{item.quote}”</p>
          </article>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">Case studies</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {caseStudies.map((study) => (
            <article key={study.title} className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-base font-semibold text-slate-900">{study.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{study.summary}</p>
              <p className="mt-2 text-sm font-semibold text-emerald-700">{study.result}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
