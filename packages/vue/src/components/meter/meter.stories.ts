import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Meter } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Feedback/Meter" };
export default meta;
type Story = StoryObj<typeof Meter>;

/** One measure: the label whispers what it reads, the ink rides the
 * primary, the value text closes the line. */
export const Basic: Story = {
  render: () =>
    withState(() => () => h(Meter.Root as any, { value: 62, label: "Toner remaining" })),
};

/** At the thresholds the ink changes its pigment: plenty, low, empty. */
export const Levels: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "var(--bs-space-4)" } }, [
          h(Meter.Root as any, { value: 82, label: "Toner remaining", level: "success" }),
          h(Meter.Root as any, { value: 34, label: "Toner remaining", level: "warning" }),
          h(Meter.Root as any, { value: 8, label: "Toner remaining", level: "danger" }),
        ]),
    ),
};

/** Parts compose freely — this one reads a date range in the value
 * text instead of a percentage. */
export const Composed: Story = {
  render: () =>
    withState(
      () => () =>
        h(Meter.Root as any, { value: 5, min: 0, max: 31, level: "warning" }, () => [
          h(Meter.Label, () => "September"),
          h(Meter.ValueText, () => "5 / 31 days"),
          h(Meter.Track as any),
        ]),
    ),
};
