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
    </div>
  );
}
