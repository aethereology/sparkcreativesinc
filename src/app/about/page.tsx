import type { Metadata } from "next";
import {
  BuildingsIcon,
  HandHeartIcon,
  CompassIcon,
  FileTextIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/ssr";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { CTASection } from "@/components/content/CTASection";
import { LeadershipCarousel } from "@/components/content/LeadershipCarousel";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { org } from "@/content/org";
import { cta } from "@/content/ctas";
import { leadership } from "@/content/leadership";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "SparkCreatives turns surplus into opportunity — creative empowerment as economic empowerment.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "About | SparkCreatives Inc",
            description:
              "SparkCreatives turns surplus into opportunity — creative empowerment as economic empowerment.",
            path: "/about",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="About"
        title="Creative empowerment is economic empowerment"
        lede="SparkCreatives was founded on the belief that useful supplies, creative tools, and hands-on support can help people build confidence, skills, and pathways toward opportunity."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/programs">Explore Programs</Button>
          <Button href={cta.donate.href} variant="outline">
            Get Involved
          </Button>
        </div>
      </PageHeader>

      <Section tone="transparent">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-7">
            <CompassIcon className="h-7 w-7 text-primary" weight="duotone" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold">Our mission</h2>
            <p className="mt-3 text-ink-soft">
              Turn surplus into opportunity. We transform donated goods and creative
              materials into hands-on programs that help young people, families, and
              emerging creatives build confidence, skills, leadership, and sustainable
              pathways forward.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-7">
            <HandHeartIcon className="h-7 w-7 text-accent" weight="duotone" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold">Our vision</h2>
            <p className="mt-3 text-ink-soft">
              Communities where useful resources are never wasted and everyone has access
              to the supplies, learning, and mentorship they need to create, lead, and
              build a future of their own.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="transparent">
        <SectionHeading
          eyebrow="Our story"
          title="From grassroots support to a program ecosystem"
        />
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-ink-soft">
          <p>
            SparkCreatives began with a simple practice: gather useful surplus and get it
            directly into the hands of people who could use it. Volunteers in{" "}
            {org.locations[0]} packed boxes of supplies and creative tools and connected
            them with families and communities — including family and community support in{" "}
            {org.locations[1]}.
          </p>
          <p>
            As the work grew, a clear ecosystem emerged. Donated materials flow through the
            Spark Supply Network, become tangible access through Spark Boxes, turn into
            hands-on learning in Spark Labs, and open into mentorship and venture pathways
            in Spark Studio.
          </p>
        </div>
      </Section>

      <Section tone="transparent">
        <SectionHeading
          eyebrow="Leadership"
          title="The people behind the work"
          lede="Our team and board guide the programs and stewardship of every gift."
        />
        <LeadershipCarousel people={leadership} className="mt-10" />
      </Section>

      <Section tone="transparent" id="operations">
        <div className="flex items-start gap-4 scroll-mt-24 rounded-lg border border-border bg-surface p-7">
          <BuildingsIcon className="mt-0.5 h-7 w-7 shrink-0 text-ink-faint" weight="duotone" aria-hidden="true" />
          <div>
            <h2 className="font-display text-xl font-semibold">Operations &amp; infrastructure</h2>
            <p className="mt-2 text-ink-soft">
              Behind the public programs,{" "}
              <a
                href={org.aetheloUrl}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Aethelo
              </a>{" "}
              serves as our internal operations and impact infrastructure — the systems
              that help us track resources, measure outcomes, and run the ecosystem
              responsibly. It is not a public-facing program.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="transparent" id="governance">
        <SectionHeading
          eyebrow="Transparency"
          title="Financials &amp; governance"
          lede="We are committed to honest reporting and responsible stewardship of every gift."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-display text-lg font-semibold">501(c)(3) status</h3>
            <p className="mt-2 text-ink-soft">
              {org.name} is a {org.legalStatus}.
            </p>
            <dl className="mt-4 space-y-1 text-sm text-ink-soft">
              <div className="flex gap-2">
                <dt className="font-medium text-ink">EIN:</dt>
                <dd>{org.ein}</dd>
              </div>
            </dl>
            <a
              href={org.candidProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${org.name} Candid profile with Platinum Transparency seal`}
              className="mt-4 inline-block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external Candid seal SVG */}
              <img
                alt="Candid Platinum Transparency 2026 seal"
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/16338045/svg"
                width={100}
                height={100}
                loading="lazy"
              />
            </a>
            <p className="mt-2 text-sm text-ink-soft">
              We hold a 2026 Platinum Transparency Seal from Candid.{" "}
              <a
                href={org.candidProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                View our Candid profile
              </a>
              .
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <FileTextIcon className="h-6 w-6 text-accent" weight="duotone" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-semibold">Documents &amp; reporting</h3>
            <ul className="mt-3 space-y-2 text-ink-soft">
              <li>
                <a
                  href="/docs/irs-determination-letter.pdf"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  IRS 501(c)(3) determination letter (PDF)
                </a>
              </li>
              <li>
                <a
                  href="/docs/fdacs-compliance-letter.pdf"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  FDACS charitable registration compliance letter (PDF)
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm text-ink-soft">
              Annual reports and financial statements will be posted here as they become
              available.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button href={cta.contact.href} variant="outline">
            <EnvelopeSimpleIcon className="h-4 w-4" weight="bold" aria-hidden="true" />
            Request more information
          </Button>
        </div>
      </Section>

      <CTASection
        title="Be part of the work"
        body="Sponsor a Spark Box, give to the programs, or get involved in another way."
        primary={cta.sponsorBox}
        secondary={cta.donate}
      />
    </>
  );
}
