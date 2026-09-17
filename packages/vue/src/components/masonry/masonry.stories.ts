import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Masonry } from ".";
import { withState } from "../with-state.js";

const meta: Meta = {
  title: "Components/Layout/Masonry",
  component: Masonry,
  argTypes: {
    columns: { control: "number" },
    gap: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
  },
};
export default meta;
type Story = StoryObj<typeof Masonry>;

const heights = [5, 9, 4, 7, 11, 6, 9, 5, 8, 12, 6, 8, 4, 7];

const stone = (n: number) =>
  h(
    "div",
    {
      key: n,
      style: {
        display: "grid",
        placeItems: "center",
        blockSize: `${heights[n % heights.length]}rem`,
        background: "var(--bs-color-surface-3)",
        border: "1px solid var(--bs-color-border)",
        fontSize: "var(--bs-font-size-sm)",
        color: "var(--bs-color-text-secondary)",
      },
    },
    String(n + 1),
  );

/** Uneven heights flow down each column before crossing to the next —
 * the wall reads column-first. */
export const Basic: Story = {
  render: () => withState(() => () => h(Masonry, () => heights.map((_, i) => stone(i)))),
};

/** The same wall at two and at four columns. */
export const Columns: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "grid", gap: "var(--bs-space-6)" } },
          [2, 4].map((columns) =>
            h(Masonry, { key: columns, columns }, () => heights.map((_, i) => stone(i))),
          ),
        ),
    ),
};
