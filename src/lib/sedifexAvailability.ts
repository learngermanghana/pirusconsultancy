export type SedifexAvailabilitySlot = {
  id: string;
  serviceId?: string;
  serviceName?: string;
  eventKind?: string;
  registrationMode?: string;
  price?: number | null;
  depositAmount?: number | null;
  currency?: string | null;
  location?: string | null;
  description?: string | null;
  registrationDeadline?: string | null;
  category?: string | null;
  tags?: string[];
  startAt: string;
  endAt: string;
  timezone?: string;
  capacity?: number;
  seatsRemaining?: number;
  status?: string;
};

function baseUrl() {
  return (process.env.SEDIFEX_INTEGRATION_API_BASE_URL || process.env.SEDIFEX_API_BASE_URL || "https://us-central1-sedifex-web.cloudfunctions.net").replace(/\/$/, "");
}

function storeId() {
  return process.env.SEDIFEX_BOOKING_TARGET_STORE_ID || process.env.SEDIFEX_STORE_ID || "";
}

function apiKey() {
  return process.env.SEDIFEX_CHECKOUT_API_KEY || process.env.SEDIFEX_INTEGRATION_API_KEY || process.env.SEDIFEX_INTEGRATION_KEY || "";
}

function availabilityUrl() {
  return process.env.SEDIFEX_INTEGRATION_AVAILABILITY_URL || `${baseUrl()}/v1IntegrationAvailability`;
}

function text(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function toSlot(value: unknown): SedifexAvailabilitySlot | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const id = text(row.id);
  const startAt = text(row.startAt);
  const endAt = text(row.endAt);
  if (!id || !startAt || !endAt) return null;
  return {
    id,
    serviceId: text(row.serviceId),
    serviceName: text(row.serviceName),
    eventKind: text(row.eventKind),
    registrationMode: text(row.registrationMode),
    price: numberValue(row.price),
    depositAmount: numberValue(row.depositAmount),
    currency: text(row.currency) || null,
    location: text(row.location) || null,
    description: text(row.description) || null,
    registrationDeadline: text(row.registrationDeadline) || null,
    category: text(row.category) || null,
    tags: Array.isArray(row.tags) ? row.tags.filter((tag): tag is string => typeof tag === "string") : [],
    startAt,
    endAt,
    timezone: text(row.timezone),
    capacity: numberValue(row.capacity) ?? undefined,
    seatsRemaining: numberValue(row.seatsRemaining) ?? undefined,
    status: text(row.status) || "open",
  };
}

export async function getSedifexAvailabilitySlots() {
  const selectedStoreId = storeId();
  if (!selectedStoreId) return [];
  const url = new URL(availabilityUrl());
  url.searchParams.set("storeId", selectedStoreId);
  url.searchParams.set("from", new Date().toISOString());
  const key = apiKey();
  const headers: Record<string, string> = { Accept: "application/json", "X-Sedifex-Contract-Version": process.env.SEDIFEX_CONTRACT_VERSION || "2026-04-13" };
  if (key) {
    headers.Authorization = `Bearer ${key}`;
    headers["x-api-key"] = key;
  }
  try {
    const response = await fetch(url.toString(), { headers, next: { revalidate: 60 } });
    if (!response.ok) return [];
    const data = await response.json();
    const rows = Array.isArray(data?.slots) ? data.slots : [];
    return rows.map(toSlot).filter((slot): slot is SedifexAvailabilitySlot => Boolean(slot));
  } catch {
    return [];
  }
}
