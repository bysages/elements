import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { JsonTreeView } from "./index.js";

const meta: Meta = { title: "Components / Json Tree View" };
export default meta;

const data = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  tags: ["tag1", "tag2", "tag3"],
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
};

function chevron() {
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
    [h("path", { d: "m9 5 7 7-7 7" })],
  );
}

export const Basic = {
  render: () =>
    h(JsonTreeView.Root, { data, defaultExpandedDepth: 1 }, () =>
      h(JsonTreeView.Tree, null, { arrow: () => chevron() }),
    ),
};
