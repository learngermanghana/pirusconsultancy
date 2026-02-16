import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${site.domain}`;

  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/success"],
      },
      {
        userAgent: ["Bingbot", "Slurp", "DuckDuckBot", "Applebot"],
        allow: "/",
        disallow: ["/api/", "/_next/", "/success"],
        crawlDelay: 5,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/success"],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  };
}
