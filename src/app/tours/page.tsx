"use client";

import { FormEvent, useMemo, useState } from "react";
import toursContent from "@/content/tours.json";

type TourPackage = (typeof toursContent.packages)[number];

type TourCategory = {
  label: string;
  icon: string;
};

const categoryOptions: TourCategory[] = [
  { label: "Europe city tours", icon: "🇪🇺" },
  { label: "Holiday & beach tours", icon: "🏝️" },
  { label: "Family packages", icon: "👨‍👩‍👧" },
  { label: "Business travel packages", icon: "💼" },
  { label: "Short visa-friendly trips", icon: "🛫" },
];

const inclusions = [
  "Flight booking support",
  "Hotel reservations",
  "Daily itinerary",
  "Airport transfers",
  "Visa documentation guidance",
];

const bookingSteps = [
  "Choose your destination",
  "Get a custom quote",
  "Pay booking deposit",
  "Visa support & travel preparation",
  "Final travel confirmation",
  "Departure",
];

const tourReviews = [
  {
    name: "Lena M.",
    destination: "Germany",
    quote: "Our Munich city break was well-planned, and every booking detail was accurate.",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Paul N.",
    destination: "France",
    quote: "The Paris itinerary was smooth, and the hotel location was perfect for sightseeing.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Marta K.",
    destination: "Italy",
    quote: "Our Rome group tour was organized professionally from airport pickup to daily plans.",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
  },
];

export default function ToursPage() {
  const [destination, setDestination] = useState("All");
  const [budget, setBudget] = useState("All");
  const [category, setCategory] = useState("All");
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [customRequest, setCustomRequest] = useState({
    destination: "",
    travelDates: "",
    budget: "",
    travelers: "",
  });

  const destinations = useMemo(
    () => ["All", ...new Set(toursContent.packages.map((tour) => tour.destination))],
    [],
  );
  const budgets = useMemo(() => ["All", ...new Set(toursContent.packages.map((tour) => tour.budget))], []);

  const filteredTours = useMemo(() => {
    return toursContent.packages.filter((tour) => {
      const destinationMatch = destination === "All" || tour.destination === destination;
      const budgetMatch = budget === "All" || tour.budget === budget;
      const categoryMatch = category === "All" || tour.category === category;
      return destinationMatch && budgetMatch && categoryMatch;
    });
  }, [budget, category, destination]);

  const handleSelectTour = (tour: TourPackage) => {
    setSelectedTour(tour);
    document.getElementById("tour-inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const quoteMessage = encodeURIComponent(
    selectedTour
      ? `Hello, I would like a quote for ${selectedTour.name}. Duration: ${selectedTour.duration}. Dates: ${selectedTour.dates}.`
      : "Hello, I would like a customized tour quote.",
  );

  const handleCustomRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Hello, I need a custom trip request.",
      `Destination: ${customRequest.destination || "Not specified"}`,
      `Travel dates: ${customRequest.travelDates || "Not specified"}`,
      `Budget: ${customRequest.budget || "Not specified"}`,
      `Travelers: ${customRequest.travelers || "Not specified"}`,
    ].join("\n");

    window.open(`https://wa.me/4917620721491?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Tour packages</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{toursContent.title}</h1>
        <p className="max-w-3xl text-slate-600">{toursContent.subtitle}</p>
      </header>

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">Find your tour</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              category === "All" ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            All tours
          </button>
          {categoryOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setCategory(option.label)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                category === option.label ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Destination
          <select value={destination} onChange={(event) => setDestination(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2">
            {destinations.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Budget
          <select value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2">
            {budgets.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {filteredTours.map((tour) => (
          <article key={tour.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img src={tour.image} alt={tour.name} className="h-52 w-full object-cover" />
            <div className="space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-900">{tour.name}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{tour.budget}</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">
                {tour.duration} • {tour.destination} • {tour.visaSupport}
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {tour.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-slate-900">{tour.price}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-rose-600">{tour.urgency}</p>
              <p className="text-xs text-slate-500">
                Best time: {tour.bestTime} • Weather: {tour.weather}
              </p>
              <button
                type="button"
                onClick={() => handleSelectTour(tour)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
              >
                View details
              </button>
            </div>
          </article>
        ))}
      </section>

      {filteredTours.length === 0 ? (
        <p className="text-sm text-slate-600">No tours match those filters yet. Try broader settings or request a custom quote.</p>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">What our tour packages include</h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          {inclusions.map((item) => (
            <li key={item} className="rounded-xl bg-slate-50 px-4 py-3">✓ {item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">How your tour booking works</h2>
        <ol className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
          {bookingSteps.map((step, index) => (
            <li key={step} className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase text-sky-700">Step {index + 1}</p>
              <p className="mt-1 font-medium text-slate-800">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">Tour reviews</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {tourReviews.map((review) => (
            <article key={review.name} className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-3">
                <img src={review.photo} alt={review.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.destination}</p>
                </div>
              </div>
              <p className="text-sm text-slate-700">“{review.quote}”</p>
            </article>
          ))}
        </div>
      </section>

      <section id="tour-inquiry" className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white">
        <h2 className="text-2xl font-bold">Request a tour quote on this page</h2>
        <p className="mt-2 text-sm text-white/80">
          {selectedTour
            ? `Selected package: ${selectedTour.name} (${selectedTour.duration}, ${selectedTour.dates})`
            : "Select View details on any package above to continue from this page."}
        </p>
        <a
          href={`https://wa.me/4917620721491?text=${quoteMessage}`}
          className="mt-4 inline-flex rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
        >
          Continue on WhatsApp
        </a>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">Need a custom trip?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Tell us your destination, travel dates, budget, and number of travelers. We&apos;ll continue your request on WhatsApp.
        </p>
        <form onSubmit={handleCustomRequest} className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={customRequest.destination}
            onChange={(event) => setCustomRequest((current) => ({ ...current, destination: event.target.value }))}
            placeholder="Destination"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
            required
          />
          <input
            value={customRequest.travelDates}
            onChange={(event) => setCustomRequest((current) => ({ ...current, travelDates: event.target.value }))}
            placeholder="Travel dates"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
            required
          />
          <input
            value={customRequest.budget}
            onChange={(event) => setCustomRequest((current) => ({ ...current, budget: event.target.value }))}
            placeholder="Budget"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
            required
          />
          <input
            value={customRequest.travelers}
            onChange={(event) => setCustomRequest((current) => ({ ...current, travelers: event.target.value }))}
            placeholder="Number of travelers"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
            required
          />
          <button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 md:col-span-2">
            Send custom request to WhatsApp
          </button>
        </form>
      </section>
    </div>
  );
}
