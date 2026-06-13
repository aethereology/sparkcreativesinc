"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatedArrow } from "@/components/ui/animated-arrow";
import { programs } from "@/content/programs";
import { ProgramIcon } from "@/components/content/ProgramIcon";
import { cn } from "@/lib/utils";

/**
 * Expanding image gallery for the four programs (Skiper "HoverExpand" look),
 * rebuilt on this project's stack: CSS flex-grow transitions + React state,
 * no framer-motion/swiper.
 *
 * Interaction is split so navigation is never accidental:
 *  - The panel itself only EXPANDS (hover / focus / tap select it).
 *  - Only the "Learn more" link NAVIGATES. Tapping the card body never
 *    leaves the page — important on touch where there is no hover.
 *
 * Mobile (< sm): vertical hover-expand, with one tall active panel and
 * collapsed strips. sm+ : the horizontal hover-expand.
 * Reduced-motion users get instant state changes (global override).
 */
export function ProgramHoverExpand() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 sm:h-[26rem] sm:flex-row sm:gap-2">
      {programs.map((program, index) => {
        const isActive = index === active;
        const themedSurface =
          program.theme === "primary"
            ? "from-primary/25 to-ember/10 text-primary"
            : "from-accent/25 to-accent/5 text-accent";

        return (
          <div
            key={program.slug}
            onMouseEnter={() => setActive(index)}
            className={cn(
              "group relative w-full overflow-hidden rounded-xl border border-border bg-surface-2",
              "transition-[height,flex-grow] duration-500 ease-in-out",
              isActive ? "h-[24rem] sm:h-full sm:flex-[4]" : "h-12 sm:h-full sm:flex-[1]",
            )}
          >
            {/* Image / placeholder layer */}
            {program.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={program.image}
                alt={program.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
                  themedSurface,
                )}
                role="img"
                aria-label={program.imageAlt}
              >
                <ProgramIcon
                  name={program.iconName}
                  className="h-16 w-16 opacity-40"
                />
                <span className="absolute bottom-3 right-3 text-[0.65rem] font-medium uppercase tracking-wide opacity-60">
                  Photo placeholder
                </span>
              </div>
            )}

            {/* Full-size expand trigger — selects the panel, never navigates.
                Harmless on mobile (everything is already shown). */}
            <button
              type="button"
              aria-label={`Show ${program.name}`}
              aria-expanded={isActive}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="absolute inset-0 h-full w-full cursor-pointer rounded-xl focus-visible:outline-offset-4"
            />

            {/* Darkening scrim for legible overlay text (always on mobile) */}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/75 via-ink/25 to-transparent",
                "transition-opacity duration-500",
                isActive ? "opacity-100" : "opacity-80",
              )}
            />

            {/* Collapsed label: horizontal on mobile, vertical on desktop. */}
            <div
              className={cn(
                "pointer-events-none absolute left-4 top-3 z-10 flex items-center gap-2 transition-opacity duration-300 sm:top-4 sm:flex-col sm:items-start sm:gap-3",
                isActive ? "opacity-0" : "opacity-100",
              )}
            >
              <ProgramIcon name={program.iconName} className="h-6 w-6 shrink-0 text-paper" />
              <span className="font-display text-sm font-semibold text-paper sm:[writing-mode:vertical-rl] sm:rotate-180">
                {program.name}
              </span>
            </div>

            {/* Expanded overlay content */}
            <div
              className={cn(
                "absolute inset-0 z-10 flex flex-col items-start justify-start p-5",
                "transition-opacity duration-500",
                isActive ? "opacity-100 delay-100" : "pointer-events-none opacity-0",
              )}
            >
              <span className="inline-flex w-fit rounded-full bg-paper/85 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink">
                {program.role}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-paper">
                {program.name}
              </h3>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-paper/85">
                {program.pillarLine}
              </p>
              {isActive ? (
                <Link
                  href={`/programs/${program.slug}`}
                  aria-label={`Learn more about ${program.name}`}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md py-2 text-sm font-semibold text-paper transition-[gap] hover:gap-2.5 focus-visible:outline-offset-4"
                >
                  Learn more
                  <AnimatedArrow />
                </Link>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
