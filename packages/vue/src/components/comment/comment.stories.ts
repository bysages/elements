import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Comment } from ".";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Comment" };
export default meta;
type Story = StoryObj<typeof Comment>;

/** A voice on the record: portrait, byline, ink, and the row of
 * answers beneath. */
export const Basic: Story = {
  render: () =>
    h(
      Comment,
      { author: "Sage Wei", datetime: "Today, 09:12" },
      {
        avatar: () => h(Avatar.Root, () => h(Avatar.Fallback, () => "SW")),
        default: () =>
          "The registry reads cleaner since the hairlines went in — the eye knows where one entry ends.",
        actions: () => [
          h(Button, { variant: "ghost", size: "sm" }, () => "Reply"),
          h(Button, { variant: "ghost", size: "sm" }, () => "Cite"),
        ],
      },
    ),
};

/** A short note: the byline can ride a single line, and the answers
 * row may stay away entirely. */
export const Brief: Story = {
  render: () =>
    h(
      Comment,
      { author: "Archive keeper", datetime: "2026-09-15" },
      {
        avatar: () => h(Avatar.Root, () => h(Avatar.Fallback, () => "AK")),
        default: () => "Filed. Shelved in the eastern cabinet, fourth row.",
      },
    ),
};

/** A thread: comments compose, so a reply nests in the body's own
 * measure. */
export const Thread: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gap: "0.5rem", maxInlineSize: "36rem" } }, [
          h(
            Comment,
            { author: "Sage Wei", datetime: "Today, 09:12" },
            {
              avatar: () => h(Avatar.Root, () => h(Avatar.Fallback, () => "SW")),
              default: () => "Shall the hairlines run through the annex as well?",
            },
          ),
          h(
            "div",
            { style: { paddingInlineStart: "2.75rem" } },
            h(
              Comment,
              { author: "Archive keeper", datetime: "Today, 10:03" },
              {
                avatar: () => h(Avatar.Root, () => h(Avatar.Fallback, () => "AK")),
                default: () => "Yes — same rule, same weight, one page everywhere.",
              },
            ),
          ),
        ]),
    ),
};
