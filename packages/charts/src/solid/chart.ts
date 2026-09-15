import { injectChartTheme } from "../theme";

export { Chart } from "@tanstack/charts/solid";
export type {
  ChartCommonProps,
  ChartDefinition,
  ChartPresentationProps,
  ChartProps,
} from "@tanstack/charts/solid";

injectChartTheme();
