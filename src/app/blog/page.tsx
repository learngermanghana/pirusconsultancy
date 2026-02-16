import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="text-sm text-slate-600">
        Travel updates and visa tips will be published here soon. For now, use our guidance and
        assessment pages for practical next steps.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/guidance"
          className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          View guidance
        </Link>
        <Link
          href="/assessment"
          className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
        >
          Start assessment
        </Link>
      </div>
    </div>
  );
}
