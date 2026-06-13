import Link from "next/link";
import {
  HandHeartIcon,
  PackageIcon,
  UsersIcon,
  BuildingsIcon,
} from "@phosphor-icons/react/ssr";
import { AnimatedArrow } from "@/components/ui/animated-arrow";
import { cta } from "@/content/ctas";

const routes = [
  {
    icon: HandHeartIcon,
    title: "Donate funds",
    body: "Sponsor a Spark Box or give to the program where you're needed most.",
    href: cta.donate.href,
    label: cta.donate.label,
  },
  {
    icon: PackageIcon,
    title: "Donate goods",
    body: "Give useful supplies, materials, and creative tools to the Supply Network.",
    href: cta.donateGoods.href,
    label: cta.donateGoods.label,
  },
  {
    icon: UsersIcon,
    title: "Volunteer",
    body: "Help sort, pack, mentor, and run hands-on Spark Labs.",
    href: cta.volunteer.href,
    label: cta.volunteer.label,
  },
  {
    icon: BuildingsIcon,
    title: "Partner",
    body: "Bring your business or organization into the work as a partner.",
    href: cta.partner.href,
    label: cta.partner.label,
  },
];

export function AudienceRoutes() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {routes.map((r) => {
        const Icon = r.icon;
        return (
          <li key={r.title}>
            <Link
              href={r.href}
              className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-shadow hover:shadow-md"
            >
              <Icon className="h-7 w-7 text-primary" weight="duotone" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{r.title}</h3>
              <p className="mt-1.5 flex-1 text-sm text-ink-soft">{r.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5">
                {r.label}
                <AnimatedArrow />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
