import Link from "next/link";
import { cn } from "@/lib/utils";

/** The spark mark: an orbit ring with a small brand-orange spark. */
export function SparkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("mark-orbit h-7 w-7 overflow-visible", className)}
    >
      <circle
        cx="10"
        cy="10"
        r="6"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
      />
      <circle className="orbit-dot" cx="16" cy="10" r="2" fill="var(--color-accent)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-sm font-display text-xl font-semibold tracking-tight text-ink",
        className,
      )}
      aria-label="SparkCreatives — home"
    >
      <SparkMark />
      <span>
        Spark<span className="text-primary">Creatives</span>
      </span>
    </Link>
  );
}
