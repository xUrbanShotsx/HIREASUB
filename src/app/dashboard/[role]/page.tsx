import Link from "next/link";
import { Icon } from "@/components/Icons";
import {
  btnLight,
  Card,
  CardHead,
  PageHeading,
  Pill,
  Stat,
} from "@/components/app/ui";
import { overviews } from "@/lib/dashboard";
import type { Role } from "@/lib/roles";

export default async function Overview({
  params,
}: {
  params: Promise<{ role: Role }>;
}) {
  const { role } = await params;
  const o = overviews[role];
  const max = Math.max(...o.earnings.map((e) => e.v));
  const base = `/dashboard/${role}`;

  return (
    <>
      <PageHeading
        title={`Good morning, ${o.greeting}`}
        sub={o.sub}
        action="Quote a job"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {o.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHead title="Needs you" sub="Things waiting on you today" />
            <ul className="divide-y divide-line">
              {o.attention.map((a) => (
                <li
                  key={a.t}
                  className={`flex items-center gap-3 px-5 py-4 ${a.tone === "owed" ? "bg-tint/60" : ""}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {a.t}
                    </span>
                    <span className="block truncate text-xs text-ink-soft">
                      {a.d}
                    </span>
                  </span>
                  <Pill tone={a.tone}>{a.tag}</Pill>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHead title="Earnings" sub="Paid out per month, in $1,000s" />
            <div
              className="flex h-44 items-end gap-3 px-5 pb-5 pt-6 sm:gap-5"
              role="img"
              aria-label={`Monthly earnings: ${o.earnings.map((e) => `${e.m} ${e.v}k`).join(", ")}`}
            >
              {o.earnings.map((e, i) => (
                <div key={e.m} className="flex h-full flex-1 flex-col justify-end gap-2">
                  <span className="text-center text-[11px] font-semibold tabular-nums text-ink-soft">
                    {e.v}k
                  </span>
                  <div
                    className={`rounded-t-md ${i === o.earnings.length - 1 ? "bg-accent" : "bg-ink"}`}
                    style={{ height: `${(e.v / max) * 100}%` }}
                  />
                  <span className="text-center font-mono text-[11px] uppercase text-ink-soft">
                    {e.m}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHead title="This week" />
            <ul className="divide-y divide-line">
              {o.week.map((d) => (
                <li key={d.day} className="flex gap-4 px-5 py-3.5">
                  <span className="w-9 font-mono text-xs uppercase text-ink-soft">
                    {d.day}
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    {d.items.length ? (
                      d.items.map((i) => (
                        <span key={i} className="block truncate font-medium">
                          {i}
                        </span>
                      ))
                    ) : (
                      <span className="text-ink-soft">Free</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-5 py-3">
              <Link href={`${base}/schedule`} className="text-sm font-semibold underline">
                Open schedule
              </Link>
            </div>
          </Card>

          <Card>
            <CardHead title="Your paperwork" sub="Checked against public registers" />
            <ul className="divide-y divide-line">
              {o.docs.map((d) => (
                <li
                  key={d.t}
                  className={`flex items-center gap-3 px-5 py-3.5 ${d.warn ? "bg-tint/60" : ""}`}
                >
                  <Icon
                    name={d.warn ? "clock" : "check"}
                    className={`h-5 w-5 shrink-0 ${d.warn ? "text-accent" : "text-ink-soft"}`}
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{d.t}</span>
                    <span className="block text-xs text-ink-soft">{d.d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-line p-4">
              <Link href={`${base}/documents`} className={btnLight}>
                Manage documents
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
