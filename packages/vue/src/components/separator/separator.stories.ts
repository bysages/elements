import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Separator } from ".";
import { withState } from "../with-state.js";

const meta: Meta<typeof Separator> = {
  title: "Components/Elements/Separator",
  component: Separator,
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Separator>;

const row = (extra: Record<string, unknown> = {}) =>
  h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        inlineSize: extra.orientation === "vertical" ? "auto" : "100%",
        blockSize: extra.orientation === "vertical" ? "3rem" : "auto",
      },
    },
    [h("span", () => "Chapter one"), h(Separator, extra), h("span", () => "Chapter two")],
  );

/** A hairline between two stretches of ink. */
export const Basic: Story = {
  args: { orientation: "horizontal" },
  render: (args) => withState(() => () => row(args)),
};

/** Turned upright, the hairline divides columns. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => withState(() => () => row(args)),
};
