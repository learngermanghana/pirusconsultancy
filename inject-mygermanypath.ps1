# ==========================================
# MyGermanyPath - Inject Pages + Components
# Works with Next.js App Router + Tailwind
# ==========================================

$Domain = "www.mygermanypath.com"
$Root = Get-Location

function Write-File($Path, $Content) {
  $FullPath = Join-Path $Root $Path
  $Dir = Split-Path $FullPath
  if (!(Test-Path $Dir)) { New-Item -ItemType Directory -Force -Path $Dir | Out-Null }
  Set-Content -Path $FullPath -Value $Content -Encoding UTF8
  Write-Host "✅ Wrote: $Path" -ForegroundColor Green
}

Write-Host "`n🚀 Injecting MyGermanyPath pages into: $Root" -ForegroundColor Cyan

# -----------------------
# Shared site config
# -----------------------
Write-File "src/lib/site.ts" @"
export const site = {
  name: "MyGermanyPath",
  domain: "$Domain",
  tagline: "From Ghana & Africa to Germany — choose the right path (Study • Ausbildung • Work).",
};
"@

# -----------------------
# Components: Nav + Footer
# -----------------------
Write-File "src/components/Nav.tsx" @"
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/ausbildung-germany", label: "Ausbildung" },
  { href: "/study-germany", label: "Study" },
  { href: "/studienkolleg", label: "Studienkolleg" },
  { href: "/work-in-germany", label: "Work" },
  { href: "/tools", label: "Tools" },
  { href: "/learn-german", label: "Learn German" },
  { href: "/guidance", label: "Guidance" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          MyGermanyPath
        </Link>

        <nav className="hidden gap-5 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-700 hover:text-black"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/tools/pathway-planner"
          className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Check Your Path
        </Link>
      </div>
    </header>
  );
}
"@

Write-File "src/components/Footer.tsx" @"
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">{site.name}</p>
            <p className="text-sm text-gray-600">{site.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <Link href="/about">About</Link>
            <Link href="/success">Success</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/germany-partner">Germany Partner</Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          ⚠️ Transparency: We provide guidance & preparation support. We do not promise visas or guaranteed jobs.
        </div>
      </div>
    </footer>
  );
}
"@

# -----------------------
# Root Layout update
# -----------------------
Write-File "src/app/layout.tsx" @"
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "MyGermanyPath",
  description: "Study, Ausbildung, and Work guidance for Germany — with real steps, not false promises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
"@

# -----------------------
# Homepage
# -----------------------
Write-File "src/app/page.tsx" @"
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="rounded-3xl border p-8 md:p-12">
        <h1 className="text-3xl font-bold md:text-5xl">
          From Ghana & Africa to Germany — choose the right path
          <span className="block text-gray-600 text-lg md:text-xl mt-3">
            Study • Ausbildung • Work — clear requirements, real timelines, honest guidance.
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/tools/pathway-planner"
            className="rounded-2xl bg-black px-6 py-3 text-center text-white font-semibold hover:opacity-90"
          >
            Check Your Germany Path
          </Link>
          <Link
            href="/learn-german"
            className="rounded-2xl border px-6 py-3 text-center font-semibold hover:bg-gray-50"
          >
            Learn German (Falowen)
          </Link>
        </div>
      </section>

      {/* 3 CARDS */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Ausbildung", desc: "Learn a skill + work in Germany with structured training.", href: "/ausbildung-germany" },
          { title: "Study / Studienkolleg", desc: "University path including preparation programs.", href: "/study-germany" },
          { title: "Jobs in Germany", desc: "Work routes, requirements, and realistic expectations.", href: "/work-in-germany" },
        ].map((c) => (
          <Link key={c.title} href={c.href} className="rounded-3xl border p-6 hover:bg-gray-50">
            <p className="text-lg font-bold">{c.title}</p>
            <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
            <p className="mt-4 text-sm font-semibold">Explore →</p>
          </Link>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="rounded-3xl border p-8">
        <h2 className="text-2xl font-bold">How it works</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-4">
          {[
            "Check your path",
            "See requirements",
            "Prepare (German + documents)",
            "Apply with confidence",
          ].map((s, i) => (
            <li key={s} className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm font-semibold">Step {i + 1}</p>
              <p className="mt-2 text-sm text-gray-700">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-black p-8 text-white">
        <h2 className="text-2xl font-bold">Start your Germany journey</h2>
        <p className="mt-2 text-sm text-white/80">
          Get a clear plan based on your age, education, and German level.
        </p>
        <Link
          href="/tools/pathway-planner"
          className="mt-5 inline-block rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90"
        >
          Start the Planner
        </Link>
      </section>
    </div>
  );
}
"@

# -----------------------
# Pathway pages template
# -----------------------
function Make-PathwayPage($Route, $Title) {
  Write-File "src/app/$Route/page.tsx" @"
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">$Title</h1>
        <p className="text-gray-600">
          Clear requirements, timeline, common mistakes, and the next step you should take.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          ["Who qualifies", "Basic eligibility explained in simple terms."],
          ["German level needed", "What level you must reach (A2/B1/B2 depending)."],
          ["Timeline", "What happens first, what takes time, and what to prepare early."],
          ["Common mistakes", "Avoid delays, scams, and unrealistic expectations."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-3xl border p-6">
            <p className="text-lg font-bold">{t}</p>
            <p className="mt-2 text-sm text-gray-600">{d}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border p-8">
        <h2 className="text-xl font-bold">Next Step</h2>
        <p className="mt-2 text-sm text-gray-600">
          Use the Planner to check if this pathway fits your profile.
        </p>
        <Link
          href="/tools/pathway-planner"
          className="mt-4 inline-block rounded-2xl bg-black px-6 py-3 text-white font-semibold hover:opacity-90"
        >
          Check if this path fits you
        </Link>
      </section>
    </div>
  );
}
"@
}

Make-PathwayPage "ausbildung-germany" "Ausbildung in Germany"
Make-PathwayPage "study-germany" "Study in Germany"
Make-PathwayPage "studienkolleg" "Studienkolleg (Explained Simply)"
Make-PathwayPage "work-in-germany" "Work in Germany"

# -----------------------
# Tools + Planner MVP
# -----------------------
Write-File "src/app/tools/page.tsx" @"
import Link from "next/link";

export default function Tools() {
  const tools = [
    {
      title: "Germany Pathway Planner",
      desc: "Free → Paid detailed plan. Find your best route fast.",
      href: "/tools/pathway-planner",
    },
    {
      title: "Readiness Test",
      desc: "Are you actually ready for Ausbildung / Study?",
      href: "/tools/readiness-test",
    },
    {
      title: "CV & Motivation Builder",
      desc: "Guided tool to build your CV and motivation letter.",
      href: "/tools/cv-builder",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Tools</h1>
      <p className="text-gray-600">
        Pay-per-use tools that give you clarity and preparation steps (no app install).
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.title} href={t.href} className="rounded-3xl border p-6 hover:bg-gray-50">
            <p className="text-lg font-bold">{t.title}</p>
            <p className="mt-2 text-sm text-gray-600">{t.desc}</p>
            <p className="mt-4 text-sm font-semibold">Open →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
"@

Write-File "src/app/tools/pathway-planner/page.tsx" @"
"use client";

import { useMemo, useState } from "react";

type Goal = "Ausbildung" | "Study" | "Work";

export default function Planner() {
  const [age, setAge] = useState<number>(22);
  const [education, setEducation] = useState<string>("SHS / WASSCE");
  const [germanLevel, setGermanLevel] = useState<string>("A1");
  const [goal, setGoal] = useState<Goal>("Ausbildung");

  const result = useMemo(() => {
    let recommended = goal;
    let minGerman = "B1";

    if (goal === "Study") minGerman = "B2";
    if (goal === "Work") minGerman = "B1";

    const notes: string[] = [];
    if (age < 18) notes.push("Age is low — you may need extra preparation time.");
    if (germanLevel === "A0") notes.push("Start German immediately (A1 is your first goal).");

    return { recommended, minGerman, notes };
  }, [age, education, germanLevel, goal]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Germany Pathway Planner</h1>
        <p className="mt-2 text-gray-600">
          Get clarity in minutes. Free basic result → Paid detailed plan.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border p-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border px-3 py-2"
              min={14}
              max={60}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Education</label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="mt-2 w-full rounded-xl border px-3 py-2"
            >
              <option>JHS / BECE</option>
              <option>SHS / WASSCE</option>
              <option>Diploma</option>
              <option>Bachelor</option>
              <option>Masters</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">German Level</label>
            <select
              value={germanLevel}
              onChange={(e) => setGermanLevel(e.target.value)}
              className="mt-2 w-full rounded-xl border px-3 py-2"
            >
              <option>A0</option>
              <option>A1</option>
              <option>A2</option>
              <option>B1</option>
              <option>B2</option>
              <option>C1</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as Goal)}
              className="mt-2 w-full rounded-xl border px-3 py-2"
            >
              <option>Ausbildung</option>
              <option>Study</option>
              <option>Work</option>
            </select>
          </div>
        </section>

        <section className="rounded-3xl border p-6 space-y-4">
          <p className="text-sm text-gray-500">FREE BASIC RESULT</p>
          <h2 className="text-xl font-bold">Recommended Path: {result.recommended}</h2>
          <p className="text-gray-700">
            Minimum German Level you should target:{" "}
            <span className="font-bold">{result.minGerman}</span>
          </p>

          {result.notes.length > 0 && (
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm font-semibold">Notes</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                {result.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl bg-black p-5 text-white">
            <p className="font-semibold">Unlock the detailed plan (PAID)</p>
            <p className="mt-1 text-sm text-white/80">
              Step-by-step checklist, timeline, and document plan for your profile.
            </p>
            <button
              className="mt-4 w-full rounded-xl bg-white px-4 py-2 font-semibold text-black hover:opacity-90"
              onClick={() => alert("Payment integration will be added next (Mobile Money/Card).")}
            >
              Get Detailed Plan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
"@

Write-File "src/app/tools/readiness-test/page.tsx" @"
export default function Readiness() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Readiness Test</h1>
      <p className="text-gray-600">
        Coming next: a quick test that tells you if you're truly ready for Ausbildung / Study.
      </p>
    </div>
  );
}
"@

Write-File "src/app/tools/cv-builder/page.tsx" @"
export default function CVBuilder() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">CV & Motivation Builder</h1>
      <p className="text-gray-600">
        Coming next: guided prompts → auto-format → download your documents.
      </p>
    </div>
  );
}
"@

# -----------------------
# Falowen + Guidance + Partner + Success + About + Contact
# -----------------------
Write-File "src/app/learn-german/page.tsx" @"
import Link from "next/link";

export default function LearnGerman() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Learn German (Falowen)</h1>
      <p className="text-gray-600">
        German is not optional — we help you reach the level you need for your Germany goal.
      </p>

      <section className="rounded-3xl border p-6 space-y-3">
        <h2 className="text-xl font-bold">Pricing</h2>
        <ul className="list-disc pl-5 text-gray-700 text-sm">
          <li>A1 Dortmund Klasse Hybrid Class 2026</li>
          <li>A2–C1 = 3000</li>
          <li>B2/C1 self-learning plan (6 months)</li>
        </ul>

        <div className="pt-3">
          <Link
            href="#"
            className="inline-block rounded-2xl bg-black px-6 py-3 text-white font-semibold hover:opacity-90"
          >
            Download Falowen (Play Store)
          </Link>
        </div>
      </section>
    </div>
  );
}
"@

Write-File "src/app/guidance/page.tsx" @"
export default function Guidance() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Guidance & Support</h1>
      <p className="text-gray-600">
        Premium human help for serious applicants — CV review, motivation letters, interview prep, and application guidance.
      </p>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          "CV Review",
          "Motivation Letter Help",
          "Interview Preparation",
          "Application Guidance",
        ].map((s) => (
          <div key={s} className="rounded-3xl border p-6">
            <p className="text-lg font-bold">{s}</p>
            <p className="mt-2 text-sm text-gray-600">
              Clear feedback + practical improvements based on Germany expectations.
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border p-6">
        <p className="text-sm font-semibold">Transparency</p>
        <p className="mt-2 text-sm text-gray-700">
          We guide and prepare. We do not promise visas or guaranteed jobs.
        </p>

        <button
          className="mt-4 rounded-2xl bg-black px-6 py-3 font-semibold text-white hover:opacity-90"
          onClick={() => alert("Booking + payment will be added next.")}
        >
          Book Guidance
        </button>
      </section>
    </div>
  );
}
"@

Write-File "src/app/germany-partner/page.tsx" @"
export default function Partner() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Our Germany Partner</h1>
      <p className="text-gray-600">
        Germany-based support and local insight to help clients understand processes clearly.
      </p>

      <section className="rounded-3xl border p-6 space-y-2">
        <p className="font-semibold">Role & Support</p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Helps with realistic guidance and Germany context</li>
          <li>Supports clients with questions and clarity</li>
          <li>No ownership titles and no personal payments</li>
        </ul>

        <p className="mt-4 text-xs text-gray-500">
          Payments are made only to MyGermanyPath / Learn Language Education Academy — not to individuals.
        </p>
      </section>
    </div>
  );
}
"@

Write-File "src/app/success/page.tsx" @"
export default function Success() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Success Stories</h1>
      <p className="text-gray-600">
        Real journeys — including progress stories (still learning, still preparing, still applying).
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          "Started A1 → now A2",
          "Preparing documents for Ausbildung",
          "Booked guidance + improved motivation letter",
        ].map((s) => (
          <div key={s} className="rounded-3xl border p-6">
            <p className="font-bold">{s}</p>
            <p className="mt-2 text-sm text-gray-600">Story content will be added here.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
"@

Write-File "src/app/about/page.tsx" @"
export default function About() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="text-gray-600">
        This platform exists to give Africans clear, honest guidance for Germany — with preparation support and German learning.
      </p>

      <section className="rounded-3xl border p-6">
        <h2 className="text-xl font-bold">Ethics & Transparency</h2>
        <p className="mt-2 text-sm text-gray-700">
          No fake promises. No visa guarantees. Just real preparation, skills, and guidance.
        </p>
      </section>
    </div>
  );
}
"@

Write-File "src/app/contact/page.tsx" @"
export default function Contact() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-gray-600">
        WhatsApp, Email, and Office details (if any) will be placed here.
      </p>

      <section className="rounded-3xl border p-6 space-y-2">
        <p className="text-sm font-semibold">WhatsApp</p>
        <p className="text-sm text-gray-700">+233 XXX XXX XXX</p>
        <p className="text-sm font-semibold mt-3">Email</p>
        <p className="text-sm text-gray-700">support@mygermanypath.com</p>
      </section>
    </div>
  );
}
"@

Write-Host "`n🎉 DONE! MyGermanyPath pages injected successfully." -ForegroundColor Green
Write-Host "Run: npm run dev" -ForegroundColor Yellow
