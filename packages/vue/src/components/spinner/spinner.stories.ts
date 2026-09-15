import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Spinner } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Feedback/Spinner" };
export default meta;
type Story = StoryObj<typeof Spinner>;

/** The three sizes on the part ladder, resting beside a line of ink so
 * the scale reads against the text it would accompany. */
export const Sizes: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "flex", alignItems: "center", gap: "var(--bs-space-6)" } }, [
          h(Spinner as any, { size: "sm" }),
          h(Spinner as any, { size: "md" }),
          h(Spinner as any, { size: "lg" }),
          h("span", { style: { color: "var(--bs-color-text-tertiary)" } }, "Loading the archive…"),
        ]),
    ),
};

/** Inline in a sentence: the quiet register lets it ride with the text
 * without claiming a block of its own. */
export const Inline: Story = {
  render: () =>
    withState(
      () => () =>
        h("p", { style: { display: "flex", alignItems: "center", gap: "var(--bs-space-2)", color: "var(--bs-color-text-secondary)" } }, [
          h(Spinner as any, { size: "sm" }),
          "Fetching the letter…",
        ]),
    ),
};
