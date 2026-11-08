import type { ReactNode } from "react";
import { Icon } from "../Icons";
import type { Tone } from "@/lib/dashboard";

export function Pill({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  const styles: Record<Tone, string> = {
    ok: "bg-ink/[0.06] text-ink",
    owed: "bg-accent/15 text-ink",
    neutral: "bg-tint text-ink-soft",
    solid: "bg-ink text-bg",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[tone]}`}
    >
      {tone === "ok" && <Icon name="check" className="h-3 w-3" />}
      {tone === "owed" && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}

export function Avatar({ initials }: { initials: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-ink"
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-line bg-surface ${className}`}
    >
      {children}
    </section>
  );
}

export function CardHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="border-b border-line px-5 py-4">
      <h2 className="font-display text-base font-extrabold tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-0.5 text-xs text-ink-soft">{sub}</p>}
    </div>
  );
}

export function Stat({
  label,
  value,
  note,
  owed,
}: {
  label: string;
  value: string;
  note?: string;
  owed?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-xs font-medium text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-2xl font-extrabold tabular-nums tracking-tight xl:text-3xl">
        {value}
      </p>
      {note && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-soft">
          {owed && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
          {note}
        </p>
      )}
    </div>
  );
}

export function PageHeading({
  title,
  sub,
}: {
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {sub && <p className="mt-1 text-sm text-ink-soft">{sub}</p>}
      </div>
    </div>
  );
}

export const btn =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200";
export const btnDark = `${btn} bg-ink text-bg hover:bg-ink/85`;
export const btnLight = `${btn} border border-line bg-surface hover:bg-tint`;
