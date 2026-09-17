import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Ellipsis } from ".";
import { withState } from "../with-state.js";

const meta: Meta = {
  title: "Components/Layout/Ellipsis",
  component: Ellipsis,
  argTypes: {
    lines: { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof Ellipsis>;

const title = "A long chapter title walks into a narrow column and leaves its tail at the door";

/** One line, cut where the box ends. The full text is the consumer's to
 * reach — here, a plain title. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () => h("div", { style: { inlineSize: "20rem" } }, h(Ellipsis, { title }, title)),
    ),
};

const prose =
  "The vessel holds the page the way a column holds ink: fully, and only up to its brim. " +
  "Whatever runs past the measure gives way, and the cut is drawn so quietly that the reader " +
  "finishes the sentence from memory instead of the margin.";

/** Two lines and four lines of the same paragraph — the clamp holds
 * the block at N lines and the tail gives way. */
export const Lines: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--bs-space-4)" } },
          [h(Ellipsis, { key: 2, lines: 2 }, prose), h(Ellipsis, { key: 4, lines: 4 }, prose)],
        ),
    ),
};
