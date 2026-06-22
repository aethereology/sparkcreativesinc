import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { ProgramCircuit } from "@/components/content/ProgramCircuit";
import { ProgramHoverExpand } from "@/components/content/ProgramHoverExpand";
import { GetInvolvedCarousel } from "@/components/content/GetInvolvedCarousel";
import { CTASection } from "@/components/content/CTASection";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { programs } from "@/content/programs";
import { cta } from "@/content/ctas";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, programListSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Programs",
  description:
    "Explore Spark Boxes, Spark Labs, Spark Studio, and Spark Supply Network.",
  path: "/programs",
});

export default function ProgramsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Programs | SparkCreatives Inc",
            description:
              "Explore Spark Boxes, Spark Labs, Spark Studio, and Spark Supply Network.",
            path: "/programs",
          }),
          programListSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Programs"
        title="Programs that turn surplus into opportunity"
        lede="Our programs work together as one ecosystem: Spark Supply Network gathers resources, Spark Boxes create access, Spark Labs turn materials into learning, and Spark Studio supports deeper growth."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={cta.sponsorBox.href}>{cta.sponsorBox.label}</Button>
          <Button href={cta.partner.href} variant="outline">
            {cta.partner.label}
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <SectionHeading align="center" eyebrow="The ecosystem" title="How the programs connect" />
        <div className="mt-10">
          <ProgramCircuit />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Four programs"
          title="Explore each program"
          lede="Hover or focus a panel to expand it, then select it to see the full program."
        />
        <div className="mt-10">
          <ProgramHoverExpand />
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who we serve" title="People at the center" />
            <ul className="mt-6 space-y-4">
              {programs.map((p) => (
                <li key={p.slug} className="rounded-lg border border-border bg-surface p-5">
                  <p className="font-display font-semibold text-ink">{p.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{p.whoItServes}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Outcomes" title="What we work toward" />
            <ul className="mt-6 space-y-4">
              {programs.map((p) => (
                <li key={p.slug} className="rounded-lg border border-border bg-surface p-5">
                  <p className="font-display font-semibold text-ink">{p.name}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                    {p.outcomes.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading align="center" eyebrow="Get involved" title="Find your way in" />
        <div className="mt-10">
          <GetInvolvedCarousel />
        </div>
      </Section>

      <CTASection
        title="Put supplies in someone's hands"
        body="Sponsor a Spark Box and start the chain that turns surplus into opportunity."
        primary={cta.sponsorBox}
        secondary={cta.donate}
      />
    </>
  );
}
