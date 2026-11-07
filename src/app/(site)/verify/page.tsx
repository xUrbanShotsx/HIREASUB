import type { Metadata } from "next";
import { Eyebrow } from "@/components/Sections";
import { VerifyLookup } from "@/components/VerifyLookup";

export const metadata: Metadata = {
  title: "Verify a trade",
  description:
    "Check a subcontractor's licence, insurance and ABN before you hire them.",
};

export default function Verify() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-6 pt-16 sm:px-8 sm:pt-24">
      <div data-load>
        <Eyebrow>Verify a trade</Eyebrow>
      </div>
      <h1
        data-load
        className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5.6vw,4.8rem)] font-bold leading-[1] tracking-tight"
      >
        Check the <span className="tape">paperwork</span> before you book.
      </h1>
      <p data-load className="mt-7 max-w-xl text-lg text-ink-soft">
        Enter a licence number or ABN to see what HireASub has verified: trade
        licence, insurance cover and expiry dates, re-checked weekly.
      </p>
      <div className="mt-10">
        <VerifyLookup />
      </div>
    </section>
  );
}
