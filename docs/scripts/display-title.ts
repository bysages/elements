/** The family slug as a display title — words capitalized and spaced,
 * not the PascalCase of imports ("angle-slider" → "Angle Slider").
 * Abbreviations that read as lowercase when capitalized ("ai" → "Ai")
 * keep their canonical casing. Both the component pages and the
 * reference navigation title from this one function, so the shelves
 * never disagree. */
const abbreviations: Record<string, string> = { ai: "AI", qr: "QR", kbd: "Kbd" };

export const displayTitle = (family: string): string =>
  family
    .split("-")
    .map((part) => abbreviations[part] ?? part[0].toUpperCase() + part.slice(1))
    .join(" ");
