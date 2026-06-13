"use client";

import Link from "next/link";
import {
  BuildingsIcon,
  HandHeartIcon,
  PackageIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { AnimatedArrow } from "@/components/ui/animated-arrow";
import { cta } from "@/content/ctas";
import { cn } from "@/lib/utils";

const ROUTES = [
  {
    icon: HandHeartIcon,
    eyebrow: "Give funds",
    title: "Donate funds",
    body: "Sponsor a Spark Box or give to the program where you're needed most.",
    href: cta.donate.href,
    label: cta.donate.label,
    accent: "var(--color-ember)",
    stat: "Sponsor",
  },
  {
    icon: PackageIcon,
    eyebrow: "Give goods",
    title: "Donate goods",
    body: "Give useful supplies, materials, and creative tools to the Supply Network.",
    href: cta.donateGoods.href,
    label: cta.donateGoods.label,
    accent: "var(--color-accent)",
    stat: "Supply",
  },
  {
    icon: UsersIcon,
    eyebrow: "Give time",
    title: "Volunteer",
    body: "Help sort, pack, mentor, and run hands-on Spark Labs.",
    href: cta.volunteer.href,
    label: cta.volunteer.label,
    accent: "var(--color-primary)",
    stat: "Action",
  },
  {
    icon: BuildingsIcon,
    eyebrow: "Team up",
    title: "Partner",
    body: "Bring your business or organization into the work as a partner.",
    href: cta.partner.href,
    label: cta.partner.label,
    accent: "var(--color-accent)",
    stat: "Partner",
  },
];

function clampIndex(index: number, length: number) {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

function GetInvolvedCardFace({ route }: { route: (typeof ROUTES)[number] }) {
  const Icon = route.icon;

  return (
    <Link
      href={route.href}
      className="group block rounded-[1.45rem] outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e6df]"
    >
      <div
        className="relative flex aspect-[1.36] w-full overflow-hidden rounded-[1.45rem] border border-black/[0.08] bg-black/[0.045]"
        style={{ "--accent": route.accent } as CSSProperties}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,var(--accent),transparent_24%),radial-gradient(circle_at_85%_72%,rgba(255,255,255,0.55),transparent_28%)] opacity-55" />
        <div className="absolute inset-x-8 bottom-0 h-[72%] rounded-t-[999px] border-2 border-zinc-950 bg-[#f7f5ef]" />
        <div className="absolute left-1/2 top-[24%] flex size-20 -translate-x-1/2 items-center justify-center rounded-[45%_55%_48%_52%] border-2 border-zinc-950 bg-[#f5f2eb] sm:size-24">
          <Icon className="h-10 w-10 text-zinc-950 sm:h-11 sm:w-11" weight="duotone" aria-hidden="true" />
        </div>
        <div className="absolute bottom-4 right-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          {route.stat}
        </div>
        <div className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-zinc-950 text-white shadow-lg shadow-black/20">
          <AnimatedArrow />
        </div>
      </div>

      <div className="px-2 pb-2 pt-5 sm:pt-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {route.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-zinc-950 sm:text-[2rem]">
          {route.title}
        </h3>
        <p className="mt-4 max-w-[17rem] text-[0.95rem] font-medium leading-[1.42] text-zinc-700 sm:text-[0.98rem]">
          {route.body}
        </p>
        <div className="mt-5 border-t border-black/10 pt-4">
          <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-950">
            {route.label}
          </span>
        </div>
      </div>
    </Link>
  );
}

const MOBILE_COLLAPSED_HEIGHT = 56;

function GetInvolvedMobilePanel({
  route,
  isActive,
  onSelect,
}: {
  route: (typeof ROUTES)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = route.icon;
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setContentHeight(el.scrollHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#e9e6df] text-[#141414] shadow-sm shadow-black/5 transition-[height] duration-500 ease-in-out"
      style={{
        height: isActive ? contentHeight : MOBILE_COLLAPSED_HEIGHT,
        "--accent": route.accent,
      } as CSSProperties}
    >
      {/* Collapsed bar */}
      <button
        type="button"
        aria-label={`Show ${route.title}`}
        aria-expanded={isActive}
        onClick={onSelect}
        onFocus={onSelect}
        className={cn(
          "absolute inset-x-0 top-0 z-10 flex w-full items-center gap-3 px-4 text-left",
          "transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e9e6df]",
          isActive ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        style={{ height: MOBILE_COLLAPSED_HEIGHT }}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[45%_55%_48%_52%] border-2 border-zinc-950 bg-[#f5f2eb]">
          <Icon className="h-5 w-5 text-zinc-950" weight="duotone" aria-hidden="true" />
        </span>
        <span className="font-display text-base font-semibold leading-none text-zinc-950">
          {route.title}
        </span>
        <span className="ml-auto rounded-full bg-zinc-950 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white">
          {route.stat}
        </span>
      </button>

      {/* Expanded web-style card */}
      <div
        ref={contentRef}
        className={cn(
          "p-4 transition-opacity duration-300",
          isActive ? "opacity-100 delay-100" : "opacity-0",
        )}
      >
        <GetInvolvedCardFace route={route} />
      </div>
    </div>
  );
}

export function GetInvolvedCarousel({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const defaultIndex = clampIndex(1, ROUTES.length);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [raisedIndex, setRaisedIndex] = useState(defaultIndex);
  const raiseTimeoutRef = useRef<number | null>(null);
  const collapseTimeoutRef = useRef<number | null>(null);
  const center = (ROUTES.length - 1) / 2;

  useEffect(() => {
    return () => {
      if (raiseTimeoutRef.current) window.clearTimeout(raiseTimeoutRef.current);
      if (collapseTimeoutRef.current) window.clearTimeout(collapseTimeoutRef.current);
    };
  }, []);

  const cardLayouts = useMemo(
    () =>
      ROUTES.map((_, index) => {
        const fromCenter = index - center;
        const collapsedFromActive = index - defaultIndex;

        return {
          collapsed: {
            x: collapsedFromActive * 12,
            y: Math.abs(collapsedFromActive) * 6,
            rotate: collapsedFromActive * 2.8,
          },
          expanded: {
            x: fromCenter * 150,
            y: Math.abs(fromCenter) * 28,
            rotate: fromCenter * 8,
          },
        };
      }),
    [center, defaultIndex],
  );

  const activateCard = (index: number) => {
    setActiveIndex(index);

    if (raiseTimeoutRef.current) window.clearTimeout(raiseTimeoutRef.current);

    raiseTimeoutRef.current = window.setTimeout(
      () => setRaisedIndex(index),
      reducedMotion ? 0 : 45,
    );
  };

  const scheduleCollapse = () => {
    if (collapseTimeoutRef.current) window.clearTimeout(collapseTimeoutRef.current);

    collapseTimeoutRef.current = window.setTimeout(() => {
      setExpanded(false);
      setActiveIndex(defaultIndex);
      setRaisedIndex(defaultIndex);
    }, 80);
  };

  const cancelCollapse = () => {
    if (collapseTimeoutRef.current) {
      window.clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={cn(
        "relative mx-auto w-full max-w-5xl px-5 py-4 lg:flex lg:min-h-[34rem] lg:items-center lg:justify-center lg:overflow-hidden",
        className,
      )}
    >
      <div className="flex flex-col gap-3 lg:hidden">
        {ROUTES.map((route, index) => (
          <GetInvolvedMobilePanel
            key={route.title}
            route={route}
            isActive={index === mobileActiveIndex}
            onSelect={() => setMobileActiveIndex(index)}
          />
        ))}
      </div>

      <div className="relative hidden h-[30rem] w-full max-w-[58rem] lg:block">
        {ROUTES.map((route, index) => {
          const active = activeIndex === index;
          const cardLayout = cardLayouts[index] ?? cardLayouts[defaultIndex]!;
          const layout = expanded ? cardLayout.expanded : cardLayout.collapsed;
          const raised = raisedIndex === index;
          const zIndex = raised
            ? 80
            : expanded
              ? 50 - Math.abs(index - raisedIndex)
              : 50 - Math.abs(index - defaultIndex);

          return (
            <motion.article
              key={route.title}
              className="absolute left-1/2 top-1/2 w-[min(78vw,21rem)] origin-bottom rounded-[1.9rem] border border-black/10 bg-[#e9e6df] p-4 text-[#141414] shadow-xl shadow-black/10"
              style={{ zIndex }}
              animate={{
                x: `calc(-50% + ${layout.x}px)`,
                y: `calc(-50% + ${layout.y - (active && expanded ? 34 : 0)}px)`,
                rotate: layout.rotate,
                scale: expanded ? 0.985 : 0.97,
              }}
              transition={
                reducedMotion
                  ? { duration: 0.01 }
                  : { type: "spring", stiffness: 350, damping: 30, mass: 0.7 }
              }
              onMouseEnter={() => {
                cancelCollapse();
                setExpanded(true);
                activateCard(index);
              }}
              onMouseLeave={scheduleCollapse}
            >
              <div
                onFocus={() => {
                  cancelCollapse();
                  setExpanded(true);
                  activateCard(index);
                }}
                onBlur={scheduleCollapse}
              >
                <GetInvolvedCardFace route={route} />
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}
