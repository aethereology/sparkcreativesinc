/**
 * Donation presets and designations.
 * NOTE: amounts are carried from the current live site as SUGGESTED levels and
 * are flagged for confirmation. The UI labels them as suggested, never as fixed
 * prices. TODO: leadership confirm final amounts and what each supports.
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
export const presetAmounts = [50, 100, 150, 300];

/** Optional context line per amount (suggested only). TODO: leadership confirm. */
export const amountHints: Record<number, string> = {
  150: "Suggested level to sponsor a Spark Box",
};

export const minAmount = 5;
export const maxAmount = 50000;

export function designationLabel(id: string): string {
  return designations.find((d) => d.id === id)?.label ?? "Where it's needed most";
}
