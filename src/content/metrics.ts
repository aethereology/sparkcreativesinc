/**
 * Impact metrics — model from 02_information_architecture/04-content-models.md.
 *
 * IMPORTANT (honesty rule from CLAUDE.md): these values are the numbers currently
 * shown on the live SparkCreatives site (per project CLAUDE.md fact bank). They are
 * carried over verbatim and marked `unconfirmed` until leadership re-verifies them.
 * The UI surfaces this verification state transparently — we never present an
 * unverified number as a hard guarantee, and we never invent new ones.
 */
export type VerificationStatus = "verified" | "unconfirmed";

export type ImpactMetric = {
  value: string;
  label: string;
  context: string;
  metricType: "output" | "outcome" | "reach";
  source: string;
  verificationStatus: VerificationStatus;
  dateUpdated: string;
};

/** Current impact snapshot (live-site figures pending re-confirmation). */
export const impactMetrics: ImpactMetric[] = [
  {
    value: "84+",
    label: "Spark Boxes packed",
    context: "Boxes of supplies and creative tools put into people's hands.",
    metricType: "output",
    source: "Current live site",
    verificationStatus: "unconfirmed",
    dateUpdated: "2026-06-08",
  },
  {
    value: "17",
    label: "Families directly supported",
    context: "Families reached through Spark Boxes and related programs.",
    metricType: "reach",
    source: "Current live site",
    verificationStatus: "unconfirmed",
    dateUpdated: "2026-06-08",
  },
  {
    value: "150+",
    label: "Youth volunteers",
    context: "Young people contributing time across sorting, packing, and programs.",
    metricType: "reach",
    source: "Current live site",
    verificationStatus: "unconfirmed",
    dateUpdated: "2026-06-08",
  },
  {
    value: "12,000+",
    label: "Pounds diverted from landfills",
    context: "Useful materials redirected into community benefit through the Supply Network.",
    metricType: "outcome",
    source: "Current live site",
    verificationStatus: "unconfirmed",
    dateUpdated: "2026-06-08",
  },
];

/** Whether any metric still needs confirmation — drives the transparency note. */
export const hasUnconfirmedMetrics = impactMetrics.some(
  (m) => m.verificationStatus === "unconfirmed",
);
