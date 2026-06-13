import type { Metadata } from "next";
import { PackageIcon, FlaskIcon, PlantIcon, RecycleIcon, ShieldCheckIcon } from "@phosphor-icons/react/ssr";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/SectionWrapper";
import { DonationForm } from "@/components/forms/DonationForm";
import { JsonLd } from "@/components/JsonLd";
import { org } from "@/content/org";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Donate",
  description: "Make a tax-deductible gift to help turn surplus into opportunity.",
  path: "/donate",
});

type SearchParams = Promise<{ designation?: string; canceled?: string }>;

const giftUses = [
  { icon: PackageIcon, label: "Pack and deliver Spark Boxes of supplies" },
  { icon: FlaskIcon, label: "Host hands-on Spark Labs" },
  { icon: PlantIcon, label: "Support mentorship and creative pathways in Spark Studio" },
  { icon: RecycleIcon, label: "Keep useful materials moving through the Supply Network" },
];

export default async function DonatePage(props: { searchParams: SearchParams }) {
  const { designation, canceled } = await props.searchParams;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Donate | SparkCreatives Inc",
            description: "Make a tax-deductible gift to help turn surplus into opportunity.",
            path: "/donate",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Donate", path: "/donate" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Donate"
        title="Your gift turns surplus into opportunity"
        lede="Every donation helps SparkCreatives collect supplies, pack Spark Boxes, host hands-on Labs, support emerging creatives, and keep useful materials moving into communities."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Donate", path: "/donate" },
        ]}
      />

      <Section tone="paper">
        {canceled ? (
          <p
            role="status"
            className="mx-auto mb-8 max-w-5xl rounded-md border border-border bg-muted px-4 py-3 text-sm text-ink"
          >
            Your checkout was canceled — no charge was made. You can try again whenever
            you&apos;re ready.
          </p>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow="Make a gift" title="Choose your donation" />
            <div className="mt-6">
              <DonationForm initialDesignation={designation} />
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Where your gift goes" title="Your impact" />
            <ul className="mt-6 space-y-3">
              {giftUses.map((u) => {
                const Icon = u.icon;
                return (
                  <li
                    key={u.label}
                    className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" weight="duotone" aria-hidden="true" />
                    <span className="text-ink-soft">{u.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-surface-2 p-5">
              <ShieldCheckIcon className="mt-0.5 h-6 w-6 shrink-0 text-accent" weight="duotone" aria-hidden="true" />
              <div className="text-sm text-ink-soft">
                <p className="font-semibold text-ink">{org.legalStatus}</p>
                <p>EIN {org.ein}</p>
                <p className="mt-2">
                  Donations are tax-deductible to the extent allowed by law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
