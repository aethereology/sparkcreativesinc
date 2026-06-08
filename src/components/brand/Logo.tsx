import Link from "next/link";
import { cn } from "@/lib/utils";

/** The spark mark: radiating strokes forming a warm spark/asterisk. */
export function SparkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("h-7 w-7", className)}
    >
      <g
        stroke="var(--color-ember)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M16 4.5 L16 12" />
        <path d="M16 20 L16 27.5" />
        <path d="M4.5 16 L12 16" />
        <path d="M20 16 L27.5 16" />
        <path d="M8 8 L13 13" stroke="var(--color-accent)" />
        <path d="M19 19 L24 24" stroke="var(--color-accent)" />
        <path d="M24 8 L19 13" />
        <path d="M13 19 L8 24" />
      </g>
      <circle cx="16" cy="16" r="3" fill="var(--color-primary)" />
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
