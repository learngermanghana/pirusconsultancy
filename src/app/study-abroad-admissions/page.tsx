import Link from "next/link";

const destinations = [
  {
    name: "Germany (Primary Focus)",
    why: "Strong public university options, post-study work opportunities, and clear pathways for long-term residence.",
    highlights: [
      "Bachelor's, Master's, and Studienkolleg pathways",
      "Public universities with low tuition in many states",
      "Visa planning with blocked account and health insurance guidance",
    ],
  },
  {
    name: "Other European Countries",
    why: "Explore programs in countries with English-taught options, practical internships, and flexible entry routes.",
    highlights: [
      "Program matching across selected EU destinations",
      "Country-by-country admission and visa requirement comparison",
      "Practical timeline planning around embassy appointment windows",
    ],
  },
  {
    name: "Canada",
    why: "Popular for quality education, multicultural campuses, and structured post-study pathways.",
    highlights: [
      "School and program shortlisting by profile and budget",
      "SOP/profile support and document readiness checks",
      "Application + visa preparation sequence",
    ],
  },
  {
    name: "USA",
    why: "Wide academic variety, research-led institutions, and strong career networking opportunities.",
    highlights: [
      "Program fit planning (academics, goals, budget)",
      "Application strategy and document checklist",
      "Pre-visa interview readiness support",
    ],
  },
];

const processSteps = [
  {
    title: "1) Discovery call",
    description:
      "We review your academic background, budget, preferred intake, and destination priorities.",
  },
  {
    title: "2) Country + program strategy",
    description:
      "You get a clear shortlist with entry requirements, deadlines, and realistic admission routes.",
  },
  {
    title: "3) Document preparation",
    description:
      "We guide transcripts, CV, statement structure, and supporting documents to meet each school's format.",
  },
  {
    title: "4) Application tracking",
    description:
      "You follow a practical submission calendar and status tracker so no important deadline is missed.",
  },
  {
    title: "5) Visa readiness",
    description:
      "After admission progress, we prepare your next-step visa checklist and interview readiness plan.",
  },
];

const supportAreas = [
  "School and course shortlisting",
  "Admission eligibility review",
  "Statement and profile positioning",
  "Timeline + deadline management",
  "Scholarship and funding direction",
  "Visa-readiness planning after admission",
];

export default function StudyAbroadAdmissions() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl border bg-gradient-to-br from-sky-50 to-white p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Study Abroad Services
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Study Abroad Admissions (Germany First, Global Options)
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          We support students who want to study abroad with Germany as the primary destination,
          while also covering selected European countries, Canada, and the USA. You get clear
          admissions guidance, a practical document plan, and an easy route to book an
          appointment.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/booking"
            className="inline-flex rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Book an appointment
          </Link>
          <Link
            href="/assessment"
            className="inline-flex rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Start with assessment
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Where you can study</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {destinations.map((destination) => (
            <article key={destination.name} className="rounded-3xl border p-6">
              <h3 className="text-lg font-bold text-slate-900">{destination.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{destination.why}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {destination.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What we help with</h2>
        <div className="rounded-3xl border p-6">
          <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            {supportAreas.map((item) => (
              <li key={item} className="rounded-xl bg-slate-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the process works</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {processSteps.map((step) => (
            <article key={step.title} className="rounded-3xl border p-6">
              <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white md:p-8">
        <h2 className="text-2xl font-bold">Ready to start your study journey?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85">
          Book a consultation to get a destination plan, admission checklist, and timeline tailored
          to your profile.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/booking"
            className="inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:opacity-90"
          >
            Book appointment now
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-2xl border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact support
          </Link>
        </div>
      </section>
    </div>
  );
}
