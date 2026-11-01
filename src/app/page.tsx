import {
  ChecksMock,
  JobMock,
  MilestoneMock,
  QuotesMock,
} from "@/components/Mocks";
import { ButtonLink, CtaBand, Eyebrow } from "@/components/Sections";
import { Magnetic } from "@/components/Magnetic";
import { Icon, type IconName } from "@/components/Icons";

const rows = [
  {
    n: "01",
    id: "how",
    eyebrow: "Post",
    title: "Describe the job once. Fourteen trades see it.",
    body: "Add photos, a suburb and a date. The job goes to licensed trades within range, so you are not ringing round or answering the same questions five times.",
    points: [
      "Photos and scope in one form",
      "Matched by trade, licence class and distance",
      "Questions answered on the job, not by text",
    ],
    visual: <JobMock />,
  },
  {
    n: "02",
    id: "compare",
    eyebrow: "Compare",
    title: "Fixed quotes, side by side, with the catches showing.",
    body: "Every quote is a fixed price against the same scope. Start dates, ratings and distance sit next to the number, and anything expiring is flagged before you book.",
    points: [
      "Fixed price, not an hourly guess",
      "Ratings from completed jobs only",
      "Expiring cover flagged on the quote",
    ],
    visual: <QuotesMock />,
  },
  {
    n: "03",
    id: "checks",
    eyebrow: "Checks",
    title: "Licences and insurance checked before you ever see a quote.",
    body: "We match each subcontractor against public registers and their certificates, and re-check on a schedule. If cover lapses mid-job, you and they both hear about it.",
    points: [
      "Trade licence, ABN, white card",
      "Public liability and workers comp",
      "Re-checked weekly, not once at sign-up",
    ],
    visual: <ChecksMock />,
  },
];

const trades: [string, IconName][] = [
  ["Electricians", "bell"],
  ["Plumbers", "download"],
  ["Carpenters", "home"],
  ["Concreters", "building"],
  ["Roofers", "shield"],
  ["Tilers", "id"],
  ["Painters", "book"],
  ["Landscapers", "store"],
];

export default function Home() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div data-load>
              <Eyebrow>Subcontractors for builders and owners</Eyebrow>
            </div>
            <h1
              data-load
              className="mt-6 font-display text-[clamp(2.7rem,6.4vw,5.7rem)] font-bold leading-[0.98] tracking-tight"
            >
              Hire a sub who is <span className="tape">licensed</span> and on
              site Monday.
            </h1>
            <p data-load className="mt-7 max-w-lg text-lg text-ink-soft">
              HireASub matches your job with licensed, insured trades nearby.
              Compare fixed quotes, see the paperwork checked, and pay in
              stages as the work is signed off.
            </p>
            <div data-load className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <ButtonLink href="#start">Post a job</ButtonLink>
              </Magnetic>
              <ButtonLink href="#how" variant="ghost">
                See how it works
              </ButtonLink>
            </div>
          </div>
          <div data-load>
            <div data-parallax="6">
              <div className="float">
                <QuotesMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* scope strip */}
      <div className="overflow-hidden border-y border-line bg-tint py-4 font-mono text-xs uppercase tracking-[0.18em]">
        <ul
          className="marquee flex w-max gap-10 whitespace-nowrap"
          aria-label="What HireASub covers"
        >
          {[0, 1, 2, 3].flatMap((k) =>
            [
              "Licence checks",
              "Insurance checks",
              "Fixed quotes",
              "Milestone payments",
              "Verified reviews",
              "Same-week starts",
            ].map((t) => (
              <li
                key={`${k}-${t}`}
                className="flex items-center gap-10"
                aria-hidden={k > 0}
              >
                {t}
                <span className="text-accent">/</span>
              </li>
            )),
          )}
        </ul>
      </div>

      {/* problem */}
      <section className="mx-auto mt-28 grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
        <div data-reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
            Finding a good sub shouldn&apos;t take a week of phone tag.
          </h2>
          <p className="mt-6 max-w-md text-ink-soft">
            A mate&apos;s number, a Facebook group, a quote on the back of an
            envelope. Nobody checks the licence until something goes wrong, and
            by then the trade has moved on.
          </p>
        </div>
        <div data-reveal className="relative min-h-72 sm:min-h-80">
          {[
            [
              "Dave the sparky",
              "no reply since Tuesday",
              "left-0 top-2 -rotate-3",
            ],
            [
              "Quote_final_v3.jpg",
              "no licence number, no end date",
              "right-0 top-24 rotate-2",
            ],
            [
              "Insurance cert?",
              "“yeah I’ll send it through”",
              "left-6 bottom-0 -rotate-1",
            ],
          ].map(([t, s, pos]) => (
            <div
              key={t}
              className={`absolute w-64 max-w-[80%] border border-line bg-surface p-4 shadow-md ${pos}`}
            >
              <p className="font-mono text-xs uppercase tracking-wider">{t}</p>
              <p className="mt-1 text-sm text-ink-soft">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* feature rows */}
      <section className="mx-auto mt-28 max-w-6xl space-y-28 px-5 sm:px-8">
        {rows.map((r, i) => (
          <div
            key={r.n}
            id={r.id}
            className="grid scroll-mt-28 grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-2"
          >
            <div data-reveal className={i % 2 ? "lg:order-2" : ""}>
              <p className="font-mono text-sm text-ink-soft">{r.n}</p>
              <div className="mt-3">
                <Eyebrow>{r.eyebrow}</Eyebrow>
              </div>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-tight">
                {r.title}
              </h2>
              <p className="mt-5 max-w-md text-ink-soft">{r.body}</p>
              <ul
                data-stagger
                className="mt-6 divide-y divide-line border-y border-line"
              >
                {r.points.map((p) => (
                  <li key={p} className="row-hover py-3 text-sm font-medium">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>{r.visual}</div>
          </div>
        ))}
      </section>

      {/* how it works */}
      <section className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div data-reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
            Three steps from job to signed off.
          </h2>
        </div>
        <ol
          data-stagger
          className="mt-12 grid gap-10 border-t border-ink pt-8 md:grid-cols-3"
        >
          {[
            [
              "Post",
              "Describe the work, add photos, pick a date. It takes about five minutes.",
            ],
            [
              "Book",
              "Compare fixed quotes from checked trades and book the one you want.",
            ],
            [
              "Sign off",
              "Pay in stages. Each release waits for your sign-off on the work.",
            ],
          ].map(([t, d], i) => (
            <li key={t}>
              <span className="font-mono text-sm text-ink-soft">
                Step {i + 1}
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold">{t}</h3>
              <p className="mt-3 max-w-xs text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* payments */}
      <section className="mt-28 bg-ink py-24 text-bg">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div data-reveal>
            <Eyebrow>Paid in stages</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
              Money moves when the work does.
            </h2>
            <p className="mt-6 max-w-md text-bg/75">
              The deposit is held, not handed over. Each milestone is released
              when you sign it off, and a dispute freezes the rest until it is
              sorted. Subs get paid on time, owners keep control.
            </p>
            <div className="mt-8">
              <ButtonLink href="#start" variant="light">
                Post a job
              </ButtonLink>
            </div>
          </div>
          <div data-reveal>
            <MilestoneMock />
          </div>
        </div>
      </section>

      {/* trades */}
      <section id="trades" className="mx-auto mt-28 max-w-6xl scroll-mt-28 px-5 sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div data-reveal>
            <Eyebrow>For subcontractors</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
              Fill your calendar with jobs that are already scoped.
            </h2>
            <p className="mt-6 max-w-md text-ink-soft">
              Upload your licence and cover once. Quote on jobs near you, keep
              your rate, and get paid by milestone instead of chasing invoices.
            </p>
            <div className="mt-8">
              <ButtonLink href="#start" variant="ghost">
                Join as a subcontractor
              </ButtonLink>
            </div>
          </div>
          <ul
            data-stagger
            className="grid grid-cols-2 border-t border-ink sm:grid-cols-4 lg:grid-cols-2"
          >
            {trades.map(([t, icon]) => (
              <li key={t} className="border-b border-line">
                <span className="row-hover flex items-center gap-3 py-4 font-display text-lg font-bold">
                  <Icon name={icon} className="h-5 w-5 text-accent" />
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
