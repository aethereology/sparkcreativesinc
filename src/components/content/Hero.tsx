import { ShieldCheckIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/Button";
import { SparkMark } from "@/components/brand/Logo";
import { Globe } from "@/components/ui/globe";
import { org } from "@/content/org";
import { cta } from "@/content/ctas";
import { programs } from "@/content/programs";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="reveal">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
            <SparkMark className="h-4 w-4" />
            Creative nonprofit · {org.locations[0]}
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
              <ArrowRightIcon className="h-5 w-5" weight="bold" aria-hidden="true" />
            </Button>
            <Button href={cta.explorePrograms.href} size="lg" variant="outline">
              {cta.explorePrograms.label}
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-faint">
            <ShieldCheckIcon className="h-4 w-4 text-accent" weight="duotone" aria-hidden="true" />
            {org.legalStatus} · EIN {org.ein}
          </p>
        </div>

        {/* Interactive globe: our Jacksonville ↔ Philippines ↔ Canada reach */}
        <div
          className="reveal relative mx-auto aspect-square w-full max-w-md"
          style={{ animationDelay: "120ms" }}
          aria-hidden="true"
        >
          <Globe />
        </div>
      </div>

      <p className="sr-only">
        SparkCreatives programs work together: {programs.map((p) => p.name).join(", ")}.
      </p>
    </section>
  );
}
