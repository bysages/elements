import type { Component } from "svelte";

import LayoutStories from "./LayoutStories.svelte";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/Layout/Layout" };

export default meta;

/** The admin arrangement: a fixed rail on the start edge, the header on
 * top, the footer at the foot, and the flow stretching between. */
export const Basic: Story = {
  render: () => ({ Component: LayoutStories, props: { story: "basic" } }),
};

/** The rail answers to the caller: one external button folds it, and
 * the inline width variable carries the transition. */
export const ControlledCollapse: Story = {
  render: () => ({ Component: LayoutStories, props: { story: "controlled-collapse" } }),
};
