import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Steps } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Navigation/Steps" };
export default meta;

const items = [
  { title: "Fill in details", description: "Contact and shipping address" },
  { title: "Confirm the order", description: "Check items and totals" },
  { title: "Complete payment", description: "Choose how to pay" },
];

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () =>
    h(Steps, {
      items: [{ title: "Account" }, { title: "Profile" }, { title: "Confirm" }],
      defaultStep: 0,
    }),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () => {
    const items = [{ title: "Account" }, { title: "Profile" }, { title: "Confirm" }];
    return h(Steps.Root, { count: items.length }, () =>
      h(Steps.List, () =>
        items.map((item, index) =>
          h(Steps.Item, { key: item.title, index }, () => [
            h(Steps.Trigger, () => [h(Steps.Indicator, () => String(index + 1)), item.title]),
            h(Steps.Separator),
          ]),
        ),
      ),
    );
  },
};

export const Progress = {
  render: () =>
    h(Steps.Root, { count: items.length }, () => [
      h(
        Steps.Progress,
        { "aria-label": "Step progress" },
        {
          default: (progress: { percent: number }) => `Done ${Math.round(progress.percent)}%`,
        },
      ),
    ]),
};

/** The vertical climb: the list turns, each step standing on its own
 * row for narrow measures. */
export const Vertical = {
  render: () =>
    withState(
      () => () =>
        h(Steps.Root, { count: items.length, orientation: "vertical" }, () => [
          h(Steps.List, () =>
            items.map((item, index) =>
              h(Steps.Item, { key: item.title, index }, () => [
                h(Steps.Trigger, () => [
                  h(Steps.Indicator, () => String(index + 1)),
                  h("span", item.title),
                ]),
                h(Steps.Separator),
                h(Steps.Content, () =>
                  h("p", { style: { paddingInlineStart: "2rem" } }, item.title),
                ),
              ]),
            ),
          ),
        ]),
    ),
};
