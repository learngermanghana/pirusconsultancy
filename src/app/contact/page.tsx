"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const contactMethods = [
  {
    title: "WhatsApp",
    description: "Quick questions and consultation booking",
    value: "+49 176 20721491",
    actionLabel: "Chat on WhatsApp",
    href: "https://wa.me/4917620721491",
  },
  {
    title: "Email",
    description: "For documents or detailed inquiries",
    value: "info@pirusconsultancy.com",
    actionLabel: "Send an email",
    href: "mailto:info@pirusconsultancy.com",
  },
  {
    title: "Phone",
    description: "Speak directly with our team",
    value: "+233 XXX XXX XXX",
    actionLabel: "Call our team",
    href: "tel:+233000000000",
  },
];

const nextSteps = [
  "We review your details",
  "We contact you within 24–48 hours",
  "You receive your assessment or consultation plan",
];

const trustSignals = [
  "2,400+ visa files prepared",
  "Transparent service structure",
  "Step-by-step guidance",
];

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [destination, setDestination] = useState("");
  const [travelPurpose, setTravelPurpose] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hello Pirus Consultancy,",
      "I want to submit an inquiry.",
      "",
      `Full name: ${fullName}`,
      `Destination: ${destination}`,
      `Purpose of travel: ${travelPurpose}`,
      `Planned travel date: ${travelDate}`,
      `Email or WhatsApp number: ${contactInfo}`,
      "",
      "Source page: /contact",
    ].join("\n");

    const whatsappUrl = `https://wa.me/4917620721491?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Get in touch</p>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Start your travel or visa journey today</h1>
        <p className="max-w-2xl text-gray-600">
          Speak with our team for a clear assessment and next steps based on your destination and goals.
        </p>
        <p className="text-sm font-medium text-gray-700">We respond to all inquiries within 24–48 hours on working days.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Contact methods</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {contactMethods.map((method) => (
            <article key={method.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-emerald-700">{method.title}</p>
              <p className="mt-3 text-sm text-gray-600">{method.description}</p>
              <p className="mt-3 text-lg font-semibold text-gray-900">{method.value}</p>
              <a
                className="mt-4 inline-flex text-sm font-semibold text-sky-700 underline-offset-4 hover:underline"
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {method.actionLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">After you submit the form</h2>
        <ul className="mt-4 grid gap-2 text-sm text-gray-700 md:grid-cols-3">
          {nextSteps.map((step) => (
            <li key={step} className="rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3">
              {step}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Submit inquiry</h2>
          <p className="mt-2 text-sm text-gray-600">Share a few details so we can guide you with the right next step.</p>

          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-gray-800">
              Full name
              <input
                type="text"
                name="fullName"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none"
                placeholder="Your full name"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-gray-800">
              Destination
              <input
                type="text"
                name="destination"
                required
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none"
                placeholder="e.g., Germany"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-gray-800">
              Purpose of travel
              <select
                name="travelPurpose"
                required
                value={travelPurpose}
                onChange={(event) => setTravelPurpose(event.target.value)}
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Tourism">Tourism</option>
                <option value="Business">Business</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-gray-800">
              Planned travel date
              <input
                type="date"
                name="travelDate"
                required
                value={travelDate}
                onChange={(event) => setTravelDate(event.target.value)}
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-gray-800">
              Email or WhatsApp number
              <input
                type="text"
                name="contactInfo"
                required
                value={contactInfo}
                onChange={(event) => setContactInfo(event.target.value)}
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none"
                placeholder="you@example.com or +233..."
              />
            </label>

            <button
              type="submit"
              className="mt-1 inline-flex w-fit rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Submit inquiry
            </button>
          </form>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Why clients contact us</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              {trustSignals.map((signal) => (
                <li key={signal} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Serving clients across</h3>
            <p className="mt-2 text-sm text-gray-600">Germany and international applicants.</p>
            <p className="mt-3 text-sm text-gray-600">
              Office location: <span className="font-medium text-gray-800">Osu Badu Street Accra, Greater Accra Region</span>
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Not sure where to start?</h3>
            <p className="mt-2 text-sm text-gray-700">Begin with a quick eligibility assessment.</p>
            <Link href="/assessment" className="mt-3 inline-flex text-sm font-semibold text-sky-700 hover:underline">
              Start visa assessment
            </Link>
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
        <div className="mt-4 space-y-4 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-900">Do you guarantee visas?</h3>
            <p>No. We provide structured guidance and documentation support.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Do I need to visit your office?</h3>
            <p>No. Most consultations are done online.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
