import { Info } from "lucide-react";
import type { ImpactMetric as Metric } from "@/content/metrics";

export function ImpactMetricCard({ metric }: { metric: Metric }) {
  const unconfirmed = metric.verificationStatus === "unconfirmed";
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <p className="font-display text-4xl font-semibold text-primary">{metric.value}</p>
      <p className="mt-1 font-semibold text-ink">{metric.label}</p>
      <p className="mt-2 text-sm text-ink-soft">{metric.context}</p>
      {unconfirmed ? (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-faint">
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
          {metric.source} · pending confirmation
        </p>
      ) : null}
    </div>
  );
}
