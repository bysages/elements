import type { Component } from "svelte";

import AiStories from "./AiStories.svelte";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/AI/AI Conversation" };

export default meta;

/** A full turn of conversation: the user's words in a recessed bubble,
 * the assistant's ink flat on the paper — thought, tool, sources, and
 * the quiet action row beneath. */
export const Basic: Story = {
  render: () => ({ Component: AiStories, props: { story: "basic" } }),
};

/** One typed AI SDK message rendered directly: text, file, approval, and
 * custom data parts all land on the shared conversation anatomy. */
export const TypedParts: Story = {
  render: () => ({ Component: AiStories, props: { story: "typed-parts" } }),
};

/** Two beads of ink breathing while the answer is on its way. */
export const Loader: Story = {
  render: () => ({ Component: AiStories, props: { story: "loader" } }),
};

/** The whole workbench: the layout rail, the conversation log, and
 * the composer stand in one shell — the arrangement the chat app
 * example ships with, at storybook scale. */
export const Workbench: Story = {
  render: () => ({ Component: AiStories, props: { story: "workbench" } }),
};
