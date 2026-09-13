import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Steps } from "./index.js";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components / Steps" };
export default meta;

const items = [
  { title: "Fill in details", description: "Contact and shipping address" },
  { title: "Confirm the order", description: "Check items and totals" },
  { title: "Complete payment", description: "Choose how to pay" },
];

export const Basic = {
  args: {
    backLabel: "Back",
    nextLabel: "Next",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(Steps.Root, { count: items.length }, () => [
          h(Steps.List, () =>
            items.map((item, index) =>
              h(Steps.Item, { key: item.title, index }, () => [
                h(Steps.Trigger, () => [
                  h(Steps.Indicator, () => String(index + 1)),
                  h("span", item.title),
                ]),
                h(Steps.Separator),
              ]),
            ),
          ),
          ...items.map((item, index) =>
            h(
              Steps.Content,
              { key: item.title, index },
              () => `${item.title} — ${item.description}`,
            ),
          ),
          h(Steps.CompletedContent, () => "All steps completed."),
          h("div", { style: { display: "flex", gap: "0.75rem", marginTop: "1rem" } }, [
            h(Steps.PrevTrigger, () => args.backLabel),
            h(Steps.NextTrigger, () => args.nextLabel),
          ]),
        ]),
    ),
};

export const Progress = {
  render: () =>
    h(Steps.Root, { count: items.length }, () => [
      h(Steps.Progress, null, {
        default: (progress: { percent: number }) => `Done ${Math.round(progress.percent)}%`,
      }),
    ]),
};
