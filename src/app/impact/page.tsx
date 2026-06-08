import type { Metadata } from "next";
import { Target, BarChart3, Scale, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { ImpactMetricCard } from "@/components/content/ImpactMetric";
import { CTASection } from "@/components/content/CTASection";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { impactMetrics } from "@/content/metrics";
import { programs } from "@/content/programs";
import { cta } from "@/content/ctas";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Impact",
  description: "See outputs, outcomes, equity, and goals.",
  path: "/impact",
});

const framework = [
  {
    icon: BarChart3,
    title: "Outputs",
    body: "What we deliver — boxes packed, Labs hosted, materials moved, hours given.",
  },
  {
    icon: Target,
    title: "Outcomes",
    body: "What changes — skills built, confidence gained, ventures and pathways started.",
  },
  {
    icon: Scale,
    title: "Equity",
    body: "Who we reach — making sure access reaches the families and communities who need it.",
  },
];

// 2026 goals carried from the current site. These are GOALS, not results.
// TODO: leadership confirm targets and remap legacy program names.
const goals2026 = [
  { value: "240", label: "Spark Boxes shipped" },
  { value: "45", label: "Spark Labs / learning graduates" },
  { value: "30", label: "Spark Studio ventures launched" },
  { value: "200", label: "Volunteers engaged" },
];

export default function ImpactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Impact | SparkCreatives Inc",
            description: "See outputs, outcomes, equity, and goals.",
            path: "/impact",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Impact", path: "/impact" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Impact"
        title="Measuring what we deliver, what changes, and who we reach"
        lede="SparkCreatives tracks outputs, outcomes, and equity across every part of the program ecosystem so supporters can see how resources move from donation to opportunity."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Impact", path: "/impact" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={cta.donate.href}>{cta.donate.label}</Button>
          <Button href="/programs" variant="outline">
            View Programs
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Impact snapshot"
          title="Our work to date"
          lede="A transparent snapshot. We carry figures from our current site and re-verify them before publishing."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((m) => (
            <ImpactMetricCard key={m.label} metric={m} />
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-faint italic">
          TODO: leadership confirm all metrics, methodology, and dates before launch.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How we measure"
          title="Outputs, outcomes, and equity"
          lede="Three lenses keep us honest about both activity and real change."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {framework.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.title} className="rounded-lg border border-border bg-surface p-6">
                <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-ink-soft">{f.body}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="By program"
          title="What each program tracks"
          lede="Every program reports the measures that matter for its role in the ecosystem."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {programs.map((p) => (
            <li key={p.slug} className="rounded-lg border border-border bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  {p.role}
                </span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.metrics.map((m) => (
                  <li
                    key={m}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-ink-soft"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Looking ahead"
          title="2026 goals"
          lede="These are targets we are working toward — not current results."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {goals2026.map((g) => (
            <li key={g.label} className="rounded-lg border border-dashed border-border bg-paper p-6">
              <p className="font-display text-4xl font-semibold text-accent">{g.value}</p>
              <p className="mt-1 font-semibold text-ink">{g.label}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-ink-faint">2026 goal</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-faint italic">
          TODO: leadership confirm 2026 targets and program mapping.
        </p>
      </Section>

      <Section tone="paper">
        <div className="flex flex-col items-start gap-4 rounded-lg border border-border bg-surface-2 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-0.5 h-8 w-8 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <h2 className="font-display text-xl font-semibold">Built on transparency</h2>
              <p className="mt-1 text-ink-soft">
                See our 501(c)(3) status, governance, and financial accountability.
              </p>
            </div>
          </div>
          <Button href="/about#governance" variant="outline">
            Financials &amp; Governance
          </Button>
        </div>
      </Section>

      <CTASection
        title="Move resources from donation to opportunity"
        body="Your gift becomes measurable access, learning, and growth."
        primary={cta.sponsorBox}
        secondary={cta.donate}
      />
    </>
  );
}
