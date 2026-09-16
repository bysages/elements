import type { Meta } from "@storybook/vue3-vite";
import type { Component } from "vue";
import { h, reactive, Teleport } from "vue";

import { createListCollection } from ".";
import { Select } from "../select";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Collection" };
export default meta;

/** The collections are factories, not parts: a story composes one into
 * a machine-facing component to show the handoff. The pigments ride
 * the docs' own demo — label/value items, explicit to-string/value
 * mappers, the selection held by the caller. */
const pigments = createListCollection({
  items: [
    { label: "Qinghua cobalt", value: "qinghua" },
    { label: "Celadon", value: "celadon" },
    { label: "Zhusha cinnabar", value: "zhusha" },
  ],
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});

function rows() {
  return pigments.items.map((item) =>
    h(Select.Item, { key: item.value, item }, () => [
      h(Select.ItemText, () => item.label),
      h(Select.ItemIndicator, () => "✓"),
    ]),
  );
}

/** The selection answers to state — the trigger mirrors the caller,
 * exactly as the docs demo binds it. */
export const Basic = {
  render: () =>
    withState(() => {
      const state = reactive({ value: ["celadon"] });
      return () =>
        h(
          Select.Root as Component,
          {
            collection: pigments,
            modelValue: state.value,
            "onUpdate:modelValue": (value: string[]) => {
              state.value = value;
            },
          },
          () => [
            h(Select.Label, () => "Accent pigment"),
            h(Select.Trigger, () => h(Select.ValueText, { placeholder: "Pick a pigment" })),
            h(Teleport, { to: "body" }, () => [
              h(Select.Positioner, () => [h(Select.Content, () => rows())]),
            ]),
          ],
        );
    }),
};
