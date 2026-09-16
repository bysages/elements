import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { CheckboxGroup } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Checkbox Group" };
export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const OPTIONS = [
  { label: "Ship the register", value: "ship" },
  { label: "Outline the story", value: "outline" },
  { label: "Archived", value: "archived", disabled: true },
];

/** One bound array; toggling a seal adds or removes its value. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const picked = ref(["ship"]);
      return () => [
        h(CheckboxGroup, {
          modelValue: picked.value,
          "onUpdate:modelValue": (v: string[]) => (picked.value = v),
          options: OPTIONS,
        }),
        h(
          "p",
          { style: "font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);" },
          [`value: ${JSON.stringify(picked.value)}`],
        ),
      ];
    }),
};

/** The horizontal layout reads as one row and wraps when narrow. */
export const Horizontal: Story = {
  render: () =>
    withState(() => {
      const picked = ref<string[]>([]);
      return () =>
        h(CheckboxGroup, {
          modelValue: picked.value,
          "onUpdate:modelValue": (v: string[]) => (picked.value = v),
          options: OPTIONS.slice(0, 2),
          layout: "horizontal",
        });
    }),
};

/** The whole group can go quiet at once. */
export const Disabled: Story = {
  render: () => () => h(CheckboxGroup, { modelValue: ["ship"], options: OPTIONS, disabled: true }),
};
