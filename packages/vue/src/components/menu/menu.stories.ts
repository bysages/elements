import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Menu } from "./index.js";

const meta: Meta = { title: "Components / Menu" };
export default meta;

function chevronDown() {
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
    [h("path", { d: "m6 9 6 6 6-6" })],
  );
}

/** A file menu: one trigger, one vessel dissolving in, items as rows of
 * light with a hairline between courses. */
export const Basic = {
  render: () =>
    h(Menu.Root, () => [
      h(Menu.Trigger, () => [h("span", () => "File"), h(Menu.Indicator, () => chevronDown())]),
      h(Menu.Positioner, () =>
        h(Menu.Content, () => [
          h(Menu.Item, { value: "new-file" }, () => "New file"),
          h(Menu.Item, { value: "open", disabled: true }, () => "Open…"),
          h(Menu.ItemGroup, () => [
            h(Menu.ItemGroupLabel, () => "Save"),
            h(Menu.Item, { value: "save" }, () => "Save"),
            h(Menu.Item, { value: "save-as" }, () => "Save as…"),
          ]),
          h(Menu.Separator),
          h(Menu.Item, { value: "export" }, () => "Export"),
        ]),
      ),
    ]),
};
