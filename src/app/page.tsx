import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrimaryCta from "@/components/PrimaryCta";
import SectionHeader from "@/components/SectionHeader";
import { getSedifexGallery, getSedifexPromo, getSedifexPublicBlogPosts, getSedifexServices } from "@/lib/sedifex";
import { createWhatsAppLeadUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Relocate to Germany or Europe from Ghana or Nigeria",
  description:
    "Book pathway consultations, admission document review, and visa readiness support for Ghanaians, Nigerians, and Africans relocating to Germany or Europe.",
  openGraph: {
    title: "Relocate to Germany or Europe from Ghana or Nigeria",
    description:
      "Pirus Consultancy helps African applicants choose realistic study, Ausbildung, visa, and Europe relocation pathways.",
    images: ["/images/Pirus Consultancy main Page pic.gpg.png"],
  },
};

const countryCards = [
  {
    title: "For Ghanaian Applicants",
    text: "Review WASSCE/WAEC, HND, diploma, degree, transcripts, blocked account planning, and the best Germany or Europe route for your profile.",
    href: "/relocate-to-europe-from-ghana",
    cta: "Explore Ghana route",
  },
  {
    title: "For Nigerian Applicants",
    text: "Check NECO/WAEC, OND/HND, university documents, admission strategy, visa readiness, and practical alternatives when Germany is not immediate.",
    href: "/relocate-to-europe-from-nigeria",
    cta: "Explore Nigeria route",
  },
];

const pathways = [
  { title: "Study in Germany", description: "University admission support, SOP/CV review, Studienkolleg checks, and application strategy.", href: "/study-in-germany" },
  { title: "Ausbildung Route", description: "Vocational pathway guidance, German level planning, CV positioning, and document readiness.", href: "/study-in-germany" },
  { title: "Visa Pathways by Profile", description: "Get practical options based on your profile: student, graduate, professional, or family route.", href: "/europe-pathways" },
  { title: "Europe Alternatives", description: "Explore realistic European alternatives when Germany is not the best first step for your budget or documents.", href: "/relocate-to-europe-from-ghana" },
];

const processSteps = ["Profile review", "Pathway selection", "Document preparation", "Application support", "Visa preparation", "Travel readiness"];
const supportAreas = ["CV review", "German CV support", "Admission guidance", "Visa document review", "Interview prep", "Consultation packages"];
const faqs = [
  { q: "Do you guarantee admission or visa approval?", a: "No. We do not make false promises. We provide structured support to improve your preparedness and decision quality." },
  { q: "Is Germany your main focus?", a: "Yes. Germany is our primary pathway, while we also support selected Europe alternatives based on your profile." },
  { q: "Can I apply with HND?", a: "Yes, in many pathways. HND holders can qualify for selected study, vocational, and work-track options depending on credentials and experience." },
  { q: "Do I need IELTS for Germany?", a: "Not always. Some programs accept alternatives or waive English tests in specific cases, while others still require IELTS or equivalent proof." },
  { q: "How much should I budget before visa appointment?", a: "Budget for application fees, document legalization or translations, insurance, and financial proof requirements such as blocked account funding where applicable." },
];

function serviceBookingHref(id: string) {
  return `/booking?service=${encodeURIComponent(id)}`;
}

function extractExcerpt(html: string, maxLength = 135) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "Read the full post for practical relocation guidance.";
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Latest update";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function HomePage() {
  const [services, promo, gallery, posts] = await Promise.all([
    getSedifexServices(),
    getSedifexPromo(),
    getSedifexGallery(),
    getSedifexPublicBlogPosts(),
  ]);
  const whatsappUrl = createWhatsAppLeadUrl({ page: "homepage", pathway: "study", intent: "Relocate to Germany or Europe from Ghana or Nigeria" });
  const featuredServices = services.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="space-y-14 pb-8">
      <section className="grid gap-8 rounded-3xl bg-slate-950 px-6 py-10 text-white md:grid-cols-2 md:items-center md:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Ghana & Nigeria to Germany / Europe</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
            Relocate to Germany or Europe from Ghana or Nigeria with a clear plan.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">
            Pirus Consultancy helps African students, graduates, and young professionals understand the right route before spending money: study, Ausbildung, admissions, document review, and visa readiness.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/booking" className="rounded-xl bg-amber-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-amber-200">
              Book Consultation
            </Link>
            <Link href="/assessment" className="rounded-xl border border-white/30 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
              Start Free Assessment
            </Link>
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
              Ask on WhatsApp
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-200">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Ghana</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Nigeria</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Germany study</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Ausbildung</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Europe alternatives</span>
          </div>
        </div>
        <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-700 md:h-96">
          <Image src="/images/Pirus Consultancy main Page pic.gpg.png" alt="Student relocation and consultation support" fill priority className="object-cover" />
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
        <SectionHeader
          eyebrow="Start here"
          title="Choose your consultation package"
          description="Choose the support you need now. Each package is linked to online booking and secure checkout."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {featuredServices.map((product) => (
            <article key={product.id} className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
              {product.price ? <p className="mt-3 text-sm font-bold text-slate-950">{product.price}</p> : null}
              <Link href={serviceBookingHref(product.id)} className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                {product.ctaLabel ?? "Book this package"}
              </Link>
            </article>
          ))}
        </div>
        <div className="rounded-2xl border border-amber-200 bg-white p-4 text-sm leading-6 text-slate-700">
          Not sure which package to choose? Start with a pathway clarity session. We will tell you whether direct study, Studienkolleg, Ausbildung, or another Europe route is more realistic for your profile.
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Country-specific guidance"
          title="Built for applicants from Ghana and Nigeria"
          description="Your country, certificate, budget, and document history affect the right route. Start with the guidance closest to your background."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {countryCards.map((card) => (
            <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
              <Link href={card.href} className="mt-5 inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Why Pirus Consultancy" title="Trust-first guidance for real relocation decisions" description="Our process is transparent, student-friendly, and focused on practical next steps for Africans relocating to Europe." align="center" />
        <div className="grid gap-4 md:grid-cols-4">
          {["Guidance for WAEC/NECO + transcripts", "German blocked account prep", "Visa interview readiness for West African applicants", "Clear timeline and document support"].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm">{item}</div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Main Pathways" title="Choose the route that fits your profile" />
        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((pathway) => (
            <article key={pathway.title} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{pathway.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{pathway.description}</p>
              <Link href={pathway.href} className="mt-4 inline-block text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">Explore pathway</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-slate-900 p-6 text-white md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">What we support</p>
          <h2 className="mt-2 text-2xl font-bold">One process: profile, pathway, documents, and payment-backed booking.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            Choose a package, book online, and let us review your next step with practical guidance instead of vague promises.
          </p>
          <Link href="/booking" className="mt-5 inline-flex rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">
            Book Now
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {supportAreas.map((service) => (
            <div key={service} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">{service}</div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="How It Works" title="A simple, step-by-step process" />
        <div className="grid gap-3 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-600">Step {index + 1}</p>
              <p className="mt-2 text-sm font-medium text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Latest blog posts" title="Fresh relocation guidance" description="New posts from the Pirus blog, pulled directly into the homepage." />
          <Link href="/blog" className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
            View all posts →
          </Link>
        </div>
        {latestPosts.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {post.imageUrl ? (
                  <div className="h-40 w-full bg-slate-100">
                    <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : null}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{formatDate(post.publishedAt)}</p>
                  <h3 className="mt-2 text-base font-bold text-slate-900">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{extractExcerpt(post.content)}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-slate-900 underline-offset-4 hover:underline">
                    Read post →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            Blog posts will appear here when published from Sedifex.
          </div>
        )}
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow="Success Stories" title="Social proof from guided applicants" />
        <div className="grid gap-4 md:grid-cols-3">
          {gallery.slice(0, 3).map((item) => (
            <blockquote key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2">{item.caption}</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{promo.badge}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">{promo.title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">{promo.description}</p>
        <Link href="/booking" className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">{promo.ctaLabel ?? "Book Offer"}</Link>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow="FAQs" title="Quick answers before you start" />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-xl border border-slate-200 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{faq.q}</summary>
              <p className="mt-2 text-sm text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-slate-900 p-8 text-white">
        <SectionHeader eyebrow="Ready to Start?" title="Get your Africa-to-Europe relocation plan in one call" description="Message us on WhatsApp or book a consultation today." align="center" tone="inverse" />
        <div className="mt-6"><PrimaryCta whatsappHref={whatsappUrl} consultationHref="/booking" center /></div>
      </section>
    </div>
  );
}
