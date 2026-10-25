import type { Component } from "svelte";

import MentionsStories from "./MentionsStories.svelte";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/Forms/Mentions" };

export default meta;

/** Type @ and the first letters: the vessel offers the teammates whose
 * name answers; Enter or a click inserts, Escape dismisses. */
export const Basic: Story = {
  render: () => ({ Component: MentionsStories, props: { story: "basic" } }),
};

/** A different trigger character, for systems where @ already means
 * something else. */
export const CustomTrigger: Story = {
  render: () => ({ Component: MentionsStories, props: { story: "custom-trigger" } }),
};

/** Inside a `Field.Root` the field picks up the label wiring and the
 * invalid state on its own — mark the field invalid and the hairline
 * turns cinnabar. */
export const WithField: Story = {
  render: () => ({ Component: MentionsStories, props: { story: "with-field" } }),
};

/** Several triggers and rich rows: `@` finds people, `/` finds commands,
 * and grouping gives the vessel a stable reading order. */
export const Groups: Story = {
  render: () => ({ Component: MentionsStories, props: { story: "groups" } }),
};
