"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Hamburger ↔ X, morphing between the two states. Controlled via `open` so the
 * owner (e.g. the header) holds the toggle state and handles the click/aria.
 * Bars use currentColor, inheriting the surrounding text color (our tokens).
 */
export function AnimatedMenu({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative grid size-5 items-center justify-center", className)}
    >
      <motion.span
        animate={{ y: open ? 0 : -6, rotate: open ? 45 : 0 }}
        className="absolute h-0.5 w-full rounded-full bg-current"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.1 }}
        className="absolute h-0.5 w-full rounded-full bg-current"
      />
      <motion.span
        animate={{ y: open ? 0 : 6, rotate: open ? -45 : 0 }}
        className="absolute h-0.5 w-full rounded-full bg-current"
      />
    </span>
  );
}

/**
 * Mute/unmute speaker toggle with a wiggle + a slash that draws in. Self-contained
 * (owns its state). Colors mapped to our tokens. Currently unused — there is no
 * audio on the site yet — but kept available for any future media/player UI.
 */
export function AnimatedVolume({ className }: { className?: string }) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={isMuted}
      aria-label={isMuted ? "Unmute" : "Mute"}
      onClick={() => setIsMuted((x) => !x)}
      className={cn(
        "group flex cursor-pointer items-center justify-center text-ink",
        className,
      )}
    >
      <motion.span
        initial={false}
        className="relative flex size-5 items-center justify-center"
        animate={{ rotate: isMuted ? [0, -15, 5, -2, 0] : 0 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-full">
          <path
            fill="currentColor"
            stroke="none"
            d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
          />
          <motion.g>
            <path
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              d="M16 9a5 5 0 0 1 0 6"
            />
            <path
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              d="M19.364 18.364a9 9 0 0 0 0-12.728"
            />
          </motion.g>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rotate-[-40deg] overflow-hidden">
            <motion.span
              animate={{ scaleY: isMuted ? 1 : 0 }}
              transition={{
                ease: "easeInOut",
                duration: isMuted ? 0.125 : 0.05,
                delay: isMuted ? 0.15 : 0,
              }}
              style={{ transformOrigin: "top" }}
              className="block h-[18px] w-fit rounded-full"
            >
              {/* paper-colored halo around an ink-colored slash (our tokens) */}
              <span className="flex h-full w-[3.5px] items-center justify-center rounded-full bg-paper">
                <span className="h-full w-[1.5px] rounded-full bg-ink" />
              </span>
            </motion.span>
          </span>
        </span>
      </motion.span>
    </button>
  );
}
