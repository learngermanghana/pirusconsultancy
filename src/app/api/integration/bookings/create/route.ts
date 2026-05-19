import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const baseUrl = (process.env.SEDIFEX_INTEGRATION_API_BASE_URL || process.env.SEDIFEX_API_BASE_URL || "https://us-central1-sedifex-web.cloudfunctions.net").replace(/\/$/, "");
    const storeId = process.env.SEDIFEX_BOOKING_TARGET_STORE_ID || process.env.SEDIFEX_STORE_ID;
    const key = process.env.SEDIFEX_CHECKOUT_API_KEY || process.env.SEDIFEX_INTEGRATION_API_KEY || process.env.SEDIFEX_INTEGRATION_KEY;

    if (!baseUrl || !storeId || !key) {
      return NextResponse.json({ ok: false, message: "Sedifex env is missing." }, { status: 500 });
    }

    const body = await req.json();

    const response = await fetch(`${baseUrl}/v1IntegrationBookings?storeId=${encodeURIComponent(storeId)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "x-api-key": key,
        "X-Sedifex-Contract-Version": process.env.SEDIFEX_CONTRACT_VERSION || "2026-04-13",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...body,
        bookingStatus: "booked",
        paymentCollectionMode: "online_checkout",
        paymentStatus: "checkout_created",
        syncStatus: "pending",
        syncRequestedAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => ({}))) as Record<string, any>;

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: data?.message || data?.error || "Booking failed",
          raw: data,
        },
        { status: response.status },
      );
    }

    const source = data?.data || data?.booking || data;
    return NextResponse.json({
      ok: true,
      bookingId: source?.bookingId || source?.booking_id || source?.id || source?.orderId,
      raw: data,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || "Server error" }, { status: 500 });
  }
}
