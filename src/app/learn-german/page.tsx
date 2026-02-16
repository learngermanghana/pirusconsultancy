import Link from "next/link";

export default function LearnGerman() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Falowen Language Academy
        </p>
        <h1 className="text-3xl font-bold text-gray-900">
          Learn German with a clear, structured path
        </h1>
        <p className="max-w-2xl text-gray-600">
          Build real confidence in German with guided lessons, certified instructors, and
          flexible schedules that match your Germany goal. Our team helps you stay consistent,
          track progress, and reach the level you need for study, work, or relocation.
        </p>
      </header>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Why learn German?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Most students are learning German for a clear migration, education, or career result.
        </p>
        <ul className="mt-4 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
          <li className="rounded-2xl bg-gray-50 p-4">Qualify for Ausbildung</li>
          <li className="rounded-2xl bg-gray-50 p-4">Study at German universities</li>
          <li className="rounded-2xl bg-gray-50 p-4">Get skilled-worker jobs</li>
          <li className="rounded-2xl bg-gray-50 p-4">Improve visa approval chances</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">Your German learning path</h2>
        <ul className="mt-4 space-y-3 text-sm text-gray-700">
          <li className="rounded-2xl bg-white p-4">
            <span className="font-semibold text-gray-900">A1–A2:</span> Basic communication
          </li>
          <li className="rounded-2xl bg-white p-4">
            <span className="font-semibold text-gray-900">B1:</span> Required for many
            Ausbildung programs
          </li>
          <li className="rounded-2xl bg-white p-4">
            <span className="font-semibold text-gray-900">B2:</span> Needed for university or
            skilled jobs
          </li>
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Which level do you need?</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li className="rounded-2xl bg-gray-50 p-4">
              <span className="font-semibold text-gray-900">Tourist or short stay:</span> No
              German required
            </li>
            <li className="rounded-2xl bg-gray-50 p-4">
              <span className="font-semibold text-gray-900">Ausbildung:</span> Usually B1
            </li>
            <li className="rounded-2xl bg-gray-50 p-4">
              <span className="font-semibold text-gray-900">University (German-taught):</span>
              {" "}
              B2 or C1
            </li>
            <li className="rounded-2xl bg-gray-50 p-4">
              <span className="font-semibold text-gray-900">Skilled work:</span> B1–B2 depending
              on job
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">How our German training works</h2>
          <ol className="mt-4 space-y-3 text-sm text-gray-700">
            <li className="rounded-2xl bg-gray-50 p-4">1. Level assessment</li>
            <li className="rounded-2xl bg-gray-50 p-4">2. Course placement</li>
            <li className="rounded-2xl bg-gray-50 p-4">3. Structured lessons</li>
            <li className="rounded-2xl bg-gray-50 p-4">4. Weekly assignments</li>
            <li className="rounded-2xl bg-gray-50 p-4">5. Mock exams</li>
            <li className="rounded-2xl bg-gray-50 p-4">6. Final exam preparation</li>
          </ol>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Available learning options</h2>
        <ul className="mt-4 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
          <li className="rounded-2xl bg-gray-50 p-4">Online live classes</li>
          <li className="rounded-2xl bg-gray-50 p-4">Intensive courses</li>
          <li className="rounded-2xl bg-gray-50 p-4">Weekend classes</li>
          <li className="rounded-2xl bg-gray-50 p-4">Self-paced study support</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Why students choose Falowen</h2>
          <ul className="grid gap-4 text-sm text-gray-700 sm:grid-cols-2">
            <li className="rounded-2xl bg-gray-50 p-4">
              Level-based curriculum from A1 to C1 with measurable milestones.
            </li>
            <li className="rounded-2xl bg-gray-50 p-4">
              Live coaching, practice sessions, and feedback that improve speaking fast.
            </li>
            <li className="rounded-2xl bg-gray-50 p-4">
              Study plans for busy schedules and exam preparation support.
            </li>
            <li className="rounded-2xl bg-gray-50 p-4">
              Friendly support team ready to guide your next steps.
            </li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Start learning on Falowen</h2>
          <p className="mt-2 text-sm text-gray-600">
            For the best learning experience, study on the Falowen app. Access lessons,
            assignments, and weekly check-ins in one place.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="https://www.falowen.app"
              className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Visit Falowen.app
            </Link>
            <Link
              href="https://www.falowen.app"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-300"
            >
              Download the app
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">Talk to our team on WhatsApp</h2>
          <p className="mt-2 text-sm text-gray-600">
            Need a placement test, schedule, or pricing guidance? Chat with our support team for
            quick answers.
          </p>
          <Link
            href="https://wa.me/233205706589"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            WhatsApp: +233 20 570 6589
          </Link>
        </div>
      </section>
    </div>
  );
}
