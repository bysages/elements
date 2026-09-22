export interface PostBlock {
  type: "h2" | "p" | "quote" | "code";
  id?: string;
  text: string;
}

export interface PostComment {
  id: string;
  author: string;
  initials: string;
  datetime: string;
  body: string;
  replies?: PostComment[];
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  author: string;
  initials: string;
  date: string;
  readingTime: string;
  blocks: PostBlock[];
  comments: PostComment[];
}

/** Eight posts of paper-and-ink editorial. Headings carry explicit ids —
 * the article view anchors the TOC to them, so slugging never has to
 * guess. */
export const posts: Post[] = [
  {
    id: "light-as-shadow",
    title: "Light as shadow: hierarchy without weight",
    excerpt:
      "The premise of the system is that depth is not decoration — surfaces rest in ambient shade and hierarchy is carried by light.",
    tags: ["design", "craft"],
    author: "Sage Wei",
    initials: "SW",
    date: "Sep 14, 2026",
    readingTime: "6 min",
    blocks: [
      {
        type: "p",
        text: "Interfaces are warm paper, content is ink. Nothing on the page floats free: every surface rests at a measured elevation, and the reader's eye is drawn the way light actually falls — slowly, from the top-left of attention to the quiet foot of the page.",
      },
      { type: "h2", id: "the-surface-ladder", text: "The surface ladder" },
      {
        type: "p",
        text: "Cards rest at the first elevation, dropdowns lift one step higher, dialogs leave the page entirely. Each step is computed from the same ink and light primitives — never copy-pasted — so a change in the lighting model ripples through every vessel at once.",
      },
      {
        type: "quote",
        text: "Cast shadows are reserved for things that actually leave the page.",
      },
      { type: "h2", id: "ink-bleeds", text: "Ink bleeds" },
      {
        type: "p",
        text: "Motion follows the same physical intuition. Shadows transition roughly one and a half times slower than the property that raised them, because light needs time. Panels dissolve in with a fade and a blur — ink soaking into fibre — never a hard pop.",
      },
      {
        type: "code",
        text: "transition:\n  box-shadow var(--bs-duration-slow) var(--bs-ease-out),\n  background var(--bs-duration-fast) var(--bs-ease-out);",
      },
      { type: "h2", id: "restraint", text: "Restraint as a feature" },
      {
        type: "p",
        text: "The discipline is subtraction. One hairline per boundary, one accent pigment at a time, and no decorative noise anywhere. What remains is an interface that reads like a well-set page: quiet, even, and impossible to tire of.",
      },
    ],
    comments: [
      {
        id: "c-1",
        author: "Ren Mei",
        initials: "RM",
        datetime: "Sep 15, 2026",
        body: "The surface ladder finally made elevation auditable for us. Shipping the tokens was the turning point.",
        replies: [
          {
            id: "c-1-1",
            author: "Sage Wei",
            initials: "SW",
            datetime: "Sep 15, 2026",
            body: "Once the ladder is computed, review stops being taste and starts being arithmetic.",
          },
        ],
      },
      {
        id: "c-2",
        author: "Wen Zai",
        initials: "WZ",
        datetime: "Sep 16, 2026",
        body: "Ink bleeds is a lovely phrase for it. We borrowed the timing ratio for our own motion pass.",
      },
    ],
  },
  {
    id: "square-cut-controls",
    title: "Square-cut controls, round vessels",
    excerpt:
      "方寸为章,器物为圆 — controls cut square like a seal, vessels kept round like bowls. The shape grammar carries meaning.",
    tags: ["design", "tokens"],
    author: "Wen Zai",
    initials: "WZ",
    date: "Sep 2, 2026",
    readingTime: "4 min",
    blocks: [
      {
        type: "p",
        text: "Shape is a signature. Interactive controls are square-cut at the small radius — a stamp pressed into paper — while vessels such as cards and dialogs stay round at the large radius. You never have to ask whether a thing is a control or a container; the corner tells you.",
      },
      { type: "h2", id: "the-seal", text: "The seal" },
      {
        type: "p",
        text: "A square-cut control reads as an action because stamps are actions: pressed once, leaving a mark. The radius is deliberately small — six pixels, not zero — so the edge still catches light.",
      },
      { type: "h2", id: "the-bowl", text: "The bowl" },
      {
        type: "p",
        text: "Vessels round at the large radius hold content the way bowls hold rice: softly, without corners to trap the eye. Dialogs, sheets, and cards all inherit the same bowl.",
      },
    ],
    comments: [
      {
        id: "c-3",
        author: "Ren Mei",
        initials: "RM",
        datetime: "Sep 3, 2026",
        body: "The seal metaphor finally sold the radius tokens to our review board.",
      },
    ],
  },
  {
    id: "inclusive-density",
    title: "Density is information organization",
    excerpt:
      "Four density tiers scale whitespace, never type size or contrast — legibility is a floor, not an option.",
    tags: ["a11y", "tokens"],
    author: "Ren Mei",
    initials: "RM",
    date: "Aug 25, 2026",
    readingTime: "5 min",
    blocks: [
      {
        type: "p",
        text: "Compact interfaces fail when compression is applied to the wrong dimension. Squeezing type or lowering contrast trades long-term legibility for short-term compactness. The system's answer is a density scale that only moves whitespace: gaps, padding, row heights.",
      },
      { type: "h2", id: "four-tiers", text: "Four tiers" },
      {
        type: "p",
        text: "Compact, default, comfortable, spacious. A single factor drives all of them, so an operator can move a control console to compact for a 4k wall and back to spacious for a training room without re-authoring a single screen.",
      },
      { type: "h2", id: "the-floor", text: "The floor" },
      {
        type: "p",
        text: "Type sizes and contrast ratios are the floor the scale may never dig through. The scale compresses space; it does not compress meaning.",
      },
    ],
    comments: [],
  },
  {
    id: "agent-legible",
    title: "Anatomy that agents can read",
    excerpt:
      "data-scope, data-part, and machine state attributes make the component tree legible to codegen and coding agents alike.",
    tags: ["ai", "craft"],
    author: "Sage Wei",
    initials: "SW",
    date: "Aug 11, 2026",
    readingTime: "7 min",
    blocks: [
      {
        type: "p",
        text: "The components must stay legible to machines: anatomy is a stable contract of data attributes, and props and types are the API docs. A coding agent reading the DOM sees the same vocabulary the stylesheets see.",
      },
      { type: "h2", id: "the-contract", text: "The contract" },
      {
        type: "p",
        text: "Every part carries its scope and part name; every state rides data-state. Selectors never guess. When the anatomy and the CSS agree by construction, one stylesheet serves every framework wrapper.",
      },
      {
        type: "code",
        text: '<div data-scope="dialog" data-part="content" data-state="open">',
      },
      { type: "h2", id: "why-it-pays", text: "Why it pays" },
      {
        type: "p",
        text: "Tests target parts, not classes. Agents compose flows from the same map. And refactors that respect the contract can move internals freely without breaking a single consumer.",
      },
    ],
    comments: [
      {
        id: "c-4",
        author: "Wen Zai",
        initials: "WZ",
        datetime: "Aug 12, 2026",
        body: "This is the article I send to every new hire on the platform team.",
        replies: [
          {
            id: "c-4-1",
            author: "Ren Mei",
            initials: "RM",
            datetime: "Aug 12, 2026",
            body: "Same — the contract framing finally made styling reviews fast.",
          },
        ],
      },
    ],
  },
  {
    id: "pigment-accents",
    title: "Mineral pigments: accents that hold their hue",
    excerpt:
      "Semantic colors are fixed pigments — bamboo, ochre, cinnabar, ultramarine — independent of the swappable accent theme.",
    tags: ["tokens", "design"],
    author: "Wen Zai",
    initials: "WZ",
    date: "Jul 30, 2026",
    readingTime: "5 min",
    blocks: [
      {
        type: "p",
        text: "The accent theme can switch — qinghua cobalt today, celadon tomorrow — but the semantic pigments never move. Success is bamboo green, warning is ochre, danger is cinnabar, info is ultramarine, in every theme and both modes.",
      },
      { type: "h2", id: "why-fixed", text: "Why fixed" },
      {
        type: "p",
        text: "Meaning cannot ride a theme. A reader who learns that cinnabar marks the destructive path must find it in the same place tomorrow, whichever pigment the product team fell in love with this quarter.",
      },
      { type: "h2", id: "composing", text: "Composing the two" },
      {
        type: "p",
        text: "Accents color the primary path and selection; pigments color state. The two systems never overlap, so a themed product keeps its personality without lying about danger.",
      },
    ],
    comments: [],
  },
  {
    id: "css-var-pipeline",
    title: "The CSS-variable pipeline end to end",
    excerpt:
      "Tokens compile to custom properties; the lighting engine writes variables; component CSS only consumes. One direction, no cycles.",
    tags: ["tokens", "craft"],
    author: "Ren Mei",
    initials: "RM",
    date: "Jul 18, 2026",
    readingTime: "8 min",
    blocks: [
      {
        type: "p",
        text: "Every visual value in a component is a var() reference. The token pipeline compiles design tokens into custom properties; the lighting engine computes light and writes variables onto the subtree; component styles read and never recompute.",
      },
      { type: "h2", id: "one-direction", text: "One direction" },
      {
        type: "p",
        text: "Values flow from tokens through the engine into components. Nothing flows back. That single direction is what lets a palette change land as data instead of a migration.",
      },
      { type: "h2", id: "the-freeze-trap", text: "The freeze trap" },
      {
        type: "p",
        text: "Custom properties resolve at their declaring element. A derived declaration on the root freezes the base value — the fix is to declare derived properties on the subtree that owns them, so the chain follows configuration instead of the document root.",
      },
    ],
    comments: [
      {
        id: "c-5",
        author: "Sage Wei",
        initials: "SW",
        datetime: "Jul 19, 2026",
        body: "The freeze trap paragraph has saved two of our engineers from a very long afternoon.",
      },
    ],
  },
  {
    id: "container-queries",
    title: "Components that measure their own room",
    excerpt:
      "Container queries let a component re-organize by the space it is given — the viewport belongs to the page, the container to the component.",
    tags: ["craft", "a11y"],
    author: "Sage Wei",
    initials: "SW",
    date: "Jul 2, 2026",
    readingTime: "6 min",
    blocks: [
      {
        type: "p",
        text: "Media queries ask how wide the window is; container queries ask how wide the room is. A table dropped into a narrow panel re-prioritizes its columns without the page caring, and the same table on a wide canvas shows everything.",
      },
      { type: "h2", id: "re-layout", text: "Re-layout, don't scale" },
      {
        type: "p",
        text: "Responsive behavior in the system is re-organization: sidebar becomes topbar, priority columns survive while the rest collapse into expandable details. Semantics never change — only the arrangement does.",
      },
      { type: "h2", id: "typical-moves", text: "Typical moves" },
      {
        type: "p",
        text: "A navigation list becomes a drawer. A stat row wraps from four across to one. A form flips from columns to a single measure. Each move is a container query the component carries with it.",
      },
    ],
    comments: [],
  },
  {
    id: "quiet-motion",
    title: "Quiet motion: states remain, animation does not",
    excerpt:
      "Under reduced motion the durations retune to one millisecond — every state still lands, instantly and legibly.",
    tags: ["a11y", "design"],
    author: "Ren Mei",
    initials: "RM",
    date: "Jun 20, 2026",
    readingTime: "3 min",
    blocks: [
      {
        type: "p",
        text: "Motion in the system is a grammar — springs for moving parts, staggers for lists, dissolves for panels. But the grammar has a reduced register: when the platform asks for less motion, durations retune to one millisecond.",
      },
      { type: "h2", id: "states-not-effects", text: "States, not effects" },
      {
        type: "p",
        text: "What survives is information, not spectacle. A dialog still opens; it simply arrives without the dissolve. Focus rings still bloom. The reader who needs stillness gets the same interface, only quieter.",
      },
    ],
    comments: [
      {
        id: "c-6",
        author: "Wen Zai",
        initials: "WZ",
        datetime: "Jun 21, 2026",
        body: "Three minutes that belong in every onboarding packet.",
      },
    ],
  },
];

/** Every tag in publication order — the filter row reads the same way. */
export const allTags = [...new Set(posts.flatMap((post) => post.tags))];
