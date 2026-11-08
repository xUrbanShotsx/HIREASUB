import type { Role } from "./roles";

export type CheckStatus = "verified" | "expiring" | "review" | "missing";

export type Requirement = {
  id: string;
  label: string;
  why: string;
  status: CheckStatus;
  detail: string;
  fields: { key: string; label: string; placeholder: string }[];
};

export const requirements: Record<Role, Requirement[]> = {
  subcontractor: [
    {
      id: "licence",
      label: "Trade licence",
      why: "Checked against the state licensing register.",
      status: "verified",
      detail: "EC-48213 · Electrical contractor · expires 12 Aug 2027",
      fields: [
        { key: "no", label: "Licence number", placeholder: "EC-48213" },
        { key: "exp", label: "Expiry date", placeholder: "12/08/2027" },
      ],
    },
    {
      id: "pl",
      label: "Public liability insurance",
      why: "Minimum $10M cover, certificate of currency required.",
      status: "verified",
      detail: "QBE · $20M · policy QBE-77120 · expires 14 Mar 2027",
      fields: [
        { key: "insurer", label: "Insurer", placeholder: "QBE" },
        { key: "no", label: "Policy number", placeholder: "QBE-77120" },
        { key: "amt", label: "Cover amount", placeholder: "$20,000,000" },
        { key: "exp", label: "Expiry date", placeholder: "14/03/2027" },
      ],
    },
    {
      id: "wc",
      label: "Workers compensation",
      why: "Required for any business with crew on site.",
      status: "expiring",
      detail: "icare · policy 5521 · expires 30 Nov 2026",
      fields: [
        { key: "insurer", label: "Insurer", placeholder: "icare" },
        { key: "no", label: "Policy number", placeholder: "5521" },
        { key: "exp", label: "Expiry date", placeholder: "30/11/2027" },
      ],
    },
    {
      id: "wcard",
      label: "White cards for crew",
      why: "Each person on site needs a current construction induction card.",
      status: "verified",
      detail: "4 of 4 crew verified",
      fields: [{ key: "no", label: "Card number", placeholder: "WC-90214" }],
    },
    {
      id: "abn",
      label: "ABN and GST",
      why: "Checked against the Australian Business Register.",
      status: "verified",
      detail: "51 824 753 556 · Active · GST registered",
      fields: [{ key: "no", label: "ABN", placeholder: "51 824 753 556" }],
    },
  ],
  "sole-trader": [
    {
      id: "licence",
      label: "Trade licence",
      why: "Checked against the state licensing register.",
      status: "verified",
      detail: "214871C · Plumber and gasfitter · expires 9 Jun 2028",
      fields: [
        { key: "no", label: "Licence number", placeholder: "214871C" },
        { key: "exp", label: "Expiry date", placeholder: "09/06/2028" },
      ],
    },
    {
      id: "pl",
      label: "Public liability insurance",
      why: "Minimum $5M cover, certificate of currency required.",
      status: "verified",
      detail: "NRMA · $10M · policy NRMA-3381 · expires 2 Feb 2027",
      fields: [
        { key: "insurer", label: "Insurer", placeholder: "NRMA" },
        { key: "no", label: "Policy number", placeholder: "NRMA-3381" },
        { key: "amt", label: "Cover amount", placeholder: "$10,000,000" },
        { key: "exp", label: "Expiry date", placeholder: "02/02/2027" },
      ],
    },
    {
      id: "wcard",
      label: "White card",
      why: "Construction induction card, checked with the issuer.",
      status: "missing",
      detail: "Not submitted yet",
      fields: [{ key: "no", label: "Card number", placeholder: "WC-90214" }],
    },
    {
      id: "abn",
      label: "ABN and GST",
      why: "Checked against the Australian Business Register.",
      status: "verified",
      detail: "33 109 442 871 · Active · GST registered",
      fields: [{ key: "no", label: "ABN", placeholder: "33 109 442 871" }],
    },
  ],
};

export const initialHistory: Record<Role, { when: string; what: string }[]> = {
  subcontractor: [
    { when: "Today, 6:02 am", what: "Weekly re-check passed: licence, ABN" },
    { when: "2 Nov", what: "Workers compensation flagged: expires in 28 days" },
    { when: "14 Mar", what: "Public liability certificate verified" },
  ],
  "sole-trader": [
    { when: "Today, 6:02 am", what: "Weekly re-check passed: licence, ABN" },
    { when: "21 Oct", what: "Public liability certificate verified" },
    { when: "21 Oct", what: "Trade licence verified against register" },
  ],
};

/** Sample register used by the public "Verify a trade" page. Not live data. */
export const register = [
  {
    key: "ec48213",
    match: ["ec-48213", "ec48213", "51 824 753 556", "51824753556"],
    name: "Coastline Electrical Pty Ltd",
    trade: "Electrical contractor",
    area: "Illawarra and South Coast",
    checks: [
      ["Trade licence", "EC-48213", "Active until 12 Aug 2027", "ok"],
      ["Public liability", "$20M · QBE", "Expires 14 Mar 2027", "ok"],
      ["Workers compensation", "icare", "Expires 30 Nov 2026", "soon"],
      ["ABN and GST", "51 824 753 556", "Active · GST registered", "ok"],
    ],
    checked: "Today, 6:02 am",
  },
  {
    key: "214871c",
    match: ["214871c", "33 109 442 871", "33109442871"],
    name: "Jay Mitchell Plumbing",
    trade: "Plumber and gasfitter",
    area: "Sydney inner west",
    checks: [
      ["Trade licence", "214871C", "Active until 9 Jun 2028", "ok"],
      ["Public liability", "$10M · NRMA", "Expires 2 Feb 2027", "ok"],
      ["ABN and GST", "33 109 442 871", "Active · GST registered", "ok"],
    ],
    checked: "Today, 6:02 am",
  },
] as const;
