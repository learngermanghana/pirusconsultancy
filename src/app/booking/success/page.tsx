import Link from "next/link";

export const metadata = {
  title: "Booking Confirmed | Pirus Consultancy",
  description: "Thank you page for confirmed Pirus Consultancy bookings.",
};

type BookingSuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

function readParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  if (Array.isArray(value)) return value[0] ?? "";
  return typeof value === "string" ? value : "";
}

export default async function BookingSuccessPage({ searchParams }: BookingSuccessPageProps) {
  const params = searchParams instanceof Promise ? await searchParams : searchParams ?? {};
  const reference = readParam(params, "reference") || readParam(params, "trxref") || readParam(params, "clientOrderId");

  return (
    <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
      <div className="bg-emerald-50 px-8 py-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">Booking confirmed</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">Thank you for your booking.</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
          Your payment has been received and your appointment request has been submitted to Pirus Consultancy.
          A follow-up email will be sent to you shortly with the next steps and any preparation details.
        </p>
      </div>

      <div className="space-y-6 px-8 py-8">
        {reference ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Booking payment reference</p>
            <p className="mt-1 break-all font-mono text-xs text-slate-700">{reference}</p>
          </div>
        ) : null}

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <h2 className="text-base font-semibold text-slate-900">What happens next?</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>• Our team will review your booking and payment details.</li>
            <li>• You will receive a follow-up email with appointment confirmation and preparation notes.</li>
            <li>• Please keep your payment reference available for support questions.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/booking" className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white">
            Book another consultation
          </Link>
          <Link href="/" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-900">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
