export type SedifexProduct = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price?: string;
  ctaLabel?: string;
  itemType?: "product" | "service";
};

export type SedifexPromo = {
  title: string;
  description: string;
  badge?: string;
  ctaLabel?: string;
};

export type SedifexGalleryItem = {
  id: string;
  title: string;
  caption: string;
  imageUrl?: string;
};

export type SedifexPublicBlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  linkUrl?: string;
  imageUrl?: string;
  publishedAt: string;
};

const fallbackProducts: SedifexProduct[] = [
  { id: "consult-1", title: "Pathway Clarity Session", description: "One-on-one consultation to map your Germany or Europe relocation route.", price: "GHS 250", ctaLabel: "Book Consultation", itemType: "service" },
  { id: "consult-2", title: "Admission & Document Review", description: "Structured support for SOP, CV, school choices, and application checks.", price: "GHS 450", ctaLabel: "Get Started", itemType: "service" },
  { id: "consult-3", title: "Visa Readiness Package", description: "Document quality checks, interview prep, and pre-departure guidance.", price: "GHS 600", ctaLabel: "Book Package", itemType: "service" },
];

const fallbackPromo: SedifexPromo = {
  badge: "Featured by Sedifex",
  title: "Spring 2026 Germany Intake Support",
  description: "Get a full application and visa preparation roadmap before deadlines close.",
  ctaLabel: "Claim Offer",
};

const fallbackGallery: SedifexGalleryItem[] = [
  { id: "story-1", title: "Master's admission in Germany", caption: "Received structured support from profile review to visa prep." },
  { id: "story-2", title: "Ausbildung pathway success", caption: "Clear process and timely coaching helped secure the route." },
  { id: "story-3", title: "European study option", caption: "Switched to an alternative Europe pathway with transparent guidance." },
];

const REVALIDATE_SECONDS = 60;

function baseConfig() {
  const baseUrl = process.env.SEDIFEX_INTEGRATION_API_BASE_URL || process.env.SEDIFEX_API_BASE_URL;
  const storeId = process.env.SEDIFEX_BOOKING_TARGET_STORE_ID || process.env.SEDIFEX_STORE_ID;
  const key = process.env.SEDIFEX_BOOKING_API_KEY || process.env.SEDIFEX_CHECKOUT_API_KEY || process.env.SEDIFEX_INTEGRATION_API_KEY || process.env.SEDIFEX_INTEGRATION_KEY;

  if (!baseUrl || !storeId || !key) return null;

  return { baseUrl: baseUrl.replace(/\/$/, ""), storeId, key };
}

function publicBlogConfig() {
  const baseUrl = (process.env.SEDIFEX_SITE_BASE_URL ?? "https://www.sedifex.com").replace(/\/$/, "");
  const storeId = process.env.SEDIFEX_BOOKING_TARGET_STORE_ID || process.env.SEDIFEX_STORE_ID;
  if (!storeId) return null;
  return { baseUrl, storeId };
}

async function fetchSedifex<T>(path: string): Promise<T | null> {
  const config = baseConfig();
  if (!config) return null;

  try {
    const response = await fetch(`${config.baseUrl}${path}?storeId=${config.storeId}`, {
      headers: {
        Authorization: `Bearer ${config.key}`,
        "x-api-key": config.key,
        "X-Sedifex-Contract-Version": process.env.SEDIFEX_CONTRACT_VERSION || "2026-04-13",
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchPublicBlog(slug?: string): Promise<SedifexPublicBlogPost[]> {
  const config = publicBlogConfig();
  if (!config) return [];
  const params = new URLSearchParams({ storeId: config.storeId });
  if (slug) params.set("slug", slug);

  try {
    const response = await fetch(`${config.baseUrl}/api/public-blog?${params.toString()}`, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!response.ok) return [];
    const payload = (await response.json()) as { items?: unknown };
    if (!Array.isArray(payload.items)) return [];
    return payload.items.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const row = item as Record<string, unknown>;
      if (!row.id || !row.title || !row.slug || !row.content || !row.publishedAt) return [];
      return [{ id: String(row.id), title: String(row.title), slug: String(row.slug), content: String(row.content), linkUrl: row.linkUrl ? String(row.linkUrl) : undefined, imageUrl: row.imageUrl ? String(row.imageUrl) : undefined, publishedAt: String(row.publishedAt) } satisfies SedifexPublicBlogPost];
    });
  } catch {
    return [];
  }
}

function normalizePrice(value: unknown) {
  if (value === null || value === undefined || value === "") return undefined;
  const raw = String(value).trim();
  if (/^[A-Z]{3}\s/i.test(raw) || raw.includes("GHS")) return raw;
  const parsed = Number(raw);
  if (Number.isFinite(parsed)) return `GHS ${parsed.toLocaleString("en-GH")}`;
  return raw;
}

function catalogArrays(payload: unknown) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  const record = payload as Record<string, unknown>;
  return [
    ...(Array.isArray(record.publicServices) ? record.publicServices : []),
    ...(Array.isArray(record.services) ? record.services : []),
    ...(Array.isArray(record.publicProducts) ? record.publicProducts : []),
    ...(Array.isArray(record.products) ? record.products : []),
    ...(Array.isArray(record.items) ? record.items : []),
  ];
}

function readItemType(record: Record<string, unknown>): "product" | "service" {
  const rawType = String(record.itemType ?? record.item_type ?? record.type ?? record.productType ?? record.kind ?? "").toLowerCase();
  if (rawType === "service" || rawType === "services") return "service";
  if (rawType === "product" || rawType === "products") return "product";
  const category = String(record.category ?? record.categoryName ?? "").toLowerCase();
  if (category.includes("consult") || category.includes("visa") || category.includes("admission") || category.includes("service")) return "service";
  return "product";
}

function normalizeCatalogItems(payload: unknown, onlyType?: "product" | "service"): SedifexProduct[] {
  const source = catalogArrays(payload);

  const mapped: SedifexProduct[] = source.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const itemType = readItemType(record);
    if (onlyType && itemType !== onlyType) return [];

    const id = String(record.id ?? record._id ?? record.productId ?? record.serviceId ?? record.item_id ?? `catalog-${index}`);
    const title = String(record.title ?? record.name ?? record.productName ?? record.serviceName ?? "Consultation Package");
    const description = String(record.description ?? record.summary ?? record.details ?? "Structured relocation support package.");
    const imageUrl = record.imageUrl ?? record.image ?? record.photoUrl ?? record.photo ?? record.thumbnailUrl ?? record.thumbnail;
    return [{ id, title, description, imageUrl: imageUrl ? String(imageUrl) : undefined, price: normalizePrice(record.price ?? record.unitPrice ?? record.amount), ctaLabel: String(record.ctaLabel ?? record.buttonText ?? "Book Consultation"), itemType }];
  });

  const deduped = new Map<string, SedifexProduct>();
  for (const product of mapped) {
    const dedupeKey = `${product.id.toLowerCase()}::${product.title.toLowerCase()}`;
    if (!deduped.has(dedupeKey)) deduped.set(dedupeKey, product);
  }
  return Array.from(deduped.values());
}

function normalizePromo(payload: unknown): SedifexPromo | null {
  if (!payload) return null;
  const record = Array.isArray(payload) ? payload[0] : payload;
  if (!record || typeof record !== "object") return null;
  const data = record as Record<string, unknown>;
  return { badge: String(data.badge ?? data.tag ?? "Featured by Sedifex"), title: String(data.title ?? data.name ?? "Featured Offer"), description: String(data.description ?? data.summary ?? "Limited-time relocation support campaign."), ctaLabel: String(data.ctaLabel ?? data.buttonText ?? "Claim Offer") };
}

function normalizeGallery(payload: unknown): SedifexGalleryItem[] {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { gallery?: unknown[] })?.gallery)
      ? (payload as { gallery: unknown[] }).gallery
      : [];
  return source.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    return [{ id: String(record.id ?? record._id ?? `gallery-${index}`), title: String(record.title ?? record.name ?? "Student Journey"), caption: String(record.caption ?? record.description ?? "Real feedback from guided applicants."), imageUrl: record.imageUrl ? String(record.imageUrl) : undefined }];
  });
}

export async function getSedifexProducts() { const payload = await fetchSedifex<unknown>("/integrationProducts"); const products = normalizeCatalogItems(payload, "product"); return products.length > 0 ? products : fallbackProducts; }
export async function getSedifexServices() { const payload = await fetchSedifex<unknown>("/integrationProducts"); const services = normalizeCatalogItems(payload, "service"); return services.length > 0 ? services : fallbackProducts; }
export async function getSedifexPromo() { const payload = await fetchSedifex<unknown>("/integrationPromo"); return normalizePromo(payload) ?? fallbackPromo; }
export async function getSedifexGallery() { const payload = await fetchSedifex<unknown>("/integrationGallery"); const gallery = normalizeGallery(payload); return gallery.length > 0 ? gallery : fallbackGallery; }
export async function getSedifexPublicBlogPosts() { return fetchPublicBlog(); }
export async function getSedifexPublicBlogPostBySlug(slug: string) { const posts = await fetchPublicBlog(slug); return posts[0] ?? null; }