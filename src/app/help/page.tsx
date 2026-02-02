import Link from "next/link";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We support study, work, business, and visa applications with clear documentation guidance and readiness coaching.",
  },
  {
    question: "Do you guarantee visas?",
    answer:
      "No. We focus on preparation, transparency, and realistic plans so you can submit strong, compliant applications.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Timelines vary by destination and intake. We help you map milestones, deadlines, and document preparation windows.",
  },
  {
    question: "Can you review my documents?",
    answer:
      "Yes. We review CVs, motivation letters, and application files and offer feedback before submission.",
  },
];

const resources = [
  {
    title: "Start with a consultation",
    description: "Get a roadmap tailored to your goals, timeline, and budget.",
    href: "/contact",
    cta: "Book now",
  },
  {
    title: "Study in Germany",
    description: "Understand admission steps, requirements, and timelines.",
    href: "/study-germany",
    cta: "Explore study support",
  },
  {
    title: "Work in Germany",
    description: "Check eligibility and prepare documents for work routes.",
    href: "/work-in-germany",
    cta: "View work routes",
  },
  {
    title: "Tools & templates",
    description: "Use our CV and motivation letter builders to get started.",
    href: "/tools",
    cta: "Open tools",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
          Help &amp; Resources
        </p>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Get clear answers before you apply.
        </h1>
        <p className="max-w-2xl text-base text-gray-600">
          Use this page to find quick guidance, helpful tools, and the next steps to move
          forward with confidence.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        {resources.map((item) => (
          <div key={item.title} className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
            <p className="mt-3 text-sm text-gray-600">{item.description}</p>
            <Link
              href={item.href}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {item.cta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-2xl border bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">{item.question}</p>
              <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border p-6">
        <h2 className="text-xl font-bold text-gray-900">Need 1:1 help?</h2>
        <p className="mt-3 text-sm text-gray-600">
          Share your background and we&apos;ll recommend the most realistic path. Expect clear
          answers and honest feedback.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Contact the team
        </Link>
      </section>
    </div>
  );
}
