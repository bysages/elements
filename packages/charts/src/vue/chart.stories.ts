import type { Meta } from "@storybook/vue3-vite";
import { barY, defineChart, dot, lineY } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scaleOrdinal } from "@tanstack/charts/scales/ordinal";
import { scalePoint } from "@tanstack/charts/scales/point";
import { h } from "vue";

import { chartColors, chartSeriesRange } from "../palette.js";
import { Chart, type ChartDefinition } from "./chart.js";

const meta: Meta = { title: "Components/Data/Chart" };
export default meta;

const months = [
  { month: "Jan", orders: 42 },
  { month: "Feb", orders: 58 },
  { month: "Mar", orders: 51 },
  { month: "Apr", orders: 73 },
  { month: "May", orders: 86 },
];

const wrap = (definition: ChartDefinition, ariaLabel: string) => () =>
  h("div", { style: { maxInlineSize: "34rem" } }, [h(Chart as any, { definition, ariaLabel })]);

/** Ink is the default: one line, one hairline grid, tokens carrying the
 * paint — mode, accent, and scene retune the chart with no redraw. */
export const Line = {
  render: () =>
    wrap(
      defineChart({
        marks: [
          lineY(months, {
            x: "month",
            y: "orders",
            stroke: chartColors.ink,
            strokeWidth: 2,
          }),
          dot(months, { x: "month", y: "orders", fill: chartColors.ink, r: 3 }),
        ],
        scales: {
          x: { scale: () => scalePoint<string>().padding(0.3) },
          y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Orders" } },
        },
      }),
      "Monthly orders, line",
    ),
};

/** Bars keep the seal-cut register: square-cut columns on the band
 * scale, quiet hairlines behind. */
export const Bars = {
  render: () =>
    wrap(
      defineChart({
        marks: [barY(months, { x: "month", y: "orders", fill: chartColors.ink })],
        scales: {
          x: { scale: () => scaleBand<string>().padding(0.25) },
          y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Orders" } },
        },
      }),
      "Monthly orders, bars",
    ),
};

/** Categorical series ride the fixed pigments in reading order — ink
 * first, then the semantic hues — so the chart never presumes an
 * industry. */
export const Series = {
  render: () => {
    const rows = [
      { month: "Jan", region: "North", orders: 42 },
      { month: "Feb", region: "North", orders: 58 },
      { month: "Mar", region: "North", orders: 51 },
      { month: "Jan", region: "South", orders: 30 },
      { month: "Feb", region: "South", orders: 47 },
      { month: "Mar", region: "South", orders: 64 },
      { month: "Jan", region: "West", orders: 25 },
      { month: "Feb", region: "West", orders: 38 },
      { month: "Mar", region: "West", orders: 45 },
    ];
    const color = scaleOrdinal<string, string>()
      .domain(["North", "South", "West"])
      .range(chartSeriesRange.slice(0, 3));
    return wrap(
      defineChart({
        marks: [lineY(rows, { x: "month", y: "orders", z: "region", strokeWidth: 2 })],
        scales: {
          x: { scale: () => scalePoint<string>().padding(0.3) },
          y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Orders" } },
        },
        color: { scale: color },
      }),
      "Monthly orders by region, lines",
    );
  },
};
