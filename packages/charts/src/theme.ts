import { injectTokens } from "@bysages/core";

/** Bridge the chart engine's surface variables onto the paper-and-ink
 * tokens: its tooltip dresses like every other popup vessel, and its
 * crosshair and focus takes the primary ink. The marks themselves carry
 * tokens straight through paint attributes — var() resolves against the
 * live theme, so mode, accent, and scene retune the ink with no redraw. */
export const chartThemeCss = /* css */ `
.ts-chart {
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
`;

let injected = false;

/** Inject the chart theme bridge (plus the token layer on first use).
 * Idempotent; SSR is a no-op. */
export function injectChartTheme(): void {
  if (injected || typeof document === "undefined") return;

  injectTokens();

  const style = document.createElement("style");
  style.dataset.bsStyles = "chart-theme";
  style.textContent = chartThemeCss;
  document.head.append(style);
  injected = true;
}
