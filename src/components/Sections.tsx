import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icons";
import { Magnetic } from "./Magnetic";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function ButtonLink({
  href,
  children,
  variant = "ink",
}: {
  href: string;
  children: ReactNode;
  variant?: "ink" | "ghost" | "light";
}) {
  const styles = {
    ink: "bg-ink text-bg hover:bg-ink/85",
    light: "bg-bg text-ink hover:bg-surface",
    ghost: "border border-ink/30 hover:border-ink hover:bg-tint",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-colors duration-200 ${styles}`}
    >
      {children}{" "}
      {variant !== "ghost" && <Icon name="arrow" className="h-4 w-4" />}
    </Link>
  );
}

export function CtaBand() {
  return (
    <section id="start" className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
      <div
        data-reveal
        className="relative overflow-hidden rounded-[2rem] bg-accent px-7 py-16 text-bg sm:px-14 sm:py-20"
      >
        <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1] tracking-tight">
          Post the job. Quotes land by tomorrow.
        </h2>
        <p className="mt-5 max-w-lg text-lg">
          Free to post. Describe the work, set a date, and licensed trades in
          your area send fixed quotes you can compare side by side.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Magnetic>
            <ButtonLink href="#" variant="light">
              Post a job
            </ButtonLink>
          </Magnetic>
          <Link
            href="#trades"
            className="inline-flex items-center rounded-full border border-bg/50 px-7 py-3.5 font-semibold transition-colors hover:bg-bg/10"
          >
            Join as a subcontractor
          </Link>
        </div>
      </div>
    </section>
  );
}
