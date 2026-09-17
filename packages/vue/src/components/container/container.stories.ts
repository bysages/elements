import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Container } from ".";
import { withState } from "../with-state.js";

const meta: Meta = {
  title: "Components/Layout/Container",
  component: Container,
  argTypes: {
    size: { control: "radio", options: ["narrow", "readable", "wide", "full"] },
    padding: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Container>;

/** Long-form prose held to the readable measure, centered on whatever
 * page carries it. The paint is the story's — the container itself has
 * no chrome. */
export const Basic: Story = {
  args: { size: "readable" },
  render: (args) =>
    withState(
      () => () =>
        h(Container, { ...args, style: { background: "var(--bs-color-surface-3)" } }, () =>
          h(
            "p",
            { style: { margin: "0" } },
            "The page hands the container its width; the container hands back a line long enough to settle into and short enough to find its way back to.",
          ),
        ),
    ),
};

const sizes = ["narrow", "readable", "wide", "full"] as const;

/** The four measures, each painted so its clamp shows. */
export const Sizes: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "grid", gap: "var(--bs-space-4)" } },
          sizes.map((size) =>
            h(
              Container,
              { key: size, size, style: { background: "var(--bs-color-surface-3)" } },
              () => h("code", { style: { fontSize: "var(--bs-font-size-sm)" } }, size),
            ),
          ),
        ),
    ),
};

/** Without its padding the ink runs to the measure's edge — the page's
 * own gutter takes over. */
export const Unpadded: Story = {
  args: { size: "readable", padding: false },
  render: (args) =>
    withState(
      () => () =>
        h(Container, { ...args, style: { background: "var(--bs-color-surface-3)" } }, () =>
          h("p", { style: { margin: "0" } }, "Ink straight to the edge of the measure."),
        ),
    ),
};
