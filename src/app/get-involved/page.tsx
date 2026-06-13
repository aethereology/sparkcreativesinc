import type { Metadata } from "next";
import {
  HandHeartIcon,
  PackageIcon,
  UsersIcon,
  BuildingsIcon,
  GraduationCapIcon,
  StackIcon,
} from "@phosphor-icons/react/ssr";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { FAQ, type FaqItem } from "@/components/content/FAQ";
import { CTASection } from "@/components/content/CTASection";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { cta, type Cta } from "@/content/ctas";
import { org } from "@/content/org";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Get Involved",
  description:
    "Donate, sponsor a Spark Box, give goods, volunteer, host a Spark Lab, or partner with us.",
  path: "/get-involved",
});

const paths = [
  { icon: HandHeartIcon, title: "Donate funds", body: "Give where you're needed most.", c: cta.donate },
  { icon: StackIcon, title: "Sponsor a Spark Box", body: "Put supplies directly into hands.", c: cta.sponsorBox },
  { icon: PackageIcon, title: "Donate goods", body: "Give useful materials and tools.", c: cta.donateGoodsInquiry },
  { icon: UsersIcon, title: "Volunteer", body: "Sort, pack, mentor, and host.", c: cta.volunteerInquiry },
  { icon: GraduationCapIcon, title: "Host a Spark Lab", body: "Bring a workshop to your group.", c: cta.hostLab },
  { icon: BuildingsIcon, title: "Partner with us", body: "Bring your organization in.", c: cta.partnershipInquiry },
];

// Suggested giving levels confirmed by leadership 2026-06-11.
const givingLevels = [
  { amount: 150, title: "Sponsor a Spark Box", body: "Supplies and creative tools, packed and delivered." },
  { amount: 200, title: "Support the Supply Network", body: "Keeps donated materials sorted, packed, and moving." },
  { amount: 300, title: "Support a Spark Lab", body: "Hands-on workshop learning with real materials." },
  { amount: 500, title: "Support a Spark Studio pathway", body: "Mentorship, leadership, and venture support." },
];

const faqs: FaqItem[] = [
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes. SparkCreatives Inc is a 501(c)(3) public charity (EIN 33-4477854), so donations are tax-deductible to the extent allowed by law. You'll receive a receipt by email for your records.",
  },
  {
    question: "What kinds of goods can I donate?",
    answer:
      "We accept useful supplies, school materials, and creative tools in good condition. Email ignite@sparkcreativesinc.org to tell us what you'd like to give, and we'll coordinate drop-off or pickup details with you.",
  },
  {
    question: "How do volunteers help?",
    answer:
      "Volunteers sort and pack donated materials, assist in hands-on Spark Labs, mentor in Spark Studio, and help run supply drives.",
  },
  {
    question: "Can my company partner with SparkCreatives?",
    answer:
      "Yes. Partners support the work through sponsorship, in-kind giving, volunteering, and co-programming. Reach out and we'll find the right fit.",
  },
];

function PathSection({
  id,
  icon: Icon,
  title,
  children,
  primary,
}: {
  id: string;
  icon: typeof UsersIcon;
  title: string;
  children: React.ReactNode;
  primary: Cta;
}) {
  return (
    <div id={id} className="scroll-mt-24 rounded-lg border border-border bg-surface p-7">
      <Icon className="h-7 w-7 text-primary" weight="duotone" aria-hidden="true" />
      <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
      <div className="mt-3 text-ink-soft">{children}</div>
      <div className="mt-5">
        <Button href={primary.href}>{primary.label}</Button>
      </div>
    </div>
  );
}

export default function GetInvolvedPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Get Involved | SparkCreatives Inc",
            description:
              "Donate, sponsor a Spark Box, give goods, volunteer, host a Spark Lab, or partner with us.",
            path: "/get-involved",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Get Involved", path: "/get-involved" },
          ]),
          faqSchema(faqs),
        ]}
      />

      <PageHeader
        eyebrow="Get Involved"
        title="There is more than one way to spark opportunity"
        lede="Your support can become a Spark Box, a workshop, a mentorship pathway, a supply drive, or a volunteer-powered day of action."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Get Involved", path: "/get-involved" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={cta.donate.href}>{cta.donate.label}</Button>
          <Button href="#paths" variant="outline">
            Choose your path
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper" id="paths">
        <SectionHeading eyebrow="Ways to help" title="Choose your path" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paths.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                className="flex flex-col rounded-lg border border-border bg-surface p-6"
              >
                <Icon className="h-7 w-7 text-primary" weight="duotone" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-ink-soft">{p.body}</p>
                <div className="mt-4">
                  <Button href={p.c.href} variant="outline" size="md">
                    {p.c.label}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Suggested giving"
          title="What your gift can support"
          lede="Suggested giving levels help connect your gift to real outcomes."
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {givingLevels.map((g) => (
            <li key={g.amount} className="rounded-lg border border-border bg-surface p-6">
              <p className="font-display text-3xl font-semibold text-accent">${g.amount}</p>
              <p className="mt-1 font-semibold text-ink">{g.title}</p>
              <p className="mt-2 text-sm text-ink-soft">{g.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-faint">
          These are suggested levels, not fixed prices — every gift of any size helps.
        </p>
        <div className="mt-6">
          <Button href={cta.donate.href}>Go to Donate</Button>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="The details" title="Donate goods, volunteer, or partner" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <PathSection id="donate-goods" icon={PackageIcon} title="Donate goods" primary={cta.donateGoodsInquiry}>
            Give useful supplies, school materials, and creative tools to the Spark Supply
            Network. Your goods get sorted, packed, and moved into programs.
          </PathSection>
          <PathSection id="volunteer" icon={UsersIcon} title="Volunteer" primary={cta.volunteerInquiry}>
            Join volunteer days to sort and pack materials, assist in Spark Labs, or mentor
            in Spark Studio. Roles welcome individuals and groups.
          </PathSection>
          <PathSection id="partner" icon={BuildingsIcon} title="Partner with us" primary={cta.partnershipInquiry}>
            Businesses and organizations can support through sponsorship, in-kind giving,
            employee volunteering, and co-programming.
          </PathSection>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Questions" title="Frequently asked" align="center" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQ items={faqs} />
        </div>
        <p className="mt-6 text-center text-sm text-ink-faint">
          Still have questions?{" "}
          <a className="font-medium text-primary hover:underline" href={`mailto:${org.email}`}>
            {org.email}
          </a>
        </p>
      </Section>

      <CTASection
        title="Spark something today"
        body="Pick the path that fits you — every one moves surplus toward opportunity."
        primary={cta.sponsorBox}
        secondary={cta.donate}
      />
    </>
  );
}
