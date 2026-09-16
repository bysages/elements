import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Skeleton } from ".";
import { withState } from "../with-state.js";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

/** Text waits as unset lines: a heading block and three easing rows. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          {
            style: {
              display: "grid",
              gap: "0.75rem",
              inlineSize: "24rem",
            },
          },
          [
            h(Skeleton, { style: { blockSize: "1.25rem", inlineSize: "60%" } }),
            h(Skeleton, { style: { blockSize: "0.875rem", inlineSize: "100%" } }),
            h(Skeleton, { style: { blockSize: "0.875rem", inlineSize: "92%" } }),
            h(Skeleton, { style: { blockSize: "0.875rem", inlineSize: "70%" } }),
          ],
        ),
    ),
};

/** A card-shaped placeholder: cover block, heading, two lines of body. */
export const Card: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          {
            style: {
              display: "grid",
              gap: "0.75rem",
              inlineSize: "18rem",
              padding: "1rem",
              border: "1px solid var(--bs-color-border)",
              borderRadius: "var(--bs-radius-lg)",
            },
          },
          [
            h(Skeleton, { style: { blockSize: "7rem", inlineSize: "100%" } }),
            h(Skeleton, { style: { blockSize: "1.125rem", inlineSize: "55%" } }),
            h(Skeleton, { style: { blockSize: "0.875rem", inlineSize: "100%" } }),
            h(Skeleton, { style: { blockSize: "0.875rem", inlineSize: "80%" } }),
          ],
        ),
    ),
};
