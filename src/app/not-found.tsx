import Link from "next/link";
import { Section } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { SparkMark } from "@/components/brand/Logo";
import { programs } from "@/content/programs";

export default function NotFound() {
  return (
    <Section tone="paper" className="text-center">
      <div className="mx-auto max-w-xl">
        <SparkMark className="mx-auto h-12 w-12" />
        <p className="mt-6 font-display text-6xl font-semibold text-primary">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">This page wandered off</h1>
        <p className="mt-3 text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/programs" variant="outline">
            Explore programs
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {programs.map((p) => (
            <li key={p.slug}>
              <Link href={`/programs/${p.slug}`} className="text-primary hover:underline">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
