import Link from "next/link";
import FeatureCard from "@/components/cards/FeatureCard";
import homeContent from "@/content/homepage.json";

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* HERO */}
      <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur md:p-12">
        <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          Travel Consultancy for Europe &amp; Beyond
          <span className="mt-3 block text-base font-medium text-slate-600 sm:text-lg md:text-xl">
            Pirus Consultancy helps individuals, families, and business travelers plan smart,
            stress-free trips with proper visa and documentation support.
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="w-full rounded-2xl bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90 sm:w-auto"
          >
            Book a consultation
          </Link>
          <Link
            href="/help"
            className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50 sm:w-auto"
          >
            Explore travel resources
          </Link>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {homeContent.featureCards.map((card) => (
          <FeatureCard key={card.title} {...card} priority />
        ))}
      </section>

      {/* WHO WE HELP */}
      <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold">Who we help</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We are a travel consultancy supporting tourists, students, and professionals with
              travel planning, visa strategy, and application preparation for Europe (Schengen),
              Germany, and Australia. Our process focuses on clear routes, accurate documents,
              and practical guidance from first consultation to submission-ready files.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Primary audiences
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>Tourists &amp; Families</li>
              <li>Students &amp; Young Professionals</li>
              <li>Business Travelers &amp; Entrepreneurs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CREDENTIALS ASSESSMENT */}
      <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Travel Eligibility Review
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Travel &amp; Visa Assessment (Recommended First Step)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Start with an assessment so we can match your purpose of travel with the right
              pathway before you apply.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>
                <span className="font-semibold">Visa options analysis:</span> Compare relevant
                travel and visa options against your background, timeline, and goals
              </li>
              <li>
                <span className="font-semibold">Approval strategy:</span> Identify gaps and quick
                ways to strengthen your case
              </li>
              <li>
                <span className="font-semibold">Step-by-step roadmap:</span> Clear stages,
                timelines, and requirements
              </li>
              <li>
                <span className="font-semibold">Transparent costs:</span> Breakdown of service
                fees, embassy fees, and travel-related costs
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              This gives you clarity and a practical foundation to travel with confidence.
            </p>
            <Link
              href="/assessment"
              className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Book travel assessment
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src="/images/pexels-tima-miroshnichenko-7010095.jpg"
              alt="Consultant reviewing documents with a client"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* HELP */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">Need quick answers?</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Visit the Help & FAQ hub for visa procedures, travel checklists, and official resource
          links before your trip.
        </p>
        <Link
          href="/help"
          className="mt-5 inline-block rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:opacity-90"
        >
          Go to Help & FAQ
        </Link>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 text-white shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">Start your next journey with confidence</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Get a clear travel and visa plan based on your purpose, profile, and destination.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-block rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
