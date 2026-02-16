import Link from "next/link";
import GuidanceCard from "@/components/cards/GuidanceCard";
import RoleCategoryCard from "@/components/cards/RoleCategoryCard";
import ausbildungContent from "@/content/ausbildung.json";
import PathwayComparisonCalculator from "@/components/PathwayComparisonCalculator";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export default function Page() {
  const { categories, guidance } = ausbildungContent;

  const ausbildungWhatsAppUrl = createWhatsAppLeadUrl({
    page: "/ausbildung-germany",
    pathway: "ausbildung",
    intent: "Ausbildung pathway eligibility and interview preparation",
  });

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Ausbildung in Germany</h1>
        <p className="text-gray-600">
          Clear requirements, timeline, common mistakes, and the next step you should take.
        </p>
      </header>

      <PathwayComparisonCalculator highlightedPathway="Ausbildung" />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">Popular Ausbildung Fields</h2>
          <p className="mt-1 text-sm text-gray-600">
            Explore high-demand roles across healthcare, technology, skilled trades, and more.
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

      <CaseStudiesSection />

      <section className="rounded-3xl border p-8">
        <h2 className="text-xl font-bold">Next Step</h2>
        <p className="mt-2 text-sm text-gray-600">
          Want help confirming your match or preparing the right documents? We can review your
          case.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={ausbildungWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-2xl bg-black px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            Talk to us on WhatsApp
          </Link>
          <Link
            href="/contact"
            className="inline-block rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
