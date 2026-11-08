"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "../Icons";
import { btnDark, btnLight, Card, Pill } from "./ui";
import { places, placeKeys } from "@/lib/geo";
import {
  approveOffer,
  declineOffer,
  estTotal,
  fmtDate,
  hired,
  money,
  postJob,
  resetDemo,
  rateLabel,
  subById,
  trades,
  useDemo,
  type Job,
  type JobStatus,
} from "@/lib/demo";
import type { Tone } from "@/lib/dashboard";

export const statusLabel: Record<JobStatus, [string, Tone]> = {
  open: ["Open", "owed"],
  booked: ["Booked", "solid"],
  complete: ["Complete", "neutral"],
  invoiced: ["Invoice sent", "owed"],
  paid: ["Paid", "ok"],
};

const field =
  "mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-ink focus:border-ink";

export function PostJob() {
  const router = useRouter();
  const [trade, setTrade] = useState("Electrician");
  const [where, setWhere] = useState("kiama");
  const [title, setTitle] = useState("Sparky needed in Kiama");
  const [date, setDate] = useState("2026-11-16");
  const [days, setDays] = useState(2);
  const [desc, setDesc] = useState(
    "Need a licensed electrician for two days to run circuits and fit off a new bathroom. Plans on site.",
  );
  const [done, setDone] = useState<{ id: string; alerted: number } | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(postJob({ title, trade, where, date, days, desc }));
  }

  if (done) {
    return (
      <Card className="max-w-xl p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-bg">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight">
          Job posted
        </h2>
        <p className="mt-2 text-ink-soft">
          {done.alerted === 0
            ? `No ${trade.toLowerCase()}s have ${places[where].label} inside their service area yet. Try a nearby suburb or a different trade.`
            : `${done.alerted} ${trade.toLowerCase()}${done.alerted === 1 ? " has" : "s have"} ${places[where].label} inside their service area and ${done.alerted === 1 ? "was" : "were"} alerted. Offers appear on the job as they come in.`}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className={btnDark}
            onClick={() => router.push("/dashboard/sole-trader/jobs")}
          >
            View offers
          </button>
          <button type="button" className={btnLight} onClick={() => setDone(null)}>
            Post another
          </button>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={submit}>
      <Card className="max-w-3xl p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold sm:col-span-2">
            Job title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className={field} />
          </label>
          <label className="block text-sm font-semibold">
            Trade needed
            <select value={trade} onChange={(e) => setTrade(e.target.value)} className={field}>
              {trades.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold">
            Where
            <select value={where} onChange={(e) => setWhere(e.target.value)} className={field}>
              {placeKeys.map((k) => (
                <option key={k} value={k}>
                  {places[k].label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold">
            Start date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className={field} />
          </label>
          <label className="block text-sm font-semibold">
            Estimated days on site
            <input
              type="number"
              min={1}
              max={60}
              value={days}
              onChange={(e) => setDays(Math.max(1, Number(e.target.value) || 1))}
              className={field}
            />
          </label>
          <label className="block text-sm font-semibold sm:col-span-2">
            What needs doing
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} required className={field} />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="submit" className={btnDark}>
            Post job
          </button>
          <p className="text-xs text-ink-soft">
            Subcontractors are alerted when {places[where].label} falls inside the service area they have set.
          </p>
        </div>
      </Card>
    </form>
  );
}

function JobCard({ job }: { job: Job }) {
  const s = useDemo();
  const [label, tone] = statusLabel[job.status];
  const winner = hired(job);
  const winnerSub = winner && subById(s, winner.subId);
  const pending = job.offers.filter((o) => o.status === "pending").length;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-extrabold tracking-tight">{job.title}</h2>
          <p className="mt-0.5 text-sm text-ink-soft">
            {job.trade} · {places[job.where]?.label ?? job.where} · starts {fmtDate(job.date)} · {job.days} day{job.days === 1 ? "" : "s"}
          </p>
        </div>
        <Pill tone={tone}>{label}</Pill>
      </div>

      {job.status === "open" && (
        <>
          <p className="border-b border-line bg-tint/60 px-5 py-2.5 text-xs text-ink-soft">
            {job.alerted} {job.trade.toLowerCase()}
            {job.alerted === 1 ? "" : "s"} alerted · {job.offers.length} offer{job.offers.length === 1 ? "" : "s"}
            {pending ? `, ${pending} waiting on you` : ""}
          </p>
          {job.offers.length === 0 ? (
            <p className="px-5 py-6 text-sm text-ink-soft">
              No offers yet. They show here as subcontractors put in their rate.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {job.offers.map((o) => {
                const sub = subById(s, o.subId);
                if (!sub) return null;
                return (
                  <li key={o.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4">
                    <span className="min-w-0 flex-1 basis-60">
                      <Link
                        href={`/dashboard/sole-trader/subs/${sub.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold underline-offset-2 hover:underline"
                      >
                        {sub.name}
                        <Icon name="shield" className="h-3.5 w-3.5 text-accent" />
                      </Link>
                      <span className="block text-xs text-ink-soft">
                        {sub.rating.toFixed(1)} ★ · {sub.jobsDone} jobs · {sub.verified.length} checks verified
                      </span>
                      {o.note && <span className="mt-1 block text-xs text-ink-soft">“{o.note}”</span>}
                    </span>
                    <span className="text-right">
                      <span className="block font-display text-lg font-extrabold">{rateLabel(o)}</span>
                      <span className="block text-xs text-ink-soft">
                        about {money(estTotal(o, job.days))} for {job.days} day{job.days === 1 ? "" : "s"}
                      </span>
                    </span>
                    {o.status === "pending" ? (
                      <span className="flex gap-2">
                        <button type="button" className={btnDark} onClick={() => approveOffer(job.id, o.id)}>
                          Approve
                        </button>
                        <button type="button" className={btnLight} onClick={() => declineOffer(job.id, o.id)}>
                          Decline
                        </button>
                      </span>
                    ) : (
                      <Pill tone="neutral">Declined</Pill>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      {job.status !== "open" && winnerSub && winner && (
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
          <span className="min-w-0 flex-1 basis-56 text-sm">
            <span className="block text-xs text-ink-soft">Hired</span>
            <Link
              href={`/dashboard/sole-trader/subs/${winnerSub.id}`}
              className="font-bold underline-offset-2 hover:underline"
            >
              {winnerSub.name}
            </Link>{" "}
            at {rateLabel(winner)}
          </span>
          <span className="text-xs text-ink-soft">
            {job.status === "booked" && "Waiting for the work to be completed."}
            {job.status === "complete" && "Complete. Waiting on their invoice."}
            {job.status === "invoiced" && "Invoice received. Pay it from Invoices."}
            {job.status === "paid" && "Invoice paid."}
          </span>
          {job.status === "invoiced" && (
            <Link href="/dashboard/sole-trader/invoices" className={btnDark}>
              View invoice
            </Link>
          )}
        </div>
      )}
    </Card>
  );
}

export function MyJobs() {
  const { jobs } = useDemo();
  if (!jobs.length)
    return (
      <Card className="p-8 text-center">
        <p className="font-semibold">No jobs yet</p>
        <Link href="/dashboard/sole-trader/post" className={`${btnDark} mt-4`}>
          Post a job
        </Link>
      </Card>
    );
  return (
    <div className="space-y-6">
      {jobs.map((j) => (
        <JobCard key={j.id} job={j} />
      ))}
    </div>
  );
}

export function ResetDemo() {
  return (
    <Card className="p-5">
      <h2 className="font-display text-base font-extrabold">Demo data</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Jobs, offers and invoices are saved in this browser only and shared by both dashboards.
      </p>
      <button type="button" className={`${btnLight} mt-4`} onClick={() => resetDemo()}>
        Reset demo data
      </button>
    </Card>
  );
}
