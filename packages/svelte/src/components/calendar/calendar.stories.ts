import { parseDate } from "@ark-ui/svelte/date-picker";
import type { Component } from "svelte";

import { Calendar } from ".";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/Forms/Calendar", component: Calendar };

export default meta;

/** The month grid on the page: the popup gone, the vessel a quiet card,
 * the machinery entirely the shared date-picker's. */
export const Basic: Story = {
  render: () => ({
    Component: Calendar,
    props: { style: "max-inline-size: 20rem" },
  }),
};

/** The full variant opens the grid to its container and gives every day
 * room for an annotation; today rides the machine through the header. */
export const Full: Story = {
  render: () => ({ Component: Calendar, props: { variant: "full" } }),
};

/** Year mode opens the machine on its month overview: paging
 * walks years, and choosing a month drills into that day grid. */
export const Year: Story = {
  render: () => ({ Component: Calendar, props: { mode: "year" } }),
};

/** Multiple selection keeps every chosen day in one array. */
export const Multiple: Story = {
  render: () => ({
    Component: Calendar,
    props: {
      selectionMode: "multiple",
      defaultValue: [parseDate("2026-09-08"), parseDate("2026-09-11"), parseDate("2026-09-25")],
    },
  }),
};

/** The shared machine carries range geometry: the middle days read as a
 * continuous band between the endpoints. */
export const Range: Story = {
  render: () => ({
    Component: Calendar,
    props: {
      selectionMode: "range",
      defaultValue: [parseDate("2026-09-08"), parseDate("2026-09-19")],
      style: "max-inline-size: 22rem",
    },
  }),
};

/** Week numbers turn the rows into calendar-week coordinates. */
export const WeekNumbers: Story = {
  render: () => ({
    Component: Calendar,
    props: { showWeekNumbers: true, fixedWeeks: true },
  }),
};
