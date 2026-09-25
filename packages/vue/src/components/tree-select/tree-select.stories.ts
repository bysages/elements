import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { TreeSelect, type TreeSelectNode } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Tree Select" };
export default meta;
type Story = StoryObj<typeof TreeSelect>;

const REGIONS: TreeSelectNode[] = [
  {
    label: "Jiangnan",
    value: "jiangnan",
    children: [
      { label: "Jiangsu", value: "jiangsu" },
      {
        label: "Zhejiang",
        value: "zhejiang",
        children: [
          { label: "Hangzhou", value: "hangzhou" },
          { label: "Shaoxing", value: "shaoxing" },
        ],
      },
    ],
  },
  {
    label: "Lingnan",
    value: "lingnan",
    children: [
      { label: "Guangdong", value: "guangdong" },
      { label: "Guangxi", value: "guangxi" },
    ],
  },
  { label: "Beyond the passes", value: "caiwai" },
];

/** One leaf click closes the vessel and lands the value. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const picked = ref("");
      return () => [
        h(TreeSelect, {
          modelValue: picked.value,
          "onUpdate:modelValue": (v: string) => (picked.value = v),
          data: REGIONS,
          placeholder: "Choose a region…",
          style: { maxInlineSize: "18rem" },
        }),
        h(
          "p",
          { style: "font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);" },
          [`value: ${JSON.stringify(picked.value)}`],
        ),
      ];
    }),
};

/** Pre-selected and disabled: the label rides the control, the gate is
   shut. */
export const Disabled: Story = {
  render: () => () =>
    h(TreeSelect, {
      modelValue: "hangzhou",
      data: REGIONS,
      disabled: true,
      style: { maxInlineSize: "18rem" },
    }),
};

/** A filter line at the top of the vessel: matches keep their ancestors
   and every branch on the way stands open, so a deep hit still reads in
   its hierarchy. */
export const Filterable: Story = {
  render: () =>
    withState(() => {
      const picked = ref("");
      return () => [
        h(TreeSelect, {
          modelValue: picked.value,
          "onUpdate:modelValue": (v: string) => (picked.value = v),
          data: REGIONS,
          filterable: true,
          placeholder: "Choose a region…",
          style: { maxInlineSize: "18rem" },
        }),
        h(
          "p",
          { style: "font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);" },
          [`value: ${JSON.stringify(picked.value)}`],
        ),
      ];
    }),
};
