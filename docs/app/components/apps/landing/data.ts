/** Copy for a fictional letterpress studio — the landing exercises the
 * library's editorial register: serif display, hairline lattices, and a
 * masonry wall of uneven cards. */
export interface Swatch {
  name: string;
  accent: string;
}

export interface Feature {
  title: string;
  body: string;
  icon: string;
}

export interface WallItem {
  kind: "tint" | "quote" | "count" | "note" | "figure";
  accent?: "qinghua" | "celadon" | "zhusha";
  glyph?: string;
  series?: string;
  quote?: string;
  attribution?: string;
  count?: string;
  caption?: string;
  body?: string;
  bars?: number[];
}

export interface Voice {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export interface Plan {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  featured?: boolean;
}

export interface Faq {
  value: string;
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

/** The three house pigments; each dot reads its color from the accent
 * token the data-accent attribute swaps in, never from a literal. */
export const swatches: Swatch[] = [
  { name: "Qinghua", accent: "qinghua" },
  { name: "Celadon", accent: "celadon" },
  { name: "Zhusha", accent: "zhusha" },
];

export const brands: string[] = [
  "Meridian Press",
  "Fold & Vellum",
  "Mulberry Press",
  "Cartouche",
  "Nightjar Editions",
  "Basil & Slate",
  "The Composing Room",
  "Palmwhite",
  "Karst Archive",
  "Inkstone Works",
];

export const features: Feature[] = [
  {
    title: "Deckle edges",
    body: "Every sheet leaves the mold with its feathered edge intact; trimming is a choice, not a default.",
    icon: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5",
  },
  {
    title: "Vegetable inks",
    body: "Twelve lines mixed in house — qinghua cobalt to zhusha red — lightfast and soy-based.",
    icon: "M12 3c3.5 4 6 7.2 6 10.2a6 6 0 1 1-12 0C6 10.2 8.5 7 12 3z",
  },
  {
    title: "Set by hand",
    body: "Metal first, then pixels: our faces are drawn at press size and cut back for the screen.",
    icon: "M6 7V5h12v2M12 5v14M9 19h6",
  },
  {
    title: "Bound to last",
    body: "Smyth-sewn spines open flat and stay that way; glue is for envelopes.",
    icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z",
  },
];

/** Column-first flow: with three columns the wall fills one column
 * before crossing, so the sequence alternates heights on purpose. */
export const wallItems: WallItem[] = [
  {
    kind: "tint",
    accent: "qinghua",
    glyph: "青花",
    series: "Cobalt series — twelve blues ground from lapis.",
  },
  {
    kind: "quote",
    quote: "A letterpress proof is honest in a way a screen never is — it weighs something.",
    attribution: "Wen Zhao · Mulberry Press",
  },
  {
    kind: "count",
    count: "37",
    caption: "editions pressed this year, each under five hundred copies",
  },
  {
    kind: "figure",
    bars: [42, 66, 50, 88, 72, 96, 58],
    caption: "Ink coverage across the autumn run",
  },
  {
    kind: "tint",
    accent: "celadon",
    glyph: "青瓷",
    series: "Celadon — the quiet green of a crackled glaze.",
  },
  {
    kind: "note",
    body: "Our paper comes from one mill in Jing County, aged nine months before it meets a press. The wait is the recipe.",
  },
  {
    kind: "quote",
    quote: "They set our wedding invitations by hand. My grandmother read them aloud twice.",
    attribution: "M. Okafor · printed 2025",
  },
  {
    kind: "tint",
    accent: "zhusha",
    glyph: "朱砂",
    series: "Zhusha — cinnabar, the seal-maker's red.",
  },
  {
    kind: "count",
    count: "9",
    caption: "months every sheet rests in the loft before pressing",
  },
];

export const voices: Voice[] = [
  {
    quote: "Songyan treats a business card like a broadside — the small things get the loud type.",
    author: "Lena Vogel",
    role: "Cartouche",
    initials: "LV",
  },
  {
    quote:
      "One proof revision, forty minutes, and the plates were perfect. The press still answers email.",
    author: "Daniel Achebe",
    role: "Nightjar Editions",
    initials: "DA",
  },
  {
    quote: "The celadon series sold out twice. People keep the boxes.",
    author: "Mei Chen",
    role: "Mulberry Press",
    initials: "YM",
  },
];

export const plans: Plan[] = [
  {
    name: "Proof",
    price: 0,
    tagline: "One sheet, one color, our stock paper.",
    features: ["Single ink on warm white", "Deckle edge finish", "Ships in ten days"],
  },
  {
    name: "Studio",
    price: 18,
    tagline: "The standing order for studios that send paper monthly.",
    features: [
      "Three ink lines, your choice",
      "Custom stock from the Jing County mill",
      "Plate storage between runs",
      "Ships in five days",
    ],
    featured: true,
  },
  {
    name: "Atelier",
    price: 49,
    tagline: "A private press of your own, plates and all.",
    features: [
      "Unlimited ink lines, mixed to sample",
      "Named typeface license",
      "Bound archive of every proof",
      "Ships in two days",
    ],
  },
];

export const faqs: Faq[] = [
  {
    value: "run",
    question: "How small can a run be?",
    answer:
      "Fifty. The press does not care whether fifty is a proof or a finale — the plates are set either way.",
  },
  {
    value: "color",
    question: "Can you match a color I already have?",
    answer: "Send the swatch. We grind to sample and keep the formula on file under your name.",
  },
  {
    value: "type",
    question: "Do you license your typefaces?",
    answer:
      "The Atelier edition includes a named license; every face is drawn here and cut for both press and screen.",
  },
  {
    value: "paper",
    question: "What does the paper weigh?",
    answer:
      "Our stock runs 110 to 320 gsm, and the deckle edge adds nothing to the weight — it is how the sheet leaves the mold.",
  },
  {
    value: "ship",
    question: "Where do you ship?",
    answer:
      "Anywhere the postal service walks. Plate storage and reprints are handled from the same studio bench.",
  },
];

export const footerColumns: FooterColumn[] = [
  { title: "Studio", links: ["The press", "Inks", "Paper mill", "Typefaces"] },
  { title: "Visit", links: ["Huizhou bench, Anhui", "Thu–Sat, by letter", "No walk-ins, sorry"] },
  { title: "Journal", links: ["Setting the seal", "Twelve blues", "A year of proofs"] },
  { title: "Legal", links: ["Terms", "Privacy", "Colophon"] },
];
