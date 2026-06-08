import type { Metadata } from "next";
import {
  HeartHandshake,
  PackageOpen,
  Users,
  Building2,
  GraduationCap,
  Boxes,
} from "lucide-react";
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
  { icon: HeartHandshake, title: "Donate funds", body: "Give where you're needed most.", c: cta.donate },
  { icon: Boxes, title: "Sponsor a Spark Box", body: "Put supplies directly into hands.", c: cta.sponsorBox },
  { icon: PackageOpen, title: "Donate goods", body: "Give useful materials and tools.", c: cta.donateGoods },
  { icon: Users, title: "Volunteer", body: "Sort, pack, mentor, and host.", c: cta.volunteer },
  { icon: GraduationCap, title: "Host a Spark Lab", body: "Bring a workshop to your group.", c: cta.hostLab },
  { icon: Building2, title: "Partner with us", body: "Bring your organization in.", c: cta.partner },
];

const faqs: FaqItem[] = [
  {
    question: "Is my donation tax-deductible?",
    answer:
      "SparkCreatives is a 501(c)(3) public charity, so donations are tax-deductible to the extent allowed by law. TODO: leadership confirm final tax language.",
  },
  {
    question: "What kinds of goods can I donate?",
    answer:
      "We accept useful supplies, school materials, and creative tools in good condition. TODO: leadership confirm the accepted-items list and drop-off details.",
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
  icon: typeof Users;
  title: string;
  children: React.ReactNode;
  primary: Cta;
}) {
  return (
    <div id={id} className="scroll-mt-24 rounded-lg border border-border bg-surface p-7">
      <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
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
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
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
        <div className="mt-8 rounded-lg border border-dashed border-border bg-paper p-7">
          <p className="text-ink-soft">
            Suggested giving levels — for example, the cost to sponsor a Spark Box, fund a
            workshop seat, or support a creative pathway — will appear here once confirmed.
          </p>
          <p className="mt-3 text-sm text-ink-faint italic">
            TODO: leadership confirm donation amounts before launch.
          </p>
          <div className="mt-5">
            <Button href={cta.donate.href}>Go to Donate</Button>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="The details" title="Donate goods, volunteer, or partner" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <PathSection id="donate-goods" icon={PackageOpen} title="Donate goods" primary={cta.donateGoods}>
            Give useful supplies, school materials, and creative tools to the Spark Supply
            Network. Your goods get sorted, packed, and moved into programs.
          </PathSection>
          <PathSection id="volunteer" icon={Users} title="Volunteer" primary={cta.volunteer}>
            Join volunteer days to sort and pack materials, assist in Spark Labs, or mentor
            in Spark Studio. Roles welcome individuals and groups.
          </PathSection>
          <PathSection id="partner" icon={Building2} title="Partner with us" primary={cta.partner}>
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
