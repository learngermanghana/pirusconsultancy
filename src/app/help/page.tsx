export default function Help() {
  const faqs = [
    {
      question: "How long does the full preparation process take?",
      answer:
        "Most applicants need 6–12 months to prepare documents, language certificates, and applications. Your exact timeline depends on your pathway and current German level.",
    },
    {
      question: "Which pathway should I choose: Ausbildung, Study, or Work?",
      answer:
        "Use the Pathway Planner to compare requirements, costs, and timelines side by side. If you already have a degree and experience, Work can be faster; if you need structured training, Ausbildung is often best.",
    },
    {
      question: "Do I need German language certificates?",
      answer:
        "Yes for most programs. Many Ausbildung roles require at least B1, while universities often ask for B2 or higher. Some employers accept English for Work pathways.",
    },
    {
      question: "Can I apply without a blocked account?",
      answer:
        "Some visas require proof of funds such as a blocked account or sponsor. Check the official German visa rules for your country to confirm requirements.",
    },
  ];

  const resources = [
    {
      label: "Make it in Germany (official government portal)",
      href: "https://www.make-it-in-germany.com/en/",
    },
    {
      label: "DAAD (study programs & scholarships)",
      href: "https://www.daad.de/en/",
    },
    {
      label: "Federal Foreign Office visa information",
      href: "https://www.auswaertiges-amt.de/en/visa-service",
    },
    {
      label: "BAMF integration & language guidance",
      href: "https://www.bamf.de/EN/",
    },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
          Help & FAQ
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">Answers, official guidance, and clarity.</h1>
        <p className="max-w-2xl text-gray-600">
          Get quick answers on visa procedures, cost of living, and the documents you need to
          start your Germany pathway with confidence.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border p-6 lg:col-span-2">
          <h2 className="text-xl font-bold">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border p-4">
                <summary className="cursor-pointer text-sm font-semibold text-gray-800">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border bg-gray-50 p-6 space-y-3">
          <h2 className="text-xl font-bold">Visa procedure checklist</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
            <li>Choose your pathway and confirm eligibility.</li>
            <li>Prepare documents (passport, certificates, CV, motivation letter).</li>
            <li>Secure German language proof or enrollment offers.</li>
            <li>Show proof of funds or sponsor documents.</li>
            <li>Book your embassy appointment and submit your application.</li>
          </ol>
          <p className="text-xs text-gray-500">
            Always verify requirements with your local German embassy or consulate.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border p-6 md:flex md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Still have a quick question?</h2>
          <p className="text-sm text-gray-600">
            Ask StudyBuddy for a concise response and official-source reminders.
          </p>
        </div>
        <a
          href="/studybuddy"
          className="mt-4 inline-flex rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90 md:mt-0"
        >
          Ask StudyBuddy
        </a>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border p-6">
          <h2 className="text-xl font-bold">Cost of living snapshot</h2>
          <p className="mt-2 text-sm text-gray-600">
            Costs vary by city. Use this as a starting point for monthly budgeting.
          </p>
          <div className="mt-4 space-y-3">
            {[
              { label: "Rent & utilities", value: "€450–€900" },
              { label: "Food & groceries", value: "€200–€350" },
              { label: "Transport", value: "€49–€89" },
              { label: "Health insurance", value: "€120–€220" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.label}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border p-6">
          <h2 className="text-xl font-bold">Official resources</h2>
          <p className="mt-2 text-sm text-gray-600">
            Use official sources to confirm visa requirements, program options, and language
            policies.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {resources.map((resource) => (
              <li key={resource.href}>
                <a
                  className="font-semibold text-sky-700 underline-offset-4 hover:underline"
                  href={resource.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
