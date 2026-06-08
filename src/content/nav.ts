/**
 * Navigation config — from 02_information_architecture/02-navigation.md.
 * Phase-1: deferred pages (Blog, Volunteer/Partner/Donate-Goods detail, Privacy,
 * Financials) route to existing routes/anchors so there are no dead links.
 */
export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const mainNav: NavItem[] = [
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Overview", href: "/programs" },
      { label: "Spark Boxes", href: "/programs/spark-boxes" },
      { label: "Spark Labs", href: "/programs/spark-labs" },
      { label: "Spark Studio", href: "/programs/spark-studio" },
      { label: "Spark Supply Network", href: "/programs/spark-supply-network" },
    ],
  },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Donate Funds", href: "/donate" },
      { label: "Donate Goods", href: "/get-involved#donate-goods" },
      { label: "Volunteer", href: "/get-involved#volunteer" },
      { label: "Partner With Us", href: "/get-involved#partner" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerGroups: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Programs", href: "/programs" },
      { label: "Impact", href: "/impact" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Programs",
    links: [
      { label: "Spark Boxes", href: "/programs/spark-boxes" },
      { label: "Spark Labs", href: "/programs/spark-labs" },
      { label: "Spark Studio", href: "/programs/spark-studio" },
      { label: "Spark Supply Network", href: "/programs/spark-supply-network" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Donate Goods", href: "/get-involved#donate-goods" },
      { label: "Volunteer", href: "/get-involved#volunteer" },
      { label: "Partner With Us", href: "/get-involved#partner" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Impact", href: "/impact" },
      { label: "Financials & Governance", href: "/about#governance" },
      { label: "501(c)(3) Info", href: "/about#governance" },
    ],
  },
];
