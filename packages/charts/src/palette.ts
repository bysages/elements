/** The semantic pigments as paint. Marks take these strings directly —
 * the SVG renderer writes them as paint attributes, and var() inside a
 * paint attribute resolves against the live theme. Ink leads; the fixed
 * pigments follow in reading order, so any series can carry any hue and
 * the chart never presumes an industry. */
export const chartColors = {
  ink: "var(--bs-color-primary)",
  danger: "var(--bs-color-danger)",
  success: "var(--bs-color-success)",
  warning: "var(--bs-color-warning)",
  info: "var(--bs-color-info)",
} as const;

/** Series order for categorical paint — the pigments in reading order,
 * straight from the palette so the two can never drift apart. Hand this
 * to an ordinal scale's range (`scaleOrdinal().range(chartSeriesRange)`). */
export const chartSeriesRange: string[] = Object.values(chartColors);

/** The quiet ink for grids, guides, and secondary marks. */
export const chartHairline = "var(--bs-color-border)";
