import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { getSedifexAvailabilitySlots } from "@/lib/sedifexAvailability";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "Upcoming seminars, short courses, intakes, and relocation events from Pirus Consultancy.",
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date to be confirmed";
  return date.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function money(amount?: number | null, currency = "GHS") {
  if (!amount || amount <= 0) return "Free / enquiry";
  return new Intl.NumberFormat("en-GH", { style: "currency", currency }).format(amount);
}

export default async function EventsPage() {
  const slots = await getSedifexAvailabilitySlots();

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-slate-950 p-6 text-white md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Upcoming events</p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">Seminars, short courses, and relocation sessions.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
          Join upcoming sessions for Germany study planning, visa readiness, short courses, and Europe relocation guidance. Events are pulled from Sedifex availability.
        </p>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Schedule" title="Available upcoming sessions" description="Choose a session and continue to booking. Seats and dates are managed from Sedifex." />
        {slots.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {slots.map((slot) => (
              <article key={slot.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
                  {slot.eventKind || "event"}
                </p>
                <h2 className="mt-4 text-xl font-bold text-slate-900">{slot.serviceName || slot.category || "Upcoming session"}</h2>
                {slot.description ? <p className="mt-2 text-sm leading-6 text-slate-600">{slot.description}</p> : null}
                <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                  <div><dt className="font-semibold text-slate-900">Date</dt><dd>{formatDate(slot.startAt)}</dd></div>
                  <div><dt className="font-semibold text-slate-900">Time</dt><dd>{formatTime(slot.startAt)}{formatTime(slot.endAt) ? ` - ${formatTime(slot.endAt)}` : ""}</dd></div>
                  <div><dt className="font-semibold text-slate-900">Location</dt><dd>{slot.location || "Online / to be confirmed"}</dd></div>
                  <div><dt className="font-semibold text-slate-900">Price</dt><dd>{money(slot.price ?? slot.depositAmount, slot.currency || "GHS")}</dd></div>
                  <div><dt className="font-semibold text-slate-900">Seats</dt><dd>{typeof slot.seatsRemaining === "number" ? `${slot.seatsRemaining} remaining` : "Available"}</dd></div>
                  <div><dt className="font-semibold text-slate-900">Deadline</dt><dd>{slot.registrationDeadline ? formatDate(slot.registrationDeadline) : "Not specified"}</dd></div>
                </dl>
                <Link href={`/booking?service=${encodeURIComponent(slot.serviceId || slot.serviceName || slot.id)}`} className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                  Register / Book slot
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
            No upcoming events are published yet. Add availability slots in Sedifex and they will appear here.
          </div>
        )}
      </section>
    </div>
  );
}
