import { useListCollection } from "@ark-ui/vue/combobox";
import { useFilter } from "@ark-ui/vue/locale";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, Teleport } from "vue";

import { Combobox } from "./index.js";

const meta: Meta = { title: "Components / Combobox" };
export default meta;

function chevronDown() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m6 9 6 6 6-6" })],
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

const ComboboxStory = defineComponent({
  name: "ComboboxStory",
  setup() {
    const filters = useFilter({ sensitivity: "base" });
    const { collection, filter } = useListCollection({
      initialItems: [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Date", value: "date" },
        { label: "Elderberry", value: "elderberry" },
        { label: "Fig", value: "fig" },
      ],
      filter: (item: string, inputValue: string) => filters.value.contains(item, inputValue),
    });
    return () =>
      h(
        Combobox.Root,
        {
          collection: collection.value,
          onInputValueChange: (details: { inputValue: string }) => filter(details.inputValue),
        } as any,
        () => [
          h(Combobox.Label, () => "Fruit"),
          h(Combobox.Control, () => [
            h(Combobox.Input as any, { placeholder: "e.g. Apple" }),
            h(Combobox.ClearTrigger, () => xGlyph()),
            h(Combobox.Trigger, () => chevronDown()),
          ]),
          h(Teleport, { to: "body" }, () => [
            h(Combobox.Positioner, () =>
              h(Combobox.Content, () =>
                h(Combobox.Context, null, {
                  default: () => [
                    h(Combobox.Empty, () => "No results found"),
                    ...collection.value.items.map((item: { label: string; value: string }) =>
                      h(Combobox.Item, { key: item.value, item }, () => [
                        h(Combobox.ItemText, () => item.label),
                        h(Combobox.ItemIndicator, () => checkGlyph()),
                      ]),
                    ),
                  ],
                }),
              ),
            ),
          ]),
        ],
      );
  },
});

/** Type to filter; the matching strokes take the primary ink while the
 * checked row holds the flat fill. */
export const Basic = {
  render: () => h(ComboboxStory),
};
