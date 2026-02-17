"use client";

import { useEffect, useMemo, useState } from "react";
import nextDynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import MotivationPdf from "./pdf";

const PRICE_GHS = 60;

export const dynamic = "force-dynamic";

const PDFDownloadLink = nextDynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false },
);

type PathType = "Ausbildung" | "Study" | "Work";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  city: string;

  path: PathType;
  targetProgram: string;
  germanLevel: string;

  whyGermany: string;
  whyThisPath: string;
  experience: string;
  strengths: string;
  timeline: string;
};

export default function MotivationBuilderPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [paid, setPaid] = useState(false);
  const [checking, setChecking] = useState(false);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiLetter, setAiLetter] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: "Hana",
    email: "yourmail@example.com",
    phone: "+233 XXX XXX XXX",
    nationality: "Ghanaian",
    city: "Accra",

    path: "Ausbildung",
    targetProgram: "Nursing / Care Assistant",
    germanLevel: "A2/B1",

    whyGermany:
      "Germany offers structured training, career growth, and a strong professional environment.",
    whyThisPath:
      "I chose this path because I want practical skills, stable work, and a recognized qualification.",
    experience:
      "I have experience teaching and supporting learners, and I am disciplined in learning new skills.",
    strengths:
      "Hard-working, reliable, fast learner, good communication, respectful, team player.",
    timeline:
      "Ready within 6–12 months after completing required documents and German level.",
  });

  const templateLetter = useMemo(() => generateLetter(form), [form]);
  const letterText = aiLetter ?? templateLetter;

  // ✅ Verify Paystack after redirect
  useEffect(() => {
    const verify = async () => {
      if (!reference) return;

      setChecking(true);
      setMessage("Verifying payment…");

      const res = await fetch(`/api/paystack/verify?reference=${reference}`);
      const json = await res.json();

      if (json?.ok && json?.paid) {
        setPaid(true);
        setMessage("✅ Payment verified! PDF download unlocked.");
      } else {
        setPaid(false);
        setMessage("❌ Payment not verified. Please try again.");
      }

      setChecking(false);
    };

    verify();
  }, [reference]);

  async function payNow() {
    if (!form.email.includes("@")) {
      setMessage("⚠️ Please enter a valid email before paying.");
      return;
    }

    setPaying(true);
    setMessage("Redirecting to Paystack…");

    const amountPesewas = PRICE_GHS * 100;

    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, amountPesewas }),
    });

    const json = await res.json();

    if (!json?.ok) {
      setMessage("❌ Paystack init failed. Check your secret key / internet.");
      setPaying(false);
      return;
    }

    window.location.href = json.authorization_url;
  }

  async function generateWithAi() {
    setAiLoading(true);
    setAiMessage("Generating your AI draft…");

    const res = await fetch("/api/motivation-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const json = await res.json();

    if (!json?.ok) {
      setAiMessage(
        json?.error
          ? `❌ AI generation failed: ${json.error}`
          : "❌ AI generation failed. Please try again.",
      );
      setAiLoading(false);
      return;
    }

    setAiLetter(json.letter);
    setAiMessage("✅ AI draft ready. Review and edit anytime.");
    setAiLoading(false);
  }

  async function saveAccountDetails() {
    if (!form.email.includes("@")) {
      setSaveMessage("⚠️ Please enter a valid email before saving.");
      return;
    }

    setSaving(true);
    setSaveMessage("Saving your details…");

    const res = await fetch("/api/account/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        fullName: form.fullName,
        phone: form.phone,
        nationality: form.nationality,
        city: form.city,
        source: "motivation-builder",
        formData: form,
      }),
    });

    const json = await res.json();

    if (!json?.ok) {
      setSaveMessage(
        json?.error ? `❌ Save failed: ${json.error}` : "❌ Save failed. Please try again.",
      );
      setSaving(false);
      return;
    }

    setSaveMessage("✅ Saved! We can now remember your details for future sessions.");
    setSaving(false);
  }

  function resetToTemplate() {
    setAiLetter(null);
    setAiMessage("Switched back to the standard template.");
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  const safeFilename = useMemo(() => {
    const base = form.fullName?.trim() || "Motivation_Letter";
    return base.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  }, [form.fullName]);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <span className="inline-flex w-fit items-center rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          Motivation Letter Builder
        </span>
        <h1 className="text-3xl font-bold">Write a strong, Germany-ready motivation letter</h1>
        <p className="max-w-2xl text-gray-600">
          Answer the prompts, preview your letter instantly, and download a clean PDF once payment is verified.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { title: "Tell your story", desc: "Capture your goals, path, and strengths with guided prompts." },
            { title: "Preview instantly", desc: "See the letter update live as you type." },
            { title: "Download PDF", desc: "Pay with Paystack to unlock a polished PDF." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border bg-white p-4 text-sm">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </header>

      {!!message && (
        <div className="rounded-2xl border bg-gray-50 p-4 text-sm">
          {message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FORM */}
        <section className="rounded-3xl border p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold">Your Details</h2>
            <p className="text-sm text-gray-600">These details appear in the greeting and closing lines.</p>
          </div>

          <div className="space-y-4">
            <Input label="Full Name" value={form.fullName} onChange={(v) => update("fullName", v)} helper="Match your passport or official ID." />
            <Input label="Email (required for Paystack)" value={form.email} onChange={(v) => update("email", v)} helper="Use an email you check often." />
            <Input label="Phone" value={form.phone} onChange={(v) => update("phone", v)} helper="Include country code." />
            <Input label="Nationality" value={form.nationality} onChange={(v) => update("nationality", v)} />
            <Input label="City" value={form.city} onChange={(v) => update("city", v)} />
          </div>

          <div className="rounded-2xl border bg-white p-4 text-sm">
            <p className="font-semibold">Save your details</p>
            <p className="mt-1 text-gray-600">
              Store your account info securely so you can reuse it next time.
            </p>
            <button
              onClick={saveAccountDetails}
              disabled={saving}
              className="mt-3 w-full rounded-xl bg-black px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save my details"}
            </button>
            {!!saveMessage && <p className="mt-2 text-sm text-gray-600">{saveMessage}</p>}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Target</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Select
                label="Path"
                value={form.path}
                onChange={(v) => update("path", v as PathType)}
                options={["Ausbildung", "Study", "Work"]}
              />
              <Input label="German Level" value={form.germanLevel} onChange={(v) => update("germanLevel", v)} helper="Example: A2/B1." />
            </div>

            <Input
              label="Target program / job"
              value={form.targetProgram}
              onChange={(v) => update("targetProgram", v)}
              helper="Be specific so the letter feels focused."
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Your Motivation</h3>
            <Textarea
              label="Why Germany?"
              value={form.whyGermany}
              onChange={(v) => update("whyGermany", v)}
              helper="Highlight training quality, career growth, or culture fit."
              maxLength={320}
            />
            <Textarea
              label="Why this path?"
              value={form.whyThisPath}
              onChange={(v) => update("whyThisPath", v)}
              helper="Connect this path to your personal goals."
              maxLength={320}
            />
            <Textarea
              label="Your experience"
              value={form.experience}
              onChange={(v) => update("experience", v)}
              helper="Mention relevant work, volunteering, or studies."
              maxLength={320}
            />
            <Textarea
              label="Your strengths"
              value={form.strengths}
              onChange={(v) => update("strengths", v)}
              helper="List 4–6 strengths employers value."
              maxLength={260}
            />
            <Textarea
              label="Timeline"
              value={form.timeline}
              onChange={(v) => update("timeline", v)}
              helper="Share when you can start or arrive in Germany."
              maxLength={200}
            />
          </div>

          <div className="rounded-2xl bg-black p-5 text-white">
            <p className="font-semibold">Download PDF requires payment</p>
            <p className="mt-1 text-sm text-white/80">Price: GHS {PRICE_GHS}</p>

            {!paid ? (
              <button
                onClick={payNow}
                disabled={paying || checking}
                className="mt-4 w-full rounded-xl bg-white px-4 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-60"
              >
                {paying ? "Redirecting..." : "Pay with Paystack"}
              </button>
            ) : (
              <PDFDownloadLink
                document={<MotivationPdf fullName={form.fullName} letter={letterText} />}
                fileName={`${safeFilename}_motivation_letter.pdf`}
                className="mt-4 block w-full rounded-xl bg-white px-4 py-2 text-center font-semibold text-black hover:opacity-90"
              >
                Download PDF ✅
              </PDFDownloadLink>
            )}
          </div>
        </section>

        {/* PREVIEW */}
        <section className="rounded-3xl border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Preview</h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {aiLetter ? "AI Draft" : "Auto-updated template"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={generateWithAi}
                disabled={aiLoading}
                className="rounded-full border px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
              >
                {aiLoading ? "Generating..." : "Generate with OpenAI"}
              </button>
              {aiLetter ? (
                <button
                  onClick={resetToTemplate}
                  className="rounded-full border px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Use template
                </button>
              ) : null}
            </div>
          </div>
          {aiMessage ? (
            <div className="rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
              {aiMessage}
              {aiLetter ? (
                <p className="mt-2 text-xs text-gray-500">
                  Your AI draft will not auto-update when you change the form. Regenerate to refresh.
                </p>
              ) : null}
            </div>
          ) : null}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-800">
{letterText}
            </pre>
          </div>
          <div className="rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Quick quality checklist</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Keep each paragraph focused on one idea.</li>
              <li>Match the role or program name exactly.</li>
              <li>Keep the tone respectful and confident.</li>
              <li>Confirm your timeline is realistic.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

function generateLetter(f: FormData) {
  const today = new Date().toLocaleDateString();
  return `${today}

Subject: Application for ${f.path} — ${f.targetProgram}

Dear Sir/Madam,

My name is ${f.fullName}, a ${f.nationality} based in ${f.city}. I am writing to express my strong interest in pursuing ${f.path} in Germany, specifically in the area of ${f.targetProgram}. I am currently improving my German level (${f.germanLevel}) and preparing all required documents.

Why Germany:
${f.whyGermany}

Why this pathway:
${f.whyThisPath}

Experience:
${f.experience}

Strengths:
${f.strengths}

Timeline:
${f.timeline}

Thank you for your time and consideration.

Yours faithfully,
${f.fullName}
Phone: ${f.phone}
Email: ${f.email}
`;
}

function Input({
  label,
  value,
  onChange,
  helper,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  helper?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2" />
      {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  helper,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  helper?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold">{label}</label>
        {maxLength ? (
          <span className="text-xs text-gray-400">
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border px-3 py-2"
        rows={4}
        maxLength={maxLength}
      />
      {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2 bg-white">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
