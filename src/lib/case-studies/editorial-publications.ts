import { getCaseStudyTheme } from "@/lib/project-themes";
import type { CaseStudy } from "./types";

const base = "/images/work/editorial-publications/case-study";

/** Editorial & Publications case study — content from Figma node 560:15028. */
export const editorialPublicationsCaseStudy: CaseStudy = {
  slug: "editorial-publications",
  name: "Editorial & Publications",
  title:
    "Designing publications, annual reports and editorial communications that transform complex information into engaging printed experiences.",
  disciplines: "",
  theme: getCaseStudyTheme("editorial-publications"),
  /** Approved portfolio light chrome (nav, heading, contact, footer). */
  chrome: "light",
  /** Shared 12-column portfolio heading (label / title / meta). */
  heroLayout: "portfolio",
  meta: [
    { label: "Role:", values: ["Senior Designer"] },
    {
      label: "Focus:",
      values: ["Editorial Design", "Art Direction", "Visual Systems"],
    },
    { label: "Platform:", values: ["Print", "Digital"] },
    { label: "Year:", values: ["2009–2026"] },
  ],
  hero: {
    src: `${base}/hero.png`,
    alt: "Close-up of an EALA editorial brochure cover with geometric colour blocks",
    width: 1620,
    height: 911,
  },
  introLabel: "Overview",
  intro: [
    "Publication Design brought together a wide range of printed and digital publications, from brochures and annual reports to magazines, marketing collateral and educational resources. Each project required balancing editorial storytelling with clear communication while reflecting the identity of the organisation behind it.",
    "As Senior Designer, I worked across the full design process, creating layouts, information graphics, typography systems and production-ready artwork. Whether producing a small brochure or a multi-page publication, the focus was always on making complex information accessible through thoughtful editorial design.",
  ],
  bodyBlocks: [
    {
      type: "gallery",
      label: "Investor and information design",
      images: [
        {
          src: `${base}/investor-pack.png`,
          alt: "Stacked green investor pack brochures",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption: "Investor pack · Presenting the product vision.",
        },
        {
          src: `${base}/information-design.png`,
          alt: "Open investor pack spread with charts and information graphics",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption: "Information design · Visualising business performance.",
        },
      ],
    },
    {
      type: "gallery",
      label: "Pitch materials and market insights",
      images: [
        {
          src: `${base}/pitch-materials.png`,
          alt: "Open pitch brochure with photography and editorial layout",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption: "Pitch materials · Communicating the product strategy.",
        },
        {
          src: `${base}/market-insights.png`,
          alt: "Open market insights spread with map and supporting charts",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption: "Market insights · Supporting investment decisions.",
        },
      ],
    },
    {
      type: "narrative",
      narrative: {
        id: "approach",
        label: "",
        align: "left",
        paragraphs: [
          "Every publication had its own audience, objectives and visual language. Rather than applying a single style, each project was shaped around its content, using typography, imagery and layout to create clear hierarchy and engaging reading experiences.",
          "Alongside editorial design, the work included information graphics, annual reports, educational materials and marketing publications, ensuring every piece was visually consistent, easy to navigate and ready for print.",
        ],
      },
    },
    {
      type: "gallery",
      label: "University handbook and housing guide",
      images: [
        {
          src: `${base}/university-handbook.png`,
          alt: "Open university handbook with bold pink and white typography",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "University handbook · Creating accessible student resources.",
        },
        {
          src: `${base}/housing-guide.png`,
          alt: "Open housing guide spread with photography and structured columns",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption: "Housing guide · Supporting people in housing need.",
        },
      ],
    },
    {
      type: "feature",
      label: "Charity brochure",
      image: {
        src: `${base}/charity-brochure.png`,
        alt: "Charity brochure layout grid with bold yellow typography and portraits",
        width: 3240,
        height: 2072,
        zoomable: true,
        caption: "Charity brochure · Communicating services and impact.",
      },
    },
    {
      type: "gallery",
      label: "University and charity leaflets",
      images: [
        {
          src: `${base}/university-leaflet.png`,
          alt: "Open university leaflet with green organic shapes and photography",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "University leaflet · Promoting courses and opportunities.",
        },
        {
          src: `${base}/charity-leaflet.png`,
          alt: "Open charity leaflet with black-and-white portrait and supporting copy",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption: "Charity leaflet · Raising awareness through print.",
        },
      ],
    },
    {
      type: "narrative",
      narrative: {
        id: "reflection",
        label: "Reflection",
        align: "right",
        paragraphs: [
          "Working across publications of different scales and audiences reinforced the importance of clarity, consistency and attention to detail. Whether designing a short brochure or a comprehensive annual report, the objective remained the same: making information easier to understand through considered editorial design.",
        ],
      },
    },
    {
      type: "gallery",
      label: "Annual reports",
      images: [
        {
          src: `${base}/annual-report-cover.png`,
          alt: "Closed textured orange annual report booklet",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Annual report · Presenting business performance and strategy.",
        },
        {
          src: `${base}/annual-report-spread.png`,
          alt: "Open annual report spread with staff portraits and editorial layout",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Annual report · Communicating performance through design.",
        },
      ],
    },
    {
      type: "feature",
      label: "Impact reports",
      image: {
        src: `${base}/impact-reports.png`,
        alt: "Grid of impact report covers including MumsUnited",
        width: 3240,
        height: 2072,
        zoomable: true,
        caption: "Impact reports · Celebrating community achievements.",
      },
    },
    {
      type: "gallery",
      label: "Exhibition booklets",
      images: [
        {
          src: `${base}/exhibition-booklet-stack.png`,
          alt: "Stacked square exhibition booklets",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption: "Exhibition booklet · Presenting an artist's collection.",
        },
        {
          src: `${base}/exhibition-booklet-spread.png`,
          alt: "Open exhibition booklet with clean typographic layout",
          width: 3240,
          height: 2072,
          zoomable: true,
          caption:
            "Exhibition booklet · Showcasing creative work through print.",
        },
      ],
    },
  ],
};
