import { cn } from "@/lib/utils";

/**
 * A chevron that grows a tail into a full arrow on hover. Pure CSS (no JS), so
 * it works in both Server and Client Components. It reacts to the nearest
 * ancestor with the `group` class — place it inside a `group` link/card/button.
 * Uses currentColor, so it inherits the surrounding text color (our tokens).
 */
export function AnimatedArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative grid h-4 w-4 items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
      <span className="absolute right-[6px] h-[2px] w-2 origin-right scale-x-0 rounded-[1px] bg-current transition-all duration-300 ease-out group-hover:right-[5px] group-hover:scale-x-100" />
    </span>
  );
}
