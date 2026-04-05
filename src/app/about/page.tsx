import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Pirus Consultancy's honest and structured relocation support for Germany and Europe.",
  openGraph: {
    title: "About Pirus Consultancy",
    description: "Student-friendly and professional guidance for relocation planning.",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="About Us"
        title="Built for students and young professionals who need clarity"
        description="Pirus Consultancy exists to provide honest, practical guidance for people planning to relocate to Europe through education and professional pathways."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Our Promise</h2>
          <p className="mt-2 text-sm text-slate-600">
            We do not make false promises. We help you make informed decisions with structured support, clear steps,
            and transparent communication.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Our Focus</h2>
          <p className="mt-2 text-sm text-slate-600">
            Germany is our main pathway, while we support selected Europe alternatives that match your profile and goals.
          </p>
        </article>
      </div>
    </div>
  );
}
