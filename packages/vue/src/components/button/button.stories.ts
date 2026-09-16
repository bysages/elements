import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Button } from ".";
import { withState } from "../with-state.js";

const meta: Meta<typeof Button> = {
  title: "Components/Elements/Button",
  component: Button,
  argTypes: {
    variant: { control: "radio", options: ["solid", "outline", "ghost", "subtle"] },
    tone: {
      control: "select",
      options: ["ink", "primary", "danger", "success", "warning", "info"],
    },
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

/** Ink is the default: a solid button rests on paper-white, settles when
 * pressed, and lets the ink bleed on hover. */
export const Basic: Story = {
  args: { variant: "solid", tone: "ink", size: "md" },
  render: (args) =>
    withState(
      () => () =>
        h(Button, { variant: args.variant, tone: args.tone, size: args.size }, () => "Submit"),
    ),
};

/** The four variants: solid speaks, outline draws, ghost floats, subtle
 * stains the paper lightly. */
export const Variants: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "flex", gap: "0.75rem", alignItems: "center" } },
          (["solid", "outline", "ghost", "subtle"] as const).map((variant) =>
            h(Button, { key: variant, variant }, () => variant),
          ),
        ),
    ),
};

/** Any action can carry the primary weight: semantic tones on solid. */
export const Tones: Story = {
  args: {
    tone: "warning",
    size: "sm",
  },

  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" } },
          (["ink", "primary", "danger", "success", "warning", "info"] as const).map((tone) =>
            h(Button, { key: tone, tone }, () => tone),
          ),
        ),
    ),
};

/** Three heights: sm 28, md 32, lg 36 — density scales them further. */
export const Sizes: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "flex", gap: "0.75rem", alignItems: "center" } },
          (["sm", "md", "lg"] as const).map((size) => h(Button, { key: size, size }, () => size)),
        ),
    ),
};

/** With a leading mark: the icon inherits the ink of its tone. */
export const WithIcon: Story = {
  args: {
    variant: "subtle",
  },

  render: () =>
    withState(
      () => () =>
        h(Button, {}, () => [
          h(
            "svg",
            {
              width: 16,
              height: 16,
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": 1.75,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "aria-hidden": true,
            },
            [h("path", { d: "m4 12.5 5 5L20 6.5" })],
          ),
          "Save",
        ]),
    ),
};

/** Disabled: muted surface, no shadow, no cursor tricks — it simply
 * withdraws from the page. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => withState(() => () => h(Button, { disabled: args.disabled }, () => "Sealed")),
};
