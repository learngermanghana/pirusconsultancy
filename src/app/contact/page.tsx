import Link from "next/link";

export default function Contact() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Get in touch</p>
        <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
        <p className="max-w-xl text-gray-600">
          Reach us directly on WhatsApp or email for guidance, next steps, and personalized support.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">WhatsApp</p>
          <a
            className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-gray-900 underline-offset-4 hover:underline"
            href="https://wa.me/4917620721491"
            target="_blank"
            rel="noreferrer"
          >
            +49 176 20721491
          </a>
          <p className="mt-3 text-sm text-gray-600">
            Fastest way to reach us. We usually respond within a few hours.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-800">Email</p>
          <p className="mt-2 text-lg font-semibold text-gray-900">hana@pirusconsultancy.com</p>
          <p className="mt-3 text-sm text-gray-600">
            Prefer email? Send your details and we will get back to you with guidance.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">What to include in your message</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
          <li>Your current location and desired destination.</li>
          <li>The service you are interested in (study, work, visa, etc.).</li>
          <li>A short summary of your timeline and any key questions.</li>
        </ul>
        <Link
          href="/assessment"
          className="mt-5 inline-flex rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Start visa assessment
        </Link>
      </section>
    </div>
  );
}
