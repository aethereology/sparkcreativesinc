import { ArrowRight } from "lucide-react";
import { ecosystemOrder, getProgram } from "@/content/programs";
import { ProgramIcon } from "@/components/content/ProgramIcon";
import { cn } from "@/lib/utils";

const REUSABLE_LINE =
  "Our programs work together: Spark Supply Network gathers resources, Spark Boxes create access, Spark Labs turn materials into learning, and Spark Studio helps emerging creatives grow.";

export function EcosystemFlow() {
  const flow = ecosystemOrder.map((slug) => getProgram(slug)!);

  return (
    <div>
      <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-ink-soft">
        {REUSABLE_LINE}
      </p>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {flow.map((p, i) => (
          <li key={p.slug} className="relative">
            <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-5">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-md",
                  p.theme === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent",
                )}
              >
                <ProgramIcon name={p.iconName} className="h-5 w-5" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Step {i + 1} · {p.role}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{p.pillarLine}</p>
            </div>
            {/* connector arrow between steps on wide screens */}
            {i < flow.length - 1 ? (
              <ArrowRight
                className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ink-faint lg:block"
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
