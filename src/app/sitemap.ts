import type { MetadataRoute } from "next";
import { programs } from "@/content/programs";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-06-08");

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/programs", priority: 0.9 },
    { path: "/impact", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/get-involved", priority: 0.8 },
    { path: "/donate", priority: 0.9 },
    { path: "/contact", priority: 0.6 },
  ];

  const programRoutes = programs.map((p) => ({
    path: `/programs/${p.slug}`,
    priority: 0.8,
  }));

  return [...staticRoutes, ...programRoutes].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
