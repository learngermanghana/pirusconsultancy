"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type Field = {
  key: keyof AssessmentForm;
  label: string;
  type?: "text" | "textarea" | "date" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

type Section = {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
};

type AssessmentForm = {
  clientName: string;
  assessmentDate: string;
  maritalStatus: string;
  childrenDetails: string;
  spouseAge: string;
  spouseBackground: string;
  educationBackground: string;
  currentOccupation: string;
  monthlyIncome: string;
  businesses: string;
  savings: string;
  fundsSource: string;
  investments: string;
  ownedProperty: string;
  ownershipProof: string;
  primaryInterest: string;
  sponsorDetails: string;
  travelPlanDate: string;
  travelHistory: string;
  previousVisaApplications: string;
  visaRefusalHistory: string;
};

const initialForm: AssessmentForm = {
  clientName: "",
  assessmentDate: "",
  maritalStatus: "",
  childrenDetails: "",
  spouseAge: "",
  spouseBackground: "",
  educationBackground: "",
  currentOccupation: "",
  monthlyIncome: "",
  businesses: "",
  savings: "",
  fundsSource: "",
  investments: "",
  ownedProperty: "",
  ownershipProof: "",
  primaryInterest: "",
  sponsorDetails: "",
  travelPlanDate: "",
  travelHistory: "",
  previousVisaApplications: "",
  visaRefusalHistory: "",
};

const sections: Section[] = [
  {
    id: "personal-family-information",
    title: "1. Personal & Family Information",
    description:
      "Tell us about your current family situation, education, and work profile so we can understand your background.",
    fields: [
      {
        key: "maritalStatus",
        label: "What is your marital status?",
        type: "select",
        required: true,
        options: ["Single", "Married", "Divorced", "Separated", "Common-Law Relationship", "Other"],
      },
      {
        key: "childrenDetails",
        label: "Do you have any children? If yes, how many and how old are they?",
        type: "textarea",
        required: true,
      },
      {
        key: "spouseAge",
        label: "If married, how old is your spouse?",
        placeholder: "Write N/A if this does not apply.",
      },
      {
        key: "spouseBackground",
        label: "What is your spouse’s educational and employment background?",
        type: "textarea",
        placeholder: "Highest level of education, field of study, and work history.",
      },
      {
        key: "educationBackground",
        label: "What is your educational background?",
        type: "textarea",
        required: true,
        placeholder: "Highest level of education, field of study, and graduation year.",
      },
      {
        key: "currentOccupation",
        label: "What is your current occupation and for how long have you been in this role?",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    id: "financial-situation-background",
    title: "2. Financial Situation & Background",
    description:
      "Share your income, savings, and other financial ties that can help support your Schengen visa application.",
    fields: [
      {
        key: "monthlyIncome",
        label: "How much do you earn monthly from your work?",
        required: true,
        placeholder: "Estimate in your local currency.",
      },
      {
        key: "businesses",
        label: "Aside from employment, are there any other businesses you are involved in?",
        type: "textarea",
        placeholder: "List any business activities or write none.",
      },
      {
        key: "savings",
        label: "How much do you have roughly in your bank account or savings to support your trip?",
        type: "textarea",
        required: true,
      },
      {
        key: "fundsSource",
        label: "What are the sources of the money in your accounts?",
        type: "textarea",
        required: true,
        placeholder: "Salary, business income, gifts, investments, or other sources.",
      },
      {
        key: "investments",
        label: "Do you have other forms of investments?",
        type: "textarea",
        placeholder: "Treasury bills, stocks, bonds, mutual funds, or other investments.",
      },
    ],
  },
  {
    id: "social-economic-ties",
    title: "3. Other Social & Economic Ties to Your Home Country",
    description:
      "Strong ties to your home country can support your application. Please provide as much detail as possible.",
    fields: [
      {
        key: "ownedProperty",
        label: "Do you own any property in your name?",
        type: "textarea",
        required: true,
        placeholder: "Land, houses, cars, or other assets.",
      },
      {
        key: "ownershipProof",
        label: "If yes, do you have the necessary documents or proof of ownership?",
        type: "textarea",
      },
    ],
  },
  {
    id: "interests-intentions",
    title: "4. Indicate Your Interests & Intentions",
    description: "This helps us understand why you want to travel and how the trip will be funded.",
    fields: [
      {
        key: "primaryInterest",
        label: "What is your primary interest in the Schengen area?",
        type: "select",
        required: true,
        options: ["Visiting", "Studying", "Working", "Business", "Family Visit", "Other"],
      },
      {
        key: "sponsorDetails",
        label: "Who will be supporting or funding your interest?",
        type: "textarea",
        required: true,
        placeholder: "Self-sponsorship or sponsorship by someone else.",
      },
      {
        key: "travelPlanDate",
        label: "When do you plan on traveling?",
        type: "text",
        required: true,
        placeholder: "Example: June 2026 or 12 August 2026.",
      },
    ],
  },
  {
    id: "travel-history",
    title: "5. Travel History",
    description:
      "Past travel and visa application history are important parts of a realistic Schengen eligibility review.",
    fields: [
      {
        key: "travelHistory",
        label: "Have you traveled to any other country before? If yes, which countries and for what purpose?",
        type: "textarea",
        required: true,
      },
      {
        key: "previousVisaApplications",
        label: "Have you ever applied for any type of visa for any country before?",
        type: "textarea",
        required: true,
        placeholder: "Specify the type of visa and the country.",
      },
      {
        key: "visaRefusalHistory",
        label: "Have you ever been refused a visa for any country before?",
        type: "textarea",
        required: true,
        placeholder: "Specify the country and the reason for refusal, or write none.",
      },
    ],
  },
];

const disclaimerParagraphs = [
  "This questionnaire is designed to gather essential information to assess your eligibility for immigration services related to the Schengen area. Kindly provide accurate details to facilitate a smooth consultation process.",
  "This report is for your personal use only and is not to be reproduced or circulated. Unless specifically authorised, no part of this report may be distributed, reproduced, or changed by any means or in any form without prior written permission.",
  "All information provided in this report is based on the knowledge of a Global Mobility Consultant at the time of composition. No responsibility is taken for the completeness of this information. All information must be confirmed with the respective Embassy at the time of the application.",
  "You should use this text as a general guide, but it cannot be a legal consultation. The visa regulations are made and executed by the Foreign Office. Please be aware: some rules and procedures can vary from embassy or consulate to embassy or consulate, even within one country.",
];

function buildAssessmentSummary(form: AssessmentForm) {
  const strongTies = [form.currentOccupation, form.ownedProperty, form.childrenDetails]
    .filter((value) => value.trim().length > 20)
    .length;
  const financialReadiness = [form.monthlyIncome, form.savings, form.fundsSource].filter((value) => value.trim()).length;
  const hasTravelHistory = form.travelHistory.trim().length > 15;
  const hasRefusalHistory = /none|no/i.test(form.visaRefusalHistory) ? "No refusal disclosed" : "Refusal history shared";

  return [
    `${form.clientName || "Applicant"} is seeking a Schengen route for ${form.primaryInterest || "a planned trip"}.`,
    strongTies >= 2
      ? "The form shows multiple home-country ties that can support credibility."
      : "Add more detail on work, family, and property ties to strengthen the review.",
    financialReadiness === 3
      ? "Income, savings, and funding source details are available for a preliminary financial review."
      : "Financial information is incomplete and should be expanded before consultation.",
    hasTravelHistory
      ? "Previous travel history has been provided for case screening."
      : "Travel history needs more detail to support the eligibility review.",
    hasRefusalHistory,
  ].join(" ");
}

export default function AssessmentPage() {
  const [form, setForm] = useState<AssessmentForm>(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const summary = useMemo(() => buildAssessmentSummary(form), [form]);
  const whatsappMessage = encodeURIComponent(
    [
      "Schengen Visa Eligibility Assessment Questionnaire",
      "",
      `Client name: ${form.clientName}`,
      `Date: ${form.assessmentDate}`,
      `Marital status: ${form.maritalStatus}`,
      `Children details: ${form.childrenDetails}`,
      `Spouse age: ${form.spouseAge}`,
      `Spouse background: ${form.spouseBackground}`,
      `Educational background: ${form.educationBackground}`,
      `Current occupation: ${form.currentOccupation}`,
      `Monthly income: ${form.monthlyIncome}`,
      `Other businesses: ${form.businesses}`,
      `Savings available: ${form.savings}`,
      `Source of funds: ${form.fundsSource}`,
      `Investments: ${form.investments}`,
      `Property owned: ${form.ownedProperty}`,
      `Ownership proof: ${form.ownershipProof}`,
      `Primary interest: ${form.primaryInterest}`,
      `Funding support: ${form.sponsorDetails}`,
      `Planned travel date: ${form.travelPlanDate}`,
      `Travel history: ${form.travelHistory}`,
      `Previous visa applications: ${form.previousVisaApplications}`,
      `Visa refusal history: ${form.visaRefusalHistory}`,
      "",
      `Preliminary assessment summary: ${summary}`,
    ].join("\n")
  );

  const whatsappUrl = `https://wa.me/4917620721491?text=${whatsappMessage}`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-4 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Schengen eligibility assessment</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Schengen Visa Eligibility Assessment Questionnaire</h1>
        <p className="max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
          Complete this real eligibility questionnaire so Pirus Consultancy can review your travel purpose, financial
          readiness, home-country ties, and visa history before your consultation.
        </p>
        <div className="grid gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          <div>
            <p className="font-semibold">Copyright Disclaimer</p>
            <p className="mt-1 leading-6">
              This Copyright Disclaimer sets forth the rights, limitations, and obligations concerning the use of
              copyrighted materials owned by Pirus Consultancy. By accessing or using any materials, content, or
              intellectual property owned by Pirus Consultancy, you acknowledge and agree to these terms.
            </p>
          </div>
          {disclaimerParagraphs.map((paragraph) => (
            <p key={paragraph} className="leading-6">
              {paragraph}
            </p>
          ))}
          <div className="grid gap-1 rounded-2xl bg-white/80 p-4 text-slate-700 sm:grid-cols-2">
            <p>
              <span className="font-semibold text-slate-900">Pirus Consultancy:</span> hana@pirusconsultancy.com
            </p>
            <p>
              <span className="font-semibold text-slate-900">Germany office:</span> 41061, Monchengladbach, Germany
            </p>
            <p>
              <span className="font-semibold text-slate-900">WhatsApp:</span> +49 176 20 72 14 91
            </p>
            <p>
              <span className="font-semibold text-slate-900">Use:</span> Personal use only. Reproduction requires written permission.
            </p>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Questionnaire</h2>
            <p className="mt-1 text-sm text-slate-600">
              Please ensure that all responses are accurate and supported by the necessary documents where applicable.
            </p>
          </div>
          <Link href="/contact" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
            Need help before submitting? Contact us.
          </Link>
        </div>

        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Client&apos;s name
              <input
                required
                value={form.clientName}
                onChange={(event) => setForm((current) => ({ ...current, clientName: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Date
              <input
                required
                type="date"
                value={form.assessmentDate}
                onChange={(event) => setForm((current) => ({ ...current, assessmentDate: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2"
              />
            </label>
          </div>

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
                {section.description ? <p className="mt-1 text-sm text-slate-600">{section.description}</p> : null}
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {section.fields.map((field) => {
                  const sharedProps = {
                    value: form[field.key],
                    onChange: (
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
                    ) => setForm((current) => ({ ...current, [field.key]: event.target.value })),
                    className: "mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2",
                    required: field.required,
                  };

                  return (
                    <label
                      key={String(field.key)}
                      className={`block text-sm font-medium text-slate-700 ${field.type === "textarea" ? "md:col-span-2" : ""}`}
                    >
                      {field.label}
                      {field.type === "textarea" ? (
                        <textarea {...sharedProps} rows={4} placeholder={field.placeholder} />
                      ) : field.type === "select" ? (
                        <select {...sharedProps}>
                          <option value="">Select an option</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input {...sharedProps} type={field.type ?? "text"} placeholder={field.placeholder} />
                      )}
                    </label>
                  );
                })}
              </div>
            </section>
          ))}

          <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-950">
            <p className="font-semibold">Preliminary internal summary</p>
            <p className="mt-2 leading-6">{summary}</p>
          </section>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">
              Complete eligibility assessment
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Send draft on WhatsApp
            </a>
          </div>
        </form>
      </section>

      {isSubmitted ? (
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-950 shadow-sm">
          <h2 className="text-lg font-semibold text-emerald-900">Assessment completed</h2>
          <p className="mt-2 leading-6">
            Thank you for your cooperation. Our goal is to inform you honestly and accurately, so please keep all
            documents ready for review during your consultation.
          </p>
          <p className="mt-2 leading-6">{summary}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-emerald-700 px-5 py-3 font-semibold text-white"
            >
              Submit completed questionnaire on WhatsApp
            </a>
            <Link href="/contact" className="rounded-2xl border border-emerald-300 px-5 py-3 font-semibold text-emerald-900">
              Book consultation
            </Link>
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-sky-200 bg-sky-50 p-6 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">What happens after this eligibility test?</h2>
        <p className="mt-2 leading-6">
          We use your answers as a general guide for your consultation, but this is not legal advice. Embassy and
          consulate requirements can change, so final confirmation must always come from the relevant authority.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/contact" className="font-semibold text-sky-700 hover:text-sky-800">
            Book consultation
          </Link>
          <Link href="/blog" className="font-semibold text-sky-700 hover:text-sky-800">
            Read visa guides
          </Link>
          <Link href="/tools" className="font-semibold text-sky-700 hover:text-sky-800">
            Open support tools
          </Link>
        </div>
      </section>
    </div>
  );
}
