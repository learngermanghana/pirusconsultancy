"use client";

import { useMemo, useState } from "react";

const posts = [
  {
    title: "Study in Europe: Essential Documents Checklist",
    category: "Study Abroad",
    blurb: "Understand the core documents and preparation steps before your application submission.",
    href: "https://www.pirusconsultancy.com/blog",
  },
  {
    title: "Travel Planning Tips for First-Time International Applicants",
    category: "Travel Planning",
    blurb: "A practical guide to timelines, appointments, and travel readiness.",
    href: "https://www.pirusconsultancy.com/blog",
  },
  {
    title: "How to Prepare for Visa Interviews",
    category: "Visa Guidance",
    blurb: "Learn common interview patterns and how to present your profile confidently.",
    href: "https://www.pirusconsultancy.com/blog",
  },
  {
    title: "Common Mistakes in Student Applications and How to Avoid Them",
    category: "Application Strategy",
    blurb: "Reduce rejection risks by avoiding frequent errors in forms and supporting documents.",
    href: "https://www.pirusconsultancy.com/blog",
  },
];

export default function BlogPage() {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalized = query.toLowerCase();
    return posts.filter((post) => `${post.title} ${post.category} ${post.blurb}`.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Travel resources & blog</p>
        <h1 className="text-3xl font-bold text-slate-900">Resource hub</h1>
        <p className="text-sm text-slate-600">Read selected posts from Pirus Consultancy. Each article opens in a new tab.</p>
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
        {filteredPosts.map((post) => (
          <article key={post.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{post.category}</p>
            <h2 className="mt-2 text-base font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{post.blurb}</p>
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              Open article ↗
            </a>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 ? <p className="text-sm text-slate-500">No resources match your search yet. Try another keyword.</p> : null}
    </div>
  );
}
