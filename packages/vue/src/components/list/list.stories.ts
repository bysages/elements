import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { List } from ".";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/List" };
export default meta;
type Story = StoryObj<typeof List>;

function initials(text: string) {
  return h(Avatar.Root, () => h(Avatar.Fallback, () => text));
}

/** The full row: the mark before the words, the title and its quiet
 * echo, the way out on the right. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(List.Root as any, { style: { maxInlineSize: "28rem" } }, () => [
          h(List.Item, () => [
            h(List.Leading as any, () => initials("SW")),
            h(List.Content as any, null, {
              title: () => "Seal registry",
              description: () => "Who pressed which seal, and when.",
            }),
            h(List.Actions as any, () => h(Button, { variant: "ghost", size: "sm" }, () => "Open")),
          ]),
          h(List.Item, () => [
            h(List.Leading as any, () => initials("LW")),
            h(List.Content as any, null, {
              title: () => "Letter room",
              description: () => "Correspondence awaiting the registrar.",
            }),
            h(List.Actions as any, () => h(Button, { variant: "ghost", size: "sm" }, () => "Open")),
          ]),
          h(List.Item, () => [
            h(List.Leading as any, () => initials("AB")),
            h(List.Content as any, null, {
              title: () => "Archive annex",
              description: () => "Shelved records, fourth row, eastern cabinet.",
            }),
            h(List.Actions as any, () => h(Button, { variant: "ghost", size: "sm" }, () => "Open")),
          ]),
        ]),
    ),
};

/** The bordered ledger with the hoverable wash: a row the caller makes
 * clickable (role="button") answers the pointer and takes the inset
 * focus halo on its own. */
export const Interactive: Story = {
  render: () =>
    withState(() => {
      const opened = { current: "" };
      return () =>
        h(
          List.Root as any,
          { bordered: true, hoverable: true, style: { maxInlineSize: "28rem" } },
          () =>
            (
              [
                ["Morning readings", "Barometer steady, ink flows well."],
                ["Noon deliveries", "Two crates of paper from the mill."],
                ["Evening closings", "The lamps are trimmed at dusk."],
              ] as const
            ).map(([title, description]) =>
              h(
                List.Item,
                {
                  role: "button",
                  tabindex: 0,
                  onClick: () => (opened.current = title),
                  onKeydown: (event: KeyboardEvent) => {
                    if (event.key === "Enter" || event.key === " ") opened.current = title;
                  },
                },
                () => [
                  h(List.Content as any, null, {
                    title: () => title,
                    description: () => description,
                  }),
                ],
              ),
            ),
        );
    }),
};
