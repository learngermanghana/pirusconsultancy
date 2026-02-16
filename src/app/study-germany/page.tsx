import Link from "next/link";
import PathwayComparisonCalculator from "@/components/PathwayComparisonCalculator";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export default function Page() {
  const studyGuidance = [
    {
      title: "Who qualifies",
      points: [
        "You need a recognized higher education entrance qualification (HZB) for your target program; some applicants must first attend Studienkolleg.",
        "A formal admission letter (or conditional admission) from a German university is the core requirement for a student visa.",
        "Proof of finances (blocked account, scholarship, or guarantor) and valid health insurance are mandatory for the visa.",
      ],
    },
    {
      title: "German level needed",
      points: [
        "German-taught degrees usually require B2 to C1 (proved by TestDaF, DSH, Goethe, or telc certificates).",
        "English-taught degrees often accept IELTS/TOEFL, but day-to-day life still needs at least A2/B1 for housing, bureaucracy, and work.",
        "If your admission is conditional on language prep, expect to show a clear plan and timeline for reaching the required level.",
      ],
    },
    {
      title: "Timeline",
      points: [
        "12–6 months before start: shortlist programs, confirm HZB recognition, and check uni-assist/APS requirements.",
        "6–3 months: apply, gather translations, secure blocked account funds, and book embassy appointments early.",
        "3–1 months: receive admission, buy insurance, submit visa, then prepare for arrival (housing + registration).",
      ],
    },
    {
      title: "Common mistakes",
      points: [
        "Missing uni-assist or university deadlines, or submitting incomplete document translations.",
        "Underestimating proof-of-funds requirements or using invalid blocked account providers.",
        "Booking visa appointments late and assuming decisions are instant; processing often takes 8–12 weeks.",
      ],
    },
  ];
  const studienkollegGuidance = [
    {
      title: "Who qualifies",
      points: [
        "If your school certificate is not a direct university entrance qualification in Germany, Studienkolleg is required.",
        "You must apply to a German university first and receive an invitation to the Studienkolleg entrance exam.",
        "Admission is limited and competitive; places are allocated by test score and subject track.",
      ],
    },
    {
      title: "German level needed",
      points: [
        "Most Studienkolleg programs require at least B1, often B2, before you can sit the entrance exam.",
        "Technical tracks (T/M/W/G/S) also expect strong math or subject knowledge alongside German.",
        "Plan for an intensive language course before applying if you are below the required level.",
      ],
    },
    {
      title: "Timeline",
      points: [
        "9–12 months: confirm HZB status, pick a track, and book language exams.",
        "6–3 months: apply to universities/Studienkollegs and prepare for the Aufnahmeprüfung.",
        "1–2 semesters: complete the program and pass the Feststellungsprüfung to start university.",
      ],
    },
    {
      title: "Common mistakes",
      points: [
        "Treating Studienkolleg as a general language school instead of a subject-heavy prep program.",
        "Skipping math/subject prep and failing the entrance exam due to weak core knowledge.",
        "Missing application windows, which often open far earlier than university intake deadlines.",
      ],
    },
  ];

  const studyWhatsAppUrl = createWhatsAppLeadUrl({
    page: "/study-germany",
    pathway: "study",
    intent: "Study in Germany pathway review and document planning",
  });

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Study in Germany (Including Studienkolleg)</h1>
        <p className="text-gray-600">
          A combined overview of university study requirements and Studienkolleg preparation.
        </p>
      </header>

      <PathwayComparisonCalculator highlightedPathway="Study" />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">Direct university entry</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use this if your qualification already meets the German HZB requirements.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {studyGuidance.map((item) => (
            <div key={item.title} className="rounded-3xl border p-6">
              <p className="text-lg font-bold">{item.title}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">Studienkolleg path</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use this when your current qualification is not a direct university entrance
            credential.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {studienkollegGuidance.map((item) => (
            <div key={item.title} className="rounded-3xl border p-6">
              <p className="text-lg font-bold">{item.title}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CaseStudiesSection />

      <section className="rounded-3xl border p-8">
        <h2 className="text-xl font-bold">Next Step</h2>
        <p className="mt-2 text-sm text-gray-600">
          Want help verifying your entry route or Studienkolleg track? Reach out for a quick
          review.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={studyWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-2xl bg-black px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            Talk to us on WhatsApp
          </Link>
          <Link
            href="/assessment"
            className="inline-block rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Start assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
