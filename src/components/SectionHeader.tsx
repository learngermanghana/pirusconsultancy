type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
};

export default function SectionHeader({ eyebrow, title, description, align = "left", tone = "default" }: SectionHeaderProps) {
  const isCentered = align === "center";
  const isInverse = tone === "inverse";

  return (
    <div className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isInverse ? "text-amber-400" : "text-amber-600"}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`mt-2 text-2xl font-bold md:text-3xl ${isInverse ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {description ? <p className={`mt-3 text-sm leading-relaxed md:text-base ${isInverse ? "text-slate-200" : "text-slate-600"}`}>{description}</p> : null}
    </div>
  );
}
