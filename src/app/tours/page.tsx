"use client";

import { useMemo, useState } from "react";
import toursContent from "@/content/tours.json";

type TourPackage = (typeof toursContent.packages)[number];

export default function ToursPage() {
  const [destination, setDestination] = useState("All");
  const [budget, setBudget] = useState("All");
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  const destinations = useMemo(
    () => ["All", ...new Set(toursContent.packages.map((tour) => tour.destination))],
    [],
  );
  const budgets = useMemo(
    () => ["All", ...new Set(toursContent.packages.map((tour) => tour.budget))],
    [],
  );

  const filteredTours = useMemo(() => {
    return toursContent.packages.filter((tour) => {
      const destinationMatch = destination === "All" || tour.destination === destination;
      const budgetMatch = budget === "All" || tour.budget === budget;
      return destinationMatch && budgetMatch;
    });
  }, [budget, destination]);

  const handleSelectTour = (tour: TourPackage) => {
    setSelectedTour(tour);
    document.getElementById("tour-inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const quoteMessage = encodeURIComponent(
    selectedTour
      ? `Hello, I would like a quote for ${selectedTour.name}. Duration: ${selectedTour.duration}. Dates: ${selectedTour.dates}.`
      : "Hello, I would like a customized tour quote.",
  );

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Tour packages</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{toursContent.title}</h1>
        <p className="max-w-3xl text-slate-600">{toursContent.subtitle}</p>
      </header>

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
              <p className="text-sm text-slate-600">{tour.summary}</p>
              <p className="text-sm text-slate-600">
                {tour.duration} • {tour.dates}
              </p>
              <p className="text-sm font-semibold text-slate-900">Price: {tour.price}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {tour.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleSelectTour(tour)}
                  className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Book Now →
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectTour(tour)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filteredTours.length === 0 ? (
        <p className="text-sm text-slate-600">No tours match those filters yet. Try broader settings or request a custom quote.</p>
      ) : null}

      <section id="tour-inquiry" className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white">
        <h2 className="text-2xl font-bold">Request a tour quote on this page</h2>
        <p className="mt-2 text-sm text-white/80">
          {selectedTour
            ? `Selected package: ${selectedTour.name} (${selectedTour.duration}, ${selectedTour.dates})`
            : "Select Book Now or Request Quote on any package above to continue from this page."}
        </p>
        <a
          href={`https://wa.me/4917620721491?text=${quoteMessage}`}
          className="mt-4 inline-flex rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
        >
          Continue on WhatsApp
        </a>
      </section>
    </div>
  );
}
