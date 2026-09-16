import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Stat } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Stat" };
export default meta;
type Story = StoryObj<typeof Stat>;

/** One figure with its label, delta, and a whisper of context. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(Stat.Root as any, {}, () => [
          h(Stat.Label, () => "Letters received"),
          h(Stat.Value, () => "12,480"),
          h(Stat.Delta as any, { direction: "up" }, () => "↑ 4.2%"),
          h(Stat.Description, () => "Against last quarter"),
        ]),
    ),
};

/** A row of figures: the tabular values align, the deltas read the
 * direction in the fixed pigments. */
export const Row: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "flex", gap: "var(--bs-space-10)", flexWrap: "wrap" } }, [
          h(Stat.Root as any, {}, () => [
            h(Stat.Label, () => "Letters received"),
            h(Stat.Value, () => "12,480"),
            h(Stat.Delta as any, { direction: "up" }, () => "↑ 4.2%"),
          ]),
          h(Stat.Root as any, {}, () => [
            h(Stat.Label, () => "Letters answered"),
            h(Stat.Value, () => "11,932"),
            h(Stat.Delta as any, { direction: "up" }, () => "↑ 2.8%"),
          ]),
          h(Stat.Root as any, {}, () => [
            h(Stat.Label, () => "Overdue replies"),
            h(Stat.Value, () => "548"),
            h(Stat.Delta as any, { direction: "down" }, () => "↓ 1.1%"),
          ]),
          h(Stat.Root as any, {}, () => [
            h(Stat.Label, () => "In transit"),
            h(Stat.Value, () => "126"),
            h(Stat.Delta as any, {}, () => "· steady"),
          ]),
        ]),
    ),
};
