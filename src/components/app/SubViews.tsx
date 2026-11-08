"use client";

import Link from "next/link";
import { useState } from "react";
import { btnDark, btnLight, Card, CardHead, Pill } from "./ui";
import { statusLabel } from "./SeekerViews";
import { km, places, placeKeys } from "@/lib/geo";
import {
  completeJob,
  estTotal,
  fmtDate,
  hired,
  invoiceTotals,
  makeOffer,
  matchesMe,
  money,
  myOffer,
  rateLabel,
  submitInvoice,
  trades,
  updateMe,
  useDemo,
  type Job,
} from "@/lib/demo";

const field =
  "mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-ink focus:border-ink";

function OfferForm({ job, onDone }: { job: Job; onDone: () => void }) {
  const { me } = useDemo();
  const [type, setType] = useState<"hour" | "day">("day");
  const [rate, setRate] = useState<number>(me.rateDay);
  const [note, setNote] = useState("");

  const pick = (t: "hour" | "day") => {
    setType(t);
    setRate(t === "day" ? me.rateDay : me.rateHour);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        makeOffer(job.id, type, rate, note.trim());
        onDone();
      }}
      className="border-t border-line bg-bg px-5 py-5"
    >
      <div className="grid gap-4 sm:grid-cols-[auto_9rem_1fr]">
        <fieldset>
          <legend className="text-sm font-semibold">Charge by</legend>
          <div className="mt-1 inline-flex rounded-full border border-line bg-surface p-1 text-sm font-semibold">
            {(["day", "hour"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => pick(t)}
                className={`rounded-full px-4 py-1.5 transition-colors ${type === t ? "bg-ink text-bg" : "text-ink-soft"}`}
              >
                {t === "day" ? "Day rate" : "Hourly"}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm font-semibold">
          Rate ($ per {type})
          <input
            type="number"
            min={1}
            required
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className={field}
          />
        </label>
        <label className="block text-sm font-semibold">
          Note (optional)
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Earliest start, materials, anything to flag"
            className={field}
          />
        </label>
      </div>
      <p className="mt-3 text-xs text-ink-soft">
        About {money(estTotal({ rateType: type, rate }, job.days))} for {job.days} day{job.days === 1 ? "" : "s"} on site, before GST.
      </p>
      <div className="mt-4 flex gap-2">
        <button type="submit" className={btnDark}>
          Send offer
        </button>
        <button type="button" className={btnLight} onClick={onDone}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export function Alerts() {
  const s = useDemo();
  const [openId, setOpenId] = useState<string | null>(null);
  const matched = s.jobs.filter((j) => matchesMe(s, j) || (j.status === "open" && myOffer(j)));

  return (
    <div className="space-y-6">
      <p className="rounded-xl border border-line bg-tint/60 px-4 py-3 text-sm text-ink-soft">
        Showing {s.me.trade.toLowerCase()} jobs within {s.me.radius} km of {places[s.me.base].label}.{" "}
        <Link href="/dashboard/subcontractor/settings" className="font-semibold text-ink underline">
          Change service area
        </Link>
      </p>

      {matched.length === 0 && (
        <Card className="p-8 text-center">
          <p className="font-semibold">No open jobs in your area right now</p>
          <p className="mt-1 text-sm text-ink-soft">
            You will be alerted when a sole trader posts one inside your radius.
          </p>
        </Card>
      )}

      {matched.map((j) => {
        const mine = myOffer(j);
        const open = openId === j.id;
        return (
          <Card key={j.id}>
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <h2 className="font-display text-lg font-extrabold tracking-tight">{j.title}</h2>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {places[j.where].label} · {km(j.where, s.me.base)} km from you · starts {fmtDate(j.date)} · {j.days} day{j.days === 1 ? "" : "s"}
                </p>
                <p className="mt-3 max-w-2xl text-sm">{j.desc}</p>
                <p className="mt-2 text-xs text-ink-soft">Posted by Jay Mitchell Plumbing</p>
              </div>
              {mine ? (
                <Pill tone={mine.status === "declined" ? "neutral" : "owed"}>
                  Offer sent · {rateLabel(mine)}
                </Pill>
              ) : (
                <button
                  type="button"
                  aria-expanded={open}
                  className={btnDark}
                  onClick={() => setOpenId(open ? null : j.id)}
                >
                  Put in my rate
                </button>
              )}
            </div>
            {open && !mine && <OfferForm job={j} onDone={() => setOpenId(null)} />}
          </Card>
        );
      })}
    </div>
  );
}

export function MyOffers() {
  const { jobs } = useDemo();
  const rows = jobs.flatMap((j) => {
    const o = myOffer(j);
    return o ? [{ j, o }] : [];
  });
  return (
    <Card>
      {rows.length === 0 ? (
        <p className="p-8 text-center text-sm text-ink-soft">
          You have not put in a rate yet. Open Job alerts to start.
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {rows.map(({ j, o }) => (
            <li key={o.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <span className="min-w-0 flex-1 basis-56">
                <span className="block text-sm font-semibold">{j.title}</span>
                <span className="block text-xs text-ink-soft">
                  {places[j.where].label} · {rateLabel(o)} · about {money(estTotal(o, j.days))}
                </span>
              </span>
              <Pill tone={o.status === "approved" ? "ok" : o.status === "declined" ? "neutral" : "owed"}>
                {o.status === "approved" ? "Approved" : o.status === "declined" ? "Not selected" : "Waiting on client"}
              </Pill>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function InvoiceForm({ job }: { job: Job }) {
  const o = hired(job);
  const defaultQty = o ? (o.rateType === "day" ? job.days : job.days * 8) : 1;
  const [qty, setQty] = useState(defaultQty);
  const [note, setNote] = useState(`${job.title}`);
  if (!o) return null;
  const sub = qty * o.rate;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitInvoice(job.id, qty, note.trim());
      }}
      className="border-t border-line bg-bg px-5 py-5"
    >
      <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
        <label className="block text-sm font-semibold">
          {o.rateType === "day" ? "Days worked" : "Hours worked"} at {rateLabel(o)}
          <input
            type="number"
            min={0.5}
            step={0.5}
            required
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className={field}
          />
        </label>
        <label className="block text-sm font-semibold">
          Description
          <input value={note} onChange={(e) => setNote(e.target.value)} className={field} />
        </label>
      </div>
      <p className="mt-3 text-xs text-ink-soft">
        {money(sub)} + GST {money(sub * 0.1)} = <span className="font-semibold text-ink">{money(sub * 1.1)}</span>
      </p>
      <button type="submit" className={`${btnDark} mt-4`}>
        Submit invoice
      </button>
    </form>
  );
}

export function Work() {
  const { jobs } = useDemo();
  const mine = jobs.filter((j) => hired(j)?.subId === "me");

  if (!mine.length)
    return (
      <Card className="p-8 text-center text-sm text-ink-soft">
        No booked jobs yet. When a sole trader approves your offer it shows here.
      </Card>
    );

  return (
    <div className="space-y-6">
      {mine.map((j) => {
        const o = hired(j)!;
        const [label, tone] = statusLabel[j.status];
        return (
          <Card key={j.id}>
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <h2 className="font-display text-lg font-extrabold tracking-tight">{j.title}</h2>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {places[j.where].label} · starts {fmtDate(j.date)} · {rateLabel(o)} · Jay Mitchell Plumbing
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Pill tone={tone}>{label}</Pill>
                {j.status === "booked" && (
                  <button type="button" className={btnDark} onClick={() => completeJob(j.id)}>
                    Mark job complete
                  </button>
                )}
              </div>
            </div>
            {j.status === "complete" && <InvoiceForm job={j} />}
            {(j.status === "invoiced" || j.status === "paid") && j.invoice && (
              <p className="border-t border-line px-5 py-3 text-sm text-ink-soft">
                {j.invoice.number} · {money(invoiceTotals(j.invoice).total)} incl. GST ·{" "}
                {j.status === "paid" ? "paid" : "sent, waiting for payment"}.{" "}
                <Link href="/dashboard/subcontractor/invoices" className="font-semibold text-ink underline">
                  View invoice
                </Link>
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}

export function ServiceAreaCard() {
  const s = useDemo();
  const { me } = s;
  const inArea = s.jobs.filter((j) => matchesMe(s, j)).length;
  return (
    <Card>
      <CardHead
        title="Service area and rates"
        sub="You are alerted to jobs inside this area and your rates are pre-filled on offers"
      />
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Trade
          <select value={me.trade} onChange={(e) => updateMe({ trade: e.target.value })} className={field}>
            {trades.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Based in
          <select value={me.base} onChange={(e) => updateMe({ base: e.target.value })} className={field}>
            {placeKeys.map((k) => (
              <option key={k} value={k}>
                {places[k].label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          Travel radius: {me.radius} km
          <input
            type="range"
            min={5}
            max={150}
            step={5}
            value={me.radius}
            onChange={(e) => updateMe({ radius: Number(e.target.value) })}
            className="mt-2 w-full accent-[var(--accent)]"
          />
        </label>
        <label className="block text-sm font-semibold">
          Hourly rate ($)
          <input
            type="number"
            min={1}
            value={me.rateHour}
            onChange={(e) => updateMe({ rateHour: Number(e.target.value) })}
            className={field}
          />
        </label>
        <label className="block text-sm font-semibold">
          Day rate ($)
          <input
            type="number"
            min={1}
            value={me.rateDay}
            onChange={(e) => updateMe({ rateDay: Number(e.target.value) })}
            className={field}
          />
        </label>
      </div>
      <p className="border-t border-line px-5 py-3 text-xs text-ink-soft">
        {inArea} open job{inArea === 1 ? "" : "s"} inside your area right now. Saved automatically.
      </p>
    </Card>
  );
}
