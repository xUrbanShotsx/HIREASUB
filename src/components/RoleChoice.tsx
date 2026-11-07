import Link from "next/link";
import { Icon, type IconName } from "./Icons";
import { Eyebrow } from "./Sections";
import { roleKeys, roles } from "@/lib/roles";

const icons: Record<(typeof roleKeys)[number], IconName> = {
  subcontractor: "users",
  "sole-trader": "user",
};

export function RoleChoice({
  eyebrow,
  title,
  note,
  alt,
}: {
  eyebrow: string;
  title: string;
  note: string;
  alt: { text: string; href: string; label: string };
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-6 pt-16 sm:px-8 sm:pt-24">
      <div data-load>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h1
        data-load
        className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5.6vw,4.8rem)] font-bold leading-[1] tracking-tight"
      >
        {title}
      </h1>
      <p data-load className="mt-7 max-w-xl text-lg text-ink-soft">
        {note}
      </p>

      <ul
        data-stagger
        className="mt-12 grid gap-5 border-t border-ink pt-8 md:grid-cols-2"
      >
        {roleKeys.map((k) => (
          <li key={k}>
            <Link
              href={`/dashboard/${k}`}
              className="lift group block h-full rounded-[1.5rem] border border-line bg-surface p-7 hover:border-ink"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tint text-accent">
                <Icon name={icons[k]} className="h-6 w-6" />
              </span>
              <span className="mt-6 block font-display text-3xl font-bold">
                {roles[k].label}
              </span>
              <span className="mt-2 block max-w-xs text-ink-soft">
                {roles[k].blurb}
              </span>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                Continue as {roles[k].label.toLowerCase()}
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-ink-soft">
        {alt.text}{" "}
        <Link href={alt.href} className="font-semibold text-ink underline">
          {alt.label}
        </Link>
      </p>
    </section>
  );
}
