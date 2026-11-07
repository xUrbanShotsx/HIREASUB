import type { IconName } from "@/components/Icons";
import type { Role } from "./roles";

export type Tone = "ok" | "owed" | "neutral" | "solid";
export type Cell = string | { pill: string; tone: Tone };

export type Section = {
  slug: string;
  label: string;
  icon: IconName;
  title: string;
  sub: string;
  action?: string;
  stats?: [string, string, string?][];
  kind?: "table" | "schedule" | "settings" | "verification";
  cols?: string[];
  rows?: Cell[][];
};

export type NavGroup = { label?: string; slugs: string[] };

export type Person = {
  name: string;
  initials: string;
  role: string;
  company: string;
};

const p = (pill: string, tone: Tone = "neutral"): Cell => ({ pill, tone });

const jobCols = ["Job", "Where", "Trade", "Budget", "Start", "Status"];

const findJobs: Section = {
  slug: "jobs",
  label: "Find jobs",
  icon: "search",
  title: "Find jobs",
  sub: "Open jobs matched to your trade, licence class and service area.",
  action: "Set alerts",
  stats: [
    ["Matched to you", "9", "within 25 km"],
    ["Posted today", "3"],
    ["Closing soon", "2", "quote by Fri"],
  ],
  cols: jobCols,
  rows: [
    ["Switchboard upgrade", "Marrickville", "Electrician", "$3k to $4.5k", "Mon 9 Nov", p("New", "owed")],
    ["Rewire, 2 storey terrace", "Newtown", "Electrician", "$9k to $12k", "Mon 16 Nov", p("New", "owed")],
    ["Replace hot water system", "Petersham", "Plumber", "$2k to $3.5k", "Within 2 wks", p("New", "owed")],
    ["Retaining wall, 14 m", "Dulwich Hill", "Concreter", "$14k to $18k", "Late Nov", p("Open")],
    ["Bathroom reno, wet area", "Stanmore", "Tiler", "$6k to $8k", "Wed 18 Nov", p("Open")],
    ["Roof restoration", "Enmore", "Roofer", "$11k to $15k", "Dec", p("Closing soon", "owed")],
  ],
};

const quotes: Section = {
  slug: "quotes",
  label: "My quotes",
  icon: "file",
  title: "My quotes",
  sub: "Every quote you have sent and where it stands.",
  action: "New quote",
  stats: [
    ["Out", "5"],
    ["Won this month", "7"],
    ["Win rate", "42%", "last 90 days"],
  ],
  cols: ["Job", "Client", "Sent", "Amount", "Status"],
  rows: [
    ["Commercial lighting, Alexandria", "Parker Fitouts", "Thu 5 Nov", "$18,900", p("Waiting")],
    ["Switchboard upgrade, Marrickville", "A. Rossi", "Fri 6 Nov", "$3,850", p("Viewed", "owed")],
    ["Granny flat, Dulwich Hill", "Carter Homes", "28 Oct", "$11,200", p("Accepted", "ok")],
    ["Kitchen circuits, Leichhardt", "L. Ng", "24 Oct", "$2,400", p("Accepted", "ok")],
    ["Pool pump install, Burwood", "M. Haddad", "19 Oct", "$1,150", p("Declined")],
  ],
};

const schedule: Section = {
  slug: "schedule",
  label: "Schedule",
  icon: "calendar",
  title: "Schedule",
  sub: "Week of Monday 9 November.",
  action: "Block time off",
  kind: "schedule",
};

const payments: Section = {
  slug: "payments",
  label: "Payments",
  icon: "wallet",
  title: "Payments",
  sub: "Milestones held in escrow and released to you.",
  action: "Export statement",
  stats: [
    ["Held in escrow", "$4,310", "3 jobs"],
    ["Awaiting sign-off", "$6,420", "2 milestones"],
    ["Paid this month", "$21,780"],
  ],
  cols: ["Job", "Milestone", "Amount", "Date", "Status"],
  rows: [
    ["Granny flat, Dulwich Hill", "Final sign-off", "$3,400", "Requested", p("Awaiting client", "owed")],
    ["Kitchen circuits, Leichhardt", "Deposit", "$720", "Held", p("In escrow")],
    ["Rewire, Stanmore", "Rough-in complete", "$3,020", "Held", p("In escrow")],
    ["Switchboard, Enmore", "Final", "$2,150", "2 Nov", p("Paid", "ok")],
    ["Lighting, Camperdown", "Deposit", "$1,800", "27 Oct", p("Paid", "ok")],
  ],
};

const reviews: Section = {
  slug: "reviews",
  label: "Reviews",
  icon: "star",
  title: "Reviews",
  sub: "Ratings from completed jobs only.",
  stats: [
    ["Rating", "4.9", "212 jobs"],
    ["Repeat clients", "38%"],
    ["On-time starts", "97%"],
  ],
  cols: ["Client", "Job", "Rating", "Comment"],
  rows: [
    ["Carter Homes", "Granny flat", "5.0", "On time, clean, labelled the board properly."],
    ["L. Ng", "Kitchen circuits", "5.0", "Quote matched the invoice to the dollar."],
    ["M. Haddad", "Pool pump", "4.0", "Good work, arrived an hour late."],
  ],
};

const verification: Section = {
  slug: "verification",
  label: "Verification",
  icon: "shield",
  title: "Verification",
  sub: "Licence, insurance and ID checks that clients see on your profile.",
  kind: "verification",
};

const crew: Section = {
  slug: "crew",
  label: "Crew",
  icon: "users",
  title: "Crew",
  sub: "The people you send to site.",
  action: "Add crew member",
  stats: [
    ["On site today", "3"],
    ["Crew", "4"],
  ],
  cols: ["Name", "Role", "White card", "Today"],
  rows: [
    ["Sam Hartley", "Licensed electrician", p("Valid", "ok"), "Marrickville"],
    ["Priya Nair", "Licensed electrician", p("Valid", "ok"), "Newtown"],
    ["Tom Bell", "Apprentice, year 3", p("Valid", "ok"), "Newtown"],
    ["Liam Ward", "Labourer", p("Renew soon", "owed"), "Off"],
  ],
};

const settings: Section = {
  slug: "settings",
  label: "Settings",
  icon: "settings",
  title: "Settings",
  sub: "Business details, service area and notifications.",
  kind: "settings",
};

const overview: Section = {
  slug: "",
  label: "Overview",
  icon: "grid",
  title: "Overview",
  sub: "",
};

export const people: Record<Role, Person> = {
  subcontractor: {
    name: "Sam Hartley",
    initials: "SH",
    role: "Owner",
    company: "Hartley Electrical",
  },
  "sole-trader": {
    name: "Jay Mitchell",
    initials: "JM",
    role: "Plumber and gasfitter",
    company: "Jay Mitchell Plumbing",
  },
};

export const sections: Record<Role, Section[]> = {
  subcontractor: [overview, findJobs, quotes, schedule, crew, payments, reviews, verification, settings],
  "sole-trader": [overview, findJobs, quotes, schedule, payments, reviews, verification, settings],
};

export const navGroups: Record<Role, NavGroup[]> = {
  subcontractor: [
    { slugs: ["", "jobs", "quotes", "schedule"] },
    { label: "Business", slugs: ["crew", "payments", "reviews", "verification"] },
  ],
  "sole-trader": [
    { slugs: ["", "jobs", "quotes", "schedule"] },
    { label: "Business", slugs: ["payments", "reviews", "verification"] },
  ],
};

export type Overview = {
  greeting: string;
  sub: string;
  stats: { label: string; value: string; note: string; owed?: boolean }[];
  attention: { t: string; d: string; tag: string; tone: Tone }[];
  earnings: { m: string; v: number }[];
  week: { day: string; items: string[] }[];
  docs: { t: string; d: string; warn?: boolean }[];
};

export const overviews: Record<Role, Overview> = {
  subcontractor: {
    greeting: "Sam",
    sub: "Here is what needs you today at Hartley Electrical.",
    stats: [
      { label: "New jobs near you", value: "9", note: "3 posted today" },
      { label: "Quotes out", value: "5", note: "$38,250 pending" },
      { label: "On site today", value: "3", note: "of 4 crew" },
      { label: "Awaiting sign-off", value: "$6,420", note: "2 milestones", owed: true },
    ],
    attention: [
      { t: "Final sign-off requested", d: "Granny flat, Dulwich Hill · $3,400", tag: "Action", tone: "owed" },
      { t: "Workers compensation expires 30 Nov", d: "Upload the renewal certificate", tag: "Renew", tone: "owed" },
      { t: "Quote viewed by A. Rossi", d: "Switchboard upgrade, Marrickville · $3,850", tag: "Viewed", tone: "neutral" },
      { t: "New job matched", d: "Rewire, 2 storey terrace, Newtown · 8 km", tag: "New", tone: "solid" },
    ],
    earnings: [
      { m: "Jun", v: 14 },
      { m: "Jul", v: 19 },
      { m: "Aug", v: 17 },
      { m: "Sep", v: 24 },
      { m: "Oct", v: 22 },
      { m: "Nov", v: 12 },
    ],
    week: [
      { day: "Mon", items: ["Marrickville switchboard", "Newtown rewire"] },
      { day: "Tue", items: ["Newtown rewire"] },
      { day: "Wed", items: ["Dulwich Hill sign-off"] },
      { day: "Thu", items: [] },
    ],
    docs: [
      { t: "Trade licence", d: "Active until Aug 2027" },
      { t: "Public liability", d: "$20M · expires Mar 2027" },
      { t: "Workers compensation", d: "Expires 30 Nov 2026", warn: true },
    ],
  },
  "sole-trader": {
    greeting: "Jay",
    sub: "Here is what needs you today.",
    stats: [
      { label: "Jobs near you", value: "6", note: "2 posted today" },
      { label: "Quotes out", value: "3", note: "$7,900 pending" },
      { label: "On the books", value: "2", note: "next: Wed 11 Nov" },
      { label: "Awaiting payment", value: "$1,980", note: "1 milestone", owed: true },
    ],
    attention: [
      { t: "Sign-off pending", d: "Leaking tap and valve, Stanmore · $1,980", tag: "Action", tone: "owed" },
      { t: "Quote requested", d: "Replace hot water system, Newtown", tag: "New", tone: "solid" },
      { t: "Deposit held", d: "Bathroom rough-in, Petersham · $900", tag: "Booked", tone: "neutral" },
    ],
    earnings: [
      { m: "Jun", v: 6 },
      { m: "Jul", v: 8 },
      { m: "Aug", v: 7 },
      { m: "Sep", v: 10 },
      { m: "Oct", v: 9 },
      { m: "Nov", v: 4 },
    ],
    week: [
      { day: "Mon", items: ["Quote visit, Newtown"] },
      { day: "Tue", items: [] },
      { day: "Wed", items: ["Petersham rough-in"] },
      { day: "Thu", items: ["Petersham rough-in"] },
    ],
    docs: [
      { t: "Trade licence", d: "Active until Jun 2028" },
      { t: "Public liability", d: "$10M · expires Feb 2027" },
      { t: "ABN", d: "Active · GST registered" },
    ],
  },
};

export const scheduleDays: Record<Role, { day: string; date: string; events: { t: string; time: string; tone: "ink" | "accent" }[] }[]> = {
  subcontractor: [
    { day: "Mon", date: "9", events: [{ t: "Marrickville switchboard", time: "7:00 to 3:00", tone: "ink" }, { t: "Newtown rewire", time: "7:30 to 4:00", tone: "ink" }] },
    { day: "Tue", date: "10", events: [{ t: "Newtown rewire", time: "7:30 to 4:00", tone: "ink" }] },
    { day: "Wed", date: "11", events: [{ t: "Dulwich Hill sign-off", time: "10:00 to 11:00", tone: "accent" }] },
    { day: "Thu", date: "12", events: [{ t: "Site visit, Alexandria", time: "1:00 to 2:00", tone: "ink" }] },
    { day: "Fri", date: "13", events: [] },
    { day: "Sat", date: "14", events: [] },
    { day: "Sun", date: "15", events: [] },
  ],
  "sole-trader": [
    { day: "Mon", date: "9", events: [{ t: "Quote visit, Newtown", time: "9:00 to 10:00", tone: "ink" }] },
    { day: "Tue", date: "10", events: [] },
    { day: "Wed", date: "11", events: [{ t: "Petersham rough-in", time: "7:00 to 3:00", tone: "ink" }] },
    { day: "Thu", date: "12", events: [{ t: "Petersham rough-in", time: "7:00 to 3:00", tone: "ink" }, { t: "Stanmore sign-off", time: "4:00 to 4:30", tone: "accent" }] },
    { day: "Fri", date: "13", events: [] },
    { day: "Sat", date: "14", events: [] },
    { day: "Sun", date: "15", events: [] },
  ],
};
