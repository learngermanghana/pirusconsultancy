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

    const response = await fetch(`${baseUrl}/v1IntegrationBookings?storeId=${storeId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

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

    return NextResponse.json({
      ok: true,
      bookingId: data?.bookingId || data?.id || data?.data?.bookingId,
      raw: data,
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || "Server error" }, { status: 500 });
  }
}
