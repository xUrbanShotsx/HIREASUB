import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { btnDark, btnLight, Card, PageHeading } from "@/components/app/ui";
import { Invoices } from "@/components/app/Invoices";
import { MyJobs, PostJob, ResetDemo } from "@/components/app/SeekerViews";
import { Alerts, MyOffers, ServiceAreaCard, Work } from "@/components/app/SubViews";
import { VerificationPanel } from "@/components/app/VerificationPanel";
import { people, sections } from "@/lib/dashboard";
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
      <PageHeading title={s.title} sub={s.sub} />

      {s.kind === "post" && <PostJob />}
      {s.kind === "myjobs" && <MyJobs />}
      {s.kind === "alerts" && <Alerts />}
      {s.kind === "offers" && <MyOffers />}
      {s.kind === "work" && <Work />}
      {s.kind === "invoices" && <Invoices role={r} />}
      {s.kind === "verification" && <VerificationPanel role={r} />}

      {s.kind === "settings" && (
        <div className="space-y-6">
          {r === "subcontractor" && <ServiceAreaCard />}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <h2 className="font-display text-base font-extrabold">Business</h2>
              <div className="mt-4 space-y-4">
                {[
                  ["Business name", people[r].company],
                  ["Contact name", people[r].name],
                  ["Email", "you@example.com.au"],
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
              <h2 className="font-display text-base font-extrabold">Notifications</h2>
              <ul className="mt-4 divide-y divide-line">
                {(r === "subcontractor"
                  ? [
                      "New jobs inside my service area",
                      "Offer approved or declined",
                      "Invoice paid",
                      "Licence and cover expiry reminders",
                    ]
                  : [
                      "New offers on my jobs",
                      "Job marked complete",
                      "Invoice received",
                    ]
                ).map((t) => (
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
          <ResetDemo />
        </div>
      )}
    </>
  );
}
