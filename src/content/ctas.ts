/**
 * CTA bank — exact labels from 08_reusable_copy/01-ctas.md.
 * Phase-1 note: Volunteer / Partner / Donate-Goods detail pages are Phase 2,
 * so those CTAs route to /get-involved (audience hub) anchors or /contact for now.
 */
export type CtaIntent = "donate" | "goods" | "volunteer" | "partner" | "contact" | "explore";

export type Cta = {
  label: string;
  href: string;
  intent: CtaIntent;
};

export const cta = {
  sponsorBox: { label: "Sponsor a Spark Box", href: "/donate?designation=spark-boxes", intent: "donate" },
  donate: { label: "Donate Now", href: "/donate", intent: "donate" },
  donateGoods: { label: "Donate Goods", href: "/get-involved#donate-goods", intent: "goods" },
  volunteer: { label: "Volunteer With Us", href: "/get-involved#volunteer", intent: "volunteer" },
  partner: { label: "Partner With Us", href: "/get-involved#partner", intent: "partner" },
  hostLab: { label: "Host a Spark Lab", href: "/contact?intent=host-a-spark-lab", intent: "contact" },
  donateGoodsInquiry: { label: "Donate goods", href: "/contact?intent=donate-goods", intent: "contact" },
  volunteerInquiry: { label: "Volunteer", href: "/contact?intent=volunteer", intent: "contact" },
  partnershipInquiry: { label: "Partner with us", href: "/contact?intent=partnership", intent: "contact" },
  supportPathway: { label: "Support a Creative Pathway", href: "/donate?designation=spark-studio", intent: "donate" },
  donateGoodsOrMaterials: { label: "Donate Goods or Materials", href: "/get-involved#donate-goods", intent: "goods" },
  contact: { label: "Contact Us", href: "/contact", intent: "contact" },
  explorePrograms: { label: "Explore Programs", href: "/programs", intent: "explore" },
} satisfies Record<string, Cta>;

export type CtaKey = keyof typeof cta;
