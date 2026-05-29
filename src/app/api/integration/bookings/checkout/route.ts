import { NextResponse } from "next/server";

function getBaseUrl() {
  return (process.env.SEDIFEX_INTEGRATION_API_BASE_URL || process.env.SEDIFEX_API_BASE_URL || "https://us-central1-sedifex-web.cloudfunctions.net").replace(/\/$/, "");
}

function getStoreId() {
  return process.env.SEDIFEX_BOOKING_TARGET_STORE_ID || process.env.SEDIFEX_STORE_ID || "";
}

function getApiKey() {
  return process.env.SEDIFEX_CHECKOUT_API_KEY || process.env.SEDIFEX_INTEGRATION_API_KEY || process.env.SEDIFEX_INTEGRATION_KEY || "";
}

function getCheckoutCreateUrl() {
  return process.env.SEDIFEX_INTEGRATION_CHECKOUT_CREATE_URL || `${getBaseUrl()}/integrationCheckoutCreate`;
}

function readCheckoutUrl(data: Record<string, unknown>) {
  const source = (data.data || data.checkout || data) as Record<string, unknown>;
  const value = source.authorizationUrl || source.authorization_url || source.checkoutUrl || source.checkout_url;
  return typeof value === "string" ? value : "";
}

export async function POST(req: Request) {
  try {
    const storeId = getStoreId();
    const key = getApiKey();

    if (!storeId || !key) {
      return NextResponse.json({ ok: false, message: "Sedifex env is missing." }, { status: 500 });
    }

    const body = await req.json();
    const clientOrderId = String(body.clientOrderId || `BOOKING-${Date.now()}`);
    const origin = new URL(req.url).origin;
    const returnUrl = process.env.SEDIFEX_CHECKOUT_RETURN_URL || `${origin}/booking/success?reference=${encodeURIComponent(clientOrderId)}`;

    const payload = {
      storeId,
      merchantId: storeId,
      clientOrderId,
      sourceChannel: "client_website",
      sourceLabel: "Pirus Consultancy Website",
      orderType: "service",
      currency: "GHS",
      amount: Number(body.amount || 0),
      customer: body.customer,
      items: [
        {
          id: body.serviceId || body.bookingId || clientOrderId,
          item_id: body.serviceId || body.bookingId || clientOrderId,
          serviceId: body.serviceId || body.bookingId || clientOrderId,
          name: body.serviceName || "Consultation booking",
          serviceName: body.serviceName || "Consultation booking",
          unitPrice: Number(body.amount || 0),
          price: Number(body.amount || 0),
          qty: 1,
          quantity: 1,
          type: "SERVICE",
          item_type: "service",
        },
      ],
      returnUrl,
      metadata: {
        bookingId: body.bookingId,
        channel: "client-website",
      },
    };

    const response = await fetch(getCheckoutCreateUrl(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "x-api-key": key,
        "X-Sedifex-Contract-Version": process.env.SEDIFEX_CONTRACT_VERSION || "2026-04-13",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

    if (!response.ok) {
      return NextResponse.json({ ok: false, message: String(data?.message || data?.error || "Checkout failed"), raw: data }, { status: response.status });
    }

    const authorizationUrl = readCheckoutUrl(data);
    return NextResponse.json({
      ok: true,
      authorizationUrl,
      checkoutUrl: authorizationUrl,
      reference: data?.reference || (data?.data as Record<string, unknown> | undefined)?.reference || clientOrderId,
      sedifexOrderId: data?.sedifexOrderId || (data?.data as Record<string, unknown> | undefined)?.sedifexOrderId,
      raw: data,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || "Server error" }, { status: 500 });
  }
}
