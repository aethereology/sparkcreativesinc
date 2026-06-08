import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "paper" | "surface" | "muted" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  muted: "bg-muted text-ink",
  ink: "bg-ink text-paper",
};

/** Vertical-rhythm section with a centered, max-width container. */
export function Section({
  as: Tag = "section",
  tone = "paper",
  className,
  containerClassName,
  children,
  id,
}: {
  as?: ElementType;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("px-5 py-16 sm:px-6 sm:py-20 lg:py-24", tones[tone], className)}>
      <div className={cn("mx-auto w-full max-w-6xl", containerClassName)}>{children}</div>
    </Tag>
  );
}

/** Eyebrow + heading + optional lede, used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {lede ? (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lede}</p>
      ) : null}
    </div>
  );
}
