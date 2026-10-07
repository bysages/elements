/** The family slug as a display title — words capitalized and spaced,
 * not the PascalCase of imports ("angle-slider" → "Angle Slider").
 * Abbreviations keep their canonical casing; a semantic family name
 * overrides its slug when the slug alone would understate it.
 * Component pages and reference navigation both title from this
 * function, so the shelves never disagree. */
const overrides: Record<string, string> = { ai: "AI Conversation" };
const abbreviations: Record<string, string> = { ai: "AI", qr: "QR", kbd: "Kbd" };

export const displayTitle = (family: string): string =>
  overrides[family] ??
  family
    .split("-")
    .map((part) => abbreviations[part] ?? part[0].toUpperCase() + part.slice(1))
    .join(" ");
