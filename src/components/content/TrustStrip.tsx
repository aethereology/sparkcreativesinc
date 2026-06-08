import { ShieldCheck, MapPin, Recycle } from "lucide-react";
import { org } from "@/content/org";

const items = [
  { icon: ShieldCheck, label: org.legalStatus, sub: `EIN ${org.ein}` },
  { icon: MapPin, label: "Jacksonville ↔ Cebu", sub: "Local volunteers, global impact" },
  { icon: Recycle, label: "Reuse-powered", sub: "Surplus redirected into programs" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-border bg-surface-2">
      <ul className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.label} className="flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-ink">{it.label}</span>
                <span className="block text-sm text-ink-faint">{it.sub}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
