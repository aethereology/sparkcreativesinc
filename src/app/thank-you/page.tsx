import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { org } from "@/content/org";
import { cta } from "@/content/ctas";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for supporting SparkCreatives.",
  robots: { index: false, follow: true },
};

type SearchParams = Promise<{ type?: string }>;

export default async function ThankYouPage(props: { searchParams: SearchParams }) {
  const { type } = await props.searchParams;
  const isDonation = type === "donation";
  const isMessage = type === "message";

  const heading = isDonation
    ? "Thank you for your gift"
    : isMessage
      ? "Thanks — your message is on its way"
      : "Thank you";

  const body = isDonation
    ? "Your donation helps turn surplus into opportunity. A receipt will be on its way to your email."
    : isMessage
      ? "We've received your message and will route it to the right person. We'll be in touch soon."
      : "We appreciate your support of SparkCreatives.";

  return (
    <Section tone="paper" className="text-center">
      <div className="mx-auto max-w-xl">
        <CheckCircle2 className="mx-auto h-14 w-14 text-accent" aria-hidden="true" />
        <h1 className="mt-6 font-display text-4xl font-semibold">{heading}</h1>
        <p className="mt-4 text-lg text-ink-soft">{body}</p>
        {isDonation ? (
          <p className="mt-2 text-sm text-ink-faint italic">
            TODO: leadership confirm receipt and tax-acknowledgment language.
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/programs" variant="outline">
            Explore programs
          </Button>
        </div>

        <p className="mt-10 text-sm text-ink-faint">
          Questions?{" "}
          <a className="font-medium text-primary hover:underline" href={`mailto:${org.email}`}>
            {org.email}
          </a>
          {" · "}
          <a className="font-medium text-primary hover:underline" href={cta.contact.href}>
            Contact us
          </a>
        </p>
      </div>
    </Section>
  );
}
