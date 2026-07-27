export type Project = {
  id: string;
  name: string;
  title: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Visual size role from the Studio Home work grid */
  size: "featured" | "secondary" | "primary";
};

export const homeProjects: Project[] = [
  {
    id: "mums-united",
    name: "Mums United",
    title: "Making community support clearer and easier to access.",
    image: {
      src: "/images/work/mums-united/cover.png",
      alt: "Laptop mockup showing the Mums United website",
      width: 4096,
      height: 3103,
    },
    size: "featured",
  },
  {
    id: "bright-path-learning",
    name: "Bright Path Learning",
    title: "Building trust between education providers and families.",
    image: {
      src: "/images/work/bright-path-learning/cover.jpg",
      alt: "Screen mockup showing the Bright Path Learners website",
      width: 3000,
      height: 2344,
    },
    size: "secondary",
  },
  {
    id: "meridian-and-co",
    name: "Meridian & Co.",
    title: "Making accounting services clearer and more approachable.",
    image: {
      // Tablet photo from Figma; flat UI export kept as cover-a.png unused.
      src: "/images/work/meridian-and-co/cover.png",
      alt: "Tablet mockup showing the Meridian & Co. website",
      width: 2000,
      height: 2667,
    },
    size: "primary",
  },
];
