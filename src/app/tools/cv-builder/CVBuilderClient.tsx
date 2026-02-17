"use client";

import { useEffect, useMemo, useState } from "react";
import nextDynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import CVPdf from "./pdf";

type Education = { school: string; program: string; period: string };
type Experience = { company: string; role: string; period: string; bullets: string[] };

type CVData = {
  fullName: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  skills: string[];
  languages: string[];
  education: Education[];
  experience: Experience[];
  certificates: string[];
};

type Template = "Classic" | "Modern" | "Minimal";

const parsedPrice = Number.parseFloat(process.env.NEXT_PUBLIC_CV_PRICE_GHS ?? "50");
const PRICE_GHS = Number.isFinite(parsedPrice) ? parsedPrice : 50;

export const dynamic = "force-dynamic";

const PDFDownloadLink = nextDynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false },
);

export default function CVBuilderPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [paid, setPaid] = useState(false);
  const [checking, setChecking] = useState(false);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [template, setTemplate] = useState<Template>("Classic");

  const [data, setData] = useState<CVData>({
    fullName: "Hana",
    title: "German Teacher / Applicant (Germany)",
    location: "Accra, Ghana",
    phone: "+233 XXX XXX XXX",
    email: "yourmail@example.com",
    linkedin: "",
    summary:
      "Motivated and disciplined applicant with strong communication skills and experience in teaching and customer support. Currently preparing for opportunities in Germany and improving German language level.",
    skills: ["Communication", "Teamwork", "Customer Service", "Time Management"],
    languages: ["English", "German (A2/B1)"],
    education: [{ school: "Senior High School", program: "WASSCE", period: "2011" }],
    experience: [
      {
        company: "Learn Language Education Academy",
        role: "German Teacher",
        period: "2020 – Present",
        bullets: [
          "Taught German language classes and guided learners through A1–B1.",
          "Prepared students for exams and created structured lesson plans.",
        ],
      },
    ],
    certificates: ["German Language Certificate (A1/A2/B1)"],
  });

  const safeFilename = useMemo(() => {
    const base = data.fullName?.trim() || "CV";
    return base.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  }, [data.fullName]);

  // ✅ If Paystack redirected back with a reference, verify it
  useEffect(() => {
    const verify = async () => {
      if (!reference) return;

      setChecking(true);
      setMessage("Verifying payment…");

      try {
        const res = await fetch(`/api/paystack/verify?reference=${reference}`);
        const json = await res.json();

        if (json?.ok && json?.paid) {
          setPaid(true);
          setMessage("✅ Payment verified! Download is unlocked.");
        } else {
          setPaid(false);
          setMessage("❌ Payment not verified. Please try again.");
        }
      } catch (error) {
        setPaid(false);
        setMessage("❌ Unable to verify payment. Check your connection and retry.");
      } finally {
        setChecking(false);
      }
    };

    verify();
  }, [reference]);

  async function payNow() {
    const trimmedName = data.fullName.trim();
    const trimmedPhone = data.phone.trim();
    const trimmedEmail = data.email.trim();

    if (!trimmedName) {
      setMessage("⚠️ Full name is required before paying.");
      return;
    }

    if (!trimmedPhone) {
      setMessage("⚠️ Phone number is required before paying.");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setMessage("⚠️ Please enter a valid email before paying.");
      return;
    }

    setPaying(true);
    setMessage("Redirecting to Paystack…");

    try {
      const amountPesewas = Math.round(PRICE_GHS * 100); // Paystack uses lowest currency unit (pesewas for GHS)
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, amountPesewas }),
      });

      const json = await res.json();

      if (!json?.ok) {
        setMessage("❌ Paystack init failed. Check your secret key / internet.");
        setPaying(false);
        return;
      }

      // Redirect to Paystack authorization URL
      window.location.href = json.authorization_url;
    } catch (error) {
      setMessage("❌ Network error. Please check your connection and try again.");
      setPaying(false);
    }
  }

  function update<K extends keyof CVData>(key: K, value: CVData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  const skillsText = useMemo(() => data.skills.join(", "), [data.skills]);
  const languagesText = useMemo(() => data.languages.join(", "), [data.languages]);
  const certificatesText = useMemo(() => data.certificates.join(", "), [data.certificates]);
  const educationText = useMemo(
    () => data.education.map((item) => `${item.school} | ${item.program} | ${item.period}`).join("\n"),
    [data.education],
  );
  const experienceText = useMemo(
    () =>
      data.experience
        .map((item) => `${item.company} | ${item.role} | ${item.period} | ${item.bullets.join("; ")}`)
        .join("\n"),
    [data.experience],
  );

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <span className="inline-flex w-fit items-center rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          CV Builder (Germany Format)
        </span>
        <h1 className="text-3xl font-bold">Create a CV that matches German expectations</h1>
        <p className="max-w-2xl text-gray-600">
          Add your profile, education, and experience. Preview the layout instantly and download a PDF after payment.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { title: "Structured format", desc: "Keep your CV clean and easy to scan." },
            { title: "Instant preview", desc: "See the layout update as you type." },
            { title: "PDF download", desc: "Pay once to unlock the PDF export." },
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
        {/* LEFT: FORM */}
        <section className="rounded-3xl border p-6 space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Choose a template</h2>
            <p className="text-sm text-gray-600">Pick a style that matches your profession.</p>
            <div className="grid gap-3 md:grid-cols-3">
              {(["Classic", "Modern", "Minimal"] as Template[]).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setTemplate(option)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    template === option ? "border-black bg-black text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <p className="font-semibold">{option}</p>
                  <p className={`mt-1 text-xs ${template === option ? "text-white/80" : "text-gray-500"}`}>
                    {option === "Classic" && "Traditional layout with bold headings."}
                    {option === "Modern" && "Clean spacing with accent color."}
                    {option === "Minimal" && "Simple typography and light separators."}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold">Profile</h2>
            <p className="text-sm text-gray-600">Start with the basics employers expect to see.</p>
          </div>
          <div className="space-y-4">
            <Input label="Full Name" value={data.fullName} onChange={(v) => update("fullName", v)} helper="Use your legal name." />
            <Input label="Title (Headline)" value={data.title} onChange={(v) => update("title", v)} helper="Example: Nursing Applicant · 2025 Intake." />
            <Input label="Location" value={data.location} onChange={(v) => update("location", v)} />
            <Input label="Phone" value={data.phone} onChange={(v) => update("phone", v)} />
            <Input label="Email (required for Paystack)" value={data.email} onChange={(v) => update("email", v)} />
            <Input label="LinkedIn (optional)" value={data.linkedin} onChange={(v) => update("linkedin", v)} helper="Paste the full URL if available." />
            <Textarea label="Professional Summary" value={data.summary} onChange={(v) => update("summary", v)} helper="2–4 sentences about your strengths and goals." />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Skills & Languages</h3>
            <Input
              label="Skills (comma separated)"
              value={skillsText}
              onChange={(v) => update("skills", parseCommaList(v))}
              helper="Example: Customer service, Teamwork, Time management"
            />
            <Input
              label="Languages (comma separated)"
              value={languagesText}
              onChange={(v) => update("languages", parseCommaList(v))}
              helper="Example: English, German (B1)"
            />
            <Input
              label="Certificates (comma separated)"
              value={certificatesText}
              onChange={(v) => update("certificates", parseCommaList(v))}
              helper="Example: Goethe A2, First Aid"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Education</h3>
            <Textarea
              label="Education entries (one per line)"
              value={educationText}
              onChange={(v) => update("education", parseEducationLines(v))}
              helper="Format: School | Program | Period"
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Experience</h3>
            <Textarea
              label="Experience entries (one per line)"
              value={experienceText}
              onChange={(v) => update("experience", parseExperienceLines(v))}
              helper="Format: Company | Role | Period | Bullet1; Bullet2"
              rows={4}
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
              <div className="mt-4">
                <PDFDownloadLink
                  document={<CVPdf data={data} template={template} />}
                  fileName={`${safeFilename}_cv.pdf`}
                  className="block w-full rounded-xl bg-white px-4 py-2 text-center font-semibold text-black hover:opacity-90"
                >
                  Download PDF ✅
                </PDFDownloadLink>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT: PREVIEW */}
        <section className="rounded-3xl border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Preview</h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Auto-updated</span>
          </div>

          <div
            className={`rounded-2xl border p-6 shadow-sm space-y-4 ${
              template === "Modern" ? "bg-slate-50" : "bg-white"
            }`}
          >
            <div>
              <p className={`text-xl font-bold ${template === "Modern" ? "text-slate-900" : "text-gray-900"}`}>
                {data.fullName}
              </p>
              <p className={`text-sm ${template === "Minimal" ? "text-gray-500" : "text-gray-600"}`}>{data.title}</p>
              <p className="mt-2 text-xs text-gray-700">
                {data.location} • {data.phone} • {data.email}
                {data.linkedin ? ` • ${data.linkedin}` : ""}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold">Summary</p>
              <p className="mt-1 text-sm text-gray-700">{data.summary}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-bold">Skills</p>
                <ul className="mt-1 list-disc pl-4 text-sm text-gray-700">
                  {data.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold">Languages</p>
                <ul className="mt-1 list-disc pl-4 text-sm text-gray-700">
                  {data.languages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold">Education</p>
              <ul className="mt-1 space-y-2 text-sm text-gray-700">
                {data.education.map((item) => (
                  <li key={`${item.school}-${item.program}`}>
                    <p className="font-semibold text-gray-800">{item.school}</p>
                    <p>
                      {item.program} • {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold">Experience</p>
              <ul className="mt-1 space-y-3 text-sm text-gray-700">
                {data.experience.map((item) => (
                  <li key={`${item.company}-${item.role}`}>
                    <p className="font-semibold text-gray-800">
                      {item.role} — {item.company}
                    </p>
                    <p className="text-xs text-gray-500">{item.period}</p>
                    <ul className="mt-1 list-disc pl-4">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold">Certificates</p>
              <ul className="mt-1 list-disc pl-4 text-sm text-gray-700">
                {data.certificates.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">CV checklist</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Keep every entry in reverse chronological order.</li>
              <li>Use short bullet points for tasks and outcomes.</li>
              <li>Ensure contact details are easy to read.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
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
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  helper?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2" rows={rows} />
      {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
    </div>
  );
}

function parseCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseEducationLines(value: string): Education[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [school = "", program = "", period = ""] = line.split("|").map((part) => part.trim());
      return { school, program, period };
    })
    .filter((item) => item.school || item.program || item.period);
}

function parseExperienceLines(value: string): Experience[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [company = "", role = "", period = "", bulletsText = ""] = line.split("|").map((part) => part.trim());
      const bullets = bulletsText
        .split(";")
        .map((bullet) => bullet.trim())
        .filter(Boolean);
      return { company, role, period, bullets };
    })
    .filter((item) => item.company || item.role || item.period || item.bullets.length > 0);
}
