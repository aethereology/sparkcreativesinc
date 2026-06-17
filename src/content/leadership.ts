export type LeadershipMember = {
  name: string;
  role: string;
  /** Instagram handle without the leading "@". */
  instagram: string;
  /**
   * Portrait with transparent background. Workflow: drop labeled files in
   * web/assets/aboutimages/, copy to web/public/images/about/, set the path here.
   * Omit to render the themed "Photo pending" placeholder.
   */
  image?: string;
  imageAlt?: string;
  /** Shrinks the portrait within the card (bottom-anchored) for tightly framed photos. */
  imageZoom?: number;
  /**
   * Raises the portrait by this % of card height so a zoomed face clears the
   * text block. Keep small — the photo's bottom edge must stay inside the scrim.
   */
  imageLift?: number;
};

// Names and titles confirmed by leadership 2026-06-08.
// Instagram handles provided by leadership 2026-06-11.
export const leadership: LeadershipMember[] = [
  {
    name: "Maureen Ella",
    role: "President & Executive Director",
    instagram: "maureen_ella_",
    image: "/images/about/maureen-ella.png?v=3",
    imageAlt: "Portrait of Maureen Ella, President and Executive Director.",
  },
  {
    name: "Kyle Lamban",
    role: "Vice President & Chief Operations Officer",
    instagram: "84kylelamban",
    image: "/images/about/kyle-lamban.png?v=4",
    imageAlt: "Portrait of Kyle Lamban, Vice President and Chief Operations Officer.",
  },
  {
    name: "Angeline Sals",
    role: "Secretary & Chief Financial Officer",
    instagram: "ange_loe",
    image: "/images/about/angeline-sals.png?v=3",
    imageAlt: "Portrait of Angeline Sals, Secretary and Chief Financial Officer.",
  },
  {
    name: "Mileah Caldeo",
    role: "Program Manager",
    instagram: "mileahcaldeo",
    image: "/images/about/mileah-caldeo.png?v=3",
    imageAlt: "Portrait of Mileah Caldeo, Program Manager.",
  },
  {
    name: "Lucas Lamban",
    role: "Marketing & Communications",
    instagram: "lucasrelam",
    image: "/images/about/lucas-lamban.png?v=4",
    imageAlt: "Portrait of Lucas Lamban, Marketing and Communications.",
  },
];
