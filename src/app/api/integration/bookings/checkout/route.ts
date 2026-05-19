import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const baseUrl = process.env.SEDIFEX_API_BASE_URL?.replace(/\/$/, "");
    const storeId = process.env.SEDIFEX_STORE_ID;
    const key = process.env.SEDIFEX_INTEGRATION_KEY;

    if (!baseUrl || !storeId || !key) {
      return NextResponse.json({ ok: false, message: "Sedifex env is missing." }, { status: 500 });
    }

    const body = await req.json();

    const payload = {
      storeId,
      clientOrderId: body.clientOrderId,
      orderType: "service",
      currency: "GHS",
      amount: body.amount,
      customer: body.customer,
      returnUrl: `${new URL(req.url).origin}/success`,
      metadata: {
        bookingId: body.bookingId,
        channel: "client-website",
      },
    };

    const response = await fetch(`${baseUrl}/integration/checkout/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ ok: false, message: data?.message || "Checkout failed", raw: data }, { status: response.status });
    }

    return NextResponse.json({
      ok: true,
      authorizationUrl: data?.authorizationUrl || data?.data?.authorizationUrl,
      reference: data?.reference || data?.data?.reference,
      sedifexOrderId: data?.sedifexOrderId || data?.data?.sedifexOrderId,
      raw: data,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || "Server error" }, { status: 500 });
  }
}
