import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SparkMark } from "@/components/brand/Logo";
import { ProgramIcon } from "@/components/content/ProgramIcon";
import { org } from "@/content/org";
import { cta } from "@/content/ctas";
import { programs, ecosystemOrder, getProgram } from "@/content/programs";

export function Hero() {
  const flow = ecosystemOrder.map((slug) => getProgram(slug)!).filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-spark-grain">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="reveal">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-sm font-medium text-ink-soft">
            <SparkMark className="h-4 w-4" />
            Creative nonprofit · {org.locations[0]} &amp; {org.locations[1]}
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl">
            Turn surplus into <span className="text-primary">opportunity.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {org.thesis}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={cta.sponsorBox.href} size="lg">
              {cta.sponsorBox.label}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href={cta.explorePrograms.href} size="lg" variant="outline">
              {cta.explorePrograms.label}
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-faint">
            <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            {org.legalStatus} · EIN {org.ein}
          </p>
        </div>

        {/* Decorative ecosystem composition */}
        <div className="reveal" style={{ animationDelay: "120ms" }} aria-hidden="true">
          <div className="relative rounded-xl border border-border bg-surface/80 p-6 shadow-lg backdrop-blur">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-faint">
              One ecosystem
            </p>
            <ul className="space-y-3">
              {flow.map((p, i) => (
                <li
                  key={p.slug}
                  className="flex items-center gap-4 rounded-lg border border-border bg-paper px-4 py-3"
                >
                  <span
                    className={
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-md " +
                      (p.theme === "primary"
                        ? "bg-primary/12 text-primary"
                        : "bg-accent/12 text-accent")
                    }
                  >
                    <ProgramIcon name={p.iconName} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-semibold text-ink">
                      {p.name}
                    </span>
                    <span className="block text-sm text-ink-faint">{p.role}</span>
                  </span>
                  {i < flow.length - 1 ? (
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-ink-faint" />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="sr-only">
        SparkCreatives programs work together: {programs.map((p) => p.name).join(", ")}.
      </p>
    </section>
  );
}
