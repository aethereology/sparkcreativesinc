import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/ssr";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { ProgramIcon } from "@/components/content/ProgramIcon";
import { CTASection } from "@/components/content/CTASection";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { programs, getProgram } from "@/content/programs";
import { cta } from "@/content/ctas";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema, webPageSchema, breadcrumbSchema } from "@/lib/schema";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params;
  const program = getProgram(slug);
  if (!program) return {};
  return pageMetadata({
    title: program.name,
    description: program.shortDescription,
    path: `/programs/${program.slug}`,
  });
}

export default async function ProgramPage(props: { params: Params }) {
  const { slug } = await props.params;
  const program = getProgram(slug);
  if (!program) notFound();

  const related = programs.filter((p) => p.slug !== program.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(program),
          webPageSchema({
            title: `${program.name} | SparkCreatives Inc`,
            description: program.shortDescription,
            path: `/programs/${program.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
            { name: program.name, path: `/programs/${program.slug}` },
          ]),
        ]}
      />

      <PageHeader
        eyebrow={`${program.role} · Program`}
        title={program.name}
        lede={program.pillarLine}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
          { name: program.name, path: `/programs/${program.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={program.primaryCta.href}>{program.primaryCta.label}</Button>
          <Button href={cta.donate.href} variant="outline">
            {cta.donate.label}
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span
              className={
                "inline-flex h-14 w-14 items-center justify-center rounded-lg " +
                (program.theme === "primary"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/10 text-accent")
              }
            >
              <ProgramIcon name={program.iconName} className="h-7 w-7" />
            </span>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {program.longDescription}
            </p>

            <h2 className="mt-10 font-display text-2xl font-semibold">Who it serves</h2>
            <p className="mt-3 text-ink-soft">{program.whoItServes}</p>

            <h2 className="mt-10 font-display text-2xl font-semibold">How it works</h2>
            <ol className="mt-4 space-y-3">
              {program.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
                    {i + 1}
                  </span>
                  <span className="text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 font-display text-2xl font-semibold">Outcomes we work toward</h2>
            <ul className="mt-4 space-y-2">
              {program.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5 text-ink-soft">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" weight="bold" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar: metrics + ways to help + legacy note */}
          <aside className="space-y-6">
            <div className="rounded-lg border border-border bg-surface-2 p-6">
              <h2 className="font-display text-lg font-semibold">What we measure</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                {program.metrics.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      •
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-semibold">Ways to help</h2>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button href={program.primaryCta.href} className="w-full">
                  {program.primaryCta.label}
                </Button>
                {program.secondaryCtas.map((c) => (
                  <Button key={c.label} href={c.href} variant="outline" className="w-full">
                    {c.label}
                  </Button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Explore more" title="Other programs" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/programs/${p.slug}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4 transition-shadow hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <ProgramIcon
                    name={p.iconName}
                    className={p.theme === "primary" ? "h-5 w-5 text-primary" : "h-5 w-5 text-accent"}
                  />
                  <span className="font-medium text-ink">{p.name}</span>
                </span>
                <ArrowRightIcon
                  className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5"
                  weight="bold"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection
        title={program.primaryCta.label}
        body={program.longDescription}
        primary={program.primaryCta}
        secondary={cta.donate}
      />
    </>
  );
}
