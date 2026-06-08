import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "transition-[background-color,color,box-shadow,transform] duration-200 ease-out " +
  "active:translate-y-px disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover shadow-sm hover:shadow-md",
  accent: "bg-accent text-on-accent hover:bg-accent-hover shadow-sm hover:shadow-md",
  outline:
    "border-2 border-ink/20 text-ink bg-surface/60 hover:border-primary hover:text-primary",
  ghost: "text-ink hover:bg-muted",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-12 px-7 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

type AsLink = BaseProps & { href: string };
type AsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children, onClick } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    return (
      <Link href={props.href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
