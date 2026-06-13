import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/SectionWrapper";
import { JsonLd } from "@/components/JsonLd";
import { org } from "@/content/org";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How SparkCreatives collects, uses, and protects your information.",
  path: "/privacy",
});

const sections = [
  {
    heading: "What we collect",
    body: [
      "When you contact us, we collect the information you submit: your name, email address, and message details.",
      "When you donate, your payment is processed by Stripe. We receive your name, email address, donation amount, and designation — we never see or store your full card details.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "We use your information only to respond to your message, process your gift, send your donation receipt, and follow up about the work you supported.",
      "We never sell, rent, or trade your personal information.",
    ],
  },
  {
    heading: "Service providers",
    body: [
      "We rely on a small number of providers to operate this site: Stripe for secure donation processing and Resend for transactional email (such as donation receipts). Each receives only what it needs to do its job.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      `To update or delete information we hold about you, or to ask any privacy question, email us at ${org.email} and we'll take care of it.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Privacy Policy | SparkCreatives Inc",
            description: "How SparkCreatives collects, uses, and protects your information.",
            path: "/privacy",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        lede="We keep this simple: we collect only what we need to respond to you and process your gift, and we never sell your data."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="text-sm text-ink-faint">
            Last updated June 11, 2026. Questions? Email{" "}
            <a className="font-medium text-primary hover:underline" href={`mailto:${org.email}`}>
              {org.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
