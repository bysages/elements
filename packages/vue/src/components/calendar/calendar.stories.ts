import { parseDate } from "@ark-ui/vue/date-picker";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Calendar } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Calendar" };
export default meta;
type Story = StoryObj<typeof Calendar>;

/** The month grid on the page: the popup gone, the vessel a quiet card,
 * the machinery entirely the shared date-picker's. */
export const Basic: Story = {
  render: () => withState(() => () => h(Calendar as any, { style: { maxInlineSize: "20rem" } })),
};

/** A controlled selection: the chosen day reports back through the
 * binding and reads in the line below. */
export const Controlled: Story = {
  render: () => {
    const value = ref([parseDate("2026-09-15")]);
    return withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "var(--bs-space-3)", justifyItems: "start" } }, [
          h(Calendar as any, {
            modelValue: value.value,
            "onUpdate:modelValue": (v: any) => (value.value = v),
            style: { maxInlineSize: "20rem" },
          }),
          h(
            "p",
            { style: { color: "var(--bs-color-text-secondary)", margin: 0 } },
            `Selected: ${value.value?.[0]?.toString() ?? "nothing yet"}`,
          ),
        ]),
    );
  },
};

/** The full variant opens the grid to its container and gives every day
 * room for an annotation; today rides the machine through the header. */
export const Full: Story = {
  render: () => h(Calendar as any, { variant: "full" }),
};

/** Year mode opens the machine on its month overview: paging
 * walks years, and choosing a month drills into that day grid. */
export const Year: Story = {
  render: () => h(Calendar as any, { mode: "year" }),
};

/** Multiple selection keeps every chosen day in one array. */
export const Multiple: Story = {
  render: () =>
    h(Calendar as any, {
      selectionMode: "multiple",
      defaultValue: [parseDate("2026-09-08"), parseDate("2026-09-11"), parseDate("2026-09-25")],
    }),
};

/** The shared machine carries range geometry: the middle days read as a
 * continuous band between the endpoints. */
export const Range: Story = {
  render: () =>
    h(Calendar as any, {
      selectionMode: "range",
      defaultValue: [parseDate("2026-09-08"), parseDate("2026-09-19")],
      style: { maxInlineSize: "22rem" },
    }),
};

/** Week numbers turn the rows into calendar-week coordinates. */
export const WeekNumbers: Story = {
  render: () => h(Calendar as any, { showWeekNumbers: true, fixedWeeks: true }),
};
