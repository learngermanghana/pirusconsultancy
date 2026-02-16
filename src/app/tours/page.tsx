"use client";

import { useMemo, useState } from "react";

type Tour = {
  name: string;
  destination: string;
  durationDays: number;
  budget: "Economy" | "Standard" | "Premium";
  image: string;
  mapHint: string;
};

const tours: Tour[] = [
  {
    name: "Berlin & Munich Discovery",
    destination: "Germany",
    durationDays: 7,
    budget: "Standard",
    image: "/images/pexels-alexander-f-1972464.jpg",
    mapHint: "Berlin → Munich",
  },
  {
    name: "Romantic Paris Escape",
    destination: "France",
    durationDays: 5,
    budget: "Premium",
    image: "/images/pexels-jplenio-1133957.jpg",
    mapHint: "Paris city highlights",
  },
  {
    name: "Amsterdam Weekend Break",
    destination: "Netherlands",
    durationDays: 3,
    budget: "Economy",
    image: "/images/pexels-vincent-rivaud-2265876.jpg",
    mapHint: "Canal district walking route",
  },
  {
    name: "Austria Alps Family Tour",
    destination: "Austria",
    durationDays: 8,
    budget: "Standard",
    image: "/images/pexels-pixabay-417074.jpg",
    mapHint: "Vienna + Salzburg + Innsbruck",
  },
];

export default function ToursPage() {
  const [destination, setDestination] = useState("All");
  const [duration, setDuration] = useState("All");
  const [budget, setBudget] = useState("All");

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const destinationMatch = destination === "All" || tour.destination === destination;
      const durationMatch =
        duration === "All" ||
        (duration === "Short (1-4 days)" && tour.durationDays <= 4) ||
        (duration === "Medium (5-7 days)" && tour.durationDays >= 5 && tour.durationDays <= 7) ||
        (duration === "Long (8+ days)" && tour.durationDays >= 8);
      const budgetMatch = budget === "All" || tour.budget === budget;
      return destinationMatch && durationMatch && budgetMatch;
    });
  }, [budget, destination, duration]);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Interactive tours catalogue</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Find the right trip package faster</h1>
        <p className="max-w-3xl text-slate-600">
          Filter tours by destination, duration, and budget, then request a customized quote with your preferred dates.
        </p>
      </header>

      <section className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-3">
        <label className="text-sm font-medium text-slate-700">
          Destination
          <select value={destination} onChange={(event) => setDestination(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2">
            <option>All</option>
            <option>Germany</option>
            <option>France</option>
            <option>Netherlands</option>
            <option>Austria</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Duration
          <select value={duration} onChange={(event) => setDuration(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2">
            <option>All</option>
            <option>Short (1-4 days)</option>
            <option>Medium (5-7 days)</option>
            <option>Long (8+ days)</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Budget
          <select value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2">
            <option>All</option>
            <option>Economy</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        </label>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {filteredTours.map((tour) => (
          <article key={tour.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img src={tour.image} alt={tour.name} className="h-44 w-full object-cover" />
            <div className="space-y-3 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-900">{tour.name}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{tour.budget}</span>
              </div>
              <p className="text-sm text-slate-600">
                Destination: {tour.destination} • Duration: {tour.durationDays} days
              </p>
              <div className="rounded-2xl border border-sky-100 bg-sky-50 p-3 text-sm text-sky-900">
                <p className="font-semibold">Map preview</p>
                <p>{tour.mapHint}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filteredTours.length === 0 ? (
        <p className="text-sm text-slate-600">No tours match those filters yet. Try broader settings or request a custom quote.</p>
      ) : null}

      <section className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white">
        <h2 className="text-2xl font-bold">Request a customized tour quote</h2>
        <p className="mt-2 text-sm text-white/80">Share destination, dates, and budget preferences for a tailored package proposal.</p>
        <a
          href="https://wa.me/4917620721491?text=Hello%2C%20I%20would%20like%20a%20customized%20tour%20quote."
          className="mt-4 inline-flex rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
        >
          Request custom quote
        </a>
      </section>
    </div>
  );
}
