import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { AutoComplete } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Auto Complete" };
export default meta;
type Story = StoryObj<typeof AutoComplete>;

const PROVINCES = [
  "Anhui",
  "Fujian",
  "Gansu",
  "Guangdong",
  "Guizhou",
  "Hainan",
  "Hebei",
  "Jiangsu",
  "Shandong",
  "Sichuan",
  "Yunnan",
  "Zhejiang",
];

/** Type freely — the list narrows; picking or not, the text is the
 * value. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const text = ref("");
      return () => [
        h(AutoComplete, {
          modelValue: text.value,
          "onUpdate:modelValue": (v: string) => (text.value = v),
          items: PROVINCES,
          placeholder: "Province, or anything else",
          style: { maxInlineSize: "18rem" },
        }),
        h(
          "p",
          { style: "font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);" },
          [`value: ${JSON.stringify(text.value)}`],
        ),
      ];
    }),
};

/** A custom matcher: here, a prefix match instead of the default
 * substring. */
export const PrefixFilter: Story = {
  render: () =>
    withState(() => {
      const text = ref("");
      return () =>
        h(AutoComplete, {
          modelValue: text.value,
          "onUpdate:modelValue": (v: string) => (text.value = v),
          items: PROVINCES,
          filter: (item: string, input: string) =>
            item.toLowerCase().startsWith(input.toLowerCase()),
          placeholder: "Type a prefix…",
          style: { maxInlineSize: "18rem" },
        });
    }),
};
