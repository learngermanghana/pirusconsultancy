import Link from "next/link";

const studyPathways = [
  "Direct university admission (Bachelor’s/Master’s)",
  "Studienkolleg (foundation year)",
  "Language pathway + university admission",
  "Vocational training (Ausbildung)",
];

const eligibilityChecklist = [
  "Have a secondary school or university certificate",
  "Can show proof of funds",
  "Are willing to learn German or study in English",
  "Meet the age and academic requirements",
  "Are ready for embassy interview",
];

const processSteps = [
  "Profile evaluation",
  "University or Studienkolleg selection",
  "Application submission",
  "Admission letter",
  "Visa preparation",
  "Embassy interview",
  "Departure",
];

const timeline = [
  { label: "Profile review", duration: "1–2 weeks" },
  { label: "Application period", duration: "4–8 weeks" },
  { label: "Admission decision", duration: "4–12 weeks" },
  { label: "Visa processing", duration: "6–12 weeks" },
  { label: "Total", duration: "4–8 months average" },
];

const requiredDocuments = [
  "Academic certificates",
  "Motivation letter",
  "Proof of funds",
  "Admission letter",
  "Language certificate",
  "Passport",
];

const destinations = [
  {
    country: "Germany",
    detail: "Tuition-free public universities",
  },
  {
    country: "Canada",
    detail: "Work-while-studying options",
  },
  {
    country: "UK",
    detail: "Shorter degree durations",
  },
  {
    country: "Australia",
    detail: "Flexible post-study work visas",
  },
];

const successStories = [
  {
    student: "Hannah M. – Nursing pathway to Germany",
    story: "Completed B1 German → Studienkolleg → University admission.",
  },
  {
    student: "Kwame D. – UK Master’s",
    story: "Received admission within 6 weeks.",
  },
];

const financialItems = [
  "Embassy visa fees",
  "Proof of funds requirements",
  "Health insurance",
  "Tuition (if applicable)",
  "Consultancy service fees",
];

const commonMistakes = [
  "Applying without enough funds",
  "Weak motivation letter",
  "Choosing the wrong course",
  "Missing document deadlines",
];

export default function StudyAbroadAdmissions() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl border bg-gradient-to-br from-sky-50 to-white p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Study Abroad Services
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Study Abroad Admissions</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Get a clear route from profile check to admission and visa. We keep the process practical,
          transparent, and focused on your best-fit pathway.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/assessment"
            className="inline-flex rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Start study eligibility assessment
          </Link>
          <Link
            href="/booking"
            className="inline-flex rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Book consultation
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Main study pathways</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {studyPathways.map((pathway) => (
            <div key={pathway} className="rounded-2xl border bg-white px-4 py-3 text-sm text-slate-700">
              {pathway}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold"><Link href="/assessment" className="hover:text-sky-700 hover:underline">Basic eligibility: Who qualifies?</Link></h2>
        <p className="text-sm text-slate-600">You likely qualify if you:</p>
        <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          {eligibilityChecklist.map((item) => (
            <li key={item} className="rounded-2xl border bg-slate-50 px-4 py-3">
              ✓ {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the study admission process works</h2>
        <ol className="grid gap-3 md:grid-cols-7">
          {processSteps.map((step, index) => (
            <li key={step} className="rounded-2xl border p-4 text-sm">
              <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {index + 1}
              </div>
              <p className="text-slate-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Typical timeline</h2>
        <div className="rounded-3xl border p-6">
          <ul className="space-y-3 text-sm text-slate-700">
            {timeline.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 border-b pb-3 last:border-none last:pb-0">
                <span className="font-medium">{item.label}</span>
                <span>{item.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common study visa documents</h2>
        <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2 md:grid-cols-3">
          {requiredDocuments.map((doc) => (
            <li key={doc} className="rounded-2xl border px-4 py-3">
              {doc}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Popular study destinations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {destinations.map((destination) => (
            <article key={destination.country} className="rounded-3xl border p-6">
              <h3 className="text-lg font-bold text-slate-900">{destination.country}</h3>
              <p className="mt-2 text-sm text-slate-600">{destination.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Student success stories</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {successStories.map((story) => (
            <article key={story.student} className="rounded-3xl border bg-slate-50 p-6">
              <h3 className="text-base font-bold text-slate-900">{story.student}</h3>
              <p className="mt-2 text-sm text-slate-600">{story.story}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to expect financially</h2>
        <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          {financialItems.map((item) => (
            <li key={item} className="rounded-2xl border px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common student visa mistakes</h2>
        <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          {commonMistakes.map((mistake) => (
            <li key={mistake} className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
              {mistake}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white md:p-8">
        <h2 className="text-2xl font-bold">Ready to start your study journey?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85">
          Start with a clear <Link href="/assessment" className="font-semibold text-sky-700 hover:underline">eligibility assessment</Link>, then book a consultation for personalized
          next steps.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/assessment"
            className="inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:opacity-90"
          >
            Start study eligibility assessment
          </Link>
          <Link
            href="/booking"
            className="inline-flex rounded-2xl border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Book consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
