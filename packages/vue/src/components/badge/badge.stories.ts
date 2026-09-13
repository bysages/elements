import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Badge } from ".";
import { withState } from "../with-state.js";

const meta: Meta<typeof Badge> = {
  title: "Components/Elements/Badge",
  component: Badge,
  argTypes: {
    tone: {
      control: "select",
      options: ["ink", "primary", "danger", "success", "warning", "info"],
    },
    variant: { control: "radio", options: ["solid", "subtle", "outline"] },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

const TONES = ["ink", "primary", "danger", "success", "warning", "info"] as const;

const stack = (variant: string) =>
  h(
    "div",
    { style: { display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" } },
    TONES.map((tone) => h(Badge, { tone, variant }, () => tone)),
  );

const grid = () =>
  h(
    "div",
    {
      style: {
        display: "grid",
        gap: "1rem",
        justifyItems: "start",
        gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
      },
    },
    [
      h("div", [h("h4", () => "solid"), stack("solid")]),
      h("div", [h("h4", () => "subtle"), stack("subtle")]),
      h("div", [h("h4", () => "outline"), stack("outline")]),
    ],
  );

/** The whole pigment shelf, resting solid: ink keeps its solemnity, the
 * fixed pigments carry their semantics. */
export const Basic: Story = {
  args: { tone: "primary", variant: "solid" },
  render: (args) =>
    withState(() => () => h(Badge, { tone: args.tone, variant: args.variant }, () => "Badge")),
};

/** Every tone at every variant: solid speaks, subtle whispers, outline
 * only draws the edge. */
export const Variants: Story = {
  render: () => withState(() => () => grid()),
};
