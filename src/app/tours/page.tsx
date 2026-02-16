"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toursContent from "@/content/tours.json";

type TourPackage = (typeof toursContent.packages)[number];

const durations = ["All", "4-6 days", "5 days", "5-7 days", "5-8 days", "5-10 days", "6-8 days"];
const budgets = ["All", "Budget-friendly", "Mid-range", "Premium"];

export default function ToursPage() {
  const [destination, setDestination] = useState("All");
  const [budget, setBudget] = useState("All");
  const [duration, setDuration] = useState("All");

  const destinations = useMemo(() => {
    return ["All", ...new Set(toursContent.packages.map((tour) => tour.destination))];
  }, []);

  const filteredTours = useMemo(() => {
    return toursContent.packages.filter((tour) => {
      const destinationMatch = destination === "All" || tour.destination === destination;
      const budgetMatch = budget === "All" || tour.budget === budget;
      const durationMatch = duration === "All" || tour.duration === duration;

      return destinationMatch && budgetMatch && durationMatch;
    });
  }, [destination, budget, duration]);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Tours &amp; Travel</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{toursContent.title}</h1>
        <p className="max-w-3xl text-base text-slate-600">{toursContent.subtitle}</p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Request a Quote</h2>
        <p className="mt-2 text-sm text-slate-600">Filter by destination, budget, or duration to find the right option.</p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Destination</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            >
              {destinations.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Budget</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            >
              {budgets.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Duration</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            >
              {durations.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {filteredTours.map((tour: TourPackage) => (
          <article key={tour.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">{tour.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{tour.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{tour.duration} • Flexible dates</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{tour.destination}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{tour.budget}</span>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900">Price: {tour.price}</p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {tour.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Book Now →
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Request Quote
              </Link>
            </div>
          </article>
        ))}
      </section>

      {filteredTours.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          No tour package matches this filter yet. Please clear one of the filters or contact us for custom planning.
        </section>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">{toursContent.whyChoose.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{toursContent.whyChoose.subtitle}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {toursContent.whyChoose.points.map((point) => (
            <div key={point.title} className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-base font-semibold text-slate-900">{point.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{point.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
