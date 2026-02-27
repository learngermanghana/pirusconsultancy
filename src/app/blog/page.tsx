"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { blogStories } from "@/lib/blogStories";

const categories = [
  "Visitor visa guides",
  "Student visa resources",
  "Work visa preparation",
  "Interview preparation",
  "Travel checklists",
  "Refusal prevention",
] as const;

const popularGuides = [
  "Visitor visa checklist",
  "Student visa interview guide",
  "Work visa document list",
  "Common refusal reasons",
];

const refusalPreventionTips = [
  "Weak travel purpose",
  "Poor financial proof",
  "Inconsistent documents",
  "No clear return plans",
];

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return blogStories.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery = `${post.title} ${post.category} ${post.blurb}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Travel resources & blog</p>
        <h1 className="text-3xl font-bold text-slate-900">Travel & Visa Resource Center</h1>
        <p className="text-sm text-slate-600">
          Guides, checklists, and real-world advice to help you prepare stronger visa applications and avoid common mistakes.
        </p>
      </header>

      <section className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Start here: Most popular guides</h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          {popularGuides.map((guide) => (
            <li key={guide} className="rounded-lg border border-sky-200 bg-white px-3 py-2">{guide}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700" htmlFor="resource-search">
          Search resources
        </label>
        <input
          id="resource-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search resources..."
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              activeCategory === "All" ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            All resources
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                activeCategory === category ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <article key={post.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="relative h-44 w-full">
              <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className="space-y-3 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                {post.category} • {post.readTime}
              </p>
              <h2 className="text-base font-semibold text-slate-900">{post.title}</h2>
              <p className="text-sm text-slate-600">{post.blurb}</p>
              <Link href={`/blog/${post.slug}`} className="inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
                Read story →
              </Link>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-sm font-semibold text-emerald-900">Ready to apply?</p>
                <p className="text-sm text-emerald-800">Start your visa assessment in 60 seconds.</p>
                <Link href="/" className="mt-2 inline-block text-sm font-semibold text-emerald-900 underline">
                  Start your assessment
                </Link>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <p className="font-semibold text-slate-700">Written by:</p>
                <p>Pirus Consultancy Advisory Team</p>
                <p>Travel & visa documentation specialists</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">Related guides</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-600">
                  {post.relatedGuides.map((guide) => (
                    <li key={guide}>{guide}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 ? <p className="text-sm text-slate-500">No resources match your search yet. Try another keyword.</p> : null}

      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Refusal prevention: avoid these common visa mistakes</h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          {refusalPreventionTips.map((tip) => (
            <li key={tip} className="rounded-lg border border-rose-200 bg-white px-3 py-2">{tip}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-800">Free download</p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">Germany Work Visa Starter Checklist</h2>
        <p className="mt-1 text-sm text-slate-700">Enter your email to get the PDF.</p>
        <form className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input type="email" required placeholder="you@example.com" className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm" />
          <button type="submit" className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">
            Send me the checklist
          </button>
        </form>
      </section>
    </div>
  );
}
