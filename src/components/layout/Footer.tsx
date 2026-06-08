import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { footerGroups } from "@/content/nav";
import { org } from "@/content/org";
import { cta } from "@/content/ctas";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const year = 2026; // build-time constant; avoids hydration drift.
  return (
    <footer className="mt-auto border-t border-border bg-surface-2 text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-ink-soft">{org.tagline}</p>
            <div className="mt-6 space-y-2 text-sm text-ink-soft">
              <p className="font-medium text-ink">
                {org.legalStatus}
              </p>
              <p>EIN {org.ein}</p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a className="hover:text-primary" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  {org.address.street}, {org.address.city}, {org.address.region}{" "}
                  {org.address.postalCode}
                </span>
              </p>
            </div>
            <div className="mt-6">
              <Button href={cta.donate.href} variant="accent">
                {cta.donate.label}
              </Button>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.heading}>
                <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
                  {group.heading}
                </h2>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={`${group.heading}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {org.name}. All rights reserved.
          </p>
          <p>
            Donations are tax-deductible to the extent allowed by law.{" "}
            <span className="italic">TODO: leadership confirm tax language.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
