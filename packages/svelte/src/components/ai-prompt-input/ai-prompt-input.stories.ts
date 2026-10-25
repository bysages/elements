import type { Component } from "svelte";

import AiPromptInputStories from "./AiPromptInputStories.svelte";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/AI/AI Prompt Input" };

export default meta;

/** The prompt vessel alone: controlled, self-growing, Enter to send. */
export const Basic: Story = {
  render: () => ({ Component: AiPromptInputStories, props: { story: "basic" } }),
};

/** The composer at full dress: attachments riding the header, and one
 * tool row beneath the text — the plus menu and the web-search toggle
 * at the left, the model picker beside the seal that becomes a stop
 * while the machine works, both closing the row at the right. The
 * other triggers opt out of the form's submit; only the seal sends. */
export const Compose: Story = {
  render: () => ({ Component: AiPromptInputStories, props: { story: "compose" } }),
};

/** The composer mentions: pass a roster and `@` summons the candidates
 * over the field; Enter inserts the chosen name while the vessel is up
 * and only sends once it stands down. */
export const Mentions: Story = {
  render: () => ({ Component: AiPromptInputStories, props: { story: "mentions" } }),
};

/** Slash commands can report selection without rewriting the prompt:
 * the consumer receives the whole entry and owns the next action. */
export const Triggers: Story = {
  render: () => ({ Component: AiPromptInputStories, props: { story: "triggers" } }),
};
