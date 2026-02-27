import Link from "next/link";

const comparisonRoutes = [
  {
    title: "Germany vs Canada study path",
    summary: "Compare tuition, proof-of-funds rules, and post-study opportunities.",
    href: "/blog/germany-vs-canada-study-path",
  },
  {
    title: "Canada vs Australia student visa planning",
    summary: "Review timeline risk, interview intensity, and document burden for each route.",
    href: "/blog/canada-study-visa-checklist",
  },
  {
    title: "Germany work visa vs UK work visa",
    summary: "Assess employer sponsorship structure, salary thresholds, and checklist depth.",
    href: "/blog/germany-work-visa-checklist",
  },
];

export const metadata = {
  title: "Visa & Study Destination Comparisons | Your Path to Global Travel",
  description: "Compare study and visa pathways by destination, costs, timelines, and documentation complexity.",
  alternates: {
    canonical: "/comparisons",
  },
};

export default function ComparisonsPage() {
  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Comparison guides</p>
        <h1 className="text-3xl font-bold text-slate-900">Compare visa and study routes before you apply</h1>
        <p className="text-sm text-slate-600">
          Use these side-by-side breakdowns to choose a pathway that fits your profile, budget, and timeline.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {comparisonRoutes.map((route) => (
          <article key={route.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-bold text-slate-900">{route.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{route.summary}</p>
            <Link href={route.href} className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
              Read comparison →
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm text-slate-700">
        <h2 className="text-base font-semibold text-slate-900">Need a route recommendation?</h2>
        <p className="mt-2">Start with the assessment and then use the tools and resource center to build your action plan.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/assessment" className="font-semibold text-sky-700 hover:text-sky-800">Assessment</Link>
          <Link href="/tools" className="font-semibold text-sky-700 hover:text-sky-800">Tools</Link>
          <Link href="/blog" className="font-semibold text-sky-700 hover:text-sky-800">Resource center</Link>
        </div>
      </section>
    </div>
  );
}
