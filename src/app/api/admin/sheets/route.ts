import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type SheetType = "email_messages" | "clients" | "receipts" | "status_updates";

const ADMIN_COOKIE_NAME = "admin_session";
const sheetWebhookMap: Record<SheetType, string | undefined> = {
  email_messages: process.env.GOOGLE_SHEET_EMAIL_WEBHOOK_URL,
  clients: process.env.GOOGLE_SHEET_CLIENT_WEBHOOK_URL,
  receipts: process.env.GOOGLE_SHEET_RECEIPT_WEBHOOK_URL,
  status_updates: process.env.GOOGLE_SHEET_STATUS_WEBHOOK_URL,
};

const fallbackWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get(ADMIN_COOKIE_NAME)?.value === "active";

  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const sheetType = body?.sheetType as SheetType;
  const payload = body?.payload;

  if (!sheetType || !payload) {
    return NextResponse.json({ error: "sheetType and payload are required." }, { status: 400 });
  }

  const webhookUrl = sheetWebhookMap[sheetType] ?? fallbackWebhook;

  if (!webhookUrl) {
    return NextResponse.json({
      saved: false,
      warning:
        "Google Sheet webhook is not configured. Set GOOGLE_SHEET_WEBHOOK_URL or a sheet-specific webhook URL.",
    });
  }

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sheetType, payload, submittedAt: new Date().toISOString() }),
    cache: "no-store",
  });

  const responseBody = await webhookResponse.text();

  if (!webhookResponse.ok) {
    return NextResponse.json(
      { error: "Failed to save to Google Sheet.", details: responseBody },
      { status: webhookResponse.status },
    );
  }

  return NextResponse.json({ saved: true, details: responseBody || "Saved." });
}
