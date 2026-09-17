import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Watermark } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Watermark" };
export default meta;
type Story = StoryObj<typeof Watermark>;

function draft() {
  return h(
    "div",
    {
      style: {
        display: "grid",
        gap: "var(--bs-space-3)",
        padding: "var(--bs-padding-lg)",
        fontSize: "var(--bs-font-size-sm)",
        lineHeight: "var(--bs-line-height-relaxed)",
        color: "var(--bs-color-text-secondary)",
      },
    },
    [
      h(
        "p",
        () =>
          "The registry holds each entry twice: once in the ledger, once in the seal that marks it as the house's own. The mark beneath the words is quiet by design — it claims the page without taking the reader's attention.",
      ),
      h(
        "p",
        () =>
          "Copies leave the building with the same seal, faint but present, so the paper can always be asked where it was made.",
      ),
    ],
  );
}

/** The default seal: a faint diagonal repeat beneath the flow, drawn
 * once on a canvas and repeated by the marks layer. */
export const Basic: Story = {
  render: () => h(Watermark, { content: "BY SAGES · 内部资料" }, { default: () => draft() }),
};

/** The seal answers the caller's hand: a heavier ink, a steeper
 * angle, a larger measure. */
export const Tuned: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          Watermark,
          {
            content: "DRAFT · 草稿",
            opacity: 0.12,
            rotate: -45,
            fontSize: "1.125rem",
          },
          { default: () => draft() },
        ),
    ),
};
