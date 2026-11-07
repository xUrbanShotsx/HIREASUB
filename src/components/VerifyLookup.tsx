"use client";

import { useState } from "react";
import { Icon } from "./Icons";
import { register } from "@/lib/verification";

type Result = (typeof register)[number] | "none" | null;

export function VerifyLookup() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<Result>(null);

  function search(e: React.FormEvent) {
    e.preventDefault();
    const n = q.trim().toLowerCase();
    if (!n) return;
    setResult(
      register.find((r) => (r.match as readonly string[]).includes(n)) ?? "none",
    );
  }

  return (
    <div>
      <form onSubmit={search} className="flex max-w-xl flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Licence number or ABN</span>
          <Icon
            name="search"
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Licence number or ABN"
            className="w-full rounded-full border border-line bg-surface py-3.5 pl-11 pr-4 focus:border-ink"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-ink px-7 py-3.5 font-semibold text-bg transition-colors hover:bg-ink/85"
        >
          Verify
        </button>
      </form>
      <p className="mt-3 font-mono text-xs uppercase tracking-wider text-ink-soft">
        Demo: try EC-48213 or 214871C
      </p>

      <div className="mt-10" aria-live="polite">
        {result === "none" && (
          <div className="max-w-xl rounded-2xl border border-line bg-tint/60 p-6">
            <p className="font-display text-xl font-bold">No match found</p>
            <p className="mt-2 text-ink-soft">
              We could not find a verified trade with that number. Check the
              number and try again, or ask the trade to verify on HireASub
              before you book.
            </p>
          </div>
        )}
        {result && result !== "none" && (
          <div className="max-w-xl overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex items-center gap-4 border-b border-line p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-bg">
                <Icon name="shield" className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-2xl font-bold leading-tight">
                  {result.name}
                </p>
                <p className="text-sm text-ink-soft">
                  {result.trade} · {result.area}
                </p>
              </div>
            </div>
            <ul className="divide-y divide-line">
              {result.checks.map(([k, v, d, s]) => (
                <li
                  key={k}
                  className={`flex items-center gap-3 px-6 py-4 ${s === "soon" ? "bg-tint/60" : ""}`}
                >
                  <Icon
                    name={s === "ok" ? "check" : "clock"}
                    className={`h-5 w-5 shrink-0 ${s === "ok" ? "text-ink-soft" : "text-accent"}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{k}</span>
                    <span className="block text-sm text-ink-soft">
                      {v} · {d}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              Last checked {result.checked}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
