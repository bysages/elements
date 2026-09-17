import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Grid } from ".";
import { withState } from "../with-state.js";

const meta: Meta = {
  title: "Components/Layout/Grid",
  component: Grid,
  argTypes: {
    columns: { control: "number" },
    gap: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
  },
};
export default meta;
type Story = StoryObj<typeof Grid>;

const tile = (n: number) =>
  h(
    "div",
    {
      style: {
        display: "grid",
        placeItems: "center",
        padding: "var(--bs-space-3)",
        background: "var(--bs-color-surface-3)",
        border: "1px solid var(--bs-color-border)",
        fontSize: "var(--bs-font-size-sm)",
        color: "var(--bs-color-text-secondary)",
      },
    },
    String(n),
  );

const tiles = (count: number) => Array.from({ length: count }, (_, i) => tile(i + 1));

/** Six cells on a three-track lattice — every track the same measure,
 * whatever its cell holds. */
export const Basic: Story = {
  args: { columns: 3 },
  render: (args) => withState(() => () => h(Grid, args, () => tiles(6))),
};

/** The default twelve-track lattice, under a section of ink. */
export const TwelveColumns: Story = {
  render: () => withState(() => () => h(Grid, { columns: 12 }, () => tiles(12))),
};

/** With `minChildWidth` the container counts the tracks itself: grow
 * and shrink the canvas and the lattice re-counts. */
export const AutoFill: Story = {
  args: { minChildWidth: "10rem" },
  render: (args) => withState(() => () => h(Grid, args, () => tiles(6))),
};

/** A looser step of the ramp between the cells. */
export const Loose: Story = {
  args: { columns: 3, gap: "xl" },
  render: (args) => withState(() => () => h(Grid, args, () => tiles(3))),
};
