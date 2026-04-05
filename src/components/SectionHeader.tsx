type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{description}</p> : null}
    </div>
  );
}
