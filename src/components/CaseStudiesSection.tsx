type CaseStudy = {
  title: string;
  before: string;
  after: string;
  timeline: string;
};

const defaultCaseStudies: CaseStudy[] = [
  {
    title: "Student pathway clarity",
    before: "Applicant was unsure between Studienkolleg and direct university route.",
    after: "Completed pathway review, picked the correct route, and submitted documents on time.",
    timeline: "6-week preparation sprint",
  },
  {
    title: "Ausbildung interview readiness",
    before: "Candidate had B1 German but no structured interview preparation.",
    after: "Used a focused checklist and mock interviews to strengthen offer readiness.",
    timeline: "4 weeks",
  },
  {
    title: "Work visa documentation cleanup",
    before: "Professional profile had gaps in recognition and visa file organization.",
    after: "Rebuilt documentation set with a clear submission order and lower rejection risk.",
    timeline: "3 weeks",
  },
];

export default function CaseStudiesSection({
  title = "Case studies & success proof",
  subtitle = "Examples of how better planning improves visa and pathway outcomes.",
  studies = defaultCaseStudies,
}: {
  title?: string;
  subtitle?: string;
  studies?: CaseStudy[];
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {studies.map((study) => (
          <article key={study.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-slate-900">{study.title}</h3>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Before</p>
            <p className="mt-1 text-sm text-slate-700">{study.before}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">After</p>
            <p className="mt-1 text-sm text-slate-700">{study.after}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-sky-700">Timeline: {study.timeline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
