import Link from "next/link";

const faqs = [
  {
    question: "Which countries do you support for student visa preparation?",
    answer: "We support student visa pathways for Germany, Canada, Australia, New Zealand, and selected UK routes.",
  },
  {
    question: "Do you provide guaranteed visa approvals?",
    answer:
      "No. We provide guidance, document strategy, and interview preparation, but final decisions are made by embassies and immigration authorities.",
  },
  {
    question: "Can you review my documents before submission?",
    answer: "Yes. We run a checklist-based review to improve clarity, consistency, and submission readiness.",
  },
];

export const metadata = {
  title: "Student Visa Support | Your Path to Global Travel",
  description: "Checklist-driven student visa guidance with documentation review and submission planning.",
  alternates: {
    canonical: "/student-visa-support",
  },
};

export default function StudentVisaSupport() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Student Visa Documentation Support",
    provider: {
      "@type": "Organization",
      name: "Your Path to Global Travel",
      url: "https://www.pirusconsultancy.com",
    },
    areaServed: "Ghana",
  };

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-3xl font-bold">Student Visa Support</h1>
      <p className="text-gray-600">
        We provide step-by-step visa guidance for students, focusing on accurate documentation and
        clear submission readiness.
      </p>

      <section className="rounded-3xl border p-6">
        <h2 className="text-xl font-bold">Support highlights</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          <li>Visa checklist tailored to your destination and program.</li>
          <li>Document review for completeness and clarity.</li>
          <li>Funding and accommodation documentation guidance.</li>
          <li>Submission strategy and timeline management.</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold">Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-800">{faq.question}</summary>
              <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-sky-200 bg-sky-50 p-6 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Continue planning</h2>
        <div className="mt-3 flex flex-wrap gap-4">
          <Link href="/assessment" className="font-semibold text-sky-700 hover:text-sky-800">Assessment</Link>
          <Link href="/tools" className="font-semibold text-sky-700 hover:text-sky-800">Tools</Link>
          <Link href="/blog" className="font-semibold text-sky-700 hover:text-sky-800">Resource center</Link>
        </div>
      </section>
    </div>
  );
}
