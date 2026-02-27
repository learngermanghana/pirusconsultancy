const values = [
  "Honest guidance — realistic assessments, not false promises",
  "Strategic documentation planning aligned with official requirements",
  "Transparent service fees with no hidden costs",
  "Step-by-step advisory support from eligibility assessment to final submission",
];

const trustIndicators = [
  { label: "Visa files prepared", value: "2,400+" },
  { label: "Countries served", value: "10+" },
  { label: "Focus destinations", value: "Germany, UK, Canada, Schengen" },
  { label: "Years of practice", value: "4+" },
];

const differentiators = [
  "No false promises or guaranteed visas — only honest, regulation-based guidance",
  "Structured eligibility assessments before any financial commitment",
  "Transparent service framework with clearly defined stages and expectations",
  "Meticulous documentation strategy aligned with official visa requirements",
  "Professional standards grounded in institutional experience",
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
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why I Started Pirus Consultancy</h1>
        <p className="text-lg font-medium text-gray-700">A strategic response to rising global education costs</p>
        <p className="max-w-3xl text-base text-gray-600">
          I founded Pirus Consultancy after observing how many talented students and professionals were committing to
          increasingly high international tuition costs — often without fully exploring more sustainable and strategic
          alternatives.
        </p>
        <p className="max-w-3xl text-base text-gray-600">
          In today&rsquo;s global education landscape, rising tuition fees can place long-term financial pressure on
          families and graduates. Yet structured pathways exist that combine high-quality education, practical
          experience, and long-term mobility — without imposing the same financial burden.
        </p>
        <p className="max-w-3xl text-base text-gray-600">
          Pirus Consultancy was created to help students and professionals approach these opportunities with clarity,
          compliance, and long-term strategy — not guesswork or unrealistic expectations.
        </p>
        <p className="max-w-3xl text-base text-gray-600">
          My goal is simple: to ensure that international education decisions are financially sound, professionally
          guided, and strategically aligned with long-term career success.
        </p>
      </header>

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">About the consultant</p>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">Institutional expertise with a client-first approach</h2>
        <div className="mt-4 space-y-4 text-sm text-gray-700">
          <p>
            She is a Germany-based Global Mobility Consultant and Education Advisor with over 10 years of experience
            working with governments, embassies, and international organizations.
          </p>
          <p>
            She holds two Bachelor of Arts (Honours) degrees in International Relations and Political Science from
            Carleton University and the University of Toronto, and a Master of Arts in Canadian Studies. She has also
            taught at the university level.
          </p>
          <p>
            As a former Consular Officer, Policy Analyst, and Education Advisor, she possesses in-depth knowledge of
            visa procedures, immigration regulations, and international education systems. Her institutional background
            provides a strong understanding of documentation standards, compliance requirements, and decision-making
            processes.
          </p>
          <p>
            She provides personalized guidance in university selection, admissions strategy, and visa advisory support,
            offering clear, honest, and structured pathways for students seeking to study abroad. Her work is grounded
            in professionalism, transparency, and integrity — ensuring clients and families move forward with clarity
            and confidence.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">Our mission and values</h2>
          <p className="mt-3 text-sm text-gray-600">
            Our mission is to guide students, professionals, and founders toward informed international decisions
            through structured strategy, ethical advisory support, and regulatory compliance.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-gray-700">
            {values.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            We believe that clarity, integrity, and preparation are the foundation of successful global mobility.
          </p>
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
            alt="Hana, Founder of Pirus Consultancy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Founder profile</p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Hana</h2>
          <p className="mt-1 text-sm font-semibold text-gray-700">Founder, Pirus Consultancy</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>Travel and visa documentation specialist</li>
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
          <h2 className="text-xl font-bold text-gray-900">Our commitment to transparency</h2>
          <p className="mt-3 text-sm text-gray-600">We uphold the highest standards of integrity and professionalism.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-red-50 p-4">
              <p className="font-semibold text-gray-900">We do not</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>Guarantee visas or influence decisions</li>
                <li>Sell job offers or engage in unethical practices</li>
                <li>Charge hidden or undisclosed fees</li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-emerald-50 p-4">
              <p className="font-semibold text-gray-900">We focus on</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>Clear, structured strategy tailored to your eligibility</li>
                <li>Proper documentation aligned with official requirements</li>
                <li>Honest assessments and realistic expectations</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Our guidance is based on compliance, accuracy, and long-term success — not shortcuts.
          </p>
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
