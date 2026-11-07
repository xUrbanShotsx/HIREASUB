import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { navGroups, people, sections } from "@/lib/dashboard";
import { roleKeys, roles, type Role } from "@/lib/roles";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | HireASub" },
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return roleKeys.map((role) => ({ role }));
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!(role in roles)) notFound();
  const r = role as Role;

  const groups = navGroups[r].map((g) => ({
    label: g.label,
    items: g.slugs.map((slug) => {
      const s = sections[r].find((x) => x.slug === slug)!;
      return { slug, label: s.label, icon: s.icon };
    }),
  }));

  return (
    <AppShell role={r} groups={groups} person={people[r]}>
      {children}
    </AppShell>
  );
}
