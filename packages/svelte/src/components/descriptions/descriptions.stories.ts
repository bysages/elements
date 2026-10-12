import type { Component } from "svelte";

import { Descriptions } from ".";
import DescriptionsStories from "./DescriptionsStories.svelte";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/Data/Descriptions", component: Descriptions };

export default meta;

/** The facade is the one-tag path. */
export const Basic: Story = {
  render: () => ({
    Component: Descriptions,
    props: {
      items: [
        { term: "Paper", detail: "Warm ground" },
        { term: "Ink", detail: "Content first" },
      ],
    },
  }),
};

/** The horizontal ledger: terms down the leading column, details trailing. */
export const Anatomy: Story = {
  render: () => ({
    Component: DescriptionsStories,
    props: { story: "anatomy" },
  }),
};

/** The vertical ledger stacks each pair — the narrow-measure reading. */
export const Vertical: Story = {
  render: () => ({
    Component: DescriptionsStories,
    props: { story: "vertical" },
  }),
};

/** The framed register: one hairline round the whole, terms on inset
 * paper, pairs across the grid. */
export const Bordered: Story = {
  render: () => ({
    Component: DescriptionsStories,
    props: { story: "bordered" },
  }),
};
