"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/content/nav";
import { cta } from "@/content/ctas";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(path + "/");
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on any navigation (called from link clicks — avoids effect-driven setState).
  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  // Escape closes any open menu; click outside closes desktop dropdowns.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <nav
        ref={navRef}
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <li key={item.label} className="relative">
                <button
                  type="button"
                  aria-expanded={openMenu === item.label}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenMenu((cur) => (cur === item.label ? null : item.label))
                  }
                  className={cn(
                    "inline-flex items-center gap-1 rounded-sm px-3 py-2 text-[0.95rem] font-medium transition-colors hover:bg-muted",
                    isActive(pathname, item.href) ? "text-primary" : "text-ink",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openMenu === item.label && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
                {openMenu === item.label ? (
                  <ul className="absolute left-0 top-full mt-2 min-w-56 rounded-lg border border-border bg-surface p-2 shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={closeAll}
                          className="block rounded-sm px-3 py-2 text-[0.95rem] text-ink-soft transition-colors hover:bg-muted hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeAll}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center rounded-sm px-3 py-2 text-[0.95rem] font-medium transition-colors hover:bg-muted",
                    isActive(pathname, item.href) ? "text-primary" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="hidden lg:block">
          <Button href={cta.sponsorBox.href} size="md">
            {cta.sponsorBox.label}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-muted lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-paper lg:hidden"
        >
          <ul className="mx-auto max-w-6xl space-y-1 px-5 py-4 sm:px-6">
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeAll}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-base font-medium",
                    isActive(pathname, item.href)
                      ? "bg-muted text-primary"
                      : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="ml-3 border-l border-border pl-3">
                    {item.children.slice(1).map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={closeAll}
                          className="block rounded-sm px-3 py-2 text-[0.95rem] text-ink-soft hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="pt-2">
              <Button href={cta.sponsorBox.href} onClick={closeAll} className="w-full" size="lg">
                {cta.sponsorBox.label}
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
