import type { Component } from "svelte";

import AiToolStories from "./AiToolStories.svelte";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/AI/AI Tool" };

export default meta;

/** A tool call in each state: reaching, running, answered, refused.
 * The dot pairs color with the word — never color alone. */
export const Basic: Story = {
  render: () => ({ Component: AiToolStories, props: { story: "basic" } }),
};

/** Structured values have a readable default format; custom markup can
 * still replace either side with the `input` or `output` slot. */
export const Structured: Story = {
  render: () => ({ Component: AiToolStories, props: { story: "structured" } }),
};

/** A required gate reports its decision through `approve` and `deny`. */
export const Approval: Story = {
  render: () => ({ Component: AiToolStories, props: { story: "approval" } }),
};
