import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Pirus Consultancy on WhatsApp or social channels to start your Germany or Europe relocation plan.",
  openGraph: {
    title: "Contact Pirus Consultancy",
    description: "Start your consultation through WhatsApp or social media.",
  },
};

export default function ContactPage() {
  const whatsappUrl = createWhatsAppLeadUrl({
    page: "contact",
    pathway: "general",
    intent: "Consultation booking",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Contact"
        title="Let’s plan your next step"
        description="For fastest response, message us directly on WhatsApp with your goal and timeline."
      />

      <div className="rounded-2xl border border-slate-200 p-6">
        <div className="flex flex-wrap gap-3">
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">
            Chat on WhatsApp
          </Link>
          <Link href="https://www.instagram.com/pirusconsultancy/" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800">
            Instagram
          </Link>
          <Link href="https://web.facebook.com/pursueconsultancy/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800">
            Facebook
          </Link>
        </div>
      </div>
    </div>
  );
}
