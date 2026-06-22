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
  id: string;
  value: string;
  label: string;
  context: string;
  metricType: "output" | "outcome" | "reach";
  source: string;
  verificationStatus: VerificationStatus;
  dateUpdated: string;
  /**
   * Optional photo. Workflow: drop labeled files in web/assets/impact/,
   * copy to web/public/images/impact/, set the path here (bump ?v=N on replace).
   */
  image?: string;
  imageAlt?: string;
};

/** Current impact snapshot (live-site figures pending re-confirmation). */
export const impactMetrics: ImpactMetric[] = [
  {
    id: "spark-boxes",
    value: "84",
    label: "Spark Boxes packed",
    context: "Boxes of supplies and creative tools put into people's hands.",
    metricType: "output",
    source: "Leadership confirmed",
    verificationStatus: "verified",
    dateUpdated: "2026-06-08",
    image: "/images/impact/spark-boxes.png?v=2",
    imageAlt:
      "Illustration of children and families opening Spark Boxes filled with art supplies and books at a community event.",
  },
  {
    id: "families",
    value: "217",
    label: "Families directly supported",
    context: "Families reached through Spark Boxes and related programs.",
    metricType: "reach",
    source: "Leadership confirmed",
    verificationStatus: "verified",
    dateUpdated: "2026-06-10",
    image: "/images/impact/families.png?v=2",
    imageAlt:
      "Illustration of families reading and creating together around open Spark Boxes in a town square.",
  },
  {
    id: "volunteers",
    value: "54",
    label: "Volunteers",
    context: "People contributing time across sorting, packing, and programs.",
    metricType: "reach",
    source: "Leadership confirmed",
    verificationStatus: "verified",
    dateUpdated: "2026-06-08",
    image: "/images/impact/volunteers.png?v=2",
    imageAlt:
      "Illustration of volunteers sorting and packing donated supplies into boxes in a warehouse.",
  },
  {
    id: "landfill-diverted",
    value: "5,880 lbs",
    label: "Diverted from landfills",
    context: "Useful materials redirected into community benefit through the Supply Network.",
    metricType: "outcome",
    source: "Leadership confirmed",
    verificationStatus: "verified",
    dateUpdated: "2026-06-08",
    image: "/images/impact/landfill-diverted.png?v=2",
    imageAlt:
      "Illustration of a community repurposing reclaimed materials across workshops, gardens, and homes.",
  },
];

/** Whether any metric still needs confirmation — drives the transparency note. */
export const hasUnconfirmedMetrics = impactMetrics.some(
  (m) => m.verificationStatus === "unconfirmed",
);
