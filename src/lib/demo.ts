"use client";

import { useSyncExternalStore } from "react";
import { km } from "./geo";

/* ------------------------------------------------------------------ */
/* Demo store. No backend yet, so jobs, offers and invoices live in    */
/* localStorage and are shared by both dashboards in the same browser. */
/* ------------------------------------------------------------------ */

export const trades = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Concreter",
  "Tiler",
  "Painter",
  "Roofer",
  "Landscaper",
] as const;

export type Review = { by: string; job: string; rating: number; text: string; date: string };
export type PastJob = { title: string; where: string; date: string };

export type Sub = {
  id: string;
  name: string;
  owner: string;
  trade: string;
  base: string;
  radius: number;
  rateHour: number;
  rateDay: number;
  rating: number;
  jobsDone: number;
  licence: string;
  bio: string;
  verified: string[];
  reviews: Review[];
  pastJobs: PastJob[];
};

export type Offer = {
  id: string;
  subId: string;
  rateType: "hour" | "day";
  rate: number;
  note: string;
  status: "pending" | "approved" | "declined";
};

export type Invoice = {
  number: string;
  qty: number;
  rateType: "hour" | "day";
  rate: number;
  note: string;
  sent: string;
  paid: boolean;
};

export type JobStatus = "open" | "booked" | "complete" | "invoiced" | "paid";

export type Job = {
  id: string;
  title: string;
  trade: string;
  where: string;
  date: string;
  days: number;
  desc: string;
  status: JobStatus;
  alerted: number;
  offers: Offer[];
  invoice?: Invoice;
};

type State = { me: Sub; jobs: Job[] };

export const OTHER_SUBS: Sub[] = [
  {
    id: "illawarra",
    name: "Illawarra Sparks",
    owner: "Mark Tran",
    trade: "Electrician",
    base: "wollongong",
    radius: 40,
    rateHour: 90,
    rateDay: 700,
    rating: 4.8,
    jobsDone: 140,
    licence: "EC-39102",
    bio: "Residential and light commercial electrical. Two-person crew, available most weeks with short notice for repairs and switchboards.",
    verified: ["Trade licence", "Public liability $20M", "Workers compensation", "ABN and GST"],
    reviews: [
      { by: "Carter Homes", job: "Granny flat, Figtree", rating: 5, text: "Turned up when they said, tidy board, all certificates handed over.", date: "Oct 2026" },
      { by: "L. Ng", job: "Kitchen circuits, Corrimal", rating: 5, text: "Quote matched the invoice to the dollar.", date: "Sep 2026" },
      { by: "R. Singh", job: "Pool pump, Thirroul", rating: 4, text: "Good work, a day late starting.", date: "Aug 2026" },
    ],
    pastJobs: [
      { title: "Granny flat rough-in and fit-off", where: "Figtree", date: "Oct 2026" },
      { title: "Switchboard upgrade", where: "Corrimal", date: "Sep 2026" },
      { title: "Outdoor lighting", where: "Thirroul", date: "Aug 2026" },
    ],
  },
  {
    id: "kowalski",
    name: "Dan Kowalski Electrical",
    owner: "Dan Kowalski",
    trade: "Electrician",
    base: "nowra",
    radius: 50,
    rateHour: 85,
    rateDay: 640,
    rating: 4.7,
    jobsDone: 96,
    licence: "EC-27718",
    bio: "Sole operator working the South Coast from Nowra to Kiama. Rural and residential, solar and battery installs.",
    verified: ["Trade licence", "Public liability $10M", "ABN and GST"],
    reviews: [
      { by: "M. Haddad", job: "Solar and battery, Berry", rating: 5, text: "Explained everything, finished a day early.", date: "Oct 2026" },
      { by: "K. Brown", job: "Shed power, Kangaroo Valley", rating: 4, text: "Fair price, good communication.", date: "Jul 2026" },
    ],
    pastJobs: [
      { title: "Solar and battery install", where: "Berry", date: "Oct 2026" },
      { title: "Shed power and lighting", where: "Kangaroo Valley", date: "Jul 2026" },
    ],
  },
  {
    id: "brightspark",
    name: "Bright Spark Co",
    owner: "Priya Nair",
    trade: "Electrician",
    base: "parramatta",
    radius: 30,
    rateHour: 105,
    rateDay: 800,
    rating: 4.9,
    jobsDone: 188,
    licence: "EC-51407",
    bio: "Western Sydney electricians covering Parramatta, Penrith and the inner west.",
    verified: ["Trade licence", "Public liability $20M", "Workers compensation", "ABN and GST"],
    reviews: [
      { by: "Parker Fitouts", job: "Office lighting, Rydalmere", rating: 5, text: "Professional crew, zero rework.", date: "Oct 2026" },
    ],
    pastJobs: [{ title: "Office lighting retrofit", where: "Rydalmere", date: "Oct 2026" }],
  },
  {
    id: "southern",
    name: "Southern Plumbing Co",
    owner: "Tom Bell",
    trade: "Plumber",
    base: "kiama",
    radius: 35,
    rateHour: 88,
    rateDay: 660,
    rating: 4.8,
    jobsDone: 121,
    licence: "PL-88231",
    bio: "Plumbing and gasfitting from Kiama down to Nowra.",
    verified: ["Trade licence", "Public liability $20M", "ABN and GST"],
    reviews: [
      { by: "A. Rossi", job: "Hot water, Kiama", rating: 5, text: "Quick and clean.", date: "Oct 2026" },
    ],
    pastJobs: [{ title: "Hot water replacement", where: "Kiama", date: "Oct 2026" }],
  },
];

const ME: Sub = {
  id: "me",
  name: "Coastline Electrical",
  owner: "Sam Hartley",
  trade: "Electrician",
  base: "shellharbour",
  radius: 30,
  rateHour: 95,
  rateDay: 720,
  rating: 4.9,
  jobsDone: 212,
  licence: "EC-48213",
  bio: "Licensed electricians on the Illawarra coast. Switchboards, rewires, fit-outs and fault finding. Crew of four, on site most weeks within a day or two.",
  verified: ["Trade licence", "Public liability $20M", "Workers compensation", "White cards", "ABN and GST"],
  reviews: [
    { by: "Carter Homes", job: "Granny flat, Dulwich Hill", rating: 5, text: "On time, clean, labelled the board properly.", date: "Oct 2026" },
    { by: "L. Ng", job: "Kitchen circuits, Leichhardt", rating: 5, text: "Quote matched the invoice to the dollar.", date: "Sep 2026" },
    { by: "M. Haddad", job: "Pool pump, Burwood", rating: 4, text: "Good work, arrived an hour late.", date: "Aug 2026" },
  ],
  pastJobs: [
    { title: "Granny flat rough-in and fit-off", where: "Dulwich Hill", date: "Oct 2026" },
    { title: "Kitchen circuits", where: "Leichhardt", date: "Sep 2026" },
    { title: "Pool pump install", where: "Burwood", date: "Aug 2026" },
  ],
};

function seed(): State {
  return {
    me: ME,
    jobs: [
      {
        id: "j-seed-2",
        title: "Fix tripping switchboard",
        trade: "Electrician",
        where: "albionpark",
        date: "2026-11-10",
        days: 1,
        desc: "Main switch trips when the oven and dryer run together. Needs fault finding and probably a new RCD.",
        status: "booked",
        alerted: 3,
        offers: [{ id: "o-seed-2", subId: "me", rateType: "day", rate: 720, note: "Can start Tuesday morning.", status: "approved" }],
      },
      {
        id: "j-seed-1",
        title: "Rewire laundry",
        trade: "Electrician",
        where: "shellharbour",
        date: "2026-10-27",
        days: 2,
        desc: "Strip and rewire laundry circuits, new power points and downlights.",
        status: "paid",
        alerted: 2,
        offers: [{ id: "o-seed-1", subId: "me", rateType: "day", rate: 720, note: "", status: "approved" }],
        invoice: { number: "INV-1041", qty: 2, rateType: "day", rate: 720, note: "Laundry rewire, 2 days", sent: "2026-10-30", paid: true },
      },
    ],
  };
}

/* ------------------------------ store ------------------------------ */

const KEY = "hireasub-demo-v1";
const SEED = seed();
let state: State = SEED;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = JSON.parse(raw) as State;
  } catch {
    /* ignore corrupt or blocked storage */
  }
}

function commit(next: State) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked, keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    try {
      state = e.newValue ? (JSON.parse(e.newValue) as State) : seed();
    } catch {
      return;
    }
    listeners.forEach((l) => l());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function snapshot() {
  load();
  return state;
}

export function useDemo(): State {
  return useSyncExternalStore(subscribe, snapshot, () => SEED);
}

/* ----------------------------- helpers ----------------------------- */

export const allSubs = (s: State): Sub[] => [s.me, ...OTHER_SUBS];
export const subById = (s: State, id: string): Sub | undefined =>
  allSubs(s).find((x) => x.id === id);

export const matchesMe = (s: State, j: Job) =>
  j.status === "open" && j.trade === s.me.trade && km(j.where, s.me.base) <= s.me.radius;

export const myOffer = (j: Job) => j.offers.find((o) => o.subId === "me");

export const hired = (j: Job) => j.offers.find((o) => o.status === "approved");

export const estTotal = (o: Pick<Offer, "rateType" | "rate">, days: number) =>
  o.rate * (o.rateType === "day" ? days : days * 8);

export const money = (n: number) => `$${Math.round(n).toLocaleString("en-AU")}`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]}`;
}

export const rateLabel = (o: Pick<Offer, "rateType" | "rate">) =>
  `${money(o.rate)}/${o.rateType === "day" ? "day" : "hr"}`;

export const invoiceTotals = (i: Invoice) => {
  const sub = i.qty * i.rate;
  const gst = Math.round(sub * 0.1);
  return { sub, gst, total: sub + gst };
};

/* ----------------------------- actions ----------------------------- */

const uid = (p: string) => `${p}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;

const patchJob = (id: string, fn: (j: Job) => Job) =>
  commit({ ...state, jobs: state.jobs.map((j) => (j.id === id ? fn(j) : j)) });

/** Sole trader posts a job. Subs whose radius covers it are alerted; the demo fills in offers for the other seeded subs. */
export function postJob(i: {
  title: string;
  trade: string;
  where: string;
  date: string;
  days: number;
  desc: string;
}): { id: string; alerted: number } {
  const inRange = allSubs(state).filter(
    (s) => s.trade === i.trade && km(i.where, s.base) <= s.radius,
  );
  const offers: Offer[] = inRange
    .filter((s) => s.id !== "me")
    .map((s, n) => ({
      id: uid("o"),
      subId: s.id,
      rateType: n % 2 ? ("hour" as const) : ("day" as const),
      rate: n % 2 ? s.rateHour : s.rateDay,
      note: "Available this week.",
      status: "pending" as const,
    }));
  const job: Job = {
    id: uid("j"),
    ...i,
    status: "open",
    alerted: inRange.length,
    offers,
  };
  commit({ ...state, jobs: [job, ...state.jobs] });
  return { id: job.id, alerted: inRange.length };
}

export function makeOffer(jobId: string, rateType: "hour" | "day", rate: number, note: string) {
  patchJob(jobId, (j) => ({
    ...j,
    offers: [
      ...j.offers.filter((o) => o.subId !== "me"),
      { id: uid("o"), subId: "me", rateType, rate, note, status: "pending" },
    ],
  }));
}

export function approveOffer(jobId: string, offerId: string) {
  patchJob(jobId, (j) => ({
    ...j,
    status: "booked",
    offers: j.offers.map((o) =>
      o.id === offerId ? { ...o, status: "approved" } : { ...o, status: "declined" },
    ),
  }));
}

export function declineOffer(jobId: string, offerId: string) {
  patchJob(jobId, (j) => ({
    ...j,
    offers: j.offers.map((o) => (o.id === offerId ? { ...o, status: "declined" } : o)),
  }));
}

export function completeJob(jobId: string) {
  patchJob(jobId, (j) => ({ ...j, status: "complete" }));
}

export function submitInvoice(jobId: string, qty: number, note: string) {
  patchJob(jobId, (j) => {
    const o = hired(j);
    if (!o) return j;
    const n = 1040 + state.jobs.filter((x) => x.invoice).length + 1;
    return {
      ...j,
      status: "invoiced",
      invoice: {
        number: `INV-${n}`,
        qty,
        rateType: o.rateType,
        rate: o.rate,
        note,
        sent: new Date().toISOString().slice(0, 10),
        paid: false,
      },
    };
  });
}

export function payInvoice(jobId: string) {
  patchJob(jobId, (j) =>
    j.invoice ? { ...j, status: "paid", invoice: { ...j.invoice, paid: true } } : j,
  );
}

export function updateMe(patch: Partial<Pick<Sub, "trade" | "base" | "radius" | "rateHour" | "rateDay">>) {
  commit({ ...state, me: { ...state.me, ...patch } });
}

export function resetDemo() {
  commit(seed());
}
