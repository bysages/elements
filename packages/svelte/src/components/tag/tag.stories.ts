import type { Component } from "svelte";

import { Tag } from ".";
import type { TagProps } from "./props";
import TagStories from "./TagStories.svelte";

type StoryArgs = Pick<TagProps, "tone" | "variant">;
type Story = {
  args?: Partial<StoryArgs>;
  render?: (args: StoryArgs) => { Component: Component<any>; props: Record<string, unknown> };
};

const meta = {
  title: "Components/Elements/Tag",
  component: Tag,
  argTypes: {
    tone: {
      control: "select",
      options: ["ink", "primary", "success", "warning", "danger", "info"],
    },
    variant: { control: "radio", options: ["solid", "outline", "subtle"] },
  },
};

export default meta;

const renderStory = (story: NonNullable<TagStoriesProps["story"]>) => (args: StoryArgs) => ({
  Component: TagStories,
  props: { story, ...args },
});
type TagStoriesProps = {
  story?:
    | "basic"
    | "tones"
    | "variants"
    | "checkable"
    | "checkable-closable"
    | "closable"
    | "disabled";
} & Partial<StoryArgs>;

/** The resting seal: a small named label riding the solemn ink. */
export const Basic: Story = {
  args: { tone: "ink", variant: "solid" },
  render: renderStory("basic"),
};

/** The seal changes pigment with its meaning. */
export const Tones: Story = { render: renderStory("tones") };

/** How the seal rests: the flat fill, the drawn hairline, the quiet
 * wash. */
export const Variants: Story = { render: renderStory("variants") };

/** The checkable seal presses into its solid register and holds. */
export const Checkable: Story = { render: renderStory("checkable") };

/** Both actions share one seal while their controls stay separate. */
export const CheckableClosable: Story = {
  render: renderStory("checkable-closable"),
};

/** The quiet close: removal stays the consumer's state. */
export const Closable: Story = { render: renderStory("closable") };

/** A tag that cannot answer: the pressed and removable seals both rest. */
export const Disabled: Story = { render: renderStory("disabled") };
