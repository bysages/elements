import { createListCollection } from "@ark-ui/vue/select";
import type { Meta } from "@storybook/vue3-vite";
import { h, Teleport } from "vue";

import { Select } from "./index.js";

const meta: Meta = { title: "Components / Select" };
export default meta;

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

function chevronsUpDown() {
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
    [h("path", { d: "m7 9 5-5 5 5M7 15l5 5 5-5" })],
  );
}

function checkGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "aria-hidden": true,
    },
    [h("path", { d: "m4 12.5 5 5L20 6.5" })],
  );
}

function xGlyph() {
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
    [h("path", { d: "M6 6l12 12M18 6 6 18" })],
  );
}

/** The trigger is the whole control; the chosen row carries the flat ink
 * fill inside the vessel. */
export const Basic = {
  render: () =>
    h(Select.Root, { collection: frameworks } as any, () => [
      h(Select.Label, () => "Framework"),
      h(Select.Control, () => [
        h(Select.Trigger, () => h(Select.ValueText, { placeholder: "Select" })),
        h(Select.ClearTrigger, () => xGlyph()),
        h(Select.Indicator, () => chevronsUpDown()),
      ]),
      h(Teleport, { to: "body" }, () => [
        h(Select.Positioner, () =>
          h(Select.Content, () =>
            h(Select.ItemGroup, () => [
              h(Select.ItemGroupLabel, () => "Frameworks"),
              ...frameworks.items.map((item) =>
                h(Select.Item, { key: item.value, item }, () => [
                  h(Select.ItemText, () => item.label),
                  h(Select.ItemIndicator, () => checkGlyph()),
                ]),
              ),
            ]),
          ),
        ),
      ]),
      h(Select.HiddenSelect),
    ]),
};
