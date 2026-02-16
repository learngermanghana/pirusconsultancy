"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

type AssessmentForm = {
  fullName: string;
  phone: string;
  purpose: string;
  destination: string;
  background: string;
  preferredDates: string;
  budget: string;
};

const initialForm: AssessmentForm = {
  fullName: "",
  phone: "",
  purpose: "",
  destination: "",
  background: "",
  preferredDates: "",
  budget: "",
};

const purposes = ["Tourism", "Business", "Study", "Family Visit", "Work", "Other"];
const destinations = ["Germany", "Schengen Area", "Australia", "UK", "Canada", "Other"];

function buildAssessment(form: AssessmentForm) {
  const prepAdvice =
    form.background.length < 80
      ? "Add more detail about travel history, employment, and supporting documents for a stronger screening."
      : "Your background details look sufficient for a preliminary route recommendation.";

  const timelineAdvice =
    form.preferredDates.length < 10
      ? "Share exact month ranges to help with embassy appointment planning."
      : "Your date preference allows us to estimate processing and booking windows.";

  return `Preliminary assessment for ${form.fullName || "traveller"}: ${form.purpose || "General"} route to ${form.destination || "selected destination"}. ${prepAdvice} ${timelineAdvice}`;
}

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AssessmentForm>(initialForm);

  const summary = useMemo(() => buildAssessment(form), [form]);
  const whatsappMessage = encodeURIComponent(
    `Assessment / Booking Request\n\nName: ${form.fullName}\nPhone: ${form.phone}\nPurpose: ${form.purpose}\nDestination: ${form.destination}\nBackground: ${form.background}\nPreferred Dates: ${form.preferredDates}\nBudget: ${form.budget}\n\nGenerated preliminary assessment:\n${summary}`
  );

  const whatsappUrl = `https://wa.me/4917620721491?text=${whatsappMessage}`;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setStep(4);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Assessment & booking</p>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Travel assessment in 3 quick steps</h1>
        <p className="max-w-3xl text-gray-600">
          Complete the form to share your travel purpose, destination, background, and preferred dates.
          We instantly generate a preliminary assessment and let you book a consultation.
        </p>
      </header>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
          {["Traveller profile", "Travel plan", "Review & submit"].map((label, index) => (
            <span
              key={label}
              className={`rounded-full px-3 py-1 ${
                step >= index + 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {index + 1}. {label}
            </span>
          ))}
        </div>

        {step < 4 ? (
          <form className="space-y-5" onSubmit={onSubmit}>
            {step === 1 ? (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Full name
                  <input
                    required
                    value={form.fullName}
                    onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Phone / WhatsApp
                  <input
                    required
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Purpose of travel
                  <select
                    required
                    value={form.purpose}
                    onChange={(event) => setForm((current) => ({ ...current, purpose: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  >
                    <option value="">Choose purpose</option>
                    {purposes.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Destination
                  <select
                    required
                    value={form.destination}
                    onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  >
                    <option value="">Choose destination</option>
                    {destinations.map((destination) => (
                      <option key={destination} value={destination}>
                        {destination}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Background (travel history, job/study, documents)
                  <textarea
                    required
                    rows={4}
                    value={form.background}
                    onChange={(event) => setForm((current) => ({ ...current, background: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  />
                </label>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred dates
                  <input
                    required
                    placeholder="E.g. July to September 2026"
                    value={form.preferredDates}
                    onChange={(event) => setForm((current) => ({ ...current, preferredDates: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Budget (optional)
                  <input
                    value={form.budget}
                    onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  />
                </label>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <p className="font-semibold">Auto-generated preliminary assessment</p>
                  <p className="mt-2">{summary}</p>
                </div>
              </>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => current - 1)}
                  className="rounded-2xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700"
                >
                  Back
                </button>
              ) : null}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => current + 1)}
                  className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Continue
                </button>
              ) : (
                <button type="submit" className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white">
                  Generate & continue to booking
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
              <p className="font-semibold">Assessment generated successfully</p>
              <p className="mt-2">{summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Send to WhatsApp & book consultation
              </a>
              <Link href="/contact" className="rounded-2xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700">
                Book via contact page
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
