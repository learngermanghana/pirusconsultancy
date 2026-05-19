import crypto from "crypto";
import { NextResponse } from "next/server";

function safeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

export async function POST(req: Request) {
  const secret = process.env.SEDIFEX_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, message: "SEDIFEX_WEBHOOK_SECRET not set" }, { status: 500 });
  }

  const signatureHeader = req.headers.get("x-sedifex-signature") || "";
  const raw = await req.text();
  const digest = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const expected = `sha256=${digest}`;

  if (!safeEqual(expected, signatureHeader)) {
    return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(raw);

  // TODO: Persist payment status idempotently using deliveryId or reference+event.
  return NextResponse.json({ ok: true, received: true, event: payload?.event ?? null });
}
