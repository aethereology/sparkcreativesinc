import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SparkMark } from "@/components/brand/Logo";
import type { Cta } from "@/content/ctas";

export function CTASection({
  title,
  body,
  primary,
  secondary,
}: {
  title: ReactNode;
  body?: ReactNode;
  primary: Cta;
  secondary?: Cta;
}) {
  return (
    <section className="bg-ink px-5 py-16 text-paper sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <SparkMark className="h-9 w-9" />
        <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
        {body ? <p className="mt-4 max-w-2xl text-lg text-paper/80">{body}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primary.href} size="lg">
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              size="lg"
              variant="outline"
              className="border-paper/30 bg-transparent text-paper hover:border-paper hover:text-paper"
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
