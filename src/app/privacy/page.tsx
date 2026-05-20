import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Pirus Consultancy website enquiries, bookings, and consultation support.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Privacy</p>
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="text-sm leading-6 text-slate-600">
          Pirus Consultancy uses this website to receive enquiries, assessments, booking requests, and consultation payments. This page explains the basic information we collect and how it is used.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">Information we collect</h2>
        <p className="text-sm leading-6 text-slate-600">
          We may collect your name, phone number, email address, country, education background, relocation goals, documents you choose to share, preferred service, booking date, and payment reference.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">How we use your information</h2>
        <p className="text-sm leading-6 text-slate-600">
          We use your information to respond to enquiries, assess your relocation pathway, prepare consultation support, manage bookings, process payment verification, and provide follow-up communication through WhatsApp, phone, or email.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">Payments and third-party systems</h2>
        <p className="text-sm leading-6 text-slate-600">
          Online booking and checkout may be processed through Sedifex and supported payment partners. Payment confirmation is handled through secure payment systems and may include transaction references for reconciliation.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">No guarantee statement</h2>
        <p className="text-sm leading-6 text-slate-600">
          Consultation support does not guarantee admission, scholarship, visa approval, job placement, or relocation success. Decisions are made by schools, embassies, employers, and official authorities.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">Data sharing</h2>
        <p className="text-sm leading-6 text-slate-600">
          We do not sell your personal information. We may share information only when needed to deliver a requested service, comply with legal requirements, process payments, or communicate through tools you choose to use.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">Contact</h2>
        <p className="text-sm leading-6 text-slate-600">
          For privacy questions or correction requests, please contact Pirus Consultancy through the website contact page or WhatsApp channel.
        </p>
        <Link href="/contact" className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
          Contact us
        </Link>
      </section>
    </article>
  );
}
