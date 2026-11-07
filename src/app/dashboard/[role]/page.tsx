import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Sections";
import { Icon } from "@/components/Icons";
import { roleKeys, roles, type Role } from "@/lib/roles";

type Tone = "ok" | "warn" | "plain";

type Data = {
  heading: string;
  sub: string;
  stats: [string, string][];
  listTitle: string;
  list: { t: string; m: string; r: string; tag: string; tone: Tone }[];
  sideTitle: string;
  side: { t: string; d: string; warn?: boolean }[];
};

const data: Record<Role, Data> = {
  subcontractor: {
    heading: "Good morning, Hartley Electrical",
    sub: "Crew of 4 · Licence EC-48213 · Sydney inner west",
    stats: [
      ["New jobs near you", "9"],
      ["Quotes out", "5"],
      ["Booked this month", "7"],
      ["Awaiting payment", "$6,420"],
    ],
    listTitle: "Jobs near you",
    list: [
      {
        t: "Switchboard upgrade, Marrickville",
        m: "Fixed price · starts Mon 9 Nov · 6 km",
        r: "Quote",
        tag: "New",
        tone: "ok",
      },
      {
        t: "Rewire, 2 storey terrace, Newtown",
        m: "Builder: Carter Homes · 4 days · 8 km",
        r: "Quote",
        tag: "New",
        tone: "ok",
      },
      {
        t: "Commercial fit-out lighting, Alexandria",
        m: "Quote sent Thu · $18,900",
        r: "View",
        tag: "Waiting",
        tone: "plain",
      },
      {
        t: "Granny flat, Dulwich Hill",
        m: "Final sign-off requested",
        r: "Open",
        tag: "Action",
        tone: "warn",
      },
    ],
    sideTitle: "Your paperwork",
    side: [
      { t: "Trade licence", d: "Active until 2027" },
      { t: "Public liability", d: "$20M · expires 14 Mar 2027" },
      { t: "Workers compensation", d: "Expires 30 Nov 2026", warn: true },
      { t: "White cards", d: "4 of 4 verified" },
    ],
  },
  "sole-trader": {
    heading: "Good morning, Jay",
    sub: "Sole trader · Plumber and gasfitter · Licence 214871C",
    stats: [
      ["Jobs near you", "6"],
      ["Quotes out", "3"],
      ["On the books", "2"],
      ["Awaiting payment", "$1,980"],
    ],
    listTitle: "Your jobs",
    list: [
      {
        t: "Replace hot water system, Newtown",
        m: "Quote requested · within 2 weeks · $2k to $3.5k",
        r: "Quote",
        tag: "New",
        tone: "ok",
      },
      {
        t: "Bathroom rough-in, Petersham",
        m: "Booked · Wed 11 Nov · deposit held",
        r: "Open",
        tag: "Booked",
        tone: "plain",
      },
      {
        t: "Leaking tap and valve, Stanmore",
        m: "Completed · sign-off pending",
        r: "Open",
        tag: "Action",
        tone: "warn",
      },
    ],
    sideTitle: "Your paperwork",
    side: [
      { t: "Trade licence", d: "Active until 2028" },
      { t: "Public liability", d: "$10M · expires 2 Feb 2027" },
      { t: "ABN", d: "Active · GST registered" },
      { t: "White card", d: "Verified", warn: false },
    ],
  },
};

export function generateStaticParams() {
  return roleKeys.map((role) => ({ role }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  return {
    title: role in roles ? `${roles[role as Role].label} dashboard` : "Dashboard",
    robots: { index: false },
  };
}

function Pill({ tone, children }: { tone: Tone; children: string }) {
  const t = {
    ok: "bg-[oklch(0.93_0.07_155)] text-[oklch(0.35_0.1_155)]",
    warn: "bg-accent/15 text-accent",
    plain: "bg-tint text-ink-soft",
  }[tone];
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${t}`}
    >
      {children}
    </span>
  );
}

export default async function Dashboard({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!(role in roles)) notFound();
  const r = role as Role;
  const d = data[r];
  const other = roleKeys.find((k) => k !== r)!;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-6 pt-12 sm:px-8 sm:pt-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div data-load className="flex flex-wrap items-center gap-3">
            <Eyebrow>{roles[r].label} dashboard</Eyebrow>
            <span className="rounded-full bg-tint px-2.5 py-1 text-[10px] font-semibold text-ink-soft">
              Sample data
            </span>
          </div>
          <h1
            data-load
            className="mt-4 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.02] tracking-tight"
          >
            {d.heading}
          </h1>
          <p data-load className="mt-3 text-ink-soft">
            {d.sub}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/dashboard/${other}`}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-tint"
          >
            View as {roles[other].label.toLowerCase()}
          </Link>
          <Link
            href="/"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ink/85"
          >
            Sign out
          </Link>
        </div>
      </div>

      <dl
        data-stagger
        className="mt-10 grid grid-cols-2 border-t border-ink lg:grid-cols-4"
      >
        {d.stats.map(([k, v]) => (
          <div key={k} className="border-b border-line py-5 pr-4">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              {k}
            </dt>
            <dd className="mt-1 font-display text-3xl font-bold">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[1.5fr_1fr]">
        <section data-reveal>
          <h2 className="font-display text-2xl font-bold">{d.listTitle}</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {d.list.map((j) => (
              <li
                key={j.t}
                className={`row-hover flex items-center gap-3 py-4 ${j.tone === "warn" ? "bg-tint" : ""}`}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{j.t}</span>
                  <span className="block truncate text-sm text-ink-soft">
                    {j.m}
                  </span>
                </span>
                <Pill tone={j.tone}>{j.tag}</Pill>
                <span className="hidden w-14 text-right text-sm font-semibold sm:block">
                  {j.r}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section data-reveal>
          <h2 className="font-display text-2xl font-bold">{d.sideTitle}</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {d.side.map((s) => (
              <li
                key={s.t}
                className={`flex items-center gap-3 py-4 ${s.warn ? "bg-tint" : ""}`}
              >
                <Icon
                  name={s.warn ? "clock" : "check"}
                  className={`h-5 w-5 shrink-0 ${s.warn ? "text-accent" : "text-ink-soft"}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{s.t}</span>
                  <span className="block text-sm text-ink-soft">{s.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
