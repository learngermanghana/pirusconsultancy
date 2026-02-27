import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogStories, getBlogStoryBySlug } from "@/lib/blogStories";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogStories.map((story) => ({ slug: story.slug }));
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getBlogStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <Link href="/blog" className="inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
        ← Back to resource center
      </Link>

      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
          {story.category} • {story.readTime}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{story.title}</h1>
        <p className="text-sm text-slate-600">{story.blurb}</p>
      </header>

      <div className="relative h-64 w-full overflow-hidden rounded-2xl">
        <Image src={story.image} alt={story.title} fill className="object-cover" sizes="100vw" priority />
      </div>

      <section className="space-y-4">
        {story.sections.map((section) => (
          <div key={section.heading} className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Related guides</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {story.relatedGuides.map((guide) => (
            <li key={guide}>{guide}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
