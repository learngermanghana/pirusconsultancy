"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

type ConsultationPurpose = "Tourism" | "Study" | "Work" | "Business";
type Timeline = "Within 1 month" | "1 - 3 months" | "3 - 6 months" | "6+ months";

type VisaDestination = {
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  tags: ConsultationPurpose[];
};

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<"All" | ConsultationPurpose>("All");
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("Canada");
  const [purpose, setPurpose] = useState<ConsultationPurpose>("Study");
  const [timeline, setTimeline] = useState<Timeline>("1 - 3 months");

  const visaDestinations: VisaDestination[] = [
    {
      title: "Canada – Study, Work Permit & PR",
      subtitle: "Canada visa from Ghana (Study • Work • PR)",
      description:
        "Apply for Canada student visa, Express Entry permanent residency, visitor visa or work permit with expert documentation support.",
      imageUrl: "https://github.com/learngermanghana/jonhrega-travel-site/blob/main/public/images/canada.jpeg?raw=1",
      imageAlt: "Canada skyline with a red maple leaf flag",
      tags: ["Study", "Work", "Tourism"] as ConsultationPurpose[],
    },
    {
      title: "United Kingdom – Tourist & Student Visa",
      subtitle: "UK visa application from Ghana",
      description:
        "Professional assistance for UK visitor visa, business travel, short-term study and family visit applications.",
      imageUrl: "https://github.com/learngermanghana/jonhrega-travel-site/blob/main/public/images/Uk.jpeg?raw=1",
      imageAlt: "United Kingdom travel destination with iconic city architecture",
      tags: ["Tourism", "Study", "Business"] as ConsultationPurpose[],
    },
    {
      title: "United States – B1/B2 Visitor Visa",
      subtitle: "USA B1/B2 visitor visa from Ghana",
      description:
        "Guidance for US tourist and business visa applications including DS-160 review and interview preparation.",
      imageUrl: "https://github.com/learngermanghana/jonhrega-travel-site/blob/main/public/images/usa.jpeg?raw=1",
      imageAlt: "United States city skyline with American flag colors",
      tags: ["Tourism", "Business"] as ConsultationPurpose[],
    },
    {
      title: "Schengen – Tourist & Business Visa",
      subtitle: "Schengen visa application from Ghana",
      description:
        "Support for Schengen short-stay, business, and family visit visas with document checks and appointment guidance.",
      tags: ["Tourism", "Business"] as ConsultationPurpose[],
    },
    {
      title: "Australia – Visitor & Student Visa",
      subtitle: "Australia visa application support",
      description:
        "Step-by-step guidance for Australian visitor and student visa applications, including documentation support.",
      tags: ["Tourism", "Study"] as ConsultationPurpose[],
    },
    {
      title: "New Zealand – Visitor & Study Visa",
      subtitle: "New Zealand visa services from Ghana",
      description:
        "Personalized help for New Zealand visitor and study visas, from document review to submission readiness.",
      tags: ["Tourism", "Study"] as ConsultationPurpose[],
    },
  ];

  const filteredDestinations =
    selectedTag === "All"
      ? visaDestinations
      : visaDestinations.filter((destinationOption) => destinationOption.tags.includes(selectedTag));

  const consultationWhatsAppUrl = createWhatsAppLeadUrl({
    page: "homepage_consultation_widget",
    intent: `${purpose} consultation for ${destination} (${timeline})`,
    pathway: purpose === "Study" ? "study" : purpose === "Work" ? "work" : "general",
  });

  const onSubmitStep = (event: FormEvent) => {
    event.preventDefault();
    if (step < 3) {
      setStep((currentStep) => currentStep + 1);
      return;
    }

    window.open(consultationWhatsAppUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-8 md:space-y-10">
      {/* HERO */}
      <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur md:p-12">
        <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          Plan your visa journey with clarity and confidence
          <span className="mt-3 block text-base font-medium text-slate-600 sm:text-lg md:text-xl">
            Trusted support for study, work, tourism, and business travel applications
          </span>
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Start with a quick assessment and receive a practical roadmap tailored to your destination, timeline, and
          travel purpose.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/assessment"
            className="w-full rounded-2xl bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90 sm:w-auto"
          >
            Start visa assessment
          </Link>
          <Link
            href="/blog"
            className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50 sm:w-auto"
          >
            Book consultation
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Get a quick eligibility review in 60 seconds</h2>
            <p className="mt-1 text-sm text-slate-600">Complete the steps below and continue directly on WhatsApp.</p>
          </div>
          <p className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">Step {step} of 3</p>
        </div>

        <form className="mt-5 space-y-4" onSubmit={onSubmitStep}>
          {step === 1 ? (
            <label className="block text-sm font-medium text-slate-700">
              Preferred destination
              <select
                aria-label="Select destination"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              >
                {["Canada", "United Kingdom", "United States", "Schengen", "Australia", "New Zealand"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {step === 2 ? (
            <label className="block text-sm font-medium text-slate-700">
              Purpose of travel
              <select
                aria-label="Select purpose"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value as ConsultationPurpose)}
              >
                {["Tourism", "Study", "Work", "Business"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {step === 3 ? (
            <label className="block text-sm font-medium text-slate-700">
              Planned travel timeline
              <select
                aria-label="Select timeline"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                value={timeline}
                onChange={(event) => setTimeline(event.target.value as Timeline)}
              >
                {["Within 1 month", "1 - 3 months", "3 - 6 months", "6+ months"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {step > 1 ? (
              <button
                type="button"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                onClick={() => setStep((currentStep) => currentStep - 1)}
                aria-label="Go back to previous step"
              >
                Back
              </button>
            ) : null}
            <button
              type="submit"
              className="rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700"
              aria-label={step === 3 ? "Continue to WhatsApp" : "Go to next step"}
            >
              {step === 3 ? "Continue on WhatsApp" : "Next"}
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-4 rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {[
          { value: "2,450+", label: "Visa files prepared" },
          { value: "94%", label: "Application success support rate" },
          { value: "18+", label: "Destination pathways covered" },
          { value: "4.9/5", label: "Average client satisfaction" },
        ].map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-2xl font-black text-slate-900">{metric.value}</p>
            <p className="mt-1 text-sm text-slate-600">{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Our Visa Services</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Most requested pathways at a glance</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Explore our top travel and visa support routes, then open the full destinations page for complete service
              details.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src="/images/study.jpg"
              alt="Client reviewing study and visa documents with a consultant"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {(["All", "Tourism", "Study", "Work", "Business"] as const).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                selectedTag === tag
                  ? "border-sky-700 bg-sky-700 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-sky-300"
              }`}
              aria-label={`Filter destinations by ${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {filteredDestinations.slice(0, 3).map((destinationOption) => (
            <article key={destinationOption.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/90">
              {destinationOption.imageUrl ? (
                <div className="h-44 w-full overflow-hidden border-b border-slate-200 bg-slate-100">
                  <img
                    src={destinationOption.imageUrl}
                    alt={destinationOption.imageAlt ?? destinationOption.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{destinationOption.subtitle}</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{destinationOption.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{destinationOption.description}</p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
                Apply Now →
              </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CREDENTIALS ASSESSMENT */}
      <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Travel Eligibility Review</p>
            <h2 className="mt-2 text-2xl font-bold">Travel &amp; Visa Assessment (Recommended First Step)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Start with an assessment so we can match your purpose of travel with the right pathway before you apply.
            </p>
            <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4" open>
              <summary className="cursor-pointer text-sm font-semibold text-slate-800">See what the assessment covers</summary>
              <ul className="mt-3 space-y-3 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Visa options analysis:</span> Compare relevant travel and visa options
                  against your background, timeline, and goals
                </li>
                <li>
                  <span className="font-semibold">Approval strategy:</span> Identify gaps and quick ways to strengthen
                  your case
                </li>
                <li>
                  <span className="font-semibold">Step-by-step roadmap:</span> Clear stages, timelines, and requirements
                </li>
                <li>
                  <span className="font-semibold">Transparent costs:</span> Breakdown of service fees, embassy fees, and
                  travel-related costs
                </li>
              </ul>
            </details>
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

      <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Success Stories</p>
            <h2 className="text-2xl font-bold text-slate-900">Real outcomes from recent clients</h2>
          </div>
          <Link href="/success" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
            Read all success stories →
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            {
              quote: "Our visa checklist was perfectly organized and approved quickly.",
              person: "Ama K.",
              role: "Family traveler",
            },
            {
              quote: "Clear and honest support from assessment to interview prep.",
              person: "Kwame D.",
              role: "Student applicant",
            },
            {
              quote: "Excellent planning for our business trip and documentation.",
              person: "Esi B.",
              role: "SME founder",
            },
          ].map((item) => (
            <blockquote key={item.person} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p>&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {item.person} • {item.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Latest Insights</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Visa guides, checklists &amp; travel updates</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
            Visit blog →
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            {
              title: "How to prepare a stronger visitor visa file",
              description: "Avoid common refusal triggers and present your travel purpose clearly.",
              href: "/blog",
            },
            {
              title: "Student visa interview prep checklist",
              description: "Structure your story, funding evidence, and timelines before interview day.",
              href: "/blog",
            },
            {
              title: "Business travel documentation essentials",
              description: "Keep invitation letters, bookings, and financial documents submission-ready.",
              href: "/blog",
            },
          ].map((resource) => (
            <article key={resource.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-slate-900">{resource.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
              <Link href={resource.href} className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
                Read guide →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CaseStudiesSection />

      {/* HELP */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">Need quick answers?</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Visit our resource hub for visa procedures, travel checklists, and official resource links before your trip.
        </p>
        <Link
          href="/blog"
          className="mt-5 inline-block rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:opacity-90"
        >
          Go to Resource Hub
        </Link>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 text-white shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">Start your next journey with confidence</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Begin with a focused assessment, then book a consultation when you are ready for document-level support.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/assessment"
            className="inline-block rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
          >
            Start visa assessment
          </Link>
          <Link href="/help" className="inline-block px-2 py-3 text-sm font-semibold text-white/90 hover:text-white">
            Explore FAQs &amp; resources
          </Link>
        </div>
      </section>
    </div>
  );
}
