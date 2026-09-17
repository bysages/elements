import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { DynamicInput } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/DynamicInput" };
export default meta;
type Story = StoryObj<typeof DynamicInput>;

const column = { display: "grid", gap: "var(--bs-space-3)", maxWidth: "24rem" };
const echo = {
  margin: 0,
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
};

/** A controlled entry list: add a row, fill it, remove another — the
 * array the caller holds is always the one on the paper. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const emails = ref<string[]>(["lin@example.com", ""]);
      return () =>
        h("div", { style: column }, [
          h(DynamicInput, {
            modelValue: emails.value,
            placeholder: "name@example.com",
            "onUpdate:modelValue": (value: string[]) => (emails.value = value),
          }),
          h("p", { style: echo }, [`values: ${JSON.stringify(emails.value)}`]),
        ]);
    }),
};

/** The limits hold without a word: at `min` the remove seals rest, at
 * `max` the add control does. */
export const MinMax: Story = {
  render: () =>
    withState(() => {
      const codes = ref<string[]>(["QH-01", "CL-02"]);
      return () =>
        h("div", { style: column }, [
          h(DynamicInput, {
            modelValue: codes.value,
            min: 1,
            max: 3,
            addLabel: "Add code",
            placeholder: "Code",
            "onUpdate:modelValue": (value: string[]) => (codes.value = value),
          }),
          h("p", { style: echo }, ["Between 1 and 3 codes"]),
        ]);
    }),
};
