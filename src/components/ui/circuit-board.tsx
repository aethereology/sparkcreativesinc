"use client";

/**
 * CircuitBoard — adapted from componentry.fun (@componentry/circuit-board).
 *
 * Changes from the upstream registry source, to fit this project:
 * - Uses `motion/react` (project standard) instead of `framer-motion`.
 * - Colors default to our design tokens and accept any CSS color/var string,
 *   so light/dark follow our `prefers-color-scheme` model with no JS theme probe.
 * - Honors `prefers-reduced-motion`: traces render fully drawn and the pulses stop.
 * - Adds a generic `content` escape hatch on a node so the composition layer can
 *   render fully custom node visuals (brand tiles, the hub) while this primitive
 *   stays brand-agnostic — mirroring how ProgramOrbit composes orbiting-circles.
 *
 * The board is purely decorative; consumers should mark it aria-hidden and
 * provide an accessible equivalent (e.g. a linked legend).
 */

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface CircuitNode {
  id: string;
  x: number;
  y: number;
  label?: string;
  icon?: React.ReactNode;
  /** Fully custom node visual, centered at (x, y). Replaces default chrome. */
  content?: React.ReactNode;
  /** CSS color/var for the default node chrome and label. */
  color?: string;
  /** Named tier or an explicit pixel diameter (drives trace offsets). */
  size?: "sm" | "md" | "lg" | number;
}

export interface CircuitConnection {
  from: string;
  to: string;
  /** Defaults to true. Set false for a static trace (e.g. a spoke). */
  animated?: boolean;
  bidirectional?: boolean;
  /** Base trace color. */
  color?: string;
  /** Travelling pulse color. */
  pulseColor?: string;
}

export interface CircuitBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: CircuitNode[];
  connections: CircuitConnection[];
  width?: number;
  height?: number;
  gridSize?: number;
  showGrid?: boolean;
  gridColor?: string;
  traceColor?: string;
  pulseColor?: string;
  pulseSpeed?: number;
  traceWidth?: number;
}

const DEFAULT_GRID_COLOR = "color-mix(in srgb, var(--color-ink-faint) 22%, transparent)";
const DEFAULT_TRACE_COLOR = "color-mix(in srgb, var(--color-ink-faint) 45%, transparent)";
const DEFAULT_PULSE_COLOR = "var(--color-ember)";

function resolveSize(size: CircuitNode["size"]): number {
  if (typeof size === "number") return size;
  switch (size) {
    case "sm":
      return 24;
    case "lg":
      return 48;
    default:
      return 36;
  }
}

/** Right-angled, circuit-style path between two node edges. */
function calculatePath(from: CircuitNode, to: CircuitNode): string {
  const fromHalf = resolveSize(from.size) / 2 + 4;
  const toHalf = resolveSize(to.size) / 2 + 4;

  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    const startX = from.x + (dx > 0 ? fromHalf : -fromHalf);
    const endX = to.x + (dx > 0 ? -toHalf : toHalf);
    const midX = from.x + dx / 2;
    return `M ${startX} ${from.y} H ${midX} V ${to.y} H ${endX}`;
  }

  const startY = from.y + (dy > 0 ? fromHalf : -fromHalf);
  const endY = to.y + (dy > 0 ? -toHalf : toHalf);
  const midY = from.y + dy / 2;
  return `M ${from.x} ${startY} V ${midY} H ${to.x} V ${endY}`;
}

const PULSE_PATH_LENGTH = 500;

export function CircuitBoard({
  nodes,
  connections,
  width = 600,
  height = 400,
  gridSize = 22,
  showGrid = true,
  gridColor = DEFAULT_GRID_COLOR,
  traceColor = DEFAULT_TRACE_COLOR,
  pulseColor = DEFAULT_PULSE_COLOR,
  pulseSpeed = 3,
  traceWidth = 2,
  className,
  ...props
}: CircuitBoardProps) {
  const reducedMotion = useReducedMotion();
  const nodeMap = React.useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes],
  );

  return (
    <div
      className={cn("relative overflow-visible", className)}
      style={{ width, height }}
      {...props}
    >
      <svg
        width={width}
        height={height}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="circuit-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {showGrid ? (
            <pattern
              id="circuit-grid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={gridSize / 2} cy={gridSize / 2} r="0.6" fill={gridColor} />
            </pattern>
          ) : null}
        </defs>

        {showGrid ? <rect width={width} height={height} fill="url(#circuit-grid)" /> : null}

        {connections.map((conn, i) => {
          const fromNode = nodeMap.get(conn.from);
          const toNode = nodeMap.get(conn.to);
          if (!fromNode || !toNode) return null;

          const path = calculatePath(fromNode, toNode);
          const stroke = conn.color ?? traceColor;
          const pulse = conn.pulseColor ?? pulseColor;
          const animate = conn.animated !== false && !reducedMotion;

          return (
            <g key={`${conn.from}-${conn.to}-${i}`}>
              <motion.path
                d={path}
                fill="none"
                stroke={stroke}
                strokeWidth={traceWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: i * 0.15 }}
              />

              {animate ? (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={pulse}
                  strokeWidth={traceWidth + 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#circuit-glow)"
                  strokeDasharray={`${PULSE_PATH_LENGTH * 0.1} ${PULSE_PATH_LENGTH * 0.9}`}
                  initial={{ strokeDashoffset: PULSE_PATH_LENGTH }}
                  animate={{ strokeDashoffset: -PULSE_PATH_LENGTH }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                />
              ) : null}

              {animate && conn.bidirectional ? (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={pulse}
                  strokeWidth={traceWidth + 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#circuit-glow)"
                  strokeDasharray={`${PULSE_PATH_LENGTH * 0.1} ${PULSE_PATH_LENGTH * 0.9}`}
                  initial={{ strokeDashoffset: -PULSE_PATH_LENGTH }}
                  animate={{ strokeDashoffset: PULSE_PATH_LENGTH }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3 + pulseSpeed / 2,
                  }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {nodes.map((node, i) => {
        const entrance = reducedMotion
          ? undefined
          : {
              initial: { scale: 0, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: i * 0.1 + 0.4, type: "spring" as const, stiffness: 220, damping: 18 },
            };

        // Custom-content node: render the supplied visual centered at (x, y).
        if (node.content) {
          return (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
              {...entrance}
            >
              {node.content}
            </motion.div>
          );
        }

        // Default chrome: a tinted, bordered tile with optional icon + label.
        const size = resolveSize(node.size);
        const color = node.color ?? "var(--color-ink-soft)";

        return (
          <motion.div
            key={node.id}
            className="absolute flex items-center justify-center rounded-lg border-2"
            style={{
              left: node.x - size / 2,
              top: node.y - size / 2,
              width: size,
              height: size,
              borderColor: color,
              backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
            }}
            {...entrance}
          >
            {node.icon ? (
              <div className="relative z-10" style={{ color }}>
                {node.icon}
              </div>
            ) : null}
            {node.label ? (
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium"
                style={{ color }}
              >
                {node.label}
              </div>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
