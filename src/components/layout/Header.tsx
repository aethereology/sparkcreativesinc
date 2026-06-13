"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import {
  CaretDownIcon,
  ArrowUpRightIcon,
  ArrowRightIcon,
  HeartIcon,
  GiftIcon,
  HandshakeIcon,
  UsersThreeIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";
import type { IconProps } from "@phosphor-icons/react";
import { mainNav, type NavItem } from "@/content/nav";
import { cta } from "@/content/ctas";
import { programs } from "@/content/programs";
import { Logo } from "@/components/brand/Logo";
import { ProgramIcon } from "@/components/content/ProgramIcon";
import { AnimatedMenu } from "@/components/ui/animated-icons";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(path + "/");
}

/** Ways-to-help config that powers the Get Involved panel + mobile accordion. */
type HelpItem = { label: string; href: string; hint: string; Icon: ComponentType<IconProps> };
const helpWays: HelpItem[] = [
  { label: "Donate Funds", href: "/donate", hint: "Fund Spark Boxes, learning, and creative pathways.", Icon: HeartIcon },
  { label: "Donate Goods", href: "/get-involved#donate-goods", hint: "Send surplus materials, supplies, and creative tools.", Icon: GiftIcon },
  { label: "Volunteer", href: "/get-involved#volunteer", hint: "Sort, pack, mentor, and help run programs.", Icon: UsersThreeIcon },
  { label: "Partner With Us", href: "/get-involved#partner", hint: "Bring SparkCreatives to your school or community.", Icon: HandshakeIcon },
];
const helpMore: { label: string; href: string }[] = [
  { label: "Contact", href: "/contact" },
  { label: "Financials & Governance", href: "/about#governance" },
  { label: "Our Impact", href: "/impact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileEnter, setMobileEnter] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [accordion, setAccordion] = useState<string | null>(null);

  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  // Escape closes everything.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll + trigger the slide-in while the mobile drawer is open.
  // (mobileEnter is reset to false in the open handler, not here, to avoid
  // calling setState synchronously inside an effect.)
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setMobileEnter(true));
    return () => {
      document.body.style.overflow = prev;
      cancelAnimationFrame(raf);
    };
  }, [mobileOpen]);

  const openMobile = () => {
    setMobileEnter(false);
    setMobileOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl justify-center">
        {/* Relative anchor so the full-width island can position under the pill. */}
        <div
          className="relative w-full max-w-5xl"
          onMouseLeave={() => setOpenMenu(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
          }}
        >
          {/* Floating pill */}
          <div className="flex h-16 items-center justify-between gap-2 rounded-full border border-border bg-surface/90 pr-3 pl-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-surface/75">
            <Logo />

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) =>
                  item.children ? (
                    <li key={item.label} onMouseEnter={() => setOpenMenu(item.label)}>
                      <button
                        type="button"
                        aria-expanded={openMenu === item.label}
                        aria-haspopup="true"
                        onFocus={() => setOpenMenu(item.label)}
                        onClick={() =>
                          setOpenMenu((cur) => (cur === item.label ? null : item.label))
                        }
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          openMenu === item.label
                            ? "bg-muted text-ink"
                            : "text-ink-soft hover:bg-muted/60 hover:text-ink",
                        )}
                      >
                        {item.label}
                        <CaretDownIcon
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            openMenu === item.label && "rotate-180",
                          )}
                          weight="bold"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ) : (
                    <li key={item.label} onMouseEnter={() => setOpenMenu(null)}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        onFocus={() => setOpenMenu(null)}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className={cn(
                          "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/60 hover:text-ink",
                          isActive(pathname, item.href) ? "text-ink" : "text-ink-soft",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                href={cta.donate.href}
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-muted/60 hover:text-ink md:inline-flex"
              >
                {cta.donate.label}
              </Link>
              <Link
                href={cta.sponsorBox.href}
                className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover md:inline-flex"
              >
                {cta.sponsorBox.label}
              </Link>

              {/* Mobile toggle */}
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-muted lg:hidden"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => (mobileOpen ? setMobileOpen(false) : openMobile())}
              >
                <AnimatedMenu open={mobileOpen} />
              </button>
            </div>
          </div>

          {/* Full-width island mega-menu (one per item with children). Flush to the
              pill bottom so there is no hover gap; only one is visible at a time. */}
          {mainNav
            .filter((i) => i.children)
            .map((item) => (
              <div
                key={item.label}
                role="region"
                aria-label={item.label}
                className={cn(
                  "absolute left-1/2 top-full z-50 hidden w-full -translate-x-1/2 pt-3 lg:block",
                  openMenu === item.label
                    ? "visible opacity-100"
                    : "invisible pointer-events-none opacity-0",
                )}
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl transition-all duration-200 ease-out",
                    openMenu === item.label ? "translate-y-0" : "-translate-y-2",
                  )}
                >
                  <MegaPanel item={item} onNavigate={closeAll} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="lg:hidden" role="dialog" aria-modal="true" id="mobile-menu">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            className={cn(
              "fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300",
              mobileEnter ? "opacity-100" : "opacity-0",
            )}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={cn(
              "fixed right-0 top-0 z-50 flex h-full w-[320px] max-w-[88vw] flex-col gap-6 overflow-y-auto bg-surface p-6 shadow-2xl transition-transform duration-300 ease-out",
              mobileEnter ? "translate-x-0" : "translate-x-full",
            )}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                <XIcon className="h-5 w-5" weight="bold" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col">
              {mainNav.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-border">
                    <button
                      type="button"
                      aria-expanded={accordion === item.label}
                      onClick={() =>
                        setAccordion((cur) => (cur === item.label ? null : item.label))
                      }
                      className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-ink"
                    >
                      {item.label}
                      <CaretDownIcon
                        className={cn(
                          "h-4 w-4 text-ink-soft transition-transform duration-200",
                          accordion === item.label && "rotate-180",
                        )}
                        weight="bold"
                        aria-hidden="true"
                      />
                    </button>
                    {accordion === item.label ? (
                      <ul className="mb-3 ml-1 flex flex-col gap-2.5 border-l border-border pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              className="block text-sm font-medium tracking-tight text-ink-soft hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeAll}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="border-b border-border py-3.5 text-base font-semibold text-ink"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="mt-auto flex flex-col gap-2.5">
              <Link
                href={cta.sponsorBox.href}
                onClick={closeAll}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm hover:bg-primary-hover"
              >
                {cta.sponsorBox.label}
              </Link>
              <Link
                href={cta.donate.href}
                onClick={closeAll}
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-ink/15 px-5 py-3 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
              >
                {cta.donate.label}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** A featured CTA card occupying the last column of a mega-menu. */
function FeaturedCard({
  badge,
  title,
  body,
  cta: ctaLink,
  onNavigate,
}: {
  badge: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  onNavigate: () => void;
}) {
  return (
    <Link
      href={ctaLink.href}
      onClick={onNavigate}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-muted p-5 ring-1 ring-border transition-all hover:ring-primary/50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <span className="mb-3 inline-flex rounded-full border border-primary/40 bg-surface px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
          {badge}
        </span>
        <h4 className="mb-1.5 text-sm font-semibold text-ink">{title}</h4>
        <p className="text-sm leading-snug tracking-tight text-ink-soft">{body}</p>
      </div>
      <span className="relative mt-4 inline-flex items-center text-sm font-semibold text-primary">
        {ctaLink.label}
        <ArrowUpRightIcon
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          weight="bold"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/** Inner content of a mega-menu island, branched by nav item. */
function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (item.label === "Programs") {
    return (
      <div className="grid grid-cols-4 gap-6 divide-x divide-border p-8">
        {/* Programs grid (spans two columns) */}
        <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-5 pr-2">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              onClick={onNavigate}
              className="group flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-muted"
            >
              <span
                className={cn(
                  "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  p.theme === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent",
                )}
              >
                <ProgramIcon name={p.iconName} className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink group-hover:text-primary">
                  {p.name}
                </span>
                <span className="mt-0.5 block text-sm leading-snug tracking-tight text-ink-soft">
                  {p.shortDescription}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Explore column */}
        <div className="flex flex-col gap-3 pl-6">
          <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-faint">
            Explore
          </h4>
          <Link href="/programs" onClick={onNavigate} className="inline-flex items-center gap-1 text-sm font-medium tracking-tight text-ink-soft transition-colors hover:text-primary">
            All Programs
            <ArrowRightIcon className="h-3.5 w-3.5" weight="bold" aria-hidden="true" />
          </Link>
          <Link href="/impact" onClick={onNavigate} className="text-sm font-medium tracking-tight text-ink-soft transition-colors hover:text-primary">
            Our Impact
          </Link>
          <Link href="/about" onClick={onNavigate} className="text-sm font-medium tracking-tight text-ink-soft transition-colors hover:text-primary">
            About Us
          </Link>
        </div>

        {/* Featured */}
        <div className="pl-6">
          <FeaturedCard
            badge="Most needed"
            title="Sponsor a Spark Box"
            body="Put supplies and creative tools directly into people's hands."
            cta={{ label: "Sponsor now", href: cta.sponsorBox.href }}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    );
  }

  // Get Involved
  return (
    <div className="grid grid-cols-4 gap-6 divide-x divide-border p-8">
      {/* Ways to help (spans two columns) */}
      <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-5 pr-2">
        {helpWays.map(({ label, href, hint, Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="group flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-muted"
          >
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink group-hover:text-primary">
                {label}
              </span>
              <span className="mt-0.5 block text-sm leading-snug tracking-tight text-ink-soft">
                {hint}
              </span>
            </span>
          </Link>
        ))}
      </div>

      {/* More column */}
      <div className="flex flex-col gap-3 pl-6">
        <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-faint">
          More
        </h4>
        {helpMore.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            onClick={onNavigate}
            className="text-sm font-medium tracking-tight text-ink-soft transition-colors hover:text-primary"
          >
            {m.label}
          </Link>
        ))}
      </div>

      {/* Featured */}
      <div className="pl-6">
        <FeaturedCard
          badge="Give"
          title="Donate to SparkCreatives"
          body="Your gift turns donated surplus into supplies, learning, and creative pathways."
          cta={{ label: "Donate now", href: cta.donate.href }}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}
