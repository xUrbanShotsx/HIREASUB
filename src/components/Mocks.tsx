import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icons";
import { Logo } from "./Logo";

/* browser-window screenshots on a dark stage, sample data only */

const NAV: { icon: IconName; id: string }[] = [
  { icon: "file", id: "jobs" },
  { icon: "users", id: "subs" },
  { icon: "shield", id: "checks" },
  { icon: "clock", id: "schedule" },
];

function AppWindow({
  url,
  tab,
  active,
  children,
}: {
  url: string;
  tab: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="lift relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(140deg,oklch(0.2_0.03_250),oklch(0.34_0.1_10))] pl-4 pt-5 shadow-[0_40px_90px_-40px_oklch(0.24_0.03_250/0.7)] sm:pl-8 sm:pt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 bottom-6 h-80 w-28 -rotate-12 rounded-full bg-accent/70 blur-3xl"
      />
      <div className="relative -mr-4 overflow-hidden rounded-tl-2xl bg-surface text-ink ring-1 ring-white/20">
        <div className="bg-[oklch(0.94_0.008_70)] px-3 pt-2.5">
          <div className="flex items-end gap-3">
            <span className="mb-2 flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_25)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.15_85)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.16_150)]" />
            </span>
            <span className="flex min-w-0 items-center gap-2 rounded-t-lg bg-surface px-3 py-1.5 text-[11px] font-medium">
              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] bg-accent text-[8px] font-bold text-bg">
                H
              </span>
              <span className="truncate">{tab}</span>
              <Icon name="close" className="h-3 w-3 shrink-0 text-ink-soft" />
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 border-b border-line bg-surface px-3 py-2 text-ink-soft">
          <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" />
          <Icon name="arrow" className="h-3.5 w-3.5" />
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-[11px]">
            <Icon name="lock" className="h-3 w-3 shrink-0" />
            <span className="truncate">{url}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <Logo className="h-3.5" />
          <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-[11px] text-ink-soft sm:flex">
            <Icon name="search" className="h-3 w-3" /> Search
          </span>
          <span className="rounded-full bg-tint px-2.5 py-1 text-[10px] font-semibold text-ink-soft">
            Sample data
          </span>
        </div>
        <div className="flex">
          <nav
            aria-hidden="true"
            className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-line bg-bg py-3 sm:flex"
          >
            {NAV.map((n) => (
              <span
                key={n.id}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  n.id === active ? "bg-accent/15 text-ink" : "text-ink-soft"
                }`}
              >
                <Icon name={n.icon} className="h-4 w-4" />
              </span>
            ))}
          </nav>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="pl-5 pr-9 pt-5">
      <h3 className="font-display text-lg font-extrabold leading-tight tracking-tight">
        {title}
      </h3>
      {sub && <p className="mt-0.5 text-[13px] text-ink-soft">{sub}</p>}
    </div>
  );
}

function Pill({
  tone,
  children,
}: {
  tone: "ok" | "warn" | "plain";
  children: ReactNode;
}) {
  const t = {
    ok: "bg-[oklch(0.93_0.07_155)] text-[oklch(0.35_0.1_155)]",
    warn: "bg-accent/15 text-accent",
    plain: "bg-tint text-ink-soft",
  }[tone];
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${t}`}
    >
      {children}
    </span>
  );
}

/* hero: quotes for one job, side by side */
export function QuotesMock() {
  const quotes = [
    {
      n: "Hartley Electrical",
      meta: "4.9 · 212 jobs · 6 km away",
      price: "$3,850",
      tag: "Lowest",
      tone: "ok" as const,
      open: false,
    },
    {
      n: "Brightline Power Co",
      meta: "4.8 · 140 jobs · 11 km away",
      price: "$4,200",
      tag: "Earliest start",
      tone: "plain" as const,
      open: false,
    },
    {
      n: "J. Nguyen Electrical",
      meta: "Insurance expires in 9 days",
      price: "$3,600",
      tag: "Cert due",
      tone: "warn" as const,
      open: true,
    },
  ];
  return (
    <AppWindow
      url="hireasub.com.au/jobs/2291/quotes"
      tab="Switchboard upgrade, Quotes"
      active="jobs"
    >
      <PageTitle
        title="Switchboard upgrade, Marrickville"
        sub="3 quotes · fixed price · starts Mon 9 Nov"
      />
      <ul className="mt-4 divide-y divide-line border-t border-line">
        {quotes.map((q) => (
          <li
            key={q.n}
            className={`board-row flex items-center gap-3 pl-5 pr-9 py-3 ${q.open ? "bg-tint" : ""}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-bg">
              {q.n[0]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-bold">{q.n}</span>
              <span className="block truncate text-[11px] text-ink-soft">
                {q.meta}
              </span>
              <span className="mt-1 block sm:hidden">
                <Pill tone={q.tone}>{q.tag}</Pill>
              </span>
            </span>
            <span className="hidden sm:block">
              <Pill tone={q.tone}>{q.tag}</Pill>
            </span>
            <span className="w-16 text-right font-display text-base font-extrabold">
              {q.price}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-line pl-5 pr-9 py-3">
        <span className="text-[11px] text-ink-soft">
          Licence EC-48213 verified today
        </span>
        <span className="rounded-full bg-ink px-4 py-1.5 text-[11px] font-semibold text-bg">
          Book Hartley
        </span>
      </div>
    </AppWindow>
  );
}

/* feature: the job post form */
export function JobMock() {
  const fields = [
    ["Trade", "Plumber, gasfitter"],
    ["Where", "Newtown NSW 2042"],
    ["When", "Within 2 weeks"],
    ["Budget", "$2,000 to $3,500"],
  ];
  return (
    <AppWindow url="hireasub.com.au/post" tab="Post a job" active="jobs">
      <PageTitle title="Replace hot water system" sub="Step 2 of 3 · Details" />
      <div className="grid grid-cols-2 gap-3 py-5 pl-5 pr-9">
        {fields.map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">
              {k}
            </p>
            <p className="mt-0.5 text-[13px] font-semibold">{v}</p>
          </div>
        ))}
        <div className="col-span-2 rounded-lg border border-line px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">
            Scope
          </p>
          <p className="mt-0.5 text-[13px]">
            Remove old 250 L electric unit, supply and fit 5-star gas
            continuous flow, make good.
          </p>
        </div>
        <div className="col-span-2 flex items-center gap-2 text-[11px] text-ink-soft">
          <Icon name="clip" className="h-3.5 w-3.5" /> 3 photos attached
          <span className="ml-auto rounded-full bg-accent px-4 py-1.5 text-[11px] font-semibold text-bg">
            Send to 14 trades
          </span>
        </div>
      </div>
    </AppWindow>
  );
}

/* feature: licence and insurance checks */
export function ChecksMock() {
  const rows: [string, string, "ok" | "warn"][] = [
    ["Trade licence", "EC-48213 · Active · expires 2027", "ok"],
    ["Public liability", "$20M · QBE · expires 14 Mar 2027", "ok"],
    ["Workers compensation", "icare · expires 30 Nov 2026", "warn"],
    ["White card", "Verified · issued 2022", "ok"],
    ["ABN", "51 824 753 556 · Active, GST registered", "ok"],
  ];
  return (
    <AppWindow
      url="hireasub.com.au/subs/hartley-electrical"
      tab="Hartley Electrical, Checks"
      active="checks"
    >
      <PageTitle title="Hartley Electrical" sub="Checked against public registers today" />
      <ul className="mt-4 divide-y divide-line border-t border-line">
        {rows.map(([t, d, tone]) => (
          <li
            key={t}
            className={`board-row flex items-center gap-3 pl-5 pr-9 py-3 ${tone === "warn" ? "bg-tint" : ""}`}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold">{t}</span>
              <span className="block truncate text-[11px] text-ink-soft">{d}</span>
            </span>
            <Pill tone={tone}>{tone === "ok" ? "Valid" : "Renew soon"}</Pill>
          </li>
        ))}
      </ul>
    </AppWindow>
  );
}

/* dark band: payment held until sign-off */
export function MilestoneMock() {
  const steps: [string, string, string][] = [
    ["Deposit", "$770", "Held in escrow"],
    ["Rough-in complete", "$1,540", "Released 2 Nov"],
    ["Final sign-off", "$1,540", "Waiting on you"],
  ];
  return (
    <AppWindow
      url="hireasub.com.au/jobs/2291/payments"
      tab="Payments"
      active="schedule"
    >
      <PageTitle title="Milestone payments" sub="$3,850 fixed · you release each stage" />
      <ol className="mt-4 divide-y divide-line border-t border-line">
        {steps.map(([t, a, s], i) => (
          <li
            key={t}
            className={`board-row flex items-center gap-3 pl-5 pr-9 py-3 ${i === 2 ? "bg-tint" : ""}`}
          >
            <span className="font-mono text-xs text-ink-soft">0{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold">{t}</span>
              <span className="block text-[11px] text-ink-soft">{s}</span>
            </span>
            <span className="font-display text-base font-extrabold">{a}</span>
          </li>
        ))}
      </ol>
    </AppWindow>
  );
}
