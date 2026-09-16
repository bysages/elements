import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Input } from ".";
import { Field } from "../field";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Input" };
export default meta;
type Story = StoryObj<typeof Input>;

/** The resting state: paper surface, one hairline, placeholder ink. */
export const Basic: Story = {
  render: () => () => h(Input, { placeholder: "Your name" }),
};

/** Sizes ride the control-height ladder. */
export const Sizes: Story = {
  render: () => () =>
    h("div", { style: "display: grid; gap: var(--bs-space-3); max-inline-size: 24rem;" }, [
      h(Input, { size: "sm", placeholder: "Small" }),
      h(Input, { size: "md", placeholder: "Medium (default)" }),
      h(Input, { size: "lg", placeholder: "Large" }),
    ]),
};

/** Under the Field family the input answers to the field's invalid
 * state; standing alone it takes the `invalid` prop. */
export const Invalid: Story = {
  render: () => () => h(Input, { invalid: true, defaultValue: "not-an-email", type: "email" }),
};

/** Disabled: muted surface, no shadow, no cursor tricks. */
export const Disabled: Story = {
  render: () => () => h(Input, { disabled: true, value: "Read only" }),
};

/** Controlled with v-model — the value the parent holds is the value
 * the input shows. */
export const Controlled: Story = {
  render: () =>
    withState(() => {
      const text = ref("");
      return () => [
        h(Input, {
          modelValue: text.value,
          "onUpdate:modelValue": (value: string) => (text.value = value),
          placeholder: "Type and watch the echo",
        }),
        h(
          "p",
          { style: "font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);" },
          [`value: ${JSON.stringify(text.value)}`],
        ),
      ];
    }),
};

/** The full form register: Field provides the label, hint and error
 * channel; the input carries the ink and answers to the field's
 * invalid state through its context. */
export const WithField: Story = {
  render: () =>
    withState(() => {
      const invalid = ref(true);
      return () =>
        h(Field.Root, { invalid: invalid.value }, () => [
          h(Field.Label, () => "Email address"),
          h(Input, { type: "email", placeholder: "lin@example.com" }),
          h(Field.HelperText, () => "We only write about your orders."),
          h(Field.ErrorText, () => "Enter a valid email address."),
        ]);
    }),
};
