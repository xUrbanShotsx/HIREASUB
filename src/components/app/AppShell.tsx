"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { Icon, type IconName } from "../Icons";
import { Logo } from "../Logo";
import { Avatar } from "./ui";
import { roleKeys, roles, type Role } from "@/lib/roles";
import { hired, matchesMe, myOffer, useDemo } from "@/lib/demo";

type Item = { slug: string; label: string; icon: IconName };
type Group = { label?: string; items: Item[] };

export function AppShell({
  role,
  groups,
  person,
  children,
}: {
  role: Role;
  groups: Group[];
  person: { name: string; initials: string; role: string; company: string };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const base = `/dashboard/${role}`;
  const other = roleKeys.find((k) => k !== role)!;
  const demo = useDemo();

  const badges: Record<string, number> =
    role === "sole-trader"
      ? {
          jobs: demo.jobs.reduce(
            (n, j) => n + (j.status === "open" ? j.offers.filter((o) => o.status === "pending").length : 0),
            0,
          ),
          invoices: demo.jobs.filter((j) => j.invoice && !j.invoice.paid).length,
        }
      : {
          alerts: demo.jobs.filter((j) => matchesMe(demo, j) && !myOffer(j)).length,
          work: demo.jobs.filter((j) => hired(j)?.subId === "me" && j.status === "complete").length,
        };
  const bellCount = Object.values(badges).reduce((a, b) => a + b, 0);
  const bellHref = role === "sole-trader" ? `${base}/jobs` : `${base}/alerts`;

  const hrefOf = (slug: string) => (slug ? `${base}/${slug}` : base);
  const isActive = (slug: string) =>
    slug ? pathname.startsWith(hrefOf(slug)) : pathname === base;
  const inSettings = pathname.startsWith(`${base}/settings`);

  const sidebar = (
    <div className="flex h-full min-h-0 flex-col">
      <Link
        href={base}
        className="flex h-16 shrink-0 items-center px-5"
        onClick={() => setOpen(false)}
        aria-label="HireASub dashboard"
      >
        <Logo className="h-6" />
      </Link>

      <div className="mx-3 shrink-0 rounded-xl border border-line bg-surface px-3 py-2.5">
        <p className="truncate text-sm font-bold">{person.company}</p>
        <p className="text-xs text-ink-soft">{roles[role].label} account</p>
      </div>

      <nav
        aria-label="App"
        data-lenis-prevent
        className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 pb-3"
      >
        {groups.map((g, gi) => (
          <div key={gi}>
            {g.label && (
              <p className="px-3 pb-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                {g.label}
              </p>
            )}
            <div className="space-y-0.5">
              {g.items.map((n) => {
                const active = isActive(n.slug);
                return (
                  <Link
                    key={n.slug}
                    href={hrefOf(n.slug)}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-accent/20 text-ink"
                        : "text-ink-soft hover:bg-tint hover:text-ink"
                    }`}
                  >
                    <Icon name={n.icon} className="h-[18px] w-[18px]" />
                    {n.label}
                    {badges[n.slug] > 0 && (
                      <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold leading-none text-bg">
                        {badges[n.slug]}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="m-3 shrink-0 rounded-xl border border-line bg-surface p-3">
        <div className="flex items-center gap-3">
          <Avatar initials={person.initials} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{person.name}</p>
            <p className="truncate text-xs text-ink-soft">{person.role}</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-3 flex items-center gap-2 text-xs font-semibold text-ink-soft hover:text-ink"
        >
          <Icon name="logout" className="h-3.5 w-3.5" /> Sign out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg text-ink lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-dvh border-r border-line bg-bg lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-bg shadow-2xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur sm:px-8">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
          <label className="relative hidden w-full max-w-sm sm:block">
            <span className="sr-only">Search</span>
            <Icon
              name="search"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            />
            <input
              type="search"
              placeholder="Search jobs, clients, quotes"
              className="w-full rounded-full border border-line bg-bg py-2 pl-9 pr-4 text-sm focus:border-ink"
            />
          </label>
          <span className="ml-auto flex items-center gap-2 sm:gap-3">
            <span className="hidden rounded-full bg-tint px-3 py-1 text-[11px] font-semibold text-ink-soft xl:inline">
              Sample data
            </span>
            <Link
              href={`/dashboard/${other}`}
              className="hidden rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-tint sm:inline-block"
            >
              View as {roles[other].label.toLowerCase()}
            </Link>
            <Link
              href={bellHref}
              aria-label={`Notifications${bellCount ? `, ${bellCount} new` : ""}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-tint"
            >
              <Icon name="bell" className="h-5 w-5" />
              {bellCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-bg">
                  {bellCount}
                </span>
              )}
            </Link>
            <Link
              href={`${base}/settings`}
              aria-label="Settings"
              aria-current={inSettings ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-full hover:bg-tint ${inSettings ? "bg-accent/20" : ""}`}
            >
              <Icon name="settings" className="h-5 w-5" />
            </Link>
            <span className="hidden sm:block">
              <Avatar initials={person.initials} />
            </span>
          </span>
        </header>

        <div className="mx-auto max-w-6xl p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
