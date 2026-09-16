import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Transfer, type TransferItem } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Transfer" };
export default meta;
type Story = StoryObj<typeof Transfer>;

const LIBRARY: TransferItem[] = [
  { label: "The brush inventory", value: "brush" },
  { label: "Stone seals, catalogued", value: "seals" },
  { label: "Xuan paper samples", value: "xuan", disabled: true },
  { label: "Silk mounting orders", value: "silk" },
  { label: "Ink grind records", value: "ink" },
  { label: "Visitors' inscriptions", value: "visitors" },
];

/** Check on the left, cross the river to the right; the disabled item
 * stays put. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const picked = ref(["ink"]);
      return () => [
        h(Transfer, {
          modelValue: picked.value,
          "onUpdate:modelValue": (v: string[]) => (picked.value = v),
          data: LIBRARY,
          titles: ["In the study", "On exhibition"],
        }),
        h(
          "p",
          { style: "font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);" },
          [`target: ${JSON.stringify(picked.value)}`],
        ),
      ];
    }),
};

/** Each panel gets its filter line. */
export const Searchable: Story = {
  render: () =>
    withState(() => {
      const picked = ref([]);
      return () =>
        h(Transfer, {
          modelValue: picked.value,
          "onUpdate:modelValue": (v: string[]) => (picked.value = v),
          data: LIBRARY,
          titles: ["In the study", "On exhibition"],
          searchable: true,
        });
    }),
};
