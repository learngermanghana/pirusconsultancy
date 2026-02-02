import Link from "next/link";
import GuidanceCard from "@/components/cards/GuidanceCard";
import RoleCategoryCard from "@/components/cards/RoleCategoryCard";
import ausbildungContent from "@/content/ausbildung.json";

export default function Guidance() {
  const { categories, guidance } = ausbildungContent;
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
  const workGuidance = [
    {
      title: "Who qualifies",
      points: [
        "Skilled workers need a recognized degree or vocational qualification and a job offer that matches it.",
        "EU Blue Card applicants must meet salary thresholds and have a recognized university degree (or an equivalent in-demand IT path).",
        "Regulated professions (healthcare, teaching, engineering) require formal recognition before a visa is issued.",
      ],
    },
    {
      title: "German level needed",
      points: [
        "English-speaking tech roles can be possible, but most employers still expect at least B1 for daily work.",
        "Regulated professions usually require B2 or higher German for licensing and patient/client communication.",
        "For long-term integration, plan for B1/B2 even if the job ad is in English.",
      ],
    },
    {
      title: "Timeline",
      points: [
        "4–8 months: get qualification recognition (ZAB or the relevant chamber) and collect work experience proofs.",
        "3–6 months: job search, interviews, and contract negotiation; ensure salary meets visa requirements.",
        "2–3 months: visa appointment and processing, then prepare relocation (housing, Anmeldung, insurance).",
      ],
    },
    {
      title: "Common mistakes",
      points: [
        "Applying without recognition documents or with a job offer that does not match the qualification.",
        "Assuming any salary qualifies for a Blue Card—thresholds change yearly and vary by shortage occupations.",
        "Skipping language planning and later struggling with probation periods, paperwork, or client contact.",
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Ausbildung, Study, and Work in Germany</h1>
        <p className="text-gray-600">
          Everything in one place: requirements, timelines, and next steps for Ausbildung, university
          study, and skilled work.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            { href: "#ausbildung", label: "Ausbildung" },
            { href: "#study", label: "Study" },
            { href: "#work", label: "Work" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 px-4 py-1 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section id="ausbildung" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Ausbildung</h2>
          <p className="text-gray-600">
            Clear requirements, timeline, common mistakes, and the next step you should take.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">Popular Ausbildung Fields</h3>
            <p className="mt-1 text-sm text-gray-600">
              Explore high-demand roles across healthcare, technology, skilled trades, and more.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {categories.map((category) => (
              <RoleCategoryCard key={category.title} category={category} />
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {guidance.map((item) => (
            <GuidanceCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section id="study" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Study in Germany (Including Studienkolleg)</h2>
          <p className="text-gray-600">
            A combined overview of university study requirements and Studienkolleg preparation.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">Direct university entry</h3>
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
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">Studienkolleg path</h3>
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
        </div>
      </section>

      <section id="work" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Work in Germany</h2>
          <p className="text-gray-600">
            Clear requirements, timeline, common mistakes, and the next step you should take.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {workGuidance.map((item) => (
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

      <section className="rounded-3xl border p-8">
        <h2 className="text-xl font-bold">Next Step</h2>
        <p className="mt-2 text-sm text-gray-600">
          Want help choosing the right route or preparing the right documents? We can review your
          case.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-block rounded-2xl bg-black px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            Contact us
          </Link>
          <Link
            href="https://wa.me/4917620721491"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-2xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:border-slate-300"
          >
            WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}
