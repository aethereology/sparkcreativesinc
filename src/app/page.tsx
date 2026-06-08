import type { Metadata } from "next";
import { Hero } from "@/components/content/Hero";
import { TrustStrip } from "@/components/content/TrustStrip";
import { ProcessFlow } from "@/components/content/ProcessFlow";
import { ProgramCard } from "@/components/content/ProgramCard";
import { EcosystemFlow } from "@/components/content/EcosystemFlow";
import { ImpactMetricCard } from "@/components/content/ImpactMetric";
import { AudienceRoutes } from "@/components/content/AudienceRoutes";
import { CTASection } from "@/components/content/CTASection";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { programs } from "@/content/programs";
import { impactMetrics, hasUnconfirmedMetrics } from "@/content/metrics";
import { cta } from "@/content/ctas";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, programListSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "SparkCreatives Inc — Turning Surplus Into Opportunity",
  description:
    "Transforming donated goods and creative materials into programs that support people and communities.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "SparkCreatives Inc — Turning Surplus Into Opportunity",
            description:
              "Transforming donated goods and creative materials into programs that support people and communities.",
            path: "/",
          }),
          programListSchema(),
        ]}
      />

      <Hero />
      <TrustStrip />

      <Section tone="paper">
        <SectionHeading
          eyebrow="How it works"
          title="From surplus to opportunity, step by step"
          lede="Donated goods and funds become tangible programs people can use, learn from, and grow with."
        />
        <div className="mt-12">
          <ProcessFlow />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Programs"
          title="Four programs, one ecosystem"
          lede="Each program plays a distinct role — and they hand off to one another."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
        <div className="mt-6">
          <Button href="/programs" variant="ghost">
            See how the programs connect →
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          align="center"
          eyebrow="The ecosystem"
          title="Programs that work together"
        />
        <div className="mt-10">
          <EcosystemFlow />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Impact snapshot"
          title="What we've done so far"
          lede="A snapshot of our work to date. We report honestly and confirm figures before we publish them."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((m) => (
            <ImpactMetricCard key={m.label} metric={m} />
          ))}
        </div>
        {hasUnconfirmedMetrics ? (
          <p className="mt-6 text-sm text-ink-faint">
            Figures reflect our current site and are being re-verified.{" "}
            <span className="italic">TODO: leadership confirm metrics before launch.</span>
          </p>
        ) : null}
        <div className="mt-8">
          <Button href="/impact" variant="outline">
            See our full impact
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          align="center"
          eyebrow="Get involved"
          title="Find your way in"
          lede="However you want to help, there's a clear next step."
        />
        <div className="mt-10">
          <AudienceRoutes />
        </div>
      </Section>

      <CTASection
        title="Help turn surplus into opportunity"
        body="Your support puts supplies, learning, and mentorship directly into the hands of people who can build from them."
        primary={cta.sponsorBox}
        secondary={cta.donate}
      />
    </>
  );
}
