import Link from "next/link";
import { notFound } from "next/navigation";
import { getSedifexPublicBlogPostBySlug, getSedifexPublicBlogPosts } from "@/lib/sedifex";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};


function formatStoryContent(content: string) {
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return content;
  }

  const escaped = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const withStrong = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const paragraphs = withStrong
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const normalized = part.replace(/\s+/g, " ").trim();

      if (normalized.includes(" - ")) {
        const [lead, ...items] = normalized.split(/\s+-\s+/).map((entry) => entry.trim()).filter(Boolean);

        if (items.length > 0) {
          const list = `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
          return lead ? `<p>${lead}</p>${list}` : list;
        }
      }

      return `<p>${normalized}</p>`;
    })
    .join("");

  return paragraphs;
}
export async function generateStaticParams() {
  const posts = await getSedifexPublicBlogPosts();
  return posts.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getSedifexPublicBlogPostBySlug(slug);

  if (!story) {
    return {
      title: "Blog post not found",
      alternates: { canonical: "/blog" },
    };
  }

  return {
    title: `${story.title} | Blog`,
    description: story.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160),
    alternates: {
      canonical: `/blog/${story.slug}`,
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getSedifexPublicBlogPostBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <Link href="/blog" className="inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
        ← Back to blog
      </Link>

      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
          {new Date(story.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{story.title}</h1>
      </header>

      {story.imageUrl ? (
        <div className="w-full overflow-hidden rounded-2xl bg-slate-100 p-2">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="h-auto max-h-[36rem] w-full object-contain"
            loading="eager"
          />
        </div>
      ) : null}

      <section className="prose prose-slate max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: formatStoryContent(story.content) }} />
    </article>
  );
}
