import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import SectionHeader from "@/components/SectionHeader";
import { getSedifexGallery, getSedifexProducts, getSedifexPromo } from "@/lib/sedifex";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Relocate to Germany with Structured Support",
  description:
    "Get honest guidance for admissions, Germany pathways, and visa preparation. Chat on WhatsApp or book a consultation.",
  openGraph: {
    title: "Relocate to Germany with Structured Support",
    description:
      "Pirus Consultancy helps students and young professionals move to Europe with Germany as the main pathway.",
    images: ["/images/Pirus Consultancy main Page pic.gpg.png"],
  },
};

const pathways = [
  {
    title: "Study in Germany",
    description: "University admissions support, SOP/CV review, and application strategy.",
    href: "/study-in-germany",
  },
  {
    title: "Ausbildung Route",
    description: "Vocational pathway guidance, profile positioning, and document readiness.",
    href: "/study-in-germany",
  },
  {
    title: "Work Relocation Support",
    description: "Professional profile optimization, opportunity mapping, and relocation planning.",
    href: "/europe-pathways",
  },
  {
    title: "Other Europe Study Options",
    description: "Alternative destinations across Europe when Germany is not the perfect fit.",
    href: "/europe-pathways",
  },
];

const services = [
  "CV review",
  "German CV support",
  "Admission guidance",
  "Visa document review",
  "Interview prep",
  "Consultation packages",
];

const processSteps = [
  "Profile review",
  "Pathway selection",
  "Document preparation",
  "Application support",
  "Visa preparation",
  "Travel readiness",
];

const faqs = [
  {
    q: "Do you guarantee admission or visa approval?",
    a: "No. We do not make false promises. We provide structured support to improve your preparedness and decision quality.",
  },
  {
    q: "Is Germany your main focus?",
    a: "Yes. Germany is our primary pathway, while we also support selected Europe alternatives based on your profile.",
  },
  {
    q: "How do I start quickly?",
    a: "Start with WhatsApp for a quick screening, then book a consultation for a personalized action plan.",
  },
];

export default async function HomePage() {
  const [products, promo, gallery] = await Promise.all([getSedifexProducts(), getSedifexPromo(), getSedifexGallery()]);

  const whatsappUrl = createWhatsAppLeadUrl({
    page: "homepage",
    pathway: "study",
    intent: "Relocate to Germany with consultation support",
  });

  return (
    <div className="space-y-16 pb-8">
      <section className="grid gap-8 rounded-3xl bg-slate-950 px-6 py-10 text-white md:grid-cols-2 md:items-center md:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Germany-first relocation guidance</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
            Move to Europe with clarity.
            <span className="block text-amber-200">Start with Germany, backed by structured support.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">
            Pirus Consultancy helps students and young professionals plan admissions, prepare documents, and navigate visa readiness with honest guidance.
          </p>
          <div className="mt-6">
            <PrimaryCta whatsappHref={whatsappUrl} consultationHref="/contact" />
          </div>
        </div>
        <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-700 md:h-96">
          <Image
            src="/images/Pirus Consultancy main Page pic.gpg.png"
            alt="Student relocation and consultation support"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Why Pirus Consultancy"
          title="Trust-first guidance for real relocation decisions"
          description="Our process is transparent, student-friendly, and focused on practical next steps rather than hype."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-4">
          {["Honest guidance", "Structured process", "Germany + Europe pathways", "Transparent support"].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Main Pathways" title="Choose the route that fits your profile" />
        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((pathway) => (
            <article key={pathway.title} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{pathway.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{pathway.description}</p>
              <Link href={pathway.href} className="mt-4 inline-block text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
                Explore pathway
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Services" title="What we support you with" />
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="How It Works" title="A simple, step-by-step process" />
        <div className="grid gap-3 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-600">Step {index + 1}</p>
              <p className="mt-2 text-sm font-medium text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Success Stories" title="Social proof from guided applicants" />
        <div className="grid gap-4 md:grid-cols-3">
          {gallery.slice(0, 3).map((item) => (
            <blockquote key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2">{item.caption}</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{promo.badge}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">{promo.title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">{promo.description}</p>
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
          {promo.ctaLabel ?? "Claim Offer"}
        </Link>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Featured Services" title="Updated from Sedifex" description="These cards are synced from Sedifex products to make admin updates easy." />
        <div className="grid gap-4 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <article key={product.id} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{product.description}</p>
              {product.price ? <p className="mt-2 text-sm font-semibold text-slate-900">{product.price}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow="FAQs" title="Quick answers before you start" />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-xl border border-slate-200 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{faq.q}</summary>
              <p className="mt-2 text-sm text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-slate-900 p-8 text-white">
        <SectionHeader
          eyebrow="Ready to Start?"
          title="Get clear next steps in one conversation"
          description="Message us on WhatsApp or book a consultation today."
          align="center"
          tone="inverse"
        />
        <div className="mt-6">
          <PrimaryCta whatsappHref={whatsappUrl} consultationHref="/contact" center />
        </div>
      </section>
    </div>
  );
}
