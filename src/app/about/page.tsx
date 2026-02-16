const values = [
  "Honest guidance, not false promises",
  "Clear documentation strategy",
  "Transparent service fees",
  "Step-by-step support",
];

const trustIndicators = [
  { label: "Visa files prepared", value: "2,400+" },
  { label: "Countries served", value: "10+" },
  { label: "Focus destinations", value: "Germany, UK, Canada, Schengen" },
  { label: "Years of practice", value: "4+" },
];

const differentiators = [
  "No fake job or visa guarantees",
  "Structured eligibility assessments before you spend",
  "Transparent service structure from day one",
  "Strong focus on documentation quality and submission order",
];

const timeline = [
  { year: "2022", milestone: "Started student guidance for Germany pathways." },
  { year: "2023", milestone: "Expanded into visa consulting and documentation reviews." },
  { year: "2024", milestone: "Launched full travel consultancy support." },
  { year: "2025", milestone: "Serving clients across multiple destinations and routes." },
];

const testimonials = [
  {
    quote: "Clear guidance from the first consultation. I finally understood what mattered for my file.",
    author: "Student applicant",
  },
  {
    quote: "No pressure, no false promises—just a practical plan and honest timelines.",
    author: "Skilled worker applicant",
  },
  {
    quote: "Their document checklist and feedback helped me avoid costly mistakes.",
    author: "Founder visa client",
  },
];

export default function About() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">About Pirus Consultancy</p>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Can you trust us with your visa journey?</h1>
        <p className="max-w-3xl text-base text-gray-600">
          That is the most important question. We built this consultancy to give people a safe, realistic alternative to
          misinformation, scams, and empty promises.
        </p>
      </header>

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Why I started Pirus Consultancy</p>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">A personal story behind the work</h2>
        <div className="mt-4 space-y-4 text-sm text-gray-700">
          <p>
            I started helping people with Germany pathways after seeing how many smart, qualified applicants were being
            misled. Too many people were paying for poor advice, fake guarantees, or incomplete documentation support.
          </p>
          <p>
            I saw talented students and professionals lose opportunities, not because they were unqualified, but
            because they lacked clear, honest guidance at the right time.
          </p>
          <p>
            Pirus Consultancy was created to close that gap with structured planning, practical education, and
            transparent support from first assessment to final submission.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">Our mission and values</h2>
          <p className="mt-3 text-sm text-gray-600">
            We help students, professionals, and founders make informed decisions with realistic strategy and ethical
            support.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-gray-700">
            {values.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border p-6">
          <h2 className="text-xl font-bold text-gray-900">At a glance</h2>
          <p className="mt-3 text-sm text-gray-600">Small credibility signals that reflect real experience and service reach.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {trustIndicators.map((item) => (
              <div key={item.label} className="rounded-2xl border bg-white p-4">
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border bg-gray-50 p-6 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <img
            src="/images/WhatsApp%20Image%202026-01-29%20at%2019.52.04.jpeg"
            alt="Felix Asadu, Founder of Pirus Consultancy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Founder profile</p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Felix Asadu</h2>
          <p className="mt-1 text-sm font-semibold text-gray-700">Founder, Pirus Consultancy</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>Travel and visa documentation specialist</li>
            <li>German language educator</li>
            <li>Founder of the Falowen learning platform</li>
            <li>Focused on structured, realistic migration pathways</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border p-6">
          <h2 className="text-xl font-bold text-gray-900">What makes us different</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            {differentiators.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border p-6">
          <h2 className="text-xl font-bold text-gray-900">Our promise of transparency</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-red-50 p-4">
              <p className="font-semibold text-gray-900">We do not</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>Guarantee visas</li>
                <li>Sell fake job offers</li>
                <li>Charge hidden fees</li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-emerald-50 p-4">
              <p className="font-semibold text-gray-900">We focus on</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>Clear strategy</li>
                <li>Proper documentation</li>
                <li>Honest expectations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border p-6">
        <h2 className="text-xl font-bold text-gray-900">Our journey</h2>
        <div className="mt-4 space-y-3">
          {timeline.map((item) => (
            <div key={item.year} className="flex gap-3 rounded-2xl border bg-white p-4">
              <p className="min-w-14 font-semibold text-teal-700">{item.year}</p>
              <p className="text-sm text-gray-700">{item.milestone}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">What clients say</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.author} className="rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
              <p>&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">— {item.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border bg-teal-600 p-6 text-white">
        <h2 className="text-xl font-bold">Start your visa assessment</h2>
        <p className="mt-2 text-sm text-teal-100">
          Book a consultation and get a clear, step-by-step plan tailored to your profile, goals, and budget.
        </p>
      </section>
    </div>
  );
}
