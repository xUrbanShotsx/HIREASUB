"use client";

import { useState } from "react";
import { Icon } from "../Icons";
import { btnDark, btnLight, Card, CardHead, Pill } from "./ui";
import {
  initialHistory,
  requirements,
  type CheckStatus,
  type Requirement,
} from "@/lib/verification";
import type { Role } from "@/lib/roles";

const tone = {
  verified: "ok",
  expiring: "owed",
  review: "neutral",
  missing: "solid",
} as const;

const label: Record<CheckStatus, string> = {
  verified: "Verified",
  expiring: "Renew soon",
  review: "In review",
  missing: "Not submitted",
};

const field =
  "mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-ink focus:border-ink";

export function VerificationPanel({ role }: { role: Role }) {
  const [items, setItems] = useState<Requirement[]>(requirements[role]);
  const [history, setHistory] = useState(initialHistory[role]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const log = (what: string) =>
    setHistory((h) => [{ when: "Just now", what }, ...h]);

  const update = (id: string, patch: Partial<Requirement>) =>
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const done = items.filter(
    (i) => i.status === "verified" || i.status === "expiring",
  ).length;
  const fully = done === items.length;
  const pending = items.filter((i) => i.status === "review").length;
  const pct = Math.round((done / items.length) * 100);

  function submit(e: React.FormEvent<HTMLFormElement>, r: Requirement) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const vals = r.fields
      .map((x) => String(f.get(x.key) ?? "").trim())
      .filter(Boolean);
    update(r.id, {
      status: "review",
      detail: `Submitted just now${vals[0] ? ` · ${vals[0]}` : ""}${fileName ? ` · ${fileName}` : ""}`,
    });
    log(`${r.label} submitted for checking`);
    setOpenId(null);
    setFileName("");
  }

  function approve(r: Requirement) {
    update(r.id, { status: "verified", detail: `${r.label} checked against source today` });
    log(`${r.label} verified`);
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <Card className="p-5">
          <div className="flex flex-wrap items-center gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${fully ? "bg-ink text-bg" : "bg-tint text-ink-soft"}`}
            >
              <Icon name="shield" className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-extrabold tracking-tight">
                {fully ? "Verified on HireASub" : "Verification incomplete"}
              </p>
              <p className="text-sm text-ink-soft">
                {fully
                  ? "Clients see the verified badge on your quotes and profile."
                  : `${done} of ${items.length} checks complete${pending ? `, ${pending} in review` : ""}. Finish the rest to show the badge.`}
              </p>
            </div>
            <Pill tone={fully ? "ok" : "owed"}>{pct}%</Pill>
          </div>
          <div
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-tint"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </Card>

        <Card>
          <CardHead
            title="Checks"
            sub="Each check is matched to its source and re-run weekly"
          />
          <ul className="divide-y divide-line">
            {items.map((r) => {
              const open = openId === r.id;
              return (
                <li key={r.id} className={r.status === "expiring" || r.status === "missing" ? "bg-tint/60" : ""}>
                  <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                    <span className="min-w-0 flex-1 basis-56">
                      <span className="block text-sm font-semibold">
                        {r.label}
                      </span>
                      <span className="block text-xs text-ink-soft">
                        {r.detail}
                      </span>
                    </span>
                    <Pill tone={tone[r.status]}>{label[r.status]}</Pill>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => {
                        setOpenId(open ? null : r.id);
                        setFileName("");
                      }}
                      className={btnLight}
                    >
                      {r.status === "missing"
                        ? "Add"
                        : r.status === "review"
                          ? "Edit"
                          : "Update"}
                    </button>
                  </div>

                  {r.status === "review" && !open && (
                    <div className="flex items-center gap-3 border-t border-dashed border-line bg-bg px-5 py-2.5 text-xs text-ink-soft">
                      Checks usually clear within one business day.
                      <button
                        type="button"
                        onClick={() => approve(r)}
                        className="ml-auto font-semibold text-ink underline"
                      >
                        Demo: mark as verified
                      </button>
                    </div>
                  )}

                  {open && (
                    <form
                      onSubmit={(e) => submit(e, r)}
                      className="border-t border-line bg-bg px-5 py-5"
                    >
                      <p className="text-xs text-ink-soft">{r.why}</p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {r.fields.map((x) => (
                          <label key={x.key} className="block text-sm font-semibold">
                            {x.label}
                            <input
                              name={x.key}
                              required
                              placeholder={x.placeholder}
                              className={field}
                            />
                          </label>
                        ))}
                        <label className="block text-sm font-semibold sm:col-span-2">
                          Certificate or card (PDF or photo)
                          <span className="mt-1 flex items-center gap-3 rounded-lg border border-dashed border-ink/30 bg-surface px-3 py-3 text-sm font-normal text-ink-soft">
                            <Icon name="clip" className="h-4 w-4 shrink-0" />
                            <span className="min-w-0 flex-1 truncate">
                              {fileName || "Choose a file"}
                            </span>
                            <input
                              type="file"
                              accept=".pdf,image/*"
                              className="sr-only"
                              onChange={(e) =>
                                setFileName(e.target.files?.[0]?.name ?? "")
                              }
                            />
                          </span>
                        </label>
                      </div>
                      <div className="mt-5 flex gap-2">
                        <button type="submit" className={btnDark}>
                          Submit for checking
                        </button>
                        <button
                          type="button"
                          className={btnLight}
                          onClick={() => setOpenId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHead title="What clients see" />
          <div className="p-5">
            <div className="rounded-xl border border-line p-4">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${fully ? "bg-ink text-bg" : "bg-tint text-ink-soft"}`}
                >
                  <Icon name={fully ? "check" : "clock"} className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm font-bold">
                  {fully ? "Verified trade" : "Verification in progress"}
                </p>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-ink-soft">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-2">
                    <Icon
                      name={i.status === "verified" || i.status === "expiring" ? "check" : "clock"}
                      className="h-3.5 w-3.5 shrink-0"
                    />
                    {i.label}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Anyone can confirm a trade at <span className="font-semibold text-ink">/verify</span> using a licence number or ABN.
            </p>
          </div>
        </Card>

        <Card>
          <CardHead title="History" />
          <ul className="divide-y divide-line">
            {history.map((h, i) => (
              <li key={i} className="px-5 py-3.5">
                <p className="text-sm font-medium">{h.what}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                  {h.when}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
