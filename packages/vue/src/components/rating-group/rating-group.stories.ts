import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { RatingGroup } from "./index.js";

const star = () =>
  h(
    "svg",
    { viewBox: "0 0 24 24", width: 16, height: 16, fill: "currentColor", "aria-hidden": "true" },
    [
      h("path", {
        d: "M12 2.5l2.9 6.1 6.7.9-4.9 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.4 9.5l6.7-.9z",
      }),
    ],
  );

const meta: Meta = { title: "Components / Rating Group" };
export default meta;

export const Basic = {
  render: () =>
    h(RatingGroup.Root, { defaultValue: 3, count: 5 }, () => [
      h(RatingGroup.Label, () => "Rating"),
      h(RatingGroup.Control, () => [
        h(RatingGroup.Context, null, {
          default: ({ items }: { items: number[] }) =>
            items.map((item) =>
              h(RatingGroup.Item, { key: item, index: item }, { default: () => star() }),
            ),
        }),
        h(RatingGroup.HiddenInput),
      ]),
    ]),
};
