import Link from "next/link";

const faqs = [
  {
    question: "What qualifies as a business-travel purpose?",
    answer: "Business meetings, trade events, conference attendance, and partner visits usually qualify when supported with invitation and itinerary documents.",
  },
  {
    question: "Do you help with invitation-letter checks?",
    answer: "Yes. We review invitation letters, travel schedule alignment, and support documents for consistency.",
  },
  {
    question: "How early should I start a Schengen business visa file?",
    answer: "Start 6-10 weeks before intended travel to allow document gathering, appointment scheduling, and quality review time.",
  },
];

export const metadata = {
  title: "Business & Trade Visa Support | Your Path to Global Travel",
  description: "Schengen business-travel documentation support with invitation, itinerary, and readiness checks.",
  alternates: {
    canonical: "/business-trade-visas",
  },
};

export default function BusinessTradeVisas() {
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
    serviceType: "Business and Trade Visa Support",
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
      <h1 className="text-3xl font-bold">Business &amp; Trade Visas (Schengen)</h1>
      <p className="text-gray-600">
        Short-stay business travel support for the Schengen zone. We align your documentation with
        the purpose of travel and help you present a clear, consistent application file.
      </p>

      <section className="rounded-3xl border p-6">
        <h2 className="text-xl font-bold">How we help</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          <li>Invitation and itinerary alignment for business travel.</li>
          <li>Documentation review for trade, meetings, or conferences.</li>
          <li>Risk review and application readiness checks.</li>
          <li>Submission guidance for the correct consulate route.</li>
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
