import type { IconName } from "@/components/Icons";
import type { Role } from "./roles";

export type Tone = "ok" | "owed" | "neutral" | "solid";

export type Kind =
  | "post"
  | "myjobs"
  | "alerts"
  | "offers"
  | "work"
  | "invoices"
  | "verification"
  | "settings";

export type Section = {
  slug: string;
  label: string;
  icon: IconName;
  title: string;
  sub: string;
  kind?: Kind;
};

export type NavGroup = { label?: string; slugs: string[] };

export type Person = {
  name: string;
  initials: string;
  role: string;
  company: string;
};

const overview: Section = { slug: "", label: "Overview", icon: "grid", title: "Overview", sub: "" };

const settings: Section = {
  slug: "settings",
  label: "Settings",
  icon: "settings",
  title: "Settings",
  sub: "Business details and notifications.",
  kind: "settings",
};

const invoices = (sub: string): Section => ({
  slug: "invoices",
  label: "Invoices",
  icon: "wallet",
  title: "Invoices",
  sub,
  kind: "invoices",
});

export const people: Record<Role, Person> = {
  subcontractor: {
    name: "Sam Hartley",
    initials: "SH",
    role: "Owner",
    company: "Coastline Electrical",
  },
  "sole-trader": {
    name: "Jay Mitchell",
    initials: "JM",
    role: "Plumber and gasfitter",
    company: "Jay Mitchell Plumbing",
  },
};

export const sections: Record<Role, Section[]> = {
  "sole-trader": [
    overview,
    {
      slug: "post",
      label: "Post a job",
      icon: "plus",
      title: "Post a job",
      sub: "Tell subcontractors what you need. Trades whose service area covers the job are alerted.",
      kind: "post",
    },
    {
      slug: "jobs",
      label: "My jobs",
      icon: "briefcase",
      title: "My jobs",
      sub: "Review offers, approve a subcontractor and track each job to payment.",
      kind: "myjobs",
    },
    invoices("Invoices from subcontractors on your jobs."),
    settings,
  ],
  subcontractor: [
    overview,
    {
      slug: "alerts",
      label: "Job alerts",
      icon: "bell",
      title: "Job alerts",
      sub: "Open jobs inside your service area. Send your rate and the sole trader decides.",
      kind: "alerts",
    },
    {
      slug: "offers",
      label: "My offers",
      icon: "file",
      title: "My offers",
      sub: "Every rate you have put in and where it stands.",
      kind: "offers",
    },
    {
      slug: "work",
      label: "My jobs",
      icon: "briefcase",
      title: "My jobs",
      sub: "Jobs you have been booked on. Mark them complete, then invoice.",
      kind: "work",
    },
    invoices("Invoices you have sent and their payment status."),
    {
      slug: "verification",
      label: "Verification",
      icon: "shield",
      title: "Verification",
      sub: "Licence, insurance and ID checks that clients see on your profile.",
      kind: "verification",
    },
    {
      ...settings,
      sub: "Service area, rates and business details.",
    },
  ],
};

export const navGroups: Record<Role, NavGroup[]> = {
  "sole-trader": [{ slugs: ["", "post", "jobs", "invoices"] }],
  subcontractor: [
    { slugs: ["", "alerts", "offers", "work", "invoices"] },
    { label: "Business", slugs: ["verification"] },
  ],
};
