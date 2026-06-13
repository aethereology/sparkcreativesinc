import { Fragment } from "react";
import Link from "next/link";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { ecosystemOrder, getProgram } from "@/content/programs";
import { ProgramIcon } from "@/components/content/ProgramIcon";
import { SparkMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const OUTER_RADIUS = 150;
const INNER_RADIUS = 88;

/**
 * The four programs in orbit around a shared hub — a literal "circular economy":
 * resources circulate inward while the programs move together around the center.
 * Layers, back to front: warm ember/teal atmosphere → dashed ring tracks → a
 * slowly sweeping ember-to-teal comet arc → inner spark particles → the four
 * program nodes (named on sm+) → a gradient-ringed hub with a breathing halo.
 *
 * Hovering the stage pauses every orbit so labels can be read. All animation
 * halts for prefers-reduced-motion users via the global rule in globals.css.
 * The spinning stage is decorative (aria-hidden); the legend below provides
 * the accessible, linked version of the same cycle.
 */
export function ProgramOrbit() {
  const flow = ecosystemOrder.map((slug) => getProgram(slug)!);

  return (
    <div>
      <div
        className="group relative mx-auto flex h-[22rem] w-full items-center justify-center overflow-hidden sm:h-[28rem]"
        aria-hidden="true"
      >
        {/* Warm atmosphere behind the stage */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-ember) 10%, transparent), transparent 46%), radial-gradient(circle at 74% 26%, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent 36%)",
          }}
        />

        {/* Scaled stage so the fixed-radius orbit fits small screens */}
        <div className="relative flex size-full scale-[0.78] items-center justify-center sm:scale-100">
          {/* Ring tracks */}
          <svg className="pointer-events-none absolute inset-0 size-full">
            <circle
              cx="50%"
              cy="50%"
              r={OUTER_RADIUS}
              fill="none"
              className="stroke-ink-faint/40"
              strokeWidth="1.5"
              strokeDasharray="3 9"
              strokeLinecap="round"
            />
            <circle
              cx="50%"
              cy="50%"
              r={INNER_RADIUS}
              fill="none"
              className="stroke-ink-faint/30"
              strokeWidth="1"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
          </svg>

          {/* Ember-to-teal comet arcs sweeping the outer ring */}
          <div className="pointer-events-none absolute inset-0 animate-orbit-spin group-hover:[animation-play-state:paused]">
            <svg className="size-full">
              <defs>
                <linearGradient id="program-orbit-arc" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-ember)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
              {/* dasharray pattern divides the 2πr≈942 circumference into two arcs */}
              <circle
                cx="50%"
                cy="50%"
                r={OUTER_RADIUS}
                fill="none"
                stroke="url(#program-orbit-arc)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="110 361"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Center hub: breathing halo + conic gradient ring */}
          <div className="relative z-10">
            <div
              className="absolute -inset-5 animate-hub-pulse rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-ember) 22%, transparent), transparent 70%)",
              }}
            />
            <div
              className="relative rounded-full p-[2px] shadow-lg"
              style={{
                background:
                  "conic-gradient(from 140deg, var(--color-ember), var(--color-accent), var(--color-ember))",
              }}
            >
              <div className="flex size-28 flex-col items-center justify-center gap-1 rounded-full bg-surface text-center sm:size-32">
                <SparkMark className="h-7 w-7" />
                <span className="px-3 font-display text-xs font-semibold leading-tight text-ink sm:text-sm">
                  Circular economy
                </span>
              </div>
            </div>
          </div>

          {/* Inner reverse orbit: spark particles circulating back to the hub */}
          <OrbitingCircles
            radius={INNER_RADIUS}
            reverse
            duration={26}
            iconSize={12}
            path={false}
            className="group-hover:[animation-play-state:paused]"
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={cn(
                  "rounded-full",
                  i % 2 === 0
                    ? "size-2 bg-ember shadow-[0_0_10px_2px_color-mix(in_srgb,var(--color-ember)_55%,transparent)]"
                    : "size-1.5 bg-accent shadow-[0_0_8px_2px_color-mix(in_srgb,var(--color-accent)_50%,transparent)]",
                )}
              />
            ))}
          </OrbitingCircles>

          {/* Outer orbit: the four programs moving together */}
          <OrbitingCircles
            radius={OUTER_RADIUS}
            duration={44}
            iconSize={56}
            path={false}
            className="group-hover:[animation-play-state:paused]"
          >
            {flow.map((p) => (
              <span
                key={p.slug}
                title={p.name}
                className={cn(
                  "relative flex size-14 items-center justify-center rounded-2xl border bg-gradient-to-br from-surface shadow-lg",
                  p.theme === "primary"
                    ? "border-primary/40 to-primary/20 text-primary shadow-primary/20"
                    : "border-accent/40 to-accent/20 text-accent shadow-accent/20",
                )}
              >
                <ProgramIcon name={p.iconName} className="h-7 w-7" />
                <span className="absolute left-1/2 top-full mt-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-surface/85 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-ink-soft shadow-sm backdrop-blur sm:block">
                  {p.name}
                </span>
              </span>
            ))}
          </OrbitingCircles>
        </div>
      </div>

      {/* Accessible legend: the same cycle as linked chips, in handoff order */}
      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-2.5 gap-y-3">
        {flow.map((p, i) => (
          <Fragment key={p.slug}>
            <Link
              href={`/programs/${p.slug}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium text-ink transition-colors",
                p.theme === "primary"
                  ? "border-primary/25 bg-primary/5 hover:border-primary/50 hover:bg-primary/10"
                  : "border-accent/25 bg-accent/5 hover:border-accent/50 hover:bg-accent/10",
              )}
            >
              <ProgramIcon
                name={p.iconName}
                className={cn(
                  "h-4 w-4",
                  p.theme === "primary" ? "text-primary" : "text-accent",
                )}
              />
              {p.name}
            </Link>
            <span aria-hidden="true" className="select-none text-ink-faint">
              {i < flow.length - 1 ? "→" : "↻"}
            </span>
          </Fragment>
        ))}
        <span className="sr-only">The cycle then repeats.</span>
      </div>
    </div>
  );
}
