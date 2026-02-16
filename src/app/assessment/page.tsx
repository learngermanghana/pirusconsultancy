import Link from "next/link";

const WHATSAPP_NUMBER = "4917620721491";

const formFields = [
  "Full Name",
  "Phone / WhatsApp Number",
  "Purpose",
  "Destination Country / Package",
  "Visa Type",
  "Preferred Travel Date",
  "Budget (optional)",
  "Notes (documents, background, questions)",
];

const whatsappMessage = encodeURIComponent(`Pirus Visa Assessment / Booking Form\n\nFull Name: \nPhone / WhatsApp Number: \nPurpose: \nDestination Country / Package: \nVisa Type: \nPreferred Travel Date: \nBudget (optional): \nNotes (documents, background, questions): `);

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

export default function AssessmentPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Assessment</p>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Pirus Visa Assessment / Booking Form</h1>
        <p className="max-w-2xl text-gray-600">
          Fill this form and send directly to WhatsApp. We&apos;ll respond with requirements and next
          steps.
        </p>
      </header>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <ol className="space-y-3 text-sm text-gray-700">
          {formFields.map((field, index) => (
            <li key={field} className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
              <span className="font-semibold text-gray-900">{index + 1}.</span> {field}
            </li>
          ))}
        </ol>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Open WhatsApp with prepared message
        </a>
        <p className="mt-3 text-sm text-gray-600">
          If WhatsApp is not installed, this will open WhatsApp Web in your browser.
        </p>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Jonhrega Travel and Tours</h2>
        <p className="mt-2 text-sm text-gray-600">
          Licensed by Ghana Tourism Authority • License No.: AWTT00006525
        </p>
        <p className="mt-1 text-sm text-gray-600">© 2026 Jonhrega Travel and Tours. All rights reserved.</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-emerald-700">
          <a href="mailto:hana@pirusconsultancy.com" className="hover:text-emerald-800">
            Email
          </a>
          <a href="tel:+4917620721491" className="hover:text-emerald-800">
            Call
          </a>
          <Link href="/tours" className="hover:text-emerald-800">
            Tours
          </Link>
          <Link href="/blog" className="hover:text-emerald-800">
            Blog
          </Link>
          <Link href="/assessment" className="hover:text-emerald-800">
            Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
