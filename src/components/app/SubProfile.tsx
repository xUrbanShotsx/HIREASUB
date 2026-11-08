"use client";

import Link from "next/link";
import { Icon } from "../Icons";
import { Card, CardHead } from "./ui";
import { places } from "@/lib/geo";
import { money, subById, useDemo } from "@/lib/demo";

export function SubProfile({ id, role }: { id: string; role: string }) {
  const s = useDemo();
  const sub = subById(s, id);
  const back = role === "sole-trader" ? "/dashboard/sole-trader/jobs" : `/dashboard/${role}`;

  if (!sub)
    return (
      <Card className="p-8 text-center">
        <p className="font-semibold">Subcontractor not found</p>
        <Link href={back} className="mt-3 inline-block text-sm font-semibold underline">
          Back
        </Link>
      </Card>
    );

  return (
    <>
      <Link href={back} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink">
        <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to jobs
      </Link>

      <div className="flex flex-wrap items-center gap-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-xl font-extrabold">
          {sub.name
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")}
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-extrabold tracking-tight">{sub.name}</h1>
          <p className="text-sm text-ink-soft">
            {sub.trade} · {sub.owner} · {sub.rating.toFixed(1)} ★ from {sub.jobsDone} jobs
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHead title="About" />
            <p className="px-5 py-4 text-sm text-ink-soft">{sub.bio}</p>
          </Card>

          <Card>
            <CardHead title="Reviews" sub={`${sub.reviews.length} from completed jobs`} />
            <ul className="divide-y divide-line">
              {sub.reviews.map((r) => (
                <li key={r.by + r.job} className="px-5 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold">{r.by}</p>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                      {r.rating.toFixed(1)} ★ · {r.date}
                    </p>
                  </div>
                  <p className="text-xs text-ink-soft">{r.job}</p>
                  <p className="mt-1.5 text-sm">{r.text}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHead title="Past jobs" />
            <ul className="divide-y divide-line">
              {sub.pastJobs.map((p) => (
                <li key={p.title + p.date} className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{p.title}</span>
                    <span className="block text-xs text-ink-soft">{p.where}</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">{p.date}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHead title="Rates and area" />
            <dl className="divide-y divide-line text-sm">
              {[
                ["Hourly", money(sub.rateHour)],
                ["Day rate", money(sub.rateDay)],
                ["Based in", places[sub.base].label],
                ["Travels up to", `${sub.radius} km`],
                ["Licence", sub.licence],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 px-5 py-3">
                  <dt className="text-ink-soft">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <CardHead title="Verified by HireASub" sub="Re-checked weekly" />
            <ul className="divide-y divide-line">
              {sub.verified.map((v) => (
                <li key={v} className="flex items-center gap-3 px-5 py-3 text-sm font-medium">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-accent" />
                  {v}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
