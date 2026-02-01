import { NextResponse } from "next/server";

const OPENAI_URL = "https://api.openai.com/v1/responses";

type StudyBuddyPayload = {
  question: string;
  topic?: string;
};

function buildPrompt(payload: StudyBuddyPayload) {
  return `You are StudyBuddy, a helpful Germany study-abroad assistant. Answer the user's question clearly and concisely.

Guidelines:
- Focus on practical, actionable guidance for Germany study pathways, visas, and preparation.
- Keep it under 6 short sentences or 5 bullet points.
- If the question needs official confirmation, recommend checking the official embassy or university site.
- Do not invent facts; avoid legal guarantees.

Topic (if provided): ${payload.topic ?? ""}
Question: ${payload.question}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Missing OPENAI_API_KEY on server." },
      { status: 500 },
    );
  }

  const payload = (await request.json()) as StudyBuddyPayload;
  const question = payload.question?.trim();

  if (!question) {
    return NextResponse.json(
      { ok: false, error: "Please add a question before sending." },
      { status: 400 },
    );
  }

  const prompt = buildPrompt({ ...payload, question });

  const openAiResponse = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.5,
      max_output_tokens: 300,
    }),
  });

  if (!openAiResponse.ok) {
    const errorText = await openAiResponse.text();
    return NextResponse.json(
      { ok: false, error: errorText || "OpenAI request failed." },
      { status: 500 },
    );
  }

  const data = await openAiResponse.json();
  const outputText = data?.output?.[0]?.content?.[0]?.text ?? "";

  if (!outputText) {
    return NextResponse.json(
      { ok: false, error: "OpenAI did not return any text." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, answer: outputText.trim() });
}
