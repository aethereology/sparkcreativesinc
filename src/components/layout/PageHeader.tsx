import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  crumbs?: Crumb[];
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-faint">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1">
                  {i > 0 ? (
                    <CaretRightIcon className="h-3.5 w-3.5" weight="bold" aria-hidden="true" />
                  ) : null}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.path} className="hover:text-primary">
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink-soft">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl">{title}</h1>
          {lede ? (
            <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">{lede}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </header>
  );
}
