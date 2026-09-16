import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Timeline } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Timeline" };
export default meta;
type Story = StoryObj<typeof Timeline>;

const ink = { color: "var(--bs-color-text-primary)", fontWeight: "var(--bs-font-weight-medium)" };
const time = { color: "var(--bs-color-text-tertiary)", fontSize: "var(--bs-font-size-sm)" };

/** Three moments on one thread: the hairline runs from the first marker
 * to the last, then stops. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(Timeline.Root as any, { style: { maxInlineSize: "24rem" } }, () => [
          h(Timeline.Item, () => [
            h(Timeline.Marker as any),
            h(Timeline.Content as any, () => [
              h("div", { style: ink }, "Letter received"),
              h("div", {}, "The archive logged the letter at the front desk."),
              h("time", { style: time, datetime: "2026-09-14" }, "Today, 09:12"),
            ]),
          ]),
          h(Timeline.Item, () => [
            h(Timeline.Marker as any),
            h(Timeline.Content as any, () => [
              h("div", { style: ink }, "Seal pressed"),
              h("div", {}, "The registrar pressed the seal into the wax."),
              h("time", { style: time, datetime: "2026-09-13" }, "Yesterday, 16:40"),
            ]),
          ]),
          h(Timeline.Item, () => [
            h(Timeline.Marker as any),
            h(Timeline.Content as any, () => [
              h("div", { style: ink }, "Filed"),
              h("div", {}, "Shelved in the eastern cabinet, fourth row."),
              h("time", { style: time, datetime: "2026-09-12" }, "Monday, 11:05"),
            ]),
          ]),
        ]),
    ),
};

/** Content composes freely: this one carries only a title and a time,
 * the register staying as quiet as the thread. */
export const Compact: Story = {
  render: () =>
    withState(
      () => () =>
        h(Timeline.Root as any, { style: { maxInlineSize: "24rem" } }, () =>
          (
            [
              ["Doors open", "2026-09-14 08:30"],
              ["First reading", "2026-09-14 09:00"],
              ["Closing remarks", "2026-09-14 11:30"],
            ] as const
          ).map(([title, when]) =>
            h(Timeline.Item, () => [
              h(Timeline.Marker as any),
              h(Timeline.Content as any, () => [
                h("span", { style: ink }, title),
                h("span", { style: { ...time, marginInlineStart: "var(--bs-space-2)" } }, when),
              ]),
            ]),
          ),
        ),
    ),
};
