export const roles = {
  subcontractor: {
    label: "Subcontractor",
    blurb:
      "You run a crew or a business and take on subcontract work for builders and owners.",
  },
  "sole-trader": {
    label: "Sole trader",
    blurb:
      "You work for yourself, one licence and one ute, and quote on jobs directly.",
  },
} as const;

export type Role = keyof typeof roles;

export const roleKeys = Object.keys(roles) as Role[];
