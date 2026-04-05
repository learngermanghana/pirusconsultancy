import Link from "next/link";

type PrimaryCtaProps = {
  whatsappHref: string;
  consultationHref?: string;
  center?: boolean;
};

export default function PrimaryCta({ whatsappHref, consultationHref = "/contact", center = false }: PrimaryCtaProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <Link
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
      >
        Chat on WhatsApp
      </Link>
      <Link
        href={consultationHref}
        className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
      >
        Book Consultation
      </Link>
    </div>
  );
}
