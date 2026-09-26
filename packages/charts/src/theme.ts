import { injectTokens, stylesShipped } from "@bysages/core";

import { chartColors } from "./palette";

/** The categorical slots the engine fills when a mark names no paint —
 * generated from the same palette the series range reads, so the CSS
 * bridge and the ordinal scale can never drift apart. One mixed ink
 * tone follows the five pigments. */
const categoricalSlots = Object.values(chartColors)
  .map((paint, i) => `  --ts-chart-${i + 1}: ${paint};`)
  .join("\n");

/** Bridge the chart engine's surface variables onto the paper-and-ink
 * tokens: its tooltip dresses like every other popup vessel, and its
 * crosshair and focus takes the primary ink. The marks themselves carry
 * tokens straight through paint attributes — var() resolves against the
 * live theme, so mode, accent, and scene retune the ink with no redraw. */
export const chartThemeCss = /* css */ `
.ts-chart {
${categoricalSlots}
  --ts-chart-6: color-mix(in oklab, var(--bs-color-primary) 60%, var(--bs-color-surface-0));
  --ts-chart-tooltip-background: var(--bs-color-surface-2);
  --ts-chart-tooltip-border: 1px solid var(--bs-color-border);
  --ts-chart-tooltip-border-radius: var(--bs-radius-lg);
  --ts-chart-tooltip-color: var(--bs-color-text-primary);
  --ts-chart-tooltip-font: var(--bs-font-size-sm) / var(--bs-line-height-relaxed)
    var(--bs-font-sans);
  --ts-chart-tooltip-max-width: 18rem;
  --ts-chart-tooltip-padding: var(--bs-space-2) var(--bs-space-3);
  --ts-chart-tooltip-shadow: var(--bs-elevation-3);
  --ts-chart-tooltip-active-row-background: var(--bs-color-surface-0);
  --ts-chart-tooltip-active-row-border-radius: var(--bs-radius-sm);
  --ts-chart-tooltip-active-row-font-weight: var(--bs-font-weight-medium);
  --ts-chart-tooltip-active-row-shadow: none;
  --ts-chart-crosshair-marker-fill: var(--bs-color-primary);
  --ts-chart-crosshair-label-halo: var(--bs-color-surface-1);
  --ts-chart-focus-fill: var(--bs-color-primary);
}

/* The chart svg is focusable for keyboard crosshair steering, but the
 * browser's default focus outline reads as a black frame on click. A
 * pointer press stays quiet; keyboard arrival wears the system halo. */
.ts-chart:focus {
  outline: none;
}

.ts-chart:focus-visible {
  outline: none;
  border-radius: var(--bs-radius-sm);
  box-shadow: var(--bs-focus-ring);
}
`;

let injected = false;

/** Inject the chart theme bridge (plus the token layer on first use).
 * Idempotent; SSR is a no-op, as is a document the SSR integration
 * already dressed. */
export function injectChartTheme(): void {
  if (injected || stylesShipped() || typeof document === "undefined") return;

  injectTokens();

  const style = document.createElement("style");
  style.dataset.bsStyles = "chart-theme";
  style.textContent = chartThemeCss;
  document.head.append(style);
  injected = true;
}
