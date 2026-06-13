"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  CircuitBoard,
  type CircuitConnection,
  type CircuitNode,
} from "@/components/ui/circuit-board";
import { ecosystemOrder, getProgram, type Program } from "@/content/programs";
import { ProgramIcon } from "@/components/content/ProgramIcon";
import { SparkMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const BOARD_W = 560;
const BOARD_H = 440;

/** Diamond ring around a central hub — clockwise in the ecosystem order. */
const POSITIONS: Record<string, { x: number; y: number }> = {
  "spark-supply-network": { x: 280, y: 66 }, // top
  "spark-boxes": { x: 494, y: 220 }, // right
  "spark-labs": { x: 280, y: 374 }, // bottom
  "spark-studio": { x: 66, y: 220 }, // left
};

const SPOKE_COLOR = "color-mix(in srgb, var(--color-ink-faint) 30%, transparent)";

function ProgramTile({ program }: { program: Program }) {
  return (
    <span
      title={program.name}
      className={cn(
        "relative flex size-14 items-center justify-center rounded-2xl border bg-gradient-to-br from-surface shadow-lg",
        program.theme === "primary"
          ? "border-primary/40 to-primary/20 text-primary shadow-primary/20"
          : "border-accent/40 to-accent/20 text-accent shadow-accent/20",
      )}
    >
      <ProgramIcon name={program.iconName} className="h-7 w-7" />
      <span className="absolute left-1/2 top-full mt-1.5 whitespace-nowrap rounded-full border border-border bg-surface/85 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-ink-soft shadow-sm backdrop-blur">
        {program.name}
      </span>
    </span>
  );
}

function EcosystemHub() {
  return (
    <div className="relative">
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
        <div className="flex size-28 flex-col items-center justify-center gap-1 rounded-full bg-surface text-center">
          <SparkMark className="h-7 w-7" />
          <span className="px-3 font-display text-xs font-semibold leading-tight text-ink">
            Circular economy
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * The four programs wired as a circular economy on an animated circuit board:
 * resources circulate Supply Network → Boxes → Labs → Studio and back, while
 * faint spokes anchor every program to the shared hub at the center.
 *
 * The board is decorative (aria-hidden) and scales to fit small screens; the
 * legend below is the accessible, linked version of the same cycle. Pulses
 * stop for prefers-reduced-motion users (handled inside CircuitBoard).
 */
export function ProgramCircuit() {
  const flow = ecosystemOrder.map((slug) => getProgram(slug)!);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => setScale(Math.min(1, el.clientWidth / BOARD_W));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const nodes: CircuitNode[] = [
    ...flow.map((p) => ({
      id: p.slug,
      x: POSITIONS[p.slug]!.x,
      y: POSITIONS[p.slug]!.y,
      size: 56,
      content: <ProgramTile program={p} />,
    })),
    { id: "hub", x: 280, y: 220, size: 116, content: <EcosystemHub /> },
  ];

  const connections: CircuitConnection[] = [
    // Subtle spokes anchoring each program to the shared hub.
    ...flow.map((p) => ({
      from: p.slug,
      to: "hub",
      animated: false,
      color: SPOKE_COLOR,
    })),
    // The circulating ring — ecosystem order, looping back to the start.
    { from: "spark-supply-network", to: "spark-boxes", animated: true, pulseColor: "var(--color-ember)" },
    { from: "spark-boxes", to: "spark-labs", animated: true, pulseColor: "var(--color-accent)" },
    { from: "spark-labs", to: "spark-studio", animated: true, pulseColor: "var(--color-ember)" },
    { from: "spark-studio", to: "spark-supply-network", animated: true, pulseColor: "var(--color-accent)" },
  ];

  return (
    <div>
      <div ref={wrapRef} className="w-full" aria-hidden="true">
        <div
          className="relative mx-auto"
          style={{ width: BOARD_W * scale, height: BOARD_H * scale }}
        >
          <div
            style={{
              width: BOARD_W,
              height: BOARD_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <CircuitBoard
              nodes={nodes}
              connections={connections}
              width={BOARD_W}
              height={BOARD_H}
              pulseSpeed={3.6}
            />
          </div>
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
