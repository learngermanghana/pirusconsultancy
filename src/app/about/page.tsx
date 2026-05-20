import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Pirus Consultancy's structured, ethical, and compliance-based global mobility and education advisory services.",
  openGraph: {
    title: "About Pirus Consultancy",
    description: "Professional education and migration strategy rooted in transparency and long-term success.",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="About Us"
        title="Strategic, transparent, and compliance-based global mobility guidance"
        description="Pirus Consultancy supports students, professionals, and founders with structured international education and migration pathways grounded in ethics, clarity, and long-term success."
      />

      <article className="rounded-2xl border border-slate-200 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">About the Consultant</h2>
        <p className="text-sm text-slate-600">
          She is a Germany-based Global Mobility Consultant and Education Advisor with over 10 years of experience
          working with governments, embassies, and international organizations.
        </p>
        <p className="text-sm text-slate-600">
          She holds two Bachelor of Arts (Honours) degrees in International Relations and Political Science from
          Carleton University and the University of Toronto, and a Master of Arts in Canadian Studies. She has also
          taught at the university level.
        </p>
        <p className="text-sm text-slate-600">
          As a former Consular Officer, Policy Analyst, and Education Advisor, she possesses in-depth knowledge of
          visa procedures, immigration regulations, and international education systems.
        </p>
      </article>

      <article className="rounded-2xl border border-slate-200 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Founder &amp; Managing Director</h2>
        <p className="text-sm text-slate-600">
          Hana is a Germany-based Education Advisor and Global Mobility Specialist with over a decade of experience in
          international education and migration advisory services.
        </p>
        <p className="text-sm text-slate-600">
          She provides strategic guidance to students and professionals seeking structured, compliant, and achievable
          pathways for studying and relocating abroad.
        </p>
      </article>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">What Makes Us Different</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>No false promises or guaranteed visas — only honest, regulation-based guidance.</li>
            <li>Structured eligibility assessments before any financial commitment.</li>
            <li>Transparent service framework with clearly defined stages and expectations.</li>
            <li>Meticulous documentation strategy aligned with official visa requirements.</li>
            <li>Professional standards grounded in institutional experience.</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Our Commitment to Transparency</h2>
          <p className="mt-2 text-sm text-slate-600">We uphold the highest standards of integrity and professionalism.</p>
          <p className="mt-2 text-sm font-medium text-slate-800">We do not:</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>Guarantee visas or influence decisions.</li>
            <li>Sell job offers or engage in unethical practices.</li>
            <li>Charge hidden or undisclosed fees.</li>
          </ul>
          <p className="mt-2 text-sm font-medium text-slate-800">We focus on:</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>Clear, structured strategy tailored to your eligibility.</li>
            <li>Proper documentation aligned with official requirements.</li>
            <li>Honest assessments and realistic expectations.</li>
          </ul>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-200 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Our Mission &amp; Values</h2>
        <p className="text-sm text-slate-600">
          Our mission is to guide students, professionals, and founders toward informed international decisions through
          structured strategy, ethical advisory support, and regulatory compliance.
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
          <li>Honest guidance — realistic assessments, not false promises.</li>
          <li>Strategic documentation planning aligned with official requirements.</li>
          <li>Transparent service fees with no hidden costs.</li>
          <li>Step-by-step advisory support from eligibility assessment to final submission.</li>
        </ul>
        <p className="text-sm text-slate-600">
          We believe that clarity, integrity, and preparation are the foundation of successful global mobility.
        </p>
      </article>

      <article className="rounded-2xl border border-slate-200 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Why I Started Pirus Consultancy</h2>
        <p className="text-sm text-slate-600">A strategic response to rising global education costs.</p>
        <p className="text-sm text-slate-600">
          Pirus Consultancy was founded after observing how many talented students and professionals were committing
          to increasingly high international tuition costs without fully exploring more sustainable and strategic
          alternatives.
        </p>
        <p className="text-sm text-slate-600">
          The goal is to ensure that international education decisions are financially sound, professionally guided,
          and strategically aligned with long-term career success.
        </p>
      </article>
    </div>
  );
}
