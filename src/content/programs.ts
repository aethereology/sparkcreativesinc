/**
 * Program data — single source of truth for /programs and /programs/[slug].
 * Copy sourced verbatim/close from 03_programs/*.md and 01_strategy/05-messaging-house.md.
 * Fields follow the content model in 02_information_architecture/04-content-models.md.
 */
import { cta, type Cta } from "./ctas";
import sparkBoxesImage from "../../assets/spark-boxes.png";
import sparkLabsImage from "../../assets/spark-labs.png";
import sparkStudioImage from "../../assets/spark-studio.png";
import sparkSupplyNetworkImage from "../../assets/spark-supply-network.png";

export type ProgramRole = "Access" | "Learning" | "Growth" | "Supply";

export type Program = {
  name: string;
  slug: string;
  role: ProgramRole;
  /** Lucide icon export name; mapped to a component in the UI layer. */
  iconName: "PackageOpen" | "FlaskConical" | "Sprout" | "Recycle";
  /** Which brand accent themes this program card: primary (ember) or accent (teal). */
  theme: "primary" | "accent";
  shortDescription: string;
  /** Approved messaging-house pillar line — the human-facing one-liner. */
  pillarLine: string;
  longDescription: string;
  whoItServes: string;
  howItWorks: string[];
  outcomes: string[];
  metrics: string[];
  legacyMapping: string;
  primaryCta: Cta;
  secondaryCtas: Cta[];
  imageAlt: string;
  /** Optional real photo path. Falls back to a themed placeholder. */
  image?: string;
};

const SHARED_HOW_IT_WORKS = [
  "A donor, volunteer, partner, or participant enters through the right next step.",
  "SparkCreatives routes the resource or person into the program.",
  "The program delivers supplies, learning, mentorship, leadership, or logistics.",
  "The team tracks outputs and outcomes.",
  "Strong participants or partners can move into related programs.",
];

export const programs: Program[] = [
  {
    name: "Spark Boxes",
    slug: "spark-boxes",
    role: "Access",
    iconName: "PackageOpen",
    theme: "primary",
    shortDescription:
      "Curated boxes of useful supplies, school materials, creative tools, and essentials.",
    pillarLine: "Spark Boxes put supplies and creative tools directly into people's hands.",
    longDescription:
      "Spark Boxes helps SparkCreatives turn surplus into opportunity by connecting useful resources with people who can learn, create, lead, and build from them.",
    whoItServes:
      "Families, students, community partners, and disaster-affected communities where active.",
    howItWorks: SHARED_HOW_IT_WORKS,
    outcomes: [
      "Immediate access to supplies and creative tools",
      "A tangible first connection to SparkCreatives programs",
      "A pathway into Labs and Studio for participants who want more",
    ],
    metrics: [
      "Boxes packed",
      "Boxes shipped or delivered",
      "Families and students served",
      "Materials used",
      "Partner locations",
    ],
    legacyMapping: "Keeps the existing Spark Boxes as the flagship public program.",
    primaryCta: cta.sponsorBox,
    secondaryCtas: [cta.donate, cta.volunteer, cta.partner],
    image: sparkBoxesImage.src,
    imageAlt: "A packed Spark Box filled with school supplies and creative tools.",
  },
  {
    name: "Spark Labs",
    slug: "spark-labs",
    role: "Learning",
    iconName: "FlaskConical",
    theme: "accent",
    shortDescription:
      "Guided workshops and training experiences using donated and reclaimed materials.",
    pillarLine: "Spark Labs turn materials into guided creative learning experiences.",
    longDescription:
      "Spark Labs helps SparkCreatives turn surplus into opportunity by connecting useful resources with people who can learn, create, lead, and build from them.",
    whoItServes:
      "Schools, youth groups, community organizations, adult learners, and partner programs.",
    howItWorks: SHARED_HOW_IT_WORKS,
    outcomes: [
      "Hands-on skills built with real materials",
      "Confidence and creative confidence for participants",
      "Projects participants can keep and build on",
    ],
    metrics: [
      "Labs hosted",
      "Participants served",
      "Hours of instruction",
      "Projects completed",
      "Confidence and skill feedback",
    ],
    legacyMapping:
      "Absorbs the workshop and training pieces of SparkLearn and the environmental education pieces of SparkYouth.",
    primaryCta: cta.hostLab,
    secondaryCtas: [cta.donate, cta.volunteer, cta.partner],
    image: sparkLabsImage.src,
    imageAlt: "A hands-on Spark Lab workshop in progress with participants and materials.",
  },
  {
    name: "Spark Studio",
    slug: "spark-studio",
    role: "Growth",
    iconName: "Sprout",
    theme: "primary",
    shortDescription:
      "Mentorship, leadership, project development, and venture pathways for emerging creatives.",
    pillarLine: "Spark Studio supports mentorship, leadership, projects, and venture pathways.",
    longDescription:
      "Spark Studio helps SparkCreatives turn surplus into opportunity by connecting useful resources with people who can learn, create, lead, and build from them.",
    whoItServes:
      "Participants ready for deeper support, youth leaders, mentors, and emerging entrepreneurs.",
    howItWorks: SHARED_HOW_IT_WORKS,
    outcomes: [
      "Mentorship and leadership development",
      "Real projects and emerging ventures",
      "Pathways toward sustainable creative work",
    ],
    metrics: [
      "Participants enrolled",
      "Mentorship hours",
      "Projects completed",
      "Ventures supported",
      "Leadership roles",
    ],
    legacyMapping:
      "Absorbs Spark Ventures, deeper SparkLearn mentorship, and SparkYouth leadership.",
    primaryCta: cta.supportPathway,
    secondaryCtas: [cta.donate, cta.volunteer, cta.partner],
    image: sparkStudioImage.src,
    imageAlt: "A mentor and emerging creative working together in Spark Studio.",
  },
  {
    name: "Spark Supply Network",
    slug: "spark-supply-network",
    role: "Supply",
    iconName: "Recycle",
    theme: "accent",
    shortDescription:
      "Materials, goods, volunteer, and sustainability pipeline powering SparkCreatives programs.",
    pillarLine: "Spark Supply Network redirects useful materials into community benefit.",
    longDescription:
      "Spark Supply Network helps SparkCreatives turn surplus into opportunity by connecting useful resources with people who can learn, create, lead, and build from them.",
    whoItServes:
      "Goods donors, businesses, artists, schools, volunteers, and program participants.",
    howItWorks: SHARED_HOW_IT_WORKS,
    outcomes: [
      "Useful materials kept out of the landfill",
      "A steady supply pipeline for every other program",
      "Meaningful volunteer roles in sorting and packing",
    ],
    metrics: [
      "Pounds diverted",
      "Goods donors",
      "Volunteer hours",
      "Sorting events",
      "Materials moved into programs",
    ],
    legacyMapping:
      "Absorbs SparkYouth sorting and packing, goods donation, in-kind partnerships, and landfill diversion.",
    primaryCta: cta.donateGoodsOrMaterials,
    secondaryCtas: [cta.donate, cta.volunteer, cta.partner],
    image: sparkSupplyNetworkImage.src,
    imageAlt: "Volunteers sorting donated materials for the Spark Supply Network.",
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

/** Ecosystem ordering: Supply Network -> Boxes -> Labs -> Studio. */
export const ecosystemOrder = [
  "spark-supply-network",
  "spark-boxes",
  "spark-labs",
  "spark-studio",
] as const;
