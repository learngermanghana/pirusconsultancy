import Link from "next/link";
import GuidanceCard from "@/components/cards/GuidanceCard";
import RoleCategoryCard from "@/components/cards/RoleCategoryCard";
import ausbildungContent from "@/content/ausbildung.json";

export default function AusbildungPage() {
  const { categories, guidance } = ausbildungContent;

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Ausbildung</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Ausbildung Programs & Support</h1>
        <p className="max-w-3xl text-base text-slate-600">
          We replaced the old Tours &amp; Services layout with a dedicated Ausbildung page so you can
          quickly understand requirements, timelines, and practical next steps.
        </p>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Popular Ausbildung Fields</h2>
          <p className="mt-1 text-sm text-slate-600">
            Explore common vocational tracks and choose the direction that matches your background.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {categories.map((category) => (
            <RoleCategoryCard key={category.title} category={category} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {guidance.map((item) => (
          <GuidanceCard key={item.title} item={item} />
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Need a personal assessment first?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Share your profile and timeline, and we&apos;ll guide you to the most realistic Ausbildung
          pathway.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/assessment"
            className="inline-flex rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Start visa assessment
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Contact us
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">Testimonials</h2>
        <p className="mt-2 text-sm text-slate-600">What clients say about our support and service.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {testimonials.map((quote) => (
            <blockquote key={quote} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              “{quote}”
            </blockquote>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">(Replace these with real client reviews anytime.)</p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">Planning a custom itinerary?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Tell us your destination, dates, and goals. We&apos;ll follow up with a clear plan and pricing.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            Book a Consultation
          </Link>
          <a
            href="https://wa.me/4917620721491"
            className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Request a Callback
          </a>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white">
        <h2 className="text-lg font-semibold">Jonhrega Travel and Tours</h2>
        <p className="mt-1 text-sm text-white/80">Licensed by Ghana Tourism Authority • License No.: AWTT00006525</p>
        <p className="text-sm text-white/80">© 2026 Jonhrega Travel and Tours. All rights reserved.</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href="mailto:hana@pirusconsultancy.com">Email</a>
          <a href="tel:+4917620721491">Call</a>
          <Link href="/tours">Tours</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/assessment">Assessment</Link>
          <a href="https://wa.me/4917620721491">Chat</a>
        </div>
      </section>
    </div>
  );
}
