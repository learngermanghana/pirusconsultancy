"use client";

import { useMemo, useState } from "react";

const resources = [
  { title: "Step-by-step Schengen visa process", type: "Visa processes", blurb: "Requirements, appointment timing, and common refusal triggers." },
  { title: "Germany destination guide for first-time visitors", type: "Destination guides", blurb: "Transport, accommodation zones, and local travel budget planning." },
  { title: "Travel packing checklist for winter and summer trips", type: "Packing lists", blurb: "What to pack based on weather, trip purpose, and duration." },
  { title: "Cultural etiquette essentials for Europe", type: "Cultural tips", blurb: "Communication norms, punctuality, and practical social expectations." },
  { title: "2026 policy updates: visa biometrics and timelines", type: "Policy updates", blurb: "Recent processing updates and how they change preparation timelines." },
];

export default function BlogPage() {
  const [query, setQuery] = useState("");

  const filteredResources = useMemo(() => {
    const normalized = query.toLowerCase();
    return resources.filter((resource) =>
      `${resource.title} ${resource.type} ${resource.blurb}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Travel resources & blog</p>
        <h1 className="text-3xl font-bold text-slate-900">Resource hub</h1>
        <p className="text-sm text-slate-600">
          Browse practical guides on visa processes, destination planning, packing lists, cultural tips, and policy updates.
        </p>
      </header>

      <label className="block text-sm font-semibold text-slate-700">
        Search resources
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by keyword, topic, or destination"
          className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        />
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        {filteredResources.map((resource) => (
          <article key={resource.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{resource.type}</p>
            <h2 className="mt-2 text-base font-semibold text-slate-900">{resource.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{resource.blurb}</p>
          </article>
        ))}
      </div>

      {filteredResources.length === 0 ? (
        <p className="text-sm text-slate-500">No resources match your search yet. Try another keyword.</p>
      ) : null}
    </div>
  );
}
