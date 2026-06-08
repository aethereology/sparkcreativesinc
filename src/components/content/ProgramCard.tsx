import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/content/programs";
import { ProgramIcon } from "@/components/content/ProgramIcon";
import { cn } from "@/lib/utils";

export function ProgramCard({ program }: { program: Program }) {
  const themed =
    program.theme === "primary"
      ? "bg-primary/10 text-primary"
      : "bg-accent/10 text-accent";

  return (
    <article className="group relative flex flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className={cn("flex h-12 w-12 items-center justify-center rounded-md", themed)}>
          <ProgramIcon name={program.iconName} className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
          {program.role}
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold text-ink">
        <Link href={`/programs/${program.slug}`} className="after:absolute after:inset-0">
          {program.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-ink-soft">{program.shortDescription}</p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform group-hover:gap-2.5">
        Learn more
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </article>
  );
}
