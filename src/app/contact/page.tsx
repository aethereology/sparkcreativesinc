import type { Metadata } from "next";
import { Mail, MapPin, Lock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { org } from "@/content/org";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Questions, partnership ideas, donation inquiries, or volunteer interest — reach the SparkCreatives team.",
  path: "/contact",
});

type SearchParams = Promise<{ intent?: string }>;

const inquiryHelp = [
  "Donations and sponsorships",
  "Donating goods and materials",
  "Volunteering, individually or as a group",
  "Hosting a Spark Lab",
  "Corporate and community partnerships",
];

export default async function ContactPage(props: { searchParams: SearchParams }) {
  const { intent } = await props.searchParams;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Contact | SparkCreatives Inc",
            description:
              "Questions, partnership ideas, donation inquiries, or volunteer interest — reach the SparkCreatives team.",
            path: "/contact",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Contact"
        title="Contact SparkCreatives"
        lede="Have a question, partnership idea, donation inquiry, or volunteer interest? Reach out and the team will route you to the right next step."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="Send a message" title="We'd love to hear from you" />
            <div className="mt-6">
              <ContactForm defaultInquiry={intent} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-semibold">Reach us directly</h2>
              <ul className="mt-4 space-y-3 text-ink-soft">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <a className="hover:text-primary" href={`mailto:${org.email}`}>
                    {org.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    {org.address.street}
                    <br />
                    {org.address.city}, {org.address.region} {org.address.postalCode}
                  </span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-ink-faint italic">
                TODO: leadership confirm public contact details.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface-2 p-6">
              <h2 className="font-display text-lg font-semibold">We can help with</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {inquiryHelp.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      •
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <p className="flex items-start gap-2 text-sm text-ink-faint">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              We use your information only to respond to your message. We never sell your
              data. <span className="italic">TODO: leadership confirm privacy policy.</span>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
