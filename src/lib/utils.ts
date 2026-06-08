/** Tiny className joiner (no dependency needed for this project's scale). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Absolute site URL, configurable via env for canonical/OG/sitemap. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sparkcreativesinc.org"
).replace(/\/$/, "");
