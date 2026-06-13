/**
 * Donation presets and designations.
 * Amounts and per-designation defaults confirmed by leadership 2026-06-11.
 * Levels are suggested, never fixed prices.
 */
export type Designation = {
  id: string;
  label: string;
  /** Maps to a program slug where relevant (for context only). */
  program?: string;
};

export const designations: Designation[] = [
  { id: "general", label: "Where it's needed most" },
  { id: "spark-boxes", label: "Spark Boxes", program: "spark-boxes" },
  { id: "spark-labs", label: "Spark Labs", program: "spark-labs" },
  { id: "spark-studio", label: "Spark Studio", program: "spark-studio" },
  { id: "spark-supply-network", label: "Spark Supply Network", program: "spark-supply-network" },
];

export const defaultDesignation = "general";

/** Suggested one-time amounts in whole USD. */
export const presetAmounts = [50, 100, 150, 200, 300, 500];

/** Default amount pre-selected when a designation is chosen. */
export const designationDefaults: Record<string, number> = {
  general: 100,
  "spark-boxes": 150,
  "spark-labs": 300,
  "spark-studio": 500,
  "spark-supply-network": 200,
};

/** Optional context line per amount (suggested only). */
export const amountHints: Record<number, string> = {
  150: "Suggested level to sponsor a Spark Box",
  200: "Suggested level to support the Spark Supply Network",
  300: "Suggested level to support a Spark Lab",
  500: "Suggested level to support a Spark Studio pathway",
};

export const minAmount = 5;
export const maxAmount = 50000;

export function designationLabel(id: string): string {
  return designations.find((d) => d.id === id)?.label ?? "Where it's needed most";
}
