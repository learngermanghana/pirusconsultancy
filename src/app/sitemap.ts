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
  { path: "/germany-partner", changeFrequency: "weekly", priority: 0.85 },
  { path: "/learn-german", changeFrequency: "weekly", priority: 0.85 },
  { path: "/relocate-to-europe-from-ghana", changeFrequency: "weekly", priority: 0.95 },
  { path: "/relocate-to-europe-from-nigeria", changeFrequency: "weekly", priority: 0.95 },
  { path: "/student-visa-support", changeFrequency: "monthly", priority: 0.85 },
  { path: "/study-in-germany-from-africa", changeFrequency: "weekly", priority: 0.95 },
  { path: "/study-abroad-admissions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/study-germany", changeFrequency: "weekly", priority: 0.95 },
  { path: "/tools/cv-builder", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/document-checklist", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/motivation-builder", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tools/pathway-planner", changeFrequency: "weekly", priority: 0.7 },
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
