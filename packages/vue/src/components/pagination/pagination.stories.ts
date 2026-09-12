import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Pagination } from "./index.js";

const meta: Meta = { title: "Components / Pagination" };
export default meta;

function chevron(direction: "left" | "right") {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6" })],
  );
}

export const Basic = {
  render: () =>
    h(Pagination.Root, { count: 5000, pageSize: 10, siblingCount: 2 }, () => [
      h(Pagination.PrevTrigger, { "aria-label": "Previous page" }, () => chevron("left")),
      h(Pagination.Context, null, {
        default: (pagination: { pages: Array<{ type: string; value: number }> }) =>
          pagination.pages.map((page, index) =>
            page.type === "page"
              ? h(Pagination.Item, { key: page.value, value: page.value } as any, () => page.value)
              : h(Pagination.Ellipsis, { key: `e${index}`, index }, () => "…"),
          ),
      }),
      h(Pagination.NextTrigger, { "aria-label": "Next page" }, () => chevron("right")),
    ]),
};
