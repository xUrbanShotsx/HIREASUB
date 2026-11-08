"use client";

import { btnDark, Card, Pill, Stat } from "./ui";
import {
  fmtDate,
  hired,
  invoiceTotals,
  money,
  payInvoice,
  rateLabel,
  subById,
  useDemo,
} from "@/lib/demo";
import type { Role } from "@/lib/roles";

export function Invoices({ role }: { role: Role }) {
  const s = useDemo();
  const rows = s.jobs
    .filter((j) => j.invoice && (role === "sole-trader" || hired(j)?.subId === "me"))
    .map((j) => ({ j, inv: j.invoice! }));

  const owing = rows.filter((r) => !r.inv.paid).reduce((n, r) => n + invoiceTotals(r.inv).total, 0);
  const paid = rows.filter((r) => r.inv.paid).reduce((n, r) => n + invoiceTotals(r.inv).total, 0);

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat
          label={role === "sole-trader" ? "To pay" : "Awaiting payment"}
          value={money(owing)}
          note={`${rows.filter((r) => !r.inv.paid).length} invoice(s)`}
          owed={owing > 0}
        />
        <Stat label="Paid" value={money(paid)} note={`${rows.filter((r) => r.inv.paid).length} invoice(s)`} />
      </div>

      <Card>
        {rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink-soft">
            {role === "sole-trader"
              ? "No invoices yet. Subcontractors invoice you once a job is complete."
              : "No invoices yet. Mark a job complete to invoice it."}
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {rows.map(({ j, inv }) => {
              const t = invoiceTotals(inv);
              const sub = subById(s, hired(j)?.subId ?? "");
              return (
                <li key={inv.number} className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4">
                  <span className="min-w-0 flex-1 basis-60">
                    <span className="block text-sm font-semibold">
                      {inv.number} · {j.title}
                    </span>
                    <span className="block text-xs text-ink-soft">
                      {role === "sole-trader" ? `From ${sub?.name} · ` : "To Jay Mitchell Plumbing · "}
                      {inv.qty} {inv.rateType === "day" ? "day" : "hr"} at {rateLabel(inv)} · sent {fmtDate(inv.sent)}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block font-display text-lg font-extrabold">{money(t.total)}</span>
                    <span className="block text-xs text-ink-soft">
                      {money(t.sub)} + {money(t.gst)} GST
                    </span>
                  </span>
                  {inv.paid ? (
                    <Pill tone="ok">Paid</Pill>
                  ) : role === "sole-trader" ? (
                    <button type="button" className={btnDark} onClick={() => payInvoice(j.id)}>
                      Pay invoice
                    </button>
                  ) : (
                    <Pill tone="owed">Awaiting payment</Pill>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
      {role === "sole-trader" && (
        <p className="mt-3 text-xs text-ink-soft">
          Demo: paying marks the invoice as paid. Real payments need a payment provider connected.
        </p>
      )}
    </>
  );
}
