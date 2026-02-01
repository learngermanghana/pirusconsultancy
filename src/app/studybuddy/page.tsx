"use client";

import { useState } from "react";

export default function StudyBuddyPage() {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");
    setAnswer("");

    const res = await fetch("/api/studybuddy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, topic }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "StudyBuddy could not answer that question.");
      setStatus("error");
      return;
    }

    const data = await res.json();
    setAnswer(data?.answer || "");
    setStatus("success");
  };

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
          StudyBuddy
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">Ask a quick question</h1>
        <p className="max-w-2xl text-gray-600">
          Get a short, practical answer about studying in Germany, visa preparation, or document
          requirements. We keep replies concise and point you to official sources when needed.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="rounded-3xl border p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold" htmlFor="topic">
              Topic (optional)
            </label>
            <input
              id="topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Example: Studienkolleg, APS, blocked account"
              className="mt-2 w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="question">
              Your question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Example: How long does it take to prepare documents for a student visa?"
              className="mt-2 min-h-[140px] w-full rounded-xl border px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Thinking…" : "Ask StudyBuddy"}
          </button>

          {status === "error" && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
        </form>

        <aside className="rounded-3xl border bg-gray-50 p-6 space-y-4">
          <h2 className="text-xl font-bold">Answer</h2>
          {status === "success" && answer ? (
            <p className="whitespace-pre-wrap text-sm text-gray-700">{answer}</p>
          ) : (
            <p className="text-sm text-gray-500">
              Your response will appear here. Ask a clear, specific question to get a useful answer.
            </p>
          )}
          <p className="text-xs text-gray-400">
            StudyBuddy gives guidance only and does not replace official embassy or university
            advice.
          </p>
        </aside>
      </section>
    </div>
  );
}
