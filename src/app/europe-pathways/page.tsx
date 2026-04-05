import type { Metadata } from "next";
import PrimaryCta from "@/components/PrimaryCta";
import SectionHeader from "@/components/SectionHeader";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Europe Pathways",
  description: "Alternative Europe study and relocation pathways when Germany is not your best-fit option.",
  openGraph: {
    title: "Europe Pathways | Pirus Consultancy",
    description: "Explore structured Europe alternatives after profile review.",
  },
};

export default function EuropePathwaysPage() {
  const whatsappUrl = createWhatsAppLeadUrl({
    page: "europe_pathways",
    pathway: "general",
    intent: "Europe pathway consultation",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Europe Options"
        title="Germany first, with smart Europe alternatives"
        description="If Germany is not immediately viable, we help you evaluate practical options across Europe based on your profile, budget, and timeline."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Alternative study destinations in Europe",
          "Admissions and document strategy",
          "Visa preparation support",
          "Relocation planning and travel readiness",
        ].map((item) => (
          <div key={item} className="rounded-xl border border-slate-200 p-5 text-sm text-slate-700">
            {item}
          </div>
        ))}
      </div>

      <PrimaryCta whatsappHref={whatsappUrl} consultationHref="/contact" />
    </div>
  );
}
