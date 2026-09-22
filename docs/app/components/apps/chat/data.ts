export interface ChatScript {
  /** Any of these substrings in the prompt (lowercased) selects the script. */
  match: string[];
  tool?: { name: string; input: string; output: string };
  reasoning?: string;
  text: string;
  suggestions: string[];
}

export const GREETING =
  "Welcome to the Elements workbench. Ask about tokens, components, or the docs — answers stream " +
  "in locally, so nothing leaves this page.";

export const FALLBACK_SUGGESTIONS = [
  "What tokens exist?",
  "How do I theme it?",
  "Show the docs map",
];

/** A scripted assistant: each entry matches by keyword and plays its
 * tool call, reasoning, and streamed text in sequence. */
export const SCRIPTS: ChatScript[] = [
  {
    match: ["token", "density", "accent"],
    tool: {
      name: "list-pages",
      input: '{"filter": "tokens"}',
      output: '{"hits": 3, "pages": ["tokens", "core", "theming"]}',
    },
    reasoning:
      "The reader asks about tokens. The docs shelf has a tokens page under reference and a theming " +
      "guide — point at both, keep it short.",
    text:
      "The design tokens compile to CSS custom properties: color, spacing, radius, elevation, and " +
      "motion. **Density** has four tiers driven by `[data-density]`, and the **accent** switches " +
      "pigments through `[data-accent]` without touching the semantic colors. Start with the tokens " +
      "page under Reference, then the theming guide.",
    suggestions: ["How do I theme it?", "What about dark mode?", "Show the docs map"],
  },
  {
    match: ["theme", "dark mode", "dark"],
    reasoning:
      "Theming question. The answer is the same tokens in both modes — contrast tiers flip, pigments " +
      "hold. Two or three sentences will do.",
    text:
      "Theming rides the tokens: switch the accent with `[data-accent]` (qinghua cobalt, celadon, " +
      "zhusha cinnabar), flip light and dark through the color-mode panel in the header. The semantic " +
      "pigments — bamboo, ochre, cinnabar, ultramarine — hold their meaning in every theme and both " +
      "modes, so danger always reads as danger.",
    suggestions: ["What tokens exist?", "How do accents switch?"],
  },
  {
    match: ["map", "docs", "find", "page"],
    tool: {
      name: "list-pages",
      input: '{"locale": "en"}',
      output: '{"count": 174, "shelves": ["guide", "components", "reference"]}',
    },
    reasoning:
      "They want the shape of the docs. Give the three shelves and what each is for — the assistant " +
      "has list-pages for this, so showing a tool call is honest.",
    text:
      "The site has three shelves. **Guide** explains the workflow and the architecture. " +
      "**Components** holds every family with live demos and a code tab. **Reference** carries the " +
      "tokens, the theming guide, and the design language. The header tabs move between them.",
    suggestions: ["What tokens exist?", "How do I theme it?"],
  },
  {
    match: ["button", "component", "dialog", "table"],
    text:
      "Every family lives on the Components shelf with live demos you can copy from. The **Button** " +
      "page shows variants and tones; **DataTable** demonstrates sorting, filtering, and selection; " +
      "**Dialog** covers the controlled and trigger-driven patterns. This very page is an example of " +
      "the AI family composing together.",
    suggestions: ["Show the docs map", "How do I theme it?"],
  },
];
