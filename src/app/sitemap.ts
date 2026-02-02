import { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/ausbildung-germany",
  "/booking",
  "/contact",
  "/founder",
  "/germany-partner",
  "/help",
  "/learn-german",
  "/study-germany",
  "/success",
  "/work-in-germany",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${site.domain}`;
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}
