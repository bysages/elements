import { Portal } from "@ark-ui/react/portal";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { createListCollection } from ".";
import { Select } from "../select";

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
  return pigments.items.map((item) => (
    <Select.Item key={item.value} item={item}>
      <Select.ItemText>{item.label}</Select.ItemText>
      <Select.ItemIndicator>✓</Select.ItemIndicator>
    </Select.Item>
  ));
}

/** The selection answers to state — the trigger mirrors the caller,
 * exactly as the docs demo binds it. */
export const Basic = {
  render: () => {
    const [value, setValue] = useState(["celadon"]);
    return (
      <Select.Root
        collection={pigments}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Select.Label>Accent pigment</Select.Label>
        <Select.Trigger>
          <Select.ValueText placeholder="Pick a pigment" />
        </Select.Trigger>
        <Portal>
          <Select.Positioner>
            <Select.Content>{rows()}</Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    );
  },
};
