import type { Metadata } from "next";

/**
 * Per-page metadata helper. Titles/descriptions seeded from
 * 06_seo_and_schema/02-metadata-map.md. Sets canonical + OpenGraph/Twitter.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: ogType,
    },
    twitter: { title, description },
  };
}
