import type { Metadata } from "next";
import { Building2, HeartHandshake, Compass, FileText, Mail } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { CTASection } from "@/components/content/CTASection";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { org } from "@/content/org";
import { cta } from "@/content/ctas";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "SparkCreatives turns surplus into opportunity — creative empowerment as economic empowerment.",
  path: "/about",
});

// Leadership is intentionally not invented. Replace with confirmed people.
const leadership = [
  { name: "TODO: leadership confirm", role: "Founder & Executive Director" },
  { name: "TODO: leadership confirm", role: "Programs Lead" },
  { name: "TODO: leadership confirm", role: "Operations & Impact" },
];

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

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-7">
            <Compass className="h-7 w-7 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold">Our mission</h2>
            <p className="mt-3 text-ink-soft">
              Turn surplus into opportunity. We transform donated goods and creative
              materials into hands-on programs that help young people, families, and
              emerging creatives build confidence, skills, leadership, and sustainable
              pathways forward.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-7">
            <HeartHandshake className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold">Our vision</h2>
            <p className="mt-3 text-ink-soft">
              Communities where useful resources are never wasted and everyone has access
              to the supplies, learning, and mentorship they need to create, lead, and
              build a future of their own.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
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
          <p className="text-base italic text-ink-faint">
            TODO: leadership confirm founding date, milestones, and story details.
          </p>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Leadership"
          title="The people behind the work"
          lede="Our team and board guide the programs and stewardship of every gift."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {leadership.map((person, i) => (
            <li key={i} className="rounded-lg border border-border bg-surface p-6">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full bg-muted font-display text-xl font-semibold text-ink-faint"
                aria-hidden="true"
              >
                ★
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-ink">{person.name}</p>
              <p className="text-sm text-ink-soft">{person.role}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-faint italic">
          TODO: leadership confirm names, titles, bios, and photos before launch.
        </p>
      </Section>

      <Section tone="muted" id="operations">
        <div className="flex items-start gap-4 scroll-mt-24 rounded-lg border border-border bg-surface p-7">
          <Building2 className="mt-0.5 h-7 w-7 shrink-0 text-ink-faint" aria-hidden="true" />
          <div>
            <h2 className="font-display text-xl font-semibold">Operations &amp; infrastructure</h2>
            <p className="mt-2 text-ink-soft">
              Behind the public programs, Aethelo serves as our internal operations and
              impact infrastructure — the systems that help us track resources, measure
              outcomes, and run the ecosystem responsibly. It is not a public-facing
              program.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper" id="governance">
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
            <p className="mt-3 text-xs text-ink-faint italic">TODO: leadership confirm.</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <FileText className="h-6 w-6 text-accent" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-semibold">Documents &amp; reporting</h3>
            <p className="mt-2 text-ink-soft">
              Annual reports, financial statements, and governance documents will be posted
              here.
            </p>
            <p className="mt-3 text-xs text-ink-faint italic">
              TODO: leadership add governance documents and links.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button href={cta.contact.href} variant="outline">
            <Mail className="h-4 w-4" aria-hidden="true" />
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
