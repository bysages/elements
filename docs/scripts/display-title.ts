/** The family slug as a display title — words capitalized and spaced,
 * not the PascalCase of imports ("angle-slider" → "Angle Slider").
 * Both the component pages and the reference navigation title from
 * this one function, so the shelves never disagree. */
export const displayTitle = (family: string): string =>
  family
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
