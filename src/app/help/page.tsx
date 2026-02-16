import Link from "next/link";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We support study, work, Ausbildung, and visa applications with clear documentation guidance and readiness coaching.",
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

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Support</p>
        <h1 className="text-3xl font-bold text-gray-900">Help &amp; FAQ</h1>
        <p className="max-w-2xl text-gray-600">
          Find answers to the most common questions about services, timelines, and what we can do to strengthen your
          application process.
        </p>
      </header>

      <section className="space-y-4 rounded-3xl border bg-gray-50 p-6">
        {faqs.map((item) => (
          <div key={item.question} className="rounded-2xl border bg-white p-4">
            <p className="text-sm font-semibold text-gray-900">{item.question}</p>
            <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Still need help?</h2>
        <p className="mt-2 text-sm text-gray-600">Reach out directly and we will guide you through your next best step.</p>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
