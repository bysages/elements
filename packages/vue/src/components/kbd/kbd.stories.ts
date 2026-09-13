import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Kbd } from ".";
import { withState } from "../with-state.js";

const meta: Meta<typeof Kbd> = {
  title: "Components/Elements/Kbd",
  component: Kbd,
};
export default meta;
type Story = StoryObj<typeof Kbd>;

const line = (...keys: string[]) =>
  h("div", { style: { display: "flex", gap: "0.375rem", alignItems: "center" } }, [
    ...keys.map((key) => h(Kbd, { key }, () => key)),
    h("span", () => keys.join(" + ")),
  ]);

/** One keycap, riding the type it annotates. */
export const Basic: Story = {
  render: () => withState(() => () => line("K")),
};

/** Chords read left to right, the label restating the caps. */
export const Combination: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          line("Ctrl", "Shift", "P"),
          line("⌘", "K"),
          line("Esc"),
        ]),
    ),
};

/** Inside a sentence, the caps inherit the running size. */
export const Inline: Story = {
  render: () =>
    withState(
      () => () =>
        h("p", { style: { inlineSize: "26rem" } }, [
          "Press ",
          h(Kbd, () => "Enter"),
          " to seal the draft, or ",
          h(Kbd, () => "Tab"),
          " to move along.",
        ]),
    ),
};
