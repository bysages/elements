import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { User } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/User" };
export default meta;
type Story = StoryObj<typeof User>;

/** The plain row: initials on the seal until an image is supplied. */
export const Basic: Story = {
  render: () =>
    withState(() => () => h(User, { name: "Shen Wenzheng", description: "Keeper of seals" })),
};

/** The quiet echo beneath the name is optional — some rows only need
 * the name to stand. */
export const NameOnly: Story = {
  render: () => withState(() => () => h(User, { name: "Lin Wan" })),
};

/** The large rung: the seal borrows the tall control height for a
 * profile header. */
export const Sizes: Story = {
  render: () =>
    withState(() => () => [
      h(User, { key: "sm", name: "Chen Yu", description: "Small rung", size: "sm" }),
      h(User, { key: "md", name: "Chen Yu", description: "Medium rung", size: "md" }),
      h(User, { key: "lg", name: "Chen Yu", description: "Large rung", size: "lg" }),
    ]),
};

/** The square cut: a stamp beside a round portrait. */
export const Square: Story = {
  render: () => withState(() => () => h(User, { name: "Zhou Ping", shape: "square", size: "md" })),
};
