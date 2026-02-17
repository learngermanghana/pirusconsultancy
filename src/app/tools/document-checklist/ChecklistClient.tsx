"use client";

import { useEffect, useMemo, useState } from "react";
import nextDynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ChecklistPdf from "./pdf";

const PRICE_GHS = 40;

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

  path: PathType;
  age: string;
  education: string;
  germanLevel: string;

  timelineMonths: string;
};

type ChecklistData = {
  title: string;
  items: string[];
  timeline: string;
  mistakes: string[];
  optionsTitle: string | null;
  optionsNote: string | null;
  options: string[];
};

export default function DocumentChecklistPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [paid, setPaid] = useState(false);
  const [checking, setChecking] = useState(false);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: "Hana",
    email: "yourmail@example.com",
    phone: "+233 XXX XXX XXX",

    path: "Ausbildung",
    age: "24",
    education: "WASSCE / SHS",
    germanLevel: "A2/B1",
    timelineMonths: "6",
  });

  // ✅ checklist output
  const checklist = useMemo(() => buildChecklist(form), [form]);

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
        source: "document-checklist",
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

    setSaveMessage("✅ Saved! We will remember your details for future sessions.");
    setSaving(false);
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  const safeFilename = useMemo(() => {
    const base = form.fullName?.trim() || "Checklist";
    return base.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  }, [form.fullName]);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Document Checklist Generator</h1>
        <p className="text-gray-600">
          Choose your Germany path → get a full checklist + timeline → Paystack → download PDF.
        </p>
      </header>

      {!!message && (
        <div className="rounded-2xl border bg-gray-50 p-4 text-sm">
          {message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FORM */}
        <section className="rounded-3xl border p-6 space-y-5">
          <h2 className="text-lg font-bold">Your Details</h2>

          <Input label="Full Name" value={form.fullName} onChange={(v) => update("fullName", v)} />
          <Input label="Email (required for Paystack)" value={form.email} onChange={(v) => update("email", v)} />
          <Input label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />

          <div className="grid gap-3 md:grid-cols-2">
            <Select
              label="Path"
              value={form.path}
              onChange={(v) => update("path", v as PathType)}
              options={["Ausbildung", "Study", "Work"]}
            />
            <Input label="German Level" value={form.germanLevel} onChange={(v) => update("germanLevel", v)} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Age" value={form.age} onChange={(v) => update("age", v)} />
            <Input label="Education" value={form.education} onChange={(v) => update("education", v)} />
          </div>

          <Input
            label="Timeline (months to prepare)"
            value={form.timelineMonths}
            onChange={(v) => update("timelineMonths", v)}
          />

          <div className="rounded-2xl border bg-white p-4 text-sm">
            <p className="font-semibold">Save your details</p>
            <p className="mt-1 text-gray-600">
              Store your account info securely so we can prefill it next time.
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
                document={<ChecklistPdf fullName={form.fullName} data={checklist} />}
                fileName={`${safeFilename}_checklist.pdf`}
                className="mt-4 block w-full rounded-xl bg-white px-4 py-2 text-center font-semibold text-black hover:opacity-90"
              >
                Download PDF ✅
              </PDFDownloadLink>
            )}
          </div>
        </section>

        {/* PREVIEW */}
        <section className="rounded-3xl border p-6 space-y-4">
          <h2 className="text-lg font-bold">Preview</h2>

          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-5">
            <Block title="Your Path">{checklist.title}</Block>

            <Block title="Checklist">
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {checklist.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Block>

            {checklist.options.length > 0 && checklist.optionsTitle && (
              <Block title={checklist.optionsTitle}>
                {checklist.optionsNote && (
                  <p className="text-sm text-gray-600">{checklist.optionsNote}</p>
                )}
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {checklist.options.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </Block>
            )}

            <Block title="Timeline">
              <p className="text-sm text-gray-700">{checklist.timeline}</p>
            </Block>

            <Block title="Common Mistakes">
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {checklist.mistakes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Block>
          </div>
        </section>
      </div>
    </div>
  );
}

function buildChecklist(form: FormData): ChecklistData {
  const title = `${form.path} — Document Checklist`;

  const base = [
    "Valid passport",
    "Passport photo (biometric)",
    "Birth certificate (if required)",
    "Police clearance (when needed)",
    "CV (Germany format)",
    "Motivation letter",
    "German certificate (A2/B1/B2 depending on path)",
    "Proof of funds (if required for your path)",
  ];

  const ausbildung = [
    "WASSCE certificate + transcripts",
    "Recognition/translation (if needed)",
    "Training contract / offer letter",
    "Employer documents (if requested by embassy)",
  ];

  const study = [
    "WASSCE + transcripts",
    "University admission letter OR Studienkolleg acceptance",
    "APS (if applicable to your country)",
    "Blocked account / sponsor proof (as required)",
  ];

  const work = [
    "Work experience proof (letters/contracts)",
    "Certificates and references",
    "Job offer / contract",
    "Recognition for profession (if needed)",
  ];

  const pathDocs =
    form.path === "Ausbildung" ? ausbildung : form.path === "Study" ? study : work;

  const items = Array.from(new Set([...base, ...pathDocs]));

  const timeline = `Recommended preparation timeline: ${form.timelineMonths} month(s). Focus first on German level (${form.germanLevel}), then documents, then applications and interviews.`;

  const mistakes = [
    "Applying without required German level",
    "Fake documents or inconsistent dates",
    "Bad CV format (not Germany style)",
    "Wrong path for your age/education",
    "No clear plan for money + timeline",
  ];

  const ausbildungOptions = [
    "Nursing / Pflegefachkraft",
    "Hotel & hospitality (Hotelfachmann/-frau)",
    "Mechatronics (Mechatroniker/-in)",
    "IT specialist (Fachinformatiker/-in)",
    "Electrician (Elektroniker/-in)",
    "Automotive technician (Kfz-Mechatroniker/-in)",
  ];

  const studyOptions = [
    "Computer Science / IT",
    "Business Administration",
    "Mechanical Engineering",
    "Data Science / AI",
    "Nursing / Public Health",
    "Hospitality & Tourism",
  ];

  const options =
    form.path === "Ausbildung"
      ? ausbildungOptions
      : form.path === "Study"
        ? studyOptions
        : [];

  const optionsTitle =
    form.path === "Ausbildung"
      ? "Possible Ausbildung Options (for appointment booking)"
      : form.path === "Study"
        ? "Possible Study Courses (for appointment booking)"
        : null;

  const optionsNote =
    options.length > 0
      ? "No school or company website access is needed. Pick one option to mention when booking your appointment."
      : null;

  return { title, items, timeline, mistakes, optionsTitle, optionsNote, options };
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2" />
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

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-bold">{title}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
