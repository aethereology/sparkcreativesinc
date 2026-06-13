/**
 * Organization facts — single source of truth.
 * Sourced from the planning kit fact bank (10_reference/03-fact-bank.md) and
 * project CLAUDE.md. Items flagged below need leadership re-confirmation before launch.
 */
export const org = {
  name: "SparkCreatives Inc",
  shortName: "SparkCreatives",
  legalStatus: "501(c)(3) public charity",
  // EIN confirmed by leadership 2026-06-11.
  ein: "33-4477854",
  tagline: "Turn surplus into opportunity.",
  thesis:
    "SparkCreatives transforms donated goods and creative materials into hands-on programs that help young people, families, and emerging creatives build confidence, skills, leadership, and sustainable pathways forward.",
  // Main public contact (leadership confirmed 2026-06-10) — alias on M365, replaces hello@.
  email: "ignite@sparkcreativesinc.org",
  // Mailing address confirmed by leadership 2026-06-11.
  address: {
    street: "6120 Caladesi Ct",
    city: "Jacksonville",
    region: "FL",
    postalCode: "32258",
    country: "US",
  },
  // Operating story: Jacksonville, FL volunteers supporting Cebu, Philippines communities.
  locations: ["Jacksonville, Florida", "Cebu, Philippines"],
  // Regions served (leadership confirmed 2026-06-08). Used for schema areaServed.
  regionsServed: ["Florida", "Canada", "Manila", "Cebu"],
  url: "https://sparkcreativesinc.org",
  // Aethelo = operations/impact infrastructure, not a public program (leadership confirmed).
  aetheloUrl: "https://aethelo.sparkcreativesinc.org",
  // Candid (GuideStar) profile — 2026 Platinum Transparency Seal (leadership provided 2026-06-11).
  candidProfileUrl:
    "https://app.candid.org/profile/16338045/sparkcreatives-inc-33-4477854",
  // Profiles provided by leadership 2026-06-11.
  social: [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61573787152967" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sparkcreatives-inc/" },
  ] as Array<{ label: string; href: string }>,
} as const;

export type Org = typeof org;
