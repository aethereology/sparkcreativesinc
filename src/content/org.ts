/**
 * Organization facts — single source of truth.
 * Sourced from the planning kit fact bank (10_reference/03-fact-bank.md) and
 * project CLAUDE.md. Items flagged below need leadership re-confirmation before launch.
 */
export const org = {
  name: "SparkCreatives Inc",
  shortName: "SparkCreatives",
  legalStatus: "501(c)(3) public charity",
  // TODO: leadership confirm — EIN shown on current live site.
  ein: "33-4477854",
  tagline: "Turn surplus into opportunity.",
  thesis:
    "SparkCreatives transforms donated goods and creative materials into hands-on programs that help young people, families, and emerging creatives build confidence, skills, leadership, and sustainable pathways forward.",
  email: "hello@sparkcreativesinc.org",
  // TODO: leadership confirm — address shown on current live site.
  address: {
    street: "6120 Caladesi Ct",
    city: "Jacksonville",
    region: "FL",
    postalCode: "32258",
    country: "US",
  },
  // Operating story: Jacksonville, FL volunteers supporting Cebu, Philippines communities.
  locations: ["Jacksonville, Florida", "Cebu, Philippines"],
  url: "https://sparkcreativesinc.org",
  // TODO: leadership confirm — add real, verified social profiles before launch.
  social: [] as Array<{ label: string; href: string }>,
} as const;

export type Org = typeof org;
