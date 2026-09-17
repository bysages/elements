import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Stack } from ".";
import { withState } from "../with-state.js";

const meta: Meta = {
  title: "Components/Layout/Stack",
  component: Stack,
  argTypes: {
    direction: { control: "radio", options: ["column", "row"] },
    gap: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
  },
};
export default meta;
type Story = StoryObj<typeof Stack>;

const tile = (text: string) =>
  h(
    "div",
    {
      style: {
        padding: "var(--bs-space-2) var(--bs-space-3)",
        background: "var(--bs-color-surface-3)",
        border: "1px solid var(--bs-color-border)",
        fontSize: "var(--bs-font-size-sm)",
      },
    },
    text,
  );

/** Siblings held apart by one named step — here the default `md`. */
export const Basic: Story = {
  render: () =>
    withState(() => () => h(Stack, () => [tile("First"), tile("Second"), tile("Third")])),
};

/** Turned on its side, the same step holds a row apart. */
export const Row: Story = {
  args: { direction: "row" },
  render: (args) =>
    withState(() => () => h(Stack, args, () => [tile("First"), tile("Second"), tile("Third")])),
};

/** Every named step of the space ramp, holding the same two tiles. */
export const GapSteps: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "grid", gap: "var(--bs-space-4)" } },
          (["none", "xs", "sm", "md", "lg", "xl"] as const).map((step) =>
            h(Stack, { key: step, gap: step }, () => [tile(step), tile("…")]),
          ),
        ),
    ),
};

/** A row that has run out of room lays its overflow down a line. */
export const Wrap: Story = {
  args: { direction: "row", wrap: true },
  render: (args) =>
    withState(
      () => () =>
        h(
          "div",
          { style: { inlineSize: "24rem" } },
          h(Stack, args, () => Array.from({ length: 8 }, (_, i) => tile(`Item ${i + 1}`))),
        ),
    ),
};
