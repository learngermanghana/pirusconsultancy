"use client";

import { useMemo, useState } from "react";

type Pathway = {
  name: "Study" | "Ausbildung" | "Work";
  estimatedCost: "Low" | "Medium" | "High";
  averageTimeline: "4-8 months" | "8-14 months" | "10-18 months";
  languageLevel: "B1" | "B2";
  riskLevel: "Low" | "Medium" | "High";
};

const PATHWAYS: Pathway[] = [
  {
    name: "Study",
    estimatedCost: "High",
    averageTimeline: "10-18 months",
    languageLevel: "B2",
    riskLevel: "Medium",
  },
  {
    name: "Ausbildung",
    estimatedCost: "Medium",
    averageTimeline: "8-14 months",
    languageLevel: "B1",
    riskLevel: "Medium",
  },
  {
    name: "Work",
    estimatedCost: "Low",
    averageTimeline: "4-8 months",
    languageLevel: "B1",
    riskLevel: "High",
  },
];

const scoreValue = {
  Low: 1,
  Medium: 2,
  High: 3,
  B1: 1,
  B2: 2,
} as const;

export default function PathwayComparisonCalculator({
  highlightedPathway,
}: {
  highlightedPathway?: "Study" | "Ausbildung" | "Work";
}) {
  const [budgetPreference, setBudgetPreference] = useState<"Low" | "Medium" | "High">("Medium");
  const [timelinePreference, setTimelinePreference] = useState<"Fast" | "Balanced" | "Flexible">(
    "Balanced",
  );
  const [languageLevel, setLanguageLevel] = useState<"A2" | "B1" | "B2">("B1");
  const [riskTolerance, setRiskTolerance] = useState<"Low" | "Medium" | "High">("Medium");

  const rankedPathways = useMemo(() => {
    return PATHWAYS.map((pathway) => {
      const budgetScore = Math.max(0, 3 - Math.abs(scoreValue[pathway.estimatedCost] - scoreValue[budgetPreference]));

      const timelineTarget =
        timelinePreference === "Fast" ? 1 : timelinePreference === "Balanced" ? 2 : 3;
      const pathwayTimeline =
        pathway.averageTimeline === "4-8 months" ? 1 : pathway.averageTimeline === "8-14 months" ? 2 : 3;
      const timelineScore = Math.max(0, 3 - Math.abs(pathwayTimeline - timelineTarget));

      const languageTarget = languageLevel === "A2" ? 1 : languageLevel === "B1" ? 2 : 3;
      const pathwayLanguage = pathway.languageLevel === "B1" ? 2 : 3;
      const languageScore = Math.max(0, 3 - Math.abs(pathwayLanguage - languageTarget));

      const riskScore = Math.max(0, 3 - Math.abs(scoreValue[pathway.riskLevel] - scoreValue[riskTolerance]));

      const total = budgetScore + timelineScore + languageScore + riskScore;

      return {
        ...pathway,
        total,
      };
    }).sort((a, b) => b.total - a.total);
  }, [budgetPreference, timelinePreference, languageLevel, riskTolerance]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Pathway comparison calculator</h2>
        <p className="text-sm text-slate-600">
          Compare Study, Ausbildung, and Work pathways by cost, timeline, language level, and risk
          factors.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-medium text-slate-700">
          Budget preference
          <select
            value={budgetPreference}
            onChange={(event) => setBudgetPreference(event.target.value as "Low" | "Medium" | "High")}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Timeline preference
          <select
            value={timelinePreference}
            onChange={(event) =>
              setTimelinePreference(event.target.value as "Fast" | "Balanced" | "Flexible")
            }
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="Fast">Fast (as soon as possible)</option>
            <option value="Balanced">Balanced</option>
            <option value="Flexible">Flexible (long preparation is okay)</option>
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Current language level
          <select
            value={languageLevel}
            onChange={(event) => setLanguageLevel(event.target.value as "A2" | "B1" | "B2")}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Risk tolerance
          <select
            value={riskTolerance}
            onChange={(event) => setRiskTolerance(event.target.value as "Low" | "Medium" | "High")}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3">Pathway</th>
              <th className="px-4 py-3">Cost</th>
              <th className="px-4 py-3">Timeline</th>
              <th className="px-4 py-3">Language</th>
              <th className="px-4 py-3">Risk</th>
              <th className="px-4 py-3">Match score</th>
            </tr>
          </thead>
          <tbody>
            {rankedPathways.map((pathway) => (
              <tr key={pathway.name} className="border-t border-slate-100 text-slate-700">
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {pathway.name}
                  {highlightedPathway === pathway.name ? (
                    <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700">
                      current page
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3">{pathway.estimatedCost}</td>
                <td className="px-4 py-3">{pathway.averageTimeline}</td>
                <td className="px-4 py-3">{pathway.languageLevel}</td>
                <td className="px-4 py-3">{pathway.riskLevel}</td>
                <td className="px-4 py-3 font-semibold">{pathway.total}/12</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        Suggested top match: <span className="font-semibold text-slate-900">{rankedPathways[0]?.name}</span>.
        Use this as a decision aid, then confirm with a full assessment.
      </p>
    </section>
  );
}
