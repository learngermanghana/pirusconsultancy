import Link from "next/link";
import { redirect } from "next/navigation";

type PaymentReturnPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

function readParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  if (Array.isArray(value)) return value[0] ?? "";
  return typeof value === "string" ? value : "";
}

export const metadata = {
  title: "Payment Verification | Pirus Consultancy",
  description: "Payment return and verification page for Pirus Consultancy bookings.",
};

export default async function PaymentReturnPage({ searchParams }: PaymentReturnPageProps) {
  const params = searchParams instanceof Promise ? await searchParams : searchParams ?? {};
  const reference = readParam(params, "reference") || readParam(params, "trxref") || readParam(params, "clientOrderId");
  const status = readParam(params, "status").toLowerCase();
  const failed = status === "cancelled" || status === "failed";

  if (!failed) {
    const successPath = reference ? `/booking/success?reference=${encodeURIComponent(reference)}` : "/booking/success";
    redirect(successPath);
  }

  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Sedifex Checkout</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">{failed ? "Payment not completed" : "Payment is being verified"}</h1>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {failed
          ? "Your payment was cancelled or could not be completed. You can return to booking and try again."
          : "Thank you. We have received your checkout return. Final confirmation will be verified through Sedifex payment status."}
      </p>
      {reference ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
          <p className="text-sm font-semibold text-slate-900">Payment reference</p>
          <p className="mt-1 break-all font-mono text-xs text-slate-700">{reference}</p>
        </div>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/booking" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Book another consultation</Link>
        <Link href="/" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900">Back home</Link>
      </div>
    </section>
  );
}
