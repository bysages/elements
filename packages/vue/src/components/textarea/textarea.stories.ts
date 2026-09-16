import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Textarea } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Textarea" };
export default meta;
type Story = StoryObj<typeof Textarea>;

/** The resting state: paper surface, one hairline, room to grow. */
export const Basic: Story = {
  render: () => () => h(Textarea, { placeholder: "Leave a note", rows: 3 }),
};

/** Invalid and disabled — the standard register shifts. */
export const States: Story = {
  render: () => () =>
    h("div", { style: "display: grid; gap: var(--bs-space-3); max-inline-size: 24rem;" }, [
      h(Textarea, { invalid: true, defaultValue: "Too short", rows: 2 }),
      h(Textarea, { disabled: true, defaultValue: "Sealed", rows: 2 }),
    ]),
};

/** Under the Field family the textarea answers to the field's invalid
 * state and carries its label. */
export const WithField: Story = {
  render: () => () =>
    h(Field.Root, { invalid: true }, () => [
      h(Field.Label, () => "Abstract"),
      h(Textarea, { rows: 4, placeholder: "Summarize the paper in 150 words" }),
      h(Field.ErrorText, () => "The abstract is required for submission."),
    ]),
};
