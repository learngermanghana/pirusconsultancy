import { MetadataRoute } from "next";
import { site } from "@/lib/site";

type RouteConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ROUTES: RouteConfig[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/assessment", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ausbildung-germany", changeFrequency: "weekly", priority: 0.9 },
  { path: "/australia-business-visa", changeFrequency: "monthly", priority: 0.75 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
  { path: "/booking", changeFrequency: "weekly", priority: 0.9 },
  { path: "/business-trade-visas", changeFrequency: "monthly", priority: 0.75 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/founder", changeFrequency: "monthly", priority: 0.6 },
  { path: "/germany-partner", changeFrequency: "weekly", priority: 0.85 },
  { path: "/guidance", changeFrequency: "weekly", priority: 0.9 },
  { path: "/learn-german", changeFrequency: "weekly", priority: 0.85 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.7 },
  { path: "/student-visa-support", changeFrequency: "monthly", priority: 0.85 },
  { path: "/study-abroad-admissions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/studienkolleg", changeFrequency: "monthly", priority: 0.85 },
  { path: "/study-germany", changeFrequency: "weekly", priority: 0.95 },
  { path: "/tours", changeFrequency: "monthly", priority: 0.7 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/cv-builder", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/document-checklist", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/motivation-builder", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/pathway-planner", changeFrequency: "weekly", priority: 0.7 },
  { path: "/work-in-germany", changeFrequency: "weekly", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${site.domain}`;
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
