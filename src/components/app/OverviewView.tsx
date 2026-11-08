"use client";

import Link from "next/link";
import { Icon } from "../Icons";
import { btnDark, btnLight, Card, CardHead, PageHeading, Pill, Stat } from "./ui";
import { statusLabel } from "./SeekerViews";
import { places } from "@/lib/geo";
import { hired, invoiceTotals, matchesMe, money, myOffer, useDemo } from "@/lib/demo";
import type { Tone } from "@/lib/dashboard";
import type { Role } from "@/lib/roles";

type Item = { t: string; d: string; tag: string; tone: Tone; href: string };

export function OverviewView({ role }: { role: Role }) {
  const s = useDemo();
  const base = `/dashboard/${role}`;

  if (role === "sole-trader") {
    const open = s.jobs.filter((j) => j.status === "open");
    const waiting = open.reduce((n, j) => n + j.offers.filter((o) => o.status === "pending").length, 0);
    const booked = s.jobs.filter((j) => j.status === "booked" || j.status === "complete").length;
    const toPay = s.jobs.filter((j) => j.invoice && !j.invoice.paid);
    const owed = toPay.reduce((n, j) => n + invoiceTotals(j.invoice!).total, 0);

    const items: Item[] = [
      ...toPay.map((j) => ({
        t: `Invoice to pay: ${j.invoice!.number}`,
        d: `${j.title} · ${money(invoiceTotals(j.invoice!).total)}`,
        tag: "Pay",
        tone: "owed" as Tone,
        href: `${base}/invoices`,
      })),
      ...open
        .filter((j) => j.offers.some((o) => o.status === "pending"))
        .map((j) => ({
          t: `${j.offers.filter((o) => o.status === "pending").length} offer(s) on ${j.title}`,
          d: "Approve or decline",
          tag: "Review",
          tone: "owed" as Tone,
          href: `${base}/jobs`,
        })),
    ];

    return (
      <>
        <PageHeading title="Good morning, Jay" sub="Here is what needs you today." />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Stat label="Open jobs" value={String(open.length)} note="waiting on offers" />
          <Stat label="Offers to review" value={String(waiting)} note="across open jobs" owed={waiting > 0} />
          <Stat label="In progress" value={String(booked)} note="booked or complete" />
          <Stat label="Invoices to pay" value={money(owed)} note={`${toPay.length} invoice(s)`} owed={owed > 0} />
        </div>
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[1.6fr_1fr]">
          <NeedsYou items={items} empty="Nothing waiting on you." />
          <Card>
            <CardHead title="Need a trade?" sub="Post a job and local subbies are alerted" />
            <div className="p-5">
              <Link href={`${base}/post`} className={btnDark}>
                <Icon name="plus" className="h-4 w-4" /> Post a job
              </Link>
            </div>
            <ul className="divide-y divide-line border-t border-line">
              {s.jobs.slice(0, 4).map((j) => {
                const [label, tone] = statusLabel[j.status];
                return (
                  <li key={j.id} className="flex items-center gap-3 px-5 py-3">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{j.title}</span>
                      <span className="block truncate text-xs text-ink-soft">{places[j.where]?.label}</span>
                    </span>
                    <Pill tone={tone}>{label}</Pill>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </>
    );
  }

  const alerts = s.jobs.filter((j) => matchesMe(s, j) && !myOffer(j));
  const pending = s.jobs.filter((j) => myOffer(j)?.status === "pending" && j.status === "open");
  const booked = s.jobs.filter((j) => hired(j)?.subId === "me" && j.status === "booked");
  const toInvoice = s.jobs.filter((j) => hired(j)?.subId === "me" && j.status === "complete");
  const unpaid = s.jobs.filter((j) => hired(j)?.subId === "me" && j.invoice && !j.invoice.paid);
  const owed = unpaid.reduce((n, j) => n + invoiceTotals(j.invoice!).total, 0);

  const items: Item[] = [
    ...toInvoice.map((j) => ({
      t: `Submit invoice: ${j.title}`,
      d: "Job complete, ready to invoice",
      tag: "Invoice",
      tone: "owed" as Tone,
      href: `${base}/work`,
    })),
    ...alerts.map((j) => ({
      t: `New job: ${j.title}`,
      d: `${places[j.where].label} · starts ${j.date}`,
      tag: "New",
      tone: "solid" as Tone,
      href: `${base}/alerts`,
    })),
    ...booked.map((j) => ({
      t: `Booked: ${j.title}`,
      d: `${places[j.where].label} · mark complete when done`,
      tag: "Booked",
      tone: "neutral" as Tone,
      href: `${base}/work`,
    })),
  ];

  return (
    <>
      <PageHeading title="Good morning, Sam" sub="Here is what needs you today at Coastline Electrical." />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Jobs in your area" value={String(alerts.length)} note={`within ${s.me.radius} km`} owed={alerts.length > 0} />
        <Stat label="Offers waiting" value={String(pending.length)} note="on the client" />
        <Stat label="Booked" value={String(booked.length)} note="to complete" />
        <Stat label="Awaiting payment" value={money(owed)} note={`${unpaid.length} invoice(s)`} owed={owed > 0} />
      </div>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[1.6fr_1fr]">
        <NeedsYou items={items} empty="Nothing waiting on you." />
        <Card>
          <CardHead title="Your service area" />
          <div className="p-5 text-sm">
            <p>
              <span className="font-semibold">{s.me.trade}</span> based in{" "}
              <span className="font-semibold">{places[s.me.base].label}</span>, travelling up to{" "}
              <span className="font-semibold">{s.me.radius} km</span>.
            </p>
            <p className="mt-2 text-ink-soft">
              ${s.me.rateHour}/hr · ${s.me.rateDay}/day
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`${base}/settings`} className={btnLight}>
                Edit area and rates
              </Link>
              <Link href={`${base}/verification`} className={btnLight}>
                Verification
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function NeedsYou({ items, empty }: { items: Item[]; empty: string }) {
  return (
    <Card>
      <CardHead title="Needs you" sub="Things waiting on you today" />
      {items.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-ink-soft">{empty}</p>
      ) : (
        <ul className="divide-y divide-line">
          {items.map((a) => (
            <li key={a.t}>
              <Link
                href={a.href}
                className={`flex items-center gap-3 px-5 py-4 transition-colors hover:bg-tint ${a.tone === "owed" ? "bg-tint/60" : ""}`}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{a.t}</span>
                  <span className="block truncate text-xs text-ink-soft">{a.d}</span>
                </span>
                <Pill tone={a.tone}>{a.tag}</Pill>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
