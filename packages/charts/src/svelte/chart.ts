import { injectChartTheme } from "../theme";

export { Chart } from "@tanstack/charts/svelte";
export type {
  ChartCommonProps,
  ChartDefinition,
  ChartPresentationProps,
  ChartProps,
} from "@tanstack/charts/svelte";

injectChartTheme();
