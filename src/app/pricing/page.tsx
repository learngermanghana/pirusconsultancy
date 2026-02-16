import Link from "next/link";

const packages = [
  {
    name: "Basic visa document check",
    price: "€120",
    details: "One-time review of eligibility documents, checklist validation, and issue spotting.",
    includes: ["Document checklist audit", "15-minute feedback call", "Action notes within 48 hours"],
  },
  {
    name: "Full visa application support",
    price: "€390",
    details: "Hands-on support from profile assessment through embassy-ready application packaging.",
    includes: ["Personalized visa strategy", "Application form guidance", "Mock interview + cover letter review"],
  },
  {
    name: "Complete travel planning",
    price: "€740",
    details: "End-to-end planning that combines visa support, itinerary design, and trip preparation.",
    includes: ["Everything in full support", "Accommodation + route planning", "Pre-departure briefing"],
  },
];

const addOns = [
  { name: "Document translation services", price: "from €35 / page" },
  { name: "German language course placement", price: "€90" },
  { name: "Flight booking assistance", price: "€65" },
];

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Pricing & packages</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Transparent service plans</h1>
        <p className="max-w-3xl text-slate-600">
          Choose the support level that fits your travel goal. Every package has clear deliverables and pricing.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        {packages.map((pkg) => (
          <article key={pkg.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Package</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{pkg.name}</h2>
            <p className="mt-2 text-2xl font-bold text-slate-900">{pkg.price}</p>
            <p className="mt-2 text-sm text-slate-600">{pkg.details}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {pkg.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">Optional add-ons</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {addOns.map((addOn) => (
            <div key={addOn.name} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">{addOn.name}</p>
              <p className="mt-1 text-sm text-slate-600">{addOn.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white">
        <h2 className="text-xl font-bold">Need a custom quote?</h2>
        <p className="mt-2 text-sm text-white/80">We can tailor package combinations for families, students, and business groups.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/assessment" className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900">
            Start assessment
          </Link>
          <Link href="/contact" className="rounded-2xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white">
            Speak to consultant
          </Link>
        </div>
      </section>
    </div>
  );
}
