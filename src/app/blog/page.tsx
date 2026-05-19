import Image from "next/image";
import Link from "next/link";
import { getSedifexPublicBlogPosts } from "@/lib/sedifex";

function extractExcerpt(html: string, maxLength = 150) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "Read the full post for details.";
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;
}

export default async function BlogPage() {
  const posts = await getSedifexPublicBlogPosts();

  return (
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Blog</p>
        <h1 className="text-3xl font-bold text-slate-900">Latest blog posts</h1>
        <p className="text-sm text-slate-600">Published posts pulled directly from Sedifex.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {post.imageUrl ? (
              <div className="relative h-44 w-full">
                <Image src={post.imageUrl} alt={post.title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            ) : null}
            <div className="space-y-3 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <h2 className="text-base font-semibold text-slate-900">{post.title}</h2>
              <p className="text-sm text-slate-600">{extractExcerpt(post.content)}</p>
              <Link href={`/blog/${post.slug}`} className="inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
                Read post →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 ? <p className="text-sm text-slate-500">No published posts available yet.</p> : null}
    </div>
  );
}
