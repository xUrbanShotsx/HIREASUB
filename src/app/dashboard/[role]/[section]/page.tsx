import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, PageHeading, Stat, Table, btnDark, btnLight } from "@/components/app/ui";
import { VerificationPanel } from "@/components/app/VerificationPanel";
import { people, scheduleDays, sections } from "@/lib/dashboard";
import { roleKeys, roles, type Role } from "@/lib/roles";

export function generateStaticParams() {
  return roleKeys.flatMap((role) =>
    sections[role]
      .filter((s) => s.slug)
      .map((s) => ({ role, section: s.slug })),
  );
}

function find(role: string, slug: string) {
  if (!(role in roles)) return undefined;
  return sections[role as Role].find((s) => s.slug && s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string; section: string }>;
}): Promise<Metadata> {
  const { role, section } = await params;
  return { title: find(role, section)?.title ?? "Dashboard" };
}

const input =
  "mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-ink focus:border-ink";

export default async function Section({
  params,
}: {
  params: Promise<{ role: string; section: string }>;
}) {
  const { role, section } = await params;
  const s = find(role, section);
  if (!s) notFound();
  const r = role as Role;

  return (
    <>
      <PageHeading title={s.title} sub={s.sub} action={s.action} />

      {s.stats && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {s.stats.map(([label, value, note]) => (
            <Stat key={label} label={label} value={value} note={note} />
          ))}
        </div>
      )}

      {s.kind === "verification" && <VerificationPanel role={r} />}

      {s.kind === "schedule" && (
        <Card>
          <div className="grid divide-y divide-line md:grid-cols-7 md:divide-x md:divide-y-0">
            {scheduleDays[r].map((d) => (
              <div key={d.day} className="min-h-24 p-3 md:min-h-64">
                <p className="flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                  {d.day}
                  <span className="font-display text-lg font-extrabold text-ink">
                    {d.date}
                  </span>
                </p>
                <ul className="mt-3 space-y-2">
                  {d.events.map((e) => (
                    <li
                      key={e.t}
                      className={`rounded-lg px-2.5 py-2 text-xs ${
                        e.tone === "accent"
                          ? "bg-accent text-bg"
                          : "bg-ink text-bg"
                      }`}
                    >
                      <span className="block font-semibold">{e.t}</span>
                      <span className="block opacity-75">{e.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}

      {s.kind === "settings" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="font-display text-base font-extrabold">Business</h2>
            <div className="mt-4 space-y-4">
              {[
                ["Business name", people[r].company],
                ["Contact name", people[r].name],
                ["Email", "you@example.com.au"],
                ["Service area", "Inner west, 25 km radius"],
              ].map(([k, v]) => (
                <label key={k} className="block text-sm font-semibold">
                  {k}
                  <input defaultValue={v} className={input} />
                </label>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button type="button" className={btnDark}>
                Save changes
              </button>
              <button type="button" className={btnLight}>
                Cancel
              </button>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-display text-base font-extrabold">
              Notifications
            </h2>
            <ul className="mt-4 divide-y divide-line">
              {[
                "New jobs matching my trade",
                "Quote viewed or accepted",
                "Milestone released",
                "Licence and cover expiry reminders",
              ].map((t) => (
                <li key={t} className="flex items-center justify-between py-3 text-sm">
                  {t}
                  <input
                    type="checkbox"
                    defaultChecked
                    aria-label={t}
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {s.cols && s.rows && (
        <Card>
          <Table cols={s.cols} rows={s.rows} />
        </Card>
      )}
    </>
  );
}
